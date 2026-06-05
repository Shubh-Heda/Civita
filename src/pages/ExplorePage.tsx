// src/pages/ExplorePage.tsx
// Fully wired to your real Supabase schema

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Music, Gamepad2, MapPin, Users, Clock,
  Search, SlidersHorizontal, Star, ChevronRight,
  Calendar, Zap, RefreshCw
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// ── Types matching your exact schema ─────────────────────────
interface Match {
  id: string;
  title: string;
  description?: string;
  sport: string;
  category?: string;
  date: string;
  time?: string;
  duration_hours?: number;
  location: string;
  turf_name: string;
  organizer_id?: string;
  current_players?: number;
  max_players?: number;
  min_players?: number;
  status: string;
  skill_level?: string;
  entry_fee?: number;
  amount?: number;
  turf_cost?: number;
  vibe?: string;
}

interface CivitaEvent {
  id: string;
  title: string;
  description?: string;
  category?: string;
  date: string;
  time?: string;
  location: string;
  turf_name?: string;
  sport?: string;
  organizer_id?: string;
  max_participants?: number;
  max_players?: number;
  participants?: string[];
  status: string;
  ticket_price?: number;
  amount?: number;
  cover_image?: string;
  tags?: string[];
}

interface GamingSession {
  id: string;
  title?: string;
  description?: string;
  game?: string;
  platform?: string;
  status?: string;
  [key: string]: any;
}

type Division = 'all' | 'sports' | 'events' | 'gaming';

