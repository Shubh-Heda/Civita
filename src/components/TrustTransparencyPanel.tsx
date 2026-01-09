import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingDown,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
  ChevronDown,
  BarChart3,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import advancedTrustService from '../services/advancedTrustService';
import { toast } from 'sonner';

interface TrustTransparencyPanelProps {
  userId: string;
}

export function TrustTransparencyPanel({ userId }: TrustTransparencyPanelProps) {
  const [loading, setLoading] = useState(true);
  const [scoreData, setScoreData] = useState<any>(null);
  const [eventLog, setEventLog] = useState<any[]>([]);
  const [scoreDiffs, setScoreDiffs] = useState<any>(null);
  const [dailyCap, setDailyCap] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('month');

  useEffect(() => {
    loadData();
  }, [userId, timeframe]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [score, log, diffs, cap] = await Promise.all([
        advancedTrustService.getTrustScoreWithDimensions(userId),
        advancedTrustService.getEventLog(userId, 30),
        advancedTrustService.getScoreDiffs(userId, timeframe),
        advancedTrustService.checkDailyGainCap(userId)
      ]);

      setScoreData(score);
      setEventLog(log);
      setScoreDiffs(diffs);
      setDailyCap(cap);
    } catch (error) {
      console.error('Error loading trust data:', error);
      toast.error('Failed to load trust data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Overview with Dimensions */}
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-white">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-600" />
          Trust Score Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {scoreData?.dimensions?.map((dim: any) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-lg border"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold capitalize text-slate-700">{dim.name}</p>
                <Badge variant="secondary">{Math.round(dim.weight * 100)}%</Badge>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-cyan-600">{dim.score}</div>
                <div className="text-xs text-slate-500">/100</div>
              </div>
              <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-cyan-600 h-2 rounded-full transition-all"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Weighted: {(dim.score * dim.weight).toFixed(1)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Weighted Calculation */}
        <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-cyan-600">
          <p className="text-sm font-semibold text-slate-700 mb-2">Overall Score Calculation</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-slate-600">Reliability:</span>
              <span className="font-bold ml-1">
                {scoreData?.weighted_calculation?.reliability.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-slate-600">Behavior:</span>
              <span className="font-bold ml-1">
                {scoreData?.weighted_calculation?.behavior.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-slate-600">Community:</span>
              <span className="font-bold ml-1">
                {scoreData?.weighted_calculation?.community.toFixed(1)}
              </span>
            </div>
            <div className="font-bold text-cyan-600">
              <span className="text-slate-600">Total:</span>
              <span className="ml-1">
                {scoreData?.weighted_calculation?.total.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Daily Gain Cap */}
      <Card className="p-4 bg-amber-50 border-l-4 border-l-amber-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-semibold text-sm text-amber-900">Daily Gain Limit</p>
              <p className="text-xs text-amber-700">
                {dailyCap?.canEarn
                  ? `${dailyCap.remainingToday} points available today`
                  : 'Daily limit reached - try tomorrow'}
              </p>
            </div>
          </div>
          <Badge variant={dailyCap?.canEarn ? 'secondary' : 'destructive'}>
            {dailyCap?.remainingToday}/{15}
          </Badge>
        </div>
      </Card>

      {/* Score Diffs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            Score Changes - {timeframe === 'week' ? 'Last Week' : 'Last Month'}
          </h3>
          <div className="flex gap-2">
            <Button
              variant={timeframe === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('week')}
            >
              Week
            </Button>
            <Button
              variant={timeframe === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('month')}
            >
              Month
            </Button>
          </div>
        </div>

        {scoreDiffs && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['reliability', 'behavior', 'community'].map((dim: string) => {
              const data = (scoreDiffs as any)[dim];
              const isPositive = data.total >= 0;
              return (
                <div key={dim} className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-semibold capitalize text-slate-700 mb-2">{dim}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{data.total}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{data.count} events</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Event Log */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-600" />
          Recent Activity Log
        </h3>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {eventLog.map((event: any) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                (event.change_amount || 0) > 0 ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {event.reason}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(event.created_at).toLocaleDateString()} {new Date(event.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div className={`text-sm font-bold flex-shrink-0 ${
                (event.change_amount || 0) > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(event.change_amount || 0) > 0 ? '+' : ''}{event.change_amount || 0}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
