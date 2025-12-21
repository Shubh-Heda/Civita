import { motion, AnimatePresence } from 'motion/react';
import { activityService, Activity } from '../services/activityService';
import { Users, Trophy, TrendingUp, Zap, Camera, CheckCircle, Shield, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  userId?: string;
  limit?: number;
  showUnreadOnly?: boolean;
}

// Helper functions shared by both components
const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'match_join':
      return <Users className="w-5 h-5" />;
    case 'match_complete':
      return <CheckCircle className="w-5 h-5" />;
    case 'achievement_unlock':
      return <Trophy className="w-5 h-5" />;
    case 'trust_increase':
      return <TrendingUp className="w-5 h-5" />;
    case 'streak_milestone':
      return <Zap className="w-5 h-5" />;
    case 'photo_upload':
      return <Camera className="w-5 h-5" />;
    case 'mvp_won':
      return <Star className="w-5 h-5" />;
    case 'squad_create':
      return <Shield className="w-5 h-5" />;
    case 'payment_complete':
      return <CheckCircle className="w-5 h-5" />;
    default:
      return <Users className="w-5 h-5" />;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'match_join':
      return 'from-blue-500 to-cyan-500';
    case 'match_complete':
      return 'from-green-500 to-emerald-500';
    case 'achievement_unlock':
      return 'from-yellow-500 to-orange-500';
    case 'trust_increase':
      return 'from-green-500 to-teal-500';
    case 'streak_milestone':
      return 'from-orange-500 to-red-500';
    case 'photo_upload':
      return 'from-purple-500 to-pink-500';
    case 'mvp_won':
      return 'from-yellow-500 to-amber-500';
    case 'squad_create':
      return 'from-indigo-500 to-purple-500';
    case 'payment_complete':
      return 'from-teal-500 to-cyan-500';
    default:
      return 'from-slate-500 to-slate-600';
  }
};

export function ActivityFeed({ userId, limit = 20, showUnreadOnly = false }: ActivityFeedProps) {
  const activities = userId 
    ? activityService.getUserActivities(userId)
    : activityService.getRecentActivities(limit);

  const filteredActivities = showUnreadOnly 
    ? activities.filter(a => !a.read)
    : activities;

  const displayActivities = limit ? filteredActivities.slice(0, limit) : filteredActivities;

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'match_join':
        return (
          <>
            <span className="text-white">{activity.userName}</span> joined{' '}
            <span className="text-cyan-400">{activity.data.matchTitle}</span>
          </>
        );
      case 'match_complete':
        return (
          <>
            <span className="text-white">{activity.userName}</span> completed{' '}
            <span className="text-green-400">{activity.data.matchTitle}</span>
            {activity.data.rating && (
              <span className="text-yellow-400"> ⭐ {activity.data.rating}/5</span>
            )}
          </>
        );
      case 'achievement_unlock':
        return (
          <>
            <span className="text-white">{activity.userName}</span> unlocked{' '}
            <span className="text-yellow-400">{activity.data.achievementName}</span>
            {activity.data.xpEarned && (
              <span className="text-purple-400"> +{activity.data.xpEarned} XP</span>
            )}
          </>
        );
      case 'trust_increase':
        return (
          <>
            <span className="text-white">{activity.userName}</span>'s trust score increased to{' '}
            <span className="text-green-400">{activity.data.newScore}</span>
          </>
        );
      case 'streak_milestone':
        return (
          <>
            <span className="text-white">{activity.userName}</span> reached{' '}
            <span className="text-orange-400">{activity.data.streakDays} day streak</span> 🔥
          </>
        );
      case 'photo_upload':
        return (
          <>
            <span className="text-white">{activity.userName}</span> uploaded{' '}
            {activity.data.photoCount} {activity.data.photoCount > 1 ? 'photos' : 'photo'} from{' '}
            <span className="text-purple-400">{activity.data.matchTitle}</span>
          </>
        );
      case 'mvp_won':
        return (
          <>
            <span className="text-white">{activity.userName}</span> was voted{' '}
            <span className="text-yellow-400">MVP</span>! ⭐
          </>
        );
      case 'squad_create':
        return (
          <>
            <span className="text-white">{activity.userName}</span> created squad{' '}
            <span className="text-indigo-400">{activity.data.squadName}</span>
          </>
        );
      case 'payment_complete':
        return (
          <>
            <span className="text-white">{activity.userName}</span> confirmed payment for a match
          </>
        );
      default:
        return <span>{activity.userName} performed an action</span>;
    }
  };

  if (displayActivities.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400">No activity yet</p>
        <p className="text-slate-500 text-sm">Start connecting with your community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {displayActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group ${activity.read ? 'opacity-70' : ''}`}
          >
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-800/40 hover:bg-slate-800/60 transition-all border border-slate-700/50">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                  <ImageWithFallback
                    src={activity.userAvatar}
                    alt={activity.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Activity type badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.1, type: 'spring' }}
                  className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center text-white shadow-lg`}
                >
                  {getActivityIcon(activity.type)}
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-sm leading-relaxed mb-1">
                  {getActivityText(activity)}
                </p>
                <p className="text-slate-500 text-xs">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>

              {/* Unread indicator */}
              {!activity.read && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0 w-2 h-2 bg-cyan-500 rounded-full self-center"
                />
              )}
            </div>

            {/* Hover animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getActivityColor(activity.type)} origin-left`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Compact activity feed for widgets
export function ActivityFeedCompact({ limit = 5 }: { limit?: number }) {
  const activities = activityService.getRecentActivities(limit);

  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={activity.userAvatar}
              alt={activity.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 truncate">
              <span className="text-white">{activity.userName.split(' ')[0]}</span> 
              {' '}
              {activity.type === 'match_join' && 'joined a match'}
              {activity.type === 'achievement_unlock' && 'unlocked an achievement'}
              {activity.type === 'trust_increase' && 'leveled up'}
            </p>
          </div>
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
            {getActivityIcon(activity.type)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}