import { ArrowLeft, Heart, TrendingUp, MessageCircle, Trophy, Target, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnimatedBackground } from './AnimatedBackground';
import { GlassCard } from './GlassCard';
import { LiveActivityFeed } from './LiveActivityFeed';
import { VibeRooms } from './VibeRooms';
import { ActivityHeatmap } from './ActivityHeatmap';

interface SportsCommunityFeedProps {
  onNavigate: (page: any) => void;
}

export function SportsCommunityFeed({ onNavigate }: SportsCommunityFeedProps) {
  return (
    <AnimatedBackground variant="community">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <div>
                <h1 className="flex items-center gap-2">
                  <span className="text-2xl">⚽</span>
                  Sports Community
                </h1>
                <p className="text-sm text-slate-600">Connect with athletes and sports enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-cyan-600 mb-1">2,847</div>
              <p className="text-sm text-slate-600">Active Athletes</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-emerald-600 mb-1">892</div>
              <p className="text-sm text-slate-600">Matches This Week</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-purple-600 mb-1">156</div>
              <p className="text-sm text-slate-600">Teams Formed</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-orange-600 mb-1">45</div>
              <p className="text-sm text-slate-600">Tournaments</p>
            </div>
          </GlassCard>
        </div>

        {/* Live Activities */}
        <LiveActivityFeed category="sports" />

        {/* Activity Heatmap */}
        <ActivityHeatmap category="sports" />

        {/* Vibe Rooms */}
        <VibeRooms category="sports" />

        {/* Community Posts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-cyan-600" />
            <h2>Community Feed</h2>
          </div>

          {/* Tournament Announcement */}
          <GlassCard variant="highlighted">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  🏆
                </div>
                <div className="flex-1">
                  <Badge className="bg-orange-200 text-orange-800 mb-2">Tournament Alert</Badge>
                  <h3 className="text-orange-900 mb-2">Inter-City Cricket Championship - Register Now!</h3>
                  <p className="text-orange-800 mb-4">
                    Join the biggest cricket tournament of the season! Teams from across Gujarat will compete. 
                    Register your team before November 20th. Prize pool: ₹50,000!
                  </p>
                  <div className="flex items-center gap-4 text-sm text-orange-700">
                    <span>📅 Starting Dec 1st</span>
                    <span>📍 Multiple Venues</span>
                    <span>👥 32 teams max</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                Register Team
              </Button>
            </div>
          </GlassCard>

          {/* Achievement Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                  R
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Rahul Mehta</span>
                    <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                      <Trophy className="w-3 h-3" />
                      Achievement
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">3 hours ago</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-lg p-4 mb-4 border border-emerald-200">
                <div className="flex items-center gap-3">
                  <Trophy className="w-12 h-12 text-emerald-600" />
                  <div>
                    <h3 className="text-emerald-900 mb-1">Unlocked: Hat-Trick Hero! 🎯</h3>
                    <p className="text-sm text-emerald-700">Scored 3 consecutive wins in football matches</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                Three wins in a row! 🔥 Massive thanks to my teammates - couldn't have done it without the 
                amazing coordination and trust we've built. This community makes winning feel even better! ⚽💪
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>124</span>
                </button>
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>28</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Training Tips Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Coach Mike</span>
                    <Badge className="bg-blue-100 text-blue-700 gap-1">
                      <Target className="w-3 h-3" />
                      Pro Tips
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">5 hours ago</p>
                </div>
              </div>
              <h3 className="mb-2">5 Essential Warm-up Exercises Before Any Match 🏃‍♂️</h3>
              <p className="text-slate-700 mb-4">
                Hey sports fam! After coaching for 10+ years, I've seen too many injuries from skipping warm-ups. 
                Here are my go-to exercises that take just 10 minutes but make a HUGE difference in performance 
                and injury prevention. Drop a comment if you want the detailed video tutorial!
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                  <span className="text-sm">✓ Dynamic stretching</span>
                </div>
                <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                  <span className="text-sm">✓ Joint rotations</span>
                </div>
                <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                  <span className="text-sm">✓ Light cardio</span>
                </div>
                <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                  <span className="text-sm">✓ Sport-specific drills</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>89</span>
                </button>
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>34</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Team Formation Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Sarah Williams</span>
                    <Badge className="bg-purple-100 text-purple-700 gap-1">
                      <Award className="w-3 h-3" />
                      Team Captain
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">1 day ago</p>
                </div>
              </div>
              <h3 className="mb-2">Looking for 2 more players for Saturday Basketball! 🏀</h3>
              <p className="text-slate-700 mb-4">
                We're a friendly group playing every Saturday morning. All skill levels welcome! We focus on 
                having fun and improving together. Newbie-friendly environment with experienced players who 
                love to help. Join us for some great games and even better friendships!
              </p>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-emerald-50 border-emerald-300 text-emerald-700">
                  Newbie-friendly
                </Badge>
                <Badge variant="outline" className="bg-cyan-50 border-cyan-300 text-cyan-700">
                  High trust zone
                </Badge>
                <Badge variant="outline">Saturday 8 AM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>45</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>12</span>
                  </button>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white">
                  I'm Interested
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Streak Celebration */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Alex & Team Thunder</span>
                    <Badge className="bg-orange-100 text-orange-700 gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Streak Milestone
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">2 days ago</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4 border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🔥</div>
                  <div>
                    <h3 className="text-orange-900 mb-1">50-Match Team Streak!</h3>
                    <p className="text-sm text-orange-700">Playing together consistently for 6 months</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                Half a century of matches! 🎉 What started as strangers meeting for a casual game has become 
                a second family. Through wins, losses, and everything in between, we've grown together. 
                Here's to the next 50! ⚽❤️
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>167</span>
                </button>
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>42</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AnimatedBackground>
  );
}