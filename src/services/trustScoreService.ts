/**
 * Trust Score Service
 * Manages user trust scores based on reliability, respect, and positive interactions
 */

import { localStorageService } from './localStorageService';

export interface TrustScore {
  userId: string;
  overall: number; // 0-100
  reliability: number; // 0-100
  respect: number; // 0-100
  positivity: number; // 0-100
  totalMatches: number;
  completedMatches: number;
  cancelledMatches: number;
  lateArrivals: number;
  earlyDepartures: number;
  positiveReviews: number;
  negativeReviews: number;
  lastUpdated: Date;
}

export interface TrustScoreAction {
  type: 'match_completed' | 'match_cancelled' | 'late_arrival' | 'early_departure' | 'positive_review' | 'negative_review' | 'helped_player' | 'no_show';
  userId: string;
  matchId?: string;
  timestamp: Date;
  impact: number; // -50 to +50
}

class TrustScoreService {
  // Base weights for different aspects
  private readonly WEIGHTS = {
    reliability: 0.4,
    respect: 0.3,
    positivity: 0.3,
  };

  // Points for different actions
  private readonly POINTS = {
    match_completed: 5,
    match_cancelled: -10,
    late_arrival: -3,
    early_departure: -2,
    positive_review: 8,
    negative_review: -8,
    helped_player: 10,
    no_show: -20,
    on_time: 3,
    stayed_full_match: 2,
  };

  /**
   * Get user's trust score
   */
  getTrustScore(userId: string): TrustScore {
    const scores = localStorageService.getTrustScores();
    
    if (!scores[userId]) {
      // Initialize new user with default score
      return this.initializeUserScore(userId);
    }

    return scores[userId];
  }

  /**
   * Initialize a new user's trust score
   */
  private initializeUserScore(userId: string): TrustScore {
    const newScore: TrustScore = {
      userId,
      overall: 75, // Start at 75 (newbie-friendly)
      reliability: 75,
      respect: 75,
      positivity: 75,
      totalMatches: 0,
      completedMatches: 0,
      cancelledMatches: 0,
      lateArrivals: 0,
      earlyDepartures: 0,
      positiveReviews: 0,
      negativeReviews: 0,
      lastUpdated: new Date(),
    };

    this.saveUserScore(newScore);
    return newScore;
  }

  /**
   * Record an action and update trust score
   */
  recordAction(action: TrustScoreAction): TrustScore {
    const score = this.getTrustScore(action.userId);

    // Update counters based on action type
    switch (action.type) {
      case 'match_completed':
        score.completedMatches++;
        score.totalMatches++;
        score.reliability += this.POINTS.match_completed;
        break;

      case 'match_cancelled':
        score.cancelledMatches++;
        score.reliability += this.POINTS.match_cancelled;
        break;

      case 'late_arrival':
        score.lateArrivals++;
        score.reliability += this.POINTS.late_arrival;
        break;

      case 'early_departure':
        score.earlyDepartures++;
        score.reliability += this.POINTS.early_departure;
        break;

      case 'positive_review':
        score.positiveReviews++;
        score.positivity += this.POINTS.positive_review;
        score.respect += this.POINTS.positive_review * 0.5;
        break;

      case 'negative_review':
        score.negativeReviews++;
        score.positivity += this.POINTS.negative_review;
        score.respect += this.POINTS.negative_review * 0.5;
        break;

      case 'helped_player':
        score.positivity += this.POINTS.helped_player;
        score.respect += this.POINTS.helped_player * 0.7;
        break;

      case 'no_show':
        score.reliability += this.POINTS.no_show;
        score.respect += this.POINTS.no_show * 0.3;
        break;
    }

    // Apply custom impact if specified
    if (action.impact !== undefined) {
      score.reliability += action.impact * 0.5;
      score.respect += action.impact * 0.3;
      score.positivity += action.impact * 0.2;
    }

    // Normalize scores (0-100)
    score.reliability = this.normalize(score.reliability);
    score.respect = this.normalize(score.respect);
    score.positivity = this.normalize(score.positivity);

    // Calculate overall score
    score.overall = this.calculateOverallScore(score);
    score.lastUpdated = new Date();

    this.saveUserScore(score);
    return score;
  }