// ── Division config ───────────────────────────────────────────
const DIVISIONS = {
  sports: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', pill: '#dcfce7', label: 'Sports' },
  events: { color: '#be123c', bg: '#fff1f2', border: '#fecdd3', pill: '#ffe4e6', label: 'Events' },
  gaming: { color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', pill: '#dbeafe', label: 'Gaming' },
};

// ── Skeleton loader ───────────────────────────────────────────
function CardSkeleton() {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, overflow: 'hidden',
      border: '1.5px solid #f3f4f6', padding: 0,
      animation: 'shimmer 1.5s ease infinite',
    }}>
      <div style={{ height: 160, background: '#f3f4f6' }} />
      <div style={{ padding: 16 }}>
        {[80, 60, 40].map((w, i) => (
          <div key={i} style={{
            height: 12, borderRadius: 6, background: '#f3f4f6',
            width: `${w}%`, marginBottom: 10,
          }} />
        ))}
      </div>
      <style>{`@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

// ── Match Card ────────────────────────────────────────────────
function MatchCard({ match }: { match: Match }) {
  const div = DIVISIONS.sports;
  const spotsLeft = (match.max_players || 0) - (match.current_players || 0);
  const isFull = spotsLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
      style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: `1.5px solid ${div.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        cursor: 'pointer', transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Top accent strip */}
      <div style={{ height: 4, background: `linear-gradient(90deg, #4ade80, #16a34a)` }} />

      <div style={{ padding: '16px 18px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: div.color,
            background: div.pill, border: `1px solid ${div.border}`,
            borderRadius: 50, padding: '3px 10px', letterSpacing: 0.5,
          }}>⚽ {match.sport || match.category || 'Sports'}</span>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: isFull ? '#ef4444' : '#16a34a',
            background: isFull ? '#fee2e2' : '#dcfce7',
            borderRadius: 50, padding: '3px 10px',
          }}>{isFull ? 'Full' : `${spotsLeft} spots left`}</span>
        </div>

        <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>
          {match.title}
        </h3>

        {match.vibe && (
          <p style={{ margin: '0 0 10px', fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>
            "{match.vibe}"
          </p>
        )}

        {/* Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
          {match.turf_name && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <MapPin style={{ width: 13, height: 13, color: div.color }} />
              {match.turf_name} · {match.location}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
            <Calendar style={{ width: 13, height: 13, color: div.color }} />
            {match.date ? new Date(match.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
            <Users style={{ width: 13, height: 13, color: div.color }} />
            {match.current_players || 0} / {match.max_players || '?'} players
            {match.skill_level && <span style={{ marginLeft: 6, color: '#d97706', fontWeight: 600 }}>· {match.skill_level}</span>}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>
            {match.entry_fee > 0 ? `₹${match.entry_fee}` : 'Free'}
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '7px 16px', borderRadius: 50, border: 'none',
            background: isFull ? '#f3f4f6' : div.color,
            color: isFull ? '#9ca3af' : '#fff',
            fontSize: 12, fontWeight: 700, cursor: isFull ? 'not-allowed' : 'pointer',
          }}>
            {isFull ? 'Waitlist' : 'Join'} <ChevronRight style={{ width: 13, height: 13 }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Event Card ────────────────────────────────────────────────
function EventCard({ event }: { event: CivitaEvent }) {
  const div = DIVISIONS.events;
  const attending = event.participants?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
      style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: `1.5px solid ${div.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        cursor: 'pointer',
      }}
    >
      {/* Cover image */}
      {event.cover_image ? (
        <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
          <img src={event.cover_image} alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
          }} />
          <span style={{
            position: 'absolute', top: 10, left: 10,
            fontSize: 11, fontWeight: 700, color: div.color,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
            borderRadius: 50, padding: '3px 10px',
          }}>🎉 {event.category}</span>
        </div>
      ) : (
        <div style={{ height: 4, background: 'linear-gradient(90deg, #fb923c, #e11d48)' }} />
      )}

      <div style={{ padding: '14px 18px' }}>
        {!event.cover_image && (
          <span style={{
            fontSize: 11, fontWeight: 700, color: div.color,
            background: div.pill, border: `1px solid ${div.border}`,
            borderRadius: 50, padding: '3px 10px', display: 'inline-block', marginBottom: 8,
          }}>🎉 {event.category}</span>
        )}

        <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>
          {event.title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
            <MapPin style={{ width: 13, height: 13, color: div.color }} />{event.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
            <Calendar style={{ width: 13, height: 13, color: div.color }} />
            {event.date ? new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
            <Users style={{ width: 13, height: 13, color: div.color }} />
            {attending} going{event.max_participants ? ` · ${event.max_participants} max` : ''}
          </div>
        </div>

        {/* Tags */}
        {event.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
            {event.tags.slice(0, 3).map((tag, i) => (
              <span key={i} style={{
                fontSize: 10, fontWeight: 600, color: div.color,
                background: div.pill, borderRadius: 50, padding: '2px 8px',
              }}>#{tag}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>
            {event.ticket_price > 0 ? `₹${event.ticket_price}` : 'Free'}
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '7px 16px', borderRadius: 50, border: 'none',
            background: div.color, color: '#fff',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>
            RSVP <ChevronRight style={{ width: 13, height: 13 }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Gaming Card ───────────────────────────────────────────────
function GamingCard({ session }: { session: GamingSession }) {
  const div = DIVISIONS.gaming;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
      style={{
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: `1.5px solid ${div.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        cursor: 'pointer',
      }}
    >
      <div style={{ height: 4, background: 'linear-gradient(90deg, #60a5fa, #2563eb)' }} />
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: div.color,
            background: div.pill, border: `1px solid ${div.border}`,
            borderRadius: 50, padding: '3px 10px',
          }}>🎮 {session.game || session.category || 'Gaming'}</span>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#16a34a',
            background: '#dcfce7', borderRadius: 50, padding: '3px 10px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            {session.status || 'Open'}
          </span>
        </div>

        <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>
          {session.title || session.game || 'Gaming Session'}
        </h3>
        {session.description && (
          <p style={{ margin: '0 0 10px', fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>
            {session.description.slice(0, 80)}{session.description.length > 80 ? '…' : ''}
          </p>
        )}

        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {session.platform && (
            <span style={{ fontSize: 11, color: div.color, background: div.pill, borderRadius: 50, padding: '3px 10px', fontWeight: 600 }}>
              {session.platform}
            </span>
          )}
          {session.min_rank && (
            <span style={{ fontSize: 11, color: '#d97706', background: '#fef9c3', borderRadius: 50, padding: '3px 10px', fontWeight: 600 }}>
              {session.min_rank}+
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
            <Users style={{ width: 13, height: 13, color: div.color }} />
            {session.current_players || 0}/{session.max_players || '?'} players
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '7px 16px', borderRadius: 50, border: 'none',
            background: div.color, color: '#fff',
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
          }}>
            Join <ChevronRight style={{ width: 13, height: 13 }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, count, color, onSeeAll }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon style={{ width: 18, height: 18, color }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#111827' }}>{title}</h2>
          {count > 0 && <span style={{ fontSize: 12, color: '#9ca3af' }}>{count} available</span>}
        </div>
      </div>
      <button onClick={onSeeAll} style={{
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: 13, fontWeight: 600, color, background: 'none', border: 'none', cursor: 'pointer',
      }}>
        See all <ChevronRight style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );
}

// ── Main Explore Page ─────────────────────────────────────────
export function ExplorePage() {
  const [division, setDivision] = useState<Division>('all');
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [events, setEvents] = useState<CivitaEvent[]>([]);
  const [gaming, setGaming] = useState<GamingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) {
        setMatches([]);
        setEvents([]);
        setGaming([]);
        return;
      }

      const searchFilter = search.trim();

      // Sports and event cards live in the matches table in the current setup.
      let mq = supabase
        .from('matches')
        .select('*')
        .eq('category', 'sports')
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(9);
      if (searchFilter) mq = mq.or(`title.ilike.%${searchFilter}%,sport.ilike.%${searchFilter}%,location.ilike.%${searchFilter}%`);

      let matchEventsQuery = supabase
        .from('matches')
        .select('*')
        .eq('category', 'events')
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(9);
      if (searchFilter) matchEventsQuery = matchEventsQuery.or(`title.ilike.%${searchFilter}%,sport.ilike.%${searchFilter}%,location.ilike.%${searchFilter}%`);

      // Some deployments also have a dedicated events table. Load it only as a supplement.
      let dedicatedEventsQuery = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(9);
      if (searchFilter) dedicatedEventsQuery = dedicatedEventsQuery.or(`title.ilike.%${searchFilter}%,category.ilike.%${searchFilter}%,location.ilike.%${searchFilter}%`);

      // Gaming sessions are optional in the migrations, so a missing table should not break Explore.
      let gq = supabase
        .from('gaming_sessions')
        .select('*')
        .limit(9);
      if (searchFilter) gq = gq.or(`title.ilike.%${searchFilter}%,game.ilike.%${searchFilter}%`);

      const [mRes, matchEventsRes, dedicatedEventsRes, gRes] = await Promise.all([mq, matchEventsQuery, dedicatedEventsQuery, gq]);

      if (mRes.error) console.warn('matches:', mRes.error.message);
      if (matchEventsRes.error) console.warn('match events:', matchEventsRes.error.message);
      if (dedicatedEventsRes.error) console.warn('events:', dedicatedEventsRes.error.message);
      if (gRes.error) console.warn('gaming:', gRes.error.message);

      setMatches(mRes.data ?? []);
      setEvents([...(matchEventsRes.data ?? []), ...(dedicatedEventsRes.data ?? [])]);
      setGaming(gRes.data ?? []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(fetchAll, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchAll, search]);

  const showSports = division === 'all' || division === 'sports';
  const showEvents = division === 'all' || division === 'events';
  const showGaming = division === 'all' || division === 'gaming';

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{
        background: '#fff', borderBottom: '1.5px solid #f3f4f6',
        position: 'sticky', top: 0, zIndex: 50,
        padding: '14px 24px',
      }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* Search */}
          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#9ca3af' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search matches, events, games, locations…"
              style={{
                width: '100%', padding: '10px 12px 10px 38px',
                borderRadius: 12, border: '1.5px solid #e5e7eb',
                background: '#f9fafb', fontSize: 14, color: '#111827',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Division filter */}
          <div style={{ display: 'flex', gap: 4, background: '#f3f4f6', borderRadius: 12, padding: 4 }}>
            {(['all', 'sports', 'events', 'gaming'] as Division[]).map(d => (
              <button key={d} onClick={() => setDivision(d)} style={{
                padding: '7px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
                background: division === d
                  ? d === 'all' ? '#111827' : DIVISIONS[d as keyof typeof DIVISIONS]?.color
                  : 'transparent',
                color: division === d ? '#fff' : '#6b7280',
              }}>
                {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button onClick={fetchAll} style={{
            width: 38, height: 38, borderRadius: 10, border: '1.5px solid #e5e7eb',
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <RefreshCw style={{ width: 15, height: 15, color: '#6b7280' }} />
          </button>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto" style={{ padding: '32px 24px' }}>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', marginBottom: 24, color: '#dc2626', fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        {/* SPORTS */}
        {showSports && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon={Trophy} title="Sports & Turfs" count={matches.length} color="#16a34a" onSeeAll={() => setDivision('sports')} />
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[1,2,3].map(i => <CardSkeleton key={i} />)}
              </div>
            ) : matches.length === 0 ? (
              <EmptyState icon="⚽" label="No matches found" sub={search ? 'Try a different search' : 'Be the first to create a match!'} color="#16a34a" />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {matches.map(m => <MatchCard key={m.id} match={m} />)}
              </div>
            )}
          </section>
        )}

        {/* EVENTS */}
        {showEvents && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon={Music} title="Events" count={events.length} color="#be123c" onSeeAll={() => setDivision('events')} />
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[1,2,3].map(i => <CardSkeleton key={i} />)}
              </div>
            ) : events.length === 0 ? (
              <EmptyState icon="🎉" label="No events found" sub={search ? 'Try a different search' : 'No upcoming events yet'} color="#be123c" />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {events.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            )}
          </section>
        )}

        {/* GAMING */}
        {showGaming && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon={Gamepad2} title="Gaming" count={gaming.length} color="#1d4ed8" onSeeAll={() => setDivision('gaming')} />
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[1,2,3].map(i => <CardSkeleton key={i} />)}
              </div>
            ) : gaming.length === 0 ? (
              <EmptyState icon="🎮" label="No lobbies found" sub={search ? 'Try a different search' : 'No open lobbies right now'} color="#1d4ed8" />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {gaming.map(g => <GamingCard key={g.id} session={g} />)}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, label, sub, color }: { icon: string; label: string; sub: string; color: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', background: '#fff', borderRadius: 16, border: '1.5px solid #f3f4f6' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#9ca3af' }}>{sub}</div>
    </div>
  );
}
