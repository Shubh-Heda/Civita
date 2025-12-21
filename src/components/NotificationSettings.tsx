import { motion } from 'motion/react';
import { notificationService } from '../services/notificationService';
import { Bell, BellOff, Mail, Smartphone, Moon, Calendar } from 'lucide-react';
import { useState } from 'react';

interface NotificationSettingsProps {
  userId: string;
}

export function NotificationSettings({ userId }: NotificationSettingsProps) {
  const [prefs, setPrefs] = useState(notificationService.getPreferences(userId));

  const toggleCategory = (category: keyof typeof prefs, enabled: boolean) => {
    const updated = notificationService.updateCategoryPreferences(userId, category as any, { enabled });
    setPrefs(updated);
  };

  const toggleChannel = (category: keyof typeof prefs, channel: 'push' | 'email' | 'inApp', value: boolean) => {
    const updated = notificationService.updateCategoryPreferences(userId, category as any, { [channel]: value } as any);
    setPrefs(updated);
  };

  const toggleQuietHours = () => {
    if (prefs.quietHours.enabled) {
      const updated = notificationService.disableQuietHours(userId);
      setPrefs(updated);
    } else {
      const updated = notificationService.enableQuietHours(userId, '22:00', '08:00');
      setPrefs(updated);
    }
  };

  const toggleMatchDayOnly = () => {
    const updated = notificationService.toggleMatchDayOnly(userId);
    setPrefs(updated);
  };

  const categories = [
    {
      key: 'matchUpdates' as const,
      title: 'Match Updates',
      description: 'Player joins, payment reminders, match confirmations',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'friendActivity' as const,
      title: 'Friend Activity',
      description: 'When friends join matches or achieve milestones',
      icon: Bell,
      color: 'from-purple-500 to-pink-500'
    },
    {
      key: 'achievements' as const,
      title: 'Achievements',
      description: 'Badge unlocks, level ups, streak milestones',
      icon: Bell,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      key: 'paymentReminders' as const,
      title: 'Payment Reminders',
      description: 'Payment windows, deadlines, confirmations',
      icon: Bell,
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'communityUpdates' as const,
      title: 'Community Updates',
      description: 'Local events, announcements, new posts',
      icon: Bell,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      key: 'promotions' as const,
      title: 'Promotions & Offers',
      description: 'Special deals, cashback offers, referral bonuses',
      icon: Bell,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-6 h-6 text-purple-400" />
          <h2 className="text-white">Notification Preferences</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Customize how and when you receive notifications
        </p>
      </div>

      {/* Quick Settings */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={toggleQuietHours}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            prefs.quietHours.enabled
              ? 'bg-purple-900/20 border-purple-500/30'
              : 'bg-slate-800/40 border-slate-700/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              prefs.quietHours.enabled
                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                : 'bg-slate-700'
            }`}>
              <Moon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white">Quiet Hours</h4>
              <p className="text-sm text-slate-400">
                {prefs.quietHours.enabled
                  ? `${prefs.quietHours.startTime} - ${prefs.quietHours.endTime}`
                  : 'Disabled'}
              </p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors ${
              prefs.quietHours.enabled ? 'bg-purple-500' : 'bg-slate-600'
            }`}>
              <motion.div
                animate={{ x: prefs.quietHours.enabled ? 24 : 2 }}
                className="w-5 h-5 mt-0.5 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={toggleMatchDayOnly}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            prefs.matchDayOnly
              ? 'bg-blue-900/20 border-blue-500/30'
              : 'bg-slate-800/40 border-slate-700/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              prefs.matchDayOnly
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                : 'bg-slate-700'
            }`}>
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white">Match Days Only</h4>
              <p className="text-sm text-slate-400">
                {prefs.matchDayOnly ? 'Active' : 'All days'}
              </p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors ${
              prefs.matchDayOnly ? 'bg-blue-500' : 'bg-slate-600'
            }`}>
              <motion.div
                animate={{ x: prefs.matchDayOnly ? 24 : 2 }}
                className="w-5 h-5 mt-0.5 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Settings */}
      <div className="space-y-4">
        {categories.map((category, index) => {
          const categoryPrefs = prefs[category.key];
          
          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white">{category.title}</h4>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleCategory(category.key, !categoryPrefs.enabled)}
                        className={`px-4 py-1 rounded-full text-sm transition-colors ${
                          categoryPrefs.enabled
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {categoryPrefs.enabled ? 'Enabled' : 'Disabled'}
                      </motion.button>
                    </div>
                    <p className="text-slate-400 text-sm">{category.description}</p>
                  </div>
                </div>

                {/* Channel toggles */}
                {categoryPrefs.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/50"
                  >
                    {[
                      { key: 'push' as const, label: 'Push', icon: Smartphone },
                      { key: 'email' as const, label: 'Email', icon: Mail },
                      { key: 'inApp' as const, label: 'In-App', icon: Bell }
                    ].map((channel) => (
                      <motion.button
                        key={channel.key}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleChannel(category.key, channel.key, !categoryPrefs[channel.key])}
                        className={`p-3 rounded-xl text-sm transition-all ${
                          categoryPrefs[channel.key]
                            ? `bg-gradient-to-br ${category.color}/20 border-2 border-${category.color.split('-')[1]}-500/30`
                            : 'bg-slate-900/40 border-2 border-transparent'
                        }`}
                      >
                        <channel.icon className={`w-5 h-5 mx-auto mb-1 ${
                          categoryPrefs[channel.key] ? 'text-white' : 'text-slate-500'
                        }`} />
                        <div className={categoryPrefs[channel.key] ? 'text-white' : 'text-slate-500'}>
                          {channel.label}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
