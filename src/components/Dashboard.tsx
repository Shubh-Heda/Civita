import { useState } from 'react';
import { motion } from 'framer-motion'; 
import { 
  Users, Heart, Sparkles, MessageCircle, 
  Calendar, TrendingUp, Star, MapPin, Shield, GraduationCap, 
  Award, CreditCard, Trophy, ArrowLeft 
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentNotification } from './PaymentNotification';
import { PaymentModal } from './PaymentModal';
import { EmptyState } from './EmptyState';
import { MatchCountdownTimer } from './MatchCountdownTimer';

const sportsHeroImage = 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1080&q=80';

interface Match {
  id: string;
  title: string;
  turfName: string;
  date: string;
  time: string;
  sport: string;
  status: 'upcoming' | 'completed';
  visibility: string;
  paymentOption: string;
  amount?: number;
  location?: string;
}

interface UserProfile {
  name: string;
  bio: string;
  interests: string[];
  location: string;
  joinDate: string;
  avatarUrl?: string; 
}

type NavigationPages = 
  | 'dashboard' | 'profile' | 'community' | 'sports-community' 
  | 'reflection' | 'finder' | 'discovery' | 'create-match' 
  | 'turf-detail' | 'sports-chat' | 'help' | 'availability' 
  | 'landing' | 'comprehensive-dashboard' | 'match-history' | 'modern-chat' | 'chat' | 'sports-events';

interface DashboardProps {
  onNavigate: (page: NavigationPages, turfId?: string, matchId?: string) => void;
  userProfile: UserProfile;
  matches: Match[];
}

// ── Quick Action card data ──────────────────────────────────────────────────
const quickActionCards = [
  {
    id: 'discovery' as NavigationPages,
    label: 'Discover Matches',
    sub: 'Browse plans near you',
    grad: 'linear-gradient(135deg, #FF3B5C 0%, #FF8C00 100%)',
    pattern: 'radial' as const,
    badge: 'LIVE',
    sport: '⚽',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2"/>
        <line x1="16.5" y1="16.5" x2="23" y2="23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="11" y1="7" x2="11" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11" y1="13" x2="11" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="7" y1="11" x2="9" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="13" y1="11" x2="15" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'create-match' as NavigationPages,
    label: 'Create Match',
    sub: 'Schedule a new game',
    grad: 'linear-gradient(135deg, #00C896 0%, #0099FF 100%)',
    pattern: 'lines' as const,
    badge: 'NEW',
    sport: '🏀',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="5" width="20" height="18" rx="3" stroke="white" strokeWidth="2.2"/>
        <line x1="3" y1="10" x2="23" y2="10" stroke="white" strokeWidth="2"/>
        <line x1="8" y1="3" x2="8" y2="8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="18" y1="3" x2="18" y2="8" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="13" y1="14" x2="13" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="17" x2="16" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'match-history' as NavigationPages,
    label: 'My Matches',
    sub: "See every match you've played",
    grad: 'linear-gradient(135deg, #FFB800 0%, #FF5E00 100%)',
    pattern: 'dots' as const,
    badge: 'STATS',
    sport: '🏆',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3L16.5 9.5L24 10.5L18.5 15.5L20 22.5L13 19L6 22.5L7.5 15.5L2 10.5L9.5 9.5L13 3Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'sports-events' as NavigationPages,
    label: 'Events & Tournaments',
    sub: "What's happening near you",
    grad: 'linear-gradient(135deg, #8B21FF 0%, #FF2DAF 100%)',
    pattern: 'zigzag' as const,
    badge: 'HOT🔥',
    sport: '🎾',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M5 4H21L18 13H8L5 4Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M8 13L10 22H16L18 13" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
        <line x1="10" y1="22" x2="16" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="13" y1="7" x2="13" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="9" x2="16" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function PatternBg({ type }: { type: 'radial' | 'lines' | 'dots' | 'zigzag' }) {
  if (type === 'radial') return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">
      <circle cx="85%" cy="18%" r="60" fill="white" fillOpacity="0.35"/>
      <circle cx="15%" cy="85%" r="35" fill="white" fillOpacity="0.12"/>
    </svg>
  );
  if (type === 'lines') return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.13 }} xmlns="http://www.w3.org/2000/svg">
      {[...Array(10)].map((_, i) => (
        <line key={i} x1={-30 + i * 26} y1="0" x2={i * 26 + 70} y2="180" stroke="white" strokeWidth="1.5"/>
      ))}
    </svg>
  );
  if (type === 'dots') return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.16 }} xmlns="http://www.w3.org/2000/svg">
      {[...Array(5)].map((_, r) =>
        [...Array(9)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 26 + 8} cy={r * 26 + 8} r="2.5" fill="white"/>
        ))
      )}
    </svg>
  );
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.14 }} xmlns="http://www.w3.org/2000/svg">
      {[0, 1, 2, 3, 4].map(i => (
        <polyline key={i} points={`0,${18 + i * 32} 18,${4 + i * 32} 36,${18 + i * 32} 54,${4 + i * 32} 72,${18 + i * 32} 90,${4 + i * 32} 108,${18 + i * 32} 130,${4 + i * 32} 160,${18 + i * 32} 200,${18 + i * 32}`} fill="none" stroke="white" strokeWidth="2"/>
      ))}
    </svg>
  );
}

