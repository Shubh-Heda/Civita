// ============================================
// Event Flow Service
// ============================================
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export interface EventAvailability {
  event_id: string;
  user_id: string;
  available_slots: Array<{
    start_time: string;
    end_time: string;
    preference_score: number; // 1-5
  }>;
}

export interface EventRole {
  id: string;
  event_id: string;
  user_id: string;
  role: 'organizer' | 'host' | 'scorer' | 'participant';
  assigned_tasks: EventTask[];
  tasks_completed: number;
  created_at: string;
}

export interface EventTask {
  id: string;
  event_id: string;
  assigned_to: string;
  title: string;
  description?: string;
  task_type: 'setup' | 'scoring' | 'cleanup' | 'media' | 'logistics';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  due_date?: string;
  completed_at?: string;
  created_at: string;
}

export interface EventFeedbackForm {
  event_id: string;
  from_user_id: string;
  to_user_id: string;
  skill_rating: number;
  teamwork_rating: number;
  sportsmanship_rating: number;
  communication_rating: number;
  what_went_well?: string;
  what_to_improve?: string;
  overall_comment?: string;
  performance_score: number;
  improvement_areas: string[];
}

export interface EventHighlightReel {
  id: string;
  event_id: string;
  created_by: string;
  title: string;
  description?: string;
  media_ids: string[];
  featured_users: string[]; // MVP/standout players
  duration_seconds?: number;
  published: boolean;
  view_count: number;
  created_at: string;
}

class EventFlowService {
  // ==================== AVAILABILITY & SCHEDULING ====================

