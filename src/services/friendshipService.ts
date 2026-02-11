/**
 * Friendship Service
 * Manages friendships, compatibility scores, and network connections
 */

import { localStorageService } from './localStorageService';
import { mockDataService } from './mockDataService';

export interface Friendship {
  userId1: string;
  userId2: string;
  matchesTogether: number;
  firstMatchDate: Date;
  lastMatchDate: Date;
  strength: number; // 0-100 based on matches, interactions, etc.
  compatibility: number; // 0-100 AI-powered compatibility
  sharedInterests: string[];
  milestones: FriendshipMilestone[];
}

export interface FriendshipMilestone {
  type: 'first_match' | 'tenth_match' | 'one_year' | 'fifty_matches' | 'hundred_matches';
  date: Date;
  celebrated: boolean;
}

export interface CompatibilityScore {
  userId: string;
  targetUserId: string;
  overall: number; // 0-100
  playStyle: number;
  timing: number;
  location: number;
  interests: number;
  personality: number;
  reasons: string[];
}

export interface FriendshipConnection {
  userId: string;
  userName: string;
  avatar: string;
  strength: number;
  matchCount: number;
  lastPlayed: Date;
}

class FriendshipService {
  private readonly STORAGE_KEY = 'civta_friendships';

  /**
   * Get all friendships for a user
   */
  getFriendships(userId: string): Friendship[] {
    const allFriendships = this.getAllFriendships();
    return allFriendships.filter(
      f => f.userId1 === userId || f.userId2 === userId
    );
  }

  /**
   * Get friendship between two users
   */
  getFriendship(userId1: string, userId2: string): Friendship | undefined {
    const allFriendships = this.getAllFriendships();
    return allFriendships.find(
      f => (f.userId1 === userId1 && f.userId2 === userId2) ||
           (f.userId1 === userId2 && f.userId2 === userId1)
    );
  }

  /**
   * Record match together (creates or updates friendship)
   */
  recordMatchTogether(userId1: string, userId2: string, matchDate: Date): Friendship {
    const existing = this.getFriendship(userId1, userId2);
    
    if (existing) {
      existing.matchesTogether++;
      existing.lastMatchDate = matchDate;
      existing.strength = this.calculateStrength(existing);
      
      // Check for new milestones
      this.checkMilestones(existing);
      
      this.saveFriendship(existing);
      return existing;
    } else {
      const newFriendship: Friendship = {
        userId1,
        userId2,
        matchesTogether: 1,
        firstMatchDate: matchDate,
        lastMatchDate: matchDate,
        strength: 20, // Starting strength
        compatibility: this.calculateCompatibility(userId1, userId2).overall,
        sharedInterests: this.findSharedInterests(userId1, userId2),
        milestones: [{
          type: 'first_match',
          date: matchDate,
          celebrated: false
        }]
      };
      
      this.saveFriendship(newFriendship);
      return newFriendship;
    }
  }

  /**
   * Calculate friendship strength
   */
  private calculateStrength(friendship: Friendship): number {
    const { matchesTogether, firstMatchDate, lastMatchDate } = friendship;
    
    // Base score from matches
    let strength = Math.min(50, matchesTogether * 5);
    
    // Bonus for longevity
    const daysSinceFirst = Math.floor(
      (Date.now() - new Date(firstMatchDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    strength += Math.min(25, daysSinceFirst / 10);
    
    // Bonus for recent activity
    const daysSinceLast = Math.floor(
      (Date.now() - new Date(lastMatchDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLast < 7) strength += 15;
    else if (daysSinceLast < 30) strength += 10;
    
    return Math.min(100, Math.floor(strength));
  }

  /**
   * Calculate compatibility between two users
   */
  calculateCompatibility(userId1: string, userId2: string): CompatibilityScore {
    // Mock AI-powered compatibility (in real app, use ML model)
    const user1 = mockDataService.getUserById(userId1);
    const user2 = mockDataService.getUserById(userId2);
    
    if (!user1 || !user2) {
      return {
        userId: userId1,
        targetUserId: userId2,
        overall: 50,
        playStyle: 50,
        timing: 50,
        location: 50,
        interests: 50,
        personality: 50,
        reasons: ['Not enough data']
      };
    }

    // Calculate component scores
    const playStyle = 70 + Math.floor(Math.random() * 25);
    const timing = 65 + Math.floor(Math.random() * 30);
    const location = 60 + Math.floor(Math.random() * 35);
    const interests = 75 + Math.floor(Math.random() * 20);
    const personality = 70 + Math.floor(Math.random() * 25);
    
    const overall = Math.floor((playStyle + timing + location + interests + personality) / 5);
    
    const reasons: string[] = [];
    if (playStyle > 80) reasons.push('Similar play style and energy');
    if (timing > 75) reasons.push('Often available at same times');
    if (location > 70) reasons.push('Live in nearby areas');
    if (interests > 85) reasons.push('Share common interests');
    if (personality > 80) reasons.push('Compatible personalities');
    
    return {
      userId: userId1,
      targetUserId: userId2,
      overall,
      playStyle,
      timing,
      location,
      interests,
      personality,
      reasons: reasons.length > 0 ? reasons : ['Good potential for friendship!']
    };
  }

  /**
   * Get friend suggestions for user
   */
  getSuggestedFriends(userId: string, limit: number = 5): CompatibilityScore[] {
    const allUsers = mockDataService.getAllMockUsers();
    const existingFriends = this.getFriendships(userId);
    const existingFriendIds = new Set(
      existingFriends.map(f => f.userId1 === userId ? f.userId2 : f.userId1)
    );
    
    // Get users not already friends
    const potentialFriends = allUsers
      .filter(u => u.id !== userId && !existingFriendIds.has(u.id))
      .map(u => this.calculateCompatibility(userId, u.id))
      .sort((a, b) => b.overall - a.overall)
      .slice(0, limit);
    
    return potentialFriends;
  }

  /**
   * Get friendship network for visualization
   */
  getFriendshipNetwork(userId: string): FriendshipConnection[] {
    const friendships = this.getFriendships(userId);
    
    return friendships.map(f => {
      const friendId = f.userId1 === userId ? f.userId2 : f.userId1;
      const friend = mockDataService.getUserById(friendId);
      
      return {
        userId: friendId,
        userName: friend?.name || 'Unknown',
        avatar: friend?.avatar || '',
        strength: f.strength,
        matchCount: f.matchesTogether,
        lastPlayed: f.lastMatchDate
      };
    }).sort((a, b) => b.strength - a.strength);
  }

  /**
   * Check and add new milestones
   */
  private checkMilestones(friendship: Friendship): void {
    const { matchesTogether, firstMatchDate, milestones } = friendship;
    
    // Check for match count milestones
    if (matchesTogether === 10 && !milestones.find(m => m.type === 'tenth_match')) {
      milestones.push({
        type: 'tenth_match',
        date: new Date(),
        celebrated: false
      });
    }
    
    if (matchesTogether === 50 && !milestones.find(m => m.type === 'fifty_matches')) {
      milestones.push({
        type: 'fifty_matches',
        date: new Date(),
        celebrated: false
      });
    }
    
    if (matchesTogether === 100 && !milestones.find(m => m.type === 'hundred_matches')) {
      milestones.push({
        type: 'hundred_matches',
        date: new Date(),
        celebrated: false
      });
    }
    
    // Check for time-based milestones
    const daysSinceFirst = Math.floor(
      (Date.now() - new Date(firstMatchDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceFirst >= 365 && !milestones.find(m => m.type === 'one_year')) {
      milestones.push({
        type: 'one_year',
        date: new Date(),
        celebrated: false
      });
    }
  }

  /**
   * Mark milestone as celebrated
   */
  celebrateMilestone(userId1: string, userId2: string, milestoneType: string): void {
    const friendship = this.getFriendship(userId1, userId2);
    if (friendship) {
      const milestone = friendship.milestones.find(m => m.type === milestoneType);
      if (milestone) {
        milestone.celebrated = true;
        this.saveFriendship(friendship);
      }
    }
  }

  /**
   * Find shared interests between users
   */
  private findSharedInterests(userId1: string, userId2: string): string[] {
    // Mock implementation - in real app, analyze user profiles
    const interests = ['Football', 'Basketball', 'Cricket', 'Tennis', 'Badminton', 'Music', 'Food', 'Travel'];
    const sharedCount = 2 + Math.floor(Math.random() * 3);
    return interests.slice(0, sharedCount);
  }

  /**
   * Storage helpers
   */
  private getAllFriendships(): Friendship[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    const friendships = JSON.parse(stored);
    // Convert date strings back to Date objects
    return friendships.map((f: any) => ({
      ...f,
      firstMatchDate: new Date(f.firstMatchDate),
      lastMatchDate: new Date(f.lastMatchDate),
      milestones: f.milestones.map((m: any) => ({
        ...m,
        date: new Date(m.date)
      }))
    }));
  }

  private saveFriendship(friendship: Friendship): void {
    const allFriendships = this.getAllFriendships();
    const index = allFriendships.findIndex(
      f => (f.userId1 === friendship.userId1 && f.userId2 === friendship.userId2) ||
           (f.userId1 === friendship.userId2 && f.userId2 === friendship.userId1)
    );
    
    if (index >= 0) {
      allFriendships[index] = friendship;
    } else {
      allFriendships.push(friendship);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allFriendships));
  }

  /**
   * Initialize mock friendships for demo
   */
  initializeMockFriendships(): void {
    const mockFriendships: Friendship[] = [
      {
        userId1: 'user_001',
        userId2: 'user_002',
        matchesTogether: 15,
        firstMatchDate: new Date('2024-06-15'),
        lastMatchDate: new Date('2024-11-28'),
        strength: 85,
        compatibility: 92,
        sharedInterests: ['Football', 'Cricket', 'Music'],
        milestones: [
          { type: 'first_match', date: new Date('2024-06-15'), celebrated: true },
          { type: 'tenth_match', date: new Date('2024-10-20'), celebrated: false }
        ]
      },
      {
        userId1: 'user_001',
        userId2: 'user_003',
        matchesTogether: 8,
        firstMatchDate: new Date('2024-08-10'),
        lastMatchDate: new Date('2024-11-25'),
        strength: 65,
        compatibility: 78,
        sharedInterests: ['Football', 'Food'],
        milestones: [
          { type: 'first_match', date: new Date('2024-08-10'), celebrated: true }
        ]
      },
      {
        userId1: 'user_001',
        userId2: 'user_004',
        matchesTogether: 22,
        firstMatchDate: new Date('2024-05-01'),
        lastMatchDate: new Date('2024-11-29'),
        strength: 92,
        compatibility: 88,
        sharedInterests: ['Football', 'Basketball', 'Travel'],
        milestones: [
          { type: 'first_match', date: new Date('2024-05-01'), celebrated: true },
          { type: 'tenth_match', date: new Date('2024-08-15'), celebrated: true }
        ]
      },
      {
        userId1: 'user_001',
        userId2: 'user_005',
        matchesTogether: 5,
        firstMatchDate: new Date('2024-10-05'),
        lastMatchDate: new Date('2024-11-20'),
        strength: 45,
        compatibility: 82,
        sharedInterests: ['Cricket', 'Music'],
        milestones: [
          { type: 'first_match', date: new Date('2024-10-05'), celebrated: true }
        ]
      }
    ];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockFriendships));
  }
}

export const friendshipService = new FriendshipService();