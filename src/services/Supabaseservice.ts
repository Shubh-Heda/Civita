// src/services/supabaseService.ts
// ─────────────────────────────────────────────────────────────
// Drop-in replacement for apiService.ts — all real Supabase calls
// ─────────────────────────────────────────────────────────────

import { supabase } from '../lib/supabaseClient';

export { supabase };

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  city: string;
  division: 'sports' | 'events' | 'gaming';
  trust_score: number;
  is_verified: boolean;
  created_at: string;
}

export interface Match {
  id: string;
  host_id: string;
  title: string;
  sport: string;
  venue_name: string;
  city: string;
  address?: string;
  scheduled_at: string;
  duration_mins: number;
  max_players: number;
  min_trust_score: number;
  fee_per_player: number;
  status: 'open' | 'full' | 'ongoing' | 'completed' | 'cancelled';
  description?: string;
  created_at: string;
  // joined via query
  host?: Profile;
  player_count?: number;
}

export interface GameEvent {
  id: string;
  host_id: string;
  title: string;
  category: string;
  description?: string;
  venue_name: string;
  city: string;
  starts_at: string;
  ends_at?: string;
  max_attendees?: number;
  ticket_price: number;
  is_free: boolean;
  cover_image_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  host?: Profile;
  attendee_count?: number;
}

export interface Lobby {
  id: string;
  host_id: string;
  title: string;
  game: string;
  platform: string;
  lobby_type: 'casual' | 'ranked' | 'tournament';
  min_rank?: string;
  max_players: number;
  has_voice_chat: boolean;
  status: 'open' | 'full' | 'in_game' | 'completed' | 'cancelled';
  scheduled_at?: string;
  description?: string;
  created_at: string;
  host?: Profile;
  player_count?: number;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'system';
  created_at: string;
  sender?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body?: string;
  reference_id?: string;
  is_read: boolean;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────

export const authService = {
  // Sign up with email + password
  async signUp(email: string, password: string, username: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, full_name: fullName },
      },
    });
    if (error) throw error;
    return data;
  },

  // Sign in with email + password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  // Sign in with Google OAuth
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  // Get current user
  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// ─────────────────────────────────────────────────────────────
// PROFILES
// ─────────────────────────────────────────────────────────────

export const profileService = {
  async getProfile(userId: string): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async getProfileByUsername(username: string): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async searchProfiles(query: string, city?: string) {
    let q = supabase
      .from('profiles')
      .select('*')
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`);
    if (city) q = q.eq('city', city);
    const { data, error } = await q.limit(20);
    if (error) throw error;
    return data;
  },
};

// ─────────────────────────────────────────────────────────────
// MATCHES (Sports)
// ─────────────────────────────────────────────────────────────

export const matchService = {
  // List open matches with optional filters
  async getMatches(filters?: {
    city?: string;
    sport?: string;
    status?: string;
    limit?: number;
  }): Promise<Match[]> {
    let query = supabase
      .from('matches')
      .select(`
        *,
        host:profiles!host_id(id, username, full_name, avatar_url, trust_score),
        player_count:match_players(count)
      `)
      .order('scheduled_at', { ascending: true });

    if (filters?.city) query = query.eq('city', filters.city);
    if (filters?.sport) query = query.eq('sport', filters.sport);
    if (filters?.status) query = query.eq('status', filters.status);
    else query = query.in('status', ['open', 'full']);
    query = query.limit(filters?.limit ?? 20);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  // Get single match with full details
  async getMatch(matchId: string): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        host:profiles!host_id(id, username, full_name, avatar_url, trust_score, city),
        match_players(
          id, status, joined_at,
          player:profiles!player_id(id, username, full_name, avatar_url, trust_score)
        )
      `)
      .eq('id', matchId)
      .single();
    if (error) throw error;
    return data;
  },

  // Create a match
  async createMatch(matchData: Omit<Match, 'id' | 'created_at' | 'status' | 'host'>) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('matches')
      .insert({ ...matchData, host_id: user.id, status: 'open' })
      .select()
      .single();
    if (error) throw error;

    // Auto-join host to match
    await supabase.from('match_players').insert({
      match_id: data.id,
      player_id: user.id,
      status: 'confirmed',
    });

    // Award trust points for hosting
    await trustScoreService.addEvent(user.id, 'match_hosted', 3, 'Created a match', data.id);

    // Create chat room for this match
    await chatService.createRoom(data.id, 'match', matchData.title);

    return data;
  },

  // Join a match
  async joinMatch(matchId: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('match_players')
      .insert({ match_id: matchId, player_id: user.id, status: 'confirmed' })
      .select()
      .single();
    if (error) throw error;

    // Join the match chat room
    const room = await chatService.getRoomByReference(matchId);
    if (room) await chatService.joinRoom(room.id);

    return data;
  },

  // Leave a match
  async leaveMatch(matchId: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('match_players')
      .delete()
      .eq('match_id', matchId)
      .eq('player_id', user.id);
    if (error) throw error;
  },

  // My matches (joined or hosted)
  async getMyMatches() {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('match_players')
      .select(`
        match:matches(
          *,
          host:profiles!host_id(id, username, full_name, avatar_url, trust_score)
        )
      `)
      .eq('player_id', user.id)
      .order('joined_at', { ascending: false });
    if (error) throw error;
    return data?.map((d: any) => d.match) ?? [];
  },
};

