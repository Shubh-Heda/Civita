import { Music, ArrowLeft, Trophy, Heart, TrendingUp, Award, Star, Target, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { EditProfile } from './EditProfile';
import { useState } from 'react';

interface UserProfile {
  name: string;
  bio: string;
  interests: string[];
  location: string;
  joinDate: string;
}

interface Match {
  id: string;
  title: string;
  turfName: string;
  date: string;
  time: string;
  sport: string;
  status: 'upcoming' | 'completed';
  visibility: string;
  paymentOption: string;
  amount?: number;
  location?: string;
}

interface EventsProfilePageProps {
  onNavigate: (page: 'events-dashboard' | 'events-profile' | 'cultural-community', param?: string) => void;
  onProfileUpdate: (profile: UserProfile) => void;
  userProfile: UserProfile;
  matches: Match[];
}

export function EventsProfilePage({ onNavigate, onProfileUpdate, userProfile, matches }: EventsProfilePageProps) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    onProfileUpdate(updatedProfile);
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {showEditModal && (
        <EditProfile
          onClose={() => setShowEditModal(false)}
          currentProfile={userProfile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('events-dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Your Cultural Profile</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
              <span>{userProfile.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="mb-1">{userProfile.name}</h1>
                  <p className="text-slate-600">Member since {userProfile.joinDate} • {userProfile.location}</p>
                </div>
                <Button variant="outline" onClick={() => setShowEditModal(true)}>Edit Profile</Button>
              </div>
              <p className="text-slate-700 mb-4">
                {userProfile.bio}
              </p>
              <div className="flex gap-2">
                {userProfile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">{interest}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-slate-600">Events Attended</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">12</div>
              <span className="text-slate-500">events</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-slate-600">Culture Score</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">92</div>
              <span className="text-slate-500">/ 100</span>
            </div>
            <Progress value={92} className="mt-2 h-2" />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-slate-600">Connections Made</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">28</div>
              <span className="text-slate-500">friends</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-600" />
            Cultural Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Music Enthusiast</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Art Explorer</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Culture Lover</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Rising Star</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="mb-4">Upcoming Events</h2>
          {matches.filter(m => m.status === 'upcoming').length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Music className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No upcoming events yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => onNavigate('events-dashboard')}
              >
                Explore Events
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.filter(m => m.status === 'upcoming').map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p>{match.title}</p>
                      <p className="text-sm text-slate-600">{match.turfName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(match.date).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-600">{match.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
