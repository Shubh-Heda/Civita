import {
  ArrowLeft, Heart, MessageCircle, Bell, Activity, Users,
  Zap, Flame, Sparkles, Loader, Send, Camera, Share2,
  Bookmark, ImageIcon, TrendingUp, Radio, Clock, MapPin,
  CalendarDays, ChevronRight, UserCheck, Trophy
} from 'lucide-react';
import { LiveActivityFeed } from './LiveActivityFeed';
import { DiscordLikeRooms } from './DiscordLikeRooms';
import { ActivityHeatmap } from './ActivityHeatmap';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase, supabaseEnabled } from '../lib/supabaseClient';

/* ── Theme: "The Clubhouse" ─────────────────────────────────────
   Warm cream base, ink headings, three bold zone identities.
   Upcoming matches as timeline cards, not a live feed header.
──────────────────────────────────────────────────────────────── */

const THEME = {
  bg: '#FAF8F5',
  surface: '#FFFFFF',
  ink: '#1A1A2E',
  muted: '#8891A4',
  divider: 'rgba(0,0,0,0.07)',
};

const ZONES = {
  notifications: {
    id: 'notifications',
    num: '01',
    label: 'Match Updates',
    sub: 'Upcoming matches near you',
    icon: <Bell size={22} />,
    color: '#3B5BDB',
    pale: '#EDF2FF',
    mid: '#BAC8FF',
    dark: '#1E3A8A',
    grad: 'linear-gradient(135deg,#3B5BDB 0%,#6C63FF 100%)',
    pageTint: 'rgba(59,91,219,0.03)',
  },
  heatmap: {
    id: 'heatmap',
    num: '02',
    label: 'Activity Heatmap',
    sub: 'Your streaks & engagement',
    icon: <Activity size={22} />,
    color: '#E8590C',
    pale: '#FFF4E6',
    mid: '#FFCBA4',
    dark: '#9A3412',
    grad: 'linear-gradient(135deg,#E8590C 0%,#F59F00 100%)',
    pageTint: 'rgba(232,89,12,0.03)',
  },
  viberooms: {
    id: 'viberooms',
    num: '03',
    label: 'Vibe Rooms',
    sub: 'Live voice & text hangouts',
    icon: <Radio size={22} />,
    color: '#0CA678',
    pale: '#E6FCF5',
    mid: '#96F2D7',
    dark: '#065F46',
    grad: 'linear-gradient(135deg,#0CA678 0%,#20C997 100%)',
    pageTint: 'rgba(12,166,120,0.03)',
  },
};


const SPORT_TAGS = [
  { emoji: '🏀', label: 'Basketball', color: '#E8590C' },
  { emoji: '⚽', label: 'Football',   color: '#0CA678' },
  { emoji: '🏏', label: 'Cricket',    color: '#3B5BDB' },
  { emoji: '🎾', label: 'Tennis',     color: '#D4A017' },
  { emoji: '🏊', label: 'Swimming',   color: '#0284C7' },
  { emoji: '🧘', label: 'Yoga',       color: '#7C3AED' },
];

const INITIAL_POSTS = [
  {
    id: 'p1', author: 'Sarah Williams', avatar: 'SW', timeAgo: '1 day ago',
    content: 'Looking for 2 more players for Saturday Basketball! 🏀 Friendly group, all skill levels welcome. DM me!',
    likes: 45, comments: 12, isLiked: false,
    sport: { emoji: '🏀', label: 'Basketball', color: '#E8590C' },
  },
  {
    id: 'p2', author: 'Mike Johnson', avatar: 'MJ', timeAgo: '2 days ago',
    content: 'Just wrapped an amazing cricket match. The energy was electric 🔥 Who\'s joining next week?',
    likes: 128, comments: 34, isLiked: false,
    sport: { emoji: '🏏', label: 'Cricket', color: '#3B5BDB' },
  },
];

