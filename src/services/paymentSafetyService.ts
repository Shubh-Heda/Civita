import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface SplitParticipant {
  user_id: string;
  share_amount: number;
}

class PaymentSafetyService {
  async createSplit(eventId: string, participants: SplitParticipant[], totalAmount: number) {
    const totalShares = participants.reduce((acc, p) => acc + p.share_amount, 0);
    const normalized = participants.map((p) => ({
      ...p,
      share_amount: Number(((p.share_amount / totalShares) * totalAmount).toFixed(2)),
    }));

    const { error } = await supabase.from('payment_splits').upsert(
      normalized.map((p) => ({
        event_id: eventId,
        user_id: p.user_id,
        share_amount: p.share_amount,
        status: 'pending',
      }))
    );

    if (error) throw error;
    toast.success('Split payment created');
    return normalized;
  }

  async markPaid(eventId: string, userId: string) {
    const { error } = await supabase
      .from('payment_splits')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('event_id', eventId)
      .eq('user_id', userId);
    if (error) throw error;
  }

  async applyDropoutProration(eventId: string, userId: string, reason = 'dropout') {
    const { data: split, error } = await supabase
      .from('payment_splits')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    if (!split) return;

    const refundAmount = Number((split.share_amount * 0.8).toFixed(2));
    const { error: refundErr } = await supabase.from('payment_refunds').insert({
      payment_split_id: split.id,
      event_id: eventId,
      user_id: userId,
      amount: refundAmount,
      reason,
      status: 'pending',
    });
    if (refundErr) throw refundErr;
    toast.success('Prorated refund queued');
  }

  async autoRefundOnCancellation(eventId: string, reason = 'event_cancelled') {
    const { data, error } = await supabase
      .from('payment_splits')
      .select('*')
      .eq('event_id', eventId)
      .eq('status', 'paid');
    if (error) throw error;

    if (!data) return;
    const { error: refundErr } = await supabase.from('payment_refunds').insert(
      data.map((row) => ({
        payment_split_id: row.id,
        event_id: eventId,
        user_id: row.user_id,
        amount: row.share_amount,
        reason,
        status: 'pending',
      }))
    );
    if (refundErr) throw refundErr;
    toast.success('Automatic refunds created');
  }

  async getVerificationTier(userId: string) {
    const { data } = await supabase
      .from('id_verification_tiers')
      .select('*')
      .eq('user_id', userId)
      .single();
    return data ?? { user_id: userId, tier: 'none' };
  }

  async upsertVerificationTier(userId: string, tier: 'none' | 'basic' | 'verified' | 'trusted', provider?: string) {
    const payload = {
      user_id: userId,
      tier,
      provider,
      verified_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    const { error } = await supabase.from('id_verification_tiers').upsert(payload);
    if (error) throw error;
    return payload;
  }

  async recordDeviceRisk(options: { userId?: string; sessionId?: string; deviceId?: string; riskScore: number; signals: any; decision?: 'allow' | 'review' | 'block' }) {
    const { error } = await supabase.from('device_risk_signals').insert({
      user_id: options.userId,
      session_id: options.sessionId,
      device_id: options.deviceId,
      risk_score: options.riskScore,
      signals: options.signals,
      decision: options.decision ?? 'allow',
    });
    if (error) throw error;
  }
}

export const paymentSafetyService = new PaymentSafetyService();
export default paymentSafetyService;
