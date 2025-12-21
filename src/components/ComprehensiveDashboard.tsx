import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, Trophy, Wallet, Users, Bell, Settings, Shield, Camera,
  MessageSquare, MapPin, Sparkles, TrendingUp, ChevronRight, X, Heart, Palette, Award
} from 'lucide-react';
import { Button } from './ui/button';
import { ActivityFeed, ActivityFeedCompact } from './ActivityFeed';
import { AchievementSystem } from './AchievementSystem';
import { AchievementDashboard } from './AchievementDashboard';
import { WalletDashboard } from './WalletDashboard';
import { TrustScoreBreakdown } from './TrustScoreBreakdown';
import { NotificationSettings } from './NotificationSettings';
import { PersonalizationSettings } from './PersonalizationSettings';
import { FriendshipMap } from './FriendshipMap';
import { CompatibilityScores } from './CompatibilityScores';
import { GratitudeWall } from './GratitudeWall';
import { PostMatchRituals } from './PostMatchRituals';
import { PreMatchIceBreakers } from './PreMatchIceBreakers';
import { CelebrationAnimations, useCelebration } from './CelebrationAnimations';
import { Confetti, HeartBurst, RippleEffect } from './Confetti';
import { PageTransition, StaggeredList, StaggeredItem } from './PageTransition';
import { activityService } from '../services/activityService';
import { walletService } from '../services/walletService';
import { achievementService } from '../services/achievementService';
import { friendshipService } from '../services/friendshipService';
import { gratitudeService } from '../services/gratitudeService';
import { postMatchService } from '../services/postMatchService';

interface ComprehensiveDashboardProps {
  userId: string;
  userName: string;
  onClose?: () => void;
}

type DashboardView = 'home' | 'achievements' | 'wallet' | 'trust' | 'activity' | 'settings' | 'friendship' | 'compatibility' | 'gratitude' | 'personalization' | 'gamification';

