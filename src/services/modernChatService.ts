/**
 * Modern Chat Service
 * Comprehensive chat backend with real-time sync, typing indicators, reactions, etc.
 */

import { supabase } from '../lib/supabase';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'system' | 'location' | 'shared-event';
  attachments?: MessageAttachment[];
  reactions: MessageReaction[];
  reply_to?: string; // ID of message being replied to
  edited_at?: string;
  created_at: string;
  is_sent: boolean;
  is_read_by?: string[]; // User IDs who have read this
}

export interface MessageAttachment {
  id: string;
  url: string;
  type: 'image' | 'video' | 'file';
  filename?: string;
  size?: number;
  metadata?: Record<string, any>;
}

export interface MessageReaction {
  emoji: string;
  users: string[]; // User IDs who reacted
  count: number;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name: string;
  description?: string;
  avatar?: string;
  members: ConversationMember[];
  last_message?: ChatMessage;
  last_message_at?: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
  is_muted: boolean;
  custom_settings?: ConversationSettings;
}

export interface ConversationMember {
  user_id: string;
  name: string;
  avatar?: string;
  email?: string;
  is_online: boolean;
  last_seen?: string;
  role: 'admin' | 'moderator' | 'member';
  joined_at: string;
  invite_status?: 'pending' | 'accepted' | 'rejected';
}

export interface ConversationSettings {
  notification_level: 'all' | 'mentions' | 'none';
  color?: string;
  custom_name?: string;
  pinned_messages?: string[];
}

export interface TypingIndicator {
  user_id: string;
  user_name: string;
  conversation_id: string;
}

// ============================================
// MODERN CHAT SERVICE
// ============================================

class ModerChatService {
  private typingTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private messageCache: Map<string, ChatMessage[]> = new Map();
  private conversationSubscriptions: Map<string, (() => void)[]> = new Map();

