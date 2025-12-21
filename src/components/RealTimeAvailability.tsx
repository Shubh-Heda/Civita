import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './AnimatedBackground';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card } from './ui/card';
import { 
  Users, 
  MapPin, 
  Clock, 
  Zap, 
  Calendar,
  ArrowLeft,
  Filter,
  Star,
  Flame,
  Shield,
  MessageCircle,
  UserPlus,
  Activity,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Player {
  id: string;
  name: string;
  avatar: string;
  status: 'free-now' | 'playing-today' | 'nearby';
  distance: number; // in km
  trustScore: number;
  friendshipStreak: number;
  isNewbie: boolean;
  sports: string[];
  availableUntil?: string;
  preferredTime?: string;
  lastActive: string;
  matchesPlayed: number;
  tags: string[];
}

interface RealTimeAvailabilityProps {
  onNavigate: (page: 'dashboard' | 'events-dashboard' | 'party-dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'help' | 'availability') => void;
  category?: 'sports' | 'events' | 'parties';
}

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    status: 'free-now',
    distance: 0.8,
    trustScore: 95,
    friendshipStreak: 12,
    isNewbie: false,
    sports: ['Football', 'Cricket'],
    availableUntil: '8:00 PM',
    lastActive: 'Active now',
    matchesPlayed: 47,
    tags: ['High trust zone', 'Regular player']
  },
  {
    id: '2',
    name: 'Priya Menon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    status: 'free-now',
    distance: 1.2,
    trustScore: 88,
    friendshipStreak: 8,
    isNewbie: false,
    sports: ['Badminton', 'Football'],
    availableUntil: '7:00 PM',
    lastActive: 'Active now',
    matchesPlayed: 32,
    tags: ['Competitive', 'Team player']
  },
  {
    id: '3',
    name: 'Arjun Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    status: 'free-now',
    distance: 0.5,
    trustScore: 92,
    friendshipStreak: 5,
    isNewbie: true,
    sports: ['Cricket'],
    availableUntil: '9:00 PM',
    lastActive: 'Active 2m ago',
    matchesPlayed: 8,
    tags: ['Newbie-friendly', 'Learning']
  },
  {
    id: '4',
    name: 'Sneha Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    status: 'playing-today',
    distance: 2.1,
    trustScore: 97,
    friendshipStreak: 20,
    isNewbie: false,
    sports: ['Football', 'Badminton', 'Tennis'],
    preferredTime: '6:00 PM - 8:00 PM',
    lastActive: 'Active 5m ago',
    matchesPlayed: 65,
    tags: ['High trust zone', 'Versatile']
  },
  {
    id: '5',
    name: 'Vikram Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    status: 'playing-today',
    distance: 1.5,
    trustScore: 85,
    friendshipStreak: 3,
    isNewbie: false,
    sports: ['Cricket', 'Football'],
    preferredTime: '7:00 PM - 9:00 PM',
    lastActive: 'Active 10m ago',
    matchesPlayed: 28,
    tags: ['Evening player', 'Casual']
  },
  {
    id: '6',
    name: 'Aisha Khan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
    status: 'nearby',
    distance: 0.3,
    trustScore: 90,
    friendshipStreak: 15,
    isNewbie: false,
    sports: ['Badminton', 'Table Tennis'],
    lastActive: 'Active 30m ago',
    matchesPlayed: 42,
    tags: ['High trust zone', 'Nearby']
  },
  {
    id: '7',
    name: 'Dev Kapoor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
    status: 'nearby',
    distance: 0.6,
    trustScore: 93,
    friendshipStreak: 10,
    isNewbie: false,
    sports: ['Football', 'Cricket', 'Badminton'],
    lastActive: 'Active 1h ago',
    matchesPlayed: 38,
    tags: ['Regular player', 'Multi-sport']
  },
  {
    id: '8',
    name: 'Maya Reddy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    status: 'free-now',
    distance: 1.8,
    trustScore: 89,
    friendshipStreak: 6,
    isNewbie: true,
    sports: ['Football'],
    availableUntil: '6:30 PM',
    lastActive: 'Active now',
    matchesPlayed: 12,
    tags: ['Newbie-friendly', 'Enthusiastic']
  },
];

