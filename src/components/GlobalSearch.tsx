import { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SearchResult {
  id: string;
  type: 'match' | 'turf' | 'player' | 'event' | 'party';
  title: string;
  subtitle?: string;
  location?: string;
  badge?: string;
  metadata?: string;
}

interface GlobalSearchProps {
  onNavigate?: (page: string, id?: string) => void;
  category?: 'sports' | 'events' | 'parties';
}

export function GlobalSearch({ onNavigate, category = 'sports' }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search data - in real app, this would come from services
  const mockData: SearchResult[] = [
    // Sports
    { id: '1', type: 'match', title: 'Saturday Football', subtitle: 'Sky Sports Arena', location: 'Bandra, Mumbai', badge: '5/10 players', metadata: 'Today 6:00 PM' },
    { id: '2', type: 'match', title: 'Sunday Cricket', subtitle: 'Champions Ground', location: 'Andheri, Mumbai', badge: '8/11 players', metadata: 'Tomorrow 8:00 AM' },
    { id: '3', type: 'turf', title: 'Sky Sports Arena', subtitle: 'Premium Football Turf', location: 'Bandra, Mumbai', badge: 'Coaching Available', metadata: '₹2000/hour' },
    { id: '4', type: 'turf', title: 'Champions Ground', subtitle: 'Cricket & Football', location: 'Andheri, Mumbai', badge: 'Popular', metadata: '₹1500/hour' },
    { id: '5', type: 'player', title: 'Rahul Sharma', subtitle: 'Forward • Trust Score 92', location: 'Bandra, Mumbai', badge: 'Active Now', metadata: '45 matches' },
    { id: '6', type: 'player', title: 'Priya Desai', subtitle: 'Midfielder • Trust Score 88', location: 'Juhu, Mumbai', badge: 'Available', metadata: '32 matches' },
    
    // Events
    { id: '7', type: 'event', title: 'Jazz Night at Blue Frog', subtitle: 'Live Music Performance', location: 'Lower Parel, Mumbai', badge: '50 attending', metadata: 'Fri 8:00 PM' },
    { id: '8', type: 'event', title: 'Art Exhibition Opening', subtitle: 'Contemporary Indian Art', location: 'Kala Ghoda, Mumbai', badge: 'Free Entry', metadata: 'Sat 6:00 PM' },
    
    // Parties
    { id: '9', type: 'party', title: 'Saturday Night Social', subtitle: 'Rooftop Party', location: 'Worli, Mumbai', badge: '80 going', metadata: 'Tomorrow 9:00 PM' },
    { id: '10', type: 'party', title: 'Beach Bonfire Meetup', subtitle: 'Sunset Beach Party', location: 'Juhu Beach', badge: '45 interested', metadata: 'Sun 6:00 PM' },
  ];

  // Filter by category
  const categoryFiltered = mockData.filter(item => {
    if (category === 'sports') return ['match', 'turf', 'player'].includes(item.type);
    if (category === 'events') return item.type === 'event';
    if (category === 'parties') return item.type === 'party';
    return true;
  });

  // Search functionality
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = categoryFiltered.filter(item =>
      item.title.toLowerCase().includes(searchQuery) ||
      item.subtitle?.toLowerCase().includes(searchQuery) ||
      item.location?.toLowerCase().includes(searchQuery)
    );

    setResults(filtered);
  }, [query, category]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    
    if (result.type === 'turf' && onNavigate) {
      onNavigate('turf-detail', result.id);
    } else if (result.type === 'match' && onNavigate) {
      onNavigate('chat', result.id);
    }
    // Add more navigation logic as needed
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'match': return Calendar;
      case 'turf': return MapPin;
      case 'player': return Users;
      case 'event': return TrendingUp;
      case 'party': return Users;
      default: return Search;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'match': return 'bg-cyan-100 text-cyan-700';
      case 'turf': return 'bg-emerald-100 text-emerald-700';
      case 'player': return 'bg-purple-100 text-purple-700';
      case 'event': return 'bg-orange-100 text-orange-700';
      case 'party': return 'bg-pink-100 text-pink-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search matches, turfs, players... (⌘K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 bg-white border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            // Recent / Suggested
            <div className="p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Quick Actions</div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm text-slate-700">Find Matches Near Me</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-slate-700">Browse All Turfs</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-3 transition-colors">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-slate-700">Discover New Players</span>
                </button>
              </div>
            </div>
          ) : results.length > 0 ? (
            // Search Results
            <div className="p-2">
              <div className="text-xs text-slate-500 uppercase tracking-wide px-3 py-2">
                {results.length} Result{results.length !== 1 ? 's' : ''}
              </div>
              <div className="space-y-1">
                {results.map((result) => {
                  const Icon = getIcon(result.type);
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${getTypeColor(result.type)} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-slate-900 group-hover:text-cyan-600 transition-colors truncate">
                              {result.title}
                            </span>
                            {result.badge && (
                              <Badge className="bg-slate-100 text-slate-700 text-xs border-0">
                                {result.badge}
                              </Badge>
                            )}
                          </div>
                          
                          {result.subtitle && (
                            <div className="text-xs text-slate-600 mb-1">{result.subtitle}</div>
                          )}
                          
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            {result.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{result.location}</span>
                              </div>
                            )}
                            {result.metadata && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{result.metadata}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // No Results
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 mb-2">No results found for "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for matches, turfs, or players</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