// ─────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────

export const eventService = {
  async getEvents(filters?: {
    city?: string;
    category?: string;
    is_free?: boolean;
    limit?: number;
  }): Promise<GameEvent[]> {
    let query = supabase
      .from('events')
      .select(`
        *,
        host:profiles!host_id(id, username, full_name, avatar_url, trust_score),
        attendee_count:event_attendees(count)
      `)
      .eq('status', 'upcoming')
      .order('starts_at', { ascending: true });

    if (filters?.city) query = query.eq('city', filters.city);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.is_free !== undefined) query = query.eq('is_free', filters.is_free);
    query = query.limit(filters?.limit ?? 20);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getEvent(eventId: string): Promise<GameEvent> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        host:profiles!host_id(id, username, full_name, avatar_url, trust_score, city),
        event_attendees(
          id, status, rsvped_at,
          user:profiles!user_id(id, username, full_name, avatar_url, trust_score)
        )
      `)
      .eq('id', eventId)
      .single();
    if (error) throw error;
    return data;
  },

  async createEvent(eventData: Omit<GameEvent, 'id' | 'created_at' | 'status' | 'host'>) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('events')
      .insert({ ...eventData, host_id: user.id, status: 'upcoming' })
      .select()
      .single();
    if (error) throw error;

    await trustScoreService.addEvent(user.id, 'event_hosted', 5, 'Hosted an event', data.id);
    await chatService.createRoom(data.id, 'event', eventData.title);

    return data;
  },

  async rsvpEvent(eventId: string, status: 'going' | 'interested' = 'going') {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('event_attendees')
      .upsert({ event_id: eventId, user_id: user.id, status }, { onConflict: 'event_id,user_id' })
      .select()
      .single();
    if (error) throw error;

    const room = await chatService.getRoomByReference(eventId);
    if (room) await chatService.joinRoom(room.id);

    return data;
  },

  async cancelRsvp(eventId: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', user.id);
    if (error) throw error;
  },
};

// ─────────────────────────────────────────────────────────────
// GAMING LOBBIES
// ─────────────────────────────────────────────────────────────

export const lobbyService = {
  async getLobbies(filters?: {
    game?: string;
    platform?: string;
    lobby_type?: string;
    limit?: number;
  }): Promise<Lobby[]> {
    let query = supabase
      .from('lobbies')
      .select(`
        *,
        host:profiles!host_id(id, username, full_name, avatar_url, trust_score),
        player_count:lobby_players(count)
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (filters?.game) query = query.eq('game', filters.game);
    if (filters?.platform) query = query.eq('platform', filters.platform);
    if (filters?.lobby_type) query = query.eq('lobby_type', filters.lobby_type);
    query = query.limit(filters?.limit ?? 20);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getLobby(lobbyId: string): Promise<Lobby> {
    const { data, error } = await supabase
      .from('lobbies')
      .select(`
        *,
        host:profiles!host_id(id, username, full_name, avatar_url, trust_score),
        lobby_players(
          id, status, joined_at,
          player:profiles!player_id(id, username, full_name, avatar_url, trust_score)
        )
      `)
      .eq('id', lobbyId)
      .single();
    if (error) throw error;
    return data;
  },

  async createLobby(lobbyData: Omit<Lobby, 'id' | 'created_at' | 'status' | 'host'>) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('lobbies')
      .insert({ ...lobbyData, host_id: user.id, status: 'open' })
      .select()
      .single();
    if (error) throw error;

    await supabase.from('lobby_players').insert({
      lobby_id: data.id, player_id: user.id, status: 'confirmed',
    });
    await chatService.createRoom(data.id, 'lobby', lobbyData.title);

    return data;
  },

  async joinLobby(lobbyId: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('lobby_players')
      .insert({ lobby_id: lobbyId, player_id: user.id, status: 'confirmed' })
      .select()
      .single();
    if (error) throw error;

    const room = await chatService.getRoomByReference(lobbyId);
    if (room) await chatService.joinRoom(room.id);

    return data;
  },

  async leaveLobby(lobbyId: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('lobby_players')
      .delete()
      .eq('lobby_id', lobbyId)
      .eq('player_id', user.id);
    if (error) throw error;
  },
};

// ─────────────────────────────────────────────────────────────
// TRUST SCORE
// ─────────────────────────────────────────────────────────────

