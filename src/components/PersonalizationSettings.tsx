import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Palette, Frame, Award, Bell, Zap, Check } from 'lucide-react';
import { personalizationService, UserTheme, UserPreferences } from '../services/personalizationService';
import { achievementService, AvatarFrame } from '../services/achievementService';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface PersonalizationSettingsProps {
  userId: string;
  onClose: () => void;
}

export function PersonalizationSettings({ userId, onClose }: PersonalizationSettingsProps) {
  const [activeTab, setActiveTab] = useState<'themes' | 'frames' | 'settings'>('themes');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [themes, setThemes] = useState<UserTheme[]>([]);
  const [frames, setFrames] = useState<AvatarFrame[]>([]);
  const { theme: currentTheme, setTheme: applyTheme } = useTheme();

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = () => {
    setPreferences(personalizationService.getUserPreferences(userId));
    setThemes(personalizationService.getAvailableThemes());
    setFrames(achievementService.getAvatarFrames(userId));
  };

  const handleThemeSelect = (themeId: string) => {
    applyTheme(themeId); // Use the theme context to apply immediately
    loadData();
    toast.success('Theme updated! 🎨', {
      description: 'Your new theme has been applied.'
    });
  };

  const handleFrameSelect = (frameId: string) => {
    const frame = frames.find(f => f.id === frameId);
    if (!frame?.unlocked) {
      toast.error('Frame locked 🔒', {
        description: frame?.requirement || 'Complete achievements to unlock this frame.'
      });
      return;
    }

    personalizationService.setAvatarFrame(userId, frameId);
    loadData();
    toast.success('Avatar frame updated! ✨');
  };

  const toggleAnimations = () => {
    const updated = personalizationService.updatePreferences(userId, {
      animationsEnabled: !preferences?.animationsEnabled
    });
    setPreferences(updated);
    toast.success(updated.animationsEnabled ? 'Animations enabled ✨' : 'Animations disabled');
  };

  const toggleSound = () => {
    const updated = personalizationService.updatePreferences(userId, {
      soundEnabled: !preferences?.soundEnabled
    });
    setPreferences(updated);
    toast.success(updated.soundEnabled ? 'Sound enabled 🔊' : 'Sound disabled 🔇');
  };

  if (!preferences) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              ←
            </button>
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Personalization
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all ${
              activeTab === 'themes'
                ? 'bg-white shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Palette className="w-5 h-5" />
              <span>Themes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('frames')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all ${
              activeTab === 'frames'
                ? 'bg-white shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Frame className="w-5 h-5" />
              <span>Avatar Frames</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-white shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </button>
        </div>

        {/* Themes Tab */}
        {activeTab === 'themes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme, index) => {
              const isSelected = preferences.selectedTheme === theme.id;
              
              return (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all relative ${
                    isSelected ? 'ring-4 ring-purple-500' : ''
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-purple-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Theme Preview */}
                  <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${theme.background} mb-4 border border-slate-200`}>
                    <div className="h-full flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${theme.gradient}`} />
                    </div>
                  </div>

                  <h3 className="mb-2">{theme.name}</h3>
                  
                  {/* Color Swatches */}
                  <div className="flex gap-2">
                    <div className={`w-6 h-6 rounded-full bg-${theme.primary}-500 border-2 border-white shadow`} />
                    <div className={`w-6 h-6 rounded-full bg-${theme.secondary}-500 border-2 border-white shadow`} />
                    <div className={`w-6 h-6 rounded-full bg-${theme.accent}-500 border-2 border-white shadow`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Frames Tab */}
        {activeTab === 'frames' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {frames.map((frame, index) => {
              const isSelected = preferences.selectedAvatarFrame === frame.id;
              
              return (
                <motion.div
                  key={frame.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: frame.unlocked ? 1.05 : 1 }}
                  onClick={() => handleFrameSelect(frame.id)}
                  className={`cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all relative ${
                    isSelected ? 'ring-4 ring-purple-500' : ''
                  } ${!frame.unlocked ? 'opacity-60' : ''}`}
                >
                  {isSelected && frame.unlocked && (
                    <div className="absolute top-3 right-3 bg-purple-500 rounded-full p-1 z-10">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {!frame.unlocked && (
                    <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs text-slate-600 px-2">{frame.requirement}</p>
                      </div>
                    </div>
                  )}

                  <div className="relative z-0">
                    {/* Frame Preview */}
                    <div className="mb-4 mx-auto w-24 h-24 relative">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${frame.gradient} p-1`}>
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                          <Frame className="w-8 h-8 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-center mb-1">{frame.name}</h4>
                    <p className="text-xs text-center text-slate-600">{frame.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3>Animations</h3>
                    <p className="text-sm text-slate-600">Enable smooth transitions and effects</p>
                  </div>
                </div>
                <button
                  onClick={toggleAnimations}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    preferences.animationsEnabled ? 'bg-purple-500' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: preferences.animationsEnabled ? 24 : 0 }}
                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3>Sound Effects</h3>
                    <p className="text-sm text-slate-600">Play sounds for interactions</p>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    preferences.soundEnabled ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: preferences.soundEnabled ? 24 : 0 }}
                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
            >
              <div className="text-center">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="mb-2">Unlock More Customization</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Complete achievements and level up to unlock exclusive themes, frames, and badges!
                </p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    Level 10: Profile Themes
                  </span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                    Level 20: VIP Frames
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}