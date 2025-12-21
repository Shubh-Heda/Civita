import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Star, Camera, Send, Users, MapPin, Calendar,
  TrendingUp, MessageCircle, Smile, Sparkles, CheckCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { gratitudeService } from '../services/gratitudeService';
import { userService, User } from '../services/userService';

interface PostMatchRitualProps {
  matchId: string;
  userId: string;
  onClose: () => void;
}

export function PostMatchRitual({ matchId, userId, onClose }: PostMatchRitualProps) {
  const [currentStep, setCurrentStep] = useState<'vibe' | 'memories' | 'gratitude' | 'next'>('vibe');
  const [vibeRating, setVibeRating] = useState(0);
  const [vibes, setVibes] = useState<string[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<number>(0);
  const [gratitudeMessage, setGratitudeMessage] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [nextMeetupInterest, setNextMeetupInterest] = useState(false);
  const [players, setPlayers] = useState<User[]>([]);

  const vibeOptions = [
    { emoji: '🔥', label: 'High Energy', color: 'from-orange-500 to-red-500' },
    { emoji: '😊', label: 'Fun & Chill', color: 'from-yellow-500 to-green-500' },
    { emoji: '💪', label: 'Competitive', color: 'from-blue-500 to-purple-500' },
    { emoji: '🤝', label: 'Great Teamwork', color: 'from-green-500 to-teal-500' },
    { emoji: '🌟', label: 'Inspiring', color: 'from-purple-500 to-pink-500' },
    { emoji: '❤️', label: 'Heartwarming', color: 'from-pink-500 to-red-500' }
  ];

  // Load players from backend with fallback to mock data
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        setPlayers(allUsers.slice(0, 6));
      } catch (error) {
        console.error('Error loading players:', error);
      }
    };
    loadPlayers();
  }, []);

  const handleVibeSelect = (vibe: string) => {
    setVibes(prev => 
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const handleSendGratitude = () => {
    if (gratitudeMessage && selectedPlayer) {
      gratitudeService.createPost(
        userId,
        selectedPlayer,
        gratitudeMessage,
        'thanks',
        matchId
      );
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {['vibe', 'memories', 'gratitude', 'next'].map((step, index) => (
        <div
          key={step}
          className={`h-2 rounded-full transition-all ${
            currentStep === step ? 'w-8 bg-gradient-to-r from-cyan-500 to-blue-500' : 'w-2 bg-slate-600'
          }`}
        />
      ))}
    </div>
  );

  const renderVibeRating = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-white text-2xl mb-2">How was the vibe? ✨</h2>
        <p className="text-slate-400">Rate the overall feeling of the match</p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setVibeRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-12 h-12 ${
                star <= vibeRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-slate-600'
              } transition-all`}
            />
          </motion.button>
        ))}
      </div>

      {/* Vibe Tags */}
      <div>
        <h3 className="text-white mb-4 text-center">Pick the vibes (select all that apply)</h3>
        <div className="grid grid-cols-2 gap-3">
          {vibeOptions.map((option) => (
            <motion.button
              key={option.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVibeSelect(option.label)}
              className={`p-4 rounded-xl border transition-all ${
                vibes.includes(option.label)
                  ? `bg-gradient-to-r ${option.color} border-transparent shadow-lg`
                  : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="text-3xl mb-2">{option.emoji}</div>
              <div className="text-white text-sm">{option.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => setCurrentStep('memories')}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
        disabled={vibeRating === 0}
      >
        Next: Add Memories
      </Button>
    </motion.div>
  );

  const renderMemories = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-white text-2xl mb-2">Capture the Moments 📸</h2>
        <p className="text-slate-400">Add photos and memories from the match</p>
      </div>

      {/* Photo Upload Simulation */}
      <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50 text-center">
        <Camera className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-white mb-2">Upload Photos</h3>
        <p className="text-slate-400 text-sm mb-4">Share highlights from the match</p>
        
        <Button
          onClick={() => setSelectedPhotos(prev => prev + 1)}
          variant="outline"
          className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
        >
          <Camera className="w-4 h-4 mr-2" />
          {selectedPhotos === 0 ? 'Add Photos' : `${selectedPhotos} Photo${selectedPhotos > 1 ? 's' : ''} Added`}
        </Button>
      </div>

      {/* Quick Memory Tags */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Match Highlights
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Great shots', 'Close game', 'Lots of laughs', 'Learned new skills', 'Made new friends'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setCurrentStep('vibe')}
          variant="outline"
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
        >
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep('gratitude')}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
        >
          Next: Say Thanks
        </Button>
      </div>
    </motion.div>
  );

  const renderGratitude = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-white text-2xl mb-2">Spread the Love 💚</h2>
        <p className="text-slate-400">Thank someone who made the match special</p>
      </div>

      {/* Select Player */}
      <div>
        <label className="text-white mb-3 block">Who made your day?</label>
        <div className="grid grid-cols-3 gap-3">
          {players.map((player) => (
            <motion.button
              key={player.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlayer(player.id)}
              className={`p-3 rounded-xl border transition-all ${
                selectedPlayer === player.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent'
                  : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-2 flex items-center justify-center text-white">
                {player.name[0]}
              </div>
              <div className="text-white text-xs truncate">{player.name.split(' ')[0]}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gratitude Message */}
      <div>
        <label className="text-white mb-3 block">Your message</label>
        <textarea
          value={gratitudeMessage}
          onChange={(e) => setGratitudeMessage(e.target.value)}
          placeholder="Share what you appreciated... 🙏"
          className="w-full bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          rows={4}
        />
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2">
        {['Great energy!', 'Thanks for waiting', 'Best teammate!', 'Learned so much'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setGratitudeMessage(gratitudeMessage + ' ' + suggestion)}
            className="px-3 py-1 bg-slate-700/60 rounded-full text-slate-300 text-sm hover:bg-slate-600 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setCurrentStep('memories')}
          variant="outline"
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            handleSendGratitude();
            setCurrentStep('next');
          }}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
        >
          <Send className="w-4 h-4 mr-2" />
          Send & Continue
        </Button>
      </div>
    </motion.div>
  );

  const renderNextMeetup = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-white text-2xl mb-2">Match Completed! 🎉</h2>
        <p className="text-slate-400">Great game! Want to play together again?</p>
      </div>

      {/* Match Stats Summary */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/20">
        <h3 className="text-white mb-4">Today's Highlights</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-slate-400 text-sm">Vibe Rating</div>
            <div className="text-white text-xl flex items-center gap-1">
              {vibeRating} <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-sm">Photos Added</div>
            <div className="text-white text-xl">{selectedPhotos}</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm">Vibes</div>
            <div className="text-white text-xl">{vibes.length}</div>
          </div>
          <div>
            <div className="text-slate-400 text-sm">Gratitude</div>
            <div className="text-white text-xl">{gratitudeMessage ? '✓' : '–'}</div>
          </div>
        </div>
      </div>

      {/* Next Meetup */}
      <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          Play Again?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          We'll notify the group when someone creates the next match
        </p>
        <Button
          onClick={() => setNextMeetupInterest(!nextMeetupInterest)}
          className={`w-full ${
            nextMeetupInterest
              ? 'bg-gradient-to-r from-green-600 to-emerald-600'
              : 'bg-slate-700 hover:bg-slate-600'
          } text-white`}
        >
          {nextMeetupInterest ? '✓ I\'m Interested!' : 'Maybe Next Time'}
        </Button>
      </div>

      <Button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
      >
        Done
      </Button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-2xl mb-2">Post-Match Ritual</h1>
          <p className="text-slate-400">Celebrate and reflect on your game</p>
        </motion.div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Content */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-800">
          <AnimatePresence mode="wait">
            {currentStep === 'vibe' && renderVibeRating()}
            {currentStep === 'memories' && renderMemories()}
            {currentStep === 'gratitude' && renderGratitude()}
            {currentStep === 'next' && renderNextMeetup()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