export function Dashboard({ onNavigate, userProfile, matches = [] }: DashboardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');

  const handlePayNow = (match: Match) => {
    setSelectedMatch(match);
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" 
  style={{ 
    backgroundColor: '#fcfcf8', // Your clean, happy cream base
  }}
>
  {/* The Ghost Turf Background */}
 /* REPLACE your background container style with this uniform version */
<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" 
     style={{ backgroundColor: '#fcfcf8' }}>
  
  <div 
    className="absolute inset-0 opacity-[0.06]" 
    style={{
      backgroundImage: `url('/assets/turf.avif')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />
  {/* REMOVED the radial-gradient spotlight here so it is uniform */}
</div>
      {/* Content Container */}
      <div className="relative z-10">
        {upcomingMatches.map(match => (
          match.amount ? (
            <PaymentNotification
              key={match.id}
              matchDate={match.date}
              matchTime={match.time}
              amountPaid={0}
              totalAmount={match.amount}
              turfName={match.turfName}
            />
          ) : null
        ))}

        {/* Header Block — UNCHANGED */}
        <header className="civita-nav">
          <div className="civita-nav-ribbon" aria-hidden>
            <span className="civita-nav-ribbon-sports" />
            <span className="civita-nav-ribbon-events" />
            <span className="civita-nav-ribbon-gaming" />
          </div>

          <div className="civita-nav-inner">
            <div className="civita-nav-brand-group">
              <motion.button
                type="button"
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
                className="civita-nav-back-btn"
                onClick={() => onNavigate('landing')}
                aria-label="Back to home"
              >
                <span className="civita-nav-mark">
                  <ArrowLeft className="civita-nav-mark-icon" strokeWidth={2.4} />
                </span>
              </motion.button>

              <div className="civita-nav-title">
                <span className="civita-nav-title-main">CIVITA</span>
                <span className="civita-nav-title-sub">city playbook</span>
              </div>

              <div className="civita-brand-edition-badge">
                <span>SPORTS</span>
              </div>
            </div>

            <nav className="civita-nav-menu" aria-label="Actions">
              <ul className="civita-nav-list">
                <li>
                  <motion.button
                    type="button"
                    whileHover={{ rotate: 0, y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('sports-chat')}
                    className="civita-nav-tab"
                    style={{ '--tab-accent': '#1d4ed8', '--tab-fill': '#eff6ff' } as React.CSSProperties}
                  >
                    <div className="civita-tab-content-inline">
                      <MessageCircle className="civita-tab-icon" size={15} strokeWidth={2.5} />
                      <span className="civita-nav-tab-label hidden-mobile">Chats</span>
                      <span className="civita-nav-badge">3</span>
                    </div>
                  </motion.button>
                </li>

                <li className="hidden-tablet">
                  <motion.button
                    type="button"
                    whileHover={{ rotate: 0, y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('sports-community')}
                    className="civita-nav-tab"
                    style={{ '--tab-accent': '#16a34a', '--tab-fill': '#f0fdf4' } as React.CSSProperties}
                  >
                    <div className="civita-tab-content-inline">
                      <Users className="civita-tab-icon" size={15} strokeWidth={2.5} />
                      <span className="civita-nav-tab-label">Community</span>
                    </div>
                  </motion.button>
                </li>

                <li>
                  <motion.button
                    type="button"
                    whileHover={{ rotate: 0, y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('comprehensive-dashboard')}
                    className="civita-nav-tab"
                    style={{ '--tab-accent': '#be123c', '--tab-fill': '#fff1f2' } as React.CSSProperties}
                  >
                    <div className="civita-tab-content-inline">
                      <Sparkles className="civita-tab-icon" size={15} strokeWidth={2.5} />
                      <span className="civita-nav-tab-label hidden-mobile">Features</span>
                      <span className="civita-nav-badge feature-badge">17</span>
                    </div>
                  </motion.button>
                </li>

                <li>
                  <motion.button
                    type="button"
                    whileHover={{ rotate: 3, y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('profile')}
                    className="civita-nav-profile-btn"
                    aria-label="Go to profile"
                  >
                    {userProfile?.avatarUrl ? (
                      <img src={userProfile.avatarUrl} alt={userProfile.name || 'User Profile'} className="civita-profile-img" />
                    ) : (
                      <span className="civita-profile-fallback">
                        {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </motion.button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="civita-nav-footer-line" aria-hidden />

          <style>{`
            .civita-nav { position: sticky; top: 0; z-index: 50; background: #f7f4ec; border-bottom: 3px solid #0f172a; }
            .civita-nav-ribbon { display: grid; grid-template-columns: 1fr 1fr 1fr; height: 5px; }
            .civita-nav-ribbon-sports { background: #16a34a; }
            .civita-nav-ribbon-events { background: #be123c; }
            .civita-nav-ribbon-gaming { background: #1d4ed8; }
            .civita-nav-inner { max-width: 80rem; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
            .civita-nav-brand-group { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
.civita-nav-inner { max-width: 100%; margin: 0; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }            .civita-nav-mark { width: 40px; height: 40px; display: grid; place-items: center; background: #0f172a; color: #f8fafc; border: 2px solid #0f172a; border-radius: 10px; box-shadow: 2.5px 2.5px 0 #16a34a; }
            .civita-nav-mark-icon { width: 18px; height: 18px; }
            .civita-nav-title { display: flex; flex-direction: column; gap: 1px; }
            .civita-nav-title-main { font-size: 26px; font-weight: 900; letter-spacing: -0.03em; line-height: 0.95; color: #0f172a; text-transform: uppercase; }
            .civita-nav-title-sub { font-size: 10px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #64748b; padding-left: 2px; }
            .civita-brand-edition-badge { background: #16a34a; color: #fff; border: 2px solid #0f172a; padding: 4px 10px; border-radius: 6px; box-shadow: 2px 2px 0 #0f172a; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; line-height: 1; margin-left: 4px; transform: rotate(-1.5deg); }
            .civita-nav-menu { display: flex; justify-content: flex-end; align-items: center; margin-left: auto; }
            .civita-nav-list { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; gap: 8px; }
            .civita-nav-tab { position: relative; display: flex; align-items: center; padding: 8px 12px; border: 2px solid #0f172a; border-radius: 10px; background: #fff; cursor: pointer; box-shadow: 2.5px 2.5px 0 #0f172a; transition: all 0.15s ease; }
            .civita-tab-content-inline { display: flex; align-items: center; gap: 6px; }
            .civita-tab-icon { color: #0f172a; }
            .civita-nav-tab:hover { background: var(--tab-fill); border-color: var(--tab-accent); box-shadow: 2.5px 2.5px 0 var(--tab-accent); }
            .civita-nav-tab:hover .civita-tab-icon { color: var(--tab-accent); }
            .civita-nav-tab-label { font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1; }
            .civita-nav-badge { display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; padding: 1px 5px; border-radius: 5px; background: var(--tab-accent); color: #fff; border: 1.5px solid #0f172a; line-height: 1; }
            .civita-nav-badge.feature-badge { background: #be123c; }
            .civita-nav-profile-btn { width: 36px; height: 36px; padding: 0; border: 2px solid #0f172a; border-radius: 50%; background: #ffd60a; box-shadow: 2.5px 2.5px 0 #0f172a; cursor: pointer; overflow: hidden; display: flex; align-items: center; justify-content: center; }
            .civita-profile-img { width: 100%; height: 100%; object-fit: cover; }
            .civita-profile-fallback { font-size: 13px; font-weight: 900; color: #0f172a; }
            .civita-nav-footer-line { height: 0; }
            @media (max-width: 640px) { .civita-nav-inner { padding: 10px 14px; } .hidden-mobile { display: none !important; } .civita-nav-tab { padding: 6px 8px; } .civita-brand-edition-badge { display: none; } }
            @media (max-width: 768px) { .hidden-tablet { display: none !important; } }
          `}</style>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">

          {/* Welcome Section — glass on dark */}
          <div className="mb-8 relative">
  <div style={{
    position: 'relative',
    padding: '2rem 2.5rem',
    overflow: 'hidden',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #0a1628 0%, #0d1f12 100%)',
    borderLeft: '4px solid #10b981',
  }}>
    {/* pitch grid texture */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.05,
      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, #10b981 40px, #10b981 41px),
        repeating-linear-gradient(0deg, transparent, transparent 40px, #10b981 40px, #10b981 41px)`,
    }} />
    {/* floodlight glow */}
    <div style={{
      position: 'absolute', top: 0, right: 0,
      width: '300px', height: '300px',
      background: 'radial-gradient(ellipse at top right, rgba(16,185,129,0.15) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />

    <div className="relative flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-white">
          Welcome back, <span style={{ background: 'linear-gradient(90deg,#10b981,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userProfile.name}</span>! 👋
        </h1>
        <p className="text-white/60">Your community is growing stronger with every match</p>
      </div>
      <div className="hidden md:block text-6xl">🤗</div>
    </div>
  </div>
</div>

          {/* Hero Image Section — UNCHANGED */}
          <div className="mb-8 relative group overflow-hidden rounded-3xl shadow-2xl">
            <img src={sportsHeroImage} alt="Friends playing sports together" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <h2 className="text-xl font-bold text-white mb-3">🎯 The Spirit of Connection</h2>
                <p className="text-white/90 mb-4 max-w-2xl">
                  Every match is more than a game—it's a chance to build friendships, create memories, and belong to something special.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => onNavigate('finder')} className="bg-white text-cyan-600 hover:bg-slate-100">
                    Join a Match Today
                  </Button>
                  <Button onClick={() => onNavigate('sports-community')} variant="outline" className="border-white text-white hover:bg-white/20">
                    Explore Community
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights — glass cards on dark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
  {[
    { label: 'Trust Score', value: '4.8', unit: '/5.0', sub: "You're known for reliability and respect 🌟", icon: Shield, accent: '#059669', light: '#f8fdfb', dim: '#d1fae5' },
    { label: 'Friendship Streak', value: '12', unit: 'matches', sub: 'With Sarah & the weekend crew 🔥', icon: TrendingUp, accent: '#0891b2', light: '#f8fcfd', dim: '#cffafe' },
    { label: 'Community Impact', value: '28', unit: 'connections', sub: "You've helped 8 people find their first match ✨", icon: Heart, accent: '#7c3aed', light: '#fcfaff', dim: '#ede9fe' },
  ].map(({ label, value, unit, sub, icon: Icon, accent, light, dim }) => (
    <div key={label} className="relative overflow-hidden rounded-2xl"
      style={{ background: light, border: `1.5px solid ${dim}` }}>

      {/* Top scorecard bar */}
      <div style={{
        background: dim,
        borderBottom: `1px solid ${dim}`,
        padding: '0.5rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent }}>
          {label}
        </span>
        <div className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: `${accent}18` }}>
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        </div>
      </div>

      {/* Score body */}
      <div className="px-5 py-4">
        <div className="flex items-end gap-2 mb-1">
          <span style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '3rem',
            fontWeight: 900,
            lineHeight: 1,
            color: '#111',
            letterSpacing: '-0.03em',
          }}>
            {value}
          </span>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: accent,
            marginBottom: '0.5rem',
            fontFamily: "'Courier New', monospace",
          }}>
            {unit}
          </span>
        </div>

        {/* Divider tick marks like a scoresheet */}
        <div style={{
          display: 'flex', gap: '3px', marginBottom: '0.75rem'
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: '3px', borderRadius: '2px',
              background: i < Math.round(parseFloat(value) / (unit === '/5.0' ? 0.5 : unit === 'matches' ? 1.5 : 3))
                ? accent
                : dim,
            }} />
          ))}
        </div>

        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{sub}</p>
      </div>
    </div>
  ))}
</div>

          {/* ── Quick Actions — NEW sports card design ── */}
          <div className="mb-12">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

              .qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

              .qa-card {
                position: relative; overflow: hidden; border-radius: 22px;
                padding: 22px 20px 18px; cursor: pointer; border: none; text-align: left;
                transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease;
                box-shadow: 0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2);
                min-height: 158px; display: flex; flex-direction: column; justify-content: space-between;
                -webkit-tap-highlight-color: transparent;
              }
              .qa-card:hover { transform: translateY(-5px) scale(1.03); box-shadow: 0 18px 44px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.25); }
              .qa-card:active { transform: scale(0.97); box-shadow: 0 2px 8px rgba(0,0,0,0.3); }

              .qa-badge {
                display: inline-flex; align-items: center;
                font-family: 'DM Sans', sans-serif; font-size: 9.5px; font-weight: 700;
                letter-spacing: 0.1em; padding: 3px 9px; border-radius: 20px;
                background: rgba(0,0,0,0.25); color: rgba(255,255,255,0.95);
                border: 1px solid rgba(255,255,255,0.22); margin-bottom: 10px; width: fit-content;
                backdrop-filter: blur(4px);
              }

              .qa-icon-wrap {
                width: 46px; height: 46px; border-radius: 14px;
                background: rgba(255,255,255,0.18); display: flex; align-items: center;
                justify-content: center; border: 1.5px solid rgba(255,255,255,0.28);
                margin-bottom: 10px; transition: background 0.2s, transform 0.2s;
              }
              .qa-card:hover .qa-icon-wrap { background: rgba(255,255,255,0.3); transform: rotate(-6deg) scale(1.08); }

              .qa-sport-emoji {
                position: absolute; bottom: 14px; right: 16px; font-size: 34px;
                opacity: 0.16; transform: rotate(12deg); pointer-events: none;
                transition: opacity 0.2s, transform 0.25s ease;
              }
              .qa-card:hover .qa-sport-emoji { opacity: 0.3; transform: rotate(0deg) scale(1.2); }

              .qa-title {
                font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 21px;
                letter-spacing: 0.05em; color: white; line-height: 1.1; margin: 0 0 4px;
                text-shadow: 0 1px 6px rgba(0,0,0,0.25);
              }
              .qa-sub { font-family: 'DM Sans', sans-serif; font-size: 11.5px; color: rgba(255,255,255,0.65); font-weight: 500; line-height: 1.4; margin: 0; }

              .qa-shine {
                position: absolute; top: -50%; right: -15%; width: 120px; height: 120px;
                border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.26) 0%, transparent 70%);
                pointer-events: none;
              }

              .qa-bar { height: 3px; border-radius: 99px; background: rgba(255,255,255,0.32); width: 35%; transition: width 0.3s cubic-bezier(.34,1.56,.64,1); margin-top: 14px; }
              .qa-card:hover .qa-bar { width: 65%; background: rgba(255,255,255,0.6); }
            `}</style>

            <div className="qa-grid">
              {quickActionCards.map(card => (
                <button
                  key={card.id}
                  className="qa-card"
                  style={{ background: card.grad }}
                  onClick={() => onNavigate(card.id)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <PatternBg type={card.pattern} />
                  <div className="qa-shine" />
                  <span className="qa-sport-emoji">{card.sport}</span>
                  <div>
                    <div className="qa-badge">{card.badge}</div>
                    <div className="qa-icon-wrap">{card.icon}</div>
                    <p className="qa-title">{card.label}</p>
                    <p className="qa-sub">{card.sub}</p>
                  </div>
                  <div className="qa-bar" />
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Matches Section — glass on dark */}
          <div className="rounded-2xl border border-white/10 shadow-lg p-6 mb-8"
            style={{
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  borderLeft: '3px solid #9ca3af',
}}>
  <div className="flex items-center gap-2 mb-4">
    <div style={{
      background: '#ecfdf5',
      border: '1px solid #a7f3d0',
      borderRadius: '8px',
      padding: '6px',
      display: 'flex',
    }}>
 <Calendar className="w-4 h-4" style={{ color: '#9ca3af' }} />    </div>
    <h2 className="text-xl font-bold" style={{ color: '#111' }}>Your Upcoming Matches</h2>
    <span style={{
      marginLeft: 'auto',
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#9ca3af',
      background: '#f3f4f6',
      border: '1px solid #d1d5db',
      borderRadius: '100px',
      padding: '0.2rem 0.65rem',
    }}>Upcoming</span>
  </div>

            {upcomingMatches.length > 0 && upcomingMatches[0] && (
              <div className="mb-4">
                <MatchCountdownTimer
                  matchDate={upcomingMatches[0].date}
                  matchTime={upcomingMatches[0].time}
                  matchTitle={upcomingMatches[0].title}
                  showDismiss={true}
                />
              </div>
            )}

            {upcomingMatches.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No upcoming matches yet"
                description="Ready to make new friends? Join a match or create one to get started!"
                actionLabel="Find Matches"
                onAction={() => onNavigate('finder')}
                secondaryActionLabel="Create Match"
                onSecondaryAction={() => onNavigate('create-match')}
              />
            ) : (
              <div className="space-y-4">
                {upcomingMatches.map(match => (
                  <div key={match.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop"
                      alt="Football field"
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-white">{match.title}</h3>
                          <p className="text-white/50 text-sm">{match.turfName}{match.location ? ` • ${match.location}` : ''}</p>
                        </div>
                        <Badge className="bg-cyan-500 text-white">{match.sport}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-3">
                        <span>{match.date}, {match.time}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 8/10 players</span>
                        {match.amount && (
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <CreditCard className="w-4 h-4" /> ₹{match.amount}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-white/20 flex items-center justify-center text-xs text-white shadow-md font-bold">S</div>
                            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white/20 flex items-center justify-center text-xs text-white shadow-md font-bold">M</div>
                            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white/20 flex items-center justify-center text-xs text-white shadow-md font-bold">R</div>
                          </div>
                          <span className="text-sm text-white/50">Friends attending</span>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button onClick={() => onNavigate('sports-chat', undefined, match.id)} variant="outline" size="sm"
                            className="gap-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                            <MessageCircle className="w-4 h-4" /> Chat
                          </Button>
                          {match.paymentOption === 'split' && match.amount && (
                            <Button onClick={() => handlePayNow(match)} size="sm"
                              className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                              <CreditCard className="w-4 h-4" /> Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coaching CTA — glass on dark */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20"
style={{ background: 'linear-gradient(135deg, #f0fdf8 0%, #ecfdf5 60%, #f0f9ff 100%)' }}>

  {/* Diagonal slash accent */}
  <div style={{
    position: 'absolute', top: 0, right: 0, width: '45%', height: '100%',
    background: 'linear-gradient(135deg, transparent 30%, rgba(16,185,129,0.06) 100%)',
    borderLeft: '1px solid rgba(16,185,129,0.1)',
    clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
  }} />

  {/* Top accent bar */}
  <div style={{ height: '3px', background: 'linear-gradient(90deg, #10b981, #06b6d4 60%, transparent)' }}/>

  {/* Dot grid texture */}
  <div style={{
    position: 'absolute', inset: 0, opacity: 0.04,
    backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    pointerEvents: 'none',
  }} />

  <div className="relative z-10 p-8 text-center">
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3"
      style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', boxShadow: '0 8px 32px rgba(16,185,129,0.3)' }}>
      <GraduationCap className="w-8 h-8 text-gray-800" />
    </div>

    {/* Tag */}
    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase"
      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
      ✦ Professional Coaching
    </div>

    <h2 className="mb-2 text-2xl font-bold text-gray-800">Level Up Your Game</h2>
    <p className="text-gray-500 mb-6 max-w-2xl mx-auto font-medium">
      Get professional coaching at your favorite turfs. Expert guidance, flexible plans, and personalized training from ₹2,999/month.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
      {[
        { icon: Award, color: '#10b981', bg: 'rgba(16,185,129,0.08)', label: 'Expert Coaches' },
        { icon: Calendar, color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', label: 'Flexible Schedule' },
        { icon: TrendingUp, color: '#10b981', bg: 'rgba(16,185,129,0.08)', label: 'Track Progress' },
      ].map(({ icon: Icon, color, bg, label }) => (
        <div key={label} className="flex items-center gap-2 rounded-xl px-4 py-2"
          style={{ background: bg, border: `1px solid ${color}30` }}>
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-semibold" style={{ color: 'rgba(4, 44, 74, 0.36)' }}>{label}</span>
        </div>
      ))}
    </div>

    <button onClick={() => onNavigate('turf-detail', '1')}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
      style={{
        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
        boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
      }}>
      <GraduationCap className="w-5 h-5" /> Explore Coaching Plans
    </button>
  </div>
</div>

        </div>

        {showPaymentModal && selectedMatch && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            matchDate={selectedMatch.date}
            matchTime={selectedMatch.time}
            amountPaid={0}
            totalAmount={selectedMatch.amount || 0}
            turfName={selectedMatch.turfName}
          />
        )}
      </div>
    </div>
  );
}

export function TurfCard({ 
  id, image, sport, name, location, rating, price, trustScore, communitySize, onNavigate
}: { 
  id: string; image: string; sport: string; name: string; location: string; rating: number; price: string; trustScore: number; communitySize: number;
  onNavigate: (page: NavigationPages, turfId?: string, matchId?: string) => void;
}) {
  return (
    <button
      onClick={() => onNavigate('turf-detail', id)}
      className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:scale-105 transition-all text-left w-full"
    >
      <div className="relative">
        <ImageWithFallback src={image} alt={name} className="w-full h-48 object-cover" />
        <Badge className="absolute top-3 right-3 bg-white text-slate-700 shadow-md">{sport}</Badge>
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-bold text-slate-900">{name}</h3>
        <div className="flex items-center gap-1 text-slate-600 mb-3 text-sm">
          <MapPin className="w-4 h-4" /> <span>{location}</span>
        </div>
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> <span>{rating}</span>
          </div>
          <span className="text-cyan-600 font-semibold">{price}</span>
        </div>
        <div className="flex items-center gap-4 pt-3 border-t text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <ShieldIcon className="w-4 h-4 text-cyan-600" /> <span>{trustScore} Trust</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <Users className="w-4 h-4 text-emerald-600" /> <span>{communitySize} Active</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}