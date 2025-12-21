import { motion } from 'motion/react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'dashboard' | 'match' | 'community' | 'intense' | 'events' | 'party';
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBackground({ 
  variant = 'default', 
  children,
  className = ''
}: AnimatedBackgroundProps) {
  
  const variants = {
    default: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* Multi-layer animated gradients */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900" />
        
        <motion.div
          className="fixed inset-0 bg-gradient-to-tr from-pink-500/30 via-orange-500/30 to-yellow-500/30"
          animate={{
            background: [
              'linear-gradient(to top right, rgba(236, 72, 153, 0.3), rgba(249, 115, 22, 0.3), rgba(234, 179, 8, 0.3))',
              'linear-gradient(to top right, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
              'linear-gradient(to top right, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
              'linear-gradient(to top right, rgba(236, 72, 153, 0.3), rgba(249, 115, 22, 0.3), rgba(234, 179, 8, 0.3))',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="fixed w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', left: '10%' }}
        />
        
        <motion.div
          className="fixed w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 150, -150, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '50%', right: '10%' }}
        />
        
        <motion.div
          className="fixed w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -120, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: '10%', left: '30%' }}
        />
        
        {/* Grid pattern overlay */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
    
    dashboard: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* Vibrant sports-themed gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600" />
        
        <motion.div
          className="fixed inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated shapes */}
        <motion.div
          className="fixed w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-2xl"
          animate={{
            x: ['-10%', '110%'],
            y: ['10%', '90%'],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        <motion.div
          className="fixed w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl"
          animate={{
            x: ['90%', '-10%'],
            y: ['80%', '20%'],
          }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        {/* Mesh pattern */}
        <div className="fixed inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="white" opacity="0.5" />
                <circle cx="0" cy="0" r="2" fill="white" opacity="0.5" />
                <circle cx="100" cy="100" r="2" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
    
    match: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* Stadium/field inspired gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-green-900 via-emerald-800 to-teal-900" />
        
        {/* Field lines effect */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_100px,rgba(255,255,255,0.03)_100px,rgba(255,255,255,0.03)_102px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_100px,rgba(255,255,255,0.03)_100px,rgba(255,255,255,0.03)_102px)]" />
        </div>
        
        <motion.div
          className="fixed inset-0 bg-gradient-to-tr from-cyan-500/30 via-transparent to-yellow-500/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Stadium lights effect */}
        <motion.div
          className="fixed top-0 left-1/4 w-32 h-96 bg-gradient-to-b from-yellow-200/40 to-transparent blur-xl"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="fixed top-0 right-1/4 w-32 h-96 bg-gradient-to-b from-blue-200/40 to-transparent blur-xl"
          animate={{ opacity: [0.8, 0.5, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
    
    community: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* Warm community vibes */}
        <div className="fixed inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600" />
        
        <motion.div
          className="fixed inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 40%, rgba(251, 207, 232, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(196, 181, 253, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 70% 40%, rgba(254, 215, 170, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(165, 243, 252, 0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 40%, rgba(251, 207, 232, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(196, 181, 253, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating hearts/connection symbols */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="fixed text-4xl opacity-10"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: '100%' 
            }}
            animate={{
              y: '-10%',
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            {['❤️', '🤝', '⚡', '✨', '🌟', '💫'][i]}
          </motion.div>
        ))}
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
    
    intense: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* High-energy competitive vibe */}
        <div className="fixed inset-0 bg-black" />
        
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500"
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Lightning effect */}
        <motion.div
          className="fixed inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 30%)',
              'radial-gradient(circle at 70% 70%, rgba(239, 68, 68, 0.4) 0%, transparent 30%)',
              'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 30%)',
              'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 30%)',
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Scanlines */}
        <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none" />
        
        {/* Pulsing glow */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-t from-transparent via-yellow-500/20 to-transparent"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
    
    events: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* Event-themed gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
        
        <motion.div
          className="fixed inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 69, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 69, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 69, 0, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated shapes */}
        <motion.div
          className="fixed w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-2xl"
          animate={{
            x: ['-10%', '110%'],
            y: ['10%', '90%'],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        <motion.div
          className="fixed w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl"
          animate={{
            x: ['90%', '-10%'],
            y: ['80%', '20%'],
          }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        {/* Mesh pattern */}
        <div className="fixed inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="white" opacity="0.5" />
                <circle cx="0" cy="0" r="2" fill="white" opacity="0.5" />
                <circle cx="100" cy="100" r="2" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
    
    party: (
      <div className={`min-h-screen relative overflow-hidden ${className}`}>
        {/* Party-themed gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />
        
        <motion.div
          className="fixed inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 69, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 69, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 69, 0, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated shapes */}
        <motion.div
          className="fixed w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-2xl"
          animate={{
            x: ['-10%', '110%'],
            y: ['10%', '90%'],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        <motion.div
          className="fixed w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl"
          animate={{
            x: ['90%', '-10%'],
            y: ['80%', '20%'],
          }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        
        {/* Mesh pattern */}
        <div className="fixed inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="white" opacity="0.5" />
                <circle cx="0" cy="0" r="2" fill="white" opacity="0.5" />
                <circle cx="100" cy="100" r="2" fill="white" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    ),
  };

  return variants[variant];
}