/* ── Tiny atoms ─────────────────────────────────────────────── */
function Av({ initials, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg,${color}dd,${color}99)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.33,
      flexShrink: 0, letterSpacing: '-0.01em', userSelect: 'none',
    }}>{initials}</div>
  );
}

function Chip({ emoji, label, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 700, padding: '3px 10px',
      borderRadius: 999, background: `${color}15`, color,
      border: `1px solid ${color}28`, letterSpacing: '0.02em',
    }}>{emoji} {label}</span>
  );
}

/* ── Zone locker door ────────────────────────────────────────── */
function ZoneDoor({ zone, isActive, onClick }) {
  const z = ZONES[zone];
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: isActive ? 0 : -5 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative', textAlign: 'left', cursor: 'pointer',
        borderRadius: 24, overflow: 'hidden', padding: 0, border: 'none',
        background: isActive ? THEME.surface : 'rgba(255,255,255,0.65)',
        boxShadow: isActive
          ? `0 16px 48px ${z.color}22, 0 4px 12px ${z.color}12, 0 0 0 2px ${z.color}`
          : '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1.5px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s, background 0.3s',
      }}
    >
      {/* Color header */}
      <div style={{
        background: isActive ? z.grad : `linear-gradient(135deg,#E2E8F0,#CBD5E1)`,
        padding: '22px 22px 18px',
        transition: 'background 0.35s',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Big number watermark */}
        <div style={{
          position: 'absolute', right: -8, bottom: -12,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900, fontSize: 72, lineHeight: 1,
          color: 'rgba(255,255,255,0.18)',
          userSelect: 'none', letterSpacing: '-0.04em',
          transition: 'color 0.3s',
        }}>{z.num}</div>

        {/* Icon bubble */}
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isActive ? '#fff' : '#94A3B8',
          marginBottom: 14,
          transition: 'color 0.3s, background 0.3s',
        }}>
          {z.icon}
        </div>

        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800, fontSize: 17,
          color: isActive ? '#fff' : '#475569',
          lineHeight: 1.2, letterSpacing: '-0.01em',
          transition: 'color 0.3s',
        }}>{z.label}</div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 22px 20px' }}>
        <div style={{ fontSize: 12.5, color: THEME.muted, lineHeight: 1.5 }}>{z.sub}</div>

        {/* Active indicator */}
        <div style={{
          marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
          opacity: isActive ? 1 : 0, transition: 'opacity 0.25s',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: z.color,
            boxShadow: `0 0 0 3px ${z.color}30`,
            display: 'inline-block',
            animation: 'zpulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: z.color }}>Viewing</span>
          <ChevronRight size={13} color={z.color} style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </motion.button>
  );
}

