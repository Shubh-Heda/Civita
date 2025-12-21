import { motion } from 'motion/react';
import { Users, Sparkles, Heart, MessageCircle, Star } from 'lucide-react';
import { mockDataService } from '../services/mockDataService';

interface PreMatchIceBreakersProps {
  matchId: string;
  players: Array<{ id: string; name: string; avatar: string }>;
  userId: string;
}

export function PreMatchIceBreakers({ matchId, players, userId }: PreMatchIceBreakersProps) {
  // Conversation starters
  const conversationStarters = [
    "What's your favorite sports memory?",
    "How long have you been playing?",
    "What got you into this sport?",
    "Any pre-match rituals or routines?",
    "Who's your sports idol?",
    "What's the best match you've ever played?"
  ];

  // Fun facts generator (mock data)
  const getFunFact = (playerId: string) => {
    const facts = [
      "🎯 Has a 15-match winning streak",
      "⚡ Fastest player in the group",
      "🌟 Loves helping newbies",
      "🎵 Always brings the best playlist",
      "🏆 Tournament winner",
      "💪 Never misses morning matches",
      "🎨 Creative play style",
      "🤝 Known for great teamwork"
    ];
    // Deterministic selection based on player ID
    const index = playerId.charCodeAt(playerId.length - 1) % facts.length;
    return facts[index];
  };

  // Common interests (mock)
  const getCommonInterests = (playerId: string) => {
    const interests = [
      ['Football', 'Music', 'Travel'],
      ['Cricket', 'Movies', 'Food'],
      ['Basketball', 'Gaming', 'Photography'],
      ['Tennis', 'Reading', 'Hiking']
    ];
    const index = playerId.charCodeAt(playerId.length - 1) % interests.length;
    return interests[index];
  };

  const newPlayers = players.filter(p => {
    // Mock: consider players as "new" if their ID ends with certain numbers
    return p.id.charCodeAt(p.id.length - 1) % 3 === 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-3xl p-6 border border-cyan-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Pre-Match Ice Breakers</h2>
            <p className="text-slate-400">Get to know your teammates before the match!</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
          <p className="text-cyan-400 text-sm flex items-start gap-2">
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Breaking the ice helps build trust and makes the match more fun for everyone!
            </span>
          </p>
        </div>
      </motion.div>

      {/* New Players Welcome */}
      {newPlayers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-3xl p-6 border border-green-500/20"
        >
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Welcome New Players! 🌟
          </h3>

          <div className="space-y-3">
            {newPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-slate-800/60 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-12 h-12 rounded-xl border-2 border-green-500"
                  />
                  <div className="flex-1">
                    <div className="text-white mb-1">{player.name}</div>
                    <div className="text-sm text-green-400">First time playing with us!</div>
                  </div>
                  <div className="text-2xl">👋</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <p className="text-green-400 text-sm text-center">
              💚 Let's make them feel welcome and ensure they have a great time!
            </p>
          </div>
        </motion.div>
      )}

      {/* Player Profiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-400" />
          Meet Your Teammates
        </h3>

        {players.map((player, index) => {
          const funFact = getFunFact(player.id);
          const interests = getCommonInterests(player.id);
          const isYou = player.id === userId;

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`bg-slate-800/40 rounded-2xl p-5 border ${
                isYou 
                  ? 'border-purple-500/30 bg-purple-900/10' 
                  : 'border-slate-700/50'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl ${
                  isYou ? 'ring-2 ring-purple-500' : ''
                }`}>
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-full h-full rounded-xl"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white">{player.name}</h4>
                    {isYou && (
                      <span className="px-2 py-0.5 bg-purple-500/20 rounded-full text-xs text-purple-400">
                        You
                      </span>
                    )}
                  </div>

                  {/* Fun Fact */}
                  <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span>{funFact}</span>
                  </div>

                  {/* Common Interests */}
                  {!isYou && (
                    <div>
                      <div className="text-xs text-slate-500 mb-2">Interests you might share:</div>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-700/60 rounded-full text-xs text-slate-300"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Conversation Starters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50"
      >
        <h3 className="text-white mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          Conversation Starters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conversationStarters.map((starter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-slate-700/40 rounded-xl p-4 border border-slate-700 hover:border-cyan-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl group-hover:scale-110 transition-transform">💬</div>
                <p className="text-slate-300 text-sm">{starter}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
          <p className="text-cyan-400 text-sm text-center">
            💡 Pro tip: Ask these in the group chat before the match to break the ice!
          </p>
        </div>
      </motion.div>

      {/* Community Guidelines Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl p-6 border border-purple-500/20"
      >
        <h3 className="text-white mb-4">Remember: Friendship First 💜</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Be welcoming and inclusive to all skill levels</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Encourage and support your teammates</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Focus on fun and connection over competition</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Respect everyone's boundaries and comfort levels</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
