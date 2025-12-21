import { useState } from 'react';
import { ArrowLeft, Edit, Save, X, Trophy, Flame, Users, Gamepad2, Star, Award, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface GamingProfilePageProps {
  onNavigate: (page: string) => void;
  onProfileUpdate?: (profile: any) => void;
  userProfile?: any;
  games?: any[];
}

export function GamingProfilePage({ onNavigate, onProfileUpdate, userProfile, games = [] }: GamingProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userProfile || {
    name: 'Alex Thompson',
    bio: 'Pro gamer | Tournament Champion | Building the gaming community 🎮',
    favoriteGames: ['FIFA 24', 'Valorant', 'COD MW3'],
    location: 'Ahmedabad, Gujarat',
    joinDate: 'January 2024',
  });

  const [editingProfile, setEditingProfile] = useState(profile);

  const stats = {
    trustScore: 4.8,
    totalGames: 52,
    wins: 38,
    achievements: 15,
    gamingFriends: 28,
    tournaments: 8,
    hoursPlayed: 182,
    level: 22,
  };

  const handleSave = () => {
    setProfile(editingProfile);
    setIsEditing(false);
    onProfileUpdate?.(editingProfile);
    toast.success('Gaming profile updated!');
  };

  const handleCancel = () => {
    setEditingProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('gaming-hub')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-slate-900 font-semibold">Gaming Profile</h1>
              <p className="text-sm text-slate-600">Manage your gaming identity</p>
            </div>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500" />
          
          {/* Profile Info */}
          <div className="p-6 -mt-16 relative z-10">
            <div className="flex gap-4 mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <Gamepad2 className="w-16 h-16 text-white" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                {isEditing ? (
                  <Input
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                    className="text-2xl font-bold mb-2"
                    placeholder="Your name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
                )}
                {isEditing ? (
                  <textarea
                    value={editingProfile.bio}
                    onChange={(e) => setEditingProfile({ ...editingProfile, bio: e.target.value })}
                    className="text-slate-600 mb-2 p-2 border border-slate-300 rounded-lg w-full"
                    rows={2}
                    placeholder="Your bio"
                  />
                ) : (
                  <p className="text-slate-600 mb-2">{profile.bio}</p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {profile.favoriteGames.map((game: string) => (
                    <Badge key={game} className="bg-purple-100 text-purple-700">
                      {game}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Edit Buttons */}
            {isEditing && (
              <div className="flex gap-2 mb-4">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.level}</div>
                <p className="text-sm text-slate-600">Level</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{stats.wins}W</div>
                <p className="text-sm text-slate-600">Wins</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{stats.achievements}</div>
                <p className="text-sm text-slate-600">Achievements</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.trustScore}</div>
                <p className="text-sm text-slate-600">Trust Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Gaming Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Games:</span>
                <span className="font-semibold">{stats.totalGames}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Win Rate:</span>
                <span className="font-semibold text-green-600">{Math.round((stats.wins / stats.totalGames) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Hours Played:</span>
                <span className="font-semibold">{stats.hoursPlayed}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Tournaments:</span>
                <span className="font-semibold">{stats.tournaments}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Community Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Gaming Friends:</span>
                <span className="font-semibold">{stats.gamingFriends}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Trust Score:</span>
                <span className="font-semibold text-purple-600">⭐ {stats.trustScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Group Chats:</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Tournaments Won:</span>
                <span className="font-semibold text-orange-600">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-500" />
            Recent Gaming Sessions
          </h3>
          {games.length > 0 ? (
            <div className="space-y-3">
              {games.slice(0, 5).map((game: any) => (
                <div key={game.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">{game.title || 'Gaming Session'}</p>
                    <p className="text-sm text-slate-600">{game.date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Won</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 text-center py-4">No gaming sessions yet. Start your first game!</p>
          )}
        </div>
      </div>
    </div>
  );
}
