import { supabase } from '../lib/supabase';

export interface AnalyticsCard {
  title: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
  helper?: string;
}

class AnalyticsOpsService {
  async trackEvent(eventName: string, userId?: string, context: Record<string, any> = {}) {
    const { error } = await supabase.from('product_analytics_events').insert({
      user_id: userId,
      event_name: eventName,
      context,
    });
    if (error) throw error;
  }

  async logStructured(component: string, level: 'debug' | 'info' | 'warn' | 'error', message: string, context: Record<string, any> = {}) {
    const { error } = await supabase.from('structured_logs').insert({
      component,
      level,
      message,
      context,
    });
    if (error) throw error;
  }

  async recordSyntheticCheck(payload: { check_name: string; status: 'ok' | 'warn' | 'fail'; region?: string; latency_ms?: number; details?: Record<string, any> }) {
    const { error } = await supabase.from('synthetic_checks').insert(payload);
    if (error) throw error;
  }

  async getSyntheticStatuses(limit = 5) {
    const { data, error } = await supabase
      .from('synthetic_checks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  }

  async getDashboardCards(): Promise<AnalyticsCard[]> {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [events, logs] = await Promise.all([
      supabase
        .from('product_analytics_events')
        .select('user_id, event_name, created_at')
        .gte('created_at', since),
      supabase
        .from('structured_logs')
        .select('id, level, created_at')
        .gte('created_at', since),
    ]);

    const dau = new Set((events.data ?? []).map((e) => e.user_id).filter(Boolean)).size;
    const totalMessages = (events.data ?? []).filter((e) => e.event_name?.includes('message')).length;
    const uploads = (events.data ?? []).filter((e) => e.event_name?.includes('upload')).length;
    const failures = (logs.data ?? []).filter((l) => l.level === 'error').length;

    return [
      { title: 'DAU (24h)', value: dau.toString(), helper: 'Distinct users in last 24h' },
      { title: 'Messages sent', value: totalMessages.toString(), helper: 'Events tagged with message' },
      { title: 'Uploads success', value: uploads.toString(), helper: 'Media/file uploads in last 24h' },
      { title: 'Errors logged', value: failures.toString(), trend: failures > 0 ? 'down' : 'up', helper: 'Structured errors captured' },
    ];
  }
}

export const analyticsOpsService = new AnalyticsOpsService();
export default analyticsOpsService;
