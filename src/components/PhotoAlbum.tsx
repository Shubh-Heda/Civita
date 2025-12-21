import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Upload, Heart, MessageCircle, Share2, Eye, Download,
  Trash2, Edit2, Plus, Search, X, Star
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { photosService, Photo, Album } from '../services/photosService';

interface PhotoAlbumProps {
  category: 'sports' | 'events' | 'parties' | 'gaming';
  onNavigate: (page: string) => void;
}

export function PhotoAlbum({ category, onNavigate }: PhotoAlbumProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const albums = photosService.getAlbumsByMatch('');
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
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
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{getCategoryIcon()}</span>
                <h1 className="text-2xl font-bold text-slate-900">Photo Albums</h1>
              </div>
              <p className="text-sm text-slate-600">Organize and share your {getCategoryName()} memories</p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setShowUpload(!showUpload)}
              className={`gap-2 ${showUpload ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-800 hover:bg-slate-700'} text-white`}
            >
              {showUpload ? <X className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
              {showUpload ? 'Cancel' : 'New Album'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {selectedAlbum ? (
          // Album Detail View
          <div>
            {/* Back button */}
            <button
              onClick={() => setSelectedAlbum(null)}
              className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Albums
            </button>

            {/* Album Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className={`h-40 bg-gradient-to-r ${getCategoryColor()} flex items-center justify-center`}>
                <span className="text-8xl">{selectedAlbum.coverPhoto}</span>
              </div>
              <div className="p-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedAlbum.title}</h2>
                <p className="text-slate-600 mb-4">{selectedAlbum.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">{selectedAlbum.totalPhotos}</p>
                    <p className="text-sm text-slate-600">Photos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">{selectedAlbum.views}</p>
                    <p className="text-sm text-slate-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">↑</p>
                    <p className="text-sm text-slate-600">Upload More</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">⚙️</p>
                    <p className="text-sm text-slate-600">Settings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Grid */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Photos in Album</h3>
              {selectedAlbum.photos.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                  <Upload className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">No photos yet</p>
                  <p className="text-sm text-slate-500">Upload your first photo to this album</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedAlbum.photos.map((photo, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedPhoto(photo)}
                      className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden cursor-pointer relative group"
                    >
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-slate-200 to-slate-300">
                        {photo.url}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <button className="p-2 bg-white rounded-lg hover:bg-slate-100">
                          <Heart className="w-5 h-5 text-red-500" />
                        </button>
                        <button className="p-2 bg-white rounded-lg hover:bg-slate-100">
                          <MessageCircle className="w-5 h-5 text-blue-500" />
                        </button>
                      </div>
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-slate-900">
                        {photo.likes} likes
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : showUpload ? (
          // Upload Form
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Album</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Album Title</label>
                <Input placeholder="e.g., Championship Victory Photos" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe the event or memory..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Photos</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-slate-400 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600">Drag and drop photos here</p>
                  <p className="text-sm text-slate-500">or click to browse</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Match/Event</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400">
                  <option>Select a match or event...</option>
                  <option>Football Championship - Jan 10</option>
                  <option>Gaming Tournament - Jan 12</option>
                  <option>Badminton Match - Jan 15</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowUpload(false);
                  toast.success('Album created successfully! 🎉');
                }}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white"
              >
                Create Album
              </Button>
              <Button
                onClick={() => setShowUpload(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          // Albums Grid
          <div>
            {filteredAlbums.length === 0 ? (
              <div className="text-center py-12">
                <Upload className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No albums yet</p>
                <p className="text-slate-500 text-sm mb-6">Create your first album to organize photos from your events</p>
                <Button
                  onClick={() => setShowUpload(true)}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create First Album
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlbums.map((album, idx) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedAlbum(album)}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                  >
                    {/* Cover */}
                    <div className={`h-40 bg-gradient-to-r ${getCategoryColor()} flex items-center justify-center relative overflow-hidden`}>
                      <span className="text-6xl group-hover:scale-110 transition-transform">{album.coverPhoto}</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 line-clamp-2 mb-2">{album.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4">{album.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        <div className="bg-slate-50 rounded p-2 text-center">
                          <p className="font-bold text-slate-900">{album.totalPhotos}</p>
                          <p className="text-slate-600">Photos</p>
                        </div>
                        <div className="bg-slate-50 rounded p-2 text-center">
                          <p className="font-bold text-slate-900">{album.views}</p>
                          <p className="text-slate-600">Views</p>
                        </div>
                      </div>

                      <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                        View Album
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Photo Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Image */}
              <div className="w-full h-80 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-9xl">
                {selectedPhoto.url}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedPhoto.caption}</h3>
                  <p className="text-sm text-slate-600">{selectedPhoto.uploadedAt}</p>
                </div>

                {/* Tags */}
                {selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag, idx) => (
                      <Badge key={idx} className="bg-slate-100 text-slate-700">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                  <Button className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600">
                    <Heart className="w-4 h-4" />
                    {selectedPhoto.likes}
                  </Button>
                  <Button className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600">
                    <MessageCircle className="w-4 h-4" />
                    {selectedPhoto.comments.length}
                  </Button>
                  <Button className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>

                {/* Comments */}
                {selectedPhoto.comments.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-3">Comments</h4>
                    <div className="space-y-3">
                      {selectedPhoto.comments.map((comment, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-3">
                          <p className="font-semibold text-slate-900 text-sm">{comment.userName}</p>
                          <p className="text-slate-700 text-sm">{comment.text}</p>
                          <p className="text-xs text-slate-500 mt-1">{comment.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
