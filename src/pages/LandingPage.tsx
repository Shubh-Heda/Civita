import { Users as UsersIcon, Calendar, Trophy, TrendingUp as TrendingUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { CategoryCards } from '../components/CategoryCards';

interface LandingPageProps {
  onGetStarted: () => void;
  onCategorySelect?: (category: 'sports' | 'events' | 'gaming') => void;
}

export function LandingPage({ onGetStarted, onCategorySelect }: LandingPageProps) {

  const handleCategoryClick = (category: 'sports' | 'events' | 'gaming') => {
    if (onCategorySelect) onCategorySelect(category);
  };

  const badges = [
    {
      icon: '🛡️',
      title: 'Trust Scores',
      description: 'Build reputation through reliability, respect, and positive interactions.',
      tint: '#fefce8',
      border: '#fef08a',
      iconBg: 'linear-gradient(135deg, #fbbf24, #f97316)',
      accent: '#a16207',
    },
    {
      icon: '🔥',
      title: 'Friendship Streaks',
      description: 'Celebrate consistency and deepen bonds through shared experiences.',
      tint: '#fff7ed',
      border: '#fed7aa',
      iconBg: 'linear-gradient(135deg, #fb923c, #ef4444)',
      accent: '#c2410c',
    },
    {
      icon: '💖',
      title: 'Experience Reflections',
      description: 'Share gratitude and celebrate moments after every event.',
      tint: '#eff6ff',
      border: '#bfdbfe',
      iconBg: 'linear-gradient(135deg, #60a5fa, #6366f1)',
      accent: '#1d4ed8',
    },
    {
      icon: '⭐',
      title: 'Community Rituals',
      description: 'Traditions that make you belong and feel at home.',
      tint: '#fdf4ff',
      border: '#e9d5ff',
      iconBg: 'linear-gradient(135deg, #c084fc, #ec4899)',
      accent: '#7e22ce',
    },
  ];

  const stats = [
    {
      icon: UsersIcon,
      label: 'Monthly Active Users',
      value: '25,728',
      change: '+2.5%',
      tint: '#eff6ff',
      border: '#bfdbfe',
      iconColor: '#2563eb',
      valueColor: '#1e3a8a',
      changeColor: '#16a34a',
      period: 'vs last month',
    },
    {
      icon: Calendar,
      label: 'Events Hosted',
      value: '1,500',
      change: '+8.3%',
      tint: '#fff1f2',
      border: '#fecdd3',
      iconColor: '#e11d48',
      valueColor: '#881337',
      changeColor: '#16a34a',
      period: 'this quarter',
    },
    {
      icon: Trophy,
      label: 'Matches Played',
      value: '44,449',
      change: '+24.7%',
      tint: '#f0fdf4',
      border: '#bbf7d0',
      iconColor: '#16a34a',
      valueColor: '#14532d',
      changeColor: '#16a34a',
      period: 'all-time high',
    },
    {
      icon: TrendingUpIcon,
      label: 'Avg. Trust Score',
      value: '92%',
      change: '+3.2pt',
      tint: '#fefce8',
      border: '#fef08a',
      iconColor: '#ca8a04',
      valueColor: '#713f12',
      changeColor: '#16a34a',
      period: 'community health',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <Hero onGetStarted={onGetStarted} onCategorySelect={handleCategoryClick} />
      <CategoryCards onCategorySelect={handleCategoryClick} />

      {/* ── What makes Civita different ─────────────────────────────── */}
      <section style={{ background: '#fff', padding: '88px 0 72px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#9ca3af',
              marginBottom: 12,
            }}>Built for belonging</span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: '#111827',
              margin: 0,
              letterSpacing: '-0.5px',
            }}>What makes Civita different</h2>
          </motion.div>

          {/* Badge cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 56 }}>
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  background: badge.tint,
                  border: `1.5px solid ${badge.border}`,
                  borderRadius: 20,
                  padding: '28px 24px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default',
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: badge.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  marginBottom: 16,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }}>
                  {badge.icon}
                </div>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#111827',
                  margin: '0 0 8px',
                }}>{badge.title}</h3>
                <p style={{
                  fontSize: 13,
                  color: '#6b7280',
                  lineHeight: 1.65,
                  margin: 0,
                }}>{badge.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#f3f4f6', marginBottom: 56 }} />

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    background: stat.tint,
                    border: `1.5px solid ${stat.border}`,
                    borderRadius: 20,
                    padding: '28px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.07)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Icon style={{ width: 24, height: 24, color: stat.iconColor }} />
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: stat.changeColor,
                      background: '#dcfce7',
                      border: '1px solid #bbf7d0',
                      borderRadius: 50,
                      padding: '3px 10px',
                    }}>{stat.change}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: stat.valueColor,
                    letterSpacing: '-1px',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', fontStyle: 'italic' }}>{stat.period}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA strip ─────────────────────────────────────────── */}
      <section style={{ background: '#f9fafb', borderTop: '1.5px solid #f3f4f6', padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#9ca3af',
              display: 'block',
              marginBottom: 16,
            }}>Your city is waiting</span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#111827',
              margin: '0 0 16px',
              letterSpacing: '-0.5px',
            }}>Ready to find your people?</h2>
            <p style={{
              fontSize: 17,
              color: '#6b7280',
              lineHeight: 1.75,
              margin: '0 auto 40px',
              maxWidth: 480,
            }}>
              Join thousands of people already playing, attending, and competing — all in one trusted community.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGetStarted}
                style={{
                  padding: '15px 36px',
                  borderRadius: 14,
                  border: 'none',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 28px rgba(34,197,94,0.3)',
                }}
              >
                Create Free Account →
              </motion.button>
              <button style={{
                padding: '15px 36px',
                borderRadius: 14,
                border: '1.5px solid #e5e7eb',
                background: '#fff',
                color: '#374151',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                Browse as Guest
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
