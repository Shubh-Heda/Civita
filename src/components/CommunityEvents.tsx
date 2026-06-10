import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, MapPin, Clock, Users, Trophy, Star, Check, X, Search
} from 'lucide-react';
import { toast } from 'sonner';
import { communityEventsService, CommunityEvent } from '../services/communityEventsService';

interface CommunityEventsProps {
  category: 'sports' | 'events' | 'parties' | 'gaming';
  onNavigate: (page: string) => void;
}

// ── Category config ───────────────────────────────────────────
const CATEGORY_CONFIG = {
  sports:  { emoji: '⚽', label: 'Sports',  grad: ['#f97316','#ef4444'], accent: '#f97316', bg: '#fff7ed' },
  events:  { emoji: '🎵', label: 'Events',  grad: ['#8b5cf6','#ec4899'], accent: '#8b5cf6', bg: '#fdf4ff' },
  parties: { emoji: '🎉', label: 'Parties', grad: ['#ec4899','#f97316'], accent: '#ec4899', bg: '#fdf2f8' },
  gaming:  { emoji: '🎮', label: 'Gaming',  grad: ['#6366f1','#8b5cf6'], accent: '#6366f1', bg: '#f5f3ff' },
};

const LEVEL_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  beginner:     { color: '#16a34a', bg: '#dcfce7', label: 'Beginner' },
  intermediate: { color: '#d97706', bg: '#fef3c7', label: 'Intermediate' },
  advanced:     { color: '#dc2626', bg: '#fee2e2', label: 'Advanced' },
};

