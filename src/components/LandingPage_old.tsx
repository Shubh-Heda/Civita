import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  CircleDot,
  Flame,
  Gamepad2,
  Heart,
  Home,
  MessageCircle,
  Music,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import sportsImg from '../assets/categories/sports.jpg';
import eventsImg from '../assets/categories/events.jpg';
import gamingImg from '../assets/categories/gaming.jpg';
import { supabase } from '../lib/supabase';

type Section = 'home' | 'explore' | 'community' | 'profile';
const SECTION_KEYS: Section[] = ['home', 'explore', 'community', 'profile'];

interface LandingPageProps {
  onGetStarted: () => void;
  onCategorySelect?: (category: 'sports' | 'events' | 'gaming') => void;
}

export function LandingPage({ onGetStarted, onCategorySelect }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackFeature, setFeedbackFeature] = useState<'Sports' | 'Events' | 'Gaming' | ''>('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const liveStats = useMemo(
    () => ({
      activeNow: 134,
      matchesToday: 49,
      newFriends: 11,
    }),
    []
  );

  const navItems: Array<{ key: Section; label: string; icon: typeof Home }> = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'explore', label: 'Explore', icon: BookOpen },
    { key: 'community', label: 'Community', icon: Users },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  const getSectionFromHash = (hash: string): Section => {
    const candidate = hash.replace('#', '').toLowerCase();
    return SECTION_KEYS.includes(candidate as Section) ? (candidate as Section) : 'home';
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    if (typeof window === 'undefined') {
      return;
    }

    const nextHash = `#${section}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState({}, '', `${window.location.pathname}${window.location.search}${nextHash}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const syncFromUrl = () => {
      setActiveSection(getSectionFromHash(window.location.hash));
    };

    syncFromUrl();
    window.addEventListener('hashchange', syncFromUrl);
    return () => window.removeEventListener('hashchange', syncFromUrl);
  }, []);

  const submitFeedback = async () => {
    if (!feedbackRating || !feedbackText.trim()) {
      toast.error('Please add rating and feedback');
      return;
    }

    if (!supabase) {
      toast.error('Feedback service is unavailable right now');
      return;
    }

    try {
      setFeedbackLoading(true);
      const payload = {
        rating: feedbackRating,
        feedback_text: feedbackText.trim(),
        feature: feedbackFeature || null,
        source: 'landing-community',
      };

      const { error } = await supabase.from('website_feedback').insert(payload);
      if (error) {
        throw error;
      }

      toast.success('Thanks, feedback received');
      setFeedbackRating(0);
      setFeedbackText('');
      setFeedbackFeature('');
    } catch (error: any) {
      toast.error(error?.message || 'Could not submit feedback');
    } finally {
      setFeedbackLoading(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-violet-50/50 p-8 md:p-14 shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/3 via-indigo-400/3 to-violet-400/3" />
        <div className="relative mx-auto max-w-5xl text-center">
          {/* Category Pills */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-8 inline-flex rounded-2xl border border-slate-200/40 bg-white/90 backdrop-blur-sm p-2 shadow-md"
          >
            {[
              { label: 'Sports', icon: Trophy, value: 'sports' as const, color: 'hover:bg-teal-50/70' },
              { label: 'Events', icon: Music, value: 'events' as const, color: 'hover:bg-violet-50/70' },
              { label: 'Gaming', icon: Gamepad2, value: 'gaming' as const, color: 'hover:bg-indigo-50/70' },
            ].map((item) => (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => onCategorySelect?.(item.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mx-1 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-700 transition-all ${item.color}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black tracking-tight text-slate-900 md:text-8xl"
          >
            Belong through
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 bg-gradient-to-r from-teal-400 via-blue-400 to-violet-500 bg-clip-text text-5xl font-black text-transparent md:text-8xl"
          >
            sports, culture, and games
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-relaxed text-slate-700 md:text-2xl"
          >
            Connect with verified players, book matches, join festivals, and grow real community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button 
              className="h-14 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-8 text-lg font-bold shadow-md shadow-teal-400/20 hover:shadow-lg hover:shadow-teal-400/30 hover:scale-[1.02] transition-all" 
              onClick={() => onCategorySelect?.('sports')}
            >
              Book Games
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              className="h-14 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-500 px-8 text-lg font-bold shadow-md shadow-violet-400/20 hover:shadow-lg hover:shadow-violet-400/30 hover:scale-[1.02] transition-all" 
              onClick={() => onCategorySelect?.('events')}
            >
              Join Festivals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              className="h-14 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 px-8 text-lg font-bold shadow-md shadow-rose-400/20 hover:shadow-lg hover:shadow-rose-400/30 hover:scale-[1.02] transition-all" 
              onClick={() => onCategorySelect?.('gaming')}
            >
              Game Together
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Cards */}
      <section className="grid gap-6">
        {[
          {
            title: 'Sports & Turf',
            copy: 'Book turfs, find players, and build your sports community with trust-based matching.',
            image: sportsImg,
            button: 'Get Started',
            gradient: 'from-teal-400/8 via-cyan-400/8 to-sky-400/8',
            borderGradient: 'from-teal-300 to-cyan-400',
            buttonGradient: 'from-teal-400 to-cyan-500',
            action: () => onCategorySelect?.('sports'),
            icon: Trophy,
            iconGradient: 'from-teal-400 to-cyan-500',
          },
          {
            title: 'Events',
            copy: 'Discover concerts, festivals, exhibitions, and standout moments with your circle.',
            image: eventsImg,
            button: 'Explore Events',
            gradient: 'from-violet-400/8 via-purple-400/8 to-fuchsia-400/8',
            borderGradient: 'from-violet-300 to-purple-400',
            buttonGradient: 'from-violet-400 to-purple-500',
            action: () => onCategorySelect?.('events'),
            icon: Music,
            iconGradient: 'from-violet-400 to-purple-500',
          },
          {
            title: 'Gaming',
            copy: 'Join clubs, compete in tournaments, and level up friendships through play.',
            image: gamingImg,
            button: 'Game Now',
            gradient: 'from-blue-400/8 via-indigo-400/8 to-violet-400/8',
            borderGradient: 'from-blue-300 to-indigo-400',
            buttonGradient: 'from-blue-400 to-indigo-500',
            action: () => onCategorySelect?.('gaming'),
            icon: Gamepad2,
            iconGradient: 'from-blue-400 to-indigo-500',
          },
        ].map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`group relative grid overflow-hidden rounded-3xl border-2 border-transparent bg-gradient-to-br ${card.gradient} backdrop-blur-sm md:grid-cols-2 shadow-xl hover:shadow-2xl transition-all duration-300`}
          >
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity blur-sm`} style={{ zIndex: -1 }} />
            <div className="relative overflow-hidden">
              <ImageWithFallback 
                src={card.image} 
                alt={card.title} 
                className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="relative flex items-center bg-white/90 backdrop-blur-sm p-10">
              <div>
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.iconGradient} shadow-lg`}
                >
                  <card.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-5xl font-black text-slate-900 tracking-tight">{card.title}</h3>
                <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-slate-600">{card.copy}</p>
                <Button 
                  className={`mt-8 h-12 rounded-xl bg-gradient-to-r ${card.buttonGradient} px-8 text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all`}
                  onClick={card.action}
                >
                  {card.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );

  const renderExplore = () => (
    <div className="space-y-10">
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-violet-50/50 px-6 py-14 text-center shadow-lg"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-black tracking-tight text-slate-900"
        >
          Explore <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent">Everything</span>
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-2xl font-medium text-slate-700"
        >
          Discover how Civita works, explore trusted features, and understand the flow in minutes.
        </motion.p>
      </motion.section>

      <section className="rounded-3xl border border-slate-200/40 bg-white/90 backdrop-blur-sm p-6 md:p-12 shadow-lg">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-5xl font-black text-slate-900 tracking-tight"
        >
          Everything You Need In One Place
        </motion.h3>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { 
              title: 'Trust Scores', 
              desc: 'Verified reputation layers help you play with reliable people.', 
              icon: Shield,
              gradient: 'from-teal-400 to-cyan-500',
              bgGradient: 'from-teal-400/8 via-cyan-400/8 to-sky-400/8',
              shadowColor: 'hover:shadow-teal-400/15',
            },
            { 
              title: 'Friendship Streaks', 
              desc: 'Track consistency and build stronger bonds over time.', 
              icon: Star,
              gradient: 'from-amber-400 to-orange-400',
              bgGradient: 'from-amber-400/8 via-orange-400/8 to-yellow-400/8',
              shadowColor: 'hover:shadow-amber-400/15',
            },
            { 
              title: 'Instant Booking', 
              desc: 'Book courts, fields, and spaces quickly with clear slots.', 
              icon: Zap,
              gradient: 'from-yellow-400 to-amber-400',
              bgGradient: 'from-yellow-400/8 via-amber-400/8 to-orange-400/8',
              shadowColor: 'hover:shadow-yellow-400/15',
            },
            { 
              title: 'Community First', 
              desc: 'A positive social layer across sports, events, and gaming.', 
              icon: Heart,
              gradient: 'from-rose-400 to-pink-400',
              bgGradient: 'from-rose-400/8 via-pink-400/8 to-fuchsia-400/8',
              shadowColor: 'hover:shadow-rose-400/15',
            },
            { 
              title: 'Group Chat', 
              desc: 'Coordinate with your squad before and after matches.', 
              icon: Users,
              gradient: 'from-rose-400 to-pink-500',
              bgGradient: 'from-rose-400/8 via-pink-400/8 to-fuchsia-400/8',
              shadowColor: 'hover:shadow-rose-400/15',
            },
            { 
              title: 'Badges & Rewards', 
              desc: 'Earn visible progress for reliability and contribution.', 
              icon: Trophy,
              gradient: 'from-violet-400 to-purple-500',
              bgGradient: 'from-violet-400/8 via-purple-400/8 to-fuchsia-400/8',
              shadowColor: 'hover:shadow-violet-400/15',
            },
          ].map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`group relative rounded-2xl border border-slate-200/40 bg-gradient-to-br ${item.bgGradient} p-8 shadow-md ${item.shadowColor} hover:shadow-lg transition-all duration-300`}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/60 backdrop-blur-sm" style={{ zIndex: -1 }} />
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-xl`}
              >
                <item.icon className="h-7 w-7" />
              </motion.div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tight">{item.title}</h4>
              <p className="mt-3 text-lg font-medium leading-relaxed text-slate-700">{item.desc}</p>
              <motion.div 
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
                className={`mt-5 h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-10">
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-violet-50/50 px-6 py-14 text-center shadow-lg"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-black tracking-tight text-slate-900"
        >
          Join the <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent">Community</span>
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-2xl font-medium text-slate-700"
        >
          See what people are sharing and leave your own experience.
        </motion.p>
      </motion.section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { 
            name: 'Alex Rodriguez', 
            handle: '@alex_sports', 
            image: sportsImg, 
            text: 'Amazing 5v5 match yesterday. Found the perfect squad.', 
            likes: 234, 
            comments: 18,
            gradient: 'from-teal-400 to-cyan-500',
            tagColor: 'bg-teal-50 text-teal-600',
            tag: 'Sports'
          },
          { 
            name: 'Maya Patel', 
            handle: '@maya_games', 
            image: gamingImg, 
            text: 'Epic gaming session at the new lounge. Met great people.', 
            likes: 421, 
            comments: 32,
            gradient: 'from-rose-400 to-pink-500',
            tagColor: 'bg-rose-50 text-rose-600',
            tag: 'Gaming'
          },
          { 
            name: 'Jordan Chen', 
            handle: '@jordan_music', 
            image: eventsImg, 
            text: 'Best festival experience ever. Thanks Civita community!', 
            likes: 567, 
            comments: 45,
            gradient: 'from-violet-400 to-purple-500',
            tagColor: 'bg-violet-50 text-violet-600',
            tag: 'Events'
          },
        ].map((post, idx) => (
          <motion.article 
            key={post.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group overflow-hidden rounded-3xl border border-slate-200/40 bg-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="relative p-5">
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${post.gradient} text-xl font-black text-white shadow-md`}>
                  {post.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-slate-900">{post.name}</p>
                  <p className="text-sm font-medium text-slate-500">{post.handle}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${post.tagColor}`}>
                  {post.tag}
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <ImageWithFallback 
                src={post.image} 
                alt={post.name} 
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="p-5">
              <p className="text-base font-medium leading-relaxed text-slate-700">{post.text}</p>
              <div className="mt-4 flex items-center gap-5 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-rose-400" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto max-w-2xl rounded-3xl border border-slate-200/40 bg-gradient-to-br from-white to-slate-50/50 p-8 md:p-10 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-lg font-black text-white shadow-md">
            You
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">Share your experience</h3>
            <p className="mt-1 text-base font-medium text-slate-600">Your feedback helps improve the platform.</p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Your rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFeedbackRating(value)}
                  className="rounded-md p-1"
                  aria-label={`Rate ${value}`}
                >
                  <Star className={`h-6 w-6 ${value <= feedbackRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Your feedback</p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="min-h-28 w-full rounded-xl border border-slate-300 p-3 text-base text-slate-800 outline-none ring-sky-400 focus:ring"
              placeholder="Tell us what you liked or what we can improve"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">What feature did you use?</p>
            <div className="flex flex-wrap gap-2">
              {(['Sports', 'Events', 'Gaming'] as const).map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => setFeedbackFeature(feature)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium ${feedbackFeature === feature ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-300 text-slate-600'}`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 py-5 text-base font-semibold" onClick={submitFeedback} disabled={feedbackLoading}>
            {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>
      </motion.section>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-10">
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-slate-200/40 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-violet-50/50 px-6 py-14 text-center shadow-lg"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 text-4xl font-black text-white shadow-lg"
        >
          You
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-black text-slate-900"
        >
          Your Profile
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-5 max-w-2xl text-2xl font-medium text-slate-700"
        >
          Track trust, activity, and connections from one place.
        </motion.p>
      </motion.section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { 
            title: 'Trust Score', 
            value: '91', 
            subtitle: 'High reliability', 
            icon: Shield, 
            gradient: 'from-teal-400 to-cyan-500',
            bgGradient: 'from-teal-400/8 via-cyan-400/8 to-sky-400/8',
            shadowColor: 'hover:shadow-teal-400/20',
          },
          { 
            title: 'Streak', 
            value: '12 days', 
            subtitle: 'Consistency active', 
            icon: Star, 
            gradient: 'from-amber-400 to-orange-400',
            bgGradient: 'from-amber-400/8 via-orange-400/8 to-yellow-400/8',
            shadowColor: 'hover:shadow-amber-400/20',
          },
          { 
            title: 'Communities', 
            value: '8', 
            subtitle: 'Sports, events, gaming', 
            icon: Users, 
            gradient: 'from-rose-400 to-pink-500',
            bgGradient: 'from-rose-400/8 via-pink-400/8 to-fuchsia-400/8',
            shadowColor: 'hover:shadow-rose-400/20',
          },
        ].map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`group relative rounded-3xl border border-slate-200/40 bg-gradient-to-br ${item.bgGradient} p-8 shadow-md ${item.shadowColor} hover:shadow-lg transition-all duration-300`}
          >
            <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur-sm" style={{ zIndex: -1 }} />
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
            >
              <item.icon className="h-7 w-7" />
            </motion.div>
            <p className="text-sm font-black uppercase tracking-wide text-slate-500">{item.title}</p>
            <p className="mt-3 text-5xl font-black text-slate-900">{item.value}</p>
            <p className="mt-2 text-base font-medium text-slate-600">{item.subtitle}</p>
            <motion.div 
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
              className={`mt-5 h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
            />
          </motion.div>
        ))}
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-slate-200/40 bg-gradient-to-br from-white via-slate-50/50 to-rose-50/30 p-10 md:p-14 text-center shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400/3 via-pink-400/3 to-fuchsia-400/3" />
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg"
          >
            <User className="h-10 w-10 text-white" />
          </motion.div>
          <h3 className="text-4xl font-black text-slate-900 md:text-5xl">Sign in to unlock your full profile</h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-700 md:text-xl">
            Save your matches, keep your trust history, and switch between sports, events, and gaming dashboards.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button 
              className="mt-8 h-14 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-500 px-10 text-lg font-bold shadow-lg shadow-rose-400/20 hover:shadow-xl hover:shadow-rose-400/30 transition-all" 
              onClick={onGetStarted}
            >
              Continue to Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <motion.button 
            type="button" 
            onClick={() => handleSectionChange('home')} 
            className="inline-flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 text-white shadow-md group-hover:shadow-lg transition-shadow"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Trophy className="h-6 w-6" />
            </motion.div>
            <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Avento</span>
          </motion.button>

          <nav className="hidden items-center gap-1.5 rounded-2xl border border-slate-200/60 bg-slate-50/80 backdrop-blur-sm p-1.5 shadow-sm md:flex">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => handleSectionChange(item.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl px-5 py-2.5 text-base font-bold transition-all ${
                  activeSection === item.key 
                    ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md' 
                    : 'text-slate-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <motion.button 
              type="button" 
              className="relative hidden rounded-xl bg-slate-50 p-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm md:block" 
              aria-label="Notifications"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-5 w-5" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 shadow-lg" 
              />
            </motion.button>
            <Button 
              variant="ghost" 
              onClick={onGetStarted} 
              className="hidden rounded-xl font-bold hover:bg-slate-100 md:inline-flex"
            >
              Sign In
            </Button>
            <Button 
              onClick={onGetStarted} 
              className="rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 font-bold shadow-md shadow-rose-400/20 hover:shadow-lg hover:shadow-rose-400/30 hover:scale-[1.02] transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="border-t border-slate-200/60 px-4 py-2.5 md:hidden">
          <div className="flex gap-1 rounded-xl bg-slate-50 p-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSectionChange(item.key)}
                className={`flex-1 rounded-lg px-2 py-2.5 text-xs font-bold transition-all ${
                  activeSection === item.key 
                    ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md' 
                    : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            {activeSection === 'home' && renderHome()}
            {activeSection === 'explore' && renderExplore()}
            {activeSection === 'community' && renderCommunity()}
            {activeSection === 'profile' && renderProfile()}
          </motion.div>
        </AnimatePresence>
      </main>

      {activeSection === 'home' && (
        <motion.aside 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 right-6 hidden w-80 overflow-hidden rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl backdrop-blur-xl lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 via-indigo-400/8 to-violet-400/8" />
          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-2xl font-black">Live Activity</p>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-3 w-3 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50"
              />
            </div>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-300">Active now</span>
                </div>
                <span className="text-2xl font-black">{liveStats.activeNow}</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 shadow-md">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-300">Matches today</span>
                </div>
                <span className="text-2xl font-black text-teal-400">+{liveStats.matchesToday}</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 shadow-md">
                    <Heart className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-slate-300">New friends</span>
                </div>
                <span className="text-2xl font-black text-violet-400">+{liveStats.newFriends}</span>
              </motion.div>
            </div>
          </div>
        </motion.aside>
      )}
    </div>
  );
}
