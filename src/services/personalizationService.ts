/**
 * Personalization Service
 * Manages user customization preferences including themes, frames, and settings
 */

export interface UserTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  gradient: string;
}

export interface UserPreferences {
  userId: string;
  selectedTheme: string;
  selectedAvatarFrame: string;
  selectedBadges: string[];
  customBackground?: string;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  notificationStyle: 'minimal' | 'standard' | 'rich';
}

class PersonalizationService {
  private STORAGE_KEY = 'avento_personalization';

  /**
   * Get available themes
   */
  getAvailableThemes(): UserTheme[] {
    return [
      {
        id: 'default',
        name: 'Ocean Breeze',
        primary: 'cyan',
        secondary: 'blue',
        accent: 'emerald',
        background: 'from-cyan-50 via-blue-50 to-emerald-50',
        gradient: 'from-cyan-500 via-blue-500 to-emerald-500'
      },
      {
        id: 'sunset',
        name: 'Warm Sunset',
        primary: 'orange',
        secondary: 'red',
        accent: 'pink',
        background: 'from-orange-50 via-red-50 to-pink-50',
        gradient: 'from-orange-500 via-red-500 to-pink-500'
      },
      {
        id: 'forest',
        name: 'Fresh Forest',
        primary: 'emerald',
        secondary: 'green',
        accent: 'teal',
        background: 'from-emerald-50 via-green-50 to-teal-50',
        gradient: 'from-emerald-500 via-green-500 to-teal-500'
      },
      {
        id: 'lavender',
        name: 'Lavender Dreams',
        primary: 'purple',
        secondary: 'pink',
        accent: 'indigo',
        background: 'from-purple-50 via-pink-50 to-indigo-50',
        gradient: 'from-purple-500 via-pink-500 to-indigo-500'
      },
      {
        id: 'golden',
        name: 'Golden Hour',
        primary: 'amber',
        secondary: 'yellow',
        accent: 'orange',
        background: 'from-amber-50 via-yellow-50 to-orange-50',
        gradient: 'from-amber-500 via-yellow-500 to-orange-500'
      },
      {
        id: 'midnight',
        name: 'Midnight Blue',
        primary: 'blue',
        secondary: 'indigo',
        accent: 'purple',
        background: 'from-blue-50 via-indigo-50 to-purple-50',
        gradient: 'from-blue-500 via-indigo-500 to-purple-500'
      }
    ];
  }

  /**
   * Get user preferences
   */
  getUserPreferences(userId: string): UserPreferences {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const prefs = data ? JSON.parse(data) : {};
    
    return prefs[userId] || {
      userId,
      selectedTheme: 'default',
      selectedAvatarFrame: 'default',
      selectedBadges: [],
      animationsEnabled: true,
      soundEnabled: true,
      notificationStyle: 'standard'
    };
  }

  /**
   * Update user preferences
   */
  updatePreferences(userId: string, updates: Partial<UserPreferences>): UserPreferences {
    const current = this.getUserPreferences(userId);
    const updated = { ...current, ...updates };

    const data = localStorage.getItem(this.STORAGE_KEY);
    const prefs = data ? JSON.parse(data) : {};
    prefs[userId] = updated;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));

    return updated;
  }

  /**
   * Set theme
   */
  setTheme(userId: string, themeId: string): void {
    this.updatePreferences(userId, { selectedTheme: themeId });
  }

  /**
   * Set avatar frame
   */
  setAvatarFrame(userId: string, frameId: string): void {
    this.updatePreferences(userId, { selectedAvatarFrame: frameId });
  }

  /**
   * Set selected badges (max 3)
   */
  setSelectedBadges(userId: string, badges: string[]): void {
    this.updatePreferences(userId, { selectedBadges: badges.slice(0, 3) });
  }

  /**
   * Get current theme object
   */
  getCurrentTheme(userId: string): UserTheme {
    const prefs = this.getUserPreferences(userId);
    const themes = this.getAvailableThemes();
    return themes.find(t => t.id === prefs.selectedTheme) || themes[0];
  }
}

export const personalizationService = new PersonalizationService();
