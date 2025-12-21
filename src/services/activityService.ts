import { mockUsers, mockMatches } from './mockData';

export interface Activity {
  id: string;
  type: 'match_join' | 'match_complete' | 'friend_add' | 'achievement_unlock' | 'trust_increase' | 'streak_milestone' | 'photo_upload' | 'mvp_won' | 'squad_create' | 'payment_complete';
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: Date;
  data: any;
  read: boolean;
}

class ActivityService {
  private activities: Activity[] = [];

  constructor() {
    this.generateMockActivities();
  }

  private generateMockActivities() {
    const now = Date.now();
    const activities: Activity[] = [];

    // Generate diverse activities
    mockUsers.forEach((user, index) => {
      // Match joins (recent)
      if (Math.random() > 0.3) {
        const match = mockMatches[Math.floor(Math.random() * mockMatches.length)];
        activities.push({
          id: `activity-${activities.length}`,
          type: 'match_join',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 3 * 60 * 60 * 1000), // Last 3 hours
          data: { 
            matchId: match.id,
            matchTitle: match.title,
            sport: match.sport,
            dateTime: match.dateTime
          },
          read: Math.random() > 0.4
        });
      }

      // Achievement unlocks
      if (Math.random() > 0.5) {
        const achievements = ['Week Warrior', 'Friend Maker', 'Regular Player', 'Always On Time', 'Memory Maker'];
        const achievement = achievements[Math.floor(Math.random() * achievements.length)];
        activities.push({
          id: `activity-${activities.length}`,
          type: 'achievement_unlock',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 24 * 60 * 60 * 1000), // Last 24 hours
          data: { 
            achievementName: achievement,
            xpEarned: Math.floor(Math.random() * 500) + 100
          },
          read: Math.random() > 0.5
        });
      }

      // Trust score increases
      if (Math.random() > 0.6 && user.trustScore >= 85) {
        activities.push({
          id: `activity-${activities.length}`,
          type: 'trust_increase',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 12 * 60 * 60 * 1000), // Last 12 hours
          data: { 
            newScore: user.trustScore,
            increase: Math.floor(Math.random() * 5) + 1
          },
          read: Math.random() > 0.6
        });
      }

      // Streak milestones
      if (user.currentStreak && user.currentStreak >= 7) {
        activities.push({
          id: `activity-${activities.length}`,
          type: 'streak_milestone',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 24 * 60 * 60 * 1000),
          data: { 
            streakDays: user.currentStreak
          },
          read: Math.random() > 0.5
        });
      }

      // Photo uploads
      if (Math.random() > 0.4) {
        activities.push({
          id: `activity-${activities.length}`,
          type: 'photo_upload',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 6 * 60 * 60 * 1000), // Last 6 hours
          data: { 
            photoCount: Math.floor(Math.random() * 3) + 1,
            matchTitle: mockMatches[Math.floor(Math.random() * mockMatches.length)].title
          },
          read: Math.random() > 0.5
        });
      }

      // Match completions
      if (Math.random() > 0.4) {
        const match = mockMatches[Math.floor(Math.random() * mockMatches.length)];
        activities.push({
          id: `activity-${activities.length}`,
          type: 'match_complete',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 48 * 60 * 60 * 1000), // Last 2 days
          data: { 
            matchTitle: match.title,
            sport: match.sport,
            rating: Math.floor(Math.random() * 2) + 4 // 4-5 stars
          },
          read: Math.random() > 0.3
        });
      }

      // Squad creations
      if (Math.random() > 0.8) {
        const squadNames = ['Weekend Warriors', 'The A-Team', 'Victory Squad', 'Thunder Strikers', 'Champions Club'];
        activities.push({
          id: `activity-${activities.length}`,
          type: 'squad_create',
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          timestamp: new Date(now - Math.random() * 72 * 60 * 60 * 1000), // Last 3 days
          data: { 
            squadName: squadNames[Math.floor(Math.random() * squadNames.length)]
          },
          read: Math.random() > 0.4
        });
      }
    });

    // Sort by timestamp (newest first)
    this.activities = activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getAllActivities(): Activity[] {
    return this.activities;
  }

  getUserActivities(userId: string): Activity[] {
    return this.activities.filter(a => a.userId === userId);
  }

  getRecentActivities(limit: number = 20): Activity[] {
    return this.activities.slice(0, limit);
  }

  getUnreadActivities(): Activity[] {
    return this.activities.filter(a => !a.read);
  }

  markAsRead(activityId: string): void {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity) {
      activity.read = true;
    }
  }

  markAllAsRead(): void {
    this.activities.forEach(a => a.read = true);
  }

  addActivity(activity: Omit<Activity, 'id' | 'timestamp' | 'read'>): Activity {
    const newActivity: Activity = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      read: false
    };

    this.activities.unshift(newActivity);
    return newActivity;
  }

  getActivitiesByType(type: Activity['type']): Activity[] {
    return this.activities.filter(a => a.type === type);
  }

  getFriendActivities(friendIds: string[]): Activity[] {
    return this.activities.filter(a => friendIds.includes(a.userId));
  }
}

export const activityService = new ActivityService();