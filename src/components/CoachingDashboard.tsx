import { useState } from 'react';
import { GraduationCap, Calendar, Clock, MapPin, User, CheckCircle2, XCircle, AlertCircle, Star, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface CoachingSession {
  id: string;
  coachName: string;
  sport: string;
  turfName: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  rating?: number;
  feedback?: string;
  price: number;
  sessionsCompleted?: number;
  totalSessions?: number;
}

interface CoachingDashboardProps {
  onNavigate?: (page: string, id?: string) => void;
  onClose?: () => void;
}

export function CoachingDashboard({ onNavigate, onClose }: CoachingDashboardProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'history'>('active');

  // Mock coaching sessions
  const sessions: CoachingSession[] = [
    {
      id: '1',
      coachName: 'Coach Rajesh Kumar',
      sport: 'Football',
      turfName: 'Sky Sports Arena',
      location: 'Bandra, Mumbai',
      date: '2025-12-10',
      time: '6:00 PM',
      duration: '1 hour',
      status: 'upcoming',
      price: 500,
      sessionsCompleted: 3,
      totalSessions: 10,
    },
    {
      id: '2',
      coachName: 'Coach Priya Sharma',
      sport: 'Cricket',
      turfName: 'Champions Ground',
      location: 'Andheri, Mumbai',
      date: '2025-12-08',
      time: '7:00 AM',
      duration: '1.5 hours',
      status: 'upcoming',
      price: 750,
      sessionsCompleted: 1,
      totalSessions: 5,
    },
    {
      id: '3',
      coachName: 'Coach Amit Patel',
      sport: 'Badminton',
      turfName: 'Elite Sports Club',
      location: 'Worli, Mumbai',
      date: '2025-12-03',
      time: '5:00 PM',
      duration: '1 hour',
      status: 'completed',
      rating: 5,
      feedback: 'Excellent session! Really improved my smash technique.',
      price: 600,
    },
    {
      id: '4',
      coachName: 'Coach Sneha Reddy',
      sport: 'Tennis',
      turfName: 'Royal Tennis Academy',
      location: 'Juhu, Mumbai',
      date: '2025-11-28',
      time: '6:30 AM',
      duration: '1 hour',
      status: 'completed',
      rating: 4,
      feedback: 'Great coaching, very patient and detailed.',
      price: 800,
    },
  ];

  const activeSessions = sessions.filter(s => s.status === 'upcoming' && s.totalSessions && s.sessionsCompleted);
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const totalSpent = sessions.reduce((sum, s) => sum + s.price, 0);
  const totalHours = sessions.length * 1; // Simplified calculation

  const renderSessionCard = (session: CoachingSession) => (
    <motion.div
      key={session.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-slate-900 mb-1">{session.coachName}</h3>
            <p className="text-sm text-slate-600">{session.sport} Coaching</p>
          </div>
        </div>

        <Badge
          className={
            session.status === 'upcoming'
              ? 'bg-cyan-100 text-cyan-700 border-0'
              : session.status === 'completed'
              ? 'bg-emerald-100 text-emerald-700 border-0'
              : 'bg-slate-100 text-slate-700 border-0'
          }
        >
          {session.status === 'upcoming' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </Badge>
      </div>

      {/* Session Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-emerald-500" />
          <span>{session.turfName}, {session.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-cyan-500" />
          <span>{new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {session.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-purple-500" />
          <span>{session.duration}</span>
        </div>
      </div>

      {/* Progress Bar for Active Sessions */}
      {session.totalSessions && session.sessionsCompleted !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Progress: {session.sessionsCompleted}/{session.totalSessions} sessions</span>
            <span>{Math.round((session.sessionsCompleted / session.totalSessions) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(session.sessionsCompleted / session.totalSessions) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
            />
          </div>
        </div>
      )}

      {/* Rating for Completed Sessions */}
      {session.status === 'completed' && session.rating && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < session.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-600">Your Rating</span>
          </div>
          {session.feedback && (
            <p className="text-sm text-slate-600 italic bg-slate-50 rounded-lg p-3">
              "{session.feedback}"
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {session.status === 'upcoming' && (
          <>
            <Button variant="outline" size="sm" className="flex-1">
              Reschedule
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
              Cancel
            </Button>
          </>
        )}
        {session.status === 'completed' && !session.rating && (
          <Button size="sm" className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white">
            Rate Session
          </Button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">My Coaching</h1>
                <p className="text-sm text-slate-600">Track your coaching sessions and progress</p>
              </div>
            </div>
            {onClose && (
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-100">Active Plans</span>
              <TrendingUp className="w-5 h-5 text-cyan-200" />
            </div>
            <div className="text-3xl mb-1">{activeSessions.length}</div>
            <p className="text-xs text-cyan-100">Ongoing coaching plans</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-100">Total Hours</span>
              <Clock className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="text-3xl mb-1">{totalHours}</div>
            <p className="text-xs text-emerald-100">Hours of coaching</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100">Total Invested</span>
              <Award className="w-5 h-5 text-purple-200" />
            </div>
            <div className="text-3xl mb-1">₹{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-purple-100">In your development</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-1 flex gap-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === 'active'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Active Plans ({activeSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Upcoming ({upcomingSessions.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            History ({completedSessions.length})
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === 'active' && activeSessions.map(renderSessionCard)}
          {activeTab === 'upcoming' && upcomingSessions.map(renderSessionCard)}
          {activeTab === 'history' && completedSessions.map(renderSessionCard)}
        </div>

        {/* Empty State */}
        {((activeTab === 'active' && activeSessions.length === 0) ||
          (activeTab === 'upcoming' && upcomingSessions.length === 0) ||
          (activeTab === 'history' && completedSessions.length === 0)) && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-slate-900 mb-2">No Sessions Found</h3>
            <p className="text-slate-600 mb-6">
              {activeTab === 'active' && "You don't have any active coaching plans"}
              {activeTab === 'upcoming' && "You don't have any upcoming sessions"}
              {activeTab === 'history' && "You haven't completed any sessions yet"}
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white">
              Browse Coaches
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
