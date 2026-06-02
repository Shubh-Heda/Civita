// ============================================
// Coaching Service — Supabase
// ============================================
import { supabaseAuth } from './supabaseAuthService';
import { supabase, supabaseEnabled } from '../lib/supabaseClient';

const STORAGE_KEYS = {
  coaches: 'coaching_coaches',
  plans: 'coaching_plans',
  slots: 'coaching_slots',
  bookings: 'coaching_bookings',
  subscriptions: 'coaching_subscriptions',
  availability: 'coaching_availability',
};

export interface Coach {
  id: string;
  user_id: string;
  name: string;
  bio: string;
  specializations: string;
  expertise: string[];
  experience: string;
  rating: number;
  reviews_count: number;
  image_url: string;
  hourly_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CoachingPlan {
  id: string;
  coach_id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  sessions_count: number;
  features: string[];
  is_recommended: boolean;
  is_active: boolean;
}

export interface CoachingSlot {
  id: string;
  coach_id: string;
  turf_id?: string;
  sport: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  max_spots: number;
  spots_left: number;
  is_available: boolean;
  is_recurring: boolean;
}

export interface CoachingBooking {
  id: string;
  user_id: string;
  coach_id: string;
  plan_id?: string;
  slot_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  payment_status: 'pending' | 'paid' | 'refunded';
  amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CoachingSubscription {
  id: string;
  user_id: string;
  coach_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  sessions_total: number;
  sessions_used: number;
  sessions_remaining: number;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  payment_status: string;
  amount_paid: number;
}

// ========== Coach Management ==========

export async function getCoaches(sport?: string): Promise<Coach[]> {
  try {
    if (!supabaseEnabled || !supabase) {
      const data: Coach[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.coaches) || '[]');
      return data
        .filter(c => c.is_active && (!sport || c.expertise?.includes(sport)))
        .sort((a, b) => b.rating - a.rating);
    }

    let query = supabase.from('coaches').select('*').eq('is_active', true);
    if (sport) query = query.contains('expertise', [sport]);
    const { data, error } = await query.order('rating', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return [];
  }
}

export async function getCoachById(coachId: string): Promise<Coach> {
  try {
    if (!supabaseEnabled || !supabase) {
      const data: Coach[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.coaches) || '[]');
      const coach = data.find(c => c.id === coachId);
      if (!coach) throw new Error('Coach not found');
      return coach;
    }

    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id', coachId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching coach:', error);
    throw error;
  }
}

// ========== Coaching Plans ==========

export async function getCoachingPlans(coachId?: string): Promise<CoachingPlan[]> {
  try {
    if (!supabaseEnabled || !supabase) {
      let data: CoachingPlan[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.plans) || '[]');
      data = data.filter(p => p.is_active);
      if (coachId) data = data.filter(p => p.coach_id === coachId);
      return data.sort((a, b) => a.price - b.price);
    }

    let query = supabase.from('coaching_plans').select('*').eq('is_active', true);
    if (coachId) query = query.eq('coach_id', coachId);
    const { data, error } = await query.order('price', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching coaching plans:', error);
    return [];
  }
}

// ========== Coaching Slots & Calendar ==========

export async function getAvailableCoachingSlots(
  coachId: string,
  _date: Date,
  sport?: string
): Promise<CoachingSlot[]> {
  try {
    if (!supabaseEnabled || !supabase) {
      const slots: CoachingSlot[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.slots) || '[]');
      return slots.filter(s => s.coach_id === coachId && s.is_available && (!sport || s.sport === sport));
    }

    let query = supabase
      .from('coaching_slots')
      .select('*')
      .eq('coach_id', coachId)
      .eq('is_available', true);
    if (sport) query = query.eq('sport', sport);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return [];
  }
}

export async function getCoachRecurringSlots(
  coachId: string,
  sport?: string
): Promise<CoachingSlot[]> {
  try {
    if (!supabaseEnabled || !supabase) {
      const slots: CoachingSlot[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.slots) || '[]');
      return slots
        .filter(s => s.coach_id === coachId && s.is_available && s.is_recurring && (!sport || s.sport === sport))
        .sort((a, b) => a.day_of_week - b.day_of_week || a.start_time.localeCompare(b.start_time));
    }

    let query = supabase
      .from('coaching_slots')
      .select('*')
      .eq('coach_id', coachId)
      .eq('is_recurring', true)
      .eq('is_available', true);
    if (sport) query = query.eq('sport', sport);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recurring slots:', error);
    return [];
  }
}

export async function getAvailableTimeSlots(coachId: string, date: Date): Promise<any[]> {
  try {
    const dayOfWeek = date.getDay();
    const slots = await getCoachRecurringSlots(coachId);
    const filteredSlots = slots.filter(s => s.day_of_week === dayOfWeek);

    const bookings: CoachingBooking[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookings) || '[]');
    const dateStr = date.toISOString().split('T')[0];
    const dayBookings = bookings.filter(
      b => b.coach_id === coachId && b.booking_date === dateStr && b.status === 'confirmed'
    );

    const bookingCounts: Record<string, number> = {};
    dayBookings.forEach(b => {
      bookingCounts[b.slot_id] = (bookingCounts[b.slot_id] || 0) + 1;
    });

    return filteredSlots.map(slot => ({
      time: slot.start_time,
      available: slot.max_spots - (bookingCounts[slot.id] || 0) > 0,
      spotsLeft: slot.max_spots - (bookingCounts[slot.id] || 0),
      slotId: slot.id,
      startTime: slot.start_time,
      endTime: slot.end_time,
    }));
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return [];
  }
}