export function ComprehensiveDashboard({ userId, userName, onClose }: ComprehensiveDashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [greeting, setGreeting] = useState('');
  const { currentEvent, celebrate, clearCelebration } = useCelebration();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  // Personalized greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    let emoji = '';
    
    if (hour < 12) {
      timeGreeting = 'Good morning';
      emoji = '☀️';
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
      emoji = '🌤️';
    } else {
      timeGreeting = 'Good evening';
      emoji = '🌙';
    }

    // Add context-aware messages
    const messages = [
      `${timeGreeting}, ${userName.split(' ')[0]}! ${emoji}`,
      `Ready for greatness, ${userName.split(' ')[0]}? 🚀`,
      `Let's make today epic, ${userName.split(' ')[0]}! 💪`,
    ];

    setGreeting(messages[0]);
  }, [userName]);

  const navigation = [
    { id: 'home' as const, label: 'Home', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { id: 'gamification' as const, label: 'Achievements', icon: Trophy, color: 'from-yellow-500 to-orange-500', badge: '🆕' },
    { id: 'personalization' as const, label: 'Personalize', icon: Palette, color: 'from-purple-500 to-pink-500', badge: '🆕' },
    { id: 'wallet' as const, label: 'Wallet', icon: Wallet, color: 'from-green-500 to-emerald-500' },
    { id: 'trust' as const, label: 'Trust Score', icon: Shield, color: 'from-purple-500 to-pink-500' },
    { id: 'activity' as const, label: 'Activity', icon: Bell, color: 'from-cyan-500 to-blue-500' },
    { id: 'settings' as const, label: 'Settings', icon: Settings, color: 'from-slate-500 to-slate-600' },
    { id: 'friendship' as const, label: 'Friendship Map', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { id: 'compatibility' as const, label: 'Compatibility', icon: Heart, color: 'from-pink-500 to-red-500' },
    { id: 'gratitude' as const, label: 'Gratitude Wall', icon: MessageSquare, color: 'from-green-500 to-emerald-500' }
  ];

  // Demo: Trigger a celebration on mount (remove in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      const recentAchievements = achievementService.getRecentUnlocks(userId, 1);
      if (recentAchievements.length > 0 && Math.random() > 0.7) {
        celebrate({
          type: 'achievement_unlock',
          title: 'Achievement Unlocked!',
          message: `You've earned "${recentAchievements[0].title}"`,
          xpEarned: recentAchievements[0].reward?.xp || 0
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderHomeView = () => {
    const wallet = walletService.getWallet(userId);
    const userLevel = achievementService.getUserLevel(userId);
    const unlockedAchievements = achievementService.getUnlockedAchievements(userId);
    const unreadActivity = activityService.getUnreadActivities().length;

    return (
      <div className="space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentView('wallet')}
            className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-4 border border-green-500/20 cursor-pointer"
          >
            <Wallet className="w-8 h-8 text-green-400 mb-2" />
            <div className="text-2xl text-white mb-1">₹{wallet?.balance || 0}</div>
            <div className="text-xs text-slate-400">Wallet Balance</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentView('achievements')}
            className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-2xl p-4 border border-yellow-500/20 cursor-pointer"
          >
            <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
            <div className="text-2xl text-white mb-1">{unlockedAchievements.length}</div>
            <div className="text-xs text-slate-400">Achievements</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentView('trust')}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-4 border border-purple-500/20 cursor-pointer"
          >
            <Shield className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-2xl text-white mb-1">Level {userLevel.level}</div>
            <div className="text-xs text-slate-400">{userLevel.title}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentView('activity')}
            className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-4 border border-cyan-500/20 cursor-pointer relative"
          >
            <Bell className="w-8 h-8 text-cyan-400 mb-2" />
            <div className="text-2xl text-white mb-1">{unreadActivity}</div>
            <div className="text-xs text-slate-400">New Updates</div>
            {unreadActivity > 0 && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full"
              />
            )}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Recent Activity
            </h3>
            <Button
              onClick={() => setCurrentView('activity')}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <ActivityFeedCompact limit={5} />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => celebrate({
              type: 'trust_increase',
              title: 'Trust Score Increased!',
              message: 'Keep up the great work!',
              xpEarned: 50
            })}
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-5 text-left"
          >
            <TrendingUp className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white mb-1">View Trust Breakdown</h4>
            <p className="text-sm text-purple-100">See how you're doing</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView('achievements')}
            className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-5 text-left"
          >
            <Trophy className="w-8 h-8 text-white mb-2" />
            <h4 className="text-white mb-1">Unlock Achievements</h4>
            <p className="text-sm text-yellow-100">Level up your profile</p>
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col"
          >
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white">Avento</h2>
                  <p className="text-xs text-slate-400">Dashboard</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    currentView === item.id
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Close Button */}
            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Close Dashboard
              </Button>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-8">
              {/* Header with Personalized Greeting */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-white mb-2">{greeting}</h1>
                <p className="text-slate-400">
                  {currentView === 'home' && 'Welcome to your personalized dashboard'}
                  {currentView === 'achievements' && 'Track your progress and unlock new achievements'}
                  {currentView === 'wallet' && 'Manage your wallet and transactions'}
                  {currentView === 'trust' && 'Build your reputation in the community'}
                  {currentView === 'activity' && 'Stay updated with community activity'}
                  {currentView === 'settings' && 'Customize your notification preferences'}
                  {currentView === 'friendship' && 'Explore your connections'}
                  {currentView === 'compatibility' && 'Discover compatibility scores'}
                  {currentView === 'gratitude' && 'Express gratitude to others'}
                  {currentView === 'personalization' && 'Tailor your experience'}
                  {currentView === 'gamification' && 'Enhance your gameplay'}
                </p>
              </motion.div>

              {/* Content Area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentView === 'home' && renderHomeView()}
                  {currentView === 'achievements' && <AchievementSystem userId={userId} />}
                  {currentView === 'wallet' && <WalletDashboard userId={userId} />}
                  {currentView === 'trust' && <TrustScoreBreakdown userId={userId} />}
                  {currentView === 'activity' && <ActivityFeed userId={userId} limit={50} />}
                  {currentView === 'settings' && <NotificationSettings userId={userId} />}
                  {currentView === 'friendship' && <FriendshipMap userId={userId} />}
                  {currentView === 'compatibility' && <CompatibilityScores userId={userId} />}
                  {currentView === 'gratitude' && <GratitudeWall userId={userId} />}
                  {currentView === 'personalization' && <PersonalizationSettings userId={userId} onClose={() => setCurrentView('home')} />}
                  {currentView === 'gamification' && <AchievementDashboard userId={userId} onClose={() => setCurrentView('home')} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Animations Overlay */}
      <CelebrationAnimations event={currentEvent} onComplete={clearCelebration} />
    </>
  );
}