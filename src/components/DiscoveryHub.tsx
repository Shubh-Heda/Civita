import { useState, useEffect } from 'react';
import { matchNotificationService } from '../services/matchNotificationService';
import { realGroupChatService } from '../services/groupChatServiceReal';
import { supabaseAuth } from '../services/supabaseAuthService';
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
  groupChatId?: string;
}

interface DiscoveryHubProps {
  onNavigate?: (page: any, turfId?: string, matchId?: string, groupChatId?: string) => void;
  onBack?: () => void;  // ← add this line
}

export function DiscoveryHub({ onNavigate, onBack }: DiscoveryHubProps)  {
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

  useEffect(() => {
    loadMatches();
    const interval = setInterval(loadMatches, 5000);
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

  useEffect(() => {
    let filtered = [...matches];
    if (selectedSport !== 'all') filtered = filtered.filter(m => m.sport === selectedSport);
    if (selectedLocation !== 'all') filtered = filtered.filter(m => m.location === selectedLocation);
    if (selectedDate !== 'all') filtered = filtered.filter(m => m.date === selectedDate);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.turfName.toLowerCase().includes(q) ||
        m.organizer.toLowerCase().includes(q)
      );
    }
    filtered.sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime());
    setFilteredMatches(filtered);
  }, [matches, selectedSport, selectedLocation, selectedDate, searchQuery]);

  const handleJoinMatch = async (match: Match) => {
    try {
      const user = await supabaseAuth.getCurrentUser();
      if (!user) { toast.error('Please log in to join matches'); return; }
      if (getAvailableSeats(match) === 0) { toast.error('This match is full!'); return; }

      let groupChatId = match.groupChatId;

      if (!groupChatId) {
        const chatResult = await realGroupChatService.createGroupChat({
          name: match.title,
          description: `${match.sport} at ${match.turfName} on ${match.date} at ${match.time}`,
          members: [user.uid],
          matchId: match.matchId,
          matchData: match
        });
        groupChatId = chatResult.id;
        setMatches(prev => prev.map(m => m.matchId === match.matchId ? { ...m, groupChatId } : m));
      } else {
        await realGroupChatService.addMemberToChat(groupChatId, user.uid);
      }

      setMatches(prev => prev.map(m =>
        m.matchId === match.matchId ? { ...m, currentPlayers: m.currentPlayers + 1 } : m
      ));

      toast.success(`Joined ${match.title}! 🎉`);
      if (onNavigate) onNavigate('modern-chat');
    } catch (error) {
      console.error('Error joining match:', error);
      toast.error('Failed to join match. Please try again.');
    }
  };

  const getSportEmoji = (sport: string): string => {
    const emojis: Record<string, string> = {
      Football: '⚽', Cricket: '🏏', Basketball: '🏀', Tennis: '🎾',
      Badminton: '🏸', Volleyball: '🏐', 'Table Tennis': '🏓',
      Squash: '🎾', Cycling: '🚴', Running: '🏃', Gym: '💪',
    };
    return emojis[sport] || '🎯';
  };

  const getAvailableSeats = (match: Match) => Math.max(0, match.minPlayers - match.currentPlayers);

  const getFillPercent = (match: Match) =>
    Math.min(100, Math.round((match.currentPlayers / match.minPlayers) * 100));

  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch { return dateStr; }
  };

  const resetFilters = () => {
    setSelectedSport('all');
    setSelectedLocation('all');
    setSelectedDate('all');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="discovery-hub loading">
        <div className="spinner" />
        <p>Scanning for matches nearby…</p>
      </div>
    );
  }

  return (
    <div className="discovery-hub">
      {/* Back Button */}
{onNavigate && (
  <button
    onClick={() => onNavigate('dashboard')}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      color: '#7a8499',
      fontSize: '0.88rem',
      fontWeight: 600,
      padding: '0.5rem 0.85rem',
      cursor: 'pointer',
      fontFamily: "'DM Sans', sans-serif",
      margin: '1.25rem 2.5rem 0',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.color = '#00e5a0';
      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,229,160,0.3)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.color = '#7a8499';
      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
    }}
  >
    ← Back
  </button>
)}

      {/* ── Hero Header ── */}
      <div className="discovery-header">
        <div className="header-label">Live near you</div>
        <h1>FIND YOUR <span>MATCH</span></h1>
        <p>Browse open games, community events, and pickup sports happening around you.</p>
      </div>

      {/* ── Controls ── */}
      <div className="controls-zone">

        {/* Search */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search match name, turf, or organizer…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filters */}
        <div className="filter-row">
          <div className="filter-chip-group">
            <label>Sport</label>
            <select value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
              <option value="all">All Sports</option>
              {sports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="filter-chip-group">
            <label>Location</label>
            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
              <option value="all">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="filter-chip-group">
            <label>When</label>
            <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
              <option value="all">Any Date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>

          <div className="view-toggle">
            <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} title="Grid">⊞</button>
            <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} title="List">☰</button>
          </div>
        </div>
      </div>

      {/* ── Results Bar ── */}
      <div className="results-bar">
        <p className="results-count">
          <strong>{filteredMatches.length}</strong> match{filteredMatches.length !== 1 ? 'es' : ''} found
        </p>
        <span className="sort-hint">Sorted by soonest</span>
      </div>

      {/* ── Cards ── */}
      {filteredMatches.length > 0 ? (
        <div className={`matches-container ${view}`}>
          {filteredMatches.map(match => {
            const seats = getAvailableSeats(match);
            const fill = getFillPercent(match);
            const isFull = seats === 0;

            return (
              <div key={match.matchId} className="match-card">

                {/* Header */}
                <div className="match-card-header">
                  <div className="sport-pill">
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

                {/* Title */}
                <h3 className="match-title">{match.title}</h3>

                {/* Details */}
                <div className="match-details">
                  <div className="detail-row">
                    <span className="detail-icon">📍</span>
                    <span className="detail-label">Venue</span>
                    <span className="detail-value">{match.turfName}, {match.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🗓</span>
                    <span className="detail-label">When</span>
                    <span className="detail-value">{formatDate(match.date)} · {match.time}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">👤</span>
                    <span className="detail-label">Host</span>
                    <span className="detail-value">{match.organizer || 'Anonymous'}</span>
                  </div>
                </div>

                {/* Players progress */}
                <div className="players-row">
                  <div className="players-header">
                    <span className="players-label">👥 {match.currentPlayers} / {match.minPlayers} players</span>
                    <span className={`seats-badge ${isFull ? 'full' : 'open'}`}>
                      {isFull ? 'Full' : `${seats} spot${seats !== 1 ? 's' : ''} left`}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${isFull ? 'full-bar' : ''}`}
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="match-card-footer">
                  <button
                    className={`join-btn ${isFull ? 'disabled' : ''}`}
                    onClick={() => handleJoinMatch(match)}
                    disabled={isFull}
                  >
                    {isFull ? 'Match Full' : 'Join Match →'}
                  </button>
                  {onNavigate && match.groupChatId && (
                    <button className="view-chat-btn" onClick={() => onNavigate('modern-chat')}>
                      View Chat
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-matches">
          <span className="no-matches-icon">🏟</span>
          <h3>No Matches Found</h3>
          <p>Try adjusting your filters or search query</p>
          <button className="reset-filters-btn" onClick={resetFilters}>Clear Filters</button>
        </div>
      )}

    </div>
  );
}

export default DiscoveryHub;