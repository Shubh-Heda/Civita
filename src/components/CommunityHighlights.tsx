import { Play, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityHighlights() {
  const highlights = [
    {
      id: 1,
      user: {
        name: 'Alex Rodriguez',
        username: '@alexr_sports',
        avatar: '⚽',
        trustScore: 98,
      },
      content: 'Amazing 5v5 match yesterday! Found the perfect squad on Avento 🔥',
      image: 'https://images.unsplash.com/photo-1762053275412-03726506562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXIlMjB0dXJmJTIwcGxheWVyc3xlbnwxfHx8fDE3NzAyMjYyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 234,
      comments: 18,
      trending: true,
    },
    {
      id: 2,
      user: {
        name: 'Maya Patel',
        username: '@maya_games',
        avatar: '🎮',
        trustScore: 95,
      },
      content: 'Epic gaming session at the new lounge! Met some incredible gamers 🎯',
      image: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsb3VuZ2UlMjBlc3BvcnRzJTIwc2NyZWVuc3xlbnwxfHx8fDE3NzAyMjYyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 421,
      comments: 32,
      trending: true,
    },
    {
      id: 3,
      user: {
        name: 'Jordan Chen',
        username: '@jordan_music',
        avatar: '🎵',
        trustScore: 92,
      },
      content: 'Best music festival experience ever! Thanks Avento for the amazing community 🎶',
      image: 'https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZmVzdGl2YWwlMjBjcm93ZCUyMGxpZ2h0c3xlbnwxfHx8fDE3NzAyMjYyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 567,
      comments: 45,
      trending: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Community Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our community is up to and share your own moments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              {/* User Header */}
              <div className="p-5 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xl shadow-md">
                  {highlight.user.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{highlight.user.name}</div>
                  <div className="text-sm text-gray-500">{highlight.user.username}</div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">{highlight.user.trustScore}</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={highlight.image}
                  alt={highlight.content}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {highlight.trending && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-medium shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-gray-700 mb-4">{highlight.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-6 text-gray-600">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors group/like">
                    <Heart className="w-5 h-5 group-hover/like:fill-current" />
                    <span className="text-sm font-medium">{highlight.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{highlight.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
            View All Highlights
          </button>
        </div>
      </div>
    </section>
  );
}
