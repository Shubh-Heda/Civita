// Central backend adapter.
// Keep existing app imports stable while routing signed-in data through Supabase.
import {
  supabaseAuth,
  usersService,
  matchesService,
  eventsService,
} from './supabaseAuthService';
import { supabase, supabaseEnabled } from '../lib/supabaseClient';

export const backendService = supabaseAuth;
export const authService = supabaseAuth;
export const profileService = usersService;
export const matchService = matchesService;
export const eventService = eventsService;
export const chatService = {
  async createRoom(roomInput: any, roomType?: string, name?: string) {
    if (!supabaseEnabled || !supabase) {
      return {
        id: `room-${Date.now()}`,
        name: name || roomInput?.name || 'Chat Room',
        room_type: roomType || roomInput?.room_type || 'custom',
        created_at: new Date().toISOString(),
      };
    }

    const user = await supabaseAuth.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const room = typeof roomInput === 'object'
      ? roomInput
      : {
          related_id: roomInput,
          room_type: roomType || 'custom',
          name: name || 'Chat Room',
        };

    const { data, error } = await supabase
      .from('chat_rooms')
      .insert({
        name: room.name || 'Chat Room',
        description: room.description,
        room_type: room.room_type || 'custom',
        related_id: room.related_id || null,
        created_by: user.id,
        is_private: Boolean(room.is_private),
        category: room.category,
        avatar_url: room.avatar_url,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase.from('chat_room_members').upsert(
      { room_id: data.id, user_id: user.id, role: 'admin' },
      { onConflict: 'room_id,user_id' }
    );

    return data;
  },

  async getRooms(userId: string) {
    if (!supabaseEnabled || !supabase) return [];

    const { data, error } = await supabase
      .from('chat_room_members')
      .select('chat_rooms(*)')
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });

    if (error) throw error;
    return (data || []).map((row: any) => row.chat_rooms).filter(Boolean);
  },

  async getMessages(roomId: string) {
    if (!supabaseEnabled || !supabase) return [];

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*, sender:profiles!sender_id(id,name,email,avatar)')
      .eq('room_id', roomId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) throw error;
    return data || [];
  },

  async sendMessage(roomOrPayload: any, content?: string, messageType = 'text') {
    if (!supabaseEnabled || !supabase) return null;

    const user = await supabaseAuth.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const payload = typeof roomOrPayload === 'object'
      ? {
          room_id: roomOrPayload.room_id,
          sender_id: roomOrPayload.user_id || user.id,
          content: roomOrPayload.content || roomOrPayload.message,
          message_type: roomOrPayload.message_type || messageType,
        }
      : {
          room_id: roomOrPayload,
          sender_id: user.id,
          content,
          message_type: messageType,
        };

    const { data, error } = await supabase
      .from('chat_messages')
      .insert(payload)
      .select('*, sender:profiles!sender_id(id,name,email,avatar)')
      .single();

    if (error) throw error;
    return data;
  },

  async markAsRead(roomId: string) {
    if (!supabaseEnabled || !supabase) return;
    const user = await supabaseAuth.getCurrentUser();
    if (!user) return;

    await supabase
      .from('chat_room_members')
      .update({ last_read_at: new Date().toISOString() })
      .eq('room_id', roomId)
      .eq('user_id', user.id);
  },

  async getMemberRole(roomId: string) {
    if (!supabaseEnabled || !supabase) return 'member';
    const user = await supabaseAuth.getCurrentUser();
    if (!user) return 'member';

    const { data } = await supabase
      .from('chat_room_members')
      .select('role')
      .eq('room_id', roomId)
      .eq('user_id', user.id)
      .single();

    return data?.role || 'member';
  },

  async getMembers(roomId: string) {
    if (!supabaseEnabled || !supabase) return [];

    const { data, error } = await supabase
      .from('chat_room_members')
      .select('*, profile:profiles!user_id(id,name,email,avatar)')
      .eq('room_id', roomId);

    if (error) throw error;
    return data || [];
  },

  async getPinnedMessages(roomId: string) {
    if (!supabaseEnabled || !supabase) return [];

    const { data, error } = await supabase
      .from('chat_pinned_messages')
      .select('*, message:chat_messages(*)')
      .eq('room_id', roomId);

    if (error) throw error;
    return data || [];
  },

  async getModerationActions() {
    return [];
  },

  subscribeToRoom(roomId: string, onMessage: (message: any) => void) {
    if (!supabaseEnabled || !supabase) return () => {};

    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `room_id=eq.${roomId}` },
        (payload) => onMessage(payload.new)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  async deleteMessage(_roomId: string, messageId: string) {
    if (!supabaseEnabled || !supabase) return;
    await supabase.from('chat_messages').update({ is_deleted: true }).eq('id', messageId);
  },

  async reportMessage() {
    return;
  },

  async pinMessage(roomId: string, messageId: string) {
    if (!supabaseEnabled || !supabase) return;
    const user = await supabaseAuth.getCurrentUser();
    if (!user) return;
    await supabase.from('chat_pinned_messages').upsert(
      { room_id: roomId, message_id: messageId, pinned_by: user.id },
      { onConflict: 'room_id,message_id' }
    );
  },

  async unpinMessage(messageId: string) {
    if (!supabaseEnabled || !supabase) return;
    await supabase.from('chat_pinned_messages').delete().eq('message_id', messageId);
  },

  async searchMessages(roomId: string, query: string) {
    if (!supabaseEnabled || !supabase) return [];
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .ilike('content', `%${query}%`)
      .limit(30);
    if (error) throw error;
    return data || [];
  },

  async kickUser(roomId: string, userId: string) {
    if (!supabaseEnabled || !supabase) return;
    await supabase.from('chat_room_members').delete().eq('room_id', roomId).eq('user_id', userId);
  },

  async muteUser(roomId: string, userId: string) {
    if (!supabaseEnabled || !supabase) return;
    await supabase.from('chat_room_members').update({ is_muted: true }).eq('room_id', roomId).eq('user_id', userId);
  },

  async promoteToModerator(roomId: string, userId: string) {
    if (!supabaseEnabled || !supabase) return;
    await supabase.from('chat_room_members').update({ role: 'moderator' }).eq('room_id', roomId).eq('user_id', userId);
  },
};

export { supabaseAuth, usersService, matchesService, eventsService };

export const initializeDefaultData = async (_userId: string) => {
  return;
};
