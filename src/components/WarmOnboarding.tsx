import { useState } from 'react';
import { Heart, Users, Shield, Sparkles, ArrowRight, CheckCircle, Target, Trophy, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface WarmOnboardingProps {
  onComplete: (userData: {
    name: string;
    interests: string[];
    playingStyle: string;
    goals: string[];
  }) => void;
}

const sports = ['Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis', 'Volleyball'];
const playingStyles = [
  { id: 'competitive', label: 'Competitive', icon: Trophy, desc: 'Love the thrill of winning' },
  { id: 'casual', label: 'Casual Fun', icon: Heart, desc: 'Just here for a good time' },
  { id: 'social', label: 'Social Player', icon: Users, desc: 'Making friends is the goal' },
  { id: 'fitness', label: 'Fitness Focus', icon: Target, desc: 'Stay active and healthy' }
];
const goals = [
  'Make new friends',
  'Stay fit and active',
  'Improve my skills',
  'Join a regular crew',
  'Play casually',
  'Compete and win'
];

export function WarmOnboarding({ onComplete }: WarmOnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [playingStyle, setPlayingStyle] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const totalSteps = 4;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleComplete = () => {
    onComplete({ name, interests: selectedInterests, playingStyle, goals: selectedGoals });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return true; // Welcome step
      case 2: return name.trim().length > 0;
      case 3: return selectedInterests.length > 0;
      case 4: return playingStyle !== '';
      case 5: return selectedGoals.length > 0;
      default: return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-500 via-emerald-500 to-purple-500 flex items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Progress Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b p-4 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Avento</span>
            </div>
            <span className="text-sm text-slate-600">Step {step} of {totalSteps}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h1 className="mb-4">Welcome to Avento! 🎉 
                                    Friendship-first</h1>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Where every game is a chance to make friends, not just points.
                  We believe sports are a gateway to belonging. Win or lose, you'll leave with connections.         
                </p>
              </div>

                <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="text-cyan-900 mb-4">Here's what makes us different:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                     

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-slate-900 mb-1">Safe & Welcoming</div>
                        <p className="text-sm text-slate-600">
                          Trust scores, newbie-friendly badges, and community guidelines ensure everyone feels safe.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-slate-900 mb-1">Meaningful Connections</div>
                        <p className="text-sm text-slate-600">
                          Track friendship streaks, celebrate milestones, and build lasting bonds through play.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-sm mb-6">
                  Let's take 2 minutes to personalize your experience...
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Name */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">👋</div>
                <h2 className="mb-3">What should we call you?</h2>
                <p className="text-slate-600">
                  Your name helps others connect with the real you
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="text-center h-14 text-lg"
                  autoFocus
                />
                <p className="text-xs text-slate-500 text-center mt-2">
                  You can use your first name or nickname
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">⚽</div>
                <h2 className="mb-3">What sports interest you?</h2>
                <p className="text-slate-600">
                  Pick as many as you like - we'll help you find the right matches
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {sports.map(sport => (
                  <button
                    key={sport}
                    onClick={() => toggleInterest(sport)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedInterests.includes(sport)
                        ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white border-transparent shadow-lg scale-105'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Playing Style */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="mb-3">How do you like to play?</h2>
                <p className="text-slate-600">
                  This helps us match you with like-minded players
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {playingStyles.map(style => {
                  const Icon = style.icon;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setPlayingStyle(style.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        playingStyle === style.id
                          ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white border-transparent shadow-lg scale-105'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 ${
                        playingStyle === style.id ? 'text-white' : 'text-cyan-600'
                      }`} />
                      <div className={`mb-1 ${
                        playingStyle === style.id ? 'text-white' : 'text-slate-900'
                      }`}>
                        {style.label}
                      </div>
                      <p className={`text-sm ${
                        playingStyle === style.id ? 'text-white/90' : 'text-slate-600'
                      }`}>
                        {style.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 5: Goals */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">✨</div>
                <h2 className="mb-3">What are you hoping to achieve?</h2>
                <p className="text-slate-600">
                  Select all that resonate with you
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
                {goals.map(goal => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      selectedGoals.includes(goal)
                        ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white border-transparent shadow-lg'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 ${
                      selectedGoals.includes(goal) ? 'text-white' : 'text-slate-400'
                    }`} />
                    <span>{goal}</span>
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 max-w-2xl mx-auto border border-purple-200">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-purple-900 mb-2">You're Almost Ready! 🎉</h3>
                    <p className="text-sm text-purple-700">
                      Remember, there's no "wrong" way to play. Whether you're here to compete or just have fun,
                      you'll find your people. The best part? Every match is a chance to grow your circle.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t p-6 rounded-b-3xl">
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                if (step < totalSteps) {
                  setStep(step + 1);
                } else {
                  handleComplete();
                }
              }}
              disabled={!canProceed()}
              className={`bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2 ${
                step === 1 ? 'w-full' : 'flex-1'
              }`}
            >
              {step < totalSteps ? (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Start Your Journey
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}