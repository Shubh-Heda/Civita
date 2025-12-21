import { CheckCircle, Heart, Users, Sparkles, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PreMatchExpectationsProps {
  matchType: string;
  isFirstMatch?: boolean;
  onConfirm: () => void;
}

export function PreMatchExpectations({ matchType, isFirstMatch, onConfirm }: PreMatchExpectationsProps) {
  return (
    <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl p-6 border border-cyan-200 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-cyan-900 mb-1">
            {isFirstMatch ? 'Welcome to Your First Match! 🎉' : 'Match Day Guidelines ⚽'}
          </h3>
          <p className="text-sm text-cyan-700 mb-4">
            {isFirstMatch
              ? 'We\'re excited to have you! Here\'s what to expect for a great experience:'
              : 'Quick reminders for an awesome game together:'}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
          <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-slate-900 mb-1">Friendly & Inclusive Vibes</div>
            <p className="text-xs text-slate-600">
              All skill levels welcome. We play for fun and friendship, not just to win.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
          <Users className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-slate-900 mb-1">Respectful Communication</div>
            <p className="text-xs text-slate-600">
              Encourage teammates, respect opponents, and keep the energy positive.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-slate-900 mb-1">Show Up on Time</div>
            <p className="text-xs text-slate-600">
              Arrive 10-15 mins early. If running late or can't make it, let everyone know ASAP.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
          <Target className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-slate-900 mb-1">Safety First</div>
            <p className="text-xs text-slate-600">
              Play fair, avoid dangerous moves, and look out for each other's well-being.
            </p>
          </div>
        </div>
      </div>

      {isFirstMatch && (
        <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-orange-800">
            <span className="inline-block mr-1">🛡️</span>
            <strong>Your First-Match Shield is active!</strong> Let others know if you need guidance,
            and don't hesitate to ask questions. Everyone here wants you to have a great time!
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-cyan-200">
        <p className="text-xs text-slate-600">
          By joining, you agree to our community guidelines
        </p>
        <Button
          onClick={onConfirm}
          className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Got it, Let's Play!
        </Button>
      </div>
    </div>
  );
}