  /**
   * Create a new direct message conversation
   */
  async createDirectConversation(
    userId1: string,
    userId2: string,
    userName1: string,
    userName2: string
  ): Promise<Conversation> {
    try {
      // Check if conversation already exists
      const existing = await this.findDirectConversation(userId1, userId2);
      if (existing) return existing;

      const conversationId = crypto.randomUUID();

      // Insert conversation
      const { error: convError } = await supabase
        .from('conversations')
        .insert({
          id: conversationId,
          type: 'direct',
          name: userName2,
          avatar: undefined,
          is_archived: false,
          is_muted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (convError) throw convError;

      // Add members
      await supabase.from('conversation_members').insert([
        {
          conversation_id: conversationId,
          user_id: userId1,
          name: userName1,
          role: 'member',
          joined_at: new Date().toISOString(),
        },
        {
          conversation_id: conversationId,
          user_id: userId2,
          name: userName2,
          role: 'member',
          joined_at: new Date().toISOString(),
        },
      ]);

      return await this.getConversation(conversationId);
    } catch (error) {
      console.error('❌ Error creating direct conversation:', error);
      throw error;
    }
  }

  /**
   * Create a new group conversation
   */
  async createGroupConversation(
    name: string,
    description: string,
    creatorId: string,
    creatorName: string,
    memberIds: string[] = []
  ): Promise<Conversation> {
    try {
      const conversationId = crypto.randomUUID();

      // Insert conversation
      const { error: convError } = await supabase
        .from('conversations')
        .insert({
          id: conversationId,
          type: 'group',
          name,
          description,
          avatar: undefined,
          is_archived: false,
          is_muted: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (convError) {
        console.error('❌ Conversation insert error:', JSON.stringify(convError, null, 2));
        throw convError;
      }

      // Add creator as admin
      const { error: creatorError } = await supabase.from('conversation_members').insert({
        conversation_id: conversationId,
        user_id: creatorId,
        name: creatorName,
        role: 'admin',
        joined_at: new Date().toISOString(),
      });

      if (creatorError) {
        console.error('❌ Creator member insert error:', JSON.stringify(creatorError, null, 2));
        throw creatorError;
      }

      // Add other members
      if (memberIds.length > 0) {
        const memberData = memberIds.map(id => ({
          conversation_id: conversationId,
          user_id: id,
          name: 'User', // Should be fetched from user profile
          role: 'member' as const,
          joined_at: new Date().toISOString(),
        }));

        const { error: membersError } = await supabase.from('conversation_members').insert(memberData);
        if (membersError) {
          console.error('❌ Members insert error:', JSON.stringify(membersError, null, 2));
          throw membersError;
        }
      }

      return await this.getConversation(conversationId);
    } catch (error) {
      console.error('❌ Error creating group conversation:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  /**
   * Get conversation by ID
   */
  async getConversation(conversationId: string): Promise<Conversation> {
    try {
      const { data: conv, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (convError) {
        console.error('❌ Get conversation error:', JSON.stringify(convError, null, 2));
        throw convError;
      }

      const { data: members, error: membersError } = await supabase
        .from('conversation_members')
        .select('*')
        .eq('conversation_id', conversationId);

      if (membersError) {
        console.error('❌ Get members error:', JSON.stringify(membersError, null, 2));
        throw membersError;
      }

      const { data: lastMsg, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (msgError && msgError.code !== 'PGRST116') {
        console.error('❌ Get last message error:', JSON.stringify(msgError, null, 2));
        throw msgError;
      }

      return {
        id: conv.id,
        type: conv.type,
        name: conv.name,
        description: conv.description,
        avatar: conv.avatar,
        members: members || [],
        last_message: lastMsg,
        last_message_at: lastMsg?.created_at,
        unread_count: 0, // Todo: Calculate from current user
        created_at: conv.created_at,
        updated_at: conv.updated_at,
        is_archived: conv.is_archived,
        is_muted: conv.is_muted,
      };
    } catch (error) {
      console.error('❌ Error getting conversation:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  /**
   * Find existing direct conversation between two users
   */
  async findDirectConversation(userId1: string, userId2: string): Promise<Conversation | null> {
    try {
      const { data: conversations, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('type', 'direct');

      if (error) throw error;

      for (const conv of conversations || []) {
        const { data: members } = await supabase
          .from('conversation_members')
          .select('user_id')
          .eq('conversation_id', conv.id);

        const memberIds = members?.map(m => m.user_id) || [];
        if (
          (memberIds.includes(userId1) && memberIds.includes(userId2)) ||
          (memberIds.includes(userId2) && memberIds.includes(userId1))
        ) {
          return await this.getConversation(conv.id);
        }
      }

      return null;
    } catch (error) {
      console.error('❌ Error finding direct conversation:', error);
      return null;
    }
  }

  /**
   * Get user's conversations (both direct and group)
   */
  async getUserConversations(userId: string): Promise<Conversation[]> {
    try {
      const { data: memberData, error: memberError } = await supabase
        .from('conversation_members')
        .select('conversation_id')
        .eq('user_id', userId);

      if (memberError) throw memberError;

      if (!memberData || memberData.length === 0) return [];

      const conversationIds = memberData.map(m => m.conversation_id);

      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .in('id', conversationIds)
        .order('updated_at', { ascending: false });

      if (convError) throw convError;

      const convs: Conversation[] = [];
      for (const conv of conversations || []) {
        convs.push(await this.getConversation(conv.id));
      }

      return convs;
    } catch (error) {
      console.error('❌ Error getting user conversations:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      return [];
    }
  }

  /**
   * Send message
   */
  async sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    content: string,
    messageType: 'text' | 'image' | 'file' | 'location' = 'text',
    senderAvatar?: string
  ): Promise<ChatMessage> {
    try {
      const messageId = crypto.randomUUID();

      const { data, error } = await supabase.from('messages').insert({
        id: messageId,
        conversation_id: conversationId,
        sender_id: senderId,
        sender_name: senderName,
        sender_avatar: senderAvatar,
        content,
        message_type: messageType,
        is_sent: true,
        created_at: new Date().toISOString(),
      }).select().single();

      if (error) {
        console.error('❌ Supabase error details:', error);
        throw error;
      }

      // Update conversation updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      return {
        id: messageId,
        conversation_id: conversationId,
        sender_id: senderId,
        sender_name: senderName,
        sender_avatar: senderAvatar,
        content,
        message_type: messageType,
        reactions: [],
        created_at: new Date().toISOString(),
        is_sent: true,
      };
    } catch (error) {
      console.error('❌ Error sending message:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  /**
   * Get messages in conversation
   */
  async getMessages(conversationId: string, limit = 50): Promise<ChatMessage[]> {
    try {
      // Check cache first
      if (this.messageCache.has(conversationId)) {
        return this.messageCache.get(conversationId) || [];
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) throw error;

      const messages = (data || []) as ChatMessage[];
      this.messageCache.set(conversationId, messages);
      return messages;
    } catch (error) {
      console.error('❌ Error getting messages:', error);
      return [];
    }
  }

  /**
   * Subscribe to messages in real-time
   */
  subscribeToMessages(
    conversationId: string,
    callback: (messages: ChatMessage[]) => void
  ): () => void {
    try {
      const channel = supabase
        .channel(`messages:${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`,
          },
          async () => {
            const messages = await this.getMessages(conversationId);
            this.messageCache.set(conversationId, messages);
            callback(messages);
          }
        )
        .subscribe();

      // Store subscription for cleanup
      if (!this.conversationSubscriptions.has(conversationId)) {
        this.conversationSubscriptions.set(conversationId, []);
      }
      this.conversationSubscriptions.get(conversationId)!.push(() => {
        supabase.removeChannel(channel);
      });

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (error) {
      console.error('❌ Error subscribing to messages:', error);
      return () => {};
    }
  }

  /**
   * Send typing indicator
   */
  async sendTypingIndicator(
    conversationId: string,
    userId: string,
    userName: string
  ): Promise<void> {
    try {
      // Clear existing timeout
      const key = `${conversationId}:${userId}`;
      if (this.typingTimeouts.has(key)) {
        clearTimeout(this.typingTimeouts.get(key)!);
      }

      // Broadcast typing indicator
      const channel = supabase.channel(`typing:${conversationId}`);
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user_id: userId, user_name: userName },
      });

      // Auto-clear after 3 seconds
      const timeout = setTimeout(() => {
        this.typingTimeouts.delete(key);
      }, 3000);

      this.typingTimeouts.set(key, timeout);
    } catch (error) {
      console.error('⚠️ Error sending typing indicator:', error);
    }
  }

  /**
   * React to message (emoji)
   */
  async reactToMessage(
    messageId: string,
    userId: string,
    emoji: string
  ): Promise<void> {
    try {
      const reactionId = crypto.randomUUID();

      await supabase.from('message_reactions').insert({
        id: reactionId,
        message_id: messageId,
        user_id: userId,
        emoji,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('❌ Error reacting to message:', error);
      throw error;
    }
  }

  /**
   * Mark messages as read
   */
  async markAsRead(conversationId: string, userId: string): Promise<void> {
    try {
      await supabase
        .from('message_reads')
        .insert({
          conversation_id: conversationId,
          user_id: userId,
          read_at: new Date().toISOString(),
        })
        .or(`user_id.eq.${userId},conversation_id.eq.${conversationId}`);
    } catch (error) {
      console.error('⚠️ Error marking messages as read:', error);
    }
  }

  /**
   * Search messages
   */
  async searchMessages(conversationId: string, query: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .ilike('content', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as ChatMessage[];
    } catch (error) {
      console.error('❌ Error searching messages:', error);
      return [];
    }
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId: string, userId: string): Promise<void> {
    try {
      // Verify user owns the message
      const { data: msg } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('id', messageId)
        .single();

      if (msg?.sender_id !== userId) {
        throw new Error('You can only delete your own messages');
      }

      await supabase.from('messages').delete().eq('id', messageId);
    } catch (error) {
      console.error('❌ Error deleting message:', error);
      throw error;
    }
  }

  /**
   * Edit message
   */
  async editMessage(messageId: string, userId: string, newContent: string): Promise<void> {
    try {
      // Verify user owns the message
      const { data: msg } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('id', messageId)
        .single();

      if (msg?.sender_id !== userId) {
        throw new Error('You can only edit your own messages');
      }

      await supabase
        .from('messages')
        .update({
          content: newContent,
          edited_at: new Date().toISOString(),
        })
        .eq('id', messageId);
    } catch (error) {
      console.error('❌ Error editing message:', error);
      throw error;
    }
  }

  /**
   * Invite user to group by email (with permission check)
   */
  async inviteUserByEmail(
    conversationId: string,
    inviterUserId: string,
    inviteeEmail: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Check if inviter is admin
      const { data: inviterMember, error: inviterError } = await supabase
        .from('conversation_members')
        .select('role')
        .eq('conversation_id', conversationId)
        .eq('user_id', inviterUserId)
        .single();

      if (inviterError || !inviterMember) {
        return { success: false, message: 'You are not a member of this conversation' };
      }

      if (inviterMember.role !== 'admin') {
        return { success: false, message: 'Only admins can invite members' };
      }

      // Try to find user in profiles table first
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', inviteeEmail)
        .single();

      let userId: string;
      let userName: string;

      if (profile && !profileError) {
        // User found in profiles
        userId = profile.id;
        userName = profile.name || profile.username || inviteeEmail.split('@')[0];
      } else {
        // Try to find in auth.users via RPC or by querying with a function
        // Since we don't have admin access, we'll search by creating a user search function
        // For now, return error if not in profiles
        return { success: false, message: 'User not found. They must sign up first.' };
      }

      // Check if already member
      const { data: existingMember } = await supabase
        .from('conversation_members')
        .select('*')
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)
        .single();

      if (existingMember) {
        return { success: false, message: 'User is already a member' };
      }

      // Add member
      await this.addMember(conversationId, userId, userName);

      // Send system message about invite
      await this.sendMessage(
        conversationId,
        userId,
        'System',
        `${userName} was added to the group`,
        'text'
      );

      return { success: true, message: `${userName} added to group!` };
    } catch (error) {
      console.error('❌ Error inviting user:', error);
      return { success: false, message: 'Failed to invite user' };
    }
  }

  /**
   * Add user to group conversation
   */
  async addMember(conversationId: string, userId: string, userName: string): Promise<void> {
    try {
      // Check if already a member
      const { data: existing } = await supabase
        .from('conversation_members')
        .select('*')
        .eq('conversation_id', conversationId)
        .eq('user_id', userId);

      if (existing && existing.length > 0) {
        throw new Error('User is already a member');
      }

      await supabase.from('conversation_members').insert({
        conversation_id: conversationId,
        user_id: userId,
        name: userName,
        role: 'member',
        joined_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('❌ Error adding member:', error);
      throw error;
    }
  }

  /**
   * Remove user from group conversation
   */
  async removeMember(conversationId: string, userId: string): Promise<void> {
    try {
      await supabase
        .from('conversation_members')
        .delete()
        .eq('conversation_id', conversationId)
        .eq('user_id', userId);
    } catch (error) {
      console.error('❌ Error removing member:', error);
      throw error;
    }
  }

  /**
   * Cleanup subscriptions
   */
  cleanup(conversationId: string): void {
    const subs = this.conversationSubscriptions.get(conversationId) || [];
    subs.forEach(unsub => {
      try {
        unsub();
      } catch (e) {
        console.error('Error cleaning up subscription:', e);
      }
    });
    this.conversationSubscriptions.delete(conversationId);
    this.messageCache.delete(conversationId);
  }
}

export const modernChatService = new ModerChatService();
