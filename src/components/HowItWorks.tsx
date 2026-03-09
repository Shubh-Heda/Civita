import { Search, Users, Calendar, Award } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'Browse sports, gaming sessions, and events based on your interests and location.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Connect',
      description: 'Match with verified players who share your skill level and passion.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Calendar,
      title: 'Book & Play',
      description: 'Reserve your spot, split costs fairly, and show up ready to play.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Award,
      title: 'Earn & Grow',
      description: 'Build your reputation, earn badges, and level up your community status.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to start playing, connecting, and growing with your community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 z-0"></div>
                )}

                <div className="relative z-10 text-center">
                  {/* Icon Circle */}
                  <div className="relative inline-block mb-6">
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-xl`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className="font-bold text-gray-900">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
