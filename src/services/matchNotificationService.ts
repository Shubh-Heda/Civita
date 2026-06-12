/**
 * Match Notification Service — Supabase Edition
 * Replaces all localStorage logic with real Supabase DB queries
 */
import { supabase, supabaseEnabled } from '../lib/supabaseClient';

// ── Types ────────────────────────────────────────────────────────────────────

export interface MatchNotification {
  matchId: string;
  title: string;
  organizer: string;
  organizer_id?: string;
  sport: string;
  turfName: string;
  location: string;
  date: string;
  time: string;
  minPlayers: number;
  currentPlayers: number;
  maxPlayers?: number;
  visibility: 'community' | 'nearby' | 'private';
  status?: string;
  latitude?: number;
  longitude?: number;
  groupChatId?: string;
  createdAt?: string;
}

export interface CreateMatchInput {
  title: string;
  sport: string;
  turf_name: string;
  location: string;
  latitude: number;
  longitude: number;
  date: string;         // 'YYYY-MM-DD'
  time: string;         // 'HH:MM'
  min_players: number;
  max_players?: number;
  visibility: 'community' | 'nearby' | 'private';
  organizer_id: string;
  organizer_name: string;
}

// ── Helper: map DB row → MatchNotification ───────────────────────────────────

function mapRowToMatch(row: any): MatchNotification {
  return {
    matchId: row.id,
    title: row.title,
    organizer: row.organizer_name || 'Anonymous',
    organizer_id: row.organizer_id,
    sport: row.sport,
    turfName: row.turf_name,
    location: row.location,
    date: row.date?.split('T')[0] ?? row.date,      // strip time if timestamp
    time: row.time?.slice(0, 5) ?? row.time,         // 'HH:MM' only
    minPlayers: row.min_players ?? 2,
    currentPlayers: row.current_players ?? 1,
    maxPlayers: row.max_players,
    visibility: row.visibility ?? 'community',
    status: row.status,
    latitude: row.latitude,
    longitude: row.longitude,
    groupChatId: row.group_chat_id,
    createdAt: row.created_at,
  };
}

// ── Service class ────────────────────────────────────────────────────────────

class MatchNotificationService {

  // ── 1. Save a new match to Supabase ───────────────────────────────────────

