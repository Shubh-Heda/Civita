import { motion, AnimatePresence } from 'motion/react';
import { Heart, ThumbsUp, Send, Sparkles, Trophy, Award } from 'lucide-react';
import { gratitudeService, GratitudePost } from '../services/gratitudeService';
import { userService, User } from '../services/userService';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface GratitudeWallProps {
  userId: string;
}

export function GratitudeWall({ userId }: GratitudeWallProps) {
  const [posts, setPosts] = useState<GratitudePost[]>([]);
  const [mvp, setMvp] = useState<any>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GratitudePost['category']>('great_teammate');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  useEffect(() => {
    loadGratitude();
    loadAvailableUsers();
  }, [userId]);

  const loadAvailableUsers = async () => {
    try {
      const users = await userService.getAllUsers();
      const filteredUsers = users.filter(u => u.id !== userId);
      setAvailableUsers(filteredUsers);
      if (filteredUsers.length > 0) {
        setSelectedUserId(filteredUsers[0].id);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadGratitude = () => {
    const publicPosts = gratitudeService.getPublicGratitude(20);
    setPosts(publicPosts);
    
    const mvpData = gratitudeService.getMVPOfKindness();
    setMvp(mvpData);
  };

  const handleLike = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (post.likes.includes(userId)) {
      gratitudeService.unlikeGratitude(postId, userId);
    } else {
      gratitudeService.likeGratitude(postId, userId);
    }
    
    loadGratitude();
  };

  const handleSubmit = () => {
    if (!message.trim()) return;

    gratitudeService.createGratitude({
      fromUserId: userId,
      toUserId: selectedUserId, // Mock - in real app, select from list
      message: message.trim(),
      category: selectedCategory,
      isPublic: true
    });

    setMessage('');
    setShowNewPost(false);
    loadGratitude();
  };

  const categories: Array<{ value: GratitudePost['category']; label: string; emoji: string }> = [
    { value: 'great_teammate', label: 'Great Teammate', emoji: '🤝' },
    { value: 'newbie_helper', label: 'Newbie Helper', emoji: '🌟' },
    { value: 'positive_vibe', label: 'Positive Vibe', emoji: '✨' },
    { value: 'skilled_player', label: 'Skilled Player', emoji: '⚡' },
    { value: 'organizer', label: 'Organizer', emoji: '🎯' },
    { value: 'other', label: 'Other', emoji: '❤️' }
  ];

  const formatTime = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header with MVP */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-3xl p-6 border border-yellow-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Community Gratitude Wall</h2>
            <p className="text-slate-400">Spread positivity and appreciation</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>

        {mvp && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-4 border border-yellow-500/20"
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400">MVP of Kindness This Week</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={mvp.avatar}
                alt={mvp.userName}
                className="w-12 h-12 rounded-xl border-2 border-yellow-500"
              />
              <div className="flex-1">
                <div className="text-white">{mvp.userName}</div>
                <div className="text-sm text-slate-400">
                  {mvp.gratitudeCount} appreciations received
                </div>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Create New Post Button */}
      <Button
        onClick={() => setShowNewPost(!showNewPost)}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-2xl"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Share Gratitude
      </Button>

      {/* New Post Form */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50 overflow-hidden"
          >
            <h3 className="text-white mb-4">Express Your Gratitude</h3>

            {/* Category Selection */}
            <div className="mb-4">
              <label className="text-sm text-slate-400 mb-2 block">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`p-3 rounded-xl border transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-slate-700/40 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.emoji}</div>
                    <div className="text-xs">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Selection */}
            <div className="mb-4">
              <label className="text-sm text-slate-400 mb-2 block">Recipient</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/60 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              >
                {availableUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="text-sm text-slate-400 mb-2 block">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what you appreciate..."
                className="w-full h-24 px-4 py-3 bg-slate-700/60 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                maxLength={280}
              />
              <div className="text-xs text-slate-500 text-right mt-1">
                {message.length}/280
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowNewPost(false)}
                variant="outline"
                className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gratitude Posts */}
      <div className="space-y-4">
        <h3 className="text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Recent Appreciation
        </h3>

        {posts.map((post, index) => {
          const categoryInfo = gratitudeService.getCategoryInfo(post.category);
          const isLiked = post.likes.includes(userId);

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={post.fromUserAvatar}
                  alt={post.fromUserName}
                  className="w-10 h-10 rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white">{post.fromUserName}</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-purple-400">{post.toUserName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 bg-gradient-to-r ${categoryInfo.color} bg-opacity-20 rounded-lg text-xs text-white flex items-center gap-1`}>
                      <span>{categoryInfo.emoji}</span>
                      <span>{categoryInfo.label}</span>
                    </span>
                    <span className="text-xs text-slate-500">{formatTime(post.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-slate-300 mb-4 pl-13">
                {post.message}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 pl-13">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                    isLiked
                      ? 'bg-pink-500/20 text-pink-400'
                      : 'bg-slate-700/40 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes.length}</span>
                </button>
              </div>
            </motion.div>
          );
        })}

        {posts.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-white mb-2">No Gratitude Posts Yet</h3>
            <p className="text-slate-400">
              Be the first to spread some positivity!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}