/* ── Upcoming match card ─────────────────────────────────────── */
function MatchCard({ match, index }) {
  const [joined, setJoined] = useState(false);
  const isFull = match.slots === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.32 }}
      style={{
        background: THEME.surface, borderRadius: 18,
        border: `1.5px solid rgba(0,0,0,0.06)`,
        boxShadow: '0 2px 14px rgba(0,0,0,0.05)',
        overflow: 'hidden', display: 'flex',
      }}
    >
      {/* Left sport stripe */}
      <div style={{
        width: 5, flexShrink: 0,
        background: `linear-gradient(180deg,${match.color},${match.color}44)`,
      }} />

      <div style={{ flex: 1, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {/* Sport emoji circle */}
        <div style={{
          width: 52, height: 52, borderRadius: 16, flexShrink: 0,
          background: `${match.color}12`,
          border: `1.5px solid ${match.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26,
        }}>{match.sport}</div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 5 }}>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: 15, color: THEME.ink,
            }}>{match.title}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px',
              borderRadius: 999, letterSpacing: '0.04em',
              background: isFull ? '#FEE2E2' : match.slots === 1 ? '#FEF9C3' : '#DCFCE7',
              color: isFull ? '#DC2626' : match.slots === 1 ? '#854D0E' : '#15803D',
              border: `1px solid ${isFull ? '#FECACA' : match.slots === 1 ? '#FDE68A' : '#BBF7D0'}`,
            }}>{match.tag}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: THEME.muted }}>
              <MapPin size={12} /> {match.venue}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: THEME.muted }}>
              <Users size={12} /> {match.players} players
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: match.color }}>
              📍 {match.dist}
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 12, color: THEME.muted, marginTop: 5,
          }}>
            <Clock size={11} /> {match.time}
            {!isFull && (
              <span style={{
                marginLeft: 8, fontSize: 11, fontWeight: 600,
                color: match.slots === 1 ? '#CA8A04' : '#16A34A',
              }}>
                · {match.slots} slot{match.slots > 1 ? 's' : ''} left
              </span>
            )}
          </div>
        </div>

        {/* Join button */}
        <motion.button
          whileHover={!isFull && !joined ? { scale: 1.05 } : {}}
          whileTap={!isFull && !joined ? { scale: 0.95 } : {}}
          onClick={() => !isFull && setJoined(j => !j)}
          style={{
            padding: '9px 18px', borderRadius: 12, border: 'none',
            cursor: isFull ? 'not-allowed' : 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: 13,
            background: isFull
              ? '#F1F5F9'
              : joined
                ? `${match.color}15`
                : `linear-gradient(135deg,${match.color},${match.color}cc)`,
            color: isFull ? '#94A3B8' : joined ? match.color : '#fff',
            boxShadow: (!isFull && !joined) ? `0 4px 14px ${match.color}35` : 'none',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
          }}
        >
          {isFull ? 'Full' : joined ? <><UserCheck size={13} /> Joined</> : 'Join Match'}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── Post card ───────────────────────────────────────────────── */
function PostCard({ post, onLike, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.32 }}
      style={{
        background: THEME.surface, borderRadius: 20,
        border: '1.5px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)', overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{
          width: 4, flexShrink: 0,
          background: `linear-gradient(180deg,${post.sport.color},${post.sport.color}33)`,
        }} />
        <div style={{ flex: 1, padding: '18px 20px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <Av initials={post.avatar} color={post.sport.color} size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 14.5, color: THEME.ink,
                }}>{post.author}</span>
                <Chip emoji={post.sport.emoji} label={post.sport.label} color={post.sport.color} />
              </div>
              <div style={{ fontSize: 11.5, color: THEME.muted }}>{post.timeAgo}</div>
            </div>
          </div>
          <p style={{
            margin: '13px 0 0', fontSize: 14, lineHeight: 1.68,
            color: '#374151',
          }}>{post.content}</p>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        padding: '10px 16px 10px 20px',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        background: '#FAFAFA',
      }}>
        {[
          { icon: <Heart size={15} fill={post.isLiked ? '#EF4444' : 'none'} />, label: post.likes, color: post.isLiked ? '#EF4444' : THEME.muted, fn: onLike, hoverBg: '#FFF1F2', hoverColor: '#EF4444' },
          { icon: <MessageCircle size={15} />, label: post.comments, color: THEME.muted, fn: null, hoverBg: '#EFF6FF', hoverColor: '#3B5BDB' },
          { icon: <Share2 size={15} />, label: 'Share', color: THEME.muted, fn: null, hoverBg: '#F3E8FF', hoverColor: '#7C3AED' },
        ].map((a, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            onClick={a.fn}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 11px', borderRadius: 10,
              border: 'none', cursor: 'pointer', background: 'transparent',
              color: a.color, fontSize: 12.5, fontWeight: 600,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = a.hoverBg; e.currentTarget.style.color = a.hoverColor; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = a.color; }}
          >{a.icon}{a.label}</motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1 }}
          style={{
            marginLeft: 'auto', padding: '6px 8px', borderRadius: 10,
            border: 'none', cursor: 'pointer', background: 'transparent', color: '#CBD5E1',
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#CA8A04'; e.currentTarget.style.background = '#FEF9C3'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#CBD5E1'; e.currentTarget.style.background = 'transparent'; }}
        ><Bookmark size={15} /></motion.button>
      </div>
    </motion.div>
  );
}

/* ── Post composer ───────────────────────────────────────────── */
function Composer({ value, onChange, onPost, isPosting, onFiles, selectedFiles, onRemoveFile }) {
  return (
    <div style={{
      background: THEME.surface, borderRadius: 20,
      border: '1.5px solid rgba(0,0,0,0.07)',
      boxShadow: '0 2px 14px rgba(0,0,0,0.05)',
      padding: '20px 22px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: THEME.muted, marginBottom: 14, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Share with the community
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Av initials="ME" color="#3B5BDB" size={44} />
        <div style={{ flex: 1 }}>
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Share a match moment, celebrate a win, find players… 🎉"
            disabled={isPosting}
            rows={3}
            style={{
              width: '100%', borderRadius: 14, padding: '12px 15px',
              fontSize: 14, lineHeight: 1.6, color: '#374151',
              background: '#F8FAFC', border: '1.5px solid #E2E8F0',
              outline: 'none', resize: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => { e.target.style.borderColor = '#3B5BDB'; e.target.style.boxShadow = '0 0 0 3px rgba(59,91,219,0.08)'; }}
            onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
          />
          {selectedFiles.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              {selectedFiles.map((file, i) => (
                <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ position: 'relative' }}>
                  <img src={URL.createObjectURL(file)} alt="preview" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12, border: '1.5px solid #E2E8F0' }} />
                  <button onClick={() => onRemoveFile(i)} style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>×</button>
                </motion.div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              <input type="file" id="cu-upload" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={e => e.target.files && onFiles(Array.from(e.target.files))} />
              {[
                { el: 'label', icon: <ImageIcon size={15} />, htmlFor: 'cu-upload' },
                { el: 'button', icon: <Camera size={15} /> },
              ].map((b, i) => b.el === 'label' ? (
                <label key={i} htmlFor={b.htmlFor} style={{ padding: '7px 9px', borderRadius: 10, cursor: 'pointer', color: THEME.muted, display: 'flex', transition: 'background 0.15s, color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EDF2FF'; e.currentTarget.style.color = '#3B5BDB'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = THEME.muted; }}
                >{b.icon}</label>
              ) : (
                <button key={i} style={{ padding: '7px 9px', borderRadius: 10, cursor: 'pointer', color: THEME.muted, background: 'transparent', border: 'none', transition: 'background 0.15s, color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EDF2FF'; e.currentTarget.style.color = '#3B5BDB'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = THEME.muted; }}
                >{b.icon}</button>
              ))}
            </div>
            <motion.button
              onClick={onPost}
              disabled={(!value.trim() && selectedFiles.length === 0) || isPosting}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '10px 22px', borderRadius: 999, border: 'none',
                background: 'linear-gradient(135deg,#3B5BDB,#6C63FF)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.01em',
                boxShadow: '0 4px 16px rgba(59,91,219,0.35)',
                opacity: (!value.trim() && selectedFiles.length === 0) || isPosting ? 0.42 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {isPosting ? <><Loader size={13} className="animate-spin" /> Posting…</> : <><Send size={13} /> Post</>}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section heading ─────────────────────────────────────────── */
function SectionHeading({ label, color, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 4, height: 20, borderRadius: 2, background: color }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800, fontSize: 16, color: THEME.ink,
        }}>{label}</span>
      </div>
      {action && (
        <button style={{ fontSize: 12, fontWeight: 700, color, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          {action} <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

function getSportEmoji(sport: string): string {
  const map: Record<string, string> = {
    Football: '⚽', Cricket: '🏏', Basketball: '🏀',
    Tennis: '🎾', Badminton: '🏸', Swimming: '🏊', Volleyball: '🏐',
  };
  return map[sport] || '🎯';
}

function getSportColor(sport: string): string {
  const map: Record<string, string> = {
    Football: '#0CA678', Cricket: '#3B5BDB', Basketball: '#E8590C',
    Tennis: '#D4A017', Badminton: '#7C3AED', Swimming: '#0284C7',
  };
  return map[sport] || '#3B5BDB';
}

/* ── Main ────────────────────────────────────────────────────── */
export function SportsCommunityFeed({ onNavigate }) {
  const [activeZone, setActiveZone] = useState('notifications');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState('');
  const [files, setFiles] = useState([]);
  const [posting, setPosting] = useState(false);

  const [upcoming, setUpcoming] = useState([]);

useEffect(() => {
  if (!supabaseEnabled || !supabase) return;

  // Initial fetch
  supabase
    .from('matches')
    .select('*')
    .in('status', ['open', 'upcoming'])
    .in('visibility', ['community', 'nearby', 'public', 'Public'])
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(10)
    .then(({ data }) => {
      if (data) setUpcoming(data.map(m => ({
        id: m.id,
        sport: getSportEmoji(m.sport),
        title: m.title,
        venue: m.turf_name,
        players: m.current_players ?? 0,
        dist: '—',
        time: `${m.date} ${m.time?.slice(0,5) ?? ''}`,
        slots: Math.max(0, (m.max_players ?? m.min_players) - (m.current_players ?? 0)),
        color: getSportColor(m.sport),
        tag: m.current_players >= (m.max_players ?? m.min_players) ? 'Full' : 'Open',
      })));
    });

  // Realtime — new match appears instantly
  const channel = supabase
    .channel('community-matches')
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'matches',
    }, () => {
      // Re-fetch on any change
      supabase
        .from('matches')
        .select('*')
        .in('status', ['open', 'upcoming'])
        .in('visibility', ['community', 'nearby', 'public', 'Public'])
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })
        .limit(10)
        .then(({ data }) => {
          if (data) setUpcoming(data.map(m => ({
            id: m.id,
            sport: getSportEmoji(m.sport),
            title: m.title,
            venue: m.turf_name,
            players: m.current_players ?? 0,
            dist: '—',
            time: `${m.date} ${m.time?.slice(0,5) ?? ''}`,
            slots: Math.max(0, (m.max_players ?? m.min_players) - (m.current_players ?? 0)),
            color: getSportColor(m.sport),
            tag: m.current_players >= (m.max_players ?? m.min_players) ? 'Full' : 'Open',
          })));
        });
    })
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);

  useEffect(() => { window.scrollTo(0, 0); }, [activeZone]);

  const handleLike = id => setPosts(prev => prev.map(p =>
    p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
  ));

  const handlePost = () => {
    if (!newPost.trim() && files.length === 0) { toast.error('Write something first'); return; }
    setPosting(true);
    setTimeout(() => {
      setPosts(prev => [{
        id: Date.now().toString(), author: 'You', avatar: 'ME', timeAgo: 'Just now',
        content: newPost, likes: 0, comments: 0, isLiked: false,
        sport: { emoji: '⚽', label: 'General', color: '#3B5BDB' },
      }, ...prev]);
      setNewPost(''); setFiles([]); setPosting(false);
      toast.success('Posted! 🎉');
    }, 800);
  };

  const z = ZONES[activeZone];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        @keyframes zpulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.55} }
        * { box-sizing:border-box; margin:0; padding:0; }
        .scf-page { transition: background 0.5s; }
        .scf-scroll::-webkit-scrollbar { display:none; }
        .scf-scroll { -ms-overflow-style:none; scrollbar-width:none; }
        .ctrack { height:6px; border-radius:3px; background:#F1F5F9; overflow:hidden; }
        .cfill { height:100%; border-radius:3px; }
        @media(max-width:640px){
          .zone-grid { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: repeat(2,1fr) !important; }
          .match-btn { padding: 8px 12px !important; font-size: 12px !important; }
        }
      `}</style>

      <div
        className="scf-page"
        style={{
          minHeight: '100vh',
          fontFamily: 'Inter, sans-serif',
          background: `linear-gradient(160deg, ${z.pale}60 0%, ${THEME.bg} 35%, ${THEME.bg} 100%)`,
          color: THEME.ink,
        }}
      >
        {/* ── Header ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(250,248,245,0.9)', backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}>
          <div style={{
            maxWidth: 980, margin: '0 auto', padding: '0 24px',
            height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => onNavigate('dashboard')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  color: THEME.muted, padding: '6px 10px', borderRadius: 10, transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = THEME.ink; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = THEME.muted; }}
              >
                <ArrowLeft size={15} /> Back
              </button>
              <div style={{ width: 1, height: 26, background: THEME.divider }} />
              <div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: 17, color: THEME.ink,
                  letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  🏅 Sports Community
                </div>
                <div style={{ fontSize: 11, color: THEME.muted, marginTop: 1 }}>
                  Where every sport finds its people
                </div>
              </div>
            </div>

            {/* Sport filter pills — desktop */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
              {SPORT_TAGS.slice(0, 5).map(t => (
                <span key={t.label} style={{
                  fontSize: 11.5, fontWeight: 600, padding: '4px 11px', borderRadius: 999,
                  background: `${t.color}13`, color: t.color, border: `1px solid ${t.color}28`,
                  cursor: 'default', whiteSpace: 'nowrap',
                }}>{t.emoji} {t.label}</span>
              ))}
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 980, margin: '0 auto', padding: '32px 24px 72px' }}>

          {/* ── Three Zone Doors ── */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800, fontSize: 13, color: THEME.muted,
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16,
            }}>Community Zones</div>
            <div
              className="zone-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}
            >
              {Object.keys(ZONES).map(zid => (
                <ZoneDoor key={zid} zone={zid} isActive={activeZone === zid} onClick={() => setActiveZone(zid)} />
              ))}
            </div>
          </div>

          {/* ── Zone divider ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ height: 2, width: 36, borderRadius: 2, background: z.grad }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900, fontSize: 24, color: THEME.ink, letterSpacing: '-0.02em',
            }}>{z.label}</span>
            <div style={{ flex: 1, height: 1, background: THEME.divider }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: z.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{z.num}</span>
          </div>

          {/* ── Zone content ── */}
          <AnimatePresence mode="wait">

            {/* ══════════════════════════════════════════
                ZONE 01 — MATCH UPDATES
            ══════════════════════════════════════════ */}
            {activeZone === 'notifications' && (
              <motion.div key="notifications"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {/* Quick stats */}
                <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                  {[
                    { label: 'Athletes', value: '2,847', emoji: '🏃', color: '#3B5BDB' },
                    { label: 'Matches', value: '892', emoji: '🏆', color: '#0CA678' },
                    { label: 'Teams', value: '156', emoji: '🤝', color: '#7C3AED' },
                    { label: 'Tournaments', value: '45', emoji: '🎯', color: '#E8590C' },
                  ].map((s, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }} style={{
                      background: THEME.surface, borderRadius: 18,
                      padding: '20px 14px', textAlign: 'center',
                      border: '1.5px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    }}>
                      <div style={{ fontSize: 26, marginBottom: 8 }}>{s.emoji}</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 24, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 11.5, color: THEME.muted, marginTop: 4 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Upcoming matches */}
                <div style={{
                  background: THEME.surface, borderRadius: 22,
                  border: '1.5px solid rgba(59,91,219,0.13)',
                  boxShadow: '0 4px 28px rgba(59,91,219,0.08)',
                  overflow: 'hidden',
                }}>
                  {/* Card header */}
                  <div style={{
                    padding: '18px 22px 16px',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'linear-gradient(135deg,#EDF2FF 0%,#F8F9FF 100%)',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: '#fff', border: '1.5px solid #BAC8FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B5BDB',
                    }}><CalendarDays size={20} /></div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: THEME.ink }}>Upcoming Matches</div>
                      <div style={{ fontSize: 12, color: THEME.muted, marginTop: 2 }}>Matches near you in the next 24 hours</div>
                    </div>
                    <div style={{
                      marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 12, fontWeight: 700, color: '#3B5BDB',
                      background: '#fff', padding: '6px 14px', borderRadius: 999,
                      border: '1.5px solid #BAC8FF',
                    }}>
                      <Clock size={13} /> Next 24h
                    </div>
                  </div>

                  {/* Match list */}
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
{upcoming.length === 0
  ? <div style={{ textAlign: 'center', padding: '2rem', color: THEME.muted, fontSize: 14 }}>No upcoming matches yet — be the first to create one!</div>
  : upcoming.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)
}                  </div>
                </div>

                {/* Community post composer */}
                <Composer
                  value={newPost} onChange={setNewPost}
                  onPost={handlePost} isPosting={posting}
                  onFiles={f => setFiles(p => [...p, ...f])}
                  selectedFiles={files}
                  onRemoveFile={i => setFiles(p => p.filter((_, idx) => idx !== i))}
                />

                {/* Posts feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <SectionHeading label="Community Posts" color={z.color} action="View All" />
                  {posts.map((p, i) => <PostCard key={p.id} post={p} index={i} onLike={() => handleLike(p.id)} />)}
                  {posts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '52px 24px', background: THEME.surface, borderRadius: 20, border: '1.5px dashed rgba(0,0,0,0.09)' }}>
                      <div style={{ fontSize: 38 }}>🌱</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#374151', marginTop: 12 }}>Nothing here yet</div>
                      <div style={{ fontSize: 13, color: THEME.muted, marginTop: 5 }}>Be the first to post something</div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════
                ZONE 02 — ACTIVITY HEATMAP
            ══════════════════════════════════════════ */}
            {activeZone === 'heatmap' && (
              <motion.div key="heatmap"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {/* Streak hero */}
                <div style={{
                  background: THEME.surface, borderRadius: 22, overflow: 'hidden',
                  border: '1.5px solid rgba(232,89,12,0.14)',
                  boxShadow: '0 6px 32px rgba(232,89,12,0.1)',
                  display: 'flex',
                }}>
                  <div style={{ width: 6, background: 'linear-gradient(180deg,#E8590C,#F59F00)' }} />
                  <div style={{ flex: 1, padding: '26px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 58, lineHeight: 1, flexShrink: 0 }}>🔥</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: THEME.muted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>Current Streak</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 36, color: '#E8590C', letterSpacing: '-0.03em', lineHeight: 1 }}>5 Days</div>
                        <div style={{ fontSize: 13, color: '#64748B', marginTop: 6 }}>You've been showing up. Keep it going tomorrow.</div>
                      </div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
                        {[
                          { label: 'Rank', value: 'Top 12%', color: '#E8590C', bg: '#FFF4E6', border: '#FFCBA4' },
                          { label: 'Best', value: '12 Days', color: '#D4A017', bg: '#FFFBEB', border: '#FDE68A' },
                        ].map((s, i) => (
                          <div key={i} style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 14, padding: '12px 18px', textAlign: 'center' }}>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 18, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: 11, color: THEME.muted, marginTop: 2 }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat chips */}
                <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                  {[
                    { label: 'Posts Made', value: '12', icon: <Sparkles size={17} />, color: '#7C3AED', bg: '#FAF5FF', border: '#E9D5FF' },
                    { label: 'Likes Given', value: '48', icon: <Heart size={17} />, color: '#EF4444', bg: '#FFF1F2', border: '#FECACA' },
                    { label: 'This Week', value: '7', icon: <Zap size={17} />, color: '#E8590C', bg: '#FFF4E6', border: '#FFCBA4' },
                    { label: 'Day Streak', value: '5', icon: <Flame size={17} />, color: '#D4A017', bg: '#FFFBEB', border: '#FDE68A' },
                  ].map((s, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }} style={{
                      background: s.bg, borderRadius: 18,
                      padding: '20px 14px', textAlign: 'center',
                      border: `1.5px solid ${s.border}`,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    }}>
                      <div style={{ color: s.color, display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 26, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 11.5, color: THEME.muted, marginTop: 4 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Heatmap card */}
                <div style={{
                  background: THEME.surface, borderRadius: 22,
                  border: '1.5px solid rgba(232,89,12,0.12)',
                  boxShadow: '0 4px 28px rgba(232,89,12,0.08)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '18px 24px 16px', borderBottom: '1px solid rgba(0,0,0,0.05)',
                    background: 'linear-gradient(135deg,#FFF4E6,#FFFBEB)',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', border: '1.5px solid #FFCBA4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8590C' }}>
                      <Activity size={20} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: THEME.ink }}>Community Engagement</div>
                      <div style={{ fontSize: 12, color: THEME.muted, marginTop: 2 }}>Your activity across all sports this year</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#E8590C', background: '#fff', border: '1.5px solid #FFCBA4', padding: '5px 12px', borderRadius: 999 }}>
                      2025
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <ActivityHeatmap category="sports" />
                  </div>
                </div>

                {/* Community bars */}
                <div style={{
                  background: THEME.surface, borderRadius: 22, padding: '24px 26px',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
                }}>
                  <SectionHeading label="Most Active Communities This Week" color={z.color} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {SPORT_TAGS.map((t, i) => {
                      const pct = [88, 74, 63, 51, 43, 31][i];
                      return (
                        <div key={t.label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, alignItems: 'center' }}>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 7 }}>
                              <span style={{ fontSize: 17 }}>{t.emoji}</span> {t.label}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 800, color: t.color }}>{pct}%</span>
                          </div>
                          <div className="ctrack">
                            <motion.div
                              className="cfill"
                              initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                              style={{ background: `linear-gradient(90deg,${t.color},${t.color}88)` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════
                ZONE 03 — VIBE ROOMS
            ══════════════════════════════════════════ */}
            {activeZone === 'viberooms' && (
              <motion.div key="viberooms"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}
              >
                {/* Rooms hero */}
                <div style={{
                  background: THEME.surface, borderRadius: 22, overflow: 'hidden',
                  border: '1.5px solid rgba(12,166,120,0.14)',
                  boxShadow: '0 6px 32px rgba(12,166,120,0.09)',
                  marginBottom: 20,
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg,#E6FCF5,#F0FFF8)',
                    padding: '24px 28px',
                    borderBottom: '1px solid rgba(12,166,120,0.1)',
                    display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
                  }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 18,
                      background: '#fff', border: '1.5px solid #96F2D7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                    }}>🎙</div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 22, color: THEME.ink, letterSpacing: '-0.02em' }}>Vibe Rooms</div>
                      <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Jump into live voice & text rooms across every sport</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: '#fff', border: '1.5px solid #96F2D7',
                        padding: '8px 16px', borderRadius: 999,
                        fontSize: 13, fontWeight: 700, color: '#0CA678',
                      }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0CA678', display: 'inline-block', animation: 'zpulse 2s ease-in-out infinite' }} />
                        Rooms Live
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: THEME.surface, borderRadius: 22, overflow: 'hidden',
                  border: '1.5px solid rgba(12,166,120,0.11)',
                  boxShadow: '0 4px 28px rgba(12,166,120,0.07)',
                }}>
                  <DiscordLikeRooms category="sports" onClose={() => setActiveZone('notifications')} />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </>
  );
}