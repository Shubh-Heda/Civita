import { useEffect, useState } from 'react';
import { analyticsOpsService, AnalyticsCard } from '../services/analyticsOpsService';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export function OpsAnalyticsPanel() {
  const [cards, setCards] = useState<AnalyticsCard[]>([]);
  const [synthetics, setSynthetics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [c, s] = await Promise.all([
          analyticsOpsService.getDashboardCards(),
          analyticsOpsService.getSyntheticStatuses(),
        ]);
        setCards(c);
        setSynthetics(s);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">In-product analytics</h3>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading metrics…
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <Card key={card.title} className="p-3 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-500">{card.title}</p>
              {card.trend && (
                <Badge variant="secondary" className="text-[10px]">
                  {card.trend === 'up' ? '↗' : card.trend === 'down' ? '↘' : '→'} {card.delta ?? ''}
                </Badge>
              )}
            </div>
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</div>
            {card.helper && <p className="text-[11px] text-slate-500 mt-1">{card.helper}</p>}
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Synthetic checks</span>
        <Badge variant="secondary">latest</Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {synthetics.map((s) => (
          <Card key={s.id} className="p-3 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{s.check_name}</p>
                <p className="text-[11px] text-slate-500">{s.region ?? 'global'} • {s.latency_ms ?? '-'} ms</p>
              </div>
              {s.status === 'ok' ? (
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
          </Card>
        ))}
        {synthetics.length === 0 && !loading && (
          <p className="text-xs text-slate-500">No synthetic checks recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default OpsAnalyticsPanel;
