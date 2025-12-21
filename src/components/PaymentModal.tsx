import { useState } from 'react';
import { X, CreditCard, Wallet, Smartphone, CheckCircle, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface PaymentModalProps {
  onClose: () => void;
  matchDate: string;
  matchTime: string;
  amountPaid: number;
  totalAmount: number;
  turfName: string;
}

type PaymentMethod = 'card' | 'upi' | 'wallet';

export function PaymentModal({ onClose, matchDate, matchTime, amountPaid, totalAmount, turfName }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const remainingAmount = totalAmount - amountPaid;

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment Successful! 🎉', {
        description: `₹${remainingAmount} paid for ${turfName}`,
      });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60] overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-50 via-white to-cyan-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8 shadow-2xl border border-cyan-100">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 border-b p-6 z-10 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-white">Complete Payment</h2>
              <p className="text-cyan-50">{turfName} • {matchDate} • {matchTime}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors bg-white/20 rounded-lg p-2 hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount Summary */}
          <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl p-6 border border-cyan-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Total Amount</span>
                <span className="text-slate-900">₹{totalAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Already Paid</span>
                <span className="text-emerald-600">₹{amountPaid}</span>
              </div>
              <div className="border-t border-cyan-200 pt-3 flex items-center justify-between">
                <span className="">Amount Due</span>
                <span className="text-cyan-600">₹{remainingAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm mb-3">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedMethod('upi')}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedMethod === 'upi'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Smartphone className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMethod === 'upi' ? 'text-cyan-600' : 'text-slate-400'
                }`} />
                <div className="text-sm">UPI</div>
              </button>

              <button
                onClick={() => setSelectedMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedMethod === 'card'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMethod === 'card' ? 'text-cyan-600' : 'text-slate-400'
                }`} />
                <div className="text-sm">Card</div>
              </button>

              <button
                onClick={() => setSelectedMethod('wallet')}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedMethod === 'wallet'
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMethod === 'wallet' ? 'text-cyan-600' : 'text-slate-400'
                }`} />
                <div className="text-sm">Wallet</div>
              </button>
            </div>
          </div>

          {/* Payment Details */}
          {selectedMethod === 'upi' && (
            <div>
              <label className="block text-sm mb-2">UPI ID</label>
              <Input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="mb-2"
              />
              <p className="text-xs text-slate-500">
                Enter your UPI ID to complete the payment
              </p>
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Expiry Date</label>
                  <Input placeholder="MM/YY" maxLength={5} />
                </div>
                <div>
                  <label className="block text-sm mb-2">CVV</label>
                  <Input placeholder="123" maxLength={3} type="password" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Cardholder Name</label>
                <Input placeholder="Name on card" />
              </div>
            </div>
          )}

          {selectedMethod === 'wallet' && (
            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  P
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm">Paytm Wallet</div>
                  <div className="text-xs text-slate-500">Balance: ₹2,450</div>
                </div>
              </button>
              <button className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  G
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm">Google Pay</div>
                  <div className="text-xs text-slate-500">Linked</div>
                </div>
              </button>
            </div>
          )}

          {/* Security Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-blue-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-blue-700">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={processing || (selectedMethod === 'upi' && !upiId)}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Pay ₹{remainingAmount}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}