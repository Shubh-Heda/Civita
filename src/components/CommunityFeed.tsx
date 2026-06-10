import { ArrowLeft, Heart, TrendingUp, MapPin, Camera, Share2, Bookmark, Send, Image as ImageIcon, Loader, MessageCircle, Radio, ChevronDown, Bell, Activity, Users, Zap, Flame, Wind, Volume2, Users2, Trophy, Sparkles, X, UserPlus, Plus, Clock, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { MemoryUpload } from './MemoryUpload';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { supabaseAuth } from '../services/supabaseAuthService'
import { supabase } from '../lib/supabase';
import { DiscordLikeRooms } from './DiscordLikeRooms';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Post {
  id: string;
  user_id: string;
  content: string;
  category: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  created_at: string;
  updated_at: string;
  is_liked?: boolean;
  is_bookmarked?: boolean;
  author?: {
    user_id: string;
    display_name: string;
    username: string;
    avatar_url?: string;
  };
}

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

interface CommunityFeedProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'discovery' | 'create-match' | 'turf-detail' | 'chat' | 'availability' | 'map-view', turfId?: string, matchId?: string) => void;
  matches: Match[];
}

type TabType = 'matches' | 'feed' | 'rooms';

const sportEmoji: Record<string, string> = {
  football: '⚽', cricket: '🏏', basketball: '🏀',
  tennis: '🎾', badminton: '🏸', volleyball: '🏐',
  default: '🏟️',
};
const getSportEmoji = (sport: string) => sportEmoji[sport?.toLowerCase()] || sportEmoji.default;

const sportColor: Record<string, string> = {
  football: '#22c55e', cricket: '#f59e0b', basketball: '#f97316',
  tennis: '#84cc16', badminton: '#06b6d4', volleyball: '#a855f7',
  default: '#6366f1',
};
const getSportColor = (sport: string) => sportColor[sport?.toLowerCase()] || sportColor.default;

// Scoreboard digit component — the signature element
function ScoreboardNumber({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#f59e0b',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          textShadow: '0 0 20px rgba(245,158,11,0.5)',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: '#64748b', textTransform: 'uppercase', marginTop: '0.2rem' }}>
        {label}
      </div>
    </div>
  );
}