export function CommunityEvents({ category, onNavigate }: CommunityEventsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [filterLevel, setFilterLevel] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const cfg = CATEGORY_CONFIG[category];
  const gradCss = `linear-gradient(135deg, ${cfg.grad[0]}, ${cfg.grad[1]})`;

  const categoryEvents = communityEventsService.getEventsByCategory(category);
  const stats = communityEventsService.getEventStats(category);

  const filteredEvents = categoryEvents.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = filterLevel === 'all' || event.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

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

  const fillPct = (e: CommunityEvent) =>
    Math.min(100, Math.round((e.participants / e.maxParticipants) * 100));

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Top bar ── */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky', top: 0, zIndex: 20,
        padding: '0',
      }}>
        {/* Gradient stripe */}
        <div style={{ height: 4, background: gradCss }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => onNavigate(category === 'sports' ? 'dashboard' : `${category}-dashboard`)}
            style={{ background: '#f5f5f5', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} style={{ color: '#555' }} />
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.6rem' }}>{cfg.emoji}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111' }}>Community Events</span>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.65rem',
                borderRadius: 100, background: cfg.bg, color: cfg.accent,
                border: `1px solid ${cfg.accent}30`, letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>{cfg.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Discover and join amazing {cfg.label.toLowerCase()} events</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>

        {/* ── Stat strip ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Events', value: stats.total, color: cfg.accent },
            { label: 'Upcoming', value: stats.upcoming, color: '#16a34a' },
            { label: 'Participants', value: stats.totalParticipants.toLocaleString(), color: '#d97706' },
            { label: 'Avg Rating', value: `${stats.averageRating.toFixed(1)} ⭐`, color: '#7c3aed' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: '#fff',
              border: '1px solid #ebebeb',
              borderTop: `3px solid ${color}`,
              borderRadius: 12,
              padding: '0.9rem 1rem',
            }}>
              <div style={{ fontSize: '0.68rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color, fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* ── Search & filter ── */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
            <input
              style={{
                width: '100%', padding: '0.7rem 1rem 0.7rem 2.4rem',
                background: '#fff', border: '1px solid #e5e5e5',
                borderRadius: 10, fontSize: '0.9rem', color: '#111',
                outline: 'none', boxSizing: 'border-box',
              }}
              placeholder="Search events or tags…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {category === 'sports' && (
            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} style={{
              padding: '0.7rem 1rem', background: '#fff',
              border: '1px solid #e5e5e5', borderRadius: 10,
              fontSize: '0.88rem', color: '#333', cursor: 'pointer',
            }}>
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          )}
        </div>

        {/* ── Event cards ── */}
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16, border: '1px solid #ebebeb' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
            <p style={{ fontWeight: 700, color: '#111', marginBottom: '0.4rem' }}>No events found</p>
            <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '1rem' }}>Try adjusting your search or filters</p>
            <button onClick={() => { setSearchQuery(''); setFilterLevel('all'); }} style={{
              padding: '0.6rem 1.25rem', background: gradCss, color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
            }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filteredEvents.map((event, index) => {
              const fill = fillPct(event);
              const isRegistered = registeredEvents.includes(event.id);
              const levelCfg = LEVEL_CONFIG[event.level];
              const spotsLeft = event.maxParticipants - event.participants;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    background: '#fff',
                    border: '1px solid #ebebeb',
                    borderRadius: 16,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
                >
                  {/* Card banner */}
                  <div style={{
                    height: 120,
                    background: gradCss,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {/* Confetti dots */}
                    {[...Array(6)].map((_, i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        width: 8 + (i % 3) * 6, height: 8 + (i % 3) * 6,
                        borderRadius: '50%',
                        background: `rgba(255,255,255,${0.08 + i * 0.03})`,
                        top: `${10 + i * 14}%`, left: `${5 + i * 16}%`,
                      }} />
                    ))}
                    <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))', zIndex: 1 }}>{event.image}</span>
                    {isRegistered && (
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        background: '#fff', borderRadius: '50%',
                        width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}>
                        <Check size={14} style={{ color: '#16a34a' }} />
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1rem' }}>
                    {/* Tags row */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                      {event.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.68rem', fontWeight: 600,
                          padding: '0.15rem 0.55rem', borderRadius: 100,
                          background: cfg.bg, color: cfg.accent,
                          border: `1px solid ${cfg.accent}25`,
                        }}>{tag}</span>
                      ))}
                      {levelCfg && (
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 600,
                          padding: '0.15rem 0.55rem', borderRadius: 100,
                          background: levelCfg.bg, color: levelCfg.color,
                        }}>{levelCfg.label}</span>
                      )}
                    </div>

                    <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#111', margin: '0 0 0.4rem', lineHeight: 1.3 }}>
                      {event.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#777', margin: '0 0 0.75rem', lineHeight: 1.5,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {event.description}
                    </p>

                    {/* Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem' }}>
                      {[
                        { icon: Clock, text: `${event.date} · ${event.time}` },
                        { icon: MapPin, text: event.location },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#666' }}>
                          <Icon size={12} style={{ color: cfg.accent, flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Participants bar */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#888', marginBottom: '0.3rem' }}>
                        <span>{event.participants}/{event.maxParticipants} joined</span>
                        <span style={{ color: spotsLeft < 5 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                          {spotsLeft} spots left
                        </span>
                      </div>
                      <div style={{ height: 4, background: '#f0f0f0', borderRadius: 100, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${fill}%`, background: gradCss, borderRadius: 100, transition: 'width 0.4s' }} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #f5f5f5' }}>
                      <div style={{ fontWeight: 900, fontSize: '1.1rem', color: event.registrationFee === 0 ? '#16a34a' : '#111' }}>
                        {event.registrationFee === 0 ? 'FREE' : `₹${event.registrationFee}`}
                      </div>
                      {event.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111' }}>{event.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Event detail modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem', zIndex: 50,
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: 20,
                maxWidth: 580,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
              }}
            >
              {/* Modal banner */}
              <div style={{
                height: 180, background: gradCss,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', borderRadius: '20px 20px 0 0', overflow: 'hidden',
              }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: 12 + (i % 4) * 8, height: 12 + (i % 4) * 8,
                    borderRadius: '50%',
                    background: `rgba(255,255,255,${0.06 + i * 0.02})`,
                    top: `${5 + i * 11}%`, left: `${3 + i * 12}%`,
                  }} />
                ))}
                <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))', zIndex: 1 }}>
                  {selectedEvent.image}
                </span>
                <button onClick={() => setSelectedEvent(null)} style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%', width: 34, height: 34,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff',
                }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ padding: '1.5rem' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {selectedEvent.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.72rem', fontWeight: 700,
                      padding: '0.2rem 0.65rem', borderRadius: 100,
                      background: cfg.bg, color: cfg.accent,
                      border: `1px solid ${cfg.accent}25`,
                    }}>{tag}</span>
                  ))}
                  {LEVEL_CONFIG[selectedEvent.level] && (
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700,
                      padding: '0.2rem 0.65rem', borderRadius: 100,
                      background: LEVEL_CONFIG[selectedEvent.level].bg,
                      color: LEVEL_CONFIG[selectedEvent.level].color,
                    }}>{LEVEL_CONFIG[selectedEvent.level].label}</span>
                  )}
                </div>

                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#111', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                  {selectedEvent.title}
                </h2>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {selectedEvent.description}
                </p>

                {/* Key info grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[
                    { icon: Clock, label: 'Date & Time', value: `${selectedEvent.date} · ${selectedEvent.time}`, color: '#4a6ea8' },
                    { icon: MapPin, label: 'Location', value: selectedEvent.location, color: '#dc2626' },
                    { icon: Users, label: 'Participants', value: `${selectedEvent.participants}/${selectedEvent.maxParticipants}`, color: '#16a34a' },
                    ...(selectedEvent.prize ? [{ icon: Trophy, label: 'Prize', value: selectedEvent.prize, color: '#d97706' }] : []),
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} style={{
                      background: '#fafafa', border: '1px solid #ebebeb',
                      borderRadius: 10, padding: '0.75rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                        <Icon size={13} style={{ color }} />
                        <span style={{ fontSize: '0.68rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>{label}</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111' }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Organizer */}
                <div style={{
                  background: '#fafafa', border: '1px solid #ebebeb',
                  borderRadius: 12, padding: '1rem', marginBottom: '1rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{selectedEvent.organizer.avatar}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: '#111', fontSize: '0.9rem' }}>{selectedEvent.organizer.name}</span>
                      {selectedEvent.organizer.verified && (
                        <span style={{
                          background: '#dbeafe', color: '#1d4ed8',
                          fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem',
                          borderRadius: 100,
                        }}>✓ Verified</span>
                      )}
                    </div>
                    {selectedEvent.rating && (
                      <div style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                        <Star size={11} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                        {selectedEvent.rating} · {selectedEvent.reviews} reviews
                      </div>
                    )}
                  </div>
                </div>

                {/* Fee + spots */}
                <div style={{
                  background: gradCss,
                  borderRadius: 12, padding: '1rem 1.25rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  marginBottom: '1rem',
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Registration Fee</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', fontFamily: 'monospace' }}>
                      {selectedEvent.registrationFee === 0 ? 'FREE' : `₹${selectedEvent.registrationFee}`}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Spots Left</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', fontFamily: 'monospace' }}>
                      {selectedEvent.maxParticipants - selectedEvent.participants}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleRegister(selectedEvent.id)}
                    style={{
                      flex: 1, padding: '0.875rem',
                      background: registeredEvents.includes(selectedEvent.id) ? '#fee2e2' : gradCss,
                      color: registeredEvents.includes(selectedEvent.id) ? '#dc2626' : '#fff',
                      border: registeredEvents.includes(selectedEvent.id) ? '1.5px solid #fca5a5' : 'none',
                      borderRadius: 12, fontWeight: 800, fontSize: '0.95rem',
                      cursor: 'pointer', transition: 'opacity 0.2s',
                    }}
                  >
                    {registeredEvents.includes(selectedEvent.id) ? 'Cancel Registration' : 'Register Now →'}
                  </button>
                  <button style={{
                    padding: '0.875rem 1.25rem',
                    background: '#f5f5f5', border: 'none',
                    borderRadius: 12, fontWeight: 700, fontSize: '0.875rem',
                    color: '#555', cursor: 'pointer',
                  }}>
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}