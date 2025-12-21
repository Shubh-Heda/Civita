import { ArrowLeft, Heart, MessageCircle, Zap, Music, Sparkles, PartyPopper } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnimatedBackground } from './AnimatedBackground';
import { GlassCard } from './GlassCard';
import { LiveActivityFeed } from './LiveActivityFeed';
import { VibeRooms } from './VibeRooms';
import { ActivityHeatmap } from './ActivityHeatmap';

interface PartyCommunityFeedProps {
  onNavigate: (page: any) => void;
  onGetTickets?: (partyDetails: any) => void;
}

export function PartyCommunityFeed({ onNavigate, onGetTickets }: PartyCommunityFeedProps) {
  return (
    <AnimatedBackground variant="party">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <div>
                <h1 className="flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  Party Community
                </h1>
                <p className="text-sm text-slate-600">Connect, celebrate, and create unforgettable memories</p>
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
              <div className="text-pink-600 mb-1">3,142</div>
              <p className="text-sm text-slate-600">Party People</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-orange-600 mb-1">87</div>
              <p className="text-sm text-slate-600">Events This Week</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-purple-600 mb-1">245</div>
              <p className="text-sm text-slate-600">DJs & Hosts</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="p-4 text-center">
              <div className="text-cyan-600 mb-1">42</div>
              <p className="text-sm text-slate-600">Venues</p>
            </div>
          </GlassCard>
        </div>

        {/* Live Activities */}
        <LiveActivityFeed category="parties" />

        {/* Activity Heatmap */}
        <ActivityHeatmap category="parties" />

        {/* Vibe Rooms */}
        <VibeRooms category="party" />

        {/* Community Posts */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-pink-600" />
            <h2>Community Feed</h2>
          </div>

          {/* Featured Party Announcement */}
          <GlassCard variant="highlighted">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0 animate-bounce">
                  🎊
                </div>
                <div className="flex-1">
                  <Badge className="bg-pink-200 text-pink-800 mb-2">Featured Event</Badge>
                  <h3 className="text-pink-900 mb-2">Neon Nights - The Ultimate Glow Party! 💫</h3>
                  <p className="text-pink-800 mb-4">
                    Get ready for the biggest glow party of the year! International DJ lineup, UV face painting, 
                    glow sticks, laser shows, and more. Early bird tickets 50% off! Limited spots - grab yours now! 🎵✨
                  </p>
                  <div className="flex items-center gap-4 text-sm text-pink-700">
                    <span>📅 Nov 25th</span>
                    <span>📍 Skybar Rooftop</span>
                    <span>🎟️ ₹999 Early Bird</span>
                    <span>👥 200+ going</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white" 
                  onClick={() => onGetTickets && onGetTickets({ 
                    id: 'neon-nights',
                    title: 'Neon Nights - The Ultimate Glow Party!', 
                    venue: 'Skybar Rooftop',
                    location: 'Ahmedabad',
                    date: 'Nov 25, 2025', 
                    time: '9:00 PM',
                    price: '₹999',
                    category: 'Glow Party',
                    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800'
                  })}
                >
                  Get Tickets
                </Button>
                <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                  Share Event
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* DJ Night Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                  D
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>DJ Krish</span>
                    <Badge className="bg-purple-100 text-purple-700 gap-1">
                      <Music className="w-3 h-3" />
                      DJ
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">3 hours ago</p>
                </div>
              </div>
              <h3 className="mb-2">Epic Night Last Weekend! 🎧🔥</h3>
              <p className="text-slate-700 mb-4">
                Thank you to everyone who came to Saturday's Retro Rewind night! The energy was absolutely insane! 
                You guys sang every word, danced till closing, and made it a night I'll never forget. Already planning 
                the next one - drop your song requests below! 💿✨
              </p>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-200">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-purple-600 mb-1">450+</div>
                    <p className="text-xs text-slate-600">Attendees</p>
                  </div>
                  <div>
                    <div className="text-pink-600 mb-1">6hrs</div>
                    <p className="text-xs text-slate-600">Non-stop</p>
                  </div>
                  <div>
                    <div className="text-orange-600 mb-1">100+</div>
                    <p className="text-xs text-slate-600">Songs</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>389</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>124</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Birthday Bash Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Ananya Patel</span>
                    <Badge className="bg-orange-100 text-orange-700 gap-1">
                      <PartyPopper className="w-3 h-3" />
                      Host
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">1 day ago</p>
                </div>
              </div>
              <h3 className="mb-2">You're Invited: Bollywood Themed Birthday Bash! 🎂</h3>
              <p className="text-slate-700 mb-4">
                Turning 25 and celebrating Bollywood style! 🎬 Dress up as your favorite Bollywood character, 
                we'll have live performances, karaoke, Indian fusion food, and a photo booth. Bring your dance 
                shoes and your best energy! RSVP by Monday! 💃🕺
              </p>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-orange-50 border-orange-300 text-orange-700">
                  Bollywood Theme
                </Badge>
                <Badge variant="outline" className="bg-pink-50 border-pink-300 text-pink-700">
                  Costume Party
                </Badge>
                <Badge variant="outline">Nov 23rd 8 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <button className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>78</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>34</span>
                  </button>
                </div>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                  RSVP
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Rooftop Party Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Mike & The Squad</span>
                    <Badge className="bg-cyan-100 text-cyan-700 gap-1">
                      <Sparkles className="w-3 h-3" />
                      Party Crew
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">2 days ago</p>
                </div>
              </div>
              <h3 className="mb-2">Monthly Rooftop Sunset Session 🌅</h3>
              <p className="text-slate-700 mb-4">
                Our favorite monthly tradition continues! Sunset views, chill vibes, acoustic sets, and good people. 
                BYO drinks, we've got the snacks covered. Last month was 100+ people - let's make this one even bigger! 
                Tag your friends who need to be there! ☀️🎵
              </p>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-cyan-50 border-cyan-300 text-cyan-700">
                  Chill Vibes
                </Badge>
                <Badge variant="outline" className="bg-emerald-50 border-emerald-300 text-emerald-700">
                  Sunset Views
                </Badge>
                <Badge variant="outline">Every Last Friday</Badge>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>234</span>
                </button>
                <button className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>89</span>
                </button>
              </div>
            </div>
          </GlassCard>

          {/* House Party Post */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>Sarah's House</span>
                    <Badge className="bg-pink-100 text-pink-700 gap-1">
                      <Zap className="w-3 h-3" />
                      Intimate Gathering
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">3 days ago</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-4 border border-pink-200">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🏠</div>
                  <div>
                    <h3 className="text-pink-900 mb-1">Game Night & Chill - This Saturday!</h3>
                    <p className="text-sm text-pink-700">Board games, video games, snacks & good company</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 mb-4">
                Looking for a more low-key weekend vibe? Join us for game night! We've got all the classics - 
                Cards Against Humanity, UNO, Mario Kart, and more. Small group (max 15 people) for quality hangout time. 
                Bring your favorite snacks! 🎮🍕
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>45</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>18</span>
                  </button>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  12/15 spots filled
                </Badge>
              </div>
            </div>
          </GlassCard>

          {/* Community Celebration */}
          <GlassCard variant="highlighted">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-purple-200 text-purple-800 mb-2">Community Milestone</Badge>
                  <h3 className="text-purple-900 mb-2">We Hit 3000 Members! 🎉✨</h3>
                  <p className="text-purple-800 mb-4">
                    What started as a small group of friends has grown into an amazing community of party lovers! 
                    To celebrate, we're throwing a massive appreciation party next week - free for all members! 
                    Let's celebrate together! Thank you for making this community incredible! 💜
                  </p>
                  <div className="flex items-center gap-4 text-sm text-purple-700">
                    <span>📅 Next Saturday</span>
                    <span>📍 Downtown Club</span>
                    <span>🎟️ Free for members</span>
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