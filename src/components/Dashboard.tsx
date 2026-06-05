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

export function Dashboard({ onNavigate, userProfile, matches = [] }: DashboardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');

  const handlePayNow = (match: Match) => {
    setSelectedMatch(match);
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen relative bg-[#cadcb9] p-4 sm:p-6 lg:p-12 overflow-x-hidden">
      
      {/* 1. Mowed Lawn Grass Texture & Alternating Turf Stripes */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #cadcb9, #cadcb9 60px, #c2d5b0 60px, #c2d5b0 120px),
            radial-gradient(circle at 100% 100%, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '120px 100%, 8px 8px'
        }}
      />

      {/* 2. Outer Court Boundaries */}
      <div className="absolute inset-6 sm:inset-8 lg:inset-12 pointer-events-none border-[3px] border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.1)]" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[6%] right-[6%] border-x-[3px] border-white/70" />
        <div className="absolute top-[25%] left-[6%] right-[6%] h-[3px] bg-white/70" />
        <div className="absolute bottom-[25%] left-[6%] right-[6%] h-[3px] bg-white/70" />
        <div className="absolute top-[25%] bottom-[25%] left-1/2 w-[3px] bg-white/70 transform -translate-x-1/2" />
        <div className="absolute top-0 left-1/2 w-[3px] h-4 bg-white/80 transform -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-[3px] h-4 bg-white/80 transform -translate-x-1/2" />
      </div>

      {/* 3. The Tennis Net Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-slate-900/10 pointer-events-none flex items-center justify-between px-2 transform -translate-y-1/2" aria-hidden="true">
        <div className="w-full h-[1px] bg-white/30 border-t border-dashed border-white/40" />
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

        {/* Header Block */}
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
                    style={{
                      '--tab-accent': '#1d4ed8',
                      '--tab-fill': '#eff6ff',
                    } as React.CSSProperties}
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
                    style={{
                      '--tab-accent': '#16a34a',
                      '--tab-fill': '#f0fdf4',
                    } as React.CSSProperties}
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
                    style={{
                      '--tab-accent': '#be123c',
                      '--tab-fill': '#fff1f2',
                    } as React.CSSProperties}
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
                      <img 
                        src={userProfile.avatarUrl} 
                        alt={userProfile.name || 'User Profile'} 
                        className="civita-profile-img"
                      />
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
            
            .civita-nav-inner { 
              max-width: 80rem; 
              margin: 0 auto; 
              padding: 12px 24px; 
              display: flex; 
              align-items: center; 
              justify-content: space-between; 
              gap: 16px; 
            }
            
            .civita-nav-brand-group { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
            .civita-nav-back-btn { border: 0; background: transparent; cursor: pointer; padding: 0; flex-shrink: 0; }
            
            .civita-nav-mark { 
              width: 40px; 
              height: 40px; 
              display: grid; 
              place-items: center; 
              background: #0f172a; 
              color: #f8fafc; 
              border: 2px solid #0f172a; 
              border-radius: 10px; 
              box-shadow: 2.5px 2.5px 0 #16a34a; 
            }

            .civita-nav-mark-icon { width: 18px; height: 18px; }

            .civita-nav-title { display: flex; flex-direction: column; gap: 1px; }
            .civita-nav-title-main { font-size: 26px; font-weight: 900; letter-spacing: -0.03em; line-height: 0.95; color: #0f172a; text-transform: uppercase; }
            .civita-nav-title-sub { font-size: 10px; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #64748b; padding-left: 2px; }

            .civita-brand-edition-badge {
              background: #16a34a; 
              color: #fff;
              border: 2px solid #0f172a;
              padding: 4px 10px;
              border-radius: 6px;
              box-shadow: 2px 2px 0 #0f172a;
              font-size: 11px;
              font-weight: 900;
              letter-spacing: 0.1em;
              line-height: 1;
              margin-left: 4px;
              transform: rotate(-1.5deg); 
            }

            .civita-nav-menu { display: flex; justify-content: flex-end; align-items: center; margin-left: auto; }
            .civita-nav-list { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; gap: 8px; }
            
            .civita-nav-tab { 
              position: relative; 
              display: flex; 
              align-items: center; 
              padding: 8px 12px; 
              border: 2px solid #0f172a; 
              border-radius: 10px; 
              background: #fff; 
              cursor: pointer; 
              box-shadow: 2.5px 2.5px 0 #0f172a; 
              transition: all 0.15s ease; 
            }
            .civita-tab-content-inline { display: flex; align-items: center; gap: 6px; }
            .civita-tab-icon { color: #0f172a; }
            .civita-nav-tab:hover { background: var(--tab-fill); border-color: var(--tab-accent); box-shadow: 2.5px 2.5px 0 var(--tab-accent); }
            .civita-nav-tab:hover .civita-tab-icon { color: var(--tab-accent); }
            .civita-nav-tab-label { font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1; }
            .civita-nav-badge { display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; padding: 1px 5px; border-radius: 5px; background: var(--tab-accent); color: #fff; border: 1.5px solid #0f172a; line-height: 1; }
            .civita-nav-badge.feature-badge { background: #be123c; }

            .civita-nav-profile-btn {
              width: 36px;
              height: 36px;
              padding: 0;
              border: 2px solid #0f172a;
              border-radius: 50%;
              background: #ffd60a; 
              box-shadow: 2.5px 2.5px 0 #0f172a;
              cursor: pointer;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .civita-profile-img { width: 100%; height: 100%; object-fit: cover; }
            .civita-profile-fallback { font-size: 13px; font-weight: 900; color: #0f172a; }

            .civita-nav-footer-line { height: 0; }

            @media (max-width: 640px) {
              .civita-nav-inner { padding: 10px 14px; }
              .hidden-mobile { display: none !important; }
              .civita-nav-tab { padding: 6px 8px; }
              .civita-brand-edition-badge { display: none; } 
            }
            @media (max-width: 768px) { .hidden-tablet { display: none !important; } }
          `}</style>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          {/* Welcome Section */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="mb-2 text-2xl font-bold text-slate-900">
                    Welcome back, <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">{userProfile.name}</span>! 👋
                  </h1>
                  <p className="text-slate-600">Your community is growing stronger with every match</p>
                </div>
                <div className="hidden md:block">
                  <div className="text-6xl">⚽</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="mb-8 relative group overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src={sportsHeroImage} 
              alt="Friends playing sports together"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <h2 className="text-xl font-bold text-white mb-3">🎯 The Spirit of Connection</h2>
                <p className="text-white/90 mb-4 max-w-2xl">
                  Every match is more than a game—it's a chance to build friendships, create memories, and belong to something special.
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => onNavigate('finder')}
                    className="bg-white text-cyan-600 hover:bg-slate-100"
                  >
                    Join a Match Today
                  </Button>
                  <Button 
                    onClick={() => onNavigate('sports-community')}
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                  >
                    Explore Community
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm border border-cyan-200 shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 group-hover:text-white transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-cyan-600 group-hover:text-cyan-100 mb-1 text-sm font-semibold">Trust Score</p>
                    <div className="flex items-baseline gap-2 text-2xl font-bold">
                      <span>4.8</span>
                      <span className="text-sm font-normal text-cyan-600 group-hover:text-cyan-100">/5.0</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-cyan-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <Shield className="w-6 h-6 text-cyan-600 group-hover:text-white" />
                  </div>
                </div>
                <p className="text-sm text-slate-600 group-hover:text-cyan-100">You're known for reliability and respect 🌟</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 group-hover:text-white transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-emerald-600 group-hover:text-emerald-100 mb-1 text-sm font-semibold">Friendship Streak</p>
                    <div className="flex items-baseline gap-2 text-2xl font-bold">
                      <span>12</span>
                      <span className="text-sm font-normal text-emerald-600 group-hover:text-emerald-100">matches</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <TrendingUp className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                  </div>
                </div>
                <p className="text-sm text-slate-600 group-hover:text-emerald-100">With Sarah & the weekend crew 🔥</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 group-hover:text-white transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-purple-600 group-hover:text-purple-100 mb-1 text-sm font-semibold">Community Impact</p>
                    <div className="flex items-baseline gap-2 text-2xl font-bold">
                      <span>28</span>
                      <span className="text-sm font-normal text-purple-600 group-hover:text-purple-100">connections</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <Heart className="w-6 h-6 text-purple-600 group-hover:text-white" />
                  </div>
                </div>
                <p className="text-sm text-slate-600 group-hover:text-purple-100">You've helped 8 people find their first match ✨</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => onNavigate('discovery')}
              className="relative overflow-hidden rounded-2xl p-6 text-left group border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
              <Sparkles className="w-6 h-6 text-white mb-3" />
              <span className="block text-white font-black text-lg leading-tight mb-1">Discover Matches</span>
              <span className="block text-white/70 text-sm">Browse plans near you</span>
            </button>

            <button
              onClick={() => onNavigate('create-match')}
              className="relative overflow-hidden rounded-2xl p-6 text-left group border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-50 -translate-y-8 translate-x-8" />
              <Calendar className="w-6 h-6 text-emerald-600 mb-3" />
              <span className="block text-slate-900 font-black text-lg leading-tight mb-1">Create Match</span>
              <span className="block text-slate-500 text-sm">Schedule a new game</span>
            </button>

            <button
              onClick={() => onNavigate('match-history')}
              className="relative overflow-hidden rounded-2xl p-6 text-left group border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-amber-50 -translate-y-8 translate-x-8" />
              <Trophy className="w-6 h-6 text-amber-500 mb-3" />
              <span className="block text-slate-900 font-black text-lg leading-tight mb-1">My Matches</span>
              <span className="block text-slate-500 text-sm">See every match you've played</span>
            </button>

            <button
              onClick={() => onNavigate('sports-events')}
              className="relative overflow-hidden rounded-2xl p-6 text-left group border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              style={{ background: 'linear-gradient(135deg, #0891b2, #6366f1)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
              <Star className="w-6 h-6 text-white mb-3" />
              <span className="block text-white font-black text-lg leading-tight mb-1">Events & Tournaments</span>
              <span className="block text-white/70 text-sm">What's happening near you</span>
            </button>
          </div>

          {/* Upcoming Matches Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-cyan-600" />
              <h2 className="text-xl font-bold text-slate-900">Your Upcoming Matches</h2>
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
                  <div key={match.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl border border-cyan-200 hover:shadow-md transition-shadow">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop"
                      alt="Football field"
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900">{match.title}</h3>
                          <p className="text-slate-600 text-sm">{match.turfName}{match.location ? ` • ${match.location}` : ''}</p>
                        </div>
                        <Badge className="bg-cyan-500 text-white">{match.sport}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                        <span>{match.date}, {match.time}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> 8/10 players
                        </span>
                        {match.amount && (
                          <span className="flex items-center gap-1 text-emerald-600 font-medium">
                            <CreditCard className="w-4 h-4" /> ₹{match.amount}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center text-xs text-white shadow-md font-bold">S</div>
                            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white shadow-md font-bold">M</div>
                            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-xs text-white shadow-md font-bold">R</div>
                          </div>
                          <span className="text-sm text-slate-600">Friends attending</span>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button
                            onClick={() => onNavigate('sports-chat', undefined, match.id)}
                            variant="outline"
                            size="sm"
                            className="gap-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                          >
                            <MessageCircle className="w-4 h-4" /> Chat
                          </Button>
                          {match.paymentOption === 'split' && match.amount && (
                            <Button
                              onClick={() => handlePayNow(match)}
                              size="sm"
                              className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                            >
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

          {/* Coaching CTA */}
          <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden border border-emerald-200">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
              
              <h2 className="mb-2 text-2xl font-bold text-slate-900">Level Up Your Game</h2>
              
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto font-medium">
                Get professional coaching at your favorite turfs. Expert guidance, flexible plans, and personalized training from ₹2,999/month.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-200 shadow-sm">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-700">Expert Coaches</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-200 shadow-sm">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-semibold text-slate-700">Flexible Schedule</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-slate-200 shadow-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-700">Track Progress</span>
                </div>
              </div>
              
              <Button 
                onClick={() => onNavigate('turf-detail', '1')}
                size="lg"
                className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg gap-2 font-bold transition-all hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5" /> Explore Coaching Plans
              </Button>
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