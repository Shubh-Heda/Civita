import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  illustration?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  illustration,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Animated Background Circle */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        {illustration ? (
          <div className="relative w-48 h-48 mb-6">
            <img src={illustration} alt="" className="w-full h-full object-contain opacity-80" />
          </div>
        ) : (
          <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Icon className="w-12 h-12 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="mb-3 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent max-w-md">
        {title}
      </h3>
      
      <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>

      {/* Large Action Boxes - Like Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-left overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-white mb-2 font-bold">{actionLabel}</h3>
              <p className="text-white/80 text-sm">
                Browse available matches and join the fun
              </p>
            </div>
          </button>
        )}
        
        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-left overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-white mb-2 font-bold">{secondaryActionLabel}</h3>
              <p className="text-white/90 text-sm">
                Set your vibe and build your community
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="mt-12 flex gap-2 opacity-50">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
