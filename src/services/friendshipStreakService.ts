/**
 * Friendship Streak Service
 * Tracks and manages friendship streaks between users
 * Celebrates consistency and deepens bonds through shared experiences
 */

import { localStorageService } from './localStorageService';

export interface FriendshipStreak {
  streakId: string;
  user1Id: string;
  user2Id: string;
  currentStreak: number; // Number of consecutive matches played together
  longestStreak: number;
  totalMatchesTogether: number;
  lastPlayedTogether: Date;
  streakStartDate: Date;
  isActive: boolean; // False if 30+ days since last match
  milestones: StreakMilestone[];
}

export interface StreakMilestone {
  matchCount: number;
  achievedDate: Date;
  badge: string;
  title: string;
}

class FriendshipStreakService {
  // Streak milestones
  private readonly MILESTONES = [
    { matches: 3, badge: '🤝', title: 'Regular Squad' },
    { matches: 5, badge: '⚡', title: 'Dynamic Duo' },
    { matches: 10, badge: '🔥', title: 'On Fire!' },
    { matches: 15, badge: '💪', title: 'Unstoppable' },
    { matches: 25, badge: '🏆', title: 'Champions' },
    { matches: 50, badge: '👑', title: 'Legendary Bond' },
  ];

  /**
   * Get or create friendship streak between two users
   */
  getStreak(user1Id: string, user2Id: string): FriendshipStreak {
    const streaks = localStorageService.getFriendshipStreaks();
    const streakId = this.generateStreakId(user1Id, user2Id);

    if (streaks[streakId]) {
      return streaks[streakId];
    }

    // Create new streak
    const newStreak: FriendshipStreak = {
      streakId,
      user1Id,
      user2Id,
      currentStreak: 0,
      longestStreak: 0,
      totalMatchesTogether: 0,
      lastPlayedTogether: new Date(),
      streakStartDate: new Date(),
      isActive: true,
      milestones: [],
    };

    this.saveStreak(newStreak);
    return newStreak;
  }

  /**
   * Record a match played together
   */
  recordMatchTogether(user1Id: string, user2Id: string, matchDate: Date = new Date()): FriendshipStreak {
    const streak = this.getStreak(user1Id, user2Id);

    // Check if streak is still active (less than 30 days since last match)
    const daysSinceLastMatch = this.getDaysDifference(streak.lastPlayedTogether, matchDate);
    
    if (daysSinceLastMatch > 30) {
      // Streak broken - reset
      streak.currentStreak = 1;
      streak.streakStartDate = matchDate;
      streak.isActive = true;
    } else {
      // Continue streak
      streak.currentStreak++;
      
      // Check if it's a new longest streak
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
    }

    streak.totalMatchesTogether++;
    streak.lastPlayedTogether = matchDate;

    // Check for new milestones
    const newMilestone = this.checkMilestone(streak);
    if (newMilestone) {
      streak.milestones.push(newMilestone);
    }

    this.saveStreak(streak);
    return streak;
  }

  /**
   * Check if a new milestone has been reached
   */
  private checkMilestone(streak: FriendshipStreak): StreakMilestone | null {
    const currentMatches = streak.currentStreak;
    
    // Find the highest milestone not yet achieved
    const milestone = this.MILESTONES
      .filter(m => m.matches === currentMatches)
      .find(m => !streak.milestones.some(sm => sm.matchCount === m.matches));

    if (milestone) {
      return {
        matchCount: milestone.matches,
        achievedDate: new Date(),
        badge: milestone.badge,
        title: milestone.title,
      };
    }

    return null;
  }

  /**
   * Get all active streaks for a user
   */
  getUserStreaks(userId: string): FriendshipStreak[] {
    const streaks = localStorageService.getFriendshipStreaks();
    
    return Object.values(streaks)
      .filter((streak: any) => 
        (streak.user1Id === userId || streak.user2Id === userId) && 
        streak.isActive
      )
      .sort((a: any, b: any) => b.currentStreak - a.currentStreak);
  }

  /**
   * Get top streaks for a user
   */
  getTopStreaks(userId: string, limit: number = 5): FriendshipStreak[] {
    return this.getUserStreaks(userId).slice(0, limit);
  }

  /**
   * Check if two users have an active streak
   */
  hasActiveStreak(user1Id: string, user2Id: string): boolean {
    const streak = this.getStreak(user1Id, user2Id);
    return streak.isActive && streak.currentStreak > 0;
  }

