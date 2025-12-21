import { motion } from 'motion/react';
import { achievementService, Achievement, UserLevel } from '../services/achievementService';
import { Lock, Star, Trophy, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface AchievementSystemProps {
  userId: string;
}

export function AchievementSystem({ userId }: AchievementSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Achievement['category']>('all');
  
  const userLevel = achievementService.getUserLevel(userId);
  const unlocked = achievementService.getUnlockedAchievements(userId);
  const inProgress = achievementService.getInProgressAchievements(userId);
  const locked = achievementService.getLockedAchievements(userId);

  const allAchievements = selectedCategory === 'all'
    ? achievementService.getUserAchievements(userId)
    : achievementService.getAchievementsByCategory(userId, selectedCategory);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'from-slate-500 to-slate-600';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      case 'epic':
        return 'from-purple-500 to-pink-500';
      case 'legendary':
        return 'from-yellow-500 to-orange-500';
    }
  };

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-slate-500/30';
      case 'rare':
        return 'border-blue-500/30';
      case 'epic':
        return 'border-purple-500/30';
      case 'legendary':
        return 'border-yellow-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white mb-1">Level {userLevel.level}</h3>
            <p className="text-purple-300">{userLevel.title}</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
          >
            <Star className="w-8 h-8 text-white" fill="white" />
          </motion.div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">{userLevel.currentXP} XP</span>
            <span className="text-slate-400">{userLevel.xpToNextLevel} XP to Level {userLevel.level + 1}</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(userLevel.currentXP / userLevel.xpToNextLevel) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl text-white">{unlocked.length}</div>
            <div className="text-xs text-slate-400">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white">{inProgress.length}</div>
            <div className="text-xs text-slate-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white">{userLevel.currentXP}</div>
            <div className="text-xs text-slate-400">Current XP</div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'consistency', 'social', 'trust', 'participation', 'special'] as const).map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={`flex-shrink-0 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {allAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-2xl p-5 border-2 ${getRarityBorder(achievement.rarity)} ${
              achievement.unlocked
                ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}/20`
                : 'bg-slate-800/40 grayscale'
            }`}
          >
            {/* Locked overlay */}
            {!achievement.unlocked && (
              <div className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Lock className="w-8 h-8 text-slate-500" />
              </div>
            )}

            <div className="flex gap-4">
              {/* Icon */}
              <div className={`text-4xl flex-shrink-0 ${achievement.unlocked ? '' : 'opacity-30'}`}>
                {achievement.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white mb-1">{achievement.title}</h4>
                    <p className="text-slate-400 text-sm">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex-shrink-0"
                    >
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  )}
                </div>

                {/* Progress bar */}
                {!achievement.unlocked && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-slate-400">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                      />
                    </div>
                  </div>
                )}

                {/* Unlock info */}
                {achievement.unlocked && achievement.unlockedDate && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                    <Star className="w-3 h-3" />
                    <span>
                      Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </span>
                    <span className="text-yellow-400">+{achievement.reward?.xp || 0} XP</span>
                  </div>
                )}

                {/* Rarity badge */}
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shine effect for unlocked achievements */}
            {achievement.unlocked && (
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                style={{ transform: 'skewX(-20deg)' }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {allAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No achievements in this category</p>
        </div>
      )}
    </div>
  );
}