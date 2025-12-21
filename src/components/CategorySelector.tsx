import { Users, Music, PartyPopper, ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import categoryGridImage from 'figma:asset/f51cc543d73d57a7ec6a7452b72d744ecc45c657.png';

interface CategorySelectorProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: 'turf' | 'events' | 'parties' | 'gaming') => void;
  userName?: string;
}

export function CategorySelector({ onNavigate, onCategorySelect, userName = 'Friend' }: CategorySelectorProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* STUNNING Background Image - 4-panel grid: Soccer field, Concert stage, Basketball court, Outdoor festival */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${categoryGridImage})` }}
      ></div>
      
      {/* Dark overlay for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header - Dark theme */}
        <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">Avento</span>
                <p className="text-xs text-slate-400">Where Every Moment Becomes a Memory</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="mb-4 text-white drop-shadow-lg">
              Welcome, <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{userName}</span>! 👋
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto drop-shadow-md text-lg">
              Choose your experience and start connecting with your community
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Sports & Turf */}
            <button
              onClick={() => onCategorySelect('turf')}
              className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 hover:border-cyan-400 transition-all hover:shadow-2xl hover:scale-105 text-left"
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1731673092066-cff4ea887d57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Sports and turf"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-cyan-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2">Sports & Turf</h2>
                <p className="text-slate-700 mb-4">
                  Book turfs, find players, build your sports community with trust scores and friendship streaks
                </p>
                <div className="flex items-center gap-2 text-cyan-600 group-hover:gap-3 transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>

            {/* Cultural Events */}
            <button
              onClick={() => onCategorySelect('events')}
              className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 hover:border-purple-400 transition-all hover:shadow-2xl hover:scale-105 text-left"
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Cultural events"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Music className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2">Cultural Events</h2>
                <p className="text-slate-700 mb-4">
                  Discover festivals, concerts, art exhibitions, and cultural gatherings that celebrate diversity
                </p>
                <div className="flex items-center gap-2 text-purple-600 group-hover:gap-3 transition-all">
                  <span>Explore Events</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>

            {/* Parties & Celebrations */}
            <button
              onClick={() => onCategorySelect('parties')}
              className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 hover:border-pink-400 transition-all hover:shadow-2xl hover:scale-105 text-left"
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Parties and celebrations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <PartyPopper className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2">Parties & Celebrations</h2>
                <p className="text-slate-700 mb-4">
                  Create unforgettable nights, meet new people, and celebrate life's special moments together
                </p>
                <div className="flex items-center gap-2 text-pink-600 group-hover:gap-3 transition-all">
                  <span>Join Parties</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>

            {/* Gaming Hub - NEW! */}
            <button
              onClick={() => {
                console.log('🎮 Gaming Hub button clicked in CategorySelector');
                onCategorySelect('gaming');
              }}
              className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 hover:border-purple-500 transition-all hover:shadow-2xl hover:scale-105 text-left"
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Gaming hub"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-indigo-900/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Gamepad2 className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2">Gaming Hub</h2>
                <p className="text-slate-700 mb-4">
                  Connect at gaming clubs, play PS5/Xbox/PC games, join tournaments, and level up friendships
                </p>
                <div className="flex items-center gap-2 text-purple-600 group-hover:gap-3 transition-all">
                  <span>Start Gaming</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          </div>

          {/* Quick Stats - Dark theme, floating over the background */}
          <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2 drop-shadow-sm">2,500+</div>
                <p className="text-slate-300">Active Turfs & Venues</p>
              </div>
              <div>
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-2 drop-shadow-sm">800+</div>
                <p className="text-slate-300">Cultural Events Monthly</p>
              </div>
              <div>
                <div className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent mb-2 drop-shadow-sm">1,200+</div>
                <p className="text-slate-300">Parties This Month</p>
              </div>
              <div>
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2 drop-shadow-sm">300+</div>
                <p className="text-slate-300">Gaming Clubs & Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}