import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { paymentSafetyService } from '../services/paymentSafetyService';
import { ShieldCheck, CreditCard, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentsSafetyPanelProps {
  userId: string;
  eventId?: string;
}

export function PaymentsSafetyPanel({ userId, eventId }: PaymentsSafetyPanelProps) {
  const [tier, setTier] = useState<{ tier: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await paymentSafetyService.getVerificationTier(userId);
        setTier(t);
      } catch (error) {
        console.error('Failed to load verification tier', error);
      }
    };
    load();
  }, [userId]);

  const handleUpgrade = async () => {
    try {
      const nextTier = 'verified';
      const updated = await paymentSafetyService.upsertVerificationTier(userId, nextTier as any, 'demo-provider');
      setTier(updated);
      toast.success('Verification tier updated');
    } catch (error) {
      toast.error('Failed to update tier');
    }
  };

  const handleAutoRefund = async () => {
    if (!eventId) return;
    await paymentSafetyService.autoRefundOnCancellation(eventId, 'event_cancelled');
  };

  return (
    <Card className="p-4 border border-slate-200/80 dark:border-slate-800/80">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Payments & Safety</p>
          {tier && <Badge>{tier.tier}</Badge>}
        </div>
        <Button size="sm" variant="outline" onClick={handleUpgrade}>Upgrade verification</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Card className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-semibold">Split payments</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Supports proration on dropouts and automatic refunds on cancel rules.</p>
        </Card>
        <Card className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold">Risk scoring</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Device/session risk recorded; higher tiers unlock higher capacity events.</p>
        </Card>
      </div>

      {eventId && (
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Escrow + cancellations</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">Automatic refunds for paid attendees if the event is cancelled.</p>
          </div>
          <Button size="sm" variant="outline" onClick={handleAutoRefund}>Trigger auto-refund</Button>
        </div>
      )}
    </Card>
  );
}

export default PaymentsSafetyPanel;
