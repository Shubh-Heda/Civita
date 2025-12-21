import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'highlighted';
}

export function GlassCard({ children, className = '', onClick, variant = 'default' }: GlassCardProps) {
  const isHighlighted = variant === 'highlighted';
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        z: 50,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        ${isHighlighted 
          ? 'bg-gradient-to-br from-white/60 to-white/40 border-2 border-white/60 shadow-2xl shadow-cyan-500/20' 
          : 'bg-white/50 border border-white/60 shadow-xl'
        }
        backdrop-blur-md
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Gradient glow overlay for highlighted cards */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-purple-500/10 pointer-events-none" />
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
      
      {children}
    </motion.div>
  );
}
