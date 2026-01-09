import { useState } from 'react';
import { X, CreditCard, Wallet, Smartphone, CheckCircle, Lock, Copy, QrCode } from 'lucide-react';
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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showUpiGateway, setShowUpiGateway] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);

  const remainingAmount = totalAmount - amountPaid;
  const merchantUPI = 'merchant@upi'; // Replace with actual merchant UPI

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method first');
      return;
    }

    // First click - just start the payment flow
    if (!paymentStarted) {
      setPaymentStarted(true);
      if (selectedMethod === 'upi') {
        setShowUpiGateway(true);
      }
      return;
    }

    // Second click - actually process the payment
    if (selectedMethod === 'upi' && !showUpiGateway) {
      setShowUpiGateway(true);
      return;
    }

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

  const copyUpiId = () => {
    navigator.clipboard.writeText(merchantUPI);
    toast.success('UPI ID copied to clipboard!');
  };

  const handleUpiAppClick = (app: string) => {
    setSelectedUpiApp(app);
    setProcessing(true);
    // Simulate opening UPI app and payment
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment Successful! 🎉', {
        description: `₹${remainingAmount} paid via ${app}`,
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
          {/* Payment Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600">Payment Progress</span>
                <span className="text-slate-900 font-semibold">{Math.round((amountPaid / totalAmount) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(amountPaid / totalAmount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Amount Summary - Enhanced */}
          <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl p-6 border border-cyan-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Total Amount</span>
                <span className="text-slate-900 font-semibold">₹{totalAmount}</span>
              </div>
              {amountPaid > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Already Paid</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">₹{amountPaid}</span>
                  </div>
                </div>
              )}
              <div className="border-t border-cyan-200 pt-3 flex items-center justify-between">
                <span className="text-slate-700 font-medium">Amount Due</span>
                <span className="text-lg font-bold text-cyan-600">₹{remainingAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection - Enhanced */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-slate-900">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setSelectedMethod('upi');
                  setPaymentStarted(false);
                  setShowUpiGateway(false);
                }}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedMethod === 'upi'
                    ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                    : 'border-slate-200 hover:border-cyan-300'
                }`}
              >
                <Smartphone className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMethod === 'upi' ? 'text-cyan-600' : 'text-slate-400'
                }`} />
                <div className="text-sm font-medium">UPI</div>
                <div className="text-xs text-slate-500 mt-1">Fast & Secure</div>
              </button>

              <button
                onClick={() => {
                  setSelectedMethod('card');
                  setPaymentStarted(false);
                }}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedMethod === 'card'
                    ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                    : 'border-slate-200 hover:border-cyan-300'
                }`}
              >
                <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMethod === 'card' ? 'text-cyan-600' : 'text-slate-400'
                }`} />
                <div className="text-sm font-medium">Card</div>
                <div className="text-xs text-slate-500 mt-1">Debit/Credit</div>
              </button>

              <button
                onClick={() => {
                  setSelectedMethod('wallet');
                  setPaymentStarted(false);
                }}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedMethod === 'wallet'
                    ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                    : 'border-slate-200 hover:border-cyan-300'
                }`}
              >
                <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMethod === 'wallet' ? 'text-cyan-600' : 'text-slate-400'
                }`} />
                <div className="text-sm font-medium">Wallet</div>
                <div className="text-xs text-slate-500 mt-1">Instant Pay</div>
              </button>
            </div>
          </div>

          {/* Payment Details - Only show after clicking Pay Now */}
          {paymentStarted && selectedMethod === 'upi' && !showUpiGateway && (
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

          {/* UPI Payment Gateway - Enhanced */}
          {selectedMethod === 'upi' && showUpiGateway && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* QR Code Section */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl border-2 border-purple-200 p-6 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <QrCode className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-slate-900">Quick Payment</h3>
                </div>
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 border-4 border-white shadow-xl">
                  <QrCode className="w-32 h-32 text-purple-600" />
                </div>
                <p className="text-sm text-slate-600 mb-1">Scan with any UPI app to pay</p>
                <p className="text-xl font-bold text-purple-600 mb-4">₹{remainingAmount}</p>
                <div className="bg-slate-100 rounded-lg p-3 flex items-center justify-between border border-slate-200">
                  <code className="text-sm text-slate-700 font-mono">{merchantUPI}</code>
                  <button
                    onClick={copyUpiId}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors active:scale-95"
                    title="Copy UPI ID"
                  >
                    <Copy className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="text-sm text-slate-500 font-medium">OR</span>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>

              {/* UPI Apps - Enhanced */}
              <div className="space-y-2">
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Choose Your UPI App</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleUpiAppClick('Google Pay')}
                    disabled={processing}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold group-hover:shadow-lg group-hover:scale-110 transition-transform">
                      G
                    </div>
                    <span className="text-sm font-medium text-slate-900">Google Pay</span>
                  </button>

                  <button
                    onClick={() => handleUpiAppClick('PhonePe')}
                    disabled={processing}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold group-hover:shadow-lg group-hover:scale-110 transition-transform">
                      Pe
                    </div>
                    <span className="text-sm font-medium text-slate-900">PhonePe</span>
                  </button>

                  <button
                    onClick={() => handleUpiAppClick('Paytm')}
                    disabled={processing}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold group-hover:shadow-lg group-hover:scale-110 transition-transform">
                      P
                    </div>
                    <span className="text-sm font-medium text-slate-900">Paytm</span>
                  </button>

                  <button
                    onClick={() => handleUpiAppClick('Amazon Pay')}
                    disabled={processing}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold group-hover:shadow-lg group-hover:scale-110 transition-transform">
                      A
                    </div>
                    <span className="text-sm font-medium text-slate-900">Amazon Pay</span>
                  </button>
                </div>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900 mb-1">Instant Payment</p>
                  <p className="text-xs text-emerald-700">
                    Your payment will be processed instantly. No additional charges!
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentStarted && selectedMethod === 'card' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Amount to Pay - Enhanced */}
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-sm opacity-90 font-medium">Amount to Pay</div>
                  <div className="text-3xl font-bold mt-1">₹{remainingAmount}</div>
                </div>
                <Lock className="w-10 h-10 opacity-80" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-900">Card Number *</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="border-slate-300 text-base"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-900">Expiry Date *</label>
                    <Input 
                      placeholder="MM/YY" 
                      maxLength={5} 
                      className="border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-900">CVV *</label>
                    <Input 
                      placeholder="123" 
                      maxLength={3} 
                      type="password" 
                      className="border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-900">Cardholder Name *</label>
                  <Input 
                    placeholder="Name on card" 
                    className="border-slate-300"
                  />
                </div>
              </div>

              {/* Security Info - Enhanced */}
              <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-xl p-4 flex gap-3">
                <Lock className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-pink-900 mb-1">Bank-Grade Security</p>
                  <p className="text-xs text-pink-700">Your payment is encrypted with 256-bit SSL. We never store your card details.</p>
                </div>
              </div>
            </div>
          )}

          {paymentStarted && selectedMethod === 'wallet' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              <p className="text-sm font-semibold text-slate-900 mb-3">Select Wallet</p>
              <button className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white group-hover:shadow-lg group-hover:scale-105 transition-transform">
                  P
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-slate-900">Paytm Wallet</div>
                  <div className="text-xs text-slate-500">Available: ₹2,450</div>
                </div>
                {remainingAmount <= 2450 && (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                )}
              </button>
              <button className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:shadow-lg group-hover:scale-105 transition-transform">
                  G
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-slate-900">Google Pay</div>
                  <div className="text-xs text-slate-500">Linked</div>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </button>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">Wallets are secure and instant. Your funds are protected by encryption.</p>
              </div>
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

        {/* Footer - Enhanced */}
        <div className="sticky bottom-0 bg-gradient-to-r from-white via-slate-50 to-white border-t border-slate-200 p-6 rounded-b-2xl shadow-lg">
          <div className="flex gap-3">
            {paymentStarted && !showUpiGateway ? (
              <Button
                variant="outline"
                onClick={() => {
                  setPaymentStarted(false);
                  setShowUpiGateway(false);
                }}
                className="flex-1"
                disabled={processing}
              >
                Back
              </Button>
            ) : showUpiGateway ? (
              <Button
                variant="outline"
                onClick={() => setShowUpiGateway(false)}
                className="flex-1"
                disabled={processing}
              >
                Back
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={processing}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={handlePayment}
              disabled={processing || !selectedMethod}
              className="flex-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 hover:from-cyan-600 hover:via-emerald-600 hover:to-teal-600 text-white gap-2 font-semibold shadow-lg disabled:shadow-none disabled:opacity-60"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : !paymentStarted ? (
                <>
                  <CreditCard className="w-4 h-4" />
                  Proceed to Pay ₹{remainingAmount}
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {selectedMethod === 'upi' && !showUpiGateway ? 'Continue' : 'Complete Payment'}
                </>
              )}
            </Button>
          </div>
          {!paymentStarted && !processing && (
            <p className="text-xs text-slate-500 text-center mt-3">
              💳 Secure payment. Your data is encrypted and protected.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}