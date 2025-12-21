import { useState, useEffect } from 'react';
import { Clock, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface MatchCountdownTimerProps {
  matchDate: string; // e.g., "2025-12-05"
  matchTime: string; // e.g., "6:00 PM"
  matchTitle: string;
  onDismiss?: () => void;
  showDismiss?: boolean;
}

export function MatchCountdownTimer({
  matchDate,
  matchTime,
  matchTitle,
  onDismiss,
  showDismiss = true,
}: MatchCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
  } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Parse match date and time
    const parseMatchDateTime = () => {
      try {
        // Combine date and time
        const dateStr = matchDate;
        const timeStr = matchTime;
        
        // Convert 12-hour format to 24-hour
        const timeParts = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!timeParts) return null;
        
        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const period = timeParts[3].toUpperCase();
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        const matchDateTime = new Date(dateStr);
        matchDateTime.setHours(hours, minutes, 0, 0);
        
        return matchDateTime;
      } catch (error) {
        console.error('Error parsing match date/time:', error);
        return null;
      }
    };

    const matchDateTime = parseMatchDateTime();
    if (!matchDateTime) return;

    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const diff = matchDateTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: 0,
        });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalMs: diff,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [matchDate, matchTime]);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  if (isDismissed || !timeLeft) return null;

  // Don't show if match is in the past
  if (timeLeft.totalMs <= 0) return null;

  // Determine urgency level
  const isUrgent = timeLeft.totalMs < 24 * 60 * 60 * 1000; // Less than 24 hours
  const isCritical = timeLeft.totalMs < 60 * 60 * 1000; // Less than 1 hour

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`rounded-xl p-4 border-2 ${
          isCritical
            ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
            : isUrgent
            ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300'
            : 'bg-gradient-to-r from-cyan-50 to-emerald-50 border-cyan-300'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isCritical
                ? 'bg-red-500'
                : isUrgent
                ? 'bg-orange-500'
                : 'bg-cyan-500'
            }`}
          >
            {isCritical ? (
              <AlertCircle className="w-5 h-5 text-white animate-pulse" />
            ) : (
              <Clock className="w-5 h-5 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-sm text-slate-900 truncate">
                {isCritical ? '⚡ Match Starting Soon!' : isUrgent ? '⏰ Match Tomorrow' : '📅 Upcoming Match'}
              </h4>
              {showDismiss && (
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>

            <p className="text-xs text-slate-700 mb-3">{matchTitle}</p>

            {/* Countdown Display */}
            <div className="flex items-center gap-2">
              {timeLeft.days > 0 && (
                <div className="text-center">
                  <div
                    className={`text-lg ${
                      isCritical
                        ? 'text-red-600'
                        : isUrgent
                        ? 'text-orange-600'
                        : 'text-cyan-600'
                    }`}
                  >
                    {timeLeft.days}
                  </div>
                  <div className="text-xs text-slate-600">days</div>
                </div>
              )}

              {(timeLeft.days > 0 || timeLeft.hours > 0) && (
                <>
                  {timeLeft.days > 0 && <span className="text-slate-400">:</span>}
                  <div className="text-center">
                    <div
                      className={`text-lg ${
                        isCritical
                          ? 'text-red-600'
                          : isUrgent
                          ? 'text-orange-600'
                          : 'text-cyan-600'
                      }`}
                    >
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-slate-600">hours</div>
                  </div>
                </>
              )}

              <span className="text-slate-400">:</span>
              <div className="text-center">
                <div
                  className={`text-lg ${
                    isCritical
                      ? 'text-red-600'
                      : isUrgent
                      ? 'text-orange-600'
                      : 'text-cyan-600'
                  }`}
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-slate-600">mins</div>
              </div>

              {isCritical && (
                <>
                  <span className="text-slate-400">:</span>
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-lg text-red-600"
                    >
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </motion.div>
                    <div className="text-xs text-slate-600">secs</div>
                  </div>
                </>
              )}
            </div>

            {/* Urgency Message */}
            {isCritical && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Get ready! Match starts very soon
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
