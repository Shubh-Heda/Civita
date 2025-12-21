import { motion } from 'motion/react';
import { Camera, Heart, Send, MapPin, Users, Clock, Star, Sparkles } from 'lucide-react';
import { postMatchService, HangoutSuggestion } from '../services/postMatchService';
import { useState } from 'react';
import { Button } from './ui/button';

interface PostMatchRitualsProps {
  matchId: string;
  matchData: any;
  userId: string;
  onClose?: () => void;
}

export function PostMatchRituals({ matchId, matchData, userId, onClose }: PostMatchRitualsProps) {
  const [vibeRating, setVibeRating] = useState(0);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHangout, setShowHangout] = useState(false);

  const highlights = postMatchService.getEmotionalHighlightSuggestions();
  const hangoutSuggestions = postMatchService.getHangoutSuggestions('Mumbai');

  const handleVibeRating = (rating: number) => {
    setVibeRating(rating);
  };

  const toggleHighlight = (highlight: string) => {
    if (selectedHighlights.includes(highlight)) {
      setSelectedHighlights(selectedHighlights.filter(h => h !== highlight));
    } else {
      setSelectedHighlights([...selectedHighlights, highlight]);
    }
  };

  const handleSubmit = () => {
    postMatchService.createMemory({
      matchId,
      userId,
      vibeRating,
      emotionalHighlights: selectedHighlights,
      reflection,
      tags: ['fun', 'friendship']
    });

    setSubmitted(true);
  };

  const createHangoutPoll = () => {
    postMatchService.createHangoutPoll({
      matchId,
      question: 'Where should we grab food? 🍕',
      options: hangoutSuggestions.slice(0, 4).map(s => s.name),
      createdBy: userId
    });
    setShowHangout(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 min-h-screen flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>

          <h2 className="text-white mb-4">Memory Saved!</h2>
          <p className="text-slate-400 mb-8">
            Your reflection has been added to the match memories
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => setShowHangout(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-2xl"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Extend the Friendship - Hangout?
            </Button>

            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 py-6 rounded-2xl"
              >
                Back to Dashboard
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (showHangout) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 min-h-screen p-6"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6"
          >
            <button
              onClick={() => setShowHangout(false)}
              className="text-slate-400 hover:text-white mb-4"
            >
              ← Back
            </button>
            <h2 className="text-white mb-2">Extend the Friendship 🍕</h2>
            <p className="text-slate-400">Grab food together and keep the good vibes going!</p>
          </motion.div>

          {/* Hangout Suggestions */}
          <div className="space-y-4">
            {hangoutSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">
                      {suggestion.type === 'cafe' ? '☕' : 
                       suggestion.type === 'restaurant' ? '🍽️' : 
                       suggestion.type === 'dessert' ? '🍰' : '🍺'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white mb-1">{suggestion.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {suggestion.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            {suggestion.rating}
                          </span>
                          <span>{suggestion.priceRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button
              onClick={createHangoutPoll}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 rounded-2xl"
            >
              <Users className="w-5 h-5 mr-2" />
              Create Group Poll
            </Button>
          </motion.div>

          {onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full mt-3 border-slate-700 text-slate-400 hover:bg-slate-800 py-6 rounded-2xl"
            >
              Maybe Later
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 min-h-screen p-6"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-white mb-2">Match Complete!</h2>
          <p className="text-slate-400">Let's capture this moment together</p>
        </motion.div>

        {/* Rate the Vibe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50 mb-6"
        >
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            How was the vibe?
          </h3>

          <div className="flex justify-center gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVibeRating(rating)}
                className={`text-4xl transition-all ${
                  vibeRating >= rating ? 'scale-110' : 'opacity-40 grayscale'
                }`}
              >
                {rating <= 2 ? '😐' : rating === 3 ? '😊' : rating === 4 ? '😄' : '🤩'}
              </motion.button>
            ))}
          </div>

          <div className="text-center text-sm text-slate-400">
            {vibeRating === 0 && 'Tap to rate'}
            {vibeRating === 1 && 'Could be better'}
            {vibeRating === 2 && 'It was okay'}
            {vibeRating === 3 && 'Good vibes!'}
            {vibeRating === 4 && 'Great energy!'}
            {vibeRating === 5 && 'Absolutely amazing!'}
          </div>
        </motion.div>

        {/* Emotional Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50 mb-6"
        >
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Emotional Highlights
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((highlight, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => toggleHighlight(highlight)}
                className={`p-3 rounded-xl border transition-all text-left ${
                  selectedHighlights.includes(highlight)
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-slate-700/40 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {highlight}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50 mb-6"
        >
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" />
            Share Your Thoughts
          </h3>

          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What made this match special? Share your favorite moment..."
            className="w-full h-32 px-4 py-3 bg-slate-700/60 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
            maxLength={500}
          />
          <div className="text-xs text-slate-500 text-right mt-2">
            {reflection.length}/500
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={vibeRating === 0}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-2xl disabled:opacity-50"
          >
            Save Memory 💜
          </Button>

          {onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full mt-3 border-slate-700 text-slate-400 hover:bg-slate-800 py-6 rounded-2xl"
            >
              Skip for Now
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
