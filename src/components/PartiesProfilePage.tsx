import { PartyPopper, ArrowLeft, Trophy, Heart, TrendingUp, Award, Star, Target, Sparkles, Zap } from 'lucide-react';
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

interface PartiesProfilePageProps {
  onNavigate: (page: 'party-dashboard' | 'parties-profile' | 'party-community', param?: string) => void;
  onProfileUpdate: (profile: UserProfile) => void;
  userProfile: UserProfile;
  matches: Match[];
}

export function PartiesProfilePage({ onNavigate, onProfileUpdate, userProfile, matches }: PartiesProfilePageProps) {
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
                onClick={() => onNavigate('party-dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">Your Party Profile</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white">
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
                  <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700">{interest}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <PartyPopper className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-slate-600">Parties Attended</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">18</div>
              <span className="text-slate-500">parties</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-slate-600">Party Energy</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">95</div>
              <span className="text-slate-500">/ 100</span>
            </div>
            <Progress value={95} className="mt-2 h-2" />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-slate-600">New Friends</span>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">34</div>
              <span className="text-slate-500">friends</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-pink-600" />
            Party Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-pink-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
                <PartyPopper className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Party Legend</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-pink-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Social Star</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-pink-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Vibe Maker</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-pink-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-center text-slate-700">Energy Boss</span>
            </div>
          </div>
        </div>

        {/* Upcoming Parties */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="mb-4">Upcoming Parties</h2>
          {matches.filter(m => m.status === 'upcoming').length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <PartyPopper className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No upcoming parties yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => onNavigate('party-dashboard')}
              >
                Explore Parties
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.filter(m => m.status === 'upcoming').map((match) => (
                <div key={match.id} className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <PartyPopper className="w-6 h-6 text-white" />
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
