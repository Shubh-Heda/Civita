import { ArrowLeft, Heart, MessageCircle, Sparkles, Music, Palette, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnimatedBackground } from './AnimatedBackground';
import { GlassCard } from './GlassCard';
import { LiveActivityFeed } from './LiveActivityFeed';
import { VibeRooms } from './VibeRooms';
import { ActivityHeatmap } from './ActivityHeatmap';

interface CulturalCommunityFeedProps {
  onNavigate: (page: any) => void;
}

export function CulturalCommunityFeed({ onNavigate }: CulturalCommunityFeedProps) {
  return (
    <AnimatedBackground variant="events">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <div>
                <h1 className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Cultural Events Community
                </h1>
                <p className="text-sm text-slate-600">Celebrate art, music, and cultural experiences</p>
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
              <div className="text-purple-600 mb-1">1,642</div>
              <p className="text-sm text-slate-600">Cultural Enthusiasts</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-pink-600 mb-1">124</div>
              <p className="text-sm text-slate-600">Events This Month</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-orange-600 mb-1">89</div>
              <p className="text-sm text-slate-600">Artist Collaborations</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-cyan-600 mb-1">23</div>
              <p className="text-sm text-slate-600">Active Communities</p>
            </div>
          </GlassCard>
        </div>

        {/* Live Activities */}
        <LiveActivityFeed category="events" />

        {/* Activity Heatmap */}
        <ActivityHeatmap category="cultural" />

        {/* Vibe Rooms */}
        <VibeRooms category="cultural" />

        {/* Community Posts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <h2>Community Feed</h2>
          </div>

          {/* Festival Announcement */}
          <GlassCard variant="highlighted">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  🪔
                </div>
                <div className="flex-1">
                  <Badge className="bg-purple-200 text-purple-800 mb-2">Festival Week</Badge>
                  <h3 className="text-purple-900 mb-2">Diwali Cultural Festival - Nov 18-20!</h3>
                  <p className="text-purple-800 mb-4">
                    Join us for three days of celebration! Traditional dance performances, rangoli competitions, 
                    live music, food stalls, and more. Bring your family and friends for an unforgettable experience. 
                    Free entry for all!
                  </p>
                  <div className="flex items-center gap-4 text-sm text-purple-700">
                    <span>📅 Nov 18-20</span>
                    <span>📍 City Cultural Center</span>
                    <span>🎟️ Free Entry</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                RSVP Now
              </Button>
            </div>
          </GlassCard>

          {/* Art Exhibition Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                  P
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Priya Sharma</span>
                    <Badge className="bg-pink-100 text-pink-700 gap-1">
                      <Palette className="w-3 h-3" />
                      Artist
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">2 hours ago</p>
                </div>
              </div>
              <h3 className="mb-2">My First Solo Exhibition! 🎨✨</h3>
              <p className="text-slate-700 mb-4">
                I can't believe it's finally happening! After months of preparation, my solo art exhibition 
                opens this Saturday. Thank you to this amazing community for all the encouragement and support. 
                Would love to see familiar faces there! Free workshops for beginners too! 💕
              </p>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 mb-4 border border-pink-200">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-pink-600 mb-1">35+</div>
                    <p className="text-xs text-slate-600">Artworks</p>
                  </div>
                  <div>
                    <div className="text-purple-600 mb-1">3</div>
                    <p className="text-xs text-slate-600">Workshops</p>
                  </div>
                  <div>
                    <div className="text-orange-600 mb-1">Sat 4PM</div>
                    <p className="text-xs text-slate-600">Opening</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>234</span>
                </button>
                <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>67</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Music Event Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                  R
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Rahul Beats</span>
                    <Badge className="bg-cyan-100 text-cyan-700 gap-1">
                      <Music className="w-3 h-3" />
                      Musician
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">5 hours ago</p>
                </div>
              </div>
              <h3 className="mb-2">Live Acoustic Night - This Friday! 🎸</h3>
              <p className="text-slate-700 mb-4">
                Hey music lovers! We're hosting an intimate acoustic session at Chai & Chords Cafe. 
                Local artists performing original compositions and covers. Open mic slots available - 
                DM me if you want to perform! Let's make it a night to remember 🎶
              </p>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-cyan-50 border-cyan-300 text-cyan-700">
                  Live Music
                </Badge>
                <Badge variant="outline" className="bg-purple-50 border-purple-300 text-purple-700">
                  Open Mic
                </Badge>
                <Badge variant="outline">Friday 7 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>156</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>43</span>
                  </button>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                  Reserve Spot
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Poetry Slam Event */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Sarah Mitchell</span>
                    <Badge className="bg-purple-100 text-purple-700 gap-1">
                      <BookOpen className="w-3 h-3" />
                      Poet
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">1 day ago</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-12 h-12 text-purple-600" />
                  <div>
                    <h3 className="text-purple-900 mb-1">Monthly Poetry Slam Success! 📖</h3>
                    <p className="text-sm text-purple-700">20+ poets, 100+ attendees, infinite emotions</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                What an incredible evening! Thank you to everyone who came, performed, and shared their hearts. 
                The energy in the room was electric. Special shoutout to our first-time performers - you were brave 
                and beautiful! Can't wait for next month's slam! ✨💜
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>198</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>52</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Community Ritual */}
          <GlassCard variant="highlighted">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-orange-200 text-orange-800 mb-2">Community Ritual</Badge>
                  <h3 className="text-orange-900 mb-2">Monthly Cultural Potluck - This Sunday!</h3>
                  <p className="text-orange-800 mb-4">
                    Join us for our monthly tradition where we celebrate diversity through food, stories, and performances. 
                    Bring a dish from your culture to share, and let's create magic together! All are welcome! 🌍✨
                  </p>
                  <div className="flex items-center gap-4 text-sm text-orange-700">
                    <span>📅 Sunday 6 PM</span>
                    <span>📍 Community Hall</span>
                    <span>👥 58 confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AnimatedBackground>
  );
}