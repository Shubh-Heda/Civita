/**
 * Real Group Chat Service
 * Tables:
 *   conversations        { id, type, name, is_archived, created_at, updated_at }
 *   conversation_members { id, conversation_id, user_id, role, joined_at }
 *   messages             { id, conversation_id, sender_id, content, message_type, is_deleted, created_at, updated_at }
 *   profiles             { id, name, email, avatar, ... }
 */

import { supabase, supabaseEnabled } from '../lib/supabaseClient';

export interface RealGroupChat {
  id: string;
  type?: string;
  chat_type?: string;
  name: string;
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
  match_id?: string;
  event_id?: string;
  description?: string;
  created_by?: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
  content: string;
  message_type: 'text' | 'system' | 'invite' | 'payment';
  is_deleted?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ChatMember {
  id: string;
  conversation_id: string;
  group_chat_id?: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  user_avatar?: string;
  role: 'admin' | 'member';
  joined_at: string;
}

// ── localStorage fallback ─────────────────────────────────────
const LS = {
  chats: (): any[] => JSON.parse(localStorage.getItem('local_group_chats') || '[]'),
  saveChats: (v: any[]) => localStorage.setItem('local_group_chats', JSON.stringify(v)),
  members: (): any[] => JSON.parse(localStorage.getItem('local_chat_members') || '[]'),
  saveMembers: (v: any[]) => localStorage.setItem('local_chat_members', JSON.stringify(v)),
  messages: (): any[] => JSON.parse(localStorage.getItem('local_chat_messages') || '[]'),
  saveMessages: (v: any[]) => localStorage.setItem('local_chat_messages', JSON.stringify(v)),
};

// ── Profile cache ─────────────────────────────────────────────
const profileCache: Record<string, { name: string; avatar?: string; email?: string }> = {};

async function resolveProfile(userId: string): Promise<{ name: string; avatar?: string; email?: string }> {
  if (profileCache[userId]) return profileCache[userId];
  if (!supabase) return { name: 'User' };
  const { data } = await supabase.from('profiles').select('name, avatar, email').eq('id', userId).maybeSingle();
  const result = { name: data?.name || 'User', avatar: data?.avatar, email: data?.email };
  profileCache[userId] = result;
  return result;
}

export class RealGroupChatService {

  async createGroupChat(
    matchId: string, chatName: string, description: string,
    createdById: string, createdByName: string, createdByEmail: string
  ): Promise<RealGroupChat> {
    if (!supabaseEnabled || !supabase) {
      const chat: any = {
        id: matchId, name: chatName, type: 'group', chat_type: 'group',
        created_by: createdById, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      };
      LS.saveChats([...LS.chats(), chat]);
      LS.saveMembers([...LS.members(), {
        id: `${matchId}-m-${createdById}`, conversation_id: matchId, group_chat_id: matchId,
        user_id: createdById, user_name: createdByName, role: 'admin', joined_at: new Date().toISOString(),
      }]);
      this._localMsg(matchId, createdById, createdByName, `${createdByName} created the group`, 'system');
      return chat;
    }
    // Try inserting with match_id; fall back without it if column doesn't exist
    let chat: any;
    const tryInsert = async (payload: any) => {
      const { data, error } = await supabase!.from('conversations').insert([payload]).select().single();
      return { data, error };
    };
    let result = await tryInsert({ name: chatName, type: 'group', match_id: matchId });
    if (result.error) {
      if (result.error.message?.includes('match_id') || result.error.message?.includes('column')) {
        result = await tryInsert({ name: chatName, type: 'group' });
      }
      if (result.error) throw result.error;
    }
    chat = result.data;
    await this.addMember(chat.id, createdById, 'admin');
    return { ...chat, chat_type: chat.type };
  }

  async getGroupChat(chatId: string): Promise<RealGroupChat | null> {
    if (!supabaseEnabled || !supabase) return LS.chats().find((c: any) => c.id === chatId) || null;
    const { data } = await supabase.from('conversations').select('*').eq('id', chatId).single();
    return data ? { ...data, chat_type: data.type } : null;
  }

