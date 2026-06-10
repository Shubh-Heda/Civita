import { ArrowLeft, Calendar, MapPin, Trophy, Clock, Users, DollarSign, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { matchService } from '../services/backendService';
import { supabase } from '../lib/supabaseClient';

interface MatchHistoryProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  userId?: string;
}

type FilterType = 'all' | 'upcoming' | 'completed' | 'cancelled';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentType: 'direct' | 'split';
  amount: number;
  participants?: number;
  maxParticipants?: number;
  sport?: string;
}

// ── Shared style tokens (matches CreateMatchPlan warm theme) ──
const S = {
  page: {
    minHeight: '100vh',
    background: '#f5f0e8',
    backgroundImage: `radial-gradient(circle at 20% 10%, rgba(180,140,100,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 90%, rgba(100,150,120,0.07) 0%, transparent 50%)`,
    fontFamily: "'Georgia', serif",
  } as React.CSSProperties,

  topBar: {
    background: '#f5f0e8',
    borderBottom: '1px solid #e2d9cc',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
  } as React.CSSProperties,

  card: {
    background: '#fdfaf5',
    border: '1px solid #e2d9cc',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
  } as React.CSSProperties,

  label: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#8b7355',
    fontFamily: "'Georgia', serif",
  } as React.CSSProperties,
};

const STATUS_CONFIG = {
  upcoming: { color: '#4a6ea8', bg: '#eef2fa', label: 'Upcoming', icon: Clock },
  completed: { color: '#5c7a4e', bg: '#edf4e8', label: 'Completed', icon: CheckCircle },
  cancelled: { color: '#a85c5c', bg: '#faeaea', label: 'Cancelled', icon: XCircle },
};

