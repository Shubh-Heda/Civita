// ============================================
// User Profile Service - Supabase Integration
// ============================================
import { supabase, supabaseEnabled } from '../lib/supabaseClient';

export const userProfileService = {
  // Create or update user profile in Supabase
  async upsertProfile(userId: string, userData: {
    email: string;
    full_name?: string;
    name?: string;
    avatar_url?: string;
    avatar?: string;
    age?: string;
    phone?: string;
    profession?: string;
    onboarding_completed?: boolean;
  }) {
    if (!supabaseEnabled || !supabase) {
      console.warn('Supabase not configured');
      return { data: null, error: 'Supabase not configured' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          user_id: userId,
          email: userData.email,
          name: userData.name || userData.full_name || userData.email.split('@')[0],
          avatar: userData.avatar || userData.avatar_url || `https://i.pravatar.cc/150?u=${userId}`,
          age: userData.age,
          phone: userData.phone,
          profession: userData.profession,
          onboarding_completed: userData.onboarding_completed ?? false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        })
        .select()
        .single();

      if (error) throw error;

      console.log('✅ User profile saved to Supabase:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('❌ Error saving user profile:', error);
      return { data: null, error: error.message };
    }
  },

  // Get user profile from Supabase
  async getProfile(userId: string) {
    if (!supabaseEnabled || !supabase) {
      return { data: null, error: 'Supabase not configured' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // Update user profile
  async updateProfile(userId: string, updates: any) {
    if (!supabaseEnabled || !supabase) {
      return { data: null, error: 'Supabase not configured' };
    }

    try {
      const normalized = { ...updates };
      if (normalized.full_name && !normalized.name) {
        normalized.name = normalized.full_name;
      }
      if (normalized.avatar_url && !normalized.avatar) {
        normalized.avatar = normalized.avatar_url;
      }
      delete normalized.full_name;
      delete normalized.avatar_url;

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...normalized,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};
