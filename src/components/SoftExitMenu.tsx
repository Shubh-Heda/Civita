import { useState } from 'react';
import { LogOut, PauseCircle, BellOff, Heart, AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface SoftExitMenuProps {
  groupName: string;
  onClose: () => void;
}

export function SoftExitMenu({ groupName, onClose }: SoftExitMenuProps) {
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showPauseConfirmation, setShowPauseConfirmation] = useState(false);

  const handleMuteNotifications = () => {
    toast.success('Notifications muted 🔕', {
      description: 'You can unmute anytime from group settings',
    });
    onClose();
  };

  const handlePauseGroup = () => {
    setShowPauseConfirmation(true);
  };

  const confirmPause = () => {
    toast.success('Group paused successfully 📭', {
      description: 'The group will be hidden from your active chats. You can resume it anytime!',
    });
    onClose();
  };

  const handleLeaveGroup = () => {
    setShowLeaveConfirmation(true);
  };

  const confirmLeave = () => {
    toast.success('You\'ve left the group ✅', {
      description: 'No hard feelings! You can always join again if you change your mind.',
    });
    onClose();
  };

  if (showLeaveConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="mb-2">Leave {groupName}?</h2>
            <p className="text-slate-600">
              We'll miss you, but we understand! No explanations needed.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 border border-cyan-200 rounded-xl p-4 mb-6">
            <h3 className="text-cyan-900 mb-2">What happens next:</h3>
            <ul className="space-y-2 text-sm text-cyan-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">✓</span>
                <span>You'll stop receiving messages from this group</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">✓</span>
                <span>Your trust score stays the same</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">✓</span>
                <span>You can rejoin anytime if invited again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 flex-shrink-0">✓</span>
                <span>No awkward notifications to other members</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLeaveConfirmation(false)}
              className="flex-1"
            >
              Stay in Group
            </Button>
            <Button
              onClick={confirmLeave}
              variant="destructive"
              className="flex-1"
            >
              Leave Group
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showPauseConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PauseCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="mb-2">Pause {groupName}?</h2>
            <p className="text-slate-600">
              Take a break without leaving completely
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
            <h3 className="text-purple-900 mb-2">While paused:</h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">✓</span>
                <span>Group moves to your archived chats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">✓</span>
                <span>You stay a member (no one knows you paused)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">✓</span>
                <span>Messages are saved when you return</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">✓</span>
                <span>Resume anytime with one click</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPauseConfirmation(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmPause}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Pause Group
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b flex items-center justify-between">
          <h2>Group Options</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {/* Mute Notifications */}
          <button
            onClick={handleMuteNotifications}
            className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-start gap-4 text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BellOff className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-slate-900 mb-1">Mute Notifications</div>
              <p className="text-sm text-slate-600">
                Stay in the group but silence message alerts
              </p>
            </div>
          </button>

          {/* Pause Group */}
          <button
            onClick={handlePauseGroup}
            className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-start gap-4 text-left"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <PauseCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-slate-900 mb-1">Pause Group</div>
              <p className="text-sm text-slate-600">
                Take a break without leaving. Archive chat for now
              </p>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs mt-2">
                Recommended
              </Badge>
            </div>
          </button>

          {/* Leave Group */}
          <button
            onClick={handleLeaveGroup}
            className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all flex items-start gap-4 text-left"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="text-slate-900 mb-1">Leave Group</div>
              <p className="text-sm text-slate-600">
                Exit this group completely (no judgment!)
              </p>
            </div>
          </button>
        </div>

        <div className="p-6 border-t bg-gradient-to-br from-cyan-50 to-emerald-50">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-slate-700">
                <strong>Remember:</strong> There's no pressure to stay. Your mental health and
                comfort matter more than any group chat. We'll always welcome you back! 💙
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full border ${className}`}>
      {children}
    </span>
  );
}
