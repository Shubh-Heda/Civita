import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Download, Share2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Photo {
  id: string;
  url: string;
  caption?: string;
  matchTitle: string;
  date: string;
  uploadedBy: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface PhotoGalleryViewProps {
  photos: Photo[];
  initialPhotoIndex?: number;
  onClose: () => void;
  onDelete?: (photoId: string) => void;
}

export function PhotoGalleryView({
  photos,
  initialPhotoIndex = 0,
  onClose,
  onDelete,
}: PhotoGalleryViewProps) {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  const currentPhoto = photos[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  const handleLike = () => {
    toast.success('Photo liked! ❤️');
  };

  const handleDownload = () => {
    toast.success('Photo downloaded! 📥');
  };

  const handleShare = () => {
    toast.success('Share link copied! 🔗');
  };

  const handleDeleteClick = () => {
    if (onDelete && confirm('Are you sure you want to delete this photo?')) {
      onDelete(currentPhoto.id);
      toast.success('Photo deleted');
      if (photos.length > 1) {
        handleNext();
      } else {
        onClose();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Buttons */}
      {photos.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Photo Counter */}
      <div className="absolute top-4 left-4 z-50 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white text-sm">
          {currentIndex + 1} / {photos.length}
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl w-full h-full flex flex-col md:flex-row items-center gap-4 p-4">
        {/* Image Container */}
        <div className="flex-1 h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto.id}
              src={currentPhoto.url}
              alt={currentPhoto.caption || currentPhoto.matchTitle}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsZoomed(!isZoomed)}
              className="max-h-[80vh] max-w-full object-contain cursor-zoom-in"
              style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
            />
          </AnimatePresence>
        </div>

        {/* Info Sidebar */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full md:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 md:h-[80vh] overflow-y-auto"
        >
          {/* Match Info */}
          <div className="mb-6">
            <h2 className="text-white text-xl mb-2">{currentPhoto.matchTitle}</h2>
            <p className="text-white/70 text-sm mb-1">
              Uploaded by <span className="text-white">{currentPhoto.uploadedBy}</span>
            </p>
            <p className="text-white/50 text-xs">
              {new Date(currentPhoto.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Caption */}
          {currentPhoto.caption && (
            <div className="mb-6">
              <p className="text-white/90 text-sm leading-relaxed">{currentPhoto.caption}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleLike}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <Heart className={`w-5 h-5 ${currentPhoto.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              <span className="text-white flex-1 text-left">
                {currentPhoto.isLiked ? 'Liked' : 'Like'}
              </span>
              <span className="text-white/70 text-sm">{currentPhoto.likes}</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white flex-1 text-left">Comment</span>
              <span className="text-white/70 text-sm">{currentPhoto.comments}</span>
            </button>

            <button
              onClick={handleDownload}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <Download className="w-5 h-5 text-white" />
              <span className="text-white flex-1 text-left">Download</span>
            </button>

            <button
              onClick={handleShare}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <Share2 className="w-5 h-5 text-white" />
              <span className="text-white flex-1 text-left">Share</span>
            </button>

            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
                <span className="text-red-400 flex-1 text-left">Delete Photo</span>
              </button>
            )}
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide mb-3">All Photos</p>
              <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsZoomed(false);
                    }}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      index === currentIndex ? 'ring-2 ring-cyan-400' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        <p className="text-white/70 text-xs">
          Use <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd> <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd> to navigate • <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd> to close
        </p>
      </div>
    </motion.div>
  );
}