  /**
   * Get streak status for display
   */
  getStreakStatus(user1Id: string, user2Id: string) {
    const streak = this.getStreak(user1Id, user2Id);
    
    const daysSinceLastMatch = this.getDaysDifference(
      streak.lastPlayedTogether, 
      new Date()
    );

    const daysUntilExpiry = Math.max(0, 30 - daysSinceLastMatch);
    const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      totalMatches: streak.totalMatchesTogether,
      isActive: streak.isActive,
      daysUntilExpiry,
      isExpiringSoon,
      daysSinceLastMatch,
      nextMilestone: this.getNextMilestone(streak.currentStreak),
      latestMilestone: streak.milestones[streak.milestones.length - 1],
    };
  }

  /**
   * Get next milestone to achieve
   */
  private getNextMilestone(currentStreak: number) {
    const next = this.MILESTONES.find(m => m.matches > currentStreak);
    
    if (next) {
      return {
        matchCount: next.matches,
        matchesRemaining: next.matches - currentStreak,
        badge: next.badge,
        title: next.title,
      };
    }

    return null;
  }

  /**
   * Break a streak (manual or automatic)
   */
  breakStreak(user1Id: string, user2Id: string): void {
    const streak = this.getStreak(user1Id, user2Id);
    streak.isActive = false;
    this.saveStreak(streak);
  }

  /**
   * Check and update all streaks for expiry
   */
  checkStreakExpiry(): void {
    const streaks = localStorageService.getFriendshipStreaks();
    const now = new Date();

    Object.values(streaks).forEach((streak: any) => {
      if (streak.isActive) {
        const daysSinceLastMatch = this.getDaysDifference(
          new Date(streak.lastPlayedTogether),
          now
        );

        if (daysSinceLastMatch > 30) {
          streak.isActive = false;
          this.saveStreak(streak);
        }
      }
    });
  }

  /**
   * Get streak summary for dashboard
   */
  getStreakSummary(userId: string) {
    const streaks = this.getUserStreaks(userId);
    const totalStreaks = streaks.length;
    const longestStreak = Math.max(...streaks.map(s => s.longestStreak), 0);
    const activeStreaks = streaks.filter(s => s.isActive).length;

    // Get friends by streak strength
    const topFriends = streaks
      .sort((a, b) => b.totalMatchesTogether - a.totalMatchesTogether)
      .slice(0, 5)
      .map(s => ({
        friendId: s.user1Id === userId ? s.user2Id : s.user1Id,
        currentStreak: s.currentStreak,
        totalMatches: s.totalMatchesTogether,
        latestMilestone: s.milestones[s.milestones.length - 1],
      }));

    return {
      totalStreaks,
      activeStreaks,
      longestStreak,
      topFriends,
      totalMilestones: streaks.reduce((sum, s) => sum + s.milestones.length, 0),
    };
  }

  /**
   * Generate unique streak ID
   */
  private generateStreakId(user1Id: string, user2Id: string): string {
    // Sort IDs to ensure consistent streak ID regardless of order
    const [id1, id2] = [user1Id, user2Id].sort();
    return `${id1}_${id2}`;
  }

  /**
   * Calculate days between two dates
   */
  private getDaysDifference(date1: Date, date2: Date): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Save streak to storage
   */
  private saveStreak(streak: FriendshipStreak): void {
    const streaks = localStorageService.getFriendshipStreaks();
    streaks[streak.streakId] = streak;
    localStorageService.setFriendshipStreaks(streaks);
  }

  /**
   * Get celebration message for milestone
   */
  getCelebrationMessage(milestone: StreakMilestone): string {
    const messages = {
      'Regular Squad': 'You\'ve played 3 matches together! You\'re becoming regulars! 🤝',
      'Dynamic Duo': '5 matches strong! You two are unstoppable! ⚡',
      'On Fire!': '10 matches! Your friendship is on fire! 🔥',
      'Unstoppable': '15 matches! Nothing can stop this duo! 💪',
      'Champions': '25 matches! True champions of friendship! 🏆',
      'Legendary Bond': '50 matches! Your bond is legendary! 👑',
    };

    return messages[milestone.title] || 'Milestone achieved!';
  }
}

export const friendshipStreakService = new FriendshipStreakService();
