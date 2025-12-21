import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Award, Lock, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import { achievementService, Achievement, Quest, UserLevel, AvatarFrame } from '../services/achievementService';
import { Button } from './ui/button';
import { Confetti } from './Confetti';

interface AchievementDashboardProps {
  userId: string;
  onClose: () => void;
}

export function AchievementDashboard({ userId, onClose }: AchievementDashboardProps) {
  const [activeTab, setActiveTab] = useState<'achievements' | 'quests' | 'frames'>('achievements');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [frames, setFrames] = useState<AvatarFrame[]>([]);
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = () => {
    setAchievements(achievementService.getAchievements(userId));
    setQuests(achievementService.getQuests(userId));
    setFrames(achievementService.getAvatarFrames(userId));
    setUserLevel(achievementService.getUserLevel(userId));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-slate-400 to-slate-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-slate-500/50';
      case 'rare': return 'shadow-blue-500/50';
      case 'epic': return 'shadow-purple-500/50';
      case 'legendary': return 'shadow-yellow-500/50';
      default: return 'shadow-slate-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-orange-950 p-6 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
      
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header with Level Info */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              ←
            </button>
            <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Achievements & Progress
            </h1>
          </div>

          {userLevel && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRarityColor('epic')} flex items-center justify-center`}>
                    <span className="text-white text-xl">{userLevel.level}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400 border-t-transparent"
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Level {userLevel.level}</p>
                  <p className="font-medium">{userLevel.title}</p>
                  <div className="w-32 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(userLevel.currentXP / userLevel.xpToNextLevel) * 100}%` }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {userLevel.currentXP} / {userLevel.xpToNextLevel} XP
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Achievements</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all ${
              activeTab === 'quests'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              <span>Quests</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('frames')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all ${
              activeTab === 'frames'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              <span>Frames & Badges</span>
            </div>
          </button>
        </div>

        {/* Achievements Grid */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelectedAchievement(achievement)}
                className="cursor-pointer"
              >
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden ${
                    achievement.unlocked ? getRarityGlow(achievement.rarity) : ''
                  }`}
                >
                  {/* Rarity Border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />

                  {/* Lock Overlay */}
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center">
                      <Lock className="w-12 h-12 text-slate-400" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        <span>{achievement.reward?.xp || 0} XP</span>
                      </div>
                    </div>

                    <h3 className={`mb-2 ${achievement.unlocked ? '' : 'text-slate-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Progress</span>
                        <span>{achievement.progress} / {achievement.maxProgress}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                        />
                      </div>
                    </div>

                    {/* Rarity Badge */}
                    <div className="mt-3 inline-block">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quests Tab */}
        {activeTab === 'quests' && (
          <div className="space-y-4">
            {quests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-lg ${
                  quest.completed ? 'border-2 border-green-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        quest.type === 'daily' ? 'bg-blue-100 text-blue-600' :
                        quest.type === 'weekly' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {quest.type.toUpperCase()}
                      </div>
                      {quest.completed && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm">Completed!</span>
                        </div>
                      )}
                    </div>

                    <h3 className="mb-2">{quest.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{quest.description}</p>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium">{quest.progress} / {quest.maxProgress}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        />
                      </div>
                    </div>

                    {/* Expires */}
                    <p className="text-xs text-slate-500 mt-2">
                      Expires: {new Date(quest.expiresAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Reward */}
                  <div className="ml-4 text-right">
                    <div className="bg-yellow-100 rounded-xl p-3 inline-block">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-700">{quest.reward.xp} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Avatar Frames Tab */}
        {activeTab === 'frames' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {frames.map((frame, index) => (
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all relative ${
                  frame.unlocked ? getRarityGlow(frame.rarity) : ''
                }`}>
                  {/* Lock Overlay */}
                  {!frame.unlocked && (
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                      <Lock className="w-8 h-8 text-slate-400" />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Frame Preview */}
                    <div className="mb-4 mx-auto w-24 h-24 relative">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${frame.gradient} p-1 ${
                        frame.unlocked ? '' : 'grayscale opacity-50'
                      }`}>
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                          <Star className="w-8 h-8 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <h4 className={`text-center mb-2 ${frame.unlocked ? '' : 'text-slate-400'}`}>
                      {frame.name}
                    </h4>
                    <p className="text-xs text-center text-slate-600 mb-3">{frame.description}</p>

                    {/* Rarity */}
                    <div className="text-center">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(frame.rarity)} text-white`}>
                        {frame.rarity.toUpperCase()}
                      </span>
                    </div>

                    {!frame.unlocked && (
                      <p className="text-xs text-center text-slate-500 mt-3">{frame.requirement}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedAchievement.icon}</div>
                <h2 className="mb-3">{selectedAchievement.title}</h2>
                <p className="text-slate-600 mb-6">{selectedAchievement.description}</p>

                {/* Progress */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Progress</span>
                    <span className="font-medium">{selectedAchievement.progress} / {selectedAchievement.maxProgress}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)}`}
                      style={{ width: `${(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Rewards */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-slate-600 mb-2">Rewards</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">{selectedAchievement.reward?.xp || 0} XP</span>
                    </div>
                    {selectedAchievement.reward?.badge && (
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span>{selectedAchievement.reward.badge}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedAchievement(null)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}