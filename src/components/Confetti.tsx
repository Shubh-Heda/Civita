import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function Confetti({ trigger, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number; delay: number }>>([]);

  useEffect(() => {
    if (trigger) {
      // Generate confetti particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'][Math.floor(Math.random() * 8)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3
      }));

      setParticles(newParticles);

      // Clear after animation
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
    }
  }, [trigger, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            opacity: 1,
            scale: 1
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: particle.rotation + 720,
            opacity: 0,
            scale: 0.5
          }}
          transition={{
            duration: 2.5,
            delay: particle.delay,
            ease: [0.23, 1, 0.32, 1]
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
          }}
        />
      ))}
    </div>
  );
}

interface HeartBurstProps {
  trigger: boolean;
  x?: number;
  y?: number;
  onComplete?: () => void;
}

export function HeartBurst({ trigger, x = window.innerWidth / 2, y = window.innerHeight / 2, onComplete }: HeartBurstProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; angle: number; delay: number }>>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (360 / 12) * i,
        delay: i * 0.05
      }));

      setHearts(newHearts);

      setTimeout(() => {
        setHearts([]);
        onComplete?.();
      }, 1500);
    }
  }, [trigger, onComplete]);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            x: x,
            y: y,
            scale: 0,
            opacity: 1
          }}
          animate={{
            x: x + Math.cos((heart.angle * Math.PI) / 180) * 150,
            y: y + Math.sin((heart.angle * Math.PI) / 180) * 150,
            scale: 1,
            opacity: 0
          }}
          transition={{
            duration: 1,
            delay: heart.delay,
            ease: 'easeOut'
          }}
          className="absolute text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

interface RippleEffectProps {
  trigger: boolean;
  color?: string;
  onComplete?: () => void;
}

export function RippleEffect({ trigger, color = 'rgba(59, 130, 246, 0.5)', onComplete }: RippleEffectProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 800);
    }
  }, [trigger, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99] flex items-center justify-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: 'easeOut'
          }}
          className="absolute w-32 h-32 rounded-full border-4"
          style={{ borderColor: color }}
        />
      ))}
    </div>
  );
}

interface SparkleEffectProps {
  trigger: boolean;
  x: number;
  y: number;
  onComplete?: () => void;
}

export function SparkleEffect({ trigger, x, y, onComplete }: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; offsetX: number; offsetY: number; delay: number }>>([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        offsetX: (Math.random() - 0.5) * 100,
        offsetY: (Math.random() - 0.5) * 100,
        delay: i * 0.05
      }));

      setSparkles(newSparkles);

      setTimeout(() => {
        setSparkles([]);
        onComplete?.();
      }, 1000);
    }
  }, [trigger, onComplete]);

  if (sparkles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{
            x: x,
            y: y,
            scale: 0,
            opacity: 1,
            rotate: 0
          }}
          animate={{
            x: x + sparkle.offsetX,
            y: y + sparkle.offsetY,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: 180
          }}
          transition={{
            duration: 0.8,
            delay: sparkle.delay,
            ease: 'easeOut'
          }}
          className="absolute text-yellow-400"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
