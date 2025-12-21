import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'cyan',
  label,
  showPercentage = true
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap: { [key: string]: string } = {
    cyan: 'stroke-cyan-500',
    blue: 'stroke-blue-500',
    purple: 'stroke-purple-500',
    pink: 'stroke-pink-500',
    orange: 'stroke-orange-500',
    green: 'stroke-green-500'
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-slate-200 fill-none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={`${colorMap[color] || 'stroke-cyan-500'} fill-none`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold"
          >
            {Math.round(progress)}%
          </motion.span>
        )}
        {label && (
          <span className="text-xs text-slate-600 mt-1">{label}</span>
        )}
      </div>
    </div>
  );
}

interface AnimatedBarChartProps {
  data: DataPoint[];
  height?: number;
}

export function AnimatedBarChart({ data, height = 200 }: AnimatedBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                className={`h-full ${item.color || 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface LineChartProps {
  data: number[];
  labels: string[];
  color?: string;
  showTrend?: boolean;
}

export function AnimatedLineChart({ data, labels, color = 'cyan', showTrend = true }: LineChartProps) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  // Calculate trend
  const trend = data.length >= 2 ? data[data.length - 1] - data[0] : 0;
  const trendPercentage = data.length >= 2 ? ((trend / data[0]) * 100).toFixed(1) : '0';

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const colorMap: { [key: string]: string } = {
    cyan: 'stroke-cyan-500',
    blue: 'stroke-blue-500',
    purple: 'stroke-purple-500',
    pink: 'stroke-pink-500',
    orange: 'stroke-orange-500',
    green: 'stroke-green-500'
  };

  const fillColorMap: { [key: string]: string } = {
    cyan: 'fill-cyan-500/10',
    blue: 'fill-blue-500/10',
    purple: 'fill-purple-500/10',
    pink: 'fill-pink-500/10',
    orange: 'fill-orange-500/10',
    green: 'fill-green-500/10'
  };

  return (
    <div className="space-y-4">
      {showTrend && (
        <div className="flex items-center gap-2">
          {trend >= 0 ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
          <span className={`font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trendPercentage}%
          </span>
          <span className="text-sm text-slate-600">vs start</span>
        </div>
      )}

      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-full h-40">
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#e2e8f0" strokeWidth="0.5" />

          {/* Area fill */}
          <motion.path
            d={`M 0,100 L ${points} L 100,100 Z`}
            className={fillColorMap[color] || 'fill-cyan-500/10'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Line */}
          <motion.polyline
            points={points}
            fill="none"
            className={colorMap[color] || 'stroke-cyan-500'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Data points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - minValue) / range) * 100;
            
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                className={colorMap[color] || 'stroke-cyan-500'}
                fill="white"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <span key={index} className="text-xs text-slate-500">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface HeatMapProps {
  data: number[][];
  labels: { x: string[]; y: string[] };
}

export function HeatMap({ data, labels }: HeatMapProps) {
  const maxValue = Math.max(...data.flat());
  
  const getColor = (value: number) => {
    const intensity = (value / maxValue) * 100;
    if (intensity > 75) return 'bg-cyan-600';
    if (intensity > 50) return 'bg-cyan-500';
    if (intensity > 25) return 'bg-cyan-400';
    return 'bg-cyan-200';
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="flex gap-1">
          <div className="flex flex-col gap-1 justify-end pb-6">
            {labels.y.map((label, i) => (
              <div key={i} className="h-8 flex items-center pr-2">
                <span className="text-xs text-slate-600">{label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex-1">
            <div className="space-y-1">
              {data.map((row, i) => (
                <div key={i} className="flex gap-1">
                  {row.map((cell, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (i * row.length + j) * 0.02 }}
                      className={`h-8 flex-1 rounded ${getColor(cell)} hover:ring-2 hover:ring-cyan-400 transition-all cursor-pointer`}
                      title={`${labels.y[i]}, ${labels.x[j]}: ${cell}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex gap-1 mt-2">
              {labels.x.map((label, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className="text-xs text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  value: number | string;
  label: string;
  change?: number;
  icon?: React.ReactNode;
  color?: string;
}

export function StatCard({ value, label, change, icon, color = 'cyan' }: StatCardProps) {
  const colorMap: { [key: string]: string } = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    green: 'from-green-500 to-emerald-500'
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.cyan}`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm text-slate-600">{label}</div>
      </motion.div>
    </motion.div>
  );
}
