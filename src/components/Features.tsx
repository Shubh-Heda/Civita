import { Shield, Star, Zap, Heart, MessageSquare, Trophy } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Trust Scores',
      description: 'Verified profiles and reputation system ensure you play with reliable people.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Star,
      title: 'Friendship Streaks',
      description: 'Build lasting connections and track your activity streaks with your squad.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book courts, fields, and gaming lounges in seconds with real-time availability.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'Join a vibrant community that celebrates sports, culture, and gaming together.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: MessageSquare,
      title: 'Group Chat',
      description: 'Coordinate with your team, share strategies, and stay connected before the match.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Trophy,
      title: 'Badges & Rewards',
      description: 'Earn exclusive badges, unlock achievements, and showcase your accomplishments.',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make connecting and playing effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
