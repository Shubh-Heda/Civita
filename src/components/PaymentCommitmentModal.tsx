/**
 * Payment Commitment Modal
 * Shows transparent pricing breakdown and requires explicit confirmation
 * before user commits to a match with payment liability
 */

import { useState } from 'react';
import { X, Check, AlertCircle, DollarSign, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PaymentCommitmentModalProps {
  matchTitle: string;
  turfName: string;
  matchDate: string;
  matchTime: string;
  totalCost: number;
  minPlayers: number;
  maxPlayers: number;
  costPerPlayerMin: number;
  costPerPlayerMax: number;
  paymentDeadline: Date;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentCommitmentModal({
  matchTitle,
  turfName,
  matchDate,
  matchTime,
  totalCost,
  minPlayers,
  maxPlayers,
  costPerPlayerMin,
  costPerPlayerMax,
  paymentDeadline,
  onConfirm,
  onCancel,
}: PaymentCommitmentModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const daysUntilDeadline = Math.ceil(
    (paymentDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-4 flex items-center justify-between border-b">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Confirm Your Commitment</h2>
            <p className="text-white/90 text-sm">Review payment details before joining</p>
          </div>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Match Details */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">📍 Match Details</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600">
                  <strong>Match:</strong> {matchTitle}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600">
                  <strong>Turf:</strong> {turfName}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600">
                  <strong>Date & Time:</strong> {matchDate} at {matchTime}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-slate-600">
                  <strong>Players:</strong> {minPlayers}-{maxPlayers}
                </span>
              </div>
            </div>
          </div>

          {/* Transparent Pricing Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-900">💰 Your Payment Commitment</h3>
            </div>

            {/* Cost Formula */}
            <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
              <p className="text-sm font-mono text-green-900 mb-2">
                <strong>Cost Formula:</strong>
              </p>
              <p className="text-sm font-mono bg-green-50 p-3 rounded text-green-900">
                Cost per person = ₹{totalCost} ÷ [Number of Players]
              </p>
            </div>

            {/* Cost Scenarios */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-semibold text-green-900">Possible cost ranges:</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                  <p className="text-xs text-slate-600 font-semibold mb-1">Minimum ({minPlayers})</p>
                  <p className="text-lg font-bold text-green-700">₹{costPerPlayerMin}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                  <p className="text-xs text-slate-600 font-semibold mb-1">Mid-range</p>
                  <p className="text-lg font-bold text-slate-700">₹{Math.round((costPerPlayerMin + costPerPlayerMax) / 2)}</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-3 border border-green-300 text-center">
                  <p className="text-xs text-green-700 font-semibold mb-1">Maximum ({maxPlayers})</p>
                  <p className="text-lg font-bold text-green-800">₹{costPerPlayerMax}</p>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-white border-l-4 border-green-500 p-3 rounded flex gap-3">
              <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="text-sm text-green-900">
                <p className="font-semibold mb-1">Final cost depends on participation:</p>
                <p className="text-green-800">
                  Your exact payment will be calculated on the <strong>{paymentDeadline.toLocaleDateString()}</strong> based on how many players actually join.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Deadline Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-blue-900">⏰ Payment Deadline</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-900">Payment Due:</span>
                  <span className="font-bold text-lg text-blue-700">
                    {paymentDeadline.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-blue-600">
                  That's in <strong>{daysUntilDeadline} days</strong>
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-sm font-semibold text-blue-900 mb-1">Automatic Reminders:</p>
                <div className="flex flex-wrap gap-1">
                  <Badge className="bg-blue-200 text-blue-900 text-xs">7 days</Badge>
                  <Badge className="bg-blue-200 text-blue-900 text-xs">3 days</Badge>
                  <Badge className="bg-blue-200 text-blue-900 text-xs">1 day</Badge>
                  <Badge className="bg-blue-200 text-blue-900 text-xs">Hourly (last 24h)</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens After Soft Lock */}
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300">
            <h3 className="font-bold text-purple-900 mb-4">📋 What Happens Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Players Join (Free)</p>
                  <p className="text-xs text-purple-800">You can invite up to {maxPlayers} players</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Soft Lock (At {minPlayers} players)</p>
                  <p className="text-xs text-purple-800">Group closes, payment window opens</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Payment (30-90 mins)</p>
                  <p className="text-xs text-purple-800">Everyone pays their share</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Hard Lock & Match</p>
                  <p className="text-xs text-purple-800">Team confirmed, match proceeds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Important Commitments</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>✓ You will pay between ₹{costPerPlayerMax} - ₹{costPerPlayerMin} per person</li>
                  <li>✓ Payment is mandatory by the deadline (automatic charge)</li>
                  <li>✓ No payment = your spot is removed from the match</li>
                  <li>✓ You'll receive automatic reminders at 7 days, 3 days, 1 day, and hourly</li>
                  <li>✓ Cancellation within 48 hours of deadline forfeits spot</li>
                </ul>
              </div>
            </div>

            <label className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-red-200 cursor-pointer hover:bg-red-50 transition-colors">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-sm font-semibold text-red-900">
                I understand and accept these payment terms
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-0 bg-white pt-4 border-t">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!agreedToTerms}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed gap-2"
            >
              <Check className="w-4 h-4" />
              Confirm & Join Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
