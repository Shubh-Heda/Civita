// ============================================
// Advanced Trust Score Service
// ============================================
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface TrustScoreDimension {
  name: 'reliability' | 'behavior' | 'community';
  score: number;
  weight: number;
  change_history: { date: string; change: number }[];
}

export interface TrustEventLog {
  id: string;
  user_id: string;
  event_type: string;
  dimension: string;
  old_score: number;
  new_score: number;
  change_amount: number;
  reason: string;
  related_user?: string;
  is_decay?: boolean;
  created_at: string;
}

export interface TrustAppeal {
  id: string;
  user_id: string;
  reason: string;
  description?: string;
  status: 'pending' | 'approved' | 'denied' | 'resolved';
  evidence_url?: string;
  reviewer_notes?: string;
  created_at: string;
}

class AdvancedTrustService {
  // Constants
  private readonly DAILY_GAIN_CAP = 15; // Max points per day
  private readonly FEEDBACK_COOLDOWN_HOURS = 24;
  private readonly DECAY_PERCENTAGE = 0.5; // 0.5% per month
  private readonly RECIPROCAL_FEEDBACK_THRESHOLD = 5; // Flag after 5 mutual feedbacks

  // ==================== TRANSPARENCY & EVENT LOGS ====================

  /**
   * Get detailed trust score with dimension breakdown
   */
  async getTrustScoreWithDimensions(userId: string) {
    const { data: score, error: scoreError } = await supabase
      .from('user_trust_scores')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (scoreError) throw scoreError;

    const { data: weights, error: weightsError } = await supabase
      .from('trust_score_weights')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (weightsError && weightsError.code !== 'PGRST116') throw weightsError;

    const w = weights || {
      reliability_weight: 0.4,
      behavior_weight: 0.35,
      community_weight: 0.25
    };

    return {
      ...score,
      dimensions: [
        {
          name: 'reliability',
          score: score.reliability_score,
          weight: w.reliability_weight
        },
        {
          name: 'behavior',
          score: score.behavior_score,
          weight: w.behavior_weight
        },
        {
          name: 'community',
          score: score.community_score,
          weight: w.community_weight
        }
      ],
      weighted_calculation: {
        reliability: (score.reliability_score || 0) * w.reliability_weight,
        behavior: (score.behavior_score || 0) * w.behavior_weight,
        community: (score.community_score || 0) * w.community_weight,
        total: (score.reliability_score || 0) * w.reliability_weight +
               (score.behavior_score || 0) * w.behavior_weight +
               (score.community_score || 0) * w.community_weight
      }
    };
  }

