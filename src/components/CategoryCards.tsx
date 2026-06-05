import { motion } from 'framer-motion';
import { Trophy, Music, Gamepad2, ArrowRight, Users, MapPin, Star } from 'lucide-react';

interface CategoryCardsProps {
  onCategorySelect: (category: 'sports' | 'events' | 'gaming') => void;
  onGetStarted?: () => void;
}

export function CategoryCards({ onCategorySelect, onGetStarted }: CategoryCardsProps) {

  const categories = [
    {
      id: 'sports',
      icon: Trophy,
      title: 'Sports & Turf',
      subtitle: 'Play. Compete. Build.',
      description: 'Book turfs, find players, and build your sports community with Trust Scores and Friendship Streaks.',
      buttonText: 'Find a Match',
      image: 'https://images.unsplash.com/photo-1762053275412-03726506562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXIlMjB0dXJmJTIwcGxheWVyc3xlbnwxfHx8fDE3NzAyMjYyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      imagePosition: 'left' as const,
      // Colors
      accentStrip: 'linear-gradient(180deg, #22c55e, #16a34a)',
      sectionBg: '#f0fdf4',
      cardBg: '#ffffff',
      iconBg: 'linear-gradient(135deg, #4ade80, #22c55e)',
      pillBg: '#dcfce7',
      pillBorder: '#86efac',
      pillColor: '#15803d',
      btnBg: 'linear-gradient(135deg, #4ade80, #16a34a)',
      btnShadow: 'rgba(34,197,94,0.3)',
      tagColor: '#15803d',
      tagBg: '#f0fdf4',
      tagBorder: '#bbf7d0',
      pills: ['⚽ Football', '🏏 Cricket', '🏸 Badminton', '🎾 Tennis'],
      stats: [
        { icon: Users, label: '18k+ Players', color: '#16a34a' },
        { icon: MapPin, label: '340 Cities', color: '#16a34a' },
        { icon: Star, label: '4.8 Avg Rating', color: '#16a34a' },
      ],
    },
    {
      id: 'events',
      icon: Music,
      title: 'Events',
      subtitle: 'Discover. Attend. Remember.',
      description: 'Discover concerts, festivals, exhibitions, and standout experiences with your community.',
      buttonText: 'Explore Events',
      image: 'https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZmVzdGl2YWwlMjBjcm93ZCUyMGxpZ2h0c3xlbnwxfHx8fDE3NzAyMjYyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      imagePosition: 'right' as const,
      accentStrip: 'linear-gradient(180deg, #fb923c, #e11d48)',
      sectionBg: '#fff5f5',
      cardBg: '#ffffff',
      iconBg: 'linear-gradient(135deg, #fb923c, #e11d48)',
      pillBg: '#fff1f2',
      pillBorder: '#fecdd3',
      pillColor: '#be123c',
      btnBg: 'linear-gradient(135deg, #fb923c, #e11d48)',
      btnShadow: 'rgba(225,29,72,0.25)',
      tagColor: '#be123c',
      tagBg: '#fff1f2',
      tagBorder: '#fecdd3',
      pills: ['🎵 Concerts', '🎪 Festivals', '🖼️ Exhibitions', '🎭 Theatre'],
      stats: [
        { icon: Users, label: '52k Attendees', color: '#e11d48' },
        { icon: MapPin, label: '80+ Categories', color: '#e11d48' },
        { icon: Star, label: '1,100+ Events', color: '#e11d48' },
      ],
    },
    {
      id: 'gaming',
      icon: Gamepad2,
      title: 'Gaming',
      subtitle: 'Queue. Battle. Dominate.',
      description: 'Join gaming clubs, play PS5/Xbox/PC, compete in tournaments, and level up your friendships.',
      buttonText: 'Game Now',
      image: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsb3VuZ2UlMjBlc3BvcnRzJTIwc2NyZWVuc3xlbnwxfHx8fDE3NzAyMjYyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      imagePosition: 'left' as const,
      accentStrip: 'linear-gradient(180deg, #60a5fa, #2563eb)',
      sectionBg: '#eff6ff',
      cardBg: '#ffffff',
      iconBg: 'linear-gradient(135deg, #93c5fd, #2563eb)',
      pillBg: '#dbeafe',
      pillBorder: '#93c5fd',
      pillColor: '#1d4ed8',
      btnBg: 'linear-gradient(135deg, #60a5fa, #2563eb)',
      btnShadow: 'rgba(37,99,235,0.25)',
      tagColor: '#1d4ed8',
      tagBg: '#eff6ff',
      tagBorder: '#bfdbfe',
      pills: ['🎮 PS5', '🖥️ PC Gaming', '📱 Mobile', '🏆 Tournaments'],
      stats: [
        { icon: Users, label: '31k Gamers', color: '#2563eb' },
        { icon: MapPin, label: '120+ Games', color: '#2563eb' },
        { icon: Star, label: '890 Lobbies', color: '#2563eb' },
      ],
    },
  ];

  const handleButtonClick = (categoryId: string) => {
    onCategorySelect(categoryId as 'sports' | 'events' | 'gaming');
    if (onGetStarted) onGetStarted();
  };

  return (
    <div>
      {categories.map((cat, index) => {
        const Icon = cat.icon;
        const isImageLeft = cat.imagePosition === 'left';

        return (
          <section
            key={cat.id}
            style={{ background: cat.sectionBg, padding: '72px 0' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
                style={{ justifyContent: isImageLeft ? 'flex-start' : 'flex-end' }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: cat.tagBg, border: `1.5px solid ${cat.tagBorder}`, color: cat.tagColor }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.title}
                </span>
              </motion.div>

              {/* Main card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: cat.cardBg,
                    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
                    border: '1.5px solid rgba(0,0,0,0.05)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                  }}
                >
                  {/* Left: image or content */}
                  {isImageLeft ? (
                    <>
                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ display: 'block' }}
                        />
                        {/* Accent strip on image edge */}
                        <div style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 5,
                          background: cat.accentStrip,
                        }} />
                        {/* Floating stat badges on image */}
                        <div style={{
                          position: 'absolute',
                          bottom: 24,
                          left: 20,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}>
                          {cat.stats.map((s, i) => {
                            const SI = s.icon;
                            return (
                              <div key={i} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                background: 'rgba(255,255,255,0.92)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: 50,
                                padding: '5px 12px',
                                fontSize: 12,
                                fontWeight: 600,
                                color: s.color,
                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                              }}>
                                <SI style={{ width: 13, height: 13 }} />
                                {s.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '56px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <ContentBlock cat={cat} onButtonClick={handleButtonClick} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content */}
                      <div style={{ padding: '56px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <ContentBlock cat={cat} onButtonClick={handleButtonClick} />
                      </div>

                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ display: 'block' }}
                        />
                        {/* Accent strip on image edge */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 5,
                          background: cat.accentStrip,
                        }} />
                        {/* Floating stat badges */}
                        <div style={{
                          position: 'absolute',
                          bottom: 24,
                          right: 20,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                          alignItems: 'flex-end',
                        }}>
                          {cat.stats.map((s, i) => {
                            const SI = s.icon;
                            return (
                              <div key={i} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                background: 'rgba(255,255,255,0.92)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: 50,
                                padding: '5px 12px',
                                fontSize: 12,
                                fontWeight: 600,
                                color: s.color,
                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                              }}>
                                <SI style={{ width: 13, height: 13 }} />
                                {s.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ─── Content block inside each card ──────────────────────────────────────────
function ContentBlock({
  cat,
  onButtonClick,
}: {
  cat: any;
  onButtonClick: (id: string) => void;
}) {
  const Icon = cat.icon;
  return (
    <>
      {/* Icon + subtitle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: cat.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 16px ${cat.btnShadow}`,
        }}>
          <Icon style={{ width: 20, height: 20, color: '#fff' }} />
        </div>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: cat.tagColor,
          fontFamily: 'monospace',
        }}>{cat.subtitle}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 'clamp(28px, 3.5vw, 42px)',
        fontWeight: 800,
        color: '#111827',
        margin: '0 0 12px',
        lineHeight: 1.1,
        letterSpacing: '-0.5px',
      }}>{cat.title}</h3>

      {/* Accent underline */}
      <div style={{
        width: 48,
        height: 4,
        borderRadius: 99,
        background: cat.accentStrip,
        marginBottom: 20,
      }} />

      {/* Description */}
      <p style={{
        fontSize: 16,
        color: '#6b7280',
        lineHeight: 1.75,
        margin: '0 0 24px',
        maxWidth: 380,
      }}>{cat.description}</p>

      {/* Sport/activity pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {cat.pills.map((pill: string, i: number) => (
          <span key={i} style={{
            padding: '5px 14px',
            borderRadius: 50,
            fontSize: 12,
            fontWeight: 600,
            background: cat.pillBg,
            border: `1.5px solid ${cat.pillBorder}`,
            color: cat.pillColor,
          }}>{pill}</span>
        ))}
      </div>

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onButtonClick(cat.id)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 28px',
          borderRadius: 14,
          border: 'none',
          background: cat.btnBg,
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: `0 6px 28px ${cat.btnShadow}`,
          width: 'fit-content',
        }}
      >
        {cat.buttonText}
        <ArrowRight style={{ width: 18, height: 18 }} />
      </motion.button>
    </>
  );
}
