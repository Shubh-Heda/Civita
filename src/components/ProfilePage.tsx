import { Users, ArrowLeft, Trophy, Heart, TrendingUp, Award, Star, Target, Sparkles } from 'lucide-react';
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

interface ProfilePageProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'availability', turfId?: string, matchId?: string) => void;
  onProfileUpdate: (profile: UserProfile) => void;
  userProfile: UserProfile;
  matches: Match[];
}

export function ProfilePage({ onNavigate, onProfileUpdate, userProfile, matches }: ProfilePageProps) {
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
                onClick={() => onNavigate('dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Your Profile</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center text-white">
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
                  <Badge key={index} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score - Main Feature */}
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8" />
            <div>
              <h2 className="text-white mb-1">Trust Score</h2>
              <p className="text-cyan-100">Your reputation in the community</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <div className="flex items-end gap-4 mb-4">
              <div>
                <span className="text-white">4.8</span>
                <span className="text-cyan-100"> / 5.0</span>
              </div>
            </div>
            <Progress value={96} className="h-2 bg-cyan-700" />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-cyan-100 mb-1">Reliability</div>
              <div className="flex items-center gap-2">
                <span className="text-white">4.9</span>
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-cyan-100 mb-1">Respect</div>
              <div className="flex items-center gap-2">
                <span className="text-white">4.8</span>
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-cyan-100 mb-1">Inclusivity</div>
              <div className="flex items-center gap-2">
                <span className="text-white">4.7</span>
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-cyan-100 mb-1">Energy</div>
              <div className="flex items-center gap-2">
                <span className="text-white">4.8</span>
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <p className="text-sm text-cyan-100">
              💬 "Alex always shows up on time and brings such positive energy. Makes everyone feel included!" - Sarah M.
            </p>
          </div>
        </div>

        {/* Friendship Streaks */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <h2>Friendship Streaks</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 border-2 border-white flex items-center justify-center text-white">S</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-white">M</div>
              </div>
              <div className="flex-1">
                <h3>Weekend Crew</h3>
                <p className="text-slate-600">Sarah & Mike</p>
              </div>
              <div className="text-right">
                <div className="text-emerald-600">12 matches</div>
                <p className="text-sm text-slate-600">🔥 On fire!</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 border-2 border-white flex items-center justify-center text-white">R</div>
              </div>
              <div className="flex-1">
                <h3>Cricket Buddy</h3>
                <p className="text-slate-600">Rahul</p>
              </div>
              <div className="text-right">
                <div className="text-slate-700">7 matches</div>
                <p className="text-sm text-slate-600">Growing strong</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 border-2 border-white flex items-center justify-center text-white">P</div>
              </div>
              <div className="flex-1">
                <h3>New Connection</h3>
                <p className="text-slate-600">Priya</p>
              </div>
              <div className="text-right">
                <div className="text-slate-700">3 matches</div>
                <p className="text-sm text-slate-600">Just started!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Impact & Achievements */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-purple-600" />
              <h2>Community Impact</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-700">Total Connections</div>
                  <p className="text-sm text-slate-600">People you've played with</p>
                </div>
                <span className="text-purple-600">28</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-700">Welcomed Newbies</div>
                  <p className="text-sm text-slate-600">First-time players you helped</p>
                </div>
                <span className="text-purple-600">8</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-700">Gratitude Received</div>
                  <p className="text-sm text-slate-600">In post-match reflections</p>
                </div>
                <span className="text-purple-600">45</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-orange-600" />
              <h2>Achievements</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-orange-200">
                <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-sm text-orange-900">Welcome Warrior</div>
                <p className="text-xs text-orange-700">5+ newbies welcomed</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <Target className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <div className="text-sm text-cyan-900">Consistent Player</div>
                <p className="text-xs text-cyan-700">20+ matches played</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                <Sparkles className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-sm text-emerald-900">Friendship Builder</div>
                <p className="text-xs text-emerald-700">5+ active streaks</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm text-purple-900">Community Hero</div>
                <p className="text-xs text-purple-700">High trust score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Match History */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="mb-6">Recent Matches ({matches.length})</h2>
          
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    match.status === 'completed' ? 'bg-emerald-100' : 'bg-cyan-100'
                  }`}>
                    <Trophy className={`w-6 h-6 ${
                      match.status === 'completed' ? 'text-emerald-600' : 'text-cyan-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3>{match.title}</h3>
                    <p className="text-slate-600">{match.turfName} • {match.date} • {match.time}</p>
                    <p className="text-sm text-slate-500">{match.visibility} • {match.paymentOption}</p>
                  </div>
                  <Badge variant="secondary" className={
                    match.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-cyan-100 text-cyan-700'
                  }>
                    {match.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600">No matches yet. Start creating or joining matches!</p>
            </div>
          )}
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