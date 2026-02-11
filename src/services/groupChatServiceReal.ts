/**
 * Real Group Chat Service - Using Supabase
 * Full implementation for real-time group messaging, invites, and member management
 */

import { supabase, supabaseEnabled } from '../lib/supabaseClient';

export interface RealGroupChat {
  id: string;
  match_id?: string;
  event_id?: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  group_chat_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  message_type: 'text' | 'system' | 'invite' | 'payment';
  created_at: string;
  updated_at: string;
}

export interface ChatMember {
  id: string;
  group_chat_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  role: 'admin' | 'member';
  joined_at: string;
  is_active: boolean;
}

export interface ChatInvite {
  id: string;
  group_chat_id: string;
  invited_by: string;
  invited_email: string;
  token: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  expires_at: string;
}

export class RealGroupChatService {
  /**
   * Create a new group chat for a match
   */
  async createGroupChat(
    matchId: string,
    chatName: string,
    description: string,
    createdById: string,
    createdByName: string,
    createdByEmail: string
  ): Promise<RealGroupChat> {
    try {
      if (!supabaseEnabled || !supabase) {
        // Demo mode: persist to localStorage so UI can load the chat immediately
        const chats = JSON.parse(localStorage.getItem('local_group_chats') || '[]');
        const chat = {
          id: matchId,
          match_id: matchId,
          name: chatName,
          description,
          created_by: createdById,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        chats.push(chat);
        localStorage.setItem('local_group_chats', JSON.stringify(chats));

        // Add creator as admin member locally
        const members = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        members.push({
          id: `${chat.id}-member-${createdById}`,
          group_chat_id: chat.id,
          user_id: createdById,
          user_name: createdByName,
          user_email: createdByEmail,
          role: 'admin',
          joined_at: new Date().toISOString(),
          is_active: true,
        });
        localStorage.setItem('local_chat_members', JSON.stringify(members));

        // Send a welcome system message locally
        const messages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        messages.push({
          id: `${chat.id}-msg-1`,
          group_chat_id: chat.id,
          sender_id: 'system',
          sender_name: 'System',
          content: `${createdByName} created the chat for ${chatName}`,
          message_type: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        localStorage.setItem('local_chat_messages', JSON.stringify(messages));

        console.log('✅ (Demo) Group chat created:', chatName);
        return chat;
      }

      const { data: chat, error } = await supabase
        .from('group_chats')
        .insert([
          {
            match_id: matchId,
            name: chatName,
            description,
            created_by: createdById,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Add creator as admin member
      await this.addMember(chat.id, createdById, 'admin', createdByName, createdByEmail);

      console.log('✅ Group chat created:', chatName);
      return chat;
    } catch (error) {
      console.error('Error creating group chat:', error);
      throw error;
    }
  }

  /**
   * Get group chat by ID
   */
  async getGroupChat(chatId: string): Promise<RealGroupChat | null> {
    try {
      if (!supabaseEnabled || !supabase) {
        const chats = JSON.parse(localStorage.getItem('local_group_chats') || '[]');
        return chats.find((c: any) => c.id === chatId) || null;
      }

      const { data, error } = await supabase
        .from('group_chats')
        .select('*')
        .eq('id', chatId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      console.error('Error getting group chat:', error);
      return null;
    }
  }

  /**
   * Get group chat by match ID
   */
  async getGroupChatByMatchId(matchId: string): Promise<RealGroupChat | null> {
    try {
      if (!supabaseEnabled || !supabase) return null;

      const { data, error } = await supabase
        .from('group_chats')
        .select('*')
        .eq('match_id', matchId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      console.error('Error getting group chat by match ID:', error);
      return null;
    }
  }

  /**
   * Add member to group chat
   */
  async addMember(
    groupChatId: string,
    userId: string,
    role: 'admin' | 'member' = 'member',
    userName: string = 'User',
    userEmail: string = 'user@example.com'
  ): Promise<ChatMember> {
    try {
      if (!supabaseEnabled || !supabase) {
        // Demo mode: store member locally
        const members = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        const existing = members.find((m: any) => m.group_chat_id === groupChatId && m.user_id === userId);
        if (existing) {
          existing.is_active = true;
          localStorage.setItem('local_chat_members', JSON.stringify(members));
          return existing;
        }

        const member = {
          id: `${groupChatId}-member-${userId}`,
          group_chat_id: groupChatId,
          user_id: userId,
          user_name: userName,
          user_email: userEmail,
          role,
          joined_at: new Date().toISOString(),
          is_active: true,
        };
        members.push(member);
        localStorage.setItem('local_chat_members', JSON.stringify(members));

        // Send system message locally
        await this.sendMessage(groupChatId, 'system', 'System', `${userName} joined the chat 👋`, 'system');

        return member;
      }

      // Check if member already exists
      const { data: existing } = await supabase
        .from('chat_members')
        .select('*')
        .eq('group_chat_id', groupChatId)
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Update if already a member
        const { data: updated, error } = await supabase
          .from('chat_members')
          .update({ is_active: true })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return updated;
      }

      // Add new member
      const { data: member, error } = await supabase
        .from('chat_members')
        .insert([
          {
            group_chat_id: groupChatId,
            user_id: userId,
            user_name: userName,
            user_email: userEmail,
            role,
            joined_at: new Date().toISOString(),
            is_active: true,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Send system message
      await this.sendMessage(
        groupChatId,
        'system',
        'System',
        `${userName} joined the chat 👋`,
        'system'
      );

      return member;
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  }

  /**
   * Remove member from group chat
   */
  async removeMember(groupChatId: string, userId: string): Promise<void> {
    try {
      if (!supabaseEnabled || !supabase) {
        throw new Error('Supabase not configured');
      }

      const { error: memberError } = await supabase
        .from('chat_members')
        .update({ is_active: false })
        .eq('group_chat_id', groupChatId)
        .eq('user_id', userId);

      if (memberError) throw memberError;

      // Get member name for system message
      const { data: member } = await supabase
        .from('chat_members')
        .select('user_name')
        .eq('group_chat_id', groupChatId)
        .eq('user_id', userId)
        .single();

      if (member) {
        await this.sendMessage(
          groupChatId,
          'system',
          'System',
          `${member.user_name} left the chat`,
          'system'
        );
      }
    } catch (error) {
      console.error('Error removing member:', error);
      throw error;
    }
  }

  /**
   * Send message to group chat
   */
  async sendMessage(
    groupChatId: string,
    senderId: string,
    senderName: string,
    content: string,
    messageType: 'text' | 'system' | 'invite' | 'payment' = 'text',
    senderAvatar?: string
  ): Promise<ChatMessage> {
    try {
      if (!supabaseEnabled || !supabase) {
        // Store message locally
        const messages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        const messageObj = {
          id: `${groupChatId}-msg-${messages.length + 1}`,
          group_chat_id: groupChatId,
          sender_id: senderId,
          sender_name: senderName,
          sender_avatar: senderAvatar,
          content,
          message_type: messageType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        messages.push(messageObj);
        localStorage.setItem('local_chat_messages', JSON.stringify(messages));
        console.log('✅ (Demo) Message stored');
        return messageObj;
      }

      const now = new Date().toISOString();
      const { data: message, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            group_chat_id: groupChatId,
            sender_id: senderId,
            sender_name: senderName,
            sender_avatar: senderAvatar,
            content,
            message_type: messageType,
            created_at: now,
            updated_at: now,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update group chat updated_at
      await supabase
        .from('group_chats')
        .update({ updated_at: now })
        .eq('id', groupChatId);

      console.log('✅ Message sent');
      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Get all messages in a group chat
   */
  async getMessages(groupChatId: string, limit: number = 100): Promise<ChatMessage[]> {
    try {
      if (!supabaseEnabled || !supabase) {
        const messages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        return (messages.filter((m: any) => m.group_chat_id === groupChatId) || []).slice(-limit);
      }

      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('group_chat_id', groupChatId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return messages || [];
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  /**
   * Get all members of a group chat
   */
  async getMembers(groupChatId: string): Promise<ChatMember[]> {
    try {
      if (!supabaseEnabled || !supabase) {
        const members = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        return (members.filter((m: any) => m.group_chat_id === groupChatId && m.is_active) || []);
      }

      const { data: members, error } = await supabase
        .from('chat_members')
        .select('*')
        .eq('group_chat_id', groupChatId)
        .eq('is_active', true)
        .order('joined_at', { ascending: true });

      if (error) throw error;
      return members || [];
    } catch (error) {
      console.error('Error getting members:', error);
      return [];
    }
  }

  /**
   * Send invite to a user
   */
  async sendInvite(
    groupChatId: string,
    invitedEmail: string,
    invitedById: string
  ): Promise<ChatInvite> {
    try {
      if (!supabaseEnabled || !supabase) {
        throw new Error('Supabase not configured');
      }

      const token = Math.random().toString(36).substr(2, 32);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

      const { data: invite, error } = await supabase
        .from('chat_invites')
        .insert([
          {
            group_chat_id: groupChatId,
            invited_by: invitedById,
            invited_email: invitedEmail,
            token,
            status: 'pending',
            created_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Send system message about invite
      await this.sendMessage(
        groupChatId,
        'system',
        'System',
        `Invite sent to ${invitedEmail} 📧`,
        'invite'
      );

      console.log('✅ Invite sent to:', invitedEmail);
      return invite;
    } catch (error) {
      console.error('Error sending invite:', error);
      throw error;
    }
  }

  /**
   * Accept invite and join group chat
   */
  async acceptInvite(
    inviteToken: string,
    userId: string,
    userName: string,
    userEmail: string
  ): Promise<{ success: boolean; groupChatId?: string; error?: string }> {
    try {
      if (!supabaseEnabled || !supabase) {
        throw new Error('Supabase not configured');
      }

      // Get invite
      const { data: invite, error: inviteError } = await supabase
        .from('chat_invites')
        .select('*')
        .eq('token', inviteToken)
        .eq('status', 'pending')
        .single();

      if (inviteError || !invite) {
        return { success: false, error: 'Invalid or expired invite' };
      }

      // Check if invite is expired
      if (new Date(invite.expires_at) < new Date()) {
        return { success: false, error: 'Invite has expired' };
      }

      // Add user as member
      await this.addMember(
        invite.group_chat_id,
        userId,
        'member',
        userName,
        userEmail
      );

      // Mark invite as accepted
      await supabase
        .from('chat_invites')
        .update({ status: 'accepted' })
        .eq('id', invite.id);

      return { success: true, groupChatId: invite.group_chat_id };
    } catch (error) {
      console.error('Error accepting invite:', error);
      return { success: false, error: String(error) };
    }
  }

  /**
   * Get pending invites for a group chat
   */
  async getPendingInvites(groupChatId: string): Promise<ChatInvite[]> {
    try {
      if (!supabaseEnabled || !supabase) {
        const invites = JSON.parse(localStorage.getItem('local_chat_invites') || '[]');
        return (invites.filter((i: any) => i.group_chat_id === groupChatId && i.status === 'pending') || []);
      }

      const { data: invites, error } = await supabase
        .from('chat_invites')
        .select('*')
        .eq('group_chat_id', groupChatId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return invites || [];
    } catch (error) {
      console.error('Error getting pending invites:', error);
      return [];
    }
  }

  /**
   * Subscribe to real-time messages
   */
  subscribeToMessages(
    groupChatId: string,
    callback: (messages: ChatMessage[]) => void
  ): (() => void) {
    if (!supabaseEnabled || !supabase) {
      return () => {};
    }

    const subscription = supabase
      .from(`chat_messages:group_chat_id=eq.${groupChatId}`)
      .on('*', (payload) => {
        // Fetch fresh messages on any change
        this.getMessages(groupChatId).then(callback);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }

  /**
   * Subscribe to real-time members
   */
  subscribeToMembers(
    groupChatId: string,
    callback: (members: ChatMember[]) => void
  ): (() => void) {
    if (!supabaseEnabled || !supabase) {
      return () => {};
    }

    const subscription = supabase
      .from(`chat_members:group_chat_id=eq.${groupChatId}`)
      .on('*', (payload) => {
        // Fetch fresh members on any change
        this.getMembers(groupChatId).then(callback);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }

  /**
   * Get user's group chats
   */
  async getUserGroupChats(userId: string): Promise<RealGroupChat[]> {
    try {
      if (!supabaseEnabled || !supabase) return [];

      const { data: members, error } = await supabase
        .from('chat_members')
        .select('group_chat_id')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) throw error;

      if (!members || members.length === 0) return [];

      const chatIds = members.map(m => m.group_chat_id);
      const { data: chats, error: chatsError } = await supabase
        .from('group_chats')
        .select('*')
        .in('id', chatIds)
        .order('updated_at', { ascending: false });

      if (chatsError) throw chatsError;
      return chats || [];
    } catch (error) {
      console.error('Error getting user chats:', error);
      return [];
    }
  }

  /**
   * Find a personal (1:1) chat between two users.
   * Returns the chat if exists, otherwise null.
   */
  async getPersonalChatBetween(userA: string, userB: string): Promise<RealGroupChat | null> {
    try {
      if (!supabaseEnabled || !supabase) {
        const chats = JSON.parse(localStorage.getItem('local_group_chats') || '[]');
        // personal chats are those without match_id/event_id and with exactly 2 members including both users
        const members = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        for (const c of chats) {
          if (c.match_id || c.event_id) continue;
          const m = members.filter((mm: any) => mm.group_chat_id === c.id && mm.is_active).map((mm: any) => mm.user_id);
          if (m.length === 2 && m.includes(userA) && m.includes(userB)) return c;
        }
        return null;
      }

      // Get all chats for userA
      const { data: memberships, error: memErr } = await supabase
        .from('chat_members')
        .select('group_chat_id')
        .eq('user_id', userA)
        .eq('is_active', true);

      if (memErr) throw memErr;
      if (!memberships || memberships.length === 0) return null;

      const chatIds = memberships.map((m: any) => m.group_chat_id);
      // For each chat, check if userB is member and members count === 2
      for (const id of chatIds) {
        const { data: membs, error: mErr } = await supabase
          .from('chat_members')
          .select('*')
          .eq('group_chat_id', id)
          .eq('is_active', true);
        if (mErr) throw mErr;
        if (!membs) continue;
        const ids = membs.map((mm: any) => mm.user_id);
        if (ids.length === 2 && ids.includes(userB) && ids.includes(userA)) {
          const { data: chat, error: chatErr } = await supabase
            .from('group_chats')
            .select('*')
            .eq('id', id)
            .single();
          if (chatErr) throw chatErr;
          return chat || null;
        }
      }

      return null;
    } catch (error) {
      console.error('Error finding personal chat:', error);
      return null;
    }
  }

  /**
   * Create a personal (1:1) chat between two users.
   */
  async createPersonalChat(
    userAId: string,
    userAName: string,
    userAEmail: string,
    userBId: string,
    userBName: string,
    userBEmail: string
  ): Promise<RealGroupChat> {
    try {
      // canonical id to reduce duplicates in demo mode
      const id = `personal-${[userAId, userBId].sort().join('-')}-${Date.now()}`;
      const name = `${userAName} & ${userBName}`;

      if (!supabaseEnabled || !supabase) {
        const chats = JSON.parse(localStorage.getItem('local_group_chats') || '[]');
        const chat = {
          id,
          name,
          created_by: userAId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        chats.push(chat);
        localStorage.setItem('local_group_chats', JSON.stringify(chats));

        const members = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        members.push({
          id: `${chat.id}-member-${userAId}`,
          group_chat_id: chat.id,
          user_id: userAId,
          user_name: userAName,
          user_email: userAEmail,
          role: 'member',
          joined_at: new Date().toISOString(),
          is_active: true,
        });
        members.push({
          id: `${chat.id}-member-${userBId}`,
          group_chat_id: chat.id,
          user_id: userBId,
          user_name: userBName,
          user_email: userBEmail,
          role: 'member',
          joined_at: new Date().toISOString(),
          is_active: true,
        });
        localStorage.setItem('local_chat_members', JSON.stringify(members));

        // initial system message
        const messages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        messages.push({
          id: `${chat.id}-msg-1`,
          group_chat_id: chat.id,
          sender_id: 'system',
          sender_name: 'System',
          content: `Personal chat created between ${userAName} and ${userBName}`,
          message_type: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        localStorage.setItem('local_chat_messages', JSON.stringify(messages));

        return chat;
      }

      const { data: chat, error } = await supabase
        .from('group_chats')
        .insert([
          {
            name,
            created_by: userAId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // add both members
      await this.addMember(chat.id, userAId, 'member', userAName, userAEmail);
      await this.addMember(chat.id, userBId, 'member', userBName, userBEmail);

      // system message
      await this.sendMessage(chat.id, 'system', 'System', `Personal chat created between ${userAName} and ${userBName}`, 'system');

      return chat;
    } catch (error) {
      console.error('Error creating personal chat:', error);
      throw error;
    }
  }

  /**
   * Get or create a personal chat between two users.
   */
  async getOrCreatePersonalChat(
    userAId: string,
    userAName: string,
    userAEmail: string,
    userBId: string,
    userBName: string,
    userBEmail: string
  ): Promise<RealGroupChat> {
    const existing = await this.getPersonalChatBetween(userAId, userBId);
    if (existing) return existing;
    return this.createPersonalChat(userAId, userAName, userAEmail, userBId, userBName, userBEmail);
  }
}

export const realGroupChatService = new RealGroupChatService();
