import { useState, useEffect, useCallback } from 'react';
import { matchNotificationService, MatchNotification } from '../services/matchNotificationService';
import { supabaseAuth } from '../services/supabaseAuthService';
import { toast } from 'sonner';
import { JoinMatchModal } from './JoinMatchModal';
import './DiscoveryHub.css';

interface DiscoveryHubProps {
  onNavigate?: (page: any, turfId?: string, matchId?: string, groupChatId?: string) => void;
  onBack?: () => void;
}

export function DiscoveryHub({ onNavigate, onBack }: DiscoveryHubProps) {
  const [matches, setMatches] = useState<MatchNotification[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<MatchNotification[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sports, setSports] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<string | null>(null);  // track which card is loading
  const [modalMatch, setModalMatch] = useState<MatchNotification | null>(null);
  // ── Load matches from Supabase ──────────────────────────────────────────
  const loadMatches = useCallback(async () => {
    try {
      const [allMatches, availableSports, availableLocations] = await Promise.all([
        matchNotificationService.getDiscoverableMatches(),
        matchNotificationService.getAvailableSports(),
        matchNotificationService.getAvailableLocations(),
      ]);

      setMatches(allMatches);
      setSports(availableSports);
      setLocations(availableLocations);
    } catch (err) {
      console.error('Failed to load matches:', err);
      toast.error('Could not load matches. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Initial load + Realtime subscription ───────────────────────────────
  useEffect(() => {
    loadMatches();

    // Subscribe to live updates — new matches appear instantly without refresh
    const unsubscribe = matchNotificationService.subscribeToMatchUpdates((updatedMatch) => {
      setMatches(prev => {
        const idx = prev.findIndex(m => m.matchId === updatedMatch.matchId);
        if (idx === -1) {
          // New match — add to top
          return [updatedMatch, ...prev];
        } else {
          // Updated match — replace in place
          const next = [...prev];
          next[idx] = updatedMatch;
          return next;
        }
      });
    });

    return () => unsubscribe();
  }, [loadMatches]);

  // ── Filter logic ────────────────────────────────────────────────────────
  useEffect(() => {
    let filtered = [...matches];

    if (selectedSport !== 'all') {
      filtered = filtered.filter(m => m.sport === selectedSport);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(m => m.location === selectedLocation);
    }

    if (selectedDate !== 'all') {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
      const monthEnd = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

      filtered = filtered.filter(m => {
        if (selectedDate === 'today') return m.date === today;
        if (selectedDate === 'tomorrow') return m.date === tomorrow;
        if (selectedDate === 'this-week') return m.date >= today && m.date <= weekEnd;
        if (selectedDate === 'this-month') return m.date >= today && m.date <= monthEnd;
        return true;
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.turfName.toLowerCase().includes(q) ||
        m.organizer.toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) =>
      new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
    );

    setFilteredMatches(filtered);
  }, [matches, selectedSport, selectedLocation, selectedDate, searchQuery]);

  // ── Join match handler ──────────────────────────────────────────────────
  const handleJoinMatch = async (match: MatchNotification) => {
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

      setJoiningId(match.matchId);

      const result = await matchNotificationService.joinMatch(match.matchId, user.uid);

      if (result.success) {
        toast.success(`Joined ${match.title}! 🎉`);
        // Optimistically update local state
        setMatches(prev =>
          prev.map(m =>
            m.matchId === match.matchId
              ? { ...m, currentPlayers: m.currentPlayers + 1 }
              : m
          )
        );
        if (onNavigate) onNavigate('modern-chat');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error joining match:', error);
      toast.error('Failed to join match. Please try again.');
    } finally {
      setJoiningId(null);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────
  const getSportEmoji = (sport: string): string => {
    const emojis: Record<string, string> = {
      Football: '⚽', Cricket: '🏏', Basketball: '🏀', Tennis: '🎾',
      Badminton: '🏸', Volleyball: '🏐', 'Table Tennis': '🏓',
      Squash: '🎾', Cycling: '🚴', Running: '🏃', Gym: '💪',
    };
    return emojis[sport] || '🎯';
  };

  const getAvailableSeats = (match: MatchNotification) => {
    const max = match.maxPlayers ?? match.minPlayers;
    return Math.max(0, max - match.currentPlayers);
  };

  const getFillPercent = (match: MatchNotification) => {
    const max = match.maxPlayers ?? match.minPlayers;
    return Math.min(100, Math.round((match.currentPlayers / max) * 100));
  };

  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const resetFilters = () => {
    setSelectedSport('all');
    setSelectedLocation('all');
    setSelectedDate('all');
    setSearchQuery('');
  };

  // ── Render ───────────────────────────────────────────────────────────────
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
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', color: '#7a8499',
            fontSize: '0.88rem', fontWeight: 600,
            padding: '0.5rem 0.85rem', cursor: 'pointer',
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

      {/* Hero Header */}
      <div className="discovery-header">
        <div className="header-label">Live near you</div>
        <h1>FIND YOUR <span>MATCH</span></h1>
        <p>Browse open games, community events, and pickup sports happening around you.</p>
      </div>

      {/* Controls */}
      <div className="controls-zone">
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

      {/* Results Bar */}
      <div className="results-bar">
        <p className="results-count">
          <strong>{filteredMatches.length}</strong> match{filteredMatches.length !== 1 ? 'es' : ''} found
        </p>
        <span className="sort-hint">Sorted by soonest</span>
      </div>

      {/* Cards */}
      {filteredMatches.length > 0 ? (
        <div className={`matches-container ${view}`}>
          {filteredMatches.map(match => {
            const seats = getAvailableSeats(match);
            const fill = getFillPercent(match);
            const isFull = seats === 0;
            const isJoining = joiningId === match.matchId;

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
                    <span className="players-label">
                      👥 {match.currentPlayers} / {match.maxPlayers ?? match.minPlayers} players
                    </span>
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
                    className={`join-btn ${isFull ? 'disabled' : ''} ${isJoining ? 'loading' : ''}`}
                    onClick={() => { console.log('clicked', match); setModalMatch(match); }}
                    disabled={isFull || isJoining}
                  >
                    {isJoining ? 'Joining…' : isFull ? 'Match Full' : 'Join Match →'}
                  </button>
                  {onNavigate && match.groupChatId && (
                    <button
                      className="view-chat-btn"
                      onClick={() => onNavigate('modern-chat')}
                    >
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
          <p>Try adjusting your filters or be the first to create one!</p>
          <button className="reset-filters-btn" onClick={resetFilters}>Clear Filters</button>
        </div>
      )}
      {modalMatch && (
        <JoinMatchModal
          match={{
            matchId: modalMatch.matchId,
            title: modalMatch.title,
            sport: modalMatch.sport,
            turfName: modalMatch.turfName,
            location: modalMatch.location,
            date: modalMatch.date,
            time: modalMatch.time,
            currentPlayers: modalMatch.currentPlayers,
            minPlayers: modalMatch.minPlayers,
            maxPlayers: modalMatch.maxPlayers,
            organizer: modalMatch.organizer,
          }}
          onConfirm={async () => {
            await handleJoinMatch(modalMatch);
            setModalMatch(null);
          }}
          onClose={() => setModalMatch(null)}
        />
      )}

    </div>
  );
}

export default DiscoveryHub;