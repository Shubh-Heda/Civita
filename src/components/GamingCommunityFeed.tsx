import { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Gamepad2, Trophy, Users, Star, ThumbsUp, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface GamingCommunityFeedProps {
  onNavigate: (page: string) => void;
}

export function GamingCommunityFeed({ onNavigate }: GamingCommunityFeedProps) {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Pro Player Alex',
      avatar: '🎮',
      game: 'FIFA 24',
      title: 'Just won the tournament! 🏆',
      content: 'Incredible finals match against the reigning champion. Best gaming moment of my life!',
      likes: 342,
      comments: 45,
      shares: 12,
      timestamp: '2 hours ago',
      liked: false,
    },
    {
      id: '2',
      author: 'Gaming Coach Sam',
      avatar: '👨‍🏫',
      game: 'Valorant',
      title: 'Pro Tips: Competitive Gameplay',
      content: 'Here are 5 tips that improved my rank from Silver to Diamond. Check them out!',
      likes: 523,
      comments: 87,
      shares: 34,
      timestamp: '4 hours ago',
      liked: false,
    },
    {
      id: '3',
      author: 'Gaming Community',
      avatar: '👥',
      game: 'COD: MW3',
      title: 'Weekly Tournament Results',
      content: 'Congratulations to all participants! Next tournament starts next Sunday.',
      likes: 289,
      comments: 56,
      shares: 23,
      timestamp: '6 hours ago',
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostCreate = () => {
    if (!newPost.trim()) {
      toast.error('Write something to share!');
      return;
    }

    const post = {
      id: String(posts.length + 1),
      author: 'You',
      avatar: '🎮',
      game: 'Gaming',
      title: newPost.substring(0, 50),
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'now',
      liked: false,
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast.success('Post shared! 🎉');
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => onNavigate('gaming-hub')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 className="text-slate-900 font-semibold">Gaming Community</h1>
            <p className="text-sm text-slate-600">Connect with gamers worldwide</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* Create Post */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">Share Your Gaming Moment</h3>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
              🎮
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What gaming achievement are you celebrating? Share your wins, tips, or epic moments..."
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Gamepad2 className="w-5 h-5 text-purple-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Users className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
                <Button
                  onClick={handlePostCreate}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Share Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Post Header */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-lg">
                      {post.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{post.author}</p>
                      <p className="text-xs text-slate-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">{post.game}</Badge>
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{post.title}</h3>
              </div>

              {/* Post Content */}
              <div className="p-4 border-b border-slate-100">
                <p className="text-slate-700">{post.content}</p>
              </div>

              {/* Post Stats */}
              <div className="px-4 py-3 flex items-center gap-4 text-sm text-slate-600 border-b border-slate-100">
                <button className="hover:text-purple-600 transition-colors">
                  <span className="font-semibold">{post.likes}</span> Likes
                </button>
                <button className="hover:text-blue-600 transition-colors">
                  <span className="font-semibold">{post.comments}</span> Comments
                </button>
                <button className="hover:text-green-600 transition-colors">
                  <span className="font-semibold">{post.shares}</span> Shares
                </button>
              </div>

              {/* Post Actions */}
              <div className="p-3 flex gap-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${post.liked ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
                  />
                  <span className="text-sm font-semibold text-slate-700">Like</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