  /**
   * Submit availability for event
   */
  async submitAvailability(eventId: string, userId: string, slots: EventAvailability['available_slots']): Promise<void> {
    const { error } = await supabase
      .from('event_availability')
      .upsert({
        event_id: eventId,
        user_id: userId,
        available_slots: slots,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Get availability graph (heatmap of best times)
   */
  async getAvailabilityGraph(eventId: string): Promise<Map<string, number>> {
    const { data } = await supabase
      .from('event_availability')
      .select('available_slots')
      .eq('event_id', eventId);

    if (!data) return new Map();

    const timeSlotVotes = new Map<string, number>();

    (data || []).forEach((record: any) => {
      record.available_slots?.forEach((slot: any) => {
        const key = `${slot.start_time}-${slot.end_time}`;
        const current = timeSlotVotes.get(key) || 0;
        timeSlotVotes.set(key, current + (slot.preference_score || 1));
      });
    });

    // Sort by vote count
    const sorted = Array.from(timeSlotVotes.entries())
      .sort((a, b) => b[1] - a[1]);

    return new Map(sorted);
  }

  /**
   * Auto-suggest time slots based on availability
   */
  async suggestOptimalTimeSlots(eventId: string, top = 3): Promise<Array<{ time: string; confidence: number }>> {
    const graph = await this.getAvailabilityGraph(eventId);
    const suggestions: Array<{ time: string; confidence: number }> = [];

    let index = 0;
    graph.forEach((votes, time) => {
      if (index < top) {
        suggestions.push({
          time,
          confidence: Math.min(100, (votes / 10) * 100) // Normalize to 0-100
        });
        index++;
      }
    });

    return suggestions;
  }

  // ==================== EVENT ROLES & TASKS ====================

  /**
   * Assign role to participant
   */
  async assignRole(eventId: string, userId: string, role: EventRole['role']): Promise<void> {
    const { error } = await supabase
      .from('event_roles')
      .upsert({
        event_id: eventId,
        user_id: userId,
        role
      })
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Create task for user
   */
  async createTask(task: Omit<EventTask, 'id' | 'created_at'>): Promise<EventTask> {
    const { data, error } = await supabase
      .from('event_tasks')
      .insert(task)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get event role details with task checklist
   */
  async getRoleWithTasks(eventId: string, userId: string): Promise<{
    role: EventRole;
    tasks: EventTask[];
    completion_percentage: number;
  }> {
    const { data: roleData } = await supabase
      .from('event_roles')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    const { data: taskData } = await supabase
      .from('event_tasks')
      .select('*')
      .eq('event_id', eventId)
      .eq('assigned_to', userId)
      .order('due_date', { ascending: true });

    if (!roleData) throw new Error('Role not found');

    const tasks = taskData || [];
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const completionPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    return {
      role: roleData,
      tasks,
      completion_percentage: completionPercentage
    };
  }

  /**
   * Update task status
   */
  async updateTaskStatus(taskId: string, status: EventTask['status']): Promise<void> {
    const updates: any = { status };
    if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('event_tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) throw error;
  }

  // ==================== WAITLIST & AUTO-FILL ====================

  /**
   * Add user to waitlist
   */
  async addToWaitlist(eventId: string, userId: string): Promise<void> {
    // Get current position
    const { count } = await supabase
      .from('event_waitlist')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId);

    const { data: score } = await supabase
      .from('user_trust_scores')
      .select('overall_score')
      .eq('user_id', userId)
      .single();

    const { error } = await supabase
      .from('event_waitlist')
      .insert({
        event_id: eventId,
        user_id: userId,
        position: (count || 0) + 1,
        trust_score_at_signup: score?.overall_score || 75
      });

    if (error) throw error;
  }

  /**
   * Auto-fill waitlist when spot opens (high-trust priority)
   */
  async autoFillWaitlist(eventId: string): Promise<string | null> {
    // Get next person in waitlist (sorted by trust score desc)
    const { data } = await supabase
      .from('event_waitlist')
      .select('*')
      .eq('event_id', eventId)
      .eq('status', 'waiting')
      .order('trust_score_at_signup', { ascending: false })
      .limit(1)
      .single();

    if (!data) return null;

    // Update status
    await supabase
      .from('event_waitlist')
      .update({ status: 'auto_filled' })
      .eq('id', data.id);

    return data.user_id;
  }

  /**
   * Get waitlist position
   */
  async getWaitlistPosition(eventId: string, userId: string): Promise<number | null> {
    const { data } = await supabase
      .from('event_waitlist')
      .select('position')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .eq('status', 'waiting')
      .single();

    return data?.position || null;
  }

  // ==================== POST-EVENT FEEDBACK ====================

  /**
   * Submit structured feedback form
   */
  async submitFeedbackForm(feedback: Omit<EventFeedbackForm, 'performance_score' | 'improvement_areas'>): Promise<void> {
    // Calculate performance score
    const avg = (feedback.skill_rating + feedback.teamwork_rating + feedback.sportsmanship_rating + feedback.communication_rating) / 4;
    const performanceScore = avg;

    // Identify improvement areas
    const improvements: string[] = [];
    if (feedback.skill_rating <= 2) improvements.push('skill');
    if (feedback.teamwork_rating <= 2) improvements.push('teamwork');
    if (feedback.sportsmanship_rating <= 2) improvements.push('sportsmanship');
    if (feedback.communication_rating <= 2) improvements.push('communication');

    const { error } = await supabase
      .from('event_feedback_forms')
      .insert({
        ...feedback,
        performance_score: performanceScore,
        improvement_areas: improvements,
        submitted_at: new Date().toISOString()
      });

    if (error) throw error;

    // Update trust score based on feedback
    const feedbackScore = performanceScore >= 4 ? 3 : performanceScore >= 3 ? 1 : -2;
    // This would call trustScoreService.updateScore() with appropriate dimension
  }

  /**
   * Get feedback summary for user from an event
   */
  async getUserEventFeedback(eventId: string, userId: string): Promise<{
    average_ratings: {
      skill: number;
      teamwork: number;
      sportsmanship: number;
      communication: number;
    };
    feedback_count: number;
    improvement_areas: string[];
    recent_comments: string[];
  }> {
    const { data } = await supabase
      .from('event_feedback_forms')
      .select('*')
      .eq('event_id', eventId)
      .eq('to_user_id', userId);

    if (!data || data.length === 0) {
      return {
        average_ratings: { skill: 0, teamwork: 0, sportsmanship: 0, communication: 0 },
        feedback_count: 0,
        improvement_areas: [],
        recent_comments: []
      };
    }

    const count = data.length;
    const skillAvg = data.reduce((sum, f) => sum + (f.skill_rating || 0), 0) / count;
    const teamworkAvg = data.reduce((sum, f) => sum + (f.teamwork_rating || 0), 0) / count;
    const sportsmanshipAvg = data.reduce((sum, f) => sum + (f.sportsmanship_rating || 0), 0) / count;
    const communicationAvg = data.reduce((sum, f) => sum + (f.communication_rating || 0), 0) / count;

    const allImprovements = new Set<string>();
    data.forEach(f => {
      (f.improvement_areas || []).forEach(area => allImprovements.add(area));
    });

    const comments = data
      .filter(f => f.overall_comment)
      .map(f => f.overall_comment)
      .slice(0, 5);

    return {
      average_ratings: {
        skill: Math.round(skillAvg * 10) / 10,
        teamwork: Math.round(teamworkAvg * 10) / 10,
        sportsmanship: Math.round(sportsmanshipAvg * 10) / 10,
        communication: Math.round(communicationAvg * 10) / 10
      },
      feedback_count: count,
      improvement_areas: Array.from(allImprovements),
      recent_comments: comments
    };
  }

  // ==================== HIGHLIGHT REELS ====================

  /**
   * Create highlight reel from event memories
   */
  async createHighlightReel(reel: Omit<EventHighlightReel, 'id' | 'view_count' | 'created_at'>): Promise<EventHighlightReel> {
    const { data, error } = await supabase
      .from('event_highlight_reels')
      .insert(reel)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Publish highlight reel
   */
  async publishHighlightReel(reelId: string): Promise<void> {
    const { error } = await supabase
      .from('event_highlight_reels')
      .update({ published: true })
      .eq('id', reelId);

    if (error) throw error;
  }

  /**
   * Get published highlight reels for event
   */
  async getHighlightReels(eventId: string): Promise<EventHighlightReel[]> {
    const { data, error } = await supabase
      .from('event_highlight_reels')
      .select('*')
      .eq('event_id', eventId)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Track reel views
   */
  async trackReelView(reelId: string): Promise<void> {
    const { data } = await supabase
      .from('event_highlight_reels')
      .select('view_count')
      .eq('id', reelId)
      .single();

    if (data) {
      await supabase
        .from('event_highlight_reels')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', reelId);
    }
  }

  // ==================== REPUTATION GATES & ESCROW ====================

  /**
   * Hold escrow deposit for event
   */
  async holdEscrow(eventId: string, userId: string, amount: number): Promise<void> {
    const { error } = await supabase
      .from('event_escrow')
      .insert({
        event_id: eventId,
        user_id: userId,
        deposit_amount: amount,
        status: 'held'
      });

    if (error) throw error;
  }

  /**
   * Release escrow after successful event
   */
  async releaseEscrow(eventId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('event_escrow')
      .update({
        status: 'released',
        released_at: new Date().toISOString(),
        reason: 'Event completed successfully'
      })
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Forfeit escrow due to no-show/cancellation
   */
  async forfeitEscrow(eventId: string, userId: string, reason: string): Promise<void> {
    const { error } = await supabase
      .from('event_escrow')
      .update({
        status: 'forfeited',
        reason
      })
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (error) throw error;
  }
}

export const eventFlowService = new EventFlowService();
export default eventFlowService;
