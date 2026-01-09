import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Users, Calendar, MessageCircle, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface FirstTimeUserGuideProps {
  onClose: () => void;
  category?: 'sports' | 'gaming' | 'events' | 'party' | 'coaching';
}

export function FirstTimeUserGuide({ onClose, category = 'sports' }: FirstTimeUserGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const getCategorySteps = () => {
    const baseSteps = {
      sports: [
        {
          title: 'Welcome to Avento Sports! ⚽',
          description: 'Connect with passionate players, join matches, and build lasting friendships through sports.',
          icon: Heart,
          color: 'from-cyan-500 to-emerald-500',
          image: 'https://images.unsplash.com/photo-1509077613385-f89402467146?q=80&w=400'
        },
        {
          title: 'Find Your Perfect Match 🔍',
          description: 'Browse available matches based on your sport, skill level, and location. Filter by time, vibe, and player preferences.',
          icon: Users,
          color: 'from-purple-500 to-pink-500',
          tips: ['Use filters to find matches that suit you', 'Check match vibes and trust scores', 'Read organizer bios before joining']
        },
        {
          title: 'Create Your Own Match 🎯',
          description: 'Schedule a game, invite friends, and build your community. Set your vibe and welcome new players!',
          icon: Calendar,
          color: 'from-orange-500 to-red-500',
          tips: ['Choose your turf and time', 'Set clear expectations and vibe', 'Enable group chat for coordination']
        },
        {
          title: 'Connect & Chat 💬',
          description: 'Every match has a group chat. Connect before the game, coordinate arrival, and build friendships!',
          icon: MessageCircle,
          color: 'from-blue-500 to-cyan-500',
          tips: ['Introduce yourself in the chat', 'Share expectations and excitement', 'Coordinate rides and timing']
        },
        {
          title: "Let's Get Started! 🚀",
          description: 'You\'re all set! Start by browsing matches or creating your first game. Remember, every match is a chance to make new friends!',
          icon: Sparkles,
          color: 'from-pink-500 to-purple-500',
          actions: true
        }
      ],
      gaming: [
        {
          title: 'Welcome to Avento Gaming! 🎮',
          description: 'Find gaming buddies, join sessions at cafes, and level up your social gaming experience.',
          icon: Heart,
          color: 'from-purple-500 to-pink-500',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400'
        },
        {
          title: 'Discover Gaming Cafes 🕹️',
          description: 'Find the best gaming clubs near you with PS5, Xbox, high-end PCs, and more. Check ratings and facilities.',
          icon: Users,
          color: 'from-cyan-500 to-blue-500',
          tips: ['Browse clubs by game type', 'Check hourly rates and facilities', 'Read reviews from gamers']
        },
        {
          title: 'Join or Create Sessions 🎯',
          description: 'Find gaming sessions to join or create your own. Squad up and make new gaming friends!',
          icon: Calendar,
          color: 'from-orange-500 to-yellow-500',
          tips: ['Choose your favorite games', 'Set skill level expectations', 'Coordinate timing with squad']
        },
        {
          title: 'Build Your Squad 💬',
          description: 'Every session has squad chat. Coordinate strategies, share tips, and build lasting gaming friendships!',
          icon: MessageCircle,
          color: 'from-green-500 to-emerald-500',
          tips: ['Share your gaming profile', 'Discuss strategies beforehand', 'Plan future gaming sessions']
        },
        {
          title: "Ready Player One! 🚀",
          description: 'Time to level up! Browse gaming cafes, join sessions, or create your own. Game on!',
          icon: Sparkles,
          color: 'from-pink-500 to-purple-500',
          actions: true
        }
      ],
      events: [
        {
          title: 'Welcome to Avento Events! 🎉',
          description: 'Discover amazing events, book tickets, and experience unforgettable moments with friends.',
          icon: Heart,
          color: 'from-yellow-500 to-orange-500',
          image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400'
        },
        {
          title: 'Explore Events 🎭',
          description: 'Browse concerts, festivals, workshops, and more. Filter by category, date, and location.',
          icon: Users,
          color: 'from-purple-500 to-pink-500',
          tips: ['Check event details and lineup', 'Read reviews from attendees', 'Save events to your wishlist']
        },
        {
          title: 'Book Your Tickets 🎫',
          description: 'Secure your spot with easy booking. Choose your preferred package and payment method.',
          icon: Calendar,
          color: 'from-cyan-500 to-blue-500',
          tips: ['Compare ticket packages', 'Book early for best prices', 'Enable group booking for friends']
        },
        {
          title: 'Connect with Attendees 💬',
          description: 'Join event group chats, meet fellow attendees, and enhance your experience!',
          icon: MessageCircle,
          color: 'from-green-500 to-emerald-500',
          tips: ['Introduce yourself before the event', 'Coordinate arrival times', 'Share your excitement!']
        },
        {
          title: 'Time to Celebrate! 🚀',
          description: 'You\'re ready! Start exploring events and creating memories. Every event is a new adventure!',
          icon: Sparkles,
          color: 'from-pink-500 to-purple-500',
          actions: true
        }
      ],
      party: [
        {
          title: 'Welcome to Avento Party! 🎊',
          description: 'Plan amazing parties, find venues, and make every celebration unforgettable!',
          icon: Heart,
          color: 'from-pink-500 to-purple-500',
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400'
        },
        {
          title: 'Find Perfect Venues 🏰',
          description: 'Discover party venues with everything you need - from decorations to catering options.',
          icon: Users,
          color: 'from-purple-500 to-indigo-500',
          tips: ['Check venue capacity and amenities', 'View photos and reviews', 'Compare pricing packages']
        },
        {
          title: 'Book Your Party 🎈',
          description: 'Choose your date, customize your package, and secure your perfect venue!',
          icon: Calendar,
          color: 'from-orange-500 to-red-500',
          tips: ['Book in advance for best availability', 'Customize decoration themes', 'Add catering and entertainment']
        },
        {
          title: 'Coordinate with Guests 💬',
          description: 'Create guest lists, send invites, and use group chat to coordinate everything!',
          icon: MessageCircle,
          color: 'from-blue-500 to-cyan-500',
          tips: ['Send digital invitations', 'Track RSVPs in real-time', 'Share party details in chat']
        },
        {
          title: 'Let\'s Party! 🚀',
          description: 'Everything is set! Browse venues, plan your party, and create magical memories!',
          icon: Sparkles,
          color: 'from-pink-500 to-purple-500',
          actions: true
        }
      ],
      coaching: [
        {
          title: 'Welcome to Avento Coaching! 🎓',
          description: 'Find expert coaches, book sessions, and master your skills with personalized guidance.',
          icon: Heart,
          color: 'from-blue-500 to-indigo-500',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400'
        },
        {
          title: 'Discover Coaches 👨‍🏫',
          description: 'Browse certified coaches by sport or skill. Check credentials, experience, and ratings.',
          icon: Users,
          color: 'from-purple-500 to-pink-500',
          tips: ['Review coach profiles and specializations', 'Check student testimonials', 'Compare pricing and packages']
        },
        {
          title: 'Book Your Sessions 📅',
          description: 'Schedule one-on-one or group sessions. Choose flexible timings that work for you.',
          icon: Calendar,
          color: 'from-green-500 to-emerald-500',
          tips: ['Start with trial sessions', 'Book packages for better rates', 'Set recurring sessions for consistency']
        },
        {
          title: 'Track Your Progress 📈',
          description: 'Get feedback from coaches, track improvements, and achieve your goals!',
          icon: MessageCircle,
          color: 'from-orange-500 to-yellow-500',
          tips: ['Review coach feedback regularly', 'Set measurable goals', 'Communicate openly with your coach']
        },
        {
          title: 'Start Learning! 🚀',
          description: 'Time to level up! Find your perfect coach and begin your journey to mastery!',
          icon: Sparkles,
          color: 'from-pink-500 to-purple-500',
          actions: true
        }
      ]
    };

    return baseSteps[category];
  };

  const steps = getCategorySteps();
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(`avento_${category}_guide_completed`, 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Hero Image or Icon */}
            {currentStepData.image ? (
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={currentStepData.image} 
                  alt={currentStepData.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${currentStepData.color} opacity-60`} />
              </div>
            ) : (
              <div className={`relative h-48 bg-gradient-to-br ${currentStepData.color} flex items-center justify-center`}>
                <currentStepData.icon className="w-24 h-24 text-white/90" />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <h2 className="mb-4 text-slate-900">{currentStepData.title}</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Tips */}
              {currentStepData.tips && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mb-6">
                  <p className="text-slate-800 font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Pro Tips:
                  </p>
                  <ul className="space-y-2">
                    {currentStepData.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons for Last Step */}
              {currentStepData.actions && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => {
                      handleSkip();
                      // Navigate to browse/find page
                    }}
                    className={`bg-gradient-to-r ${currentStepData.color} text-white rounded-xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105`}
                  >
                    <div className="text-2xl mb-2">🔍</div>
                    <p className="font-semibold mb-1">Find Matches</p>
                    <p className="text-sm text-white/80">Browse available options</p>
                  </button>
                  <button
                    onClick={() => {
                      handleSkip();
                      // Navigate to create page
                    }}
                    className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <div className="text-2xl mb-2">✨</div>
                    <p className="font-semibold mb-1">Create New</p>
                    <p className="text-sm text-white/80">Start your own</p>
                  </button>
                </div>
              )}

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep 
                        ? `w-8 bg-gradient-to-r ${currentStepData.color}` 
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <button
                  onClick={handleSkip}
                  className="text-slate-500 hover:text-slate-700 text-sm font-medium"
                >
                  Skip Tutorial
                </button>

                <Button
                  onClick={handleNext}
                  className={`gap-2 bg-gradient-to-r ${currentStepData.color} hover:opacity-90 text-white`}
                >
                  {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
