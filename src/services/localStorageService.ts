/**
 * Local Storage Service
 * Handles all data persistence using browser localStorage
 */

const STORAGE_KEYS = {
  USER_PROFILE: 'avento_user_profile',
  SPORTS_MATCHES: 'avento_sports_matches',
  EVENTS: 'avento_events',
  PARTIES: 'avento_parties',
  TRUST_SCORES: 'avento_trust_scores',
  FRIENDSHIP_STREAKS: 'avento_friendship_streaks',
  PAYMENTS: 'avento_payments',
  CHAT_MESSAGES: 'avento_chat_messages',
  NOTIFICATIONS: 'avento_notifications',
  USER_PREFERENCES: 'avento_user_preferences',
} as const;

class LocalStorageService {
  // Generic get method
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  // Generic set method
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  }

  // Remove item
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  }

  // Clear all Avento data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      this.remove(key);
    });
  }

  // User Profile methods
  getUserProfile() {
    return this.get(STORAGE_KEYS.USER_PROFILE);
  }

  setUserProfile(profile: any) {
    this.set(STORAGE_KEYS.USER_PROFILE, profile);
  }

  // Matches methods
  getSportsMatches() {
    return this.get(STORAGE_KEYS.SPORTS_MATCHES) || [];
  }

  setSportsMatches(matches: any[]) {
    this.set(STORAGE_KEYS.SPORTS_MATCHES, matches);
  }

  // Events methods
  getEvents() {
    return this.get(STORAGE_KEYS.EVENTS) || [];
  }

  setEvents(events: any[]) {
    this.set(STORAGE_KEYS.EVENTS, events);
  }

  // Parties methods
  getParties() {
    return this.get(STORAGE_KEYS.PARTIES) || [];
  }

  setParties(parties: any[]) {
    this.set(STORAGE_KEYS.PARTIES, parties);
  }

  // Trust Scores methods
  getTrustScores() {
    return this.get(STORAGE_KEYS.TRUST_SCORES) || {};
  }

  setTrustScores(scores: any) {
    this.set(STORAGE_KEYS.TRUST_SCORES, scores);
  }

  // Friendship Streaks methods
  getFriendshipStreaks() {
    return this.get(STORAGE_KEYS.FRIENDSHIP_STREAKS) || {};
  }

  setFriendshipStreaks(streaks: any) {
    this.set(STORAGE_KEYS.FRIENDSHIP_STREAKS, streaks);
  }

  // Payments methods
  getPayments() {
    return this.get(STORAGE_KEYS.PAYMENTS) || [];
  }

  setPayments(payments: any[]) {
    this.set(STORAGE_KEYS.PAYMENTS, payments);
  }

  // Chat Messages methods
  getChatMessages(matchId: string) {
    const allMessages = this.get(STORAGE_KEYS.CHAT_MESSAGES) || {};
    return allMessages[matchId] || [];
  }

  setChatMessages(matchId: string, messages: any[]) {
    const allMessages = this.get(STORAGE_KEYS.CHAT_MESSAGES) || {};
    allMessages[matchId] = messages;
    this.set(STORAGE_KEYS.CHAT_MESSAGES, allMessages);
  }

  // Notifications methods
  getNotifications() {
    return this.get(STORAGE_KEYS.NOTIFICATIONS) || [];
  }

  setNotifications(notifications: any[]) {
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  // User Preferences methods
  getUserPreferences() {
    return this.get(STORAGE_KEYS.USER_PREFERENCES) || {};
  }

  setUserPreferences(preferences: any) {
    this.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }
}

export const localStorageService = new LocalStorageService();
export { STORAGE_KEYS };
