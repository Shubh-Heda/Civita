/**
 * Achievement & Gamification Service
 * Manages user achievements, badges, levels, and quests
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'social' | 'trust' | 'streak' | 'special' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: Date;
  reward?: {
    xp: number;
    badge?: string;
    avatarFrame?: string;
  };
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  progress: number;
  maxProgress: number;
  completed: boolean;
  expiresAt: Date;
  reward: {
    xp: number;
    items?: string[];
  };
}

export interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  title: string;
  perks: string[];
}

export interface AvatarFrame {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  requirement: string;
  gradient: string;
}

class AchievementService {
  private STORAGE_KEY = 'avento_achievements';
  private LEVEL_KEY = 'avento_user_level';
  private FRAMES_KEY = 'avento_avatar_frames';
  private QUESTS_KEY = 'avento_quests';

  /**
   * Get user level and XP
   */
  getUserLevel(userId: string): UserLevel {
    const data = localStorage.getItem(this.LEVEL_KEY);
    const levels = data ? JSON.parse(data) : {};
    
    return levels[userId] || {
      level: 1,
      currentXP: 0,
      xpToNextLevel: 100,
      title: 'Newcomer',
      perks: ['Basic profile customization']
    };
  }

  /**
   * Add XP and check for level up
   */
  addXP(userId: string, amount: number): { leveledUp: boolean; newLevel?: number } {
    const currentLevel = this.getUserLevel(userId);
    currentLevel.currentXP += amount;

    let leveledUp = false;
    let newLevel = currentLevel.level;

    while (currentLevel.currentXP >= currentLevel.xpToNextLevel) {
      currentLevel.currentXP -= currentLevel.xpToNextLevel;
      currentLevel.level++;
      newLevel = currentLevel.level;
      leveledUp = true;
      currentLevel.xpToNextLevel = Math.floor(100 * Math.pow(1.5, currentLevel.level - 1));
      currentLevel.title = this.getLevelTitle(currentLevel.level);
      currentLevel.perks = this.getLevelPerks(currentLevel.level);
    }

    // Save
    const data = localStorage.getItem(this.LEVEL_KEY);
    const levels = data ? JSON.parse(data) : {};
    levels[userId] = currentLevel;
    localStorage.setItem(this.LEVEL_KEY, JSON.stringify(levels));

    return { leveledUp, newLevel: leveledUp ? newLevel : undefined };
  }

  /**
   * Get level title based on level
   */
  private getLevelTitle(level: number): string {
    if (level >= 50) return 'Legend';
    if (level >= 40) return 'Champion';
    if (level >= 30) return 'Master';
    if (level >= 20) return 'Expert';
    if (level >= 10) return 'Veteran';
    if (level >= 5) return 'Regular';
    return 'Newcomer';
  }

  /**
   * Get level perks
   */
  private getLevelPerks(level: number): string[] {
    const perks: string[] = ['Basic profile customization'];
    
    if (level >= 5) perks.push('Custom avatar frames');
    if (level >= 10) perks.push('Profile themes');
    if (level >= 15) perks.push('Exclusive badges');
    if (level >= 20) perks.push('Priority match suggestions');
    if (level >= 30) perks.push('VIP status marker');
    if (level >= 40) perks.push('Legendary frames');
    if (level >= 50) perks.push('All premium features');

    return perks;
  }

  /**
   * Get all achievements for user
   */
  getAchievements(userId: string): Achievement[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    const achievements = data ? JSON.parse(data) : {};
    
    return achievements[userId] || this.getDefaultAchievements();
  }

  /**
   * Get default achievements
   */
  private getDefaultAchievements(): Achievement[] {
    return [
      {
        id: 'first_match',
        title: 'First Steps',
        description: 'Join your first match',
        icon: '🎯',
        category: 'milestone',
        rarity: 'common',
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        reward: { xp: 50, badge: 'Beginner' }
      },
      {
        id: 'social_butterfly',
        title: 'Social Butterfly',
        description: 'Make 10 new friends',
        icon: '🦋',
        category: 'social',
        rarity: 'rare',
        progress: 0,
        maxProgress: 10,
        unlocked: false,
        reward: { xp: 200, avatarFrame: 'social_frame' }
      },
      {
        id: 'trust_builder',
        title: 'Trust Builder',
        description: 'Reach 80% trust score',
        icon: '🛡️',
        category: 'trust',
        rarity: 'epic',
        progress: 0,
        maxProgress: 80,
        unlocked: false,
        reward: { xp: 300, badge: 'Trustworthy' }
      },
      {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 30-day streak',
        icon: '🔥',
        category: 'streak',
        rarity: 'epic',
        progress: 0,
        maxProgress: 30,
        unlocked: false,
        reward: { xp: 500, avatarFrame: 'flame_frame' }
      },
      {
        id: 'gratitude_guru',
        title: 'Gratitude Guru',
        description: 'Send 50 gratitude messages',
        icon: '💝',
        category: 'social',
        rarity: 'rare',
        progress: 0,
        maxProgress: 50,
        unlocked: false,
        reward: { xp: 250, badge: 'Kind Heart' }
      },
      {
        id: 'community_champion',
        title: 'Community Champion',
        description: 'Attend 100 matches',
        icon: '🏆',
        category: 'milestone',
        rarity: 'legendary',
        progress: 0,
        maxProgress: 100,
        unlocked: false,
        reward: { xp: 1000, avatarFrame: 'champion_frame', badge: 'Champion' }
      },
      {
        id: 'perfect_teammate',
        title: 'Perfect Teammate',
        description: 'Receive 25 "Great Teammate" recognitions',
        icon: '⭐',
        category: 'special',
        rarity: 'epic',
        progress: 0,
        maxProgress: 25,
        unlocked: false,
        reward: { xp: 400, badge: 'MVP' }
      },
      {
        id: 'friendship_legend',
        title: 'Friendship Legend',
        description: 'Have 5 friendships at 90+ strength',
        icon: '💫',
        category: 'social',
        rarity: 'legendary',
        progress: 0,
        maxProgress: 5,
        unlocked: false,
        reward: { xp: 1500, avatarFrame: 'legend_frame' }
      }
    ];
  }

  /**
   * Update achievement progress
   */
  updateAchievement(userId: string, achievementId: string, progress: number): Achievement | null {
    const achievements = this.getAchievements(userId);
    const achievement = achievements.find(a => a.id === achievementId);

    if (!achievement) return null;

    achievement.progress = Math.min(progress, achievement.maxProgress);

    if (achievement.progress >= achievement.maxProgress && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedDate = new Date();

      // Award XP
      if (achievement.reward?.xp) {
        this.addXP(userId, achievement.reward.xp);
      }

      // Unlock avatar frame if applicable
      if (achievement.reward?.avatarFrame) {
        this.unlockAvatarFrame(userId, achievement.reward.avatarFrame);
      }
    }

    // Save
    const data = localStorage.getItem(this.STORAGE_KEY);
    const allAchievements = data ? JSON.parse(data) : {};
    allAchievements[userId] = achievements;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allAchievements));

    return achievement;
  }

  /**
   * Get avatar frames
   */
  getAvatarFrames(userId: string): AvatarFrame[] {
    const data = localStorage.getItem(this.FRAMES_KEY);
    const frames = data ? JSON.parse(data) : {};
    
    return frames[userId] || this.getDefaultFrames();
  }

  /**
   * Get default avatar frames
   */
  private getDefaultFrames(): AvatarFrame[] {
    return [
      {
        id: 'default',
        name: 'Classic',
        description: 'The timeless default',
        rarity: 'common',
        unlocked: true,
        requirement: 'Everyone gets this',
        gradient: 'from-slate-400 to-slate-600'
      },
      {
        id: 'social_frame',
        name: 'Social Star',
        description: 'For the social butterflies',
        rarity: 'rare',
        unlocked: false,
        requirement: 'Make 10 friends',
        gradient: 'from-pink-500 via-purple-500 to-indigo-500'
      },
      {
        id: 'flame_frame',
        name: 'Fire Streak',
        description: 'Burning with consistency',
        rarity: 'epic',
        unlocked: false,
        requirement: '30-day streak',
        gradient: 'from-orange-500 via-red-500 to-pink-500'
      },
      {
        id: 'champion_frame',
        name: 'Champion',
        description: 'For true champions',
        rarity: 'legendary',
        unlocked: false,
        requirement: 'Attend 100 matches',
        gradient: 'from-yellow-400 via-amber-500 to-orange-600'
      },
      {
        id: 'legend_frame',
        name: 'Legend',
        description: 'The ultimate frame',
        rarity: 'legendary',
        unlocked: false,
        requirement: '5 friendships at 90+ strength',
        gradient: 'from-cyan-400 via-blue-500 to-purple-600'
      },
      {
        id: 'trust_frame',
        name: 'Trusted',
        description: 'Highly trusted member',
        rarity: 'epic',
        unlocked: false,
        requirement: '80% trust score',
        gradient: 'from-emerald-400 via-teal-500 to-cyan-600'
      }
    ];
  }

  /**
   * Unlock avatar frame
   */
  unlockAvatarFrame(userId: string, frameId: string): void {
    const frames = this.getAvatarFrames(userId);
    const frame = frames.find(f => f.id === frameId);

    if (frame) {
      frame.unlocked = true;

      const data = localStorage.getItem(this.FRAMES_KEY);
      const allFrames = data ? JSON.parse(data) : {};
      allFrames[userId] = frames;
      localStorage.setItem(this.FRAMES_KEY, JSON.stringify(allFrames));
    }
  }

  /**
   * Get daily/weekly quests
   */
  getQuests(userId: string): Quest[] {
    const data = localStorage.getItem(this.QUESTS_KEY);
    const quests = data ? JSON.parse(data) : {};
    
    return quests[userId] || this.generateDailyQuests();
  }

  /**
   * Generate daily quests
   */
  private generateDailyQuests(): Quest[] {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return [
      {
        id: 'daily_login',
        title: 'Daily Check-in',
        description: 'Log in and check the community',
        type: 'daily',
        progress: 0,
        maxProgress: 1,
        completed: false,
        expiresAt: tomorrow,
        reward: { xp: 20 }
      },
      {
        id: 'daily_gratitude',
        title: 'Spread Kindness',
        description: 'Send a gratitude message',
        type: 'daily',
        progress: 0,
        maxProgress: 1,
        completed: false,
        expiresAt: tomorrow,
        reward: { xp: 30 }
      },
      {
        id: 'weekly_matches',
        title: 'Active Player',
        description: 'Join 3 matches this week',
        type: 'weekly',
        progress: 0,
        maxProgress: 3,
        completed: false,
        expiresAt: nextWeek,
        reward: { xp: 100, items: ['boost_token'] }
      }
    ];
  }

  /**
   * Update quest progress
   */
  updateQuest(userId: string, questId: string, progress: number): Quest | null {
    const quests = this.getQuests(userId);
    const quest = quests.find(q => q.id === questId);

    if (!quest) return null;

    quest.progress = Math.min(progress, quest.maxProgress);

    if (quest.progress >= quest.maxProgress && !quest.completed) {
      quest.completed = true;

      // Award XP
      this.addXP(userId, quest.reward.xp);
    }

    // Save
    const data = localStorage.getItem(this.QUESTS_KEY);
    const allQuests = data ? JSON.parse(data) : {};
    allQuests[userId] = quests;
    localStorage.setItem(this.QUESTS_KEY, JSON.stringify(allQuests));

    return quest;
  }

  /**
   * Get unlocked achievements
   */
  getUnlockedAchievements(userId: string): Achievement[] {
    const achievements = this.getAchievements(userId);
    return achievements.filter(a => a.unlocked);
  }

  /**
   * Get in-progress achievements
   */
  getInProgressAchievements(userId: string): Achievement[] {
    const achievements = this.getAchievements(userId);
    return achievements.filter(a => !a.unlocked && a.progress > 0);
  }

  /**
   * Get locked achievements
   */
  getLockedAchievements(userId: string): Achievement[] {
    const achievements = this.getAchievements(userId);
    return achievements.filter(a => !a.unlocked && a.progress === 0);
  }

  /**
   * Get user achievements (all)
   */
  getUserAchievements(userId: string): Achievement[] {
    return this.getAchievements(userId);
  }

  /**
   * Get achievements by category
   */
  getAchievementsByCategory(userId: string, category: Achievement['category']): Achievement[] {
    const achievements = this.getAchievements(userId);
    return achievements.filter(a => a.category === category);
  }

  /**
   * Get recent unlocks
   */
  getRecentUnlocks(userId: string, limit: number = 5): Achievement[] {
    const achievements = this.getUnlockedAchievements(userId);
    return achievements
      .filter(a => a.unlockedDate)
      .sort((a, b) => {
        const dateA = a.unlockedDate ? new Date(a.unlockedDate).getTime() : 0;
        const dateB = b.unlockedDate ? new Date(b.unlockedDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }

  /**
   * Initialize mock achievement data
   */
  initializeMockData(userId: string): void {
    // Set some achievements as partially complete
    const achievements = this.getDefaultAchievements();
    achievements[0].progress = 1; // First match completed
    achievements[0].unlocked = true;
    achievements[0].unlockedDate = new Date('2024-03-15');
    achievements[1].progress = 4; // 4/10 friends
    achievements[2].progress = 65; // 65/80 trust score
    achievements[4].progress = 12; // 12/50 gratitude messages

    const data = localStorage.getItem(this.STORAGE_KEY);
    const allAchievements = data ? JSON.parse(data) : {};
    allAchievements[userId] = achievements;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allAchievements));

    // Set user level
    const levelData = localStorage.getItem(this.LEVEL_KEY);
    const levels = levelData ? JSON.parse(levelData) : {};
    levels[userId] = {
      level: 7,
      currentXP: 340,
      xpToNextLevel: 500,
      title: 'Regular',
      perks: ['Basic profile customization', 'Custom avatar frames']
    };
    localStorage.setItem(this.LEVEL_KEY, JSON.stringify(levels));

    // Unlock some frames
    const frames = this.getDefaultFrames();
    frames[1].unlocked = true; // Social frame
    const frameData = localStorage.getItem(this.FRAMES_KEY);
    const allFrames = frameData ? JSON.parse(frameData) : {};
    allFrames[userId] = frames;
    localStorage.setItem(this.FRAMES_KEY, JSON.stringify(allFrames));

    // Set quests with some progress
    const quests = this.generateDailyQuests();
    quests[0].progress = 1;
    quests[0].completed = true;
    quests[2].progress = 1; // 1/3 matches this week
    const questData = localStorage.getItem(this.QUESTS_KEY);
    const allQuests = questData ? JSON.parse(questData) : {};
    allQuests[userId] = quests;
    localStorage.setItem(this.QUESTS_KEY, JSON.stringify(allQuests));
  }
}

export const achievementService = new AchievementService();