  async saveMatchToDiscoverable(input: CreateMatchInput): Promise<MatchNotification | null> {
    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([{
          title: input.title,
          sport: input.sport,
          turf_name: input.turf_name,
          location: input.location,
          latitude: input.latitude,
          longitude: input.longitude,
          date: input.date,
          time: input.time,
          min_players: input.min_players,
          max_players: input.max_players ?? input.min_players + 4,
          current_players: 1,           // organizer counts as first player
          visibility: input.visibility,
          organizer_id: input.organizer_id,
          organizer_name: input.organizer_name,
          status: 'open',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      // Also add organizer as first participant
      await supabase.from('match_participants').insert([{
        match_id: data.id,
        user_id: input.organizer_id,
        status: 'confirmed',
        role: 'organizer',
        joined_at: new Date().toISOString(),
      }]);

      console.log(`✅ Match saved to Supabase: "${input.title}"`);
      return mapRowToMatch(data);
    } catch (error) {
      console.error('❌ Error saving match to Supabase:', error);
      return null;
    }
  }

  // ── 2. Fetch all discoverable matches (community feed) ────────────────────

  async getDiscoverableMatches(filters?: {
    sport?: string;
    location?: string;
    date?: string;
  }): Promise<MatchNotification[]> {
    try {
      let query = supabase
        .from('matches')
        .select('*')
        .in('status', ['open', 'upcoming'])
        .in('visibility', ['community', 'nearby', 'public', 'Public'])
        .gte('date', new Date().toISOString().split('T')[0])  // only future matches
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (filters?.sport) {
        query = query.eq('sport', filters.sport);
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.date) {
        query = query.eq('date', filters.date);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data ?? []).map(mapRowToMatch);
    } catch (error) {
      console.error('❌ Error fetching matches from Supabase:', error);
      return [];
    }
  }

  // ── 3. Fetch nearby matches using lat/lng distance ─────────────────────────
  // Uses Supabase's PostGIS via RPC — set up the function in SQL (see below)

  async getNearbyMatches(
    userLat: number,
    userLng: number,
    radiusKm: number = 10
  ): Promise<MatchNotification[]> {
    try {
      // Uses a Postgres function we define once (see SQL below)
      const { data, error } = await supabase.rpc('get_nearby_matches', {
        user_lat: userLat,
        user_lng: userLng,
        radius_km: radiusKm,
      });

      if (error) {
        // Fallback: if PostGIS function not set up yet, return all community matches
        console.warn('⚠️ Nearby RPC not available, falling back to community matches');
        return this.getDiscoverableMatches();
      }

      return (data ?? []).map(mapRowToMatch);
    } catch (error) {
      console.error('❌ Error fetching nearby matches:', error);
      return [];
    }
  }

  // ── 4. Join a match ────────────────────────────────────────────────────────

  async joinMatch(matchId: string, userId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if already joined
      const { data: existing } = await supabase
        .from('match_participants')
        .select('id')
        .eq('match_id', matchId)
        .eq('user_id', userId)
        .single();

      if (existing) {
        return { success: false, message: 'You have already joined this match.' };
      }

      // Check if match is full
      const { data: match } = await supabase
        .from('matches')
        .select('current_players, max_players, title, organizer_id')
        .eq('id', matchId)
        .single();

      if (!match) return { success: false, message: 'Match not found.' };

      const maxP = match.max_players ?? match.current_players + 1;
      if (match.current_players >= maxP) {
        return { success: false, message: 'This match is full!' };
      }

      // Add participant
      const { error: joinError } = await supabase
        .from('match_participants')
        .insert([{
          match_id: matchId,
          user_id: userId,
          status: 'confirmed',
          role: 'player',
          joined_at: new Date().toISOString(),
        }]);

      if (joinError) throw joinError;

      // Increment current_players count
      const { error: updateError } = await supabase
        .from('matches')
        .update({
          current_players: match.current_players + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', matchId);

      if (updateError) throw updateError;

      // Notify organizer
      await this.notifyPlayerJoined(matchId, match.title, userId, match.organizer_id);

      console.log(`✅ User ${userId} joined match ${matchId}`);
      return { success: true, message: 'Successfully joined the match!' };
    } catch (error) {
      console.error('❌ Error joining match:', error);
      return { success: false, message: 'Failed to join match. Please try again.' };
    }
  }

  // ── 5. Leave a match ───────────────────────────────────────────────────────

  async leaveMatch(matchId: string, userId: string): Promise<boolean> {
    try {
      const { error: leaveError } = await supabase
        .from('match_participants')
        .delete()
        .eq('match_id', matchId)
        .eq('user_id', userId);

      if (leaveError) throw leaveError;

      // Decrement current_players
      const { data: match } = await supabase
        .from('matches')
        .select('current_players')
        .eq('id', matchId)
        .single();

      if (match && match.current_players > 0) {
        await supabase
          .from('matches')
          .update({ current_players: match.current_players - 1 })
          .eq('id', matchId);
      }

      return true;
    } catch (error) {
      console.error('❌ Error leaving match:', error);
      return false;
    }
  }

  // ── 6. Get matches created by a specific user ──────────────────────────────

  async getMyCreatedMatches(userId: string): Promise<MatchNotification[]> {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('organizer_id', userId)
        .order('date', { ascending: true });

      if (error) throw error;
      return (data ?? []).map(mapRowToMatch);
    } catch (error) {
      console.error('❌ Error fetching created matches:', error);
      return [];
    }
  }

  // ── 7. Get matches a user has joined ──────────────────────────────────────

  async getMyJoinedMatches(userId: string): Promise<MatchNotification[]> {
    try {
      const { data, error } = await supabase
        .from('match_participants')
        .select(`
          match_id,
          matches (*)
        `)
        .eq('user_id', userId)
        .neq('role', 'organizer');   // exclude ones they created

      if (error) throw error;

      return (data ?? [])
        .map((row: any) => row.matches)
        .filter(Boolean)
        .map(mapRowToMatch);
    } catch (error) {
      console.error('❌ Error fetching joined matches:', error);
      return [];
    }
  }

  // ── 8. Get available sports from real DB data ──────────────────────────────

  async getAvailableSports(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('sport')
        .eq('status', 'open')
        .gte('date', new Date().toISOString().split('T')[0]);

      if (error) throw error;

      const sports = Array.from(new Set((data ?? []).map((m: any) => m.sport)));
      return (sports as string[]).sort();
    } catch (error) {
      console.error('❌ Error fetching sports:', error);
      return [];
    }
  }

  // ── 9. Get available locations from real DB data ───────────────────────────

  async getAvailableLocations(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('location')
        .eq('status', 'open')
        .gte('date', new Date().toISOString().split('T')[0]);

      if (error) throw error;

      const locations = Array.from(new Set((data ?? []).map((m: any) => m.location)));
      return (locations as string[]).sort();
    } catch (error) {
      console.error('❌ Error fetching locations:', error);
      return [];
    }
  }

  // ── 10. Notify organizer when someone joins ───────────────────────────────

  async notifyPlayerJoined(
    matchId: string,
    matchTitle: string,
    joiningUserId: string,
    organizerId: string
  ): Promise<void> {
    try {
      // Insert into your notifications table if it exists
      await supabase.from('notifications').insert([{
        user_id: organizerId,
        type: 'match_join',
        title: `Someone joined "${matchTitle}"`,
        body: `A new player has joined your match!`,
        match_id: matchId,
        is_read: false,
        created_at: new Date().toISOString(),
      }]);

      console.log(`✅ Organizer ${organizerId} notified of new join`);
    } catch (error) {
      // Non-critical — don't break the join flow
      console.warn('⚠️ Could not send join notification:', error);
    }
  }

  // ── 11. Notify new match created (for community feed) ─────────────────────

  async notifyNewMatchCreated(match: MatchNotification): Promise<void> {
    // In production: push to Supabase Realtime / broadcast channel
    // For now, Supabase Realtime subscriptions in DiscoveryHub handle this
    console.log(`✅ Match "${match.title}" is now live in the community feed`);
  }

  // ── 12. Subscribe to live match updates (Realtime) ────────────────────────

  subscribeToMatchUpdates(onNewMatch: (match: MatchNotification) => void) {
    const channel = supabase
      .channel('matches-live')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'matches',
          filter: "visibility=in.(community,nearby)",
        },
        (payload) => {
          console.log('🔔 New match created:', payload.new);
          onNewMatch(mapRowToMatch(payload.new));
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'matches',
        },
        (payload) => {
          console.log('🔄 Match updated:', payload.new);
          onNewMatch(mapRowToMatch(payload.new));
        }
      )
      .subscribe();

    // Return unsubscribe function for useEffect cleanup
    return () => supabase.removeChannel(channel);
  }
}

export const matchNotificationService = new MatchNotificationService();

