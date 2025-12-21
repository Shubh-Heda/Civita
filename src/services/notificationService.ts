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
}

export const notificationService = new NotificationService();