// ========== Booking Management ==========

export async function bookCoachingSlot(
  coachId: string,
  slotId: string,
  bookingDate: Date,
  planId?: string,
  amount?: number
): Promise<CoachingBooking> {
  const user = await supabaseAuth.getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const booking: CoachingBooking = {
    id: `booking-${Date.now()}`,
    user_id: user.id,
    coach_id: coachId,
    plan_id: planId,
    slot_id: slotId,
    booking_date: bookingDate.toISOString().split('T')[0],
    start_time: '',
    end_time: '',
    status: 'confirmed',
    payment_status: 'paid',
    amount,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    if (!supabaseEnabled || !supabase) {
      const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookings) || '[]');
      bookings.push(booking);
      localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
      return booking;
    }

    const { data, error } = await supabase
      .from('coaching_bookings')
      .insert([booking])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error booking slot:', error);
    throw error;
  }
}

export async function getUserCoachingBookings(userId?: string): Promise<CoachingBooking[]> {
  const user = await supabaseAuth.getCurrentUser();
  const targetUserId = userId || user?.id;
  if (!targetUserId) throw new Error('User not authenticated');

  try {
    if (!supabaseEnabled || !supabase) {
      const bookings: CoachingBooking[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookings) || '[]');
      return bookings
        .filter(b => b.user_id === targetUserId)
        .sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime());
    }

    const { data, error } = await supabase
      .from('coaching_bookings')
      .select('*')
      .eq('user_id', targetUserId)
      .order('booking_date', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export async function cancelCoachingBooking(bookingId: string): Promise<CoachingBooking | null> {
  const user = await supabaseAuth.getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    if (!supabaseEnabled || !supabase) {
      const bookings: CoachingBooking[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookings) || '[]');
      const booking = bookings.find(b => b.id === bookingId && b.user_id === user.id);
      if (booking) {
        booking.status = 'cancelled';
        localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
        return booking;
      }
      return null;
    }

    const { data, error } = await supabase
      .from('coaching_bookings')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .eq('user_id', user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
}

// ========== Subscription Management ==========

export async function createCoachingSubscription(
  coachId: string,
  planId: string,
  startDate: Date
): Promise<CoachingSubscription> {
  const user = await supabaseAuth.getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const plans: CoachingPlan[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.plans) || '[]');
  const plan = plans.find(p => p.id === planId);
  if (!plan) throw new Error('Plan not found');

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + plan.duration_months);

  const subscription: CoachingSubscription = {
    id: `sub-${Date.now()}`,
    user_id: user.id,
    coach_id: coachId,
    plan_id: planId,
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    sessions_total: plan.sessions_count,
    sessions_used: 0,
    sessions_remaining: plan.sessions_count,
    status: 'active',
    payment_status: 'paid',
    amount_paid: plan.price,
  };

  try {
    if (!supabaseEnabled || !supabase) {
      const subscriptions = JSON.parse(localStorage.getItem(STORAGE_KEYS.subscriptions) || '[]');
      subscriptions.push(subscription);
      localStorage.setItem(STORAGE_KEYS.subscriptions, JSON.stringify(subscriptions));
      return subscription;
    }

    const { data, error } = await supabase
      .from('coaching_subscriptions')
      .insert([subscription])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function getUserCoachingSubscriptions(): Promise<CoachingSubscription[]> {
  const user = await supabaseAuth.getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    if (!supabaseEnabled || !supabase) {
      const subscriptions: CoachingSubscription[] = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.subscriptions) || '[]'
      );
      return subscriptions
        .filter(s => s.user_id === user.id)
        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
    }

    const { data, error } = await supabase
      .from('coaching_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
}

// ========== Coach Availability ==========

export async function setCoachUnavailability(
  coachId: string,
  date: Date,
  startTime: string,
  endTime: string,
  reason?: string
) {
  const record = {
    id: `avail-${Date.now()}`,
    coach_id: coachId,
    date: date.toISOString().split('T')[0],
    start_time: startTime,
    end_time: endTime,
    is_available: false,
    reason: reason ?? null,
  };

  try {
    if (!supabaseEnabled || !supabase) {
      const availability = JSON.parse(localStorage.getItem(STORAGE_KEYS.availability) || '[]');
      availability.push(record);
      localStorage.setItem(STORAGE_KEYS.availability, JSON.stringify(availability));
      return record;
    }

    const { data, error } = await supabase
      .from('coach_availability')
      .insert([record])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error setting unavailability:', error);
    throw error;
  }
}

export async function getCoachUnavailableDates(
  coachId: string,
  startDate: Date,
  endDate: Date
) {
  try {
    if (!supabaseEnabled || !supabase) {
      const availability = JSON.parse(localStorage.getItem(STORAGE_KEYS.availability) || '[]');
      const startStr = startDate.toISOString().split('T')[0];
      const endStr = endDate.toISOString().split('T')[0];
      return availability.filter(
        (a: any) => a.coach_id === coachId && a.date >= startStr && a.date <= endStr && !a.is_available
      );
    }

    const { data, error } = await supabase
      .from('coach_availability')
      .select('*')
      .eq('coach_id', coachId)
      .eq('is_available', false)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0]);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching unavailable dates:', error);
    return [];
  }
}

// ========== Helper Functions ==========

export function formatTimeSlot(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}

export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
}

export function isDateInPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function getNext7Days(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
}