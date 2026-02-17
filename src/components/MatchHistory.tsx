import { ArrowLeft, Calendar, MapPin, Trophy, Clock, Users, DollarSign, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { matchService } from '../services/backendService';

interface MatchHistoryProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  userId?: string;
}

type Category = 'sports' | 'events' | 'gaming';
type FilterType = 'all' | 'upcoming' | 'completed' | 'cancelled';

interface HistoryItem {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentType: 'direct' | 'split';
  amount: number;
  participants?: number;
  maxParticipants?: number;
  sport?: string;
  eventType?: string;
  gameType?: string;
}

export function MatchHistory({ onNavigate, onBack, userId }: MatchHistoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = async () => {
      setIsLoading(true);
      const eventsBookings = JSON.parse(localStorage.getItem('eventsBookings') || '[]');
      const gamingMatches = JSON.parse(localStorage.getItem('gamingMatches') || '[]');

      const sportsMatches = userId
        ? await matchService.getUserMatches(userId, 'sports')
        : JSON.parse(localStorage.getItem('sportsMatches') || '[]');

      const allItems: HistoryItem[] = [
        ...sportsMatches.map((match: any) => ({
          id: match.id,
          title: match.title,
          category: 'sports' as Category,
          date: match.date,
          time: match.time,
          location: match.turf_name || match.turfName || match.location,
          status: match.status || 'upcoming',
          paymentType: match.payment_option === 'Direct Payment' || match.paymentOption === 'Direct Payment' ? 'direct' : 'split',
          amount: match.amount || match.turf_cost || match.turfCost || 0,
          sport: match.sport,
          participants: match.current_players || match.currentPlayers || 1,
          maxParticipants: match.max_players || match.maxPlayers || 10
        })),
        ...eventsBookings.map((event: any) => ({
          id: event.id,
          title: event.title || event.eventName,
          category: 'events' as Category,
          date: event.date,
          time: event.time,
          location: event.venue || event.location,
          status: event.status || 'upcoming',
          paymentType: event.paymentOption === 'Direct Payment' ? 'direct' : 'split',
          amount: event.amount || event.ticketPrice || 0,
          eventType: event.type,
          participants: event.attendees || 1
        })),
        ...gamingMatches.map((game: any) => ({
          id: game.id,
          title: game.title || game.gameName,
          category: 'gaming' as Category,
          date: game.date,
          time: game.time,
          location: game.venue || game.location,
          status: game.status || 'upcoming',
          paymentType: game.paymentOption === 'Direct Payment' ? 'direct' : 'split',
          amount: game.amount || 0,
          gameType: game.gameType,
          participants: game.players || 1,
          maxParticipants: game.maxPlayers
        }))
      ];

      // Sort by date (newest first)
      allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setHistoryItems(allItems);
      setIsLoading(false);
    };

    loadHistory();
  }, [userId]);

  const filteredItems = historyItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'sports':
        return 'from-emerald-500 to-teal-500';
      case 'events':
        return 'from-purple-500 to-pink-500';
      case 'gaming':
        return 'from-blue-500 to-cyan-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-slate-300" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                My Matches
              </h1>
              <p className="text-sm text-slate-400">Track every match you've played</p>
            </div>
          </div>
          <Trophy className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'sports', 'events', 'gaming'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Category | 'all')}
              className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { value: 'all', label: 'All', icon: Filter },
            { value: 'upcoming', label: 'Upcoming', icon: Clock },
            { value: 'completed', label: 'Completed', icon: CheckCircle },
            { value: 'cancelled', label: 'Cancelled', icon: XCircle }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSelectedFilter(value as FilterType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                selectedFilter === value
                  ? 'bg-slate-700 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-4">
            <Clock className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-blue-400">
              {historyItems.filter(i => i.status === 'upcoming').length}
            </p>
            <p className="text-xs text-slate-400">Upcoming</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-4">
            <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-2xl font-bold text-green-400">
              {historyItems.filter(i => i.status === 'completed').length}
            </p>
            <p className="text-xs text-slate-400">Completed</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-4">
            <DollarSign className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-purple-400">
              ₹{historyItems.reduce((sum, item) => sum + item.amount, 0)}
            </p>
            <p className="text-xs text-slate-400">Total Spent</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent"></div>
              <p className="text-slate-400 text-lg mt-4">Loading your matches...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No matches found</p>
              <p className="text-slate-500 text-sm mt-2">
                Start booking matches to build your history!
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-1 w-1 rounded-full bg-gradient-to-r ${getCategoryColor(item.category)}`} />
                      <h3 className="font-semibold text-slate-100">{item.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[120px]">{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusIcon(item.status)}
                    <span className={`text-xs px-2 py-1 rounded-lg border font-medium ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-emerald-400">₹{item.amount}</span>
                      <span className="text-xs">({item.paymentType === 'direct' ? 'Direct' : 'Split'})</span>
                    </div>
                    {item.participants && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{item.participants}{item.maxParticipants ? `/${item.maxParticipants}` : ''}</span>
                      </div>
                    )}
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(item.category)} bg-opacity-20 text-white font-medium`}>
                    {item.sport || item.eventType || item.gameType || item.category}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