export function CommunityFeed({ onNavigate, matches }: CommunityFeedProps) {
  const [showMemoryUpload, setShowMemoryUpload] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [postsPage, setPostsPage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('matches');
  const [pulse, setPulse] = useState(false);
  const vibeRoomsRef = useRef<HTMLDivElement | null>(null);
  const POSTS_PER_PAGE = 5;

  // New match popup
  const [newMatchPopup, setNewMatchPopup] = useState<Match | null>(null);
  const prevMatchCountRef = useRef(matches.length);

  useEffect(() => {
    if (matches.length > prevMatchCountRef.current) {
      const newest = matches[matches.length - 1];
      setNewMatchPopup(newest);
      const t = setTimeout(() => setNewMatchPopup(null), 8000);
      prevMatchCountRef.current = matches.length;
      return () => clearTimeout(t);
    }
    prevMatchCountRef.current = matches.length;
  }, [matches]);

  // Scoreboard pulse
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { loadPosts(); initializeUser(); }, []);

  const initializeUser = async () => {
    const user = supabaseAuth.getCurrentUser();
    setCurrentUserId(user?.id || 'demo-user');
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const user = supabaseAuth.getCurrentUser();
      if (user) {
        const { data, error } = await supabase.from('community_posts').select('*').eq('category', 'sports').order('created_at', { ascending: false }).limit(20);
        if (data && data.length > 0 && !error) { setPosts(data as Post[]); setLoading(false); return; }
      }
      loadMockPosts();
    } catch { loadMockPosts(); } finally { setLoading(false); }
  };

  const loadMockPosts = () => {
    setPosts([
      { id: 'mock-1', user_id: 'user-1', content: 'Just finished an amazing match! 💫 Huge shoutout to everyone for bringing such great energy. This community makes every game special! 🙏⚽', category: 'sports', like_count: 24, comment_count: 8, share_count: 2, created_at: new Date(Date.now() - 7200000).toISOString(), updated_at: new Date(Date.now() - 7200000).toISOString(), author: { user_id: 'user-1', display_name: 'Sarah Martinez', username: 'sarah_m' } },
      { id: 'mock-2', user_id: 'user-2', content: 'Just got back from an incredible inter-city match! 🏏 Our team represented Ahmedabad and we won by 45 runs. The atmosphere was electric! 🎉', category: 'sports', like_count: 156, comment_count: 43, share_count: 12, created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date(Date.now() - 86400000).toISOString(), author: { user_id: 'user-2', display_name: 'Jason Kumar', username: 'jason_k' } },
      { id: 'mock-3', user_id: 'user-3', content: 'Recovery tips after intense matches 💪\n\n1. Hydrate within 30 minutes\n2. Light stretching\n3. Protein-rich snack\n4. Quality sleep — 7-8 hours', category: 'sports', like_count: 92, comment_count: 31, share_count: 18, created_at: new Date(Date.now() - 172800000).toISOString(), updated_at: new Date(Date.now() - 172800000).toISOString(), author: { user_id: 'user-3', display_name: 'Coach Priya', username: 'coach_priya' } },
      { id: 'mock-4', user_id: 'user-4', content: 'Looking for 3 more players for Sunday football at SG Highway! We have 7 confirmed. DM me or join through the match plan 🔥', category: 'sports', like_count: 37, comment_count: 12, share_count: 5, created_at: new Date(Date.now() - 3600000).toISOString(), updated_at: new Date(Date.now() - 3600000).toISOString(), author: { user_id: 'user-4', display_name: 'Arjun Patel', username: 'arjun_p' } },
    ]);
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && selectedFiles.length === 0) { toast.error('Write something first'); return; }
    setIsPosting(true);
    try {
      const user = supabaseAuth.getCurrentUser();
      let mediaUrls: string[] = [];
      if (selectedFiles.length > 0 && user) {
        setUploadingMedia(true);
        for (const file of selectedFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Date.now()}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from('community-media').upload(fileName, file);
          if (uploadData && !uploadError) { const { data: { publicUrl } } = supabase.storage.from('community-media').getPublicUrl(fileName); mediaUrls.push(publicUrl); }
        }
        setUploadingMedia(false);
      }
      if (user) {
        const { data, error } = await supabase.from('community_posts').insert({ author_id: user.id, content: newPostContent, category: 'sports', media_urls: mediaUrls.length > 0 ? mediaUrls : null }).select().single();
        if (data && !error) {
          setPosts(prev => [{ ...data, like_count: 0, comment_count: 0, share_count: 0, author: { user_id: user.id, display_name: 'You', username: 'you' } }, ...prev]);
          setNewPostContent(''); setSelectedFiles([]); toast.success('Posted! 🎉'); return;
        }
      }
      setPosts(prev => [{ id: `mock-${Date.now()}`, user_id: currentUserId, content: newPostContent, category: 'sports', like_count: 0, comment_count: 0, share_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), author: { user_id: currentUserId, display_name: 'You', username: 'you' } }, ...prev]);
      setNewPostContent(''); toast.success('Posted! 🎉');
    } catch { toast.error('Failed to post'); } finally { setIsPosting(false); }
  };

  const handleLike = (postId: string) => setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_liked: !p.is_liked, like_count: p.is_liked ? p.like_count - 1 : p.like_count + 1 } : p));
  const handleBookmark = (postId: string) => { const post = posts.find(p => p.id === postId); setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_bookmarked: !p.is_bookmarked } : p)); toast.success(post?.is_bookmarked ? 'Removed' : 'Saved 🔖'); };

  const formatTime = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600000), day = Math.floor(diff / 86400000);
    if (m < 1) return 'Just now'; if (m < 60) return `${m}m`; if (h < 24) return `${h}h`; if (day < 7) return `${day}d`;
    return new Date(d).toLocaleDateString();
  };

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const completedMatches = matches.filter(m => m.status === 'completed');

  return (
    <div style={{ minHeight: '100vh', background: '#080d14', color: '#f1f5f9', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── New Match Popup ─────────────────────────────────── */}
      <AnimatePresence>
        {newMatchPopup && (
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, width: '100%', maxWidth: 380, padding: '0 16px' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f1f12 0%, #0a1628 100%)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 16, padding: '16px', boxShadow: '0 0 40px rgba(34,197,94,0.2), 0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{getSportEmoji(newMatchPopup.sport)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#22c55e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>New Match Live</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1s infinite' }} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: '#f8fafc', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{newMatchPopup.title}</p>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{newMatchPopup.turfName} · {newMatchPopup.date} · {newMatchPopup.time}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button onClick={() => { setNewMatchPopup(null); onNavigate('finder'); }} style={{ flex: 1, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <UserPlus size={13} /> Join Now
                    </button>
                    <button onClick={() => setNewMatchPopup(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: 8, padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <motion.div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: 'linear-gradient(90deg, #22c55e, #16a34a)' }} initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 8, ease: 'linear' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMemoryUpload && <MemoryUpload onClose={() => setShowMemoryUpload(false)} onUploadComplete={() => { toast.success('Memory shared!'); loadPosts(); }} />}

      {/* ── Scoreboard Hero ──────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(180deg, #0d1520 0%, #080d14 100%)', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 40 }}>
        {/* Top nav */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => onNavigate('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', color: '#f59e0b', textTransform: 'uppercase' }}>⚡ Live · Sports Community</div>
          </div>
          <button onClick={() => setShowMemoryUpload(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', borderRadius: 20, padding: '6px 14px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            <Camera size={14} /> Share
          </button>
        </div>

        {/* Scoreboard strip */}
        <div style={{ borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', background: 'rgba(0,0,0,0.4)', padding: '16px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: pulse ? '#22c55e' : '#16a34a', transition: 'background 0.3s', boxShadow: pulse ? '0 0 8px #22c55e' : 'none' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live</span>
            </div>
            <ScoreboardNumber value={upcomingMatches.length || '—'} label="Open Matches" />
            <div style={{ width: 1, height: 40, background: '#1e293b' }} />
            <ScoreboardNumber value={matches.length || '—'} label="Total Plans" />
            <div style={{ width: 1, height: 40, background: '#1e293b' }} />
            <ScoreboardNumber value="892" label="This Week" />
            <div style={{ width: 1, height: 40, background: '#1e293b' }} />
            <ScoreboardNumber value="2.8k" label="Athletes" />
            <button onClick={() => onNavigate('create-match')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(34,197,94,0.3)', whiteSpace: 'nowrap' }}>
              <Plus size={15} /> Plan Match
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>

        {/* ── Tab Bar ────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {([
            { id: 'matches', label: 'Match Feed', icon: <Zap size={15} />, count: matches.length },
            { id: 'feed', label: 'Community', icon: <Users size={15} />, count: posts.length },
            { id: 'rooms', label: 'Vibe Rooms', icon: <Radio size={15} />, count: null },
          ] as { id: TabType; label: string; icon: React.ReactNode; count: number | null }[]).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 8px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, transition: 'all 0.2s',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #1e3a2f, #162032)' : 'transparent',
                color: activeTab === tab.id ? '#22c55e' : '#64748b',
                boxShadow: activeTab === tab.id ? 'inset 0 0 0 1px rgba(34,197,94,0.3)' : 'none',
              }}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== null && tab.count > 0 && (
                <span style={{ background: activeTab === tab.id ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)', color: activeTab === tab.id ? '#22c55e' : '#64748b', fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── MATCH FEED TAB ─────────────────────────────── */}
          {activeTab === 'matches' && (
            <motion.div key="matches" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}>

              {/* Discover banner */}
              <motion.button onClick={() => onNavigate('discovery')} whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
                style={{ width: '100%', background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.12) 100%)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem' }}>Discover All Matches Near You</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>Browse open plans · Filter by sport · Join instantly</div>
                  </div>
                </div>
                <div style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                  Explore <ChevronDown style={{ transform: 'rotate(-90deg)' }} size={16} />
                </div>
              </motion.button>

              {/* Upcoming matches */}
              {upcomingMatches.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 3, height: 18, background: '#22c55e', borderRadius: 2 }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#22c55e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Open · Join Now</span>
                    <div style={{ flex: 1, height: 1, background: '#1e293b' }} />
                    <span style={{ fontSize: '0.7rem', color: '#475569' }}>{upcomingMatches.length} available</span>
                  </div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {upcomingMatches.map((match, idx) => (
                      <motion.div key={match.id || idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                        style={{ background: 'linear-gradient(135deg, #0d1520 0%, #0a1218 100%)', border: `1px solid ${getSportColor(match.sport)}30`, borderLeft: `3px solid ${getSportColor(match.sport)}`, borderRadius: 14, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
                        {/* Subtle sport-color glow */}
                        <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle, ${getSportColor(match.sport)}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{getSportEmoji(match.sport)}</div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>{match.title}</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', fontSize: '0.75rem', color: '#64748b' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{match.turfName}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{match.date} · {match.time}</span>
                                {match.location && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📍 {match.location}</span>}
                              </div>
                              {match.amount && (
                                <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, padding: '3px 8px', fontSize: '0.72rem', color: '#f59e0b', fontWeight: 600 }}>
                                  💰 ₹{match.amount} split equally
                                </div>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: '3px 10px' }}>
                              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 4px #22c55e' }} />
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#22c55e', letterSpacing: '0.05em' }}>OPEN</span>
                            </div>
                            <button onClick={() => { toast.success(`Joining "${match.title}"! 🎉`); onNavigate('finder'); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 6, background: `linear-gradient(135deg, ${getSportColor(match.sport)}, ${getSportColor(match.sport)}cc)`, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 16px ${getSportColor(match.sport)}40`, whiteSpace: 'nowrap' }}>
                              <UserPlus size={13} /> Join
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed matches */}
              {completedMatches.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 3, height: 18, background: '#475569', borderRadius: 2 }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Completed</span>
                    <div style={{ flex: 1, height: 1, background: '#1e293b' }} />
                  </div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {completedMatches.map((match, idx) => (
                      <div key={match.id || idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, opacity: 0.7 }}>
                        <span style={{ fontSize: 22 }}>{getSportEmoji(match.sport)}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{match.title}</div>
                          <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: 2 }}>{match.turfName} · {match.date}</div>
                        </div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569', background: 'rgba(71,85,105,0.15)', border: '1px solid #334155', borderRadius: 20, padding: '3px 8px' }}>DONE</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {matches.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🏟️</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>No matches planned yet</div>
                  <div style={{ fontSize: '0.875rem', color: '#475569', marginBottom: 24 }}>Be the first to create a match plan for your community</div>
                  <button onClick={() => onNavigate('create-match')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(34,197,94,0.3)' }}>
                    <Plus size={16} /> Create First Match
                  </button>
                </motion.div>
              )}

              {/* How it works */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: 14, padding: '20px', marginTop: 8 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>How Match Plans Work</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  {[
                    { n: '01', title: 'Create a Plan', desc: 'Pick a turf, date & time. Set player limits.', color: '#22c55e' },
                    { n: '02', title: 'Players Join Free', desc: 'Anyone can join the group chat at zero cost.', color: '#f59e0b' },
                    { n: '03', title: 'Soft Lock', desc: 'Min players reached? Payment window opens.', color: '#f97316' },
                    { n: '04', title: 'Game On', desc: 'Pay your share. Final team confirmed. Play!', color: '#6366f1' },
                  ].map(step => (
                    <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: "'Courier New', monospace", fontSize: '1.1rem', fontWeight: 900, color: step.color, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{step.n}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#e2e8f0', marginBottom: 3 }}>{step.title}</div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: 1.5 }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── COMMUNITY FEED TAB ─────────────────────────── */}
          {activeTab === 'feed' && (
            <motion.div key="feed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>

              {/* Post composer */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 14, padding: '16px' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                    {currentUserId ? currentUserId.charAt(0).toUpperCase() : 'Y'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)}
                      placeholder="Share a match moment, ask for players, celebrate wins..."
                      rows={3} disabled={isPosting}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #1e293b', borderRadius: 10, padding: '10px 14px', color: '#e2e8f0', fontSize: '0.88rem', resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6 }} />
                    {selectedFiles.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                        {selectedFiles.map((file, idx) => (
                          <div key={idx} style={{ position: 'relative' }}>
                            <img src={URL.createObjectURL(file)} alt="preview" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid #1e293b' }} />
                            <button onClick={() => setSelectedFiles(p => p.filter((_, i) => i !== idx))} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', border: 'none', borderRadius: '50%', width: 18, height: 18, color: '#fff', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <input type="file" id="media-upload" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={e => { if (e.target.files) setSelectedFiles(p => [...p, ...Array.from(e.target.files!)]); }} />
                        <label htmlFor="media-upload" style={{ cursor: 'pointer', color: '#475569', padding: '6px', borderRadius: 6, display: 'flex', alignItems: 'center' }}><ImageIcon size={17} /></label>
                        <button onClick={() => setShowMemoryUpload(true)} style={{ background: 'none', border: 'none', color: '#475569', padding: '6px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Camera size={17} /></button>
                      </div>
                      <button onClick={handleCreatePost} disabled={(!newPostContent.trim() && !selectedFiles.length) || isPosting || uploadingMedia}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', opacity: (!newPostContent.trim() && !selectedFiles.length) ? 0.4 : 1 }}>
                        {isPosting || uploadingMedia ? <><Loader size={13} className="animate-spin" /> Posting...</> : <><Send size={13} /> Post</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity snapshot */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[{ label: 'Posts', val: posts.length, icon: '📝', color: '#22c55e' }, { label: 'Likes', val: posts.reduce((a, p) => a + p.like_count, 0), icon: '❤️', color: '#f43f5e' }, { label: 'This Week', val: 7, icon: '📅', color: '#f59e0b' }, { label: 'Streak', val: 5, icon: '🔥', color: '#f97316' }].map((s, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.04 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: '1.3rem', fontWeight: 900, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: 2, fontWeight: 600, letterSpacing: '0.05em' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Posts */}
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}><Loader size={24} color="#22c55e" /></motion.div>
                </div>
              ) : (
                posts.slice(0, (postsPage + 1) * POSTS_PER_PAGE).map((post, idx) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${(post.author?.display_name?.charCodeAt(0) || 0) * 7 % 360}, 60%, 45%), hsl(${(post.author?.display_name?.charCodeAt(0) || 0) * 11 % 360}, 70%, 35%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                        {post.author?.display_name?.charAt(0) || 'U'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#e2e8f0' }}>{post.author?.display_name || 'User'}</span>
                          {post.author?.username && <span style={{ fontSize: '0.75rem', color: '#475569' }}>@{post.author.username}</span>}
                          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#334155' }}>{formatTime(post.created_at)}</span>
                        </div>
                        <p style={{ marginTop: 8, fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{post.content}</p>
                      </div>
                    </div>
                    <div style={{ padding: '10px 16px 12px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 20 }}>
                      <button onClick={() => handleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: post.is_liked ? '#f43f5e' : '#475569', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, padding: 0 }}>
                        <Heart size={16} fill={post.is_liked ? '#f43f5e' : 'none'} /> {post.like_count}
                      </button>
                      <button onClick={() => setShowComments(showComments === post.id ? null : post.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: showComments === post.id ? '#22c55e' : '#475569', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, padding: 0 }}>
                        <MessageCircle size={16} /> {post.comment_count}
                      </button>
                      <button onClick={() => { setPosts(p => p.map(x => x.id === post.id ? { ...x, share_count: x.share_count + 1 } : x)); toast.success('Copied link 🔗'); }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, padding: 0 }}>
                        <Share2 size={16} /> {post.share_count}
                      </button>
                      <button onClick={() => handleBookmark(post.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: post.is_bookmarked ? '#f59e0b' : '#334155', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        <Bookmark size={16} fill={post.is_bookmarked ? '#f59e0b' : 'none'} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {showComments === post.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          style={{ borderTop: '1px solid #1e293b', background: 'rgba(0,0,0,0.2)', padding: '14px 16px', overflow: 'hidden' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                            {[{ n: 'J', name: 'John Doe', text: "Great match! Let's play again soon 🔥" }, { n: 'S', name: 'Sarah M', text: 'Amazing energy today! 💪' }].map((c, i) => (
                              <div key={i} style={{ display: 'flex', gap: 8 }}>
                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #475569, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>{c.n}</div>
                                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1e293b', borderRadius: 10, padding: '8px 12px', flex: 1 }}>
                                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', marginBottom: 3 }}>{c.name}</div>
                                  <div style={{ fontSize: '0.83rem', color: '#94a3b8' }}>{c.text}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." onKeyDown={e => { if (e.key === 'Enter' && commentText.trim()) { toast.success('Comment posted!'); setCommentText(''); setPosts(p => p.map(x => x.id === post.id ? { ...x, comment_count: x.comment_count + 1 } : x)); } }}
                              style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid #1e293b', borderRadius: 8, padding: '8px 12px', color: '#e2e8f0', fontSize: '0.83rem', outline: 'none', fontFamily: 'inherit' }} />
                            <button onClick={() => { if (commentText.trim()) { toast.success('Comment posted!'); setCommentText(''); setPosts(p => p.map(x => x.id === post.id ? { ...x, comment_count: x.comment_count + 1 } : x)); } }}
                              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', border: 'none', borderRadius: 8, padding: '8px 12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <Send size={14} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
              {!loading && (postsPage + 1) * POSTS_PER_PAGE < posts.length && (
                <button onClick={() => setPostsPage(p => p + 1)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', borderRadius: 10, padding: '12px', color: '#475569', cursor: 'pointer', fontSize: '0.83rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <ChevronDown size={16} /> Load More
                </button>
              )}
            </motion.div>
          )}

          {/* ── VIBE ROOMS TAB ─────────────────────────────── */}
          {activeTab === 'rooms' && (
            <motion.div key="rooms" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} ref={vibeRoomsRef}>
              <DiscordLikeRooms category="sports" onClose={() => setActiveTab('matches')} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}