export function RealTimeAvailability({ onNavigate, category = 'sports' }: RealTimeAvailabilityProps) {
  const [activeTab, setActiveTab] = useState<'free-now' | 'playing-today' | 'nearby'>('free-now');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  const filterPlayers = (status: string) => {
    return players.filter(p => p.status === status && (selectedSport === 'all' || p.sports.includes(selectedSport)));
  };

  const freeNowPlayers = filterPlayers('free-now');
  const playingTodayPlayers = filterPlayers('playing-today');
  const nearbyPlayers = filterPlayers('nearby');

  const handleConnectPlayer = (player: Player) => {
    toast.success(`🎉 Connected with ${player.name}!`, {
      description: 'You can now chat and plan matches together',
      duration: 3000,
    });
  };

  const handleQuickMatch = (player: Player) => {
    toast.success(`⚡ Quick Match Request Sent!`, {
      description: `${player.name} will be notified. Get ready to play!`,
      duration: 3000,
    });
  };

  // Get the correct dashboard to navigate back to based on category
  const getDashboardPage = () => {
    switch (category) {
      case 'events':
        return 'events-dashboard';
      case 'parties':
        return 'party-dashboard';
      default:
        return 'dashboard';
    }
  };

  const sports = ['all', 'Football', 'Cricket', 'Badminton', 'Tennis', 'Table Tennis'];

  return (
    <AnimatedBackground variant="community">
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate(getDashboardPage())}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="flex items-center gap-2 mb-1">
                  <Activity className="w-6 h-6" />
                  Live Availability
                </h1>
                <p className="text-sm text-white/80">Find players ready to play right now</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-400 rounded-full"
              />
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-2xl">{freeNowPlayers.length}</span>
                </div>
                <p className="text-xs text-white/70">Free Now</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-300" />
                  <span className="text-2xl">{playingTodayPlayers.length}</span>
                </div>
                <p className="text-xs text-white/70">Today</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-green-300" />
                  <span className="text-2xl">{nearbyPlayers.length}</span>
                </div>
                <p className="text-xs text-white/70">Nearby</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Sport Filters */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Filter by sport</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sports.map(sport => (
                <Button
                  key={sport}
                  variant={selectedSport === sport ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSport(sport)}
                  className="capitalize"
                >
                  {sport}
                </Button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="free-now" className="gap-2">
                <Zap className="w-4 h-4" />
                Free Now
              </TabsTrigger>
              <TabsTrigger value="playing-today" className="gap-2">
                <Calendar className="w-4 h-4" />
                Playing Today
              </TabsTrigger>
              <TabsTrigger value="nearby" className="gap-2">
                <MapPin className="w-4 h-4" />
                Nearby
              </TabsTrigger>
            </TabsList>

            {/* Free Now Tab */}
            <TabsContent value="free-now" className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <Clock className="w-4 h-4" />
                <span>Players available to play right now</span>
              </div>
              <AnimatePresence mode="popLayout">
                {freeNowPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <img src={player.avatar} alt={player.name} />
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="flex items-center gap-2">
                                {player.name}
                                {player.isNewbie && (
                                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
                                    New Player
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {player.distance}km away
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Until {player.availableUntil}
                                </span>
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <div className="flex items-center gap-1 text-amber-600 mb-1">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{player.trustScore}</span>
                              </div>
                              {player.friendshipStreak > 0 && (
                                <div className="flex items-center gap-1 text-orange-600">
                                  <Flame className="w-4 h-4 fill-current" />
                                  <span>{player.friendshipStreak}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {player.sports.map(sport => (
                              <Badge key={sport} variant="secondary" className="text-xs">
                                {sport}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {player.tags.map(tag => (
                              <span key={tag} className="text-xs text-slate-500 flex items-center gap-1">
                                {tag === 'High trust zone' && <Shield className="w-3 h-3 text-green-600" />}
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                            <Target className="w-3 h-3" />
                            <span>{player.matchesPlayed} matches played</span>
                            <span>•</span>
                            <span>{player.lastActive}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleQuickMatch(player)}
                              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 gap-2"
                            >
                              <Zap className="w-4 h-4" />
                              Quick Match
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleConnectPlayer(player)}
                              className="gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Chat
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                            >
                              <UserPlus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {freeNowPlayers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No players available right now</p>
                  <p className="text-sm text-slate-400 mt-1">Check back soon or try a different sport</p>
                </div>
              )}
            </TabsContent>

            {/* Playing Today Tab */}
            <TabsContent value="playing-today" className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <Calendar className="w-4 h-4" />
                <span>Players looking to play later today</span>
              </div>
              <AnimatePresence mode="popLayout">
                {playingTodayPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <img src={player.avatar} alt={player.name} />
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="flex items-center gap-2">
                                {player.name}
                                {player.isNewbie && (
                                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
                                    New Player
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {player.distance}km away
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {player.preferredTime}
                                </span>
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <div className="flex items-center gap-1 text-amber-600 mb-1">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{player.trustScore}</span>
                              </div>
                              {player.friendshipStreak > 0 && (
                                <div className="flex items-center gap-1 text-orange-600">
                                  <Flame className="w-4 h-4 fill-current" />
                                  <span>{player.friendshipStreak}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {player.sports.map(sport => (
                              <Badge key={sport} variant="secondary" className="text-xs">
                                {sport}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {player.tags.map(tag => (
                              <span key={tag} className="text-xs text-slate-500 flex items-center gap-1">
                                {tag === 'High trust zone' && <Shield className="w-3 h-3 text-green-600" />}
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                            <Target className="w-3 h-3" />
                            <span>{player.matchesPlayed} matches played</span>
                            <span>•</span>
                            <span>{player.lastActive}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleConnectPlayer(player)}
                              className="flex-1 gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Connect & Plan
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                            >
                              <UserPlus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {playingTodayPlayers.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No players scheduled for today</p>
                  <p className="text-sm text-slate-400 mt-1">Be the first to plan a match!</p>
                </div>
              )}
            </TabsContent>

            {/* Nearby Tab */}
            <TabsContent value="nearby" className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Players in your area (sorted by distance)</span>
              </div>
              <AnimatePresence mode="popLayout">
                {nearbyPlayers.sort((a, b) => a.distance - b.distance).map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex gap-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <img src={player.avatar} alt={player.name} />
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <MapPin className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="flex items-center gap-2">
                                {player.name}
                                {player.distance < 1 && (
                                  <Badge variant="outline" className="text-xs border-green-300 text-green-600">
                                    Very Close
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {player.distance}km away
                                </span>
                                <span>{player.lastActive}</span>
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <div className="flex items-center gap-1 text-amber-600 mb-1">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{player.trustScore}</span>
                              </div>
                              {player.friendshipStreak > 0 && (
                                <div className="flex items-center gap-1 text-orange-600">
                                  <Flame className="w-4 h-4 fill-current" />
                                  <span>{player.friendshipStreak}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {player.sports.map(sport => (
                              <Badge key={sport} variant="secondary" className="text-xs">
                                {sport}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {player.tags.map(tag => (
                              <span key={tag} className="text-xs text-slate-500 flex items-center gap-1">
                                {tag === 'High trust zone' && <Shield className="w-3 h-3 text-green-600" />}
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                            <Target className="w-3 h-3" />
                            <span>{player.matchesPlayed} matches played</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleConnectPlayer(player)}
                              className="flex-1 gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Connect
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuickMatch(player)}
                              className="gap-2"
                            >
                              <Zap className="w-4 h-4" />
                              Invite
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                            >
                              <UserPlus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {nearbyPlayers.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No nearby players found</p>
                  <p className="text-sm text-slate-400 mt-1">Expand your search radius or check back later</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Quick Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 right-4 z-40"
          >
            <Button
              size="lg"
              onClick={() => onNavigate('create-match')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl gap-2 rounded-full px-6"
            >
              <TrendingUp className="w-5 h-5" />
              Create Instant Match
            </Button>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
}