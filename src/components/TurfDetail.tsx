import { useState } from 'react';
import { ArrowLeft, MapPin, Star, Users, Shield, Clock, Calendar, ChevronRight, Heart, Award, Image as ImageIcon, GraduationCap, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CoachingSubscription } from './CoachingSubscription';

interface TurfDetailProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'availability', turfId?: string, matchId?: string) => void;
  turfId: string | null;
}

const turfsData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sky Sports Arena',
    location: 'Satellite, Ahmedabad',
    sport: 'Football',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=600&fit=crop',
    ],
    price: '₹1500/hr',
    rating: 4.8,
    reviews: 124,
    trustScore: 4.7,
    communitySize: 45,
    description: 'Premium football turf with FIFA-standard grass and professional lighting. Perfect for competitive matches and casual games alike.',
    amenities: ['Changing Rooms', 'Parking', 'Flood Lights', 'First Aid', 'Refreshments', 'Shower Facilities'],
    address: 'Behind ISCON Temple, Satellite Road, Ahmedabad, Gujarat 380015',
  },
  '2': {
    id: '2',
    name: 'Victory Cricket Ground',
    location: 'Maninagar, Ahmedabad',
    sport: 'Cricket',
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
    ],
    price: '₹2000/hr',
    rating: 4.7,
    reviews: 98,
    trustScore: 4.9,
    communitySize: 62,
    description: 'Well-maintained cricket ground with quality pitch and professional nets. Great for practice sessions and full matches.',
    amenities: ['Nets', 'Changing Rooms', 'Parking', 'Equipment Rental', 'Seating Area'],
    address: 'Nr. Maninagar Railway Station, Maninagar East, Ahmedabad, Gujarat 380008',
  },
  '3': {
    id: '3',
    name: 'Hoops Basketball Court',
    location: 'Vastrapur, Ahmedabad',
    sport: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=800&h=600&fit=crop',
    ],
    price: '₹800/hr',
    rating: 4.6,
    reviews: 87,
    trustScore: 4.6,
    communitySize: 38,
    description: 'Indoor basketball court with professional flooring and adjustable hoops. Air-conditioned for year-round comfort.',
    amenities: ['Indoor Court', 'Air Conditioning', 'Changing Rooms', 'Water Dispenser', 'Lockers'],
    address: 'Vastrapur Lake Area, Vastrapur, Ahmedabad, Gujarat 380015',
  },
  '4': {
    id: '4',
    name: 'Elite Football Academy',
    location: 'SG Highway, Ahmedabad',
    sport: 'Football',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    ],
    price: '₹1800/hr',
    rating: 4.9,
    reviews: 156,
    trustScore: 4.8,
    communitySize: 56,
    description: 'Top-tier football facility with multiple pitches and training equipment. Host to many community leagues.',
    amenities: ['Multiple Pitches', 'Pro Lighting', 'Parking', 'Cafe', 'Changing Rooms', 'Equipment Store'],
    address: 'SG Highway, Bodakdev, Ahmedabad, Gujarat 380054',
  },
  '5': {
    id: '5',
    name: 'Champions Cricket Turf',
    location: 'Naroda, Ahmedabad',
    sport: 'Cricket',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop',
    ],
    price: '₹1700/hr',
    rating: 4.5,
    reviews: 73,
    trustScore: 4.5,
    communitySize: 41,
    description: 'Spacious cricket ground with excellent facilities for both practice and match play.',
    amenities: ['Practice Nets', 'Changing Rooms', 'Parking', 'Scoreboard', 'Seating'],
    address: 'Naroda Road, Naroda, Ahmedabad, Gujarat 382330',
  },
  '6': {
    id: '6',
    name: 'Urban Basketball Arena',
    location: 'Bodakdev, Ahmedabad',
    sport: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=800&h=600&fit=crop',
    ],
    price: '₹1000/hr',
    rating: 4.7,
    reviews: 92,
    trustScore: 4.7,
    communitySize: 48,
    description: 'Modern basketball facility with great community vibe and regular tournaments.',
    amenities: ['Indoor Court', 'Locker Rooms', 'Parking', 'Cafe', 'Pro Lighting'],
    address: 'Bodakdev, Ahmedabad, Gujarat 380054',
  },
};

const timeSlots = [
  { time: '6:00 AM', available: true },
  { time: '7:00 AM', available: true },
  { time: '8:00 AM', available: false },
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: false },
  { time: '7:00 PM', available: true },
  { time: '8:00 PM', available: true },
  { time: '9:00 PM', available: true },
];

