import { motion } from 'framer-motion';
import { Trophy, Music, Gamepad2 } from 'lucide-react';

interface CategoryCardsProps {
  onCategorySelect: (category: 'sports' | 'events' | 'gaming') => void;
  onGetStarted?: () => void;
}

export function CategoryCards({ onCategorySelect, onGetStarted }: CategoryCardsProps) {
  const categories = [
    {
      id: 'sports',
      icon: Trophy,
      iconBg: 'from-cyan-400 to-cyan-500',
      title: 'Sports & Turf',
      description: 'Book turfs, find players, and build your sports community with Trust Scores and Friendship Streaks.',
      buttonText: 'Get Started',
      buttonColor: 'from-cyan-400 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1762053275412-03726506562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzb2NjZXIlMjB0dXJmJTIwcGxheWVyc3xlbnwxfHx8fDE3NzAyMjYyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bgGradient: 'from-cyan-500 to-blue-500',
      imagePosition: 'left',
    },
    {
      id: 'events',
      icon: Music,
      iconBg: 'from-purple-400 to-purple-500',
      title: 'Events',
      description: 'Discover concerts, festivals, exhibitions, and standout experiences with your community.',
      buttonText: 'Explore Events',
      buttonColor: 'from-purple-400 to-purple-500',
      image: 'https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZmVzdGl2YWwlMjBjcm93ZCUyMGxpZ2h0c3xlbnwxfHx8fDE3NzAyMjYyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bgGradient: 'from-purple-500 to-pink-500',
      imagePosition: 'right',
    },
    {
      id: 'gaming',
      icon: Gamepad2,
      iconBg: 'from-cyan-400 to-cyan-500',
      title: 'Gaming',
      description: 'Join gaming clubs, play PS5/Xbox/PC, compete in tournaments, and level up your friendships.',
      buttonText: 'Game Now',
      buttonColor: 'from-cyan-400 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsb3VuZ2UlMjBlc3BvcnRzJTIwc2NyZWVuc3xlbnwxfHx8fDE3NzAyMjYyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bgGradient: 'from-cyan-500 to-blue-500',
      imagePosition: 'left',
    },
  ];

  const handleButtonClick = (categoryId: string) => {
    onCategorySelect(categoryId as 'sports' | 'events' | 'gaming');
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Sports & Turf - Image Left, Content Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 group"
        >
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image - Left Side */}
              <div className="relative h-80 md:h-96 overflow-hidden rounded-l-3xl">
                <img
                  src={categories[0].image}
                  alt={categories[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
              </div>

              {/* Content - Right Side */}
              <div className="p-12 md:p-16 flex flex-col justify-center bg-white">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{categories[0].title}</h3>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  {categories[0].description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleButtonClick(categories[0].id)}
                  className={`px-8 py-3.5 bg-gradient-to-r ${categories[0].buttonColor} text-white rounded-lg font-semibold text-base md:text-lg hover:shadow-lg transition-all inline-flex items-center gap-2 w-fit`}
                >
                  {categories[0].buttonText}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Row 2: Events - Image Right, Content Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 group"
        >
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content - Left Side */}
              <div className="p-12 md:p-16 flex flex-col justify-center bg-white order-2 md:order-1">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{categories[1].title}</h3>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  {categories[1].description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleButtonClick(categories[1].id)}
                  className={`px-8 py-3.5 bg-gradient-to-r ${categories[1].buttonColor} text-white rounded-lg font-semibold text-base md:text-lg hover:shadow-lg transition-all inline-flex items-center gap-2 w-fit`}
                >
                  {categories[1].buttonText}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </div>

              {/* Image - Right Side */}
              <div className="relative h-80 md:h-96 overflow-hidden order-1 md:order-2 rounded-r-3xl">
                <img
                  src={categories[1].image}
                  alt={categories[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Row 3: Gaming - Image Left, Content Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image - Left Side */}
              <div className="relative h-80 md:h-96 overflow-hidden rounded-l-3xl">
                <img
                  src={categories[2].image}
                  alt={categories[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
              </div>

              {/* Content - Right Side */}
              <div className="p-12 md:p-16 flex flex-col justify-center bg-white">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{categories[2].title}</h3>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  {categories[2].description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleButtonClick(categories[2].id)}
                  className={`px-8 py-3.5 bg-gradient-to-r ${categories[2].buttonColor} text-white rounded-lg font-semibold text-base md:text-lg hover:shadow-lg transition-all inline-flex items-center gap-2 w-fit`}
                >
                  {categories[2].buttonText}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}