  async addMember(
    conversationId: string, userId: string, role: 'admin' | 'member' = 'member',
    userName?: string, _userEmail?: string
  ): Promise<ChatMember> {
    if (!supabaseEnabled || !supabase) {
      const members = LS.members();
      const ex = members.find((m: any) => m.conversation_id === conversationId && m.user_id === userId);
      if (ex) return ex;
      const m = {
        id: `${conversationId}-m-${userId}`, conversation_id: conversationId, group_chat_id: conversationId,
        user_id: userId, user_name: userName || 'User',
        role, joined_at: new Date().toISOString(),
      };
      LS.saveMembers([...members, m]);
      return m;
    }
    // Check if already a member
    const { data: existing } = await supabase.from('conversation_members').select('*')
      .eq('conversation_id', conversationId).eq('user_id', userId).maybeSingle();
    if (existing) return { ...existing, group_chat_id: conversationId };
    const { data: member, error } = await supabase.from('conversation_members')
      .insert([{ conversation_id: conversationId, user_id: userId, role, joined_at: new Date().toISOString() }])
      .select().single();
    if (error) throw error;
    return { ...member, group_chat_id: conversationId };
  }

  async addMemberToChat(conversationId: string, userId: string): Promise<void> {
    await this.addMember(conversationId, userId, 'member');
  }

  async removeMember(conversationId: string, userId: string): Promise<void> {
    if (!supabaseEnabled || !supabase) return;
    await supabase.from('conversation_members')
      .delete().eq('conversation_id', conversationId).eq('user_id', userId);
  }

  async getMembers(conversationId: string): Promise<ChatMember[]> {
    if (!supabaseEnabled || !supabase) {
      return LS.members().filter((m: any) => m.conversation_id === conversationId);
    }
    const { data, error } = await supabase.from('conversation_members').select('*')
      .eq('conversation_id', conversationId).order('joined_at', { ascending: true });
    if (error) return [];
    const enriched = await Promise.all((data || []).map(async (m: any) => {
      const profile = await resolveProfile(m.user_id);
      return { ...m, group_chat_id: conversationId, user_name: profile.name, user_avatar: profile.avatar, user_email: profile.email };
    }));
    return enriched;
  }

  async sendMessage(
    conversationId: string, senderId: string, senderName: string,
    content: string, messageType: 'text' | 'system' | 'invite' | 'payment' = 'text',
    senderAvatar?: string
  ): Promise<ChatMessage> {
    if (!supabaseEnabled || !supabase) {
      return this._localMsg(conversationId, senderId, senderName, content, messageType, senderAvatar);
    }
    const now = new Date().toISOString();
    const { data: message, error } = await supabase.from('messages')
      .insert([{ conversation_id: conversationId, sender_id: senderId, content, message_type: messageType, created_at: now, updated_at: now }])
      .select().single();
    if (error) throw error;
    await supabase.from('conversations').update({ updated_at: now }).eq('id', conversationId);
    return { ...message, sender_name: senderName, sender_avatar: senderAvatar };
  }