  /**
   * Calculate overall trust score
   */
  private calculateOverallScore(score: TrustScore): number {
    const weighted = 
      score.reliability * this.WEIGHTS.reliability +
      score.respect * this.WEIGHTS.respect +
      score.positivity * this.WEIGHTS.positivity;

    return this.normalize(weighted);
  }

  /**
   * Normalize score to 0-100 range
   */
  private normalize(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

  /**
   * Get trust badge for a score
   */
  getTrustBadge(score: number): {
    label: string;
    color: string;
    icon: string;
  } {
    if (score >= 90) {
      return {
        label: 'Legendary Trust',
        color: 'text-amber-500',
        icon: '👑',
      };
    } else if (score >= 80) {
      return {
        label: 'High Trust Zone',
        color: 'text-emerald-500',
        icon: '⭐',
      };
    } else if (score >= 70) {
      return {
        label: 'Trusted Member',
        color: 'text-blue-500',
        icon: '✓',
      };
    } else if (score >= 50) {
      return {
        label: 'Building Trust',
        color: 'text-violet-500',
        icon: '📈',
      };
    } else {
      return {
        label: 'Newbie-Friendly',
        color: 'text-orange-500',
        icon: '🌱',
      };
    }
  }

  /**
   * Check if user is in "High Trust Zone"
   */
  isHighTrustZone(userId: string): boolean {
    const score = this.getTrustScore(userId);
    return score.overall >= 80;
  }

  /**
   * Check if user is "Newbie-Friendly"
   */
  isNewbieFriendly(userId: string): boolean {
    const score = this.getTrustScore(userId);
    return score.totalMatches < 5 || score.overall < 70;
  }

  /**
   * Get reliability percentage
   */
  getReliabilityPercentage(userId: string): number {
    const score = this.getTrustScore(userId);
    
    if (score.totalMatches === 0) return 100;
    
    return Math.round((score.completedMatches / score.totalMatches) * 100);
  }

  /**
   * Save user score
   */
  private saveUserScore(score: TrustScore): void {
    const scores = localStorageService.getTrustScores();
    scores[score.userId] = score;
    localStorageService.setTrustScores(scores);
  }

  /**
   * Get trust score summary
   */
  getTrustScoreSummary(userId: string) {
    const score = this.getTrustScore(userId);
    const badge = this.getTrustBadge(score.overall);
    const reliability = this.getReliabilityPercentage(userId);

    return {
      overall: score.overall,
      badge,
      reliability,
      stats: {
        totalMatches: score.totalMatches,
        completedMatches: score.completedMatches,
        cancelledMatches: score.cancelledMatches,
        positiveReviews: score.positiveReviews,
        negativeReviews: score.negativeReviews,
      },
      breakdown: {
        reliability: score.reliability,
        respect: score.respect,
        positivity: score.positivity,
      },
      flags: {
        isHighTrust: this.isHighTrustZone(userId),
        isNewbie: this.isNewbieFriendly(userId),
      },
    };
  }

  /**
   * Compare two users' trust scores
   */
  compareScores(userId1: string, userId2: string) {
    const score1 = this.getTrustScore(userId1);
    const score2 = this.getTrustScore(userId2);

    return {
      user1: {
        userId: userId1,
        overall: score1.overall,
        badge: this.getTrustBadge(score1.overall),
      },
      user2: {
        userId: userId2,
        overall: score2.overall,
        badge: this.getTrustBadge(score2.overall),
      },
      difference: score1.overall - score2.overall,
    };
  }

  /**
   * Get top trusted users
   */
  getTopTrustedUsers(limit: number = 10): TrustScore[] {
    const scores = localStorageService.getTrustScores();
    
    return Object.values(scores)
      .sort((a: any, b: any) => b.overall - a.overall)
      .slice(0, limit);
  }
}

export const trustScoreService = new TrustScoreService();
