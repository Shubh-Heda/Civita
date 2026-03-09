import { Gamepad2, Music, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50 to-purple-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl hover:shadow-md transition-all">
              <Trophy className="w-5 h-5" />
              <span>Sports</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
              <Music className="w-5 h-5" />
              <span>Events</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
              <Gamepad2 className="w-5 h-5" />
              <span>Gaming</span>
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-gray-800">Belong through</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              sports, culture, and games
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified players, book matches, join festivals, and celebrate culture 
            with people you can trust in your community.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm">
              ⚽ Book Games
            </div>
            <div className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm">
              🎉 Join Festivals
            </div>
            <div className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm">
              🤝 Meet People You Can Trust
            </div>
            <div className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm">
              🎮 Play with people you trust
            </div>
            <div className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm">
              🎊 Celebrate culture together
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
