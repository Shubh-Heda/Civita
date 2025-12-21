import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Play, Heart, Eye, Share2, TrendingUp, Clock, Zap,
  Search, Filter, X, Volume2, Maximize2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { photosService, HighlightReel } from '../services/photosService';

interface HighlightReelsProps {
  category: 'sports' | 'events' | 'parties' | 'gaming';
  onNavigate: (page: string) => void;
}

export function HighlightReels({ category, onNavigate }: HighlightReelsProps) {
  const [selectedReel, setSelectedReel] = useState<HighlightReel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'trending' | 'recent' | 'most-liked'>('trending');
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());

  const reels = photosService.getReelsByCategory(category);
  
  let filteredReels = reels.filter(reel =>
    reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterBy === 'trending') {
    filteredReels = filteredReels.sort((a, b) => b.views - a.views);
  } else if (filterBy === 'recent') {
    filteredReels = filteredReels.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (filterBy === 'most-liked') {
    filteredReels = filteredReels.sort((a, b) => b.likes - a.likes);
  }

  const getCategoryIcon = () => {
    switch (category) {
      case 'sports': return '⚽';
      case 'events': return '🎵';
      case 'parties': return '🎉';
      case 'gaming': return '🎮';
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'sports': return 'from-emerald-500 to-cyan-500';
      case 'events': return 'from-purple-500 to-pink-500';
      case 'parties': return 'from-pink-500 to-red-500';
      case 'gaming': return 'from-indigo-500 to-purple-500';
    }
  };

  const getCategoryName = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleLike = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = new Set(likedReels);
    if (newLiked.has(reelId)) {
      newLiked.delete(reelId);
      toast.success('Removed from favorites');
    } else {
      newLiked.add(reelId);
      toast.success('Added to favorites! 🎬');
    }
    setLikedReels(newLiked);
  };

  const emotionEmojis: Record<string, string> = {
    celebration: '🎉',
    action: '⚡',
    moment: '✨',
    funny: '😂'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => {
                const dashboardMap: Record<string, string> = {
                  sports: 'dashboard',
                  events: 'events-dashboard',
                  parties: 'party-dashboard',
                  gaming: 'gaming-hub'
                };
                onNavigate(dashboardMap[category]);
              }}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{getCategoryIcon()}</span>
                <h1 className="text-2xl font-bold text-white">Highlight Reels</h1>
              </div>
              <p className="text-sm text-slate-300">Watch the best moments from your {getCategoryName()} events</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search reels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'trending' | 'recent' | 'most-liked')}
              className="px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg hover:border-slate-500 transition-colors"
            >
              <option value="trending">Trending</option>
              <option value="recent">Recent</option>
              <option value="most-liked">Most Liked</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredReels.length === 0 ? (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-300 text-lg">No highlight reels yet</p>
            <p className="text-slate-500 text-sm">Check back soon for amazing moments from your {getCategoryName()} events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReels.map((reel, idx) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedReel(reel)}
                className="group cursor-pointer"
              >
                {/* Video Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                  {/* Thumbnail */}
                  <div className={`h-48 bg-gradient-to-br ${getCategoryColor()} flex items-center justify-center relative`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform">{reel.thumbnail}</span>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-100 scale-75">
                        <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs text-white font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.floor(reel.videoDuration / 60)}:{(reel.videoDuration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-slate-800 p-4">
                    <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                      {reel.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-2 mb-3">{reel.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                      <div className="bg-slate-700 rounded p-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-slate-200">
                          <Eye className="w-3 h-3" />
                          <span>{reel.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bg-slate-700 rounded p-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-red-400">
                          <Heart className="w-3 h-3" fill="currentColor" />
                          <span>{reel.likes}</span>
                        </div>
                      </div>
                      <div className="bg-slate-700 rounded p-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-400">
                          <TrendingUp className="w-3 h-3" />
                          <span>Hot</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => handleLike(reel.id, e)}
                        className={`flex-1 gap-2 text-xs ${
                          likedReels.has(reel.id)
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${likedReels.has(reel.id) ? 'fill-white' : ''}`} />
                        Like
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success('Reel shared! 🎬');
                        }}
                        className="flex-1 gap-2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200"
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Reel Player Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReel(null)}
            className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              {/* Video Player */}
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                {/* Video Area */}
                <div className={`aspect-video bg-gradient-to-br ${getCategoryColor()} flex items-center justify-center relative`}>
                  <span className="text-9xl">{selectedReel.thumbnail}</span>
                  
                  {/* Player Controls */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110">
                      <Play className="w-10 h-10 text-slate-900 ml-1" fill="currentColor" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '45%' }} />
                  </div>

                  {/* Time Display */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-sm text-white font-semibold">
                    {Math.floor(selectedReel.videoDuration / 60)}:{(selectedReel.videoDuration % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Info and Details */}
                <div className="bg-slate-900 p-6 space-y-4 text-white">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedReel.title}</h2>
                    <p className="text-slate-300">{selectedReel.description}</p>
                  </div>

                  {/* Highlights Timeline */}
                  {selectedReel.highlights.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Key Moments</h3>
                      <div className="space-y-2">
                        {selectedReel.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-800 rounded-lg p-3 flex items-center gap-3 hover:bg-slate-700 transition-colors cursor-pointer group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded flex items-center justify-center flex-shrink-0">
                              <span>{emotionEmojis[highlight.emotion]}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{highlight.description}</p>
                              <p className="text-xs text-slate-400">
                                {Math.floor(highlight.timestamp / 60)}:{(highlight.timestamp % 60).toString().padStart(2, '0')}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-slate-400" />
                        <span className="text-sm">{selectedReel.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm">{selectedReel.likes} likes</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setLikedReels(new Set([...likedReels, selectedReel.id]));
                          toast.success('Added to favorites! ❤️');
                        }}
                        className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        Like
                      </Button>
                      <Button
                        onClick={() => {
                          toast.success('Reel shared! 🎬');
                        }}
                        className="gap-2 bg-slate-700 hover:bg-slate-600 text-white"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                      <Button
                        onClick={() => setSelectedReel(null)}
                        className="gap-2 bg-slate-700 hover:bg-slate-600 text-white"
                      >
                        <X className="w-4 h-4" />
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Import ChevronRight
import { ChevronRight } from 'lucide-react';
