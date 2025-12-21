import { supabase } from '../lib/supabase';
import type { Profile, Match, ChatMessage } from '../lib/supabase';

// ============================================================================
// PROFILE SERVICES
// ============================================================================

export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as Profile | null;
  },

  async createProfile(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async updateProfile(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async getAllProfiles(limit = 50) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(limit);

    if (error) throw error;
    return data as Profile[];
  }
};

// ============================================================================
// MATCH SERVICES
// ============================================================================

export const matchService = {
  async getMatches(filters?: { category?: string; status?: string; location?: string }) {
    let query = supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Match[];
  },

  async getMatch(matchId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .single();

    if (error) throw error;
    return data as Match;
  },

  async getUserMatches(userId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('organizer_id', userId)
      .order('date', { ascending: true });

    if (error) throw error;
    return data as Match[];
  },

  async createMatch(match: Omit<Match, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('matches')
      .insert(match)
      .select()
      .single();

    if (error) throw error;
    return data as Match;
  },

  async updateMatch(id: string, updates: Partial<Match>) {
    const { data, error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Match;
  },

  async deleteMatch(id: string) {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// ============================================================================
// CHAT SERVICES
// ============================================================================

export const chatRoomService = {
  async getChatRooms(filters?: { type?: string; category?: string }) {
    let query = supabase
      .from('chat_rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getChatRoom(roomId: string) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('id', roomId)
      .single();

    if (error) throw error;
    return data;
  },

  async createChatRoom(room: {
    name: string;
    type: 'sports' | 'events' | 'parties' | 'general';
    category?: string;
    created_by: string;
    is_public?: boolean;
  }) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({
        ...room,
        members: [room.created_by]
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export const chatService = {
  async getMessages(roomId: string, limit = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        user:profiles(id, name, avatar)
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async sendMessage(message: {
    room_id: string;
    user_id: string;
    content: string;
    message_type?: string;
    media_url?: string;
  }) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(message)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  subscribeToMessages(roomId: string, callback: (message: any) => void) {
    return supabase
      .channel(`messages:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();
  }
};

// ============================================================================
// TURF SERVICES
// ============================================================================

export const turfService = {
  async getTurfs(city?: string) {
    let query = supabase
      .from('turfs')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (city) {
      query = query.eq('city', city);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getTurf(turfId: string) {
    const { data, error } = await supabase
      .from('turfs')
      .select(`
        *,
        coaches(*),
        time_slots(*)
      `)
      .eq('id', turfId)
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// PLAYER AVAILABILITY SERVICES
// ============================================================================

export const availabilityService = {
  async getAvailablePlayers() {
    const { data, error } = await supabase
      .from('player_availability')
      .select(`
        *,
        profile:profiles(id, name, avatar)
      `)
      .eq('status', 'available')
      .gte('available_until', new Date().toISOString());

    if (error) throw error;
    return data;
  },

  async setAvailability(userId: string, availableFrom: string, availableUntil: string) {
    const { data, error } = await supabase
      .from('player_availability')
      .upsert(
        {
          user_id: userId,
          available_from: availableFrom,
          available_until: availableUntil,
          status: 'available'
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// EVENT SERVICES
// ============================================================================

export const eventService = {
  async getEvents(category?: string) {
    let query = supabase
      .from('events')
      .select('*')
      .eq('status', 'scheduled')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getEvent(eventId: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) throw error;
    return data;
  },

  async createEvent(event: {
    title: string;
    description?: string;
    category: string;
    date: string;
    location: string;
    latitude: number;
    longitude: number;
    organizer_id: string;
    max_participants?: number;
  }) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// PARTY SERVICES
// ============================================================================

export const partyService = {
  async getParties() {
    const { data, error } = await supabase
      .from('parties')
      .select('*')
      .eq('status', 'planned')
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getParty(partyId: string) {
    const { data, error } = await supabase
      .from('parties')
      .select('*')
      .eq('id', partyId)
      .single();

    if (error) throw error;
    return data;
  },

  async createParty(party: {
    title: string;
    description?: string;
    theme?: string;
    date: string;
    venue: string;
    latitude: number;
    longitude: number;
    host_id: string;
    max_guests?: number;
  }) {
    const { data, error } = await supabase
      .from('parties')
      .insert(party)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// NOTIFICATION SERVICES
// ============================================================================

export const notificationService = {
  async getNotifications(userId: string, unreadOnly = false) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (unreadOnly) {
      query = query.eq('read', false);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async createNotification(notification: {
    user_id: string;
    type: string;
    title: string;
    message: string;
    related_entity_id?: string;
    related_entity_type?: string;
  }) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// WALLET SERVICES
// ============================================================================

export const walletService = {
  async getWallet(userId: string) {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      const { data: newWallet } = await supabase
        .from('wallets')
        .insert({ user_id: userId })
        .select()
        .single();
      return newWallet;
    }

    if (error) throw error;
    return data;
  },

  async addCredit(userId: string, amount: number, description: string) {
    const wallet = await walletService.getWallet(userId);

    const { data, error } = await supabase
      .from('wallet_transactions')
      .insert({
        wallet_id: wallet.id,
        amount,
        type: 'credit',
        description,
        status: 'completed'
      })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('wallets')
      .update({ balance: wallet.balance + amount })
      .eq('id', wallet.id);

    return data;
  },

  async getTransactions(userId: string, limit = 50) {
    const wallet = await walletService.getWallet(userId);

    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('wallet_id', wallet.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// ACHIEVEMENT SERVICES
// ============================================================================

export const achievementService = {
  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq('user_id', userId)
      .eq('unlocked', true);

    if (error) throw error;
    return data;
  },

  async getUserLevel(userId: string) {
    const { data, error } = await supabase
      .from('user_levels')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      const { data: newLevel } = await supabase
        .from('user_levels')
        .insert({ user_id: userId })
        .select()
        .single();
      return newLevel;
    }

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// GAMING SERVICES
// ============================================================================

export const gamingService = {
  async getGamingSessions() {
    const { data, error } = await supabase
      .from('gaming_sessions')
      .select('*')
      .eq('status', 'open')
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createGamingSession(session: {
    title: string;
    game: string;
    platform: string;
    date: string;
    max_participants?: number;
    created_by: string;
  }) {
    const { data, error } = await supabase
      .from('gaming_sessions')
      .insert(session)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getGamingClubs() {
    const { data, error } = await supabase
      .from('gaming_clubs')
      .select('*')
      .order('member_count', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTournaments() {
    const { data, error } = await supabase
      .from('gaming_tournaments')
      .select('*')
      .eq('status', 'registration')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// ACTIVITY SERVICES
// ============================================================================

export const activityService = {
  async getActivities(userId?: string, limit = 50) {
    let query = supabase
      .from('activities')
      .select(`
        *,
        user:profiles!user_id(name, avatar)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async createActivity(activity: {
    user_id: string;
    type: string;
    description?: string;
    metadata?: Record<string, any>;
  }) {
    const { data, error } = await supabase
      .from('activities')
      .insert(activity)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// GRATITUDE SERVICES
// ============================================================================

export const gratitudeService = {
  async getPublicGratitude(limit = 20) {
    const { data, error } = await supabase
      .from('gratitude_posts')
      .select(`
        *,
        author:profiles!author_id(id, name, avatar)
      `)
      .eq('visibility', 'public')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async createGratitude(post: {
    author_id: string;
    recipient_id?: string;
    message: string;
    category?: string;
    visibility?: string;
  }) {
    const { data, error } = await supabase
      .from('gratitude_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// COMMUNITY SERVICES
// ============================================================================

export const communityService = {
  async getPosts(category?: string, limit = 20) {
    let query = supabase
      .from('community_posts')
      .select(`
        *,
        author:profiles!author_id(id, name, avatar)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// FRIENDSHIP SERVICES
// ============================================================================

export const friendshipService = {
  async getFriends(userId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        *,
        friend:profiles!friend_id(id, name, avatar)
      `)
      .eq('user_id', userId)
      .eq('status', 'confirmed');

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

export const initializeDefaultData = async (userId: string) => {
  try {
    const existingProfile = await profileService.getProfile(userId);

    if (!existingProfile) {
      await profileService.createProfile({
        id: userId,
        name: 'New Player',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        bio: 'Passionate about sports and making new friends!',
        location: 'Ahmedabad, Gujarat',
        sports_interests: ['Football', 'Cricket'],
        languages: ['English', 'Hindi', 'Gujarati']
      });

      await achievementService.getUserLevel(userId);
      await walletService.getWallet(userId);

      console.log('✅ User profile initialized successfully');
    }
  } catch (error) {
    console.error('❌ Error initializing user data:', error);
  }
};