export const trustScoreService = {
  async addEvent(
    userId: string,
    action: string,
    delta: number,
    reason: string,
    referenceId?: string,
  ) {
    const { error } = await supabase.from('trust_score_events').insert({
      user_id: userId,
      action,
      delta,
      reason,
      reference_id: referenceId,
    });
    if (error) throw error;
  },

  async getHistory(userId: string) {
    const { data, error } = await supabase
      .from('trust_score_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  },
};

// ─────────────────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────────────────

export const reviewService = {
  async submitReview(
    revieweeId: string,
    referenceId: string,
    referenceType: 'match' | 'event' | 'lobby',
    rating: number,
    comment?: string,
  ) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        reviewer_id: user.id,
        reviewee_id: revieweeId,
        reference_id: referenceId,
        reference_type: referenceType,
        rating,
        comment,
      })
      .select()
      .single();
    if (error) throw error;

    // Award trust points based on rating
    const delta = rating >= 4 ? 3 : rating === 3 ? 0 : -2;
    if (delta !== 0) {
      await trustScoreService.addEvent(
        revieweeId,
        'review_received',
        delta,
        `Received a ${rating}-star review`,
        referenceId,
      );
    }

    return data;
  },

  async getReviewsForUser(userId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`*, reviewer:profiles!reviewer_id(id, username, full_name, avatar_url)`)
      .eq('reviewee_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
};

// ─────────────────────────────────────────────────────────────
// CHAT
// ─────────────────────────────────────────────────────────────

export const chatService = {
  async createRoom(referenceId: string, roomType: 'match' | 'event' | 'lobby' | 'direct', name?: string) {
    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({ reference_id: referenceId, room_type: roomType, name })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getRoomByReference(referenceId: string) {
    const { data } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('reference_id', referenceId)
      .single();
    return data;
  },

  async joinRoom(roomId: string) {
    const user = await authService.getCurrentUser();
    if (!user) return;
    await supabase.from('chat_members').upsert(
      { room_id: roomId, user_id: user.id },
      { onConflict: 'room_id,user_id' },
    );
  },

  async getMessages(roomId: string, limit = 50): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`*, sender:profiles!sender_id(id, username, full_name, avatar_url)`)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  },

  async sendMessage(roomId: string, content: string, messageType: 'text' | 'image' = 'text') {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ room_id: roomId, sender_id: user.id, content, message_type: messageType })
      .select(`*, sender:profiles!sender_id(id, username, full_name, avatar_url)`)
      .single();
    if (error) throw error;
    return data;
  },

  // Realtime subscription for live chat
  subscribeToMessages(roomId: string, onMessage: (message: ChatMessage) => void) {
    return supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `room_id=eq.${roomId}` },
        async (payload) => {
          // Fetch full message with sender profile
          const { data } = await supabase
            .from('chat_messages')
            .select(`*, sender:profiles!sender_id(id, username, full_name, avatar_url)`)
            .eq('id', payload.new.id)
            .single();
          if (data) onMessage(data);
        },
      )
      .subscribe();
  },
};

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const user = await authService.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30);
    if (error) throw error;
    return data ?? [];
  },

  async markRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    if (error) throw error;
  },

  async markAllRead() {
    const user = await authService.getCurrentUser();
    if (!user) return;
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
  },

  // Realtime notifications
  subscribeToNotifications(userId: string, onNotification: (n: Notification) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        (payload) => onNotification(payload.new as Notification),
      )
      .subscribe();
  },
};

// ─────────────────────────────────────────────────────────────
// FRIENDSHIPS
// ─────────────────────────────────────────────────────────────

export const friendshipService = {
  async sendRequest(friendId: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { data, error } = await supabase
      .from('friendships')
      .insert({ user_id: user.id, friend_id: friendId, status: 'pending' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async acceptRequest(friendshipId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getFriends() {
    const user = await authService.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('friendships')
      .select(`
        *,
        user:profiles!user_id(id, username, full_name, avatar_url, trust_score, city),
        friend:profiles!friend_id(id, username, full_name, avatar_url, trust_score, city)
      `)
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'accepted');
    if (error) throw error;
    return data ?? [];
  },

  async getStreaks() {
    const user = await authService.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('friendship_streaks')
      .select(`
        *,
        user_a_profile:profiles!user_a(id, username, full_name, avatar_url),
        user_b_profile:profiles!user_b(id, username, full_name, avatar_url)
      `)
      .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
      .order('streak_count', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
};

// ─────────────────────────────────────────────────────────────
// EXPLORE — unified feed across all 3 divisions
// ─────────────────────────────────────────────────────────────

export const exploreService = {
  async getAll(city?: string) {
    const [matches, events, lobbies] = await Promise.all([
      matchService.getMatches({ city, limit: 6 }),
      eventService.getEvents({ city, limit: 6 }),
      lobbyService.getLobbies({ limit: 6 }),
    ]);
    return { matches, events, lobbies };
  },
};