export function MatchHistory({ onBack, userId }: MatchHistoryProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const loadHistory = async () => {
    try {
      setIsLoading(true);
      if (!userId) { setHistoryItems([]); return; }

      // Try participant-joined matches first, fall back to organizer_id query
      let rows: any[] = [];

      try {
        const participantMatches = await matchService.getUserMatches(userId);
        rows = participantMatches || [];
      } catch (e) {
        console.warn('participant query failed, trying organizer fallback');
      }

      // Fallback: query matches directly by organizer_id
      if (rows.length === 0 && supabase) {
        const { data } = await supabase
          .from('matches')
          .select('*')
          .eq('organizer_id', userId)
          .order('date', { ascending: false });
        rows = (data || []).map((m: any) => ({
          ...m,
          participant_role: 'organizer',
        }));
      }

      // De-duplicate
      const deduped = Array.from(new Map(rows.map((m: any) => [m.id, m])).values());

      const allItems: HistoryItem[] = deduped.map((match: any) => ({
        id: match.id,
        title: match.title || 'Untitled Match',
        category: 'sports',
        date: match.date?.split('T')[0] || match.date || '',
        time: match.time || '',
        location: match.turf_name || match.turfName || match.location || 'Location TBD',
        status: match.status || 'upcoming',
        paymentType: match.payment_option === 'Direct Payment' || match.paymentOption === 'Direct Payment' ? 'direct' : 'split',
        amount: match.amount || match.turf_cost || match.turfCost || 0,
        sport: match.sport,
        participants: match.current_players || match.currentPlayers || 1,
        maxParticipants: match.max_players || match.maxPlayers || 10,
      }));

      allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setHistoryItems(allItems);
    } catch (error) {
      console.error('Failed to load match history:', error);
      setHistoryItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  loadHistory();
}, [userId]);
  const filteredItems = historyItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    upcoming: historyItems.filter(i => i.status === 'upcoming').length,
    completed: historyItems.filter(i => i.status === 'completed').length,
    total: historyItems.reduce((s, i) => s + i.amount, 0),
  };

  return (
    <div style={S.page}>

      {/*useE Top bar */}
      <div style={S.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#5c7a4e', fontWeight: 600, fontSize: '0.9rem',
            fontFamily: "'Georgia', serif",
          }}>
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ height: 20, width: 1, background: '#d4c9b8' }} />
          <div>
            <div style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: '1.1rem', color: '#2d2416' }}>My Matches</div>
            <div style={{ fontSize: '0.75rem', color: '#8b7355' }}>Your planned matches</div>
          </div>
        </div>
        <Trophy size={20} style={{ color: '#8b7355' }} />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '1.5rem' }}>

        {/* Stat strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Upcoming', value: stats.upcoming, color: '#4a6ea8', bg: '#eef2fa', icon: Clock },
            { label: 'Completed', value: stats.completed, color: '#5c7a4e', bg: '#edf4e8', icon: CheckCircle },
            { label: 'Total Spent', value: `₹${stats.total}`, color: '#7a5c8b', bg: '#f4eefa', icon: DollarSign },
          ].map(({ label, value, color, bg, icon: Icon }) => (
            <div key={label} style={{
              background: bg,
              border: `1px solid ${color}30`,
              borderTop: `3px solid ${color}`,
              borderRadius: '12px',
              padding: '1rem',
            }}>
              <Icon size={16} style={{ color, marginBottom: '0.4rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color, fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '0.7rem', color: '#8b7355', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8b7355' }} />
          <input
            style={{
              width: '100%', padding: '0.7rem 1rem 0.7rem 2.4rem',
              background: '#fdfaf5', border: '1px solid #d4c9b8',
              borderRadius: '10px', fontSize: '0.9rem',
              color: '#2d2416', fontFamily: "'Georgia', serif",
              outline: 'none', boxSizing: 'border-box',
            }}
            placeholder="Search by title or location…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {([
            { value: 'all', label: 'All', icon: Filter },
            { value: 'upcoming', label: 'Upcoming', icon: Clock },
            { value: 'completed', label: 'Completed', icon: CheckCircle },
            { value: 'cancelled', label: 'Cancelled', icon: XCircle },
          ] as { value: FilterType; label: string; icon: any }[]).map(({ value, label, icon: Icon }) => {
            const active = selectedFilter === value;
            return (
              <button key={value} onClick={() => setSelectedFilter(value)} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '100px',
                border: active ? '1.5px solid #5c7a4e' : '1.5px solid #d4c9b8',
                background: active ? '#edf4e8' : '#fdfaf5',
                color: active ? '#3d5c30' : '#7a6a52',
                fontWeight: active ? 700 : 400,
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontFamily: "'Georgia', serif",
                transition: 'all 0.15s',
              }}>
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Match list */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#8b7355' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '3px solid #d4c9b8', borderTop: '3px solid #5c7a4e',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem',
            }} />
            <p style={{ fontFamily: "'Georgia', serif", fontSize: '0.95rem' }}>Loading your matches…</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ ...S.card, textAlign: 'center', padding: '4rem 2rem' }}>
            <Trophy size={40} style={{ color: '#d4c9b8', margin: '0 auto 1rem' }} />
            <p style={{ fontFamily: "'Georgia', serif", fontWeight: 700, color: '#2d2416', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
              No matches found
            </p>
            <p style={{ color: '#8b7355', fontSize: '0.875rem' }}>
              {historyItems.length === 0
                ? 'Create your first match plan to see it here.'
                : 'Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredItems.map(item => {
              const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.upcoming;
              const StatusIcon = cfg.icon;
              return (
                <div key={item.id} style={{
                  ...S.card,
                  borderLeft: `3px solid ${cfg.color}`,
                  transition: 'box-shadow 0.2s',
                }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        {item.sport && (
                          <span style={{
                            background: '#e8f0e0', color: '#4a6640',
                            fontSize: '0.68rem', fontWeight: 700,
                            padding: '0.15rem 0.55rem', borderRadius: '100px',
                            letterSpacing: '0.05em',
                          }}>{item.sport}</span>
                        )}
                        <span style={{
                          ...S.label,
                          background: cfg.bg, color: cfg.color,
                          padding: '0.15rem 0.55rem', borderRadius: '100px',
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        }}>
                          <StatusIcon size={10} /> {cfg.label}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: '1rem', color: '#2d2416', margin: 0 }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Details row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                    {[
                      { icon: Calendar, text: item.date },
                      { icon: Clock, text: item.time },
                      { icon: MapPin, text: item.location },
                    ].filter(d => d.text).map(({ icon: Icon, text }) => (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7a6a52', fontSize: '0.82rem' }}>
                        <Icon size={13} style={{ color: '#8b7355' }} />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '0.75rem', borderTop: '1px solid #ede7da',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                        <DollarSign size={13} style={{ color: '#5c7a4e' }} />
                        <span style={{ fontWeight: 700, color: '#3d5c30', fontFamily: 'monospace' }}>₹{item.amount}</span>
                        <span style={{ color: '#8b7355', fontSize: '0.75rem' }}>({item.paymentType === 'direct' ? 'Direct' : 'Split'})</span>
                      </div>
                      {item.participants && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7a6a52', fontSize: '0.82rem' }}>
                          <Users size={13} />
                          {item.participants}{item.maxParticipants ? `/${item.maxParticipants}` : ''} players
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}