// Coaching data - coaches available at each turf
const coachesData: Record<string, any[]> = {
  '1': [ // Sky Sports Arena - Football
    {
      id: 'c1',
      name: 'Coach Rajesh Kumar',
      expertise: ['Dribbling', 'Shooting', 'Tactical Play', 'Fitness'],
      rating: 4.9,
      reviews: 87,
      experience: '12 Years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      bio: 'Former professional footballer with experience coaching national youth teams.',
      specializations: 'Specializes in attacking strategies and youth development',
    },
    {
      id: 'c2',
      name: 'Coach Priya Sharma',
      expertise: ['Goal Keeping', 'Defense', 'Positioning', 'Reflexes'],
      rating: 4.8,
      reviews: 64,
      experience: '8 Years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      bio: 'Ex-national goalkeeper with a passion for teaching defensive techniques.',
      specializations: 'Expert in goalkeeper training and defensive formations',
    },
  ],
  '2': [ // Victory Cricket Ground
    {
      id: 'c3',
      name: 'Coach Amit Patel',
      expertise: ['Batting', 'Technique', 'Strategy', 'Match Preparation'],
      rating: 4.9,
      reviews: 103,
      experience: '15 Years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      bio: 'Former first-class cricketer specializing in batting techniques.',
      specializations: 'Batting fundamentals and match psychology',
    },
  ],
  '3': [ // Hoops Basketball Court
    {
      id: 'c4',
      name: 'Coach Michael Johnson',
      expertise: ['Shooting', 'Ball Handling', 'Defense', 'Conditioning'],
      rating: 4.7,
      reviews: 56,
      experience: '10 Years',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      bio: 'Professional basketball coach with college-level coaching experience.',
      specializations: 'Shooting techniques and offensive strategies',
    },
  ],
  '4': [ // Elite Football Academy
    {
      id: 'c5',
      name: 'Coach David Martinez',
      expertise: ['Technical Skills', 'Tactics', 'Physical Training', 'Mental Coaching'],
      rating: 4.9,
      reviews: 142,
      experience: '18 Years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      bio: 'UEFA certified coach with international coaching credentials.',
      specializations: 'Advanced tactical play and professional development',
    },
  ],
};

// Coaching time slots for each turf
const coachingSlots: Record<string, any[]> = {
  '1': [
    { id: 's1', day: 'Monday', time: '6:00 AM - 7:30 AM', duration: '90 min', available: true, spotsLeft: 4 },
    { id: 's2', day: 'Monday', time: '5:00 PM - 6:30 PM', duration: '90 min', available: true, spotsLeft: 2 },
    { id: 's3', day: 'Wednesday', time: '6:00 AM - 7:30 AM', duration: '90 min', available: true, spotsLeft: 5 },
    { id: 's4', day: 'Wednesday', time: '5:00 PM - 6:30 PM', duration: '90 min', available: false, spotsLeft: 0 },
    { id: 's5', day: 'Friday', time: '6:00 AM - 7:30 AM', duration: '90 min', available: true, spotsLeft: 3 },
    { id: 's6', day: 'Friday', time: '5:00 PM - 6:30 PM', duration: '90 min', available: true, spotsLeft: 6 },
    { id: 's7', day: 'Saturday', time: '7:00 AM - 8:30 AM', duration: '90 min', available: true, spotsLeft: 2 },
    { id: 's8', day: 'Saturday', time: '4:00 PM - 5:30 PM', duration: '90 min', available: true, spotsLeft: 4 },
  ],
  '2': [
    { id: 's9', day: 'Tuesday', time: '7:00 AM - 8:30 AM', duration: '90 min', available: true, spotsLeft: 5 },
    { id: 's10', day: 'Thursday', time: '7:00 AM - 8:30 AM', duration: '90 min', available: true, spotsLeft: 3 },
    { id: 's11', day: 'Saturday', time: '8:00 AM - 9:30 AM', duration: '90 min', available: true, spotsLeft: 4 },
    { id: 's12', day: 'Sunday', time: '8:00 AM - 9:30 AM', duration: '90 min', available: false, spotsLeft: 0 },
  ],
  '3': [
    { id: 's13', day: 'Monday', time: '6:30 AM - 8:00 AM', duration: '90 min', available: true, spotsLeft: 6 },
    { id: 's14', day: 'Wednesday', time: '6:30 AM - 8:00 AM', duration: '90 min', available: true, spotsLeft: 4 },
    { id: 's15', day: 'Friday', time: '6:30 AM - 8:00 AM', duration: '90 min', available: true, spotsLeft: 5 },
  ],
  '4': [
    { id: 's16', day: 'Daily', time: '6:00 AM - 7:30 AM', duration: '90 min', available: true, spotsLeft: 8 },
    { id: 's17', day: 'Daily', time: '5:30 PM - 7:00 PM', duration: '90 min', available: true, spotsLeft: 6 },
    { id: 's18', day: 'Weekends', time: '8:00 AM - 9:30 AM', duration: '90 min', available: true, spotsLeft: 10 },
  ],
};

