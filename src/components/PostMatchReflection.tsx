import { useState } from 'react';
import { Heart, ArrowLeft, Star, Sparkles, Send, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface PostMatchReflectionProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'availability', turfId?: string, matchId?: string) => void;
}

export function PostMatchReflection({ onNavigate }: PostMatchReflectionProps) {
  const [gratitude, setGratitude] = useState('');
  const [highlight, setHighlight] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const players = [
    { id: '1', name: 'Sarah', initial: 'S', color: 'from-cyan-400 to-cyan-500' },
    { id: '2', name: 'Mike', initial: 'M', color: 'from-purple-400 to-purple-500' },
    { id: '3', name: 'Rahul', initial: 'R', color: 'from-orange-400 to-orange-500' },
    { id: '4', name: 'Priya', initial: 'P', color: 'from-pink-400 to-pink-500' },
  ];

  const togglePlayer = (playerId: string) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl p-12 shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h2 className="mb-3">Reflection Shared! ✨</h2>
            <p className="text-slate-600 mb-6">
              Your gratitude has been shared with the community. These moments of appreciation strengthen our bonds.
            </p>
            <div className="text-sm text-slate-500">
              Returning to dashboard...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-3">Post-Match Reflection</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Take a moment to celebrate the match, express gratitude, and strengthen the emotional bonds with your teammates.
          </p>
        </div>

        {/* Match Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h2>Saturday Football Match</h2>
              <p className="text-slate-600">Sky Sports Arena • Nov 9, 2024</p>
            </div>
            <Badge className="ml-auto bg-emerald-100 text-emerald-700">Just Completed</Badge>
          </div>
        </div>

        {/* Reflection Form */}
        <div className="space-y-6">
          {/* Who made a difference? */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h3>Who made a difference today?</h3>
            </div>
            <p className="text-slate-600 mb-4">
              Select teammates who made your experience special
            </p>
            <div className="flex flex-wrap gap-3">
              {players.map(player => (
                <button
                  key={player.id}
                  onClick={() => togglePlayer(player.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedPlayers.includes(player.id)
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-white text-sm`}>
                    {player.initial}
                  </div>
                  <span>{player.name}</span>
                  {selectedPlayers.includes(player.id) && (
                    <Heart className="w-4 h-4 text-cyan-600 fill-cyan-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Gratitude */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-purple-500" />
              <h3>Express Gratitude</h3>
            </div>
            <p className="text-slate-600 mb-4">
              What are you grateful for from today's match?
            </p>
            <Textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="I'm grateful for... (e.g., 'Sarah's encouraging words when I missed that shot really lifted my spirits')"
              className="min-h-32"
            />
          </div>

          {/* Highlight */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h3>Your Highlight Moment</h3>
            </div>
            <p className="text-slate-600 mb-4">
              What was the most memorable moment for you?
            </p>
            <Textarea
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="Share your favorite moment from today... (e.g., 'When we all laughed after that unexpected goal!')"
              className="min-h-32"
            />
          </div>

          {/* Emotional Check-in */}
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200 p-6">
            <h3 className="mb-4">How do you feel after today's match?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { emoji: '😊', label: 'Happy', color: 'emerald' },
                { emoji: '💪', label: 'Energized', color: 'cyan' },
                { emoji: '🤝', label: 'Connected', color: 'purple' },
                { emoji: '✨', label: 'Inspired', color: 'orange' },
              ].map((feeling) => (
                <button
                  key={feeling.label}
                  className={`p-4 bg-white rounded-lg border-2 border-${feeling.color}-200 hover:border-${feeling.color}-400 transition-all text-center`}
                >
                  <div className="text-3xl mb-2">{feeling.emoji}</div>
                  <div className="text-sm text-slate-700">{feeling.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('dashboard')}
            >
              Skip for Now
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!gratitude && !highlight && selectedPlayers.length === 0}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2"
            >
              <Send className="w-4 h-4" />
              Share Reflection
            </Button>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="mb-3">Why Reflections Matter</h3>
          <p className="text-slate-600">
            Post-match reflections aren't just about looking back — they're about building deeper connections. 
            When you express gratitude and share meaningful moments, you strengthen trust, create emotional safety, 
            and help everyone feel seen and valued in the community. These small rituals turn games into lasting friendships.
          </p>
        </div>
      </div>
    </div>
  );
}