import { motion } from 'motion/react';
import { Users, Heart, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { friendshipService, FriendshipConnection } from '../services/friendshipService';
import { useState, useEffect } from 'react';

interface FriendshipMapProps {
  userId: string;
}

export function FriendshipMap({ userId }: FriendshipMapProps) {
  const [connections, setConnections] = useState<FriendshipConnection[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<FriendshipConnection | null>(null);

  useEffect(() => {
    const network = friendshipService.getFriendshipNetwork(userId);
    setConnections(network);
  }, [userId]);

  const getStrengthColor = (strength: number) => {
    if (strength >= 90) return 'from-pink-500 to-rose-500';
    if (strength >= 75) return 'from-purple-500 to-pink-500';
    if (strength >= 60) return 'from-blue-500 to-purple-500';
    if (strength >= 40) return 'from-cyan-500 to-blue-500';
    return 'from-slate-500 to-slate-600';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength >= 90) return 'Best Friends 💕';
    if (strength >= 75) return 'Close Friends 💜';
    if (strength >= 60) return 'Good Friends 💙';
    if (strength >= 40) return 'Friends 🤝';
    return 'New Connection 🌱';
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Your Friendship Network</h2>
            <p className="text-slate-400">Building connections through sports</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800/60 rounded-xl p-4 text-center">
            <div className="text-2xl text-white mb-1">{connections.length}</div>
            <div className="text-sm text-slate-400">Connections</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center">
            <div className="text-2xl text-pink-400 mb-1">
              {connections.filter(c => c.strength >= 75).length}
            </div>
            <div className="text-sm text-slate-400">Close Friends</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 text-center">
            <div className="text-2xl text-purple-400 mb-1">
              {connections.reduce((sum, c) => sum + c.matchCount, 0)}
            </div>
            <div className="text-sm text-slate-400">Total Matches</div>
          </div>
        </div>
      </motion.div>

      {/* Visual Network */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50 overflow-hidden"
      >
        <h3 className="text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Connection Strength Visualization
        </h3>

        <div className="relative h-64 flex items-center justify-center">
          {/* Center - You */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center z-10 border-4 border-slate-900"
          >
            <span className="text-2xl">👤</span>
          </motion.div>

          {/* Connections - arranged in a circle */}
          {connections.slice(0, 8).map((friend, index) => {
            const angle = (index / Math.min(connections.length, 8)) * 2 * Math.PI;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const size = 12 + (friend.strength / 100) * 8; // 12-20px based on strength

            return (
              <motion.div
                key={friend.userId}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ scale: 1, x, y }}
                transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                onClick={() => setSelectedFriend(friend)}
                className={`absolute w-${Math.floor(size)} h-${Math.floor(size)} cursor-pointer`}
                style={{
                  width: `${size * 4}px`,
                  height: `${size * 4}px`,
                }}
              >
                {/* Connection line */}
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: `${Math.abs(x) * 2 + 80}px`,
                    height: `${Math.abs(y) * 2 + 80}px`,
                  }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={x > 0 ? '0%' : '100%'}
                    y2={y > 0 ? '0%' : '100%'}
                    stroke="url(#gradient)"
                    strokeWidth={friend.strength / 30}
                    opacity={0.3}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Friend avatar */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-full h-full bg-gradient-to-br ${getStrengthColor(friend.strength)} rounded-full flex items-center justify-center border-2 border-slate-900`}
                >
                  <img
                    src={friend.avatar}
                    alt={friend.userName}
                    className="w-full h-full rounded-full"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {connections.length > 8 && (
          <p className="text-center text-slate-400 text-sm mt-4">
            Showing 8 of {connections.length} connections
          </p>
        )}
      </motion.div>

      {/* Detailed List */}
      <div className="space-y-3">
        <h3 className="text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-400" />
          All Connections
        </h3>

        {connections.map((friend, index) => (
          <motion.div
            key={friend.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedFriend(friend)}
            className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${getStrengthColor(friend.strength)} rounded-xl p-0.5`}>
                <img
                  src={friend.avatar}
                  alt={friend.userName}
                  className="w-full h-full rounded-xl"
                />
              </div>

              <div className="flex-1">
                <h4 className="text-white mb-1">{friend.userName}</h4>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {friend.matchCount} matches
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(friend.lastPlayed)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-white mb-1">{getStrengthLabel(friend.strength)}</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${friend.strength}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                      className={`h-full bg-gradient-to-r ${getStrengthColor(friend.strength)}`}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-8">{friend.strength}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {connections.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-white mb-2">Start Building Your Network</h3>
            <p className="text-slate-400">
              Join matches to connect with fellow players and build lasting friendships!
            </p>
          </div>
        )}
      </div>

      {/* Selected Friend Detail Modal */}
      {selectedFriend && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedFriend(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-700"
          >
            <div className="text-center mb-6">
              <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${getStrengthColor(selectedFriend.strength)} rounded-2xl p-1`}>
                <img
                  src={selectedFriend.avatar}
                  alt={selectedFriend.userName}
                  className="w-full h-full rounded-2xl"
                />
              </div>
              <h3 className="text-white mb-2">{selectedFriend.userName}</h3>
              <p className="text-slate-400">{getStrengthLabel(selectedFriend.strength)}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-800/60 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Friendship Strength</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getStrengthColor(selectedFriend.strength)}`}
                      style={{ width: `${selectedFriend.strength}%` }}
                    />
                  </div>
                  <span className="text-white">{selectedFriend.strength}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/60 rounded-xl p-4 text-center">
                  <div className="text-2xl text-purple-400 mb-1">{selectedFriend.matchCount}</div>
                  <div className="text-sm text-slate-400">Matches Together</div>
                </div>
                <div className="bg-slate-800/60 rounded-xl p-4 text-center">
                  <div className="text-sm text-cyan-400 mb-1">{formatDate(selectedFriend.lastPlayed)}</div>
                  <div className="text-sm text-slate-400">Last Played</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedFriend(null)}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
