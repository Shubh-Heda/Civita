/**
 * Gratitude Service
 * Manages community gratitude wall, shout-outs, and appreciation
 */

import { localStorageService } from './localStorageService';
import { mockDataService } from './mockDataService';

export interface GratitudePost {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  toUserId: string;
  toUserName: string;
  toUserAvatar: string;
  message: string;
  category: 'great_teammate' | 'newbie_helper' | 'positive_vibe' | 'skilled_player' | 'organizer' | 'other';
  matchId?: string;
  timestamp: Date;
  likes: string[]; // user IDs who liked
  isPublic: boolean;
}

export interface MVPOfKindness {
  userId: string;
  userName: string;
  avatar: string;
  gratitudeCount: number;
  week: string; // e.g., "2024-W48"
  topCategories: string[];
}

class GratitudeService {
  private readonly STORAGE_KEY = 'civta_gratitude';

  /**
   * Create a gratitude post
   */
  createGratitude(params: {
    fromUserId: string;
    toUserId: string;
    message: string;
    category: GratitudePost['category'];
    matchId?: string;
    isPublic?: boolean;
  }): GratitudePost {
    const fromUser = mockDataService.getUserById(params.fromUserId);
    const toUser = mockDataService.getUserById(params.toUserId);
    
    if (!fromUser || !toUser) {
      throw new Error('User not found');
    }

    const post: GratitudePost = {
      id: `grat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fromUserId: params.fromUserId,
      fromUserName: fromUser.name,
      fromUserAvatar: fromUser.avatar,
      toUserId: params.toUserId,
      toUserName: toUser.name,
      toUserAvatar: toUser.avatar,
      message: params.message,
      category: params.category,
      matchId: params.matchId,
      timestamp: new Date(),
      likes: [],
      isPublic: params.isPublic !== false
    };

    this.saveGratitude(post);
    return post;
  }

  /**
   * Get all public gratitude posts
   */
  getPublicGratitude(limit?: number): GratitudePost[] {
    const all = this.getAllGratitude();
    const publicPosts = all
      .filter(g => g.isPublic)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return limit ? publicPosts.slice(0, limit) : publicPosts;
  }

  /**
   * Get gratitude posts for a specific user
   */
  getGratitudeForUser(userId: string): GratitudePost[] {
    const all = this.getAllGratitude();
    return all
      .filter(g => g.toUserId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Get gratitude posts from a specific user
   */
  getGratitudeFromUser(userId: string): GratitudePost[] {
    const all = this.getAllGratitude();
    return all
      .filter(g => g.fromUserId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Like a gratitude post
   */
  likeGratitude(postId: string, userId: string): void {
    const all = this.getAllGratitude();
    const post = all.find(g => g.id === postId);
    
    if (post && !post.likes.includes(userId)) {
      post.likes.push(userId);
      this.saveAllGratitude(all);
    }
  }

  /**
   * Unlike a gratitude post
   */
  unlikeGratitude(postId: string, userId: string): void {
    const all = this.getAllGratitude();
    const post = all.find(g => g.id === postId);
    
    if (post) {
      post.likes = post.likes.filter(id => id !== userId);
      this.saveAllGratitude(all);
    }
  }

  /**
   * Get MVP of Kindness for current week
   */
  getMVPOfKindness(): MVPOfKindness | null {
    const currentWeek = this.getCurrentWeek();
    const weekStart = this.getWeekStart();
    
    const all = this.getAllGratitude();
    const thisWeek = all.filter(g => new Date(g.timestamp) >= weekStart);
    
    // Count gratitude by user
    const counts = new Map<string, { count: number; categories: string[] }>();
    
    thisWeek.forEach(g => {
      const current = counts.get(g.toUserId) || { count: 0, categories: [] };
      current.count++;
      current.categories.push(g.category);
      counts.set(g.toUserId, current);
    });
    
    if (counts.size === 0) return null;
    
    // Find user with most gratitude
    let maxCount = 0;
    let mvpUserId = '';
    
    counts.forEach((data, userId) => {
      if (data.count > maxCount) {
        maxCount = data.count;
        mvpUserId = userId;
      }
    });
    
    const user = mockDataService.getUserById(mvpUserId);
    if (!user) return null;
    
    const userData = counts.get(mvpUserId)!;
    const topCategories = this.getTopCategories(userData.categories);
    
    return {
      userId: mvpUserId,
      userName: user.name,
      avatar: user.avatar,
      gratitudeCount: maxCount,
      week: currentWeek,
      topCategories
    };
  }

  /**
   * Get category display info
   */
  getCategoryInfo(category: GratitudePost['category']): { label: string; emoji: string; color: string } {
    const info = {
      great_teammate: { label: 'Great Teammate', emoji: '🤝', color: 'from-blue-500 to-cyan-500' },
      newbie_helper: { label: 'Newbie Helper', emoji: '🌟', color: 'from-yellow-500 to-orange-500' },
      positive_vibe: { label: 'Positive Vibe', emoji: '✨', color: 'from-pink-500 to-purple-500' },
      skilled_player: { label: 'Skilled Player', emoji: '⚡', color: 'from-green-500 to-emerald-500' },
      organizer: { label: 'Great Organizer', emoji: '🎯', color: 'from-indigo-500 to-blue-500' },
      other: { label: 'Appreciation', emoji: '❤️', color: 'from-red-500 to-pink-500' }
    };
    
    return info[category];
  }

  /**
   * Storage helpers
   */
  private getAllGratitude(): GratitudePost[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    const posts = JSON.parse(stored);
    return posts.map((p: any) => ({
      ...p,
      timestamp: new Date(p.timestamp)
    }));
  }

  private saveGratitude(post: GratitudePost): void {
    const all = this.getAllGratitude();
    all.push(post);
    this.saveAllGratitude(all);
  }

  private saveAllGratitude(posts: GratitudePost[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
  }

  private getCurrentWeek(): string {
    const now = new Date();
    const year = now.getFullYear();
    const week = this.getWeekNumber(now);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  private getWeekStart(): Date {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(now.setDate(diff));
  }

  private getTopCategories(categories: string[]): string[] {
    const counts = new Map<string, number>();
    categories.forEach(c => counts.set(c, (counts.get(c) || 0) + 1));
    
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);
  }

  /**
   * Initialize mock gratitude data
   */
  initializeMockGratitude(): void {
    const mockPosts: GratitudePost[] = [
      {
        id: 'grat_1',
        fromUserId: 'user_002',
        fromUserName: 'Priya Sharma',
        fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        toUserId: 'user_001',
        toUserName: 'Arjun Patel',
        toUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
        message: 'Thanks for being such a supportive teammate! Your energy is contagious 🔥',
        category: 'great_teammate',
        matchId: 'match1',
        timestamp: new Date('2024-11-28T18:30:00'),
        likes: ['user_003', 'user_004', 'user_005'],
        isPublic: true
      },
      {
        id: 'grat_2',
        fromUserId: 'user_005',
        fromUserName: 'Vikram Singh',
        fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
        toUserId: 'user_001',
        toUserName: 'Arjun Patel',
        toUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
        message: 'Really appreciate you helping me with my serves! You\'re an amazing coach 🎾',
        category: 'newbie_helper',
        timestamp: new Date('2024-11-27T16:00:00'),
        likes: ['user_002', 'user_006'],
        isPublic: true
      },
      {
        id: 'grat_3',
        fromUserId: 'user_001',
        fromUserName: 'Arjun Patel',
        fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
        toUserId: 'user_004',
        toUserName: 'Sneha Desai',
        toUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
        message: 'Your positivity makes every match so much fun! Thanks for the great vibes ✨',
        category: 'positive_vibe',
        timestamp: new Date('2024-11-26T20:15:00'),
        likes: ['user_002', 'user_003', 'user_005', 'user_007'],
        isPublic: true
      },
      {
        id: 'grat_4',
        fromUserId: 'user_003',
        fromUserName: 'Rahul Kumar',
        fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        toUserId: 'user_002',
        toUserName: 'Priya Sharma',
        toUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        message: 'Amazing organizing skills! The match was perfectly planned 🎯',
        category: 'organizer',
        timestamp: new Date('2024-11-25T19:00:00'),
        likes: ['user_001', 'user_004'],
        isPublic: true
      }
    ];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockPosts));
  }
}

export const gratitudeService = new GratitudeService();