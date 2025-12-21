import { AlertCircle, CreditCard, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { PaymentModal } from './PaymentModal';

interface PaymentNotificationProps {
  matchDate: string; // ISO date string
  matchTime: string; // e.g., "6:00 PM"
  amountPaid: number;
  totalAmount: number;
  turfName: string;
}

export function PaymentNotification({
  matchDate,
  matchTime,
  amountPaid,
  totalAmount,
  turfName
}: PaymentNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      // Combine date and time to create full datetime
      const matchDateTime = new Date(`${matchDate} ${matchTime}`);
      const now = new Date();
      const timeDiff = matchDateTime.getTime() - now.getTime();
      const hoursUntilMatch = timeDiff / (1000 * 60 * 60);

      setHoursRemaining(Math.floor(hoursUntilMatch));

      // Show notification from creation until match time (as long as match hasn't passed)
      if (hoursUntilMatch > 0 && amountPaid < totalAmount) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [matchDate, matchTime, amountPaid, totalAmount]);

  const percentagePaid = (amountPaid / totalAmount) * 100;
  const isFullyPaid = amountPaid >= totalAmount;
  
  const getTimeDisplay = () => {
    if (hoursRemaining > 48) {
      const days = Math.floor(hoursRemaining / 24);
      return `${days}d`;
    } else if (hoursRemaining > 24) {
      const days = Math.floor(hoursRemaining / 24);
      const hours = hoursRemaining % 24;
      return `${days}d ${hours}h`;
    } else {
      return `${hoursRemaining}h`;
    }
  };

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
        >
          {/* Decorative animated border */}
          <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse" />
          
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center animate-pulse">
                    {isFullyPaid ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <AlertCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white flex items-center gap-2 mb-1">
                      <span className="animate-bounce inline-block">⚽</span>
                      Match Starting in {getTimeDisplay()} at {turfName}!
                    </h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-white/80" />
                        <div className="flex items-baseline gap-2">
                          <span className="text-white">₹{amountPaid}</span>
                          <span className="text-sm text-white/70">/ ₹{totalAmount}</span>
                          <span className="text-xs text-white/80">({Math.round(percentagePaid)}% paid)</span>
                        </div>
                      </div>
                      <div className="hidden md:block w-32 bg-white/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentagePaid}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${
                            isFullyPaid 
                              ? 'bg-green-400' 
                              : percentagePaid > 50 
                              ? 'bg-yellow-400' 
                              : 'bg-white'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 gap-1"
                  >
                    <Info className="w-3 h-3" />
                    Details
                  </Button>
                  {!isFullyPaid && (
                    <Button
                      size="sm"
                      className="bg-white text-purple-600 hover:bg-slate-50 gap-1"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      <CreditCard className="w-3 h-3" />
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          matchDate={matchDate}
          matchTime={matchTime}
          amountPaid={amountPaid}
          totalAmount={totalAmount}
          turfName={turfName}
        />
      )}
    </AnimatePresence>
  );
}