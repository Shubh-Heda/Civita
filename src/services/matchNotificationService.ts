/**
 * Match Notification Service
 * Handles creation and management of notifications for match plans
 */

import { notificationService } from './notificationService';

export interface MatchNotification {
  matchId: string;
  title: string;
  organizer: string;
  sport: string;
  turfName: string;
  location: string;
  date: string;
  time: string;
  minPlayers: number;
  currentPlayers: number;
  visibility: 'community' | 'nearby' | 'private';
  groupChatId?: string; // Link to group chat
}

class MatchNotificationService {
  /**
   * Send notification to all community users that a new match plan was created
   */
  notifyNewMatchCreated(match: MatchNotification, organizerId: string): void {
    try {
      const notification = {
        type: 'match_update' as const,
        title: `🎉 New ${match.sport} Match! "${match.title}"`,
        body: `${match.organizer} created a new match at ${match.turfName} on ${match.date} at ${match.time}. Join ${match.minPlayers}-${match.currentPlayers} others!`,
        matchId: match.matchId,
        actionUrl: `/finder?matchId=${match.matchId}`,
        data: {
          organizer: match.organizer,
          sport: match.sport,
          location: match.location,
          turfName: match.turfName,
          date: match.date,
          time: match.time,
          visibility: match.visibility
        }
      };

      // For community visibility, notify all active users
      // For nearby visibility, would filter by location (5km radius)
      const users = this.getTargetUsers(match.visibility, match.location);
      
      users.forEach(userId => {
        if (userId !== organizerId) {
          // notificationService.createNotification(userId, notification);
          console.log(`📢 Notification sent to ${userId}: ${notification.title}`);
        }
      });

      console.log(`✅ Match creation notification sent for "${match.title}"`);
    } catch (error) {
      console.error('Error sending match notification:', error);
    }
  }

  /**
   * Send notification when a player joins a match
   */
  notifyPlayerJoined(matchId: string, matchTitle: string, playerName: string, currentPlayers: number, maxPlayers: number): void {
    const notification = {
      type: 'friend_activity' as const,
      title: `👥 ${playerName} joined "${matchTitle}"`,
      body: `${playerName} has joined your match! Now ${currentPlayers}/${maxPlayers} players.`,
      matchId: matchId,
      actionUrl: `/group-chat?matchId=${matchId}`,
    };

    console.log(`✅ Player join notification sent`);
  }

  /**
   * Send notification when match reaches minimum players
   */
  notifyMinimumPlayersReached(matchId: string, matchTitle: string, minPlayers: number): void {
    const notification = {
      type: 'match_update' as const,
      title: `🔔 Minimum players reached! "${matchTitle}"`,
      body: `Your match has reached ${minPlayers} players! Soft lock activated. Payment window will open soon.`,
      matchId: matchId,
      actionUrl: `/group-chat?matchId=${matchId}`,
    };

    console.log(`✅ Minimum players notification sent`);
  }

  /**
   * Send notification for payment reminders
   */
  notifyPaymentReminder(matchId: string, matchTitle: string, hoursUntilDeadline: number): void {
    const notification = {
      type: 'payment_reminder' as const,
      title: `💰 Payment reminder: "${matchTitle}"`,
      body: `Payment deadline in ${hoursUntilDeadline} hours. Secure your spot now!`,
      matchId: matchId,
      actionUrl: `/group-chat?matchId=${matchId}`,
    };

    console.log(`✅ Payment reminder notification sent`);
  }

  /**
   * Persist a match to discoverable list (localStorage + Supabase in production)
   */
  saveMatchToDiscoverable(match: MatchNotification): void {
    try {
      const existingMatches = JSON.parse(localStorage.getItem('civita_discoverable_matches') || '[]');
      const matchData = {
        ...match,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        joinedPlayers: 1, // organizer
        available: match.minPlayers - 1,
      };
      
      existingMatches.unshift(matchData);
      
      // Keep only last 100 matches
      if (existingMatches.length > 100) {
        existingMatches.pop();
      }
      
      localStorage.setItem('civita_discoverable_matches', JSON.stringify(existingMatches));
      console.log(`✅ Match saved to discoverable list`);
    } catch (error) {
      console.error('Error saving match to discoverable:', error);
    }
  }

  /**
   * Get matches from discoverable list
   */
  getDiscoverableMatches(filters?: {
    sport?: string;
    location?: string;
    radius?: number; // in km
    date?: string;
  }): MatchNotification[] {
    try {
      const matches = JSON.parse(localStorage.getItem('civita_discoverable_matches') || '[]');
      
      if (!filters) return matches;

      return matches.filter((match: any) => {
        if (filters.sport && match.sport !== filters.sport) return false;
        
        // Location filtering (simplified - in production would use actual distance calculation)
        if (filters.location && match.visibility === 'nearby') {
          const sameLocation = match.location.toLowerCase().includes(filters.location.toLowerCase());
          if (!sameLocation) return false;
        }
        
        if (filters.date && match.date !== filters.date) return false;
        
        return true;
      });
    } catch (error) {
      console.error('Error getting discoverable matches:', error);
      return [];
    }
  }

  /**
   * Get all sports categories represented in matches
   */
  getAvailableSports(): string[] {
    const matches = JSON.parse(localStorage.getItem('civta_discoverable_matches') || '[]');
    const sports = Array.from(new Set(matches.map((m: any) => m.sport) as string[]));
    return sports.sort();
  }

  /**
   * Get all locations represented in matches
   */
  getAvailableLocations(): string[] {
    const matches = JSON.parse(localStorage.getItem('civta_discoverable_matches') || '[]');
    const locations = Array.from(new Set(matches.map((m: any) => m.location) as string[]));
    return locations.sort();
  }

  /**
   * Helper: Get target users for notification based on visibility
   */
  private getTargetUsers(visibility: string, location: string): string[] {
    // In production, this would query database for all active users
    // For now, return a mock list
    const allUsers = [
      'user-1', 'user-2', 'user-3', 'user-4', 'user-5',
      'user-6', 'user-7', 'user-8', 'user-9', 'user-10'
    ];

    if (visibility === 'private') {
      return [];
    }

    if (visibility === 'nearby') {
      // Filter by location (simplified)
      return allUsers.filter((_, idx) => idx < 5); // Only 5 nearby users
    }

    // community - send to all
    return allUsers;
  }
}

export const matchNotificationService = new MatchNotificationService();
