import { useState } from 'react';
import { X, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

interface JoinMatchModalProps {
  match: {
    matchId: string;
    title: string;
    sport: string;
    turfName: string;
    location: string;
    date: string;
    time: string;
    currentPlayers: number;
    minPlayers: number;
    maxPlayers?: number;
    organizer: string;
  };
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

const SPORT_EMOJI: Record<string, string> = {
  Football: '⚽', Cricket: '🏏', Basketball: '🏀',
  Tennis: '🎾', Badminton: '🏸', Swimming: '🏊',
  Volleyball: '🏐', Running: '🏃', Gym: '💪',
};

const SPORT_COLOR: Record<string, string> = {
  Football: '#0CA678', Cricket: '#3B5BDB', Basketball: '#E8590C',
  Tennis: '#D4A017', Badminton: '#7C3AED', Swimming: '#0284C7',
};

export function JoinMatchModal({ match, onConfirm, onClose }: JoinMatchModalProps) {
  const [joining, setJoining] = useState(false);

  const emoji = SPORT_EMOJI[match.sport] || '🎯';
  const color = SPORT_COLOR[match.sport] || '#00e5a0';
  const maxP = match.maxPlayers ?? match.minPlayers;
  const slots = Math.max(0, maxP - match.currentPlayers);

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short',
      });
    } catch { return d; }
  };

  const handleConfirm = async () => {
    setJoining(true);
    await onConfirm();
    setJoining(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', zIndex: 101,
        bottom: 0, left: 0, right: 0,
        background: '#161a22',
        borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.08)',
        borderBottom: 'none',
        padding: '0 0 2rem',
        animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        maxWidth: 520,
        margin: '0 auto',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        `}</style>

        {/* Drag handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.15)',
          margin: '14px auto 0',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50%', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#7a8499',
          }}
        >
          <X size={15} />
        </button>

        <div style={{ padding: '1.5rem 1.75rem 0' }}>

          {/* Sport icon + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, flexShrink: 0,
              background: `${color}15`,
              border: `1.5px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26,
            }}>{emoji}</div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#7a8499', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                You're joining
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.6rem', letterSpacing: '0.04em',
                color: '#f0f2f5', lineHeight: 1,
              }}>{match.title}</h2>
            </div>
          </div>

          {/* Match details */}
          <div style={{
            background: '#1e2330',
            borderRadius: 14,
            padding: '1rem 1.1rem',
            marginBottom: '1.25rem',
            display: 'flex', flexDirection: 'column', gap: '0.6rem',
          }}>
            {[
              { icon: <MapPin size={13} />, value: `${match.turfName}, ${match.location}` },
              { icon: <Clock size={13} />, value: `${formatDate(match.date)} · ${match.time?.slice(0, 5) ?? match.time}` },
              { icon: <Users size={13} />, value: `${match.currentPlayers} joined · ${slots} spot${slots !== 1 ? 's' : ''} left` },
            ].map(({ icon, value }, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontSize: '0.85rem', color: '#c2c8d4',
              }}>
                <span style={{ color, flexShrink: 0 }}>{icon}</span>
                {value}
              </div>
            ))}
          </div>

          {/* Message */}
          <div style={{
            background: `${color}0d`,
            border: `1px solid ${color}25`,
            borderRadius: 12,
            padding: '0.9rem 1.1rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: '0.88rem', color: '#c2c8d4', lineHeight: 1.6, margin: 0 }}>
              Once you join, you'll be added to the <strong style={{ color: '#f0f2f5' }}>match group chat</strong> where you can coordinate with {match.organizer} and other players. 👋
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button
              onClick={handleConfirm}
              disabled={joining}
              style={{
                width: '100%', padding: '0.9rem',
                background: joining ? `${color}80` : `linear-gradient(135deg, ${color}, ${color}cc)`,
                color: '#000', border: 'none', borderRadius: '12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem', fontWeight: 700,
                cursor: joining ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              {joining ? 'Joining…' : <> Yes, join & go to chat <ArrowRight size={15} /> </>}
            </button>

            <button
              onClick={onClose}
              disabled={joining}
              style={{
                width: '100%', padding: '0.8rem',
                background: 'transparent',
                color: '#7a8499', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem', fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Maybe later
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default JoinMatchModal;