import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useAuth } from '../lib/AuthProvider';
import { Loader2, PartyPopper, Trophy, Music, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [demoUserReady, setDemoUserReady] = useState(false);
  const [initializingDemo, setInitializingDemo] = useState(false);

  // Initialize demo user on component mount (now using mock auth)
  useEffect(() => {
    // Mock initialization - demo user is always ready with mock auth
    setDemoUserReady(true);
    setInitializingDemo(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isLogin && !name) {
      toast.error('Please enter your name');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await signIn(email, password);
        
        if (error) {
          console.error('Sign in error:', error);
          
          // Provide more helpful error messages
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please check your credentials or create a new account.');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Please confirm your email address before signing in.');
          } else {
            toast.error(error.message || 'Failed to sign in');
          }
        } else if (data) {
          toast.success('Welcome back! 🎉');
          onAuthSuccess();
        }
      } else {
        // Sign up
        const { data, error } = await signUp(email, password, { name });
        
        if (error) {
          console.error('Sign up error:', error);
          toast.error(error.message || 'Failed to create account');
        } else if (data) {
          toast.success('Account created successfully! 🎉');
          onAuthSuccess();
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@gamesetgo.com');
    setPassword('demo123');
    setIsLogin(true);
    
    // Automatically submit after a short delay
    setTimeout(async () => {
      setLoading(true);
      try {
        const { data, error } = await signIn('demo@gamesetgo.com', 'demo123');
        
        if (error) {
          console.error('Demo login error:', error);
          toast.error('Demo login failed. Please try creating a new account instead.');
        } else if (data) {
          toast.success('Welcome to the demo! 🎉');
          onAuthSuccess();
        }
      } catch (error: any) {
        console.error('Demo auth error:', error);
        toast.error('Demo login failed. Please try creating a new account.');
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-orange-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white shadow-2xl">
              <h1 className="mb-6">
                <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                  Avento
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Matchmaking the Sport of Friendships
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">Sports & Turf</h3>
                    <p className="text-sm text-slate-600">
                      Book turfs, create matches, and build lasting friendships through sports
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">Cultural Events</h3>
                    <p className="text-sm text-slate-600">
                      Discover concerts, festivals, and cultural experiences with your community
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PartyPopper className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">Parties & Celebrations</h3>
                    <p className="text-sm text-slate-600">
                      Join amazing parties and create unforgettable memories together
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl border border-cyan-200">
                <p className="text-sm text-slate-700">
                  ✨ Trust Scores • 🔥 Friendship Streaks • 💬 Real-time Chat • 🎯 Smart Matching
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h2 className="mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-slate-600">
                {isLogin 
                  ? 'Sign in to continue your journey' 
                  : 'Join the Avento community today'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1"
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1"
                  disabled={loading}
                />
                {!isLogin && (
                  <p className="text-xs text-slate-500 mt-1">
                    Minimum 6 characters
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 hover:from-cyan-600 hover:via-purple-600 hover:to-orange-600 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                disabled={loading}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>

            {/* Demo credentials */}
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-blue-900 mb-1">
                      <strong>First time here?</strong> Try the demo account or create your own!
                    </p>
                    <p className="text-xs text-blue-700">
                      Demo: demo@gamesetgo.com • Password: demo123
                    </p>
                  </div>
                </div>
              </div>
              
              <Button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading || initializingDemo || !demoUserReady}
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                {initializingDemo ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up demo...
                  </>
                ) : !demoUserReady ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Preparing demo...
                  </>
                ) : (
                  '🎮 Try Demo Account'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}