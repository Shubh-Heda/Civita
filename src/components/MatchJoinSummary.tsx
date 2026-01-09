/**
 * Match Join Summary
 * Shows transparent pricing, deadline, and cost breakdown before user joins
 * Integrates with PaymentCommitmentModal for explicit confirmation
 */

import { useState } from 'react';
import { ArrowLeft, Users, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PaymentCommitmentModal } from './PaymentCommitmentModal';
import { PricingDeadlineDisplay } from './PricingDeadlineDisplay';

interface MatchJoinSummaryProps {
  matchId: string;
  matchTitle: string;
  turfName: string;
  matchDate: string;
  matchTime: string;
  sport: string;
  totalCost: number;
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  paymentDeadline: Date;
  onConfirm: (matchId: string) => Promise<void>;
  onCancel: () => void;
}

export function MatchJoinSummary({
  matchId,
  matchTitle,
  turfName,
  matchDate,
  matchTime,
  sport,
  totalCost,
  currentPlayers,
  minPlayers,
  maxPlayers,
  paymentDeadline,
  onConfirm,
  onCancel,
}: MatchJoinSummaryProps) {
  const [showCommitmentModal, setShowCommitmentModal] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const costPerPlayerMin = Math.round(totalCost / minPlayers);
  const costPerPlayerMax = Math.round(totalCost / maxPlayers);
  const costPerPlayerCurrent = Math.round(totalCost / currentPlayers);

  const matchDateTime = new Date(`${matchDate} ${matchTime}`);

  const handleConfirmJoin = async () => {
    setIsJoining(true);
    try {
      await onConfirm(matchId);
      setShowCommitmentModal(false);
    } catch (error) {
      console.error('Failed to join match:', error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="space-y-6">
            {/* Quick Match Info */}
            <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-white/20 text-white mb-3">{sport}</Badge>
                  <h1 className="text-3xl font-bold mb-2">{matchTitle}</h1>
                  <p className="text-white/90">{turfName}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">📅 Date & Time</p>
                  <p className="font-semibold">{matchDate} at {matchTime}</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">👥 Players</p>
                  <p className="font-semibold">{currentPlayers}/{maxPlayers} confirmed</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">💰 Total Cost</p>
                  <p className="font-semibold">₹{totalCost}</p>
                </div>
              </div>
            </div>

            {/* Pricing & Deadline Display */}
            <PricingDeadlineDisplay
              turfCost={totalCost}
              currentPlayers={currentPlayers}
              minPlayers={minPlayers}
              maxPlayers={maxPlayers}
              paymentDeadline={paymentDeadline}
              matchDateTime={matchDateTime}
              compact={false}
            />

            {/* Why This Works Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Why This Payment Model Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Fair & Transparent</h3>
                    <p className="text-slate-600 text-sm">
                      Everyone pays the exact same amount based on final headcount. No hidden costs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Lowest Possible Cost</h3>
                    <p className="text-slate-600 text-sm">
                      The more people join, the cheaper it gets for everyone. Incentivizes participation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Clear Timeline</h3>
                    <p className="text-slate-600 text-sm">
                      Know exactly when payment is due. Automatic reminders keep everyone on track.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">No Surprises</h3>
                    <p className="text-slate-600 text-sm">
                      Cost range is clear upfront. You'll be reminded multiple times before deadline.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment Checklist */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-300 p-8">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Before You Join - Please Confirm:</h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-1" readOnly />
                  <span className="text-indigo-900">
                    I understand the cost will be between <strong>₹{costPerPlayerMax}</strong> and <strong>₹{costPerPlayerMin}</strong> per person
                  </span>
                </label>
                <label className="flex items-start gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-1" readOnly />
                  <span className="text-indigo-900">
                    Final cost depends on how many players actually join by the deadline
                  </span>
                </label>
                <label className="flex items-start gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-1" readOnly />
                  <span className="text-indigo-900">
                    I will receive automatic reminders at 7 days, 3 days, 1 day, and hourly before deadline
                  </span>
                </label>
                <label className="flex items-start gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-1" readOnly />
                  <span className="text-indigo-900">
                    Payment is <strong>mandatory</strong> by {paymentDeadline.toLocaleDateString()} at {paymentDeadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </label>
                <label className="flex items-start gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 mt-1" readOnly />
                  <span className="text-indigo-900">
                    If I don't pay by the deadline, I will be removed from the match and my spot given to someone else
                  </span>
                </label>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-gradient-to-t from-slate-900 to-slate-900/0 pt-4">
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowCommitmentModal(true)}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white text-lg py-6 gap-2"
              >
                Review & Confirm Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Commitment Modal */}
      {showCommitmentModal && (
        <PaymentCommitmentModal
          matchTitle={matchTitle}
          turfName={turfName}
          matchDate={matchDate}
          matchTime={matchTime}
          totalCost={totalCost}
          minPlayers={minPlayers}
          maxPlayers={maxPlayers}
          costPerPlayerMin={costPerPlayerMin}
          costPerPlayerMax={costPerPlayerMax}
          paymentDeadline={paymentDeadline}
          onConfirm={handleConfirmJoin}
          onCancel={() => setShowCommitmentModal(false)}
        />
      )}
    </>
  );
}
