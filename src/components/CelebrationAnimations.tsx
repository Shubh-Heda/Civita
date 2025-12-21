import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Heart, Award, TrendingUp, Users } from 'lucide-react';

export type CelebrationType = 'trust_increase' | 'level_up' | 'achievement_unlock' | 'streak_milestone' | 'badge_earned' | 'payment_complete';

export interface CelebrationEvent {
  type: CelebrationType;
  title: string;
  message: string;
  icon?: React.ReactNode;
  xpEarned?: number;
  color?: string;
}

interface CelebrationAnimationsProps {
  event: CelebrationEvent | null;
  onComplete?: () => void;
}

export function CelebrationAnimations({ event, onComplete }: CelebrationAnimationsProps) {
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; rotation: number; color: string; size: number }[]>([]);

  useEffect(() => {
    if (event) {
      // Generate confetti
      const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
        size: Math.random() * 10 + 5
      }));
      
      setConfetti(confettiPieces);

      // Play sound (if available)
      // const audio = new Audio('/celebration-sound.mp3');
      // audio.play().catch(() => {});

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [event, onComplete]);

  if (!event) return null;

  const getIcon = () => {
    if (event.icon) return event.icon;

    switch (event.type) {
      case 'achievement_unlock':
        return <Trophy className="w-16 h-16" />;
      case 'level_up':
        return <Star className="w-16 h-16" />;
      case 'trust_increase':
        return <TrendingUp className="w-16 h-16" />;
      case 'streak_milestone':
        return <Zap className="w-16 h-16" />;
      case 'badge_earned':
        return <Award className="w-16 h-16" />;
      case 'payment_complete':
        return <Heart className="w-16 h-16" />;
      default:
        return <Star className="w-16 h-16" />;
    }
  };

  const getGradient = () => {
    switch (event.type) {
      case 'achievement_unlock':
        return 'from-yellow-500 via-orange-500 to-red-500';
      case 'level_up':
        return 'from-purple-500 via-pink-500 to-red-500';
      case 'trust_increase':
        return 'from-green-500 via-emerald-500 to-teal-500';
      case 'streak_milestone':
        return 'from-orange-500 via-red-500 to-pink-500';
      case 'badge_earned':
        return 'from-blue-500 via-cyan-500 to-teal-500';
      case 'payment_complete':
        return 'from-pink-500 via-purple-500 to-indigo-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onComplete}
      >
        {/* Confetti */}
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ x: piece.x, y: piece.y, rotation: piece.rotation }}
            animate={{
              y: window.innerHeight + 100,
              rotation: piece.rotation + 720,
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 0.5,
              ease: 'easeIn',
            }}
            style={{
              position: 'absolute',
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
          />
        ))}

        {/* Main celebration card */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative z-10 max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`bg-gradient-to-br ${getGradient()} p-1 rounded-3xl`}>
            <div className="bg-slate-900 rounded-3xl p-8 text-center">
              {/* Icon with pulse animation */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className={`inline-block text-transparent bg-gradient-to-br ${getGradient()} bg-clip-text mb-4`}
              >
                {getIcon()}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`mb-3 text-white`}
              >
                {event.title}
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-300 mb-4"
              >
                {event.message}
              </motion.p>

              {/* XP Badge */}
              {event.xpEarned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${getGradient()} px-6 py-3 rounded-full text-white`}
                >
                  <Star className="w-5 h-5" fill="currentColor" />
                  <span>+{event.xpEarned} XP</span>
                </motion.div>
              )}

              {/* Sparkle effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 100,
                    y: Math.sin((i * Math.PI * 2) / 8) * 100,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              ))}
            </div>
          </div>

          {/* Tap to dismiss hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/60 text-sm mt-4"
          >
            Tap anywhere to continue
          </motion.p>
        </motion.div>

        {/* Fireworks for major achievements */}
        {(event.type === 'achievement_unlock' || event.type === 'level_up') && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`firework-${i}`}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight * 0.5,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.3,
                  repeat: 2,
                  repeatDelay: 1,
                }}
                className="absolute"
              >
                <div className="relative w-20 h-20">
                  {[...Array(8)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1],
                        opacity: [1, 0],
                        x: Math.cos((j * Math.PI * 2) / 8) * 50,
                        y: Math.sin((j * Math.PI * 2) / 8) * 50,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.3,
                      }}
                      className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][j % 5],
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to trigger celebrations
export function useCelebration() {
  const [currentEvent, setCurrentEvent] = useState<CelebrationEvent | null>(null);

  const celebrate = (event: CelebrationEvent) => {
    setCurrentEvent(event);
  };

  const clearCelebration = () => {
    setCurrentEvent(null);
  };

  return {
    currentEvent,
    celebrate,
    clearCelebration,
  };
}