  private _localMsg(
    conversationId: string, senderId: string, senderName: string,
    content: string, messageType: any, senderAvatar?: string
  ): ChatMessage {
    const msg: ChatMessage = {
      id: `${conversationId}-msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      conversation_id: conversationId, sender_id: senderId,
      sender_name: senderName, sender_avatar: senderAvatar,
      content, message_type: messageType, created_at: new Date().toISOString(),
    };
    LS.saveMessages([...LS.messages(), msg]);
    return msg;
  }

  async getMessages(conversationId: string, limit = 100): Promise<ChatMessage[]> {
    if (!supabaseEnabled || !supabase) {
      return LS.messages().filter((m: any) => m.conversation_id === conversationId).slice(-limit);
    }
    const { data, error } = await supabase.from('messages').select('*')
      .eq('conversation_id', conversationId).eq('is_deleted', false)
      .order('created_at', { ascending: true }).limit(limit);
    if (error) return [];
    const enriched = await Promise.all((data || []).map(async (msg: any) => {
      const profile = await resolveProfile(msg.sender_id);
      return { ...msg, sender_name: profile.name, sender_avatar: profile.avatar };
    }));
    return enriched;
  }

  subscribeToMessages(conversationId: string, callback: (messages: ChatMessage[]) => void): () => void {
    if (!supabaseEnabled || !supabase) return () => {};
    const channel = supabase.channel(`msgs-${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, async () => {
        const fresh = await this.getMessages(conversationId);
        callback(fresh);
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }

  subscribeToMembers(conversationId: string, callback: (members: ChatMember[]) => void): () => void {
    if (!supabaseEnabled || !supabase) return () => {};
    const channel = supabase.channel(`mems-${conversationId}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'conversation_members',
        filter: `conversation_id=eq.${conversationId}`,
      }, async () => {
        const fresh = await this.getMembers(conversationId);
        callback(fresh);
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }

  async getUserGroupChats(userId: string): Promise<RealGroupChat[]> {
    if (!supabaseEnabled || !supabase) {
      const ids = LS.members().filter((m: any) => m.user_id === userId).map((m: any) => m.conversation_id);
      return LS.chats().filter((c: any) => ids.includes(c.id));
    }
    const { data: mems, error } = await supabase.from('conversation_members')
      .select('conversation_id').eq('user_id', userId);
    if (error || !mems?.length) return [];
    const ids = mems.map((m: any) => m.conversation_id);
    const { data: chats } = await supabase.from('conversations').select('*')
      .in('id', ids).order('updated_at', { ascending: false });
    return (chats || []).map((c: any) => ({ ...c, chat_type: c.type }));
  }

  async getPersonalChatBetween(userA: string, userB: string): Promise<RealGroupChat | null> {
    if (!supabaseEnabled || !supabase) {
      for (const c of LS.chats()) {
        const ids = LS.members().filter((m: any) => m.conversation_id === c.id).map((m: any) => m.user_id);
        if (ids.length === 2 && ids.includes(userA) && ids.includes(userB)) return c;
      }
      return null;
    }
    const { data: mems } = await supabase.from('conversation_members')
      .select('conversation_id').eq('user_id', userA);
    if (!mems?.length) return null;
    for (const { conversation_id } of mems) {
      const { data: all } = await supabase.from('conversation_members')
        .select('user_id').eq('conversation_id', conversation_id);
      const ids = (all || []).map((m: any) => m.user_id);
      if (ids.length === 2 && ids.includes(userA) && ids.includes(userB)) {
        const { data: chat } = await supabase.from('conversations').select('*').eq('id', conversation_id).single();
        return chat ? { ...chat, chat_type: chat.type } : null;
      }
    }
    return null;
  }

  async createPersonalChat(
    userAId: string, userAName: string, userAEmail: string,
    userBId: string, userBName: string, userBEmail: string
  ): Promise<RealGroupChat> {
    const name = `${userAName} & ${userBName}`;
    if (!supabaseEnabled || !supabase) {
      const id = `dm-${[userAId, userBId].sort().join('-')}-${Date.now()}`;
      const chat: any = { id, name, type: 'direct', chat_type: 'direct', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      LS.saveChats([...LS.chats(), chat]);
      LS.saveMembers([...LS.members(),
        { id: `${id}-m-${userAId}`, conversation_id: id, group_chat_id: id, user_id: userAId, user_name: userAName, role: 'member', joined_at: new Date().toISOString() },
        { id: `${id}-m-${userBId}`, conversation_id: id, group_chat_id: id, user_id: userBId, user_name: userBName, role: 'member', joined_at: new Date().toISOString() },
      ]);
      return chat;
    }
    const { data: chat, error } = await supabase.from('conversations')
      .insert([{ name, type: 'direct' }]).select().single();
    if (error) throw error;
    await this.addMember(chat.id, userAId, 'member');
    await this.addMember(chat.id, userBId, 'member');
    return { ...chat, chat_type: chat.type };
  }

  async getOrCreatePersonalChat(
    userAId: string, userAName: string, userAEmail: string,
    userBId: string, userBName: string, userBEmail: string
  ): Promise<RealGroupChat> {
    const existing = await this.getPersonalChatBetween(userAId, userBId);
    if (existing) return existing;
    return this.createPersonalChat(userAId, userAName, userAEmail, userBId, userBName, userBEmail);
  }

  async getGroupChatByMatchId(_matchId: string): Promise<RealGroupChat | null> { return null; }
  async sendInvite(conversationId: string, invitedEmail: string): Promise<any> {
    await this.sendMessage(conversationId, 'system', 'System', `Invite sent to ${invitedEmail} 📧`, 'invite');
    return {};
  }
  async getPendingInvites(_conversationId: string): Promise<any[]> { return []; }
}

export const realGroupChatService = new RealGroupChatService();