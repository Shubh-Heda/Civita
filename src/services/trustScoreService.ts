// ============================================
// Trust Score Service - Reliability & Behavior Tracking
// ============================================
import { supabase } from '../lib/supabase';
import { firebaseAuth } from './firebaseService';

// Types
export interface TrustScore {
  id: string;
  user_id: string;
  overall_score: number;
  reliability_score: number;
  behavior_score: number;
  community_score: number;
  attendance_rate: number;
  on_time_rate: number;
  payment_reliability: number;
  cancellation_rate: number;
  positive_feedback_count: number;
  negative_feedback_count: number;
  reports_received: number;
  warnings_count: number;
  posts_count: number;
  helpful_count: number;
  matches_organized: number;
  matches_attended: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  is_verified: boolean;
  verification_date?: string;
  badges: string[];
  level: number;
  experience_points: number;
  created_at: string;
  updated_at: string;
}

export interface TrustScoreHistory {
  id: string;
  user_id: string;
  score_type: 'overall' | 'reliability' | 'behavior' | 'community';
  old_score: number;
  new_score: number;
  change_amount: number;
  reason: string;
  related_id?: string;
  created_at: string;
}

export interface UserFeedback {
  id: string;
  from_user_id: string;
  to_user_id: string;
  match_id?: string;
  rating: number;
  feedback_type: 'positive' | 'neutral' | 'negative';
  categories: string[];
  comment?: string;
  is_anonymous: boolean;
  created_at: string;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  requirements: any;
  earned?: boolean;
  earned_at?: string;
}

// Trust Score Service
class TrustScoreService {
  // ==================== SCORE RETRIEVAL ====================

