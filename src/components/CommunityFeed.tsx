import { ArrowLeft, Heart, TrendingUp, Sparkles, Users, Trophy, MessageCircle, Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnimatedBackground } from './AnimatedBackground';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface CommunityFeedProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'availability', turfId?: string, matchId?: string) => void;
  matches: Match[];
}

export function CommunityFeed({ onNavigate, matches }: CommunityFeedProps) {
  // Filter for public/community matches
  const communityMatches = matches.filter(m => m.visibility !== 'private' && m.status === 'upcoming');
  return (
    <AnimatedBackground variant="community">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <h1>Community Feed</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Action Banner */}
        <div className="mb-6">
          <Button
            size="lg"
            onClick={() => onNavigate('availability')}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white gap-3 h-auto py-4"
          >
            <TrendingUp className="w-5 h-5" />
            <div className="text-left flex-1">
              <div>Who's Available Right Now?</div>
              <div className="text-xs opacity-90">Find players free to play instantly</div>
            </div>
          </Button>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-cyan-600 mb-1">5,248</div>
            <p className="text-sm text-slate-600">Active Members</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-emerald-600 mb-1">1,432</div>
            <p className="text-sm text-slate-600">Matches This Week</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-purple-600 mb-1">892</div>
            <p className="text-sm text-slate-600">New Friendships</p>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {/* Community Matches */}
          {communityMatches.length > 0 && (
            <div className="space-y-4 mb-6">
              <h2 className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-600" />
                Upcoming Community Matches
              </h2>
              {communityMatches.map(match => (
                <div key={match.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-64 relative flex-shrink-0">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
                        alt={match.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-white text-slate-700">
                        {match.sport}
                      </Badge>
                    </div>

                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="mb-2">{match.title}</h3>
                          <div className="flex items-center gap-1 text-slate-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{match.turfName}{match.location ? ` • ${match.location}` : ''}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 pb-4 border-b">
                        <div>
                          <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>Date</span>
                          </div>
                          <div>{match.date}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                            <Clock className="w-4 h-4" />
                            <span>Time</span>
                          </div>
                          <div>{match.time}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                            <Users className="w-4 h-4" />
                            <span>Players</span>
                          </div>
                          <div>8/10</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 border-2 border-white flex items-center justify-center text-white text-sm">S</div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 border-2 border-white flex items-center justify-center text-white text-sm">M</div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-sm">R</div>
                          </div>
                        </div>
                        <Button 
                          onClick={() => onNavigate('chat', undefined, match.id)}
                          className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Group Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Community Ritual Announcement */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-orange-200 text-orange-800 mb-2">Community Ritual</Badge>
                <h3 className="text-orange-900 mb-2">Monthly Welcome Circle - This Sunday!</h3>
                <p className="text-orange-800 mb-4">
                  Join us for our monthly tradition where we welcome new members, share stories, and celebrate 
                  what makes our community special. Everyone's invited to share their favorite sports moment!
                </p>
                <div className="flex items-center gap-4 text-sm text-orange-700">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    42 attending
                  </span>
                  <span>📍 Sky Sports Arena</span>
                  <span>⏰ 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gratitude Post */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                S
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>Sarah Martinez</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    <Heart className="w-3 h-3 mr-1" />
                    Gratitude
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">2 hours ago</p>
              </div>
            </div>
            <p className="text-slate-700 mb-4">
              Just finished an amazing match! 💫 Huge shoutout to <span className="text-cyan-600">@Mike</span> for 
              being so patient while teaching me that new technique. And <span className="text-cyan-600">@Alex</span> 
              for bringing the best energy as always! This community makes every game special. 🙏⚽
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <Heart className="w-4 h-4" />
                <span>24</span>
              </button>
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <MessageCircle className="w-4 h-4" />
                <span>8</span>
              </button>
            </div>
          </div>

          {/* Achievement Celebration */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                M
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>Mike Chen</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    <Trophy className="w-3 h-3 mr-1" />
                    Achievement
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">5 hours ago</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-12 h-12 text-emerald-600" />
                <div>
                  <h3 className="text-emerald-900 mb-1">Unlocked: Welcome Warrior! 🎉</h3>
                  <p className="text-sm text-emerald-700">Welcomed 10 new members to the community</p>
                </div>
              </div>
            </div>
            <p className="text-slate-700 mb-4">
              So proud to hit this milestone! Every new person I've met has brought something special to our games. 
              Here's to making everyone feel like they belong! 🤝✨
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <Heart className="w-4 h-4" />
                <span>56</span>
              </button>
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <MessageCircle className="w-4 h-4" />
                <span>12</span>
              </button>
            </div>
          </div>

          {/* Friendship Streak Milestone */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                R
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>Rahul & Priya</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Streak Milestone
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">1 day ago</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🔥</div>
                <div>
                  <h3 className="text-orange-900 mb-1">20-Match Friendship Streak!</h3>
                  <p className="text-sm text-orange-700">Playing together consistently for 3 months</p>
                </div>
              </div>
            </div>
            <p className="text-slate-700 mb-4">
              From strangers to best friends! 20 matches and countless memories later, cricket brought us together 
              but this community made us family. Can't wait for the next 20! 🏏❤️
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <Heart className="w-4 h-4" />
                <span>89</span>
              </button>
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <MessageCircle className="w-4 h-4" />
                <span>23</span>
              </button>
            </div>
          </div>

          {/* Trust Score Improvement */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                P
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>Priya Sharma</span>
                </div>
                <p className="text-sm text-slate-600">2 days ago</p>
              </div>
            </div>
            <p className="text-slate-700 mb-4">
              Just hit a 4.9 trust score! 🌟 Thank you to everyone who's shown me what it means to be reliable, 
              respectful, and inclusive. This community has taught me so much about showing up not just for the game, 
              but for each other. Grateful every day! 🙏
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <Heart className="w-4 h-4" />
                <span>67</span>
              </button>
              <button className="flex items-center gap-1 hover:text-cyan-600">
                <MessageCircle className="w-4 h-4" />
                <span>15</span>
              </button>
            </div>
          </div>

          {/* Welcome Post */}
          <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl border-2 border-cyan-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-cyan-200 text-cyan-800 mb-2">New Member Welcome</Badge>
                <h3 className="text-cyan-900 mb-2">Welcome Jay, Ananya, and Karan! 👋</h3>
                <p className="text-cyan-800 mb-4">
                  Three new members just joined our community! Let's make them feel at home. If you see them at 
                  matches this week, say hi and share your favorite GameSetGo moment with them! 🎉
                </p>
                <div className="flex items-center gap-3 text-sm text-cyan-700">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    Welcome them
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}