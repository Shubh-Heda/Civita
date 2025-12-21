import { ArrowLeft, MapPin, Users, Calendar, Clock, Heart, Shield, Star, Search, Filter, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface MatchFinderProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'availability', turfId?: string, matchId?: string) => void;
  onMatchJoin: (match: {
    id: string;
    title: string;
    turfName: string;
    date: string;
    time: string;
    sport: string;
    status: 'upcoming' | 'completed';
    visibility: string;
    paymentOption: string;
    amount?: number;
    location?: string;
  }) => void;
}

export function MatchFinder({ onNavigate, onMatchJoin }: MatchFinderProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <h1>Find Your Match</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro */}
        <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl border border-cyan-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-cyan-600 flex-shrink-0" />
            <div>
              <h2 className="text-cyan-900 mb-2">Connection-First Match Finding</h2>
              <p className="text-cyan-800">
                We don't just match you by sport and time — we match you with people who share your values, 
                energy, and commitment to building genuine friendships through play.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input 
                placeholder="Search by sport, location, or vibe..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">All Sports</Badge>
            <Badge variant="outline">Football</Badge>
            <Badge variant="outline">Cricket</Badge>
            <Badge variant="outline">Basketball</Badge>
            <Badge variant="outline">Beginner Friendly</Badge>
            <Badge variant="outline">High Energy</Badge>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4">Matches Looking for Players</h2>
            <div className="space-y-4">
              <MatchCard
                image="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
                sport="Football"
                title="Sunday Morning Football - Welcoming New Players!"
                turf="Sky Sports Arena, Satellite"
                date="Tomorrow"
                time="8:00 AM"
                players={6}
                totalPlayers={10}
                organizer="Sarah M."
                trustScore={4.8}
                vibe={['Friendly', 'Inclusive', 'Energetic']}
                description="We're a group that plays every Sunday and we love welcoming new faces! Beginners encouraged - we focus on fun and friendship over competition."
                onMatchJoin={onMatchJoin}
              />

              <MatchCard
                image="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop"
                sport="Cricket"
                title="Evening Cricket Session - Building Community"
                turf="Victory Cricket Ground, Maninagar"
                date="Nov 15"
                time="6:00 PM"
                players={8}
                totalPlayers={12}
                organizer="Rahul K."
                trustScore={4.9}
                vibe={['Chill', 'Social', 'Learning']}
                description="Casual cricket with time for post-match chai and conversation. We're all about making connections and improving together."
                onMatchJoin={onMatchJoin}
              />

              <MatchCard
                image="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop"
                sport="Basketball"
                title="3v3 Basketball + Community Hangout"
                turf="Hoops Basketball Court, Vastrapur"
                date="Nov 12"
                time="7:00 PM"
                players={4}
                totalPlayers={6}
                organizer="Mike C."
                trustScore={4.7}
                vibe={['High Energy', 'Fun', 'Supportive']}
                description="Quick games followed by group hangout. We always do a gratitude circle after - it's become our favorite ritual!"
                onMatchJoin={onMatchJoin}
              />
            </div>
          </div>

          {/* Create Your Own */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-8 text-center">
            <Plus className="w-12 h-12 mx-auto mb-4 text-white/90" />
            <h2 className="mb-3 text-white">Don't See Your Perfect Match?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Create your own match and build a community around your values. Set the vibe, welcome others, 
              and start your own friendship journey.
            </p>
            <Button 
              onClick={() => onNavigate('create-match')}
              size="lg"
              className="bg-white text-purple-600 hover:bg-slate-50"
            >
              Create a Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchCard({
  image,
  sport,
  title,
  turf,
  date,
  time,
  players,
  totalPlayers,
  organizer,
  trustScore,
  vibe,
  description,
  onMatchJoin,
}: {
  image: string;
  sport: string;
  title: string;
  turf: string;
  date: string;
  time: string;
  players: number;
  totalPlayers: number;
  organizer: string;
  trustScore: number;
  vibe: string[];
  description: string;
  onMatchJoin: (match: {
    id: string;
    title: string;
    turfName: string;
    date: string;
    time: string;
    sport: string;
    status: 'upcoming' | 'completed';
    visibility: string;
    paymentOption: string;
    amount?: number;
    location?: string;
  }) => void;
}) {
  const handleJoinMatch = () => {
    // Create match object and add to user's matches
    const match = {
      id: 'match-' + Math.random().toString(36).substr(2, 9),
      title: title,
      turfName: turf.split(',')[0],
      date: date,
      time: time,
      sport: sport,
      status: 'upcoming' as 'upcoming' | 'completed',
      visibility: 'community',
      paymentOption: 'split',
      amount: 150,
      location: turf.split(',')[1]?.trim() || '',
    };
    
    onMatchJoin(match);
    
    toast.success(`🎉 You've joined "${title}"!`, {
      description: `${organizer} and the team will be notified. Check your group chat for details!`,
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        <div className="md:w-64 relative flex-shrink-0">
          <ImageWithFallback 
            src={image}
            alt={title}
            className="w-full h-48 md:h-full object-cover"
          />
          <Badge className="absolute top-3 right-3 bg-white text-slate-700">
            {sport}
          </Badge>
        </div>

        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="mb-2">{title}</h3>
              <div className="flex items-center gap-1 text-slate-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{turf}</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {vibe.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-cyan-50 text-cyan-700">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
            <div>
              <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <div>{date}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </div>
              <div>{time}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                <Users className="w-4 h-4" />
                <span>Players</span>
              </div>
              <div>{players}/{totalPlayers}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                <Shield className="w-4 h-4" />
                <span>Trust</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{trustScore}</span>
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm">
                {organizer.charAt(0)}
              </div>
              <div>
                <div className="text-sm text-slate-600">Organized by</div>
                <div className="text-sm">{organizer}</div>
              </div>
            </div>
            <Button 
              onClick={handleJoinMatch}
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white"
            >
              Join Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}