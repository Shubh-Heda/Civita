/**
 * Compatibility Service
 * Calculates friendship compatibility scores between users
 */

import { mockDataService } from './mockDataService';
import { trustScoreService } from './trustScoreService';
import { friendshipService } from './friendshipService';

export interface CompatibilityScore {
  userId1: string;
  userId2: string;
  overall: number; // 0-100
  factors: {
    skillLevel: number;
    playStyle: number;
    timing: number;
    location: number;
    interests: number;
    trustAlignment: number;
  };
  suggestions: string[];
  chemistryIndicator: 'high' | 'medium' | 'low';
}

export interface CompatibilitySuggestion {
  userId: string;
  userName: string;
  userAvatar: string;
  compatibilityScore: number;
  reason: string;
  sharedInterests: string[];
}

class CompatibilityService {
  /**
   * Calculate compatibility between two users
   */
  calculateCompatibility(userId1: string, userId2: string): CompatibilityScore {
    const user1 = mockDataService.getUserById(userId1);
    const user2 = mockDataService.getUserById(userId2);

    if (!user1 || !user2) {
      throw new Error('User not found');
    }

    const trust1 = trustScoreService.getTrustScore(userId1);
    const trust2 = trustScoreService.getTrustScore(userId2);

    // Calculate individual factors (mock logic - in real app would use actual user data)
    const skillLevel = 100 - Math.abs(Math.random() * 30); // Similar skill levels
    const playStyle = Math.random() * 40 + 60; // Play style compatibility
    const timing = Math.random() * 30 + 70; // Available at similar times
    const location = Math.random() * 20 + 80; // Near each other
    const interests = this.calculateSharedInterests(userId1, userId2);
    const trustAlignment = 100 - Math.abs((trust1?.overall || 75) - (trust2?.overall || 75));

    const factors = {
      skillLevel,
      playStyle,
      timing,
      location,
      interests,
      trustAlignment
    };

    // Weighted average
    const overall = Math.round(
      skillLevel * 0.15 +
      playStyle * 0.20 +
      timing * 0.15 +
      location * 0.10 +
      interests * 0.25 +
      trustAlignment * 0.15
    );

    const suggestions = this.generateSuggestions(factors);
    const chemistryIndicator = overall >= 80 ? 'high' : overall >= 60 ? 'medium' : 'low';

    return {
      userId1,
      userId2,
      overall,
      factors,
      suggestions,
      chemistryIndicator
    };
  }

  /**
   * Get compatibility suggestions for a user
   */
  getCompatibilitySuggestions(userId: string, limit: number = 5): CompatibilitySuggestion[] {
    const allUsers = mockDataService.getAllMockUsers();
    const suggestions: CompatibilitySuggestion[] = [];

    for (const user of allUsers) {
      if (user.id === userId) continue;

      // Check if already friends
      const friendship = friendshipService.getFriendship(userId, user.id);
      if (friendship && friendship.matchesTogether > 5) continue; // Skip close friends

      const compatibility = this.calculateCompatibility(userId, user.id);
      
      if (compatibility.overall >= 70) {
        suggestions.push({
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          compatibilityScore: compatibility.overall,
          reason: this.getTopReason(compatibility),
          sharedInterests: ['Football', 'Weekend sports'] // Mock
        });
      }
    }

    return suggestions
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, limit);
  }

  /**
   * Get dream team suggestions for a match
   */
  getDreamTeamSuggestions(userId: string, matchType: string, playersNeeded: number): CompatibilitySuggestion[] {
    const allUsers = mockDataService.getAllMockUsers();
    const dreamTeam: CompatibilitySuggestion[] = [];

    for (const user of allUsers) {
      if (user.id === userId) continue;
      
      const compatibility = this.calculateCompatibility(userId, user.id);
      
      dreamTeam.push({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        compatibilityScore: compatibility.overall,
        reason: `Great ${matchType} partner`,
        sharedInterests: ['Football', 'Competitive play']
      });
    }

    return dreamTeam
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, playersNeeded);
  }

  /**
   * Calculate shared interests score
   */
  private calculateSharedInterests(userId1: string, userId2: string): number {
    // Mock implementation
    const sharedCount = Math.floor(Math.random() * 4) + 1;
    return Math.min(100, sharedCount * 25);
  }

  /**
   * Generate compatibility suggestions
   */
  private generateSuggestions(factors: CompatibilityScore['factors']): string[] {
    const suggestions: string[] = [];

    if (factors.timing > 80) {
      suggestions.push('You both prefer similar match times');
    }
    if (factors.interests > 75) {
      suggestions.push('Strong shared interests in sports');
    }
    if (factors.trustAlignment > 85) {
      suggestions.push('Similar trust and reliability levels');
    }
    if (factors.location > 90) {
      suggestions.push('Live/play in nearby areas');
    }
    if (factors.playStyle > 75) {
      suggestions.push('Compatible playing styles');
    }

    return suggestions;
  }

  /**
   * Get top compatibility reason
   */
  private getTopReason(compatibility: CompatibilityScore): string {
    const factors = compatibility.factors;
    const max = Math.max(
      factors.skillLevel,
      factors.playStyle,
      factors.timing,
      factors.interests,
      factors.trustAlignment
    );

    if (max === factors.interests) return 'Shared sports interests';
    if (max === factors.playStyle) return 'Similar play styles';
    if (max === factors.timing) return 'Available at same times';
    if (max === factors.trustAlignment) return 'Similar reliability levels';
    return 'Great overall match';
  }
}

export const compatibilityService = new CompatibilityService();
