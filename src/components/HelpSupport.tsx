import { ArrowLeft, MessageCircle, Mail, Phone, Book, AlertCircle, Heart, HelpCircle, Users, Shield, FileText, ExternalLink, Music, PartyPopper, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';

interface HelpSupportProps {
  onNavigate: (page: 'dashboard' | 'events-dashboard' | 'party-dashboard' | 'profile' | 'sports-community' | 'cultural-community' | 'party-community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'help', turfId?: string, matchId?: string) => void;
  category?: 'sports' | 'events' | 'parties';
}

type IssueCategory = 'payment' | 'booking' | 'technical' | 'community' | 'account' | 'other';

export function HelpSupport({ onNavigate, category = 'sports' }: HelpSupportProps) {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!selectedCategory || !issueDescription.trim()) {
      toast.error('Please select a category and describe your issue');
      return;
    }

    toast.success('Support request submitted! 🎉', {
      description: 'Our team will get back to you within 24 hours.',
    });

    // Reset form
    setSelectedCategory(null);
    setIssueDescription('');
    setEmail('');
  };

  // Get the appropriate dashboard based on category
  const getDashboardPage = () => {
    switch (category) {
      case 'sports':
        return 'dashboard';
      case 'events':
        return 'events-dashboard';
      case 'parties':
        return 'party-dashboard';
      default:
        return 'dashboard';
    }
  };

  // Get the appropriate community page based on category
  const getCommunityPage = () => {
    switch (category) {
      case 'sports':
        return 'sports-community';
      case 'events':
        return 'cultural-community';
      case 'parties':
        return 'party-community';
      default:
        return 'sports-community';
    }
  };

  // Get category-specific colors and icons
  const getCategoryTheme = () => {
    switch (category) {
      case 'sports':
        return {
          gradient: 'from-cyan-500 to-emerald-500',
          gradientHover: 'from-cyan-600 to-emerald-600',
          icon: Trophy,
          name: 'Sports & Turf',
        };
      case 'events':
        return {
          gradient: 'from-purple-500 to-pink-500',
          gradientHover: 'from-purple-600 to-pink-600',
          icon: Music,
          name: 'Cultural Events',
        };
      case 'parties':
        return {
          gradient: 'from-orange-500 to-pink-500',
          gradientHover: 'from-orange-600 to-pink-600',
          icon: PartyPopper,
          name: 'Parties',
        };
      default:
        return {
          gradient: 'from-cyan-500 to-emerald-500',
          gradientHover: 'from-cyan-600 to-emerald-600',
          icon: Trophy,
          name: 'Sports & Turf',
        };
    }
  };

  const theme = getCategoryTheme();
  const ThemeIcon = theme.icon;

  const categories = [
    { id: 'payment' as IssueCategory, label: 'Payment Issues', icon: AlertCircle, color: 'orange' },
    { id: 'booking' as IssueCategory, label: 'Booking Problems', icon: FileText, color: 'blue' },
    { id: 'technical' as IssueCategory, label: 'Technical Issues', icon: HelpCircle, color: 'purple' },
    { id: 'community' as IssueCategory, label: 'Community Concerns', icon: Users, color: 'cyan' },
    { id: 'account' as IssueCategory, label: 'Account Help', icon: Shield, color: 'emerald' },
    { id: 'other' as IssueCategory, label: 'Other', icon: MessageCircle, color: 'slate' },
  ];

  const faqs = [
    {
      q: 'How do I join a match?',
      a: 'Browse available turfs, select a time slot, and join or create a match plan. You can invite friends or join open community matches!'
    },
    {
      q: 'What is a Trust Score?',
      a: 'Your Trust Score reflects your reliability, respect, and positive contributions to the community. It helps others feel confident playing with you.'
    },
    {
      q: 'Can I cancel a booking?',
      a: 'Yes! You can cancel up to 12 hours before the match for a full refund. Cancel between 6-12 hours for a 50% refund.'
    },
    {
      q: 'How do payment splits work?',
      a: 'When creating a match, you can split costs equally among players or pay upfront. Everyone gets a payment notification 12 hours before the match.'
    },
    {
      q: 'What are Friendship Streaks?',
      a: 'Friendship Streaks track consecutive matches you play with the same people, celebrating your growing connections!'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate(getDashboardPage() as any)}
                className="hover:bg-purple-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Help & Support
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className={`bg-gradient-to-br ${theme.gradient} text-white rounded-2xl p-8 mb-8 shadow-xl`}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-white">We're Here to Help! 🤝</h1>
              <p className="text-white/90 mb-4">
                Whether you have a question, issue, or just want to chat, our friendly team is ready to assist you.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Average response: 2 hours</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Community support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="mb-4">Contact Us</h2>
              
              <div className="space-y-4">
                <a
                  href="mailto:support@gamesetgo.com"
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-cyan-100 group-hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5 text-cyan-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-900 mb-1">Email</div>
                    <p className="text-sm text-slate-600">support@gamesetgo.com</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600" />
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-emerald-100 group-hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-900 mb-1">Phone</div>
                    <p className="text-sm text-slate-600">+91 98765 43210</p>
                    <p className="text-xs text-slate-500 mt-1">Mon-Sat, 9 AM - 8 PM</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-100 group-hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-900 mb-1">WhatsApp</div>
                    <p className="text-sm text-slate-600">Quick chat support</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                </a>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Book className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-blue-900 mb-1">Documentation</div>
                    <p className="text-xs text-blue-700">
                      Check out our detailed guides and tutorials
                    </p>
                    <Button variant="link" className="text-blue-600 p-0 h-auto mt-2 text-xs">
                      Browse Docs →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="mb-3">Office Address</h3>
              <p className="text-sm text-slate-600 mb-2">
                GameSetGo Sports Pvt. Ltd.
              </p>
              <p className="text-sm text-slate-600 mb-2">
                SG Highway, Satellite<br />
                Ahmedabad, Gujarat 380015<br />
                India
              </p>
              <Button variant="outline" size="sm" className="mt-2 gap-2 w-full">
                <ExternalLink className="w-4 h-4" />
                View on Map
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Submit Issue Form */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="mb-4">Report an Issue</h2>
              <p className="text-slate-600 mb-6">
                Tell us what you're experiencing and we'll help resolve it quickly.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-3">What's this about? *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                            selectedCategory === cat.id
                              ? 'border-cyan-500 bg-cyan-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${
                            selectedCategory === cat.id ? 'text-cyan-600' : 'text-slate-400'
                          }`} />
                          <span className="text-xs text-center">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Your Email (optional)</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    We'll send updates about your issue here
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2">Describe your issue *</label>
                  <Textarea
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Please provide as much detail as possible..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Submit Issue
                </Button>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-slate-200 rounded-lg"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors">
                      <span className="text-slate-900">{faq.q}</span>
                      <HelpCircle className="w-5 h-5 text-slate-400 group-open:text-cyan-600 transition-colors" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Community Help */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-purple-900 mb-2">Ask the Community</h3>
                  <p className="text-sm text-purple-700 mb-4">
                    Sometimes the best help comes from fellow players! Join our community forum to ask questions,
                    share tips, and connect with experienced members.
                  </p>
                  <Button
                    onClick={() => onNavigate(getCommunityPage() as any)}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-100 gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Visit Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}