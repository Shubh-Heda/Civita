import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Star,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import eventFlowService from '../services/eventFlowService';
import { toast } from 'sonner';

interface EventFlowPanelProps {
  eventId: string;
  userId: string;
}

export function EventFlowPanel({ eventId, userId }: EventFlowPanelProps) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'availability' | 'roles' | 'feedback' | 'highlights'>('availability');
  const [suggestedSlots, setSuggestedSlots] = useState<any[]>([]);
  const [roleData, setRoleData] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [highlights, setHighlights] = useState<any[]>([]);

  // Form states
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [feedbackForm, setFeedbackForm] = useState({
    skill_rating: 3,
    teamwork_rating: 3,
    sportsmanship_rating: 3,
    communication_rating: 3,
    what_went_well: '',
    what_to_improve: '',
    overall_comment: ''
  });

  useEffect(() => {
    loadData();
  }, [eventId, userId, activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'availability') {
        const slots = await eventFlowService.suggestOptimalTimeSlots(eventId, 3);
        setSuggestedSlots(slots);
      } else if (activeTab === 'roles') {
        const role = await eventFlowService.getRoleWithTasks(eventId, userId);
        setRoleData(role);
      } else if (activeTab === 'feedback') {
        const fb = await eventFlowService.getUserEventFeedback(eventId, userId);
        setFeedback(fb);
      } else if (activeTab === 'highlights') {
        const reels = await eventFlowService.getHighlightReels(eventId);
        setHighlights(reels);
      }
    } catch (error) {
      console.error('Error loading event data:', error);
      toast.error('Failed to load event data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAvailability = async () => {
    if (selectedSlots.length === 0) {
      toast.error('Select at least one time slot');
      return;
    }

    try {
      const slots = suggestedSlots
        .filter(s => selectedSlots.includes(s.time))
        .map(s => ({
          start_time: s.time.split('-')[0],
          end_time: s.time.split('-')[1],
          preference_score: 5
        }));

      await eventFlowService.submitAvailability(eventId, userId, slots);
      toast.success('Availability submitted!');
      setSelectedSlots([]);
    } catch (error) {
      toast.error('Failed to submit availability');
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      // This would need a target_user_id to be passed in
      await eventFlowService.submitFeedbackForm({
        event_id: eventId,
        from_user_id: userId,
        to_user_id: userId, // Should be different in real use
        ...feedbackForm
      });
      toast.success('Feedback submitted!');
      setFeedbackForm({
        skill_rating: 3,
        teamwork_rating: 3,
        sportsmanship_rating: 3,
        communication_rating: 3,
        what_went_well: '',
        what_to_improve: '',
        overall_comment: ''
      });
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {(['availability', 'roles', 'feedback', 'highlights'] as const).map(tab => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'ghost'}
            className="capitalize"
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'availability' && <Calendar className="w-4 h-4 mr-2" />}
            {tab === 'roles' && <Users className="w-4 h-4 mr-2" />}
            {tab === 'feedback' && <MessageSquare className="w-4 h-4 mr-2" />}
            {tab === 'highlights' && <Star className="w-4 h-4 mr-2" />}
            {tab}
          </Button>
        ))}
      </div>

      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-600" />
            Suggested Time Slots
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Based on availability from all participants, here are the best times
          </p>

          <div className="space-y-3 mb-6">
            {suggestedSlots.map((slot, idx) => (
              <motion.label
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedSlots.includes(slot.time)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSlots([...selectedSlots, slot.time]);
                    } else {
                      setSelectedSlots(selectedSlots.filter(s => s !== slot.time));
                    }
                  }}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{slot.time}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-cyan-600 h-1.5 rounded-full"
                        style={{ width: `${slot.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{Math.round(slot.confidence)}%</span>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>

          <Button
            onClick={handleSubmitAvailability}
            className="w-full gap-2"
            disabled={selectedSlots.length === 0}
          >
            <CheckCircle2 className="w-4 h-4" />
            Submit Availability
          </Button>
        </Card>
      )}

      {/* Roles & Tasks Tab */}
      {activeTab === 'roles' && roleData && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold capitalize">{roleData.role.role}</h3>
                <p className="text-sm text-slate-600">
                  {roleData.role.tasks_completed} / {roleData.tasks.length} tasks completed
                </p>
              </div>
              <Badge variant="secondary">
                {roleData.completion_percentage}% Complete
              </Badge>
            </div>

            {/* Task Progress */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
              <div
                className="bg-cyan-600 h-2 rounded-full transition-all"
                style={{ width: `${roleData.completion_percentage}%` }}
              />
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {roleData.tasks.map((task: any) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    task.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : task.status === 'blocked'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-white'
                  }`}
                >
                  {task.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {task.status === 'blocked' && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                  {task.status === 'in_progress' && <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />}
                  {task.status === 'pending' && <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0" />}

                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900">{task.title}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {task.task_type}
                    </Badge>
                  </div>
                  <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-600" />
            Structured Feedback Form
          </h3>

          {feedback && feedback.feedback_count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200"
            >
              <p className="font-semibold text-sm text-cyan-900 mb-3">Your Average Ratings</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(feedback.average_ratings).map(([key, value]: any) => (
                  <div key={key} className="text-center">
                    <p className="text-2xl font-bold text-cyan-600">{value.toFixed(1)}</p>
                    <p className="text-xs text-cyan-700 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            {[
              { label: 'Skill', key: 'skill_rating' },
              { label: 'Teamwork', key: 'teamwork_rating' },
              { label: 'Sportsmanship', key: 'sportsmanship_rating' },
              { label: 'Communication', key: 'communication_rating' }
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  {label} Rating (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                      key={rating}
                      variant={(feedbackForm as any)[key] === rating ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFeedbackForm({ ...feedbackForm, [key]: rating })}
                      className="flex-1"
                    >
                      {rating}⭐
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                What Went Well?
              </label>
              <textarea
                value={feedbackForm.what_went_well}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, what_went_well: e.target.value })}
                placeholder="Share positive observations..."
                className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-cyan-600"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Areas to Improve
              </label>
              <textarea
                value={feedbackForm.what_to_improve}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, what_to_improve: e.target.value })}
                placeholder="Constructive feedback..."
                className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-cyan-600"
                rows={2}
              />
            </div>

            <Button
              onClick={handleSubmitFeedback}
              className="w-full gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Submit Feedback
            </Button>
          </div>
        </Card>
      )}

      {/* Highlights Tab */}
      {activeTab === 'highlights' && (
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-cyan-600" />
            Event Highlight Reels
          </h3>

          {highlights.length === 0 ? (
            <div className="text-center py-8">
              <Star className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-slate-500">No highlight reels published yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {highlights.map(reel => (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg hover:border-cyan-600 transition-colors"
                >
                  <h4 className="font-semibold text-slate-900 mb-1">{reel.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">{reel.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>📺 {reel.media_ids.length} clips</span>
                    <span>👥 {reel.featured_users.length} featured</span>
                    <span>👁️ {reel.view_count} views</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
