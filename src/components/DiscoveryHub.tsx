import { useState, useEffect } from 'react';
import { matchNotificationService } from '../services/matchNotificationService';
import { realGroupChatService } from '../services/groupChatServiceReal';
import { firebaseAuth } from '../services/firebaseService';
import { toast } from 'sonner';
import './DiscoveryHub.css';

interface Match {
  matchId: string;
  title: string;
  organizer: string;
  sport: string;
  turfName: string;
  location: string;
  date: string;
  time: string;
  minPlayers: number;
  currentPlayers: number;
  visibility: 'community' | 'nearby' | 'private';
  createdAt?: string;
  groupChatId?: string; // Link to actual group chat
}

interface DiscoveryHubProps {
  onNavigate?: (page: any, turfId?: string, matchId?: string, groupChatId?: string) => void;
}

export function DiscoveryHub({ onNavigate }: DiscoveryHubProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sports, setSports] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Load available matches
  useEffect(() => {
    loadMatches();
    const interval = setInterval(loadMatches, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMatches = () => {
    const allMatches = matchNotificationService.getDiscoverableMatches();
    const availableSports = matchNotificationService.getAvailableSports();
    const availableLocations = matchNotificationService.getAvailableLocations();

    setMatches(allMatches);
    setSports(availableSports);
    setLocations(availableLocations);
    setLoading(false);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...matches];

    // Sport filter
    if (selectedSport !== 'all') {
      filtered = filtered.filter(m => m.sport === selectedSport);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(m => m.location === selectedLocation);
    }

    // Date filter
    if (selectedDate !== 'all') {
      filtered = filtered.filter(m => m.date === selectedDate);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.turfName.toLowerCase().includes(query) ||
        m.organizer.toLowerCase().includes(query)
      );
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    setFilteredMatches(filtered);
  }, [matches, selectedSport, selectedLocation, selectedDate, searchQuery]);

  const handleJoinMatch = async (match: Match) => {
    try {
      const user = await supabaseAuth.getCurrentUser();
      if (!user) {
        toast.error('Please log in to join matches');
        return;
      }

      if (getAvailableSeats(match) === 0) {
        toast.error('This match is full!');
        return;
      }

      // Check if group chat exists, if not create one
      let groupChatId = match.groupChatId;
      
      if (!groupChatId) {
        // Create new group chat for this match
        const chatResult = await realGroupChatService.createGroupChat({
          name: match.title,
          description: `${match.sport} at ${match.turfName} on ${match.date} at ${match.time}`,
          members: [user.uid],
          matchId: match.matchId,
          matchData: match
        });
        groupChatId = chatResult.id;
        
        // Update match with group chat ID
        const updatedMatches = matches.map(m => 
          m.matchId === match.matchId 
            ? { ...m, groupChatId }
            : m
        );
        setMatches(updatedMatches);
      } else {
        // Add user to existing group chat
        await realGroupChatService.addMemberToChat(groupChatId, user.uid);
      }

      // Update player count
      const updatedMatches = matches.map(m =>
        m.matchId === match.matchId
          ? { ...m, currentPlayers: m.currentPlayers + 1 }
          : m
      );
      setMatches(updatedMatches);

      toast.success(`Joined ${match.title}! 🎉`);
      
      // Navigate to modern chat if onNavigate is provided
      if (onNavigate) {
        onNavigate('modern-chat');
      }
    } catch (error) {
      console.error('Error joining match:', error);
      toast.error('Failed to join match. Please try again.');
    }
  };

  const getSportEmoji = (sport: string): string => {
    const emojis: Record<string, string> = {
      'Football': '⚽',
      'Cricket': '🏏',
      'Basketball': '🏀',
      'Tennis': '🎾',
      'Badminton': '🏸',
      'Volleyball': '🏐',
      'Table Tennis': '🏓',
      'Squash': '🎾',
      'Cycling': '🚴',
      'Running': '🏃',
      'Gym': '💪',
    };
    return emojis[sport] || '🎯';
  };

  const getAvailableSeats = (match: Match): number => {
    return Math.max(0, match.minPlayers - match.currentPlayers);
  };

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="discovery-hub loading">
        <div className="spinner"></div>
        <p>Loading matches nearby...</p>
      </div>
    );
  }

  return (
    <div className="discovery-hub">
      {/* Header */}
      <div className="discovery-header">
        <h1>🎯 Find Your Match</h1>
        <p>Browse plans, events, and games happening near you</p>
      </div>

      {/* Search Bar */}
      <div className="discovery-search">
        <input
          type="text"
          placeholder="Search by match name, turf, or organizer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filters */}
      <div className="discovery-filters">
        <div className="filter-group">
          <label>Sport</label>
          <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
            <option value="all">All Sports</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>When</label>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="all">Any Date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>

        <div className="filter-group">
          <label>View</label>
          <div className="view-toggle">
            <button
              className={`view-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
              title="List view"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="results-counter">
        <p>Found <strong>{filteredMatches.length}</strong> match{filteredMatches.length !== 1 ? 'es' : ''}</p>
      </div>

      {/* Matches Display */}
      {filteredMatches.length > 0 ? (
        <div className={`matches-container ${view}`}>
          {filteredMatches.map(match => (
            <div key={match.matchId} className="match-card">
              {/* Card Header */}
              <div className="match-card-header">
                <div className="match-sport">
                  <span className="sport-emoji">{getSportEmoji(match.sport)}</span>
                  <span className="sport-name">{match.sport}</span>
                </div>
                <div className={`visibility-badge ${match.visibility}`}>
                  {match.visibility === 'community' && '🌍'}
                  {match.visibility === 'nearby' && '📍'}
                  {match.visibility === 'private' && '🔒'}
                  {match.visibility}
                </div>
              </div>

              {/* Card Title */}
              <h3 className="match-title">{match.title}</h3>

              {/* Card Details */}
              <div className="match-details">
                <div className="detail-row">
                  <span className="label">📍 Location:</span>
                  <span className="value">{match.turfName}, {match.location}</span>
                </div>
                <div className="detail-row">
                  <span className="label">📅 Date:</span>
                  <span className="value">{formatDate(match.date)} at {match.time}</span>
                </div>
                <div className="detail-row">
                  <span className="label">👤 Organizer:</span>
                  <span className="value">{match.organizer}</span>
                </div>
                <div className="detail-row">
                  <span className="label">👥 Players:</span>
                  <span className="value">
                    {match.currentPlayers}/{match.minPlayers}
                    <span className={`available-seats ${getAvailableSeats(match) === 0 ? 'full' : ''}`}>
                      {getAvailableSeats(match)} available
                    </span>
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="match-card-footer">
                <button
                  className={`join-btn ${getAvailableSeats(match) === 0 ? 'disabled' : ''}`}
                  onClick={() => handleJoinMatch(match)}
                  disabled={getAvailableSeats(match) === 0}
                >
                  {getAvailableSeats(match) === 0 ? '🚫 Full' : '✨ Join Match'}
                </button>
                {onNavigate && match.groupChatId && (
                  <button 
                    className="view-details-btn"
                    onClick={() => onNavigate('modern-chat')}
                  >
                    View Chat →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-matches">
          <div className="no-matches-icon">🔍</div>
          <h3>No matches found</h3>
          <p>Try adjusting your filters or search query</p>
          <button className="reset-filters-btn" onClick={() => {
            setSelectedSport('all');
            setSelectedLocation('all');
            setSelectedDate('all');
            setSearchQuery('');
          }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default DiscoveryHub;