export function TurfDetail({ onNavigate, turfId }: TurfDetailProps) {
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCoachingModal, setShowCoachingModal] = useState(false);

  const turf = turfId ? turfsData[turfId] : turfsData['1'];

  if (!turf) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Turf not found</h2>
          <Button onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const coaches = coachesData[turf.id] || [];
  const slots = coachingSlots[turf.id] || [];
  const hasCoaching = coaches.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {showCoachingModal && hasCoaching && (
        <CoachingSubscription
          turfName={turf.name}
          sport={turf.sport}
          onClose={() => setShowCoachingModal(false)}
          coaches={coaches}
          slots={slots}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Heart className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <div className="relative">
                <ImageWithFallback 
                  src={turf.images[selectedImage]}
                  alt={turf.name}
                  className="w-full h-96 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-white text-slate-700">
                  {turf.sport}
                </Badge>
              </div>
              {turf.images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {turf.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-cyan-500' : 'border-transparent'
                      }`}
                    >
                      <ImageWithFallback 
                        src={img}
                        alt={`${turf.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h1 className="mb-2">{turf.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{turf.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{turf.rating}</span>
                  <span className="text-slate-600">({turf.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-slate-700 mb-6">{turf.description}</p>

              <div className="border-t pt-4">
                <h3 className="mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {turf.amenities.map((amenity: string) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="mb-2">Address</h3>
                <p className="text-slate-600">{turf.address}</p>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl border border-cyan-200 p-6">
              <h3 className="text-cyan-900 mb-4">Community at this Turf</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="w-4 h-4 text-cyan-600" />
                    <div className="text-cyan-900">{turf.trustScore}</div>
                  </div>
                  <p className="text-sm text-cyan-700">Trust Score</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <div className="text-emerald-900">{turf.communitySize}</div>
                  </div>
                  <p className="text-sm text-emerald-700">Active Players</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-4 h-4 text-purple-600" />
                    <div className="text-purple-900">92%</div>
                  </div>
                  <p className="text-sm text-purple-700">Positive Vibes</p>
                </div>
              </div>
            </div>

            {/* Coaching Section */}
            {hasCoaching && (
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">Professional Coaching Available</h3>
                      <p className="text-white/90 text-sm">
                        Level up your game with expert guidance
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-white" />
                        <span className="text-white">{coaches.length} Expert Coach{coaches.length > 1 ? 'es' : ''}</span>
                      </div>
                      <p className="text-sm text-white/80">
                        Certified professionals with years of experience
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-white" />
                        <span className="text-white">Flexible Plans</span>
                      </div>
                      <p className="text-sm text-white/80">
                        From ₹2,999/month • Multiple time slots
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
                    <p className="text-sm text-white/90 mb-3">Available Coaching Slots:</p>
                    <div className="flex flex-wrap gap-2">
                      {slots.slice(0, 4).map((slot) => (
                        <Badge
                          key={slot.id}
                          className="bg-white/20 text-white border-white/30 text-xs"
                        >
                          {slot.day} • {slot.time}
                        </Badge>
                      ))}
                      {slots.length > 4 && (
                        <Badge className="bg-white/20 text-white border-white/30 text-xs">
                          +{slots.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowCoachingModal(true)}
                    size="lg"
                    className="w-full bg-white text-purple-600 hover:bg-slate-50 shadow-lg gap-2"
                  >
                    <GraduationCap className="w-5 h-5" />
                    Explore Coaching Plans
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="mb-4">Community Reviews</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>Sarah M.</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Amazing turf with a wonderful community! Everyone is so welcoming and the facilities are top-notch. 
                        Perfect for both beginners and experienced players.
                      </p>
                      <p className="text-xs text-slate-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>Mike C.</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Great place to play and meet new people. The turf quality is excellent and the management is very responsive.
                      </p>
                      <p className="text-xs text-slate-500">1 month ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-cyan-600">{turf.price}</span>
                  <span className="text-slate-600">per hour</span>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3">Select Date</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedDate('today')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedDate === 'today'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-sm">Today</div>
                      <div className="text-xs text-slate-600">Nov 11</div>
                    </button>
                    <button
                      onClick={() => setSelectedDate('tomorrow')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedDate === 'tomorrow'
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-sm">Tomorrow</div>
                      <div className="text-xs text-slate-600">Nov 12</div>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3">Available Time Slots</h3>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {timeSlots.map(({ time, available }) => (
                      <button
                        key={time}
                        disabled={!available}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          available
                            ? 'border-slate-200 hover:border-cyan-500 hover:bg-cyan-50'
                            : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{time}</span>
                          </div>
                          {!available && (
                            <Badge variant="secondary" className="text-xs">
                              Booked
                            </Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => onNavigate('create-match')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2"
                >
                  Create Match Plan
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Book and invite others to join your match
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}