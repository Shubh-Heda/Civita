import { motion } from 'motion/react';
import { Shield, TrendingUp, Clock, Heart, Star, CheckCircle } from 'lucide-react';
import { userService } from '../services/userService';

interface TrustScoreBreakdownProps {
  userId: string;
}

export function TrustScoreBreakdown({ userId }: TrustScoreBreakdownProps) {
  const user = userService.getUserById(userId);

  if (!user) {
    return <div className="text-center text-slate-400">User not found</div>;
  }

  const trustScore = user.trustScore || 75;

  // Calculate component scores (mock breakdown)
  const reliability = Math.min(95, trustScore + Math.floor(Math.random() * 10));
  const respect = Math.min(93, trustScore - Math.floor(Math.random() * 5));
  const consistency = Math.min(90, trustScore - Math.floor(Math.random() * 8));

  const components = [
    {
      name: 'Reliability',
      score: reliability,
      weight: 40,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      description: 'Showing up on time, honoring commitments',
      tips: [
        'Always arrive on time for matches',
        'Confirm attendance early',
        'Update status if plans change'
      ]
    },
    {
      name: 'Respect',
      score: respect,
      weight: 35,
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      description: 'Positive interactions, sportsmanship',
      tips: [
        'Be friendly and encouraging',
        'Respect all skill levels',
        'Give constructive feedback'
      ]
    },
    {
      name: 'Consistency',
      score: consistency,
      weight: 25,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      description: 'Regular participation, building relationships',
      tips: [
        'Play regularly to build streaks',
        'Engage with community',
        'Share post-match reflections'
      ]
    }
  ];

  const getTrustLevel = (score: number) => {
    if (score >= 95) return { level: 'Exceptional', color: 'text-yellow-400' };
    if (score >= 90) return { level: 'Excellent', color: 'text-green-400' };
    if (score >= 80) return { level: 'Good', color: 'text-blue-400' };
    if (score >= 70) return { level: 'Fair', color: 'text-orange-400' };
    return { level: 'Needs Improvement', color: 'text-red-400' };
  };

  const trustLevel = getTrustLevel(trustScore);

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-3xl p-8 border border-green-500/20 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
        >
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white">{user.trustScore}</span>
          </div>
        </motion.div>

        <h3 className="text-white mb-1">Trust Score</h3>
        <p className={`mb-4 ${trustLevel.color}`}>{trustLevel.level}</p>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span>+3 points this week</span>
        </div>
      </motion.div>

      {/* Component Breakdown */}
      <div className="space-y-4">
        <h3 className="text-white flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Score Breakdown
        </h3>

        {components.map((component, index) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center flex-shrink-0`}>
                <component.icon className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white">{component.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg">{component.score}</span>
                    <span className="text-slate-500 text-sm">/ 100</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-3">{component.description}</p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Weight: {component.weight}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${component.score}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${component.color}`}
                    />
                  </div>
                </div>

                {/* Tips */}
                <details className="group">
                  <summary className="text-sm text-cyan-400 cursor-pointer hover:text-cyan-300">
                    How to improve →
                  </summary>
                  <ul className="mt-2 space-y-1 text-sm text-slate-400">
                    {component.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Star className="w-3 h-3 mt-0.5 flex-shrink-0 text-yellow-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Behavioral Badges */}
      <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
        <h3 className="text-white mb-4">Your Badges</h3>
        {user.badges && user.badges.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {user.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-4 border border-purple-500/20 text-center"
              >
                <div className="text-3xl mb-2">{badge === 'High trust zone' ? '🛡️' : badge === 'Newbie-friendly' ? '🌟' : badge === 'Experienced' ? '⚡' : '✨'}</div>
                <div className="text-sm text-white">{badge}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-6">
            <p>Keep playing to earn badges!</p>
          </div>
        )}
      </div>

      {/* Community Comparison */}
      <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50">
        <h3 className="text-white mb-4">Community Comparison</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Your Score</span>
              <span className="text-green-400">{user.trustScore}</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${user.trustScore}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Community Average</span>
              <span className="text-blue-400">78</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '78%' }} />
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <p className="text-green-400 text-sm text-center">
              You're in the top 15% of the community! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}