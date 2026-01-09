/**
 * Pricing & Deadline Display Component
 * Shows transparent pricing breakdown and payment deadline information
 */

import { Clock, DollarSign, TrendingDown, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface PricingDeadlineDisplayProps {
  turfCost: number;
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
  paymentDeadline: Date;
  matchDateTime: Date;
  compact?: boolean;
}

export function PricingDeadlineDisplay({
  turfCost,
  currentPlayers,
  minPlayers,
  maxPlayers,
  paymentDeadline,
  matchDateTime,
  compact = false,
}: PricingDeadlineDisplayProps) {
  const costPerPlayerCurrent = Math.round(turfCost / Math.max(currentPlayers, 1));
  const costPerPlayerMin = Math.round(turfCost / minPlayers);
  const costPerPlayerMax = Math.round(turfCost / maxPlayers);

  const now = new Date();
  const timeUntilDeadline = paymentDeadline.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeUntilDeadline / (1000 * 60 * 60));
  const daysLeft = Math.floor(hoursLeft / 24);

  const getDeadlineColor = () => {
    if (daysLeft <= 0) return 'bg-red-50 border-red-300 text-red-900';
    if (daysLeft <= 1) return 'bg-orange-50 border-orange-300 text-orange-900';
    if (daysLeft <= 3) return 'bg-yellow-50 border-yellow-300 text-yellow-900';
    return 'bg-green-50 border-green-300 text-green-900';
  };

  const formatDeadlineTime = () => {
    if (daysLeft <= 0 && hoursLeft <= 0) return 'Deadline reached!';
    if (hoursLeft <= 0) return `Today at ${paymentDeadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (daysLeft === 0) return `${hoursLeft}h left`;
    return `${daysLeft}d ${hoursLeft % 24}h left`;
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {/* Compact Pricing */}
        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-cyan-600" />
            <span className="text-sm text-slate-600">Cost per person:</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-cyan-700">₹{costPerPlayerCurrent}</span>
            {currentPlayers < maxPlayers && (
              <span className="text-xs text-slate-500">(₹{costPerPlayerMax} at max)</span>
            )}
          </div>
        </div>

        {/* Compact Deadline */}
        <div className={`flex items-center justify-between rounded-lg p-3 border-2 ${getDeadlineColor()}`}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Payment deadline:</span>
          </div>
          <span className="font-bold">{formatDeadlineTime()}</span>
        </div>
      </div>
    );
  }

  // Full Display
  return (
    <div className="space-y-4">
      {/* Pricing Breakdown */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-300 p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-6 h-6 text-cyan-600" />
          <h3 className="text-lg font-semibold text-cyan-900">Pricing Breakdown</h3>
        </div>

        <div className="space-y-3">
          {/* Current Cost */}
          <div className="bg-white rounded-lg p-4 border border-cyan-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-cyan-700">
                <strong>Cost per person</strong> (with {currentPlayers} players)
              </span>
              <span className="text-2xl font-bold text-cyan-700">₹{costPerPlayerCurrent}</span>
            </div>
            <p className="text-xs text-cyan-600">Total: ₹{turfCost}</p>
          </div>

          {/* Cost Comparison */}
          {currentPlayers !== maxPlayers && (
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                <p className="text-xs text-slate-600 mb-1">Min ({minPlayers})</p>
                <p className="font-bold text-cyan-600">₹{costPerPlayerMin}</p>
              </div>
              <div className="bg-cyan-100 rounded-lg p-3 border border-cyan-300 text-center">
                <p className="text-xs text-cyan-700 mb-1">Current ({currentPlayers})</p>
                <p className="font-bold text-cyan-700">₹{costPerPlayerCurrent}</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-3 border border-green-300 text-center">
                <p className="text-xs text-green-700 mb-1">Max ({maxPlayers}) 🎉</p>
                <p className="font-bold text-green-700">₹{costPerPlayerMax}</p>
              </div>
            </div>
          )}

          {/* Savings Info */}
          {costPerPlayerMax < costPerPlayerMin && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded flex items-start gap-2">
              <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-green-900 mb-1">
                  Save {((costPerPlayerMin - costPerPlayerMax) / costPerPlayerMin * 100).toFixed(0)}% when all {maxPlayers} players join!
                </p>
                <p className="text-xs text-green-700">That's ₹{costPerPlayerMin - costPerPlayerMax} savings per person</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deadline & Reminders */}
      <div className={`rounded-xl border-2 p-6 ${getDeadlineColor()}`}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Payment Deadline</h3>
        </div>

        <div className="space-y-3">
          {/* Deadline Time */}
          <div className="bg-white rounded-lg p-4 border">
            <p className="text-sm text-slate-600 mb-2">Deadline:</p>
            <p className="text-xl font-bold">
              {paymentDeadline.toLocaleString([], {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p className="text-sm font-bold mt-2">{formatDeadlineTime()}</p>
          </div>

          {/* Reminders Schedule */}
          <div className="bg-white rounded-lg p-3 border">
            <p className="text-xs font-semibold text-slate-900 mb-2">You'll receive reminders:</p>
            <div className="flex flex-wrap gap-2">
              {daysLeft >= 7 && (
                <Badge variant="outline" className="text-xs">📅 7 days before</Badge>
              )}
              {daysLeft >= 3 && (
                <Badge variant="outline" className="text-xs">📅 3 days before</Badge>
              )}
              {daysLeft >= 1 && (
                <Badge variant="outline" className="text-xs">🔔 1 day before</Badge>
              )}
              {daysLeft <= 1 && (
                <Badge variant="outline" className="text-xs">⏰ Hourly reminders</Badge>
              )}
            </div>
          </div>

          {/* Alert if close */}
          {daysLeft <= 1 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-red-900">Payment required soon!</p>
                <p className="text-xs text-red-700">Make sure you have your payment method ready</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-blue-900 mb-1">How This Works:</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Cost per person depends on final player count</li>
            <li>• More players join = cheaper for everyone</li>
            <li>• Payment is required by deadline - no exceptions</li>
            <li>• Set phone reminders to never miss a deadline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
