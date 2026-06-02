import {
  directMessageService,
  DirectMessage as DM,
  Conversation,
} from './directMessageService';

// Compatibility layer: older components import "directMessageBackend".
// Expose the methods those components expect by delegating to directMessageService.

export const directMessageBackend = {
  async getConversation(conversationId: string): Promise<Conversation | null> {
    try {
      // directMessageService doesn't have getConversation; use getOrCreateConversation if needed.
      // Here we assume conversationId exists and can be fetched via getUserConversations or getMessages.
      // For a lightweight shim, try to fetch messages and infer conversation data.
      const messages = await directMessageService.getMessages(conversationId, 1, 0);
      if (messages && messages.length > 0) {
        const msg = messages[0] as any;
        return {
          id: conversationId,
          user1_id: msg.sender_id,
          user2_id: msg.receiver_id,
          last_message: msg.content,
          last_message_at: msg.created_at,
          created_at: msg.created_at,
          updated_at: msg.created_at,
        } as Conversation;
      }
      return null;
    } catch (err) {
      console.error('directMessageBackend.getConversation shim error', err);
      return null;
    }
  },

  async getMessages(conversationId: string): Promise<DM[]> {
    return directMessageService.getMessages(conversationId);
  },

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    return directMessageService.markAsRead(conversationId, userId);
  },

  // No real-time PVC here — return an unsubscribe function immediately.
  subscribeToMessages(conversationId: string, cb: (msgs: DM[]) => void) {
    console.warn('subscribeToMessages is a noop in the shim; no realtime backend available');
    // Could implement polling here if needed.
    return () => {
      /* unsubscribe noop */
    };
  },

  async sendMessage(conversationId: string, senderId: string, receiverId: string, content: string, type = 'text') {
    return directMessageService.sendMessage(conversationId, senderId, receiverId, content, type);
  },
};

export default directMessageBackend;
