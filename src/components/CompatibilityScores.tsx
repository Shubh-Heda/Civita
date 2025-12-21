import { motion } from 'motion/react';
import { Heart, TrendingUp, MapPin, Clock, Smile, Sparkles, Users } from 'lucide-react';
import { friendshipService, CompatibilityScore } from '../services/friendshipService';
import { useState, useEffect } from 'react';
import { userService, User } from '../services/userService';

interface CompatibilityScoresProps {
  userId: string;
}

export function CompatibilityScores({ userId }: CompatibilityScoresProps) {
  const [suggestions, setSuggestions] = useState<CompatibilityScore[]>([]);
  const [selectedUser, setSelectedUser] = useState<CompatibilityScore | null>(null);
  const [usersMap, setUsersMap] = useState<Map<string, User>>(new Map());

  useEffect(() => {
    loadSuggestions();
  }, [userId]);

  const loadSuggestions = async () => {
    try {
      const suggested = friendshipService.getSuggestedFriends(userId, 10);
      setSuggestions(suggested);

      // Load user details for all suggestions
      const users = await userService.getAllUsers();
      const map = new Map(users.map(u => [u.id, u]));
      setUsersMap(map);
    } catch (error) {
      console.error('Error loading compatibility suggestions:', error);
    }
  };

  const getCompatibilityLevel = (score: number) => {
    if (score >= 90) return { label: 'Perfect Match', emoji: '💕', color: 'from-pink-500 to-rose-500' };
    if (score >= 80) return { label: 'Great Match', emoji: '💜', color: 'from-purple-500 to-pink-500' };
    if (score >= 70) return { label: 'Good Match', emoji: '💙', color: 'from-blue-500 to-purple-500' };
    if (score >= 60) return { label: 'Nice Match', emoji: '💚', color: 'from-green-500 to-blue-500' };
    return { label: 'Potential Match', emoji: '🌟', color: 'from-cyan-500 to-blue-500' };
  };

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'playStyle': return <TrendingUp className="w-4 h-4" />;
      case 'timing': return <Clock className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'interests': return <Heart className="w-4 h-4" />;
      case 'personality': return <Smile className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-3xl p-6 border border-pink-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">You Might Vibe With...</h2>
            <p className="text-slate-400">AI-powered friendship matching</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-slate-800/60 rounded-xl p-4">
          <p className="text-sm text-slate-300">
            ✨ Our AI analyzes play style, timing preferences, location, shared interests, and personality to suggest perfect matches!
          </p>
        </div>
      </motion.div>

      {/* Suggestions Grid */}
      <div className="grid gap-4">
        {suggestions.map((suggestion, index) => {
          const user = usersMap.get(suggestion.targetUserId);
          if (!user) return null;

          const compatibility = getCompatibilityLevel(suggestion.overall);

          return (
            <motion.div
              key={suggestion.targetUserId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedUser(suggestion)}
              className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50 hover:border-pink-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar with compatibility ring */}
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${compatibility.color} rounded-xl p-0.5`}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700">
                    <span className="text-xs">{compatibility.emoji}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white mb-1">{user.name}</h4>
                      <p className="text-sm text-slate-400">{compatibility.label}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl bg-gradient-to-r ${compatibility.color} bg-clip-text text-transparent`}>
                        {suggestion.overall}%
                      </div>
                      <div className="text-xs text-slate-500">Match</div>
                    </div>
                  </div>

                  {/* Quick compatibility bars */}
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[
                      { label: 'Play', value: suggestion.playStyle },
                      { label: 'Time', value: suggestion.timing },
                      { label: 'Location', value: suggestion.location },
                      { label: 'Interests', value: suggestion.interests },
                      { label: 'Vibe', value: suggestion.personality }
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <div className="h-12 bg-slate-700 rounded-lg overflow-hidden flex flex-col-reverse mb-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.value}%` }}
                            transition={{ delay: index * 0.1 + i * 0.05, duration: 0.5 }}
                            className={`bg-gradient-to-t ${compatibility.color}`}
                          />
                        </div>
                        <div className="text-xs text-slate-500">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Reasons */}
                  <div className="flex flex-wrap gap-2">
                    {suggestion.reasons.slice(0, 2).map((reason, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 bg-slate-700/60 rounded-full text-xs text-slate-300"
                      >
                        {reason}
                      </div>
                    ))}
                    {suggestion.reasons.length > 2 && (
                      <div className="px-3 py-1 bg-slate-700/60 rounded-full text-xs text-cyan-400">
                        +{suggestion.reasons.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <button className="w-full py-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 rounded-xl text-pink-400 transition-all group-hover:shadow-lg group-hover:shadow-pink-500/10">
                  View Full Compatibility →
                </button>
              </div>
            </motion.div>
          );
        })}

        {suggestions.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white mb-2">Looking for Matches...</h3>
            <p className="text-slate-400">
              Join more matches to help us find your perfect sports friends!
            </p>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedUser(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-700 max-h-[90vh] overflow-y-auto"
          >
            {(() => {
              const user = usersMap.get(selectedUser.targetUserId);
              if (!user) return null;
              
              const compatibility = getCompatibilityLevel(selectedUser.overall);

              return (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${compatibility.color} rounded-2xl p-1`}>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-2xl"
                      />
                    </div>
                    <h3 className="text-white mb-2">{user.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl">{compatibility.emoji}</span>
                      <div>
                        <div className={`text-2xl bg-gradient-to-r ${compatibility.color} bg-clip-text text-transparent`}>
                          {selectedUser.overall}% Match
                        </div>
                        <div className="text-sm text-slate-400">{compatibility.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="space-y-4 mb-6">
                    <h4 className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Compatibility Breakdown
                    </h4>

                    {[
                      { key: 'playStyle', label: 'Play Style & Energy', value: selectedUser.playStyle },
                      { key: 'timing', label: 'Timing Preferences', value: selectedUser.timing },
                      { key: 'location', label: 'Location Match', value: selectedUser.location },
                      { key: 'interests', label: 'Shared Interests', value: selectedUser.interests },
                      { key: 'personality', label: 'Personality Vibe', value: selectedUser.personality }
                    ].map((component, index) => (
                      <motion.div
                        key={component.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800/60 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="text-purple-400">
                              {getComponentIcon(component.key)}
                            </div>
                            <span className="text-white text-sm">{component.label}</span>
                          </div>
                          <span className="text-white">{component.value}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${component.value}%` }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                            className={`h-full bg-gradient-to-r ${compatibility.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Reasons */}
                  <div className="mb-6">
                    <h4 className="text-white mb-3">Why You'll Vibe</h4>
                    <div className="space-y-2">
                      {selectedUser.reasons.map((reason, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-slate-300 text-sm"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all"
                    >
                      Close
                    </button>
                    <button
                      className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all"
                    >
                      Invite to Match
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
