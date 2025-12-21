import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MapPin, Clock, Users, Trophy, TrendingUp, Search, Filter,
  Star, Heart, Share2, MessageCircle, ChevronRight, Check, X, Tag
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { communityEventsService, CommunityEvent } from '../services/communityEventsService';

interface CommunityEventsProps {
  category: 'sports' | 'events' | 'parties' | 'gaming';
  onNavigate: (page: string) => void;
}

export function CommunityEvents({ category, onNavigate }: CommunityEventsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const categoryEvents = communityEventsService.getEventsByCategory(category);
  const filteredEvents = categoryEvents.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = filterLevel === 'all' || event.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const stats = communityEventsService.getEventStats(category);

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      toast.success('Registration cancelled');
    } else {
      const result = communityEventsService.registerEvent(eventId, 'user_001');
      if (result.success) {
        setRegisteredEvents([...registeredEvents, eventId]);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-700 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => onNavigate(category === 'sports' ? 'dashboard' : `${category}-dashboard`)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{getCategoryIcon()}</span>
                <h1 className="text-2xl font-bold text-slate-900">Community Events</h1>
              </div>
              <p className="text-sm text-slate-600">Discover and join amazing {getCategoryName()} events</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
              <p className="text-xs text-slate-600">Total Events</p>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <p className="text-xs text-slate-600">Upcoming</p>
              <p className="text-2xl font-bold text-green-600">{stats.upcoming}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
              <p className="text-xs text-slate-600">Participants</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalParticipants.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
              <p className="text-xs text-slate-600">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-600">{stats.averageRating.toFixed(1)} ⭐</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {category === 'sports' && (
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 hover:border-slate-400 transition-colors"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence>
          {selectedEvent ? (
            // Event Detail View
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="sticky top-4 right-4 float-right p-2 bg-slate-100 hover:bg-slate-200 rounded-lg z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Event Image/Header */}
                <div className={`h-48 bg-gradient-to-r ${getCategoryColor()} flex items-center justify-center`}>
                  <span className="text-9xl">{selectedEvent.image}</span>
                </div>

                <div className="p-6 space-y-6">
                  {/* Title and Basic Info */}
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">{selectedEvent.title}</h2>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {selectedEvent.tags.map(tag => (
                        <Badge key={tag} className="bg-slate-100 text-slate-700 border-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-slate-600 mb-4">{selectedEvent.description}</p>

                    {/* Key Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-600">Date & Time</p>
                          <p className="text-slate-900 font-semibold">{selectedEvent.date} at {selectedEvent.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-600">Location</p>
                          <p className="text-slate-900 font-semibold">{selectedEvent.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-600">Participants</p>
                          <p className="text-slate-900 font-semibold">{selectedEvent.participants}/{selectedEvent.maxParticipants}</p>
                        </div>
                      </div>
                      {selectedEvent.prize && (
                        <div className="flex items-start gap-3">
                          <Trophy className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-slate-600">Prize</p>
                            <p className="text-slate-900 font-semibold">{selectedEvent.prize}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Level Badge */}
                  {category === 'sports' && (
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Skill Level</p>
                      <Badge className={getLevelColor(selectedEvent.level)}>
                        {selectedEvent.level.charAt(0).toUpperCase() + selectedEvent.level.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {/* Organizer */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">Organized By</p>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedEvent.organizer.avatar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{selectedEvent.organizer.name}</p>
                          {selectedEvent.organizer.verified && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        {selectedEvent.rating && (
                          <p className="text-sm text-slate-600">
                            ⭐ {selectedEvent.rating} ({selectedEvent.reviews} reviews)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Fee Info */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Registration Fee</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {selectedEvent.registrationFee === 0 ? 'FREE' : `₹${selectedEvent.registrationFee}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 mb-2">Spots Available</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {selectedEvent.maxParticipants - selectedEvent.participants}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleRegister(selectedEvent.id)}
                      className={`flex-1 text-lg py-6 font-semibold transition-all ${
                        registeredEvents.includes(selectedEvent.id)
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : `bg-gradient-to-r ${getCategoryColor()} hover:shadow-lg text-white`
                      }`}
                    >
                      {registeredEvents.includes(selectedEvent.id) ? 'Cancel Registration' : 'Register Now'}
                    </Button>
                    <Button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900">
                      Share Event
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Events Grid
            <div>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">No events found</p>
                  <Button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedEvent(event)}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-200 hover:border-slate-400 group"
                    >
                      {/* Image */}
                      <div className={`h-40 bg-gradient-to-r ${getCategoryColor()} flex items-center justify-center overflow-hidden`}>
                        <span className="text-7xl group-hover:scale-110 transition-transform">{event.image}</span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-slate-900 line-clamp-2 flex-1">{event.title}</h3>
                          {registeredEvents.includes(event.id) && (
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                          )}
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{event.description}</p>

                        {/* Tags */}
                        <div className="flex gap-1 flex-wrap mb-3">
                          {event.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} className="text-xs bg-slate-100 text-slate-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-3 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Users className="w-4 h-4" />
                            <span>{event.participants}/{event.maxParticipants} joined</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                          <div>
                            {event.registrationFee === 0 ? (
                              <p className="text-lg font-bold text-green-600">FREE</p>
                            ) : (
                              <p className="text-lg font-bold text-slate-900">₹{event.registrationFee}</p>
                            )}
                          </div>
                          {event.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-semibold text-slate-900">{event.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