  async getUserScore(userId: string): Promise<TrustScore | null> {
    const { data, error } = await supabase
      .from('user_trust_scores')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  // Synchronous method for backward compatibility
  getTrustScore(userId: string): { overall: number; completedMatches: number } {
    // Return default values for synchronous access
    // This is used during initialization before async data is loaded
    return {
      overall: 75,
      completedMatches: 0
    };
  }

  async getScoreHistory(userId: string, limit = 50): Promise<TrustScoreHistory[]> {
    const { data, error} = await supabase
      .from('trust_score_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async getLeaderboard(limit = 100): Promise<TrustScore[]> {
    const { data, error } = await supabase
      .from('user_trust_scores')
      .select(`
        *,
        user:profiles(id, full_name, avatar_url)
      `)
      .order('overall_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async getTrustScoreSummary(userId: string): Promise<any> {
    const score = await this.getUserScore(userId);
    if (!score) {
      // Return default summary if no score exists
      return {
        overall: 75,
        reliability: 75,
        behavior: 75,
        community: 75,
        badges: [],
        level: 1
      };
    }
    return {
      overall: score.overall_score,
      reliability: score.reliability_score,
      behavior: score.behavior_score,
      community: score.community_score,
      badges: score.badges || [],
      level: score.level
    };
  }

  async getTopTrustedUsers(limit = 10): Promise<any[]> {
    const leaderboard = await this.getLeaderboard(limit);
    return leaderboard.map(score => ({
      userId: score.user_id,
      overallScore: score.overall_score,
      isVerified: score.is_verified,
      badges: score.badges || []
    }));
  }

  // ==================== SCORE UPDATES ====================

  async recordAttendance(userId: string, matchId: string, wasOnTime: boolean): Promise<void> {
    const { error } = await supabase.rpc('record_attendance', {
      p_user_id: userId,
      p_match_id: matchId,
      p_was_on_time: wasOnTime
    });

    if (error) throw error;
  }

  async recordCancellation(userId: string, matchId: string, hoursBefore: number): Promise<void> {
    const { error } = await supabase.rpc('record_cancellation', {
      p_user_id: userId,
      p_match_id: matchId,
      p_hours_before: hoursBefore
    });

    if (error) throw error;
  }

  async recordAction(action: {
    type: string;
    userId: string;
    timestamp?: Date;
    impact?: number;
    matchId?: string;
  }): Promise<void> {
    // Map action types to score types and impacts
    const actionMapping: Record<string, { scoreType: 'reliability_score' | 'behavior_score' | 'community_score', impact: number }> = {
      'match_completed': { scoreType: 'reliability_score', impact: 5 },
      'match_attended': { scoreType: 'reliability_score', impact: 3 },
      'no_show': { scoreType: 'reliability_score', impact: -10 },
      'late_cancellation': { scoreType: 'reliability_score', impact: -5 },
      'early_cancellation': { scoreType: 'reliability_score', impact: -2 },
      'positive_feedback': { scoreType: 'behavior_score', impact: 5 },
      'negative_feedback': { scoreType: 'behavior_score', impact: -5 },
      'post_created': { scoreType: 'community_score', impact: 2 },
      'helpful_comment': { scoreType: 'community_score', impact: 3 },
    };

    const mapping = actionMapping[action.type];
    if (mapping) {
      try {
        await this.updateScore(
          action.userId,
          mapping.scoreType,
          action.impact || mapping.impact,
          action.type,
          action.matchId
        );
      } catch (error) {
        // Silently fail for mock data generation to avoid blocking initialization
        console.warn(`Failed to record action ${action.type}:`, error);
      }
    }
  }

  async updateScore(
    userId: string,
    scoreType: 'reliability_score' | 'behavior_score' | 'community_score',
    change: number,
    reason: string,
    relatedId?: string
  ): Promise<void> {
    const { error } = await supabase.rpc('update_trust_score', {
      p_user_id: userId,
      p_score_type: scoreType,
      p_change: change,
      p_reason: reason,
      p_related_id: relatedId
    });

    if (error) throw error;
  }

  // ==================== FEEDBACK SYSTEM ====================

  async giveFeedback(feedback: {
    to_user_id: string;
    match_id?: string;
    rating: number;
    feedback_type: 'positive' | 'neutral' | 'negative';
    categories: string[];
    comment?: string;
    is_anonymous?: boolean;
  }): Promise<void> {
    const user = firebaseAuth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_feedback')
      .insert({
        ...feedback,
        from_user_id: user.id
      });

    if (error) throw error;

    // Update behavior score based on feedback
    const scoreChange = feedback.rating >= 4 ? 2 : feedback.rating <= 2 ? -2 : 0;
    if (scoreChange !== 0) {
      await this.updateScore(
        feedback.to_user_id,
        'behavior_score',
        scoreChange,
        `Received ${feedback.feedback_type} feedback`,
        feedback.match_id
      );
    }

    // Update feedback counts
    const field = feedback.feedback_type === 'positive' 
      ? 'positive_feedback_count' 
      : feedback.feedback_type === 'negative'
      ? 'negative_feedback_count'
      : null;
    
    if (field) {
      const { data: currentScore } = await supabase
        .from('user_trust_scores')
        .select(field)
        .eq('user_id', feedback.to_user_id)
        .single();

      if (currentScore) {
        await supabase
          .from('user_trust_scores')
          .update({ [field]: (currentScore[field] || 0) + 1 })
          .eq('user_id', feedback.to_user_id);
      }
    }
  }

  async getFeedback(userId: string, limit = 50): Promise<UserFeedback[]> {
    const { data, error } = await supabase
      .from('user_feedback')
      .select(`
        *,
        from_user:profiles!from_user_id(id, full_name, avatar_url)
      `)
      .eq('to_user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // ==================== ACHIEVEMENTS ====================

  async getAchievements(): Promise<Achievement[]> {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('points', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        earned_at,
        achievement:achievements(*)
      `)
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    
    return (data || []).map((item: any) => ({
      ...item.achievement,
      earned: true,
      earned_at: item.earned_at
    }));
  }

  async checkAndAwardAchievements(userId: string): Promise<Achievement[]> {
    const score = await this.getUserScore(userId);
    if (!score) return [];

    const newAchievements: Achievement[] = [];

    // Check for achievements
    const checks = [
      { code: 'first_match', condition: score.matches_attended >= 1 },
      { code: 'on_time_10', condition: score.matches_attended >= 10 && score.on_time_rate >= 90 },
      { code: 'streak_7', condition: score.current_streak >= 7 },
      { code: 'streak_30', condition: score.current_streak >= 30 },
      { code: 'helpful_10', condition: score.helpful_count >= 10 },
      { code: 'organizer_5', condition: score.matches_organized >= 5 },
      { code: 'perfect_score', condition: score.overall_score >= 95 },
      { code: 'social_butterfly', condition: score.posts_count >= 20 }
    ];

    for (const check of checks) {
      if (check.condition) {
        const { data: achievement } = await supabase
          .from('achievements')
          .select('*')
          .eq('code', check.code)
          .single();

        if (achievement) {
          // Try to award (will fail silently if already earned)
          const { error } = await supabase
            .from('user_achievements')
            .insert({
              user_id: userId,
              achievement_id: achievement.id
            });

          if (!error) {
            newAchievements.push(achievement);
            // Award XP
            await this.awardExperience(userId, achievement.points);
          }
        }
      }
    }

    return newAchievements;
  }

  // ==================== EXPERIENCE & LEVELS ====================

  async awardExperience(userId: string, points: number): Promise<void> {
    const { data: score } = await supabase
      .from('user_trust_scores')
      .select('experience_points, level')
      .eq('user_id', userId)
      .single();

    if (!score) return;

    const newXP = score.experience_points + points;
    const newLevel = Math.floor(newXP / 100) + 1;

    await supabase
      .from('user_trust_scores')
      .update({
        experience_points: newXP,
        level: newLevel
      })
      .eq('user_id', userId);
  }

  // ==================== REPORTING ====================

  async reportUser(reportedUserId: string, reason: string, description: string, matchId?: string): Promise<void> {
    const user = firebaseAuth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_reports')
      .insert({
        reporter_id: user.id,
        reported_user_id: reportedUserId,
        reason,
        description,
        match_id: matchId
      });

    if (error) throw error;
  }

  // ==================== VERIFICATION ====================

  async requestVerification(userId: string): Promise<void> {
    // In a real app, this would trigger a verification process
    // For now, just mark as pending
    await supabase
      .from('user_trust_scores')
      .update({
        is_verified: false,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
  }

  // ==================== UTILITY ====================

  getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  }

  getScoreBadge(score: number): { label: string; color: string } {
    if (score >= 95) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 85) return { label: 'Great', color: 'bg-emerald-100 text-emerald-800' };
    if (score >= 70) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 50) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Improvement', color: 'bg-orange-100 text-orange-800' };
  }
}

export const trustScoreService = new TrustScoreService();
export default trustScoreService;
