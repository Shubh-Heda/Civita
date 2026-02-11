import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, Heart, Shield, TrendingUp, CheckCircle, UserPlus, Clock, Sparkles, ArrowRight, Star, Zap, PartyPopper } from 'lucide-react';

interface AventoDemoProps {
  isPlaying: boolean;
}

export default function AventoDemo({ isPlaying }: AventoDemoProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);

  const scenes = [
    { duration: 4000, title: "The Problem" },
    { duration: 5000, title: "The Solution" },
    { duration: 6000, title: "Trust & Safety" },
    { duration: 5000, title: "Payment Made Fair" },
    { duration: 4000, title: "Build Connections" },
  ];

  useEffect(() => {
    if (!isPlaying) {
      setCurrentScene(0);
      setProgress(0);
      return;
    }

    const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      setProgress((elapsed / totalDuration) * 100);

      // Calculate which scene we should be on
      let accumulatedTime = 0;
      for (let i = 0; i < scenes.length; i++) {
        accumulatedTime += scenes[i].duration;
        if (elapsed < accumulatedTime) {
          setCurrentScene(i);
          break;
        }
      }

      // Loop the video
      if (elapsed >= totalDuration) {
        elapsed = 0;
        setProgress(0);
        setCurrentScene(0);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scene 1: The Problem */}
      <AnimatePresence mode="wait">
        {currentScene === 0 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="text-center max-w-4xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <motion.div 
                    className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto"
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-16 h-16 text-slate-400" />
                  </motion.div>
                  <motion.div
                    className="absolute -right-4 -top-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-2xl">😔</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white mb-6"
              >
                Finding Sports Partners is <span className="text-red-400">Hard</span>
              </motion.h2>

              <div className="space-y-4">
                {[
                  "🏃 Difficulty finding reliable players",
                  "💸 Unfair payment splits",
                  "⏰ Last-minute cancellations",
                  "🤷 No trust or accountability"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 backdrop-blur-sm"
                  >
                    <p className="text-slate-200">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Scene 2: The Solution */}
        {currentScene === 1 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="text-center max-w-4xl">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-40 h-40 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <Sparkles className="w-20 h-20 text-white" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Civta
                </span>
                <span className="text-white"> Changes Everything</span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: Users, label: "Sports", color: "from-cyan-500 to-blue-500" },
                  { icon: PartyPopper, label: "Events", color: "from-purple-500 to-pink-500" },
                  { icon: Heart, label: "Parties", color: "from-orange-500 to-red-500" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.2, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-br ${item.color} p-6 rounded-3xl shadow-xl`}
                  >
                    <item.icon className="w-12 h-12 text-white mx-auto mb-3" />
                    <p className="text-white">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-slate-200 mt-8 text-xl"
              >
                One platform for <span className="text-cyan-400">all your experiences</span>
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Scene 3: Trust & Safety */}
        {currentScene === 2 && (
          <motion.div
            key="scene3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="max-w-5xl w-full">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-center mb-12"
              >
                Built on <span className="text-green-400">Trust</span> & <span className="text-orange-400">Connection</span>
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Trust Score */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md p-8 rounded-3xl border border-green-500/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">Trust Score</h3>
                      <p className="text-slate-300 text-sm">Build reputation</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {["Reliability", "Respect", "Punctuality"].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{item}</span>
                          <span className="text-green-400">{95 - i * 5}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${95 - i * 5}%` }}
                            transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.6, type: "spring" }}
                    className="mt-6 flex gap-2 flex-wrap"
                  >
                    {["🌟 Newbie Friendly", "🛡️ High Trust", "⚡ Quick Reply"].map((badge, i) => (
                      <span key={i} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                        {badge}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Friendship Streak */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md p-8 rounded-3xl border border-orange-500/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">Friendship Streaks</h3>
                      <p className="text-slate-300 text-sm">Play together, grow together</p>
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <motion.div
                      className="inline-flex items-center gap-2 bg-orange-500/20 px-6 py-4 rounded-2xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-6xl">🔥</span>
                      <div className="text-left">
                        <div className="text-4xl text-orange-400">12</div>
                        <div className="text-slate-300 text-sm">Days Streak</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex justify-center gap-2">
                    {[...Array(14)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.0 + i * 0.05 }}
                        className={`w-5 h-5 rounded-full ${
                          i < 12 ? 'bg-orange-500' : 'bg-slate-700'
                        } flex items-center justify-center`}
                      >
                        {i < 12 && <CheckCircle className="w-3 h-3 text-white" />}
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="text-center text-slate-300 text-sm mt-6"
                  >
                    47 friends made through Civta! 🎉
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scene 4: Payment Flow */}
        {currentScene === 3 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="max-w-5xl w-full">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-center mb-12"
              >
                <span className="text-cyan-400">5-Stage</span> Payment Flow: Fair & Transparent
              </motion.h2>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform -translate-x-1/2 rounded-full" />

                <div className="space-y-6">
                  {[
                    { 
                      stage: 1, 
                      icon: UserPlus, 
                      title: "Free Joining", 
                      desc: "Join any match, no payment required",
                      color: "from-green-500 to-emerald-500" 
                    },
                    { 
                      stage: 2, 
                      icon: Users, 
                      title: "Soft Lock", 
                      desc: "Min players reached, match confirmed",
                      color: "from-yellow-500 to-orange-500" 
                    },
                    { 
                      stage: 3, 
                      icon: Clock, 
                      title: "Payment Window", 
                      desc: "30-90 mins to pay based on match time",
                      color: "from-orange-500 to-red-500" 
                    },
                    { 
                      stage: 4, 
                      icon: Shield, 
                      title: "Hard Lock", 
                      desc: "Unpaid players removed automatically",
                      color: "from-red-500 to-pink-500" 
                    },
                    { 
                      stage: 5, 
                      icon: CheckCircle, 
                      title: "Final Team", 
                      desc: "See exact share with committed players",
                      color: "from-purple-500 to-blue-500" 
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                      className="relative"
                    >
                      <div className="flex items-center gap-4">
                        {/* Stage Number */}
                        <motion.div
                          className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-white">{item.stage}</span>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{item.title}</h4>
                            <p className="text-slate-300 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scene 5: Build Connections */}
        {currentScene === 4 && (
          <motion.div
            key="scene5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="text-center max-w-4xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mb-8 relative"
              >
                {/* Central Heart */}
                <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto relative z-10">
                  <Heart className="w-16 h-16 text-white" fill="currentColor" />
                </div>

                {/* Orbiting Avatars */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl shadow-xl border-4 border-slate-900"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: Math.cos((i / 6) * Math.PI * 2) * 100 - 32,
                      y: Math.sin((i / 6) * Math.PI * 2) * 100 - 32,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2
                    }}
                  >
                    {['😊', '🎉', '⚽', '🎵', '🎨', '🏆'][i]}
                  </motion.div>
                ))}
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white mb-6"
              >
                Turn Every Experience Into a <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Connection</span>
              </motion.h2>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 mb-8"
              >
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {[
                    { value: "25K+", label: "Friends Made" },
                    { value: "1,500+", label: "Events" },
                    { value: "97%", label: "Happy Users" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.15, type: "spring" }}
                    >
                      <div className="text-3xl text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                        {stat.value}
                      </div>
                      <div className="text-slate-300 text-sm mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="text-slate-200 text-xl"
                >
                  Because life's best moments happen when we come together ✨
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.9 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-8 py-4 rounded-full text-white shadow-2xl"
              >
                <span className="text-xl">Join Civta Today</span>
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Elements - REMOVED */}
    </div>
  );
}