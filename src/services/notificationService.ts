export interface NotificationPreferences {
  userId: string;
  matchUpdates: {
    enabled: boolean;
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  friendActivity: {
    enabled: boolean;
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  achievements: {
    enabled: boolean;
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  paymentReminders: {
    enabled: boolean;
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  communityUpdates: {
    enabled: boolean;
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  promotions: {
    enabled: boolean;
    push: boolean;
    email: boolean;
    inApp: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string;
  };
  matchDayOnly: boolean; // Only receive notifications on match days
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match_update' | 'payment_reminder' | 'achievement' | 'friend_activity' | 'community_update' | 'promotion';
  title: string;
  body: string;
  matchId?: string;
  actionUrl?: string;
  timestamp: Date;
  read: boolean;
  reminderType?: string; // e.g., 'sevenDays', 'threeDays', 'oneDay', 'hourly'
  data?: Record<string, any>;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  userId: '',
  matchUpdates: {
    enabled: true,
    push: true,
    email: true,
    inApp: true
  },
  friendActivity: {
    enabled: true,
    push: true,
    email: false,
    inApp: true
  },
  achievements: {
    enabled: true,
    push: true,
    email: false,
    inApp: true
  },
  paymentReminders: {
    enabled: true,
    push: true,
    email: true,
    inApp: true
  },
  communityUpdates: {
    enabled: true,
    push: false,
    email: false,
    inApp: true
  },
  promotions: {
    enabled: false,
    push: false,
    email: false,
    inApp: true
  },
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00'
  },
  matchDayOnly: false
};

class NotificationService {
  private preferences: Map<string, NotificationPreferences> = new Map();
  private notifications: Map<string, Notification[]> = new Map(); // userId -> notifications

  constructor() {
    this.initializeDefaults();
  }

  private initializeDefaults() {
    ['user1', 'user2', 'user3', 'user4', 'user5'].forEach(userId => {
      this.preferences.set(userId, {
        ...DEFAULT_PREFERENCES,
        userId
      });
    });
  }

  getPreferences(userId: string): NotificationPreferences {
    return this.preferences.get(userId) || { ...DEFAULT_PREFERENCES, userId };
  }

  updatePreferences(userId: string, updates: Partial<NotificationPreferences>): NotificationPreferences {
    const current = this.getPreferences(userId);
    const updated = { ...current, ...updates };
    this.preferences.set(userId, updated);
    return updated;
  }

  updateCategoryPreferences(
    userId: string,
    category: keyof Omit<NotificationPreferences, 'userId' | 'quietHours' | 'matchDayOnly'>,
    settings: Partial<NotificationPreferences[typeof category]>
  ): NotificationPreferences {
    const current = this.getPreferences(userId);
    const updated = {
      ...current,
      [category]: {
        ...current[category],
        ...settings
      }
    };
    this.preferences.set(userId, updated);
    return updated;
  }

  enableQuietHours(userId: string, startTime: string, endTime: string): NotificationPreferences {
    const current = this.getPreferences(userId);
    const updated = {
      ...current,
      quietHours: {
        enabled: true,
        startTime,
        endTime
      }
    };
    this.preferences.set(userId, updated);
    return updated;
  }

  disableQuietHours(userId: string): NotificationPreferences {
    const current = this.getPreferences(userId);
    const updated = {
      ...current,
      quietHours: {
        ...current.quietHours,
        enabled: false
      }
    };
    this.preferences.set(userId, updated);
    return updated;
  }

  toggleMatchDayOnly(userId: string): NotificationPreferences {
    const current = this.getPreferences(userId);
    const updated = {
      ...current,
      matchDayOnly: !current.matchDayOnly
    };
    this.preferences.set(userId, updated);
    return updated;
  }

  shouldSendNotification(
    userId: string,
    category: keyof Omit<NotificationPreferences, 'userId' | 'quietHours' | 'matchDayOnly'>,
    channel: 'push' | 'email' | 'inApp'
  ): boolean {
    const prefs = this.getPreferences(userId);
    const categoryPrefs = prefs[category];

    if (!categoryPrefs.enabled) return false;
    if (!categoryPrefs[channel]) return false;

    // Check quiet hours
    if (prefs.quietHours.enabled && channel === 'push') {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const { startTime, endTime } = prefs.quietHours;
      
      // Simple time range check (doesn't handle overnight ranges perfectly, but good enough for mock)
      if (currentTime >= startTime || currentTime <= endTime) {
        return false;
      }
    }

    return true;
  }

  resetToDefaults(userId: string): NotificationPreferences {
    const defaults = { ...DEFAULT_PREFERENCES, userId };
    this.preferences.set(userId, defaults);
    return defaults;
  }

  /**
   * Add a notification to a user's queue
   */
  addNotification(notification: Omit<Notification, 'id'>): Notification {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullNotification: Notification = {
      ...notification,
      id,
    };

    if (!this.notifications.has(notification.userId)) {
      this.notifications.set(notification.userId, []);
    }

    this.notifications.get(notification.userId)!.push(fullNotification);

    // Store in localStorage for persistence
    this.persistNotifications(notification.userId);

    return fullNotification;
  }

  /**
   * Get all notifications for a user
   */
  getNotifications(userId: string, limit: number = 50): Notification[] {
    const userNotifications = this.notifications.get(userId) || [];
    return userNotifications.slice(-limit).reverse(); // Most recent first
  }

  /**
   * Get unread notifications count
   */
  getUnreadCount(userId: string): number {
    const userNotifications = this.notifications.get(userId) || [];
    return userNotifications.filter(n => !n.read).length;
  }

  /**
   * Mark notification as read
   */
  markAsRead(userId: string, notificationId: string): void {
    const userNotifications = this.notifications.get(userId) || [];
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.persistNotifications(userId);
    }
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(userId: string): void {
    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.forEach(n => {
      n.read = true;
    });
    this.persistNotifications(userId);
  }

  /**
   * Delete a notification
   */
  deleteNotification(userId: string, notificationId: string): void {
    const userNotifications = this.notifications.get(userId) || [];
    const index = userNotifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      userNotifications.splice(index, 1);
      this.persistNotifications(userId);
    }
  }

  /**
   * Clear all notifications for a user
   */
  clearNotifications(userId: string): void {
    this.notifications.set(userId, []);
    this.persistNotifications(userId);
  }

  /**
   * Persist notifications to localStorage
   */
  private persistNotifications(userId: string): void {
    const userNotifications = this.notifications.get(userId) || [];
    try {
      localStorage.setItem(
        `notifications_${userId}`,
        JSON.stringify(userNotifications.map(n => ({
          ...n,
          timestamp: n.timestamp.toISOString(),
        })))
      );
    } catch (error) {
      console.error('Failed to persist notifications:', error);
    }
  }

  /**
   * Load notifications from localStorage
   */
  loadNotifications(userId: string): void {
    try {
      const stored = localStorage.getItem(`notifications_${userId}`);
      if (stored) {
        const notifications = JSON.parse(stored).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        this.notifications.set(userId, notifications);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  /**
   * Get payment reminders for a match
   */
  getPaymentReminders(userId: string, matchId: string): Notification[] {
    const userNotifications = this.notifications.get(userId) || [];
    return userNotifications.filter(
      n => n.type === 'payment_reminder' && n.matchId === matchId
    );
  }
}

export const notificationService = new NotificationService();
