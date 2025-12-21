import { useState } from 'react';
import { X, Award, Calendar, Clock, Users, Star, CheckCircle, TrendingUp, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Coach {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  bio: string;
  specializations: string;
}

interface CoachingSlot {
  id: string;
  day: string;
  time: string;
  duration: string;
  available: boolean;
  spotsLeft: number;
}

interface CoachingSubscriptionProps {
  turfName: string;
  sport: string;
  onClose: () => void;
  coaches: Coach[];
  slots: CoachingSlot[];
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  sessions: number;
  features: string[];
  recommended?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2999,
    duration: '1 Month',
    sessions: 8,
    features: [
      '8 coaching sessions',
      'Group training (max 6 people)',
      'Basic skill assessment',
      'Weekly progress reports',
      'Access to training materials',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 7999,
    duration: '3 Months',
    sessions: 24,
    features: [
      '24 coaching sessions',
      'Semi-private training (max 3 people)',
      'Comprehensive skill assessment',
      'Bi-weekly progress reports',
      'Personalized training plan',
      'Video analysis of your gameplay',
      'Nutrition guidance',
      'Priority booking',
    ],
    recommended: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 14999,
    duration: '6 Months',
    sessions: 48,
    features: [
      '48 coaching sessions',
      'One-on-one training',
      'Advanced skill & fitness assessment',
      'Weekly detailed progress reports',
      'Fully personalized training program',
      'Full video analysis suite',
      'Nutrition & fitness guidance',
      'Priority booking & flexible rescheduling',
      'Access to special workshops',
      'Tournament preparation',
    ],
  },
];

export function CoachingSubscription({
  turfName,
  sport,
  onClose,
  coaches,
  slots,
}: CoachingSubscriptionProps) {
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [step, setStep] = useState<'coaches' | 'plans' | 'slots' | 'confirm'>('coaches');

  const coach = coaches.find(c => c.id === selectedCoach);
  const plan = subscriptionPlans.find(p => p.id === selectedPlan);

  const toggleSlot = (slotId: string) => {
    setSelectedSlots(prev =>
      prev.includes(slotId) ? prev.filter(id => id !== slotId) : [...prev, slotId]
    );
  };

  const handleSubscribe = () => {
    if (!selectedCoach || !selectedPlan || selectedSlots.length === 0) {
      toast.error('Please complete all selections');
      return;
    }

    toast.success(`Successfully subscribed to ${plan?.name} coaching plan! 🎉`, {
      description: `Your ${sport} coaching journey begins now!`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1">Coaching Subscription</h2>
              <p className="text-slate-600">
                {turfName} • {sport}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            <div className={`flex-1 h-2 rounded-full ${step === 'coaches' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : selectedCoach ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step === 'plans' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : selectedPlan ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step === 'slots' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : selectedSlots.length > 0 ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step === 'confirm' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500' : 'bg-slate-200'}`} />
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Select Coach */}
          {step === 'coaches' && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2">Choose Your Coach</h3>
                <p className="text-slate-600">
                  Select an experienced coach who matches your goals
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {coaches.map(coach => (
                  <button
                    key={coach.id}
                    onClick={() => setSelectedCoach(coach.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedCoach === coach.id
                        ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <ImageWithFallback
                        src={coach.image}
                        alt={coach.name}
                        className="w-20 h-20 rounded-full object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="mb-1">{coach.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{coach.rating}</span>
                          </div>
                          <span className="text-sm text-slate-600">
                            ({coach.reviews} reviews)
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {coach.experience} Experience
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 mb-3">{coach.bio}</p>

                    <div className="mb-3">
                      <p className="text-xs text-slate-600 mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {coach.expertise.map(skill => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs bg-emerald-100 text-emerald-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">{coach.specializations}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setStep('plans')}
                  disabled={!selectedCoach}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white"
                >
                  Next: Choose Plan
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Plan */}
          {step === 'plans' && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2">Select Subscription Plan</h3>
                <p className="text-slate-600">
                  Choose the plan that best fits your training goals with {coach?.name}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {subscriptionPlans.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      selectedPlan === plan.id
                        ? 'border-cyan-500 bg-cyan-50 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    } ${plan.recommended ? 'ring-2 ring-purple-300' : ''}`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <h3 className="mb-2">{plan.name}</h3>
                      <div className="mb-1">
                        <span className="text-cyan-600">₹{plan.price}</span>
                      </div>
                      <p className="text-sm text-slate-600">{plan.duration}</p>
                    </div>

                    <div className="mb-4 p-3 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg text-center">
                      <p className="text-sm">
                        <span>{plan.sessions} Sessions</span>
                        <br />
                        <span className="text-xs text-slate-600">
                          ≈ ₹{Math.round(plan.price / plan.sessions)}/session
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      {plan.features.map(feature => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep('coaches')}
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep('slots')}
                  disabled={!selectedPlan}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white"
                >
                  Next: Select Time Slots
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Select Slots */}
          {step === 'slots' && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2">Choose Your Training Schedule</h3>
                <p className="text-slate-600">
                  Select your preferred time slots (you can select multiple)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {slots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && toggleSlot(slot.id)}
                    disabled={!slot.available}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedSlots.includes(slot.id)
                        ? 'border-cyan-500 bg-cyan-50 shadow-md'
                        : slot.available
                        ? 'border-slate-200 hover:border-slate-300'
                        : 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        <span>{slot.day}</span>
                      </div>
                      {selectedSlots.includes(slot.id) && (
                        <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{slot.time}</span>
                      </div>
                      <span>• {slot.duration}</span>
                    </div>

                    {slot.available ? (
                      <div className="flex items-center gap-1 text-xs text-emerald-600">
                        <Users className="w-3 h-3" />
                        <span>{slot.spotsLeft} spots left</span>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Fully Booked
                      </Badge>
                    )}
                  </button>
                ))}
              </div>

              {selectedSlots.length > 0 && (
                <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
                  <p className="text-sm text-cyan-700">
                    {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''} selected
                  </p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep('plans')}
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep('confirm')}
                  disabled={selectedSlots.length === 0}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white"
                >
                  Review & Confirm
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirm' && coach && plan && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2">Confirm Your Subscription</h3>
                <p className="text-slate-600">
                  Review your selections before subscribing
                </p>
              </div>

              <div className="space-y-6">
                {/* Coach Summary */}
                <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl p-6 border border-cyan-200">
                  <h3 className="text-cyan-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Coach
                  </h3>
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src={coach.image}
                      alt={coach.name}
                      className="w-16 h-16 rounded-full object-cover shadow-md"
                    />
                    <div>
                      <h3 className="mb-1">{coach.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">{coach.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {coach.experience}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Summary */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-purple-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {plan.name} Plan
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-purple-700 mb-1">Duration</p>
                      <p className="text-purple-900">{plan.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-700 mb-1">Sessions</p>
                      <p className="text-purple-900">{plan.sessions} sessions</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-purple-200">
                    <p className="text-sm text-purple-700 mb-1">Total Investment</p>
                    <p className="text-purple-900">₹{plan.price}</p>
                  </div>
                </div>

                {/* Slots Summary */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-orange-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Your Training Schedule
                  </h3>
                  <div className="space-y-2">
                    {selectedSlots.map(slotId => {
                      const slot = slots.find(s => s.id === slotId);
                      return slot ? (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <span>{slot.day}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Clock className="w-4 h-4" />
                            <span>{slot.time}</span>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-blue-900 mb-2">What's Next?</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Your coach will contact you within 24 hours</li>
                        <li>• Initial assessment will be scheduled</li>
                        <li>• Personalized training plan will be created</li>
                        <li>• You can reschedule sessions as needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep('slots')}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Subscribe Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