  /**
   * Get full event log with score changes
   */
  async getEventLog(userId: string, limit = 100): Promise<TrustEventLog[]> {
    const { data, error } = await supabase
      .from('trust_score_history')
      .select(`
        *,
        related_feedback:user_feedback(from_user_id, from_user:profiles(full_name))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Get score diffs with contextual info
   */
  async getScoreDiffs(userId: string, timeframe: 'week' | 'month' | 'all' = 'month') {
    const cutoff = new Date();
    if (timeframe === 'week') cutoff.setDate(cutoff.getDate() - 7);
    if (timeframe === 'month') cutoff.setDate(cutoff.getDate() - 30);
    if (timeframe === 'all') cutoff.setFullYear(1970);

    const { data, error } = await supabase
      .from('trust_score_history')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', cutoff.toISOString())
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Calculate aggregated diffs by dimension
    const diffs = {
      reliability: { total: 0, count: 0, events: [] as any[] },
      behavior: { total: 0, count: 0, events: [] as any[] },
      community: { total: 0, count: 0, events: [] as any[] }
    };

    (data || []).forEach((event: any) => {
      const dim = event.score_type === 'overall' ? null : event.score_type;
      if (dim && diffs[dim]) {
        diffs[dim].total += event.change_amount || 0;
        diffs[dim].count += 1;
        diffs[dim].events.push({
          date: event.created_at,
          change: event.change_amount,
          reason: event.reason
        });
      }
    });

    return diffs;
  }

  // ==================== ANTI-GAMING MECHANICS ====================

  /**
   * Check daily gain cap
   */
  async checkDailyGainCap(userId: string): Promise<{ canEarn: boolean; remainingToday: number }> {
    const today = new Date().toISOString().split('T')[0];

    const { data } = await supabase
      .from('trust_daily_gains')
      .select('total_gained')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    const gainedToday = data?.total_gained || 0;
    const remainingToday = Math.max(0, this.DAILY_GAIN_CAP - gainedToday);

    return {
      canEarn: remainingToday > 0,
      remainingToday
    };
  }

  /**
   * Detect reciprocal boosting (A → B, B → A pattern)
   */
  async detectReciprocalBoosting(userId: string, otherUserId: string): Promise<boolean> {
    const { data } = await supabase
      .from('feedback_pairs')
      .select('feedback_count, flagged_as_suspicious')
      .eq('user_a_id', userId)
      .eq('user_b_id', otherUserId)
      .single();

    if (!data) {
      // First interaction
      return false;
    }

    const isSuspicious = data.feedback_count >= this.RECIPROCAL_FEEDBACK_THRESHOLD;
    return isSuspicious;
  }

  /**
   * Check feedback cooldown
   */
  async checkFeedbackCooldown(userId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];

    const { data } = await supabase
      .from('feedback_cooldowns')
      .select('feedback_today_count')
      .eq('user_id', userId)
      .eq('last_feedback_date', today)
      .single();

    // Allow 3 feedbacks per day
    return !data || data.feedback_today_count < 3;
  }

  /**
   * Record feedback with anti-gaming checks
   */
  async recordFeedbackWithChecks(feedback: {
    to_user_id: string;
    from_user_id: string;
    match_id?: string;
    rating: number;
    comment?: string;
  }): Promise<{ success: boolean; message: string }> {
    // Check daily cap
    const { canEarn, remainingToday } = await this.checkDailyGainCap(feedback.from_user_id);
    if (!canEarn) {
      return {
        success: false,
        message: `Daily feedback limit reached. Try again tomorrow.`
      };
    }

    // Check cooldown
    const canGiveFeedback = await this.checkFeedbackCooldown(feedback.from_user_id);
    if (!canGiveFeedback) {
      return {
        success: false,
        message: 'You can give maximum 3 feedbacks per day'
      };
    }

    // Check reciprocal boosting
    const isSuspicious = await this.detectReciprocalBoosting(feedback.from_user_id, feedback.to_user_id);
    if (isSuspicious) {
      toast.warning('Frequent mutual feedback detected. May be limited.');
    }

    // Record feedback (this would integrate with existing feedback system)
    return {
      success: true,
      message: `Feedback recorded (${remainingToday} feedback points left today)`
    };
  }

  // ==================== DECAY & INACTIVITY ====================

  /**
   * Calculate and apply score decay
   */
  async applyDecay(userId: string): Promise<number> {
    const { data: decay } = await supabase
      .from('trust_score_decay')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: score } = await supabase
      .from('user_trust_scores')
      .select('last_activity_date')
      .eq('user_id', userId)
      .single();

    if (!score) return 0;

    const lastActivity = new Date(score.last_activity_date);
    const now = new Date();
    const monthsInactive = (now.getTime() - lastActivity.getTime()) / (30 * 24 * 60 * 60 * 1000);

    if (monthsInactive > 1) {
      const decayPercent = (decay?.decay_percentage || this.DECAY_PERCENTAGE) * monthsInactive;
      const decayAmount = Math.floor((score.overall_score || 75) * (decayPercent / 100));

      // Apply decay (log it as decay event)
      await supabase.from('trust_score_history').insert({
        user_id: userId,
        score_type: 'overall',
        old_score: score.overall_score,
        new_score: Math.max(50, (score.overall_score || 75) - decayAmount),
        change_amount: -decayAmount,
        reason: `Inactivity decay (${monthsInactive.toFixed(1)} months)`,
        is_decay: true
      });

      // Update last decay date
      await supabase
        .from('trust_score_decay')
        .update({ last_decay_date: now.toISOString() })
        .eq('user_id', userId);

      return decayAmount;
    }

    return 0;
  }

  // ==================== REPUTATION GATES ====================

  /**
   * Check if user can perform action based on reputation
   */
  async canPerformAction(userId: string, actionType: 'create_event' | 'host_match' | 'organize_activity' | 'premium_room'): Promise<{ allowed: boolean; reason?: string }> {
    const { data: gate } = await supabase
      .from('reputation_gates')
      .select('*')
      .eq('gate_type', actionType)
      .single();

    if (!gate) {
      return { allowed: true };
    }

    const { data: score } = await supabase
      .from('user_trust_scores')
      .select('overall_score, level, matches_attended')
      .eq('user_id', userId)
      .single();

    if (!score) {
      return { allowed: false, reason: 'User score not found' };
    }

    if ((score.overall_score || 0) < gate.min_trust_score) {
      return { allowed: false, reason: `Minimum trust score ${gate.min_trust_score} required` };
    }

    if ((score.level || 1) < gate.min_level) {
      return { allowed: false, reason: `Level ${gate.min_level} required` };
    }

    if ((score.matches_attended || 0) < gate.min_matches_attended) {
      return { allowed: false, reason: `${gate.min_matches_attended} matches required` };
    }

    return { allowed: true };
  }

  /**
   * Calculate dynamic deposit amount based on trust score
   */
  async calculateEscrowDeposit(userId: string, eventCost: number): Promise<{ deposit: number; percentage: number }> {
    const { data: score } = await supabase
      .from('user_trust_scores')
      .select('overall_score')
      .eq('user_id', userId)
      .single();

    // High trust = lower deposit, Low trust = higher deposit
    const trustScore = score?.overall_score || 75;
    const depositPercentage = trustScore < 60 ? 20 : trustScore < 75 ? 15 : trustScore < 85 ? 10 : 5;

    return {
      deposit: (eventCost * depositPercentage) / 100,
      percentage: depositPercentage
    };
  }

  // ==================== APPEALS ====================

  /**
   * File appeal against score
   */
  async fileAppeal(userId: string, reason: string, description?: string, evidenceUrl?: string): Promise<TrustAppeal> {
    const { data, error } = await supabase
      .from('trust_appeals')
      .insert({
        user_id: userId,
        reason,
        description,
        evidence_url: evidenceUrl,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get pending appeals (admin view)
   */
  async getPendingAppeals(limit = 50): Promise<TrustAppeal[]> {
    const { data, error } = await supabase
      .from('trust_appeals')
      .select(`
        *,
        user:profiles(full_name, avatar_url)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Review and resolve appeal
   */
  async reviewAppeal(appealId: string, decision: 'approved' | 'denied', notes?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('trust_appeals')
      .update({
        status: decision === 'approved' ? 'resolved' : 'denied',
        reviewer_id: user.id,
        reviewed_at: new Date().toISOString(),
        review_notes: notes
      })
      .eq('id', appealId);

    if (error) throw error;
  }
}

export const advancedTrustService = new AdvancedTrustService();
export default advancedTrustService;
