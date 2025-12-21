import { motion } from 'motion/react';
import { Users, Clock, Gamepad2, MapPin, Zap } from 'lucide-react';
import { GamingSession } from '../services/gamingService';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface GamingSessionCardProps {
  session: GamingSession;
  onJoin: (sessionId: string) => void;
}

export function GamingSessionCard({ session, onJoin }: GamingSessionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white mb-2">{session.gameSpecific ? session.gameName : 'Open Gaming'}</h3>
          <p className="text-cyan-200 text-sm">{session.clubName}</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
          {session.platform}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-cyan-200">
          <Clock className="w-4 h-4" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-cyan-200">
          <Users className="w-4 h-4" />
          <span>{session.currentPlayers}/{session.maxPlayers}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-xl">₹{session.pricePerPerson}</p>
          <p className="text-xs text-slate-400">per person</p>
        </div>
        <Button
          onClick={() => onJoin(session.id)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          Join Session
        </Button>
      </div>
    </motion.div>
  );
}
