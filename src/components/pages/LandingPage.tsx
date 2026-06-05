import { Users as UsersIcon, Calendar, Trophy, TrendingUp as TrendingUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Hero } from '../Hero';
import { CategoryCards } from '../CategoryCards';

interface LandingPageProps {
  onGetStarted: () => void;
  onCategorySelect?: (category: 'sports' | 'events' | 'gaming') => void;
}

export function LandingPage({ onGetStarted, onCategorySelect }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCategoryClick = (category: 'sports' | 'events' | 'gaming') => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const badges = [
    {
      icon: '🛡️',
      iconBg: 'from-red-500 to-orange-500',
      title: 'Trust Scores',
      description: 'Build reputation through reliability, respect, and positive interactions.',
    },
    {
      icon: '🔥',
      iconBg: 'from-yellow-500 to-orange-500',
      title: 'Friendship Streaks',
      description: 'Celebrate consistency and deepen bonds through shared experiences.',
    },
    {
      icon: '💖',
      iconBg: 'from-cyan-500 to-blue-500',
      title: 'Experience Reflections',
      description: 'Share gratitude and celebrate moments after every event.',
    },
    {
      icon: '⭐',
      iconBg: 'from-purple-500 to-pink-500',
      title: 'Community Rituals',
      description: 'Traditions that make you belong and feel at home.',
    },
  ];

  const stats = [
    {
      icon: UsersIcon,
      label: 'Monthly Active Users',
      value: '25,728',
      change: '+2.5%',
      gradient: 'from-blue-500 to-cyan-400',
      period: 'vs last month',
    },
    {
      icon: Calendar,
      label: 'Events Hosted',
      value: '1,500',
      change: '+8.3%',
      gradient: 'from-pink-500 to-purple-500',
      period: 'this quarter',
    },
    {
      icon: Trophy,
      label: 'Matches Played',
      value: '44,449',
      change: '+24.7%',
      gradient: 'from-orange-500 to-red-500',
      period: 'all-time high',
    },
    {
      icon: TrendingUpIcon,
      label: 'Avg. Trust Score',
      value: '92%',
      change: '+3.2pt',
      gradient: 'from-green-500 to-emerald-400',
      period: 'community health',
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={onGetStarted} />
      
      <CategoryCards onCategorySelect={handleCategoryClick} />
      
      {/* Main Dashboard */}
      <section className="py-16 bg-gradient-to-b from-purple-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                style={{ backgroundColor: '#1a2235' }}
                className="rounded-2xl p-6 text-white hover:transform hover:scale-105 transition-all shadow-lg border border-white/5"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${badge.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {badge.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{badge.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                  {badge.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all group`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="w-8 h-8 opacity-80" />
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm opacity-90 mb-1">{stat.label}</div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs opacity-80">{stat.period}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}