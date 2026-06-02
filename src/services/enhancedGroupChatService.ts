import { realGroupChatService } from './groupChatServiceReal';

// Minimal compatibility shim providing the small enhanced API surface
export const enhancedGroupChatService = {
  getGroupChatMessages: async (groupId: string) => {
    return realGroupChatService.getMessages(groupId);
  },

  subscribeToGroupMessages: (groupId: string, cb: (msgs: any[]) => void) => {
    return realGroupChatService.subscribeToMessages(groupId, cb);
  },

  markMessagesAsRead: async (groupId: string, userId: string) => {
    // No-op for compatibility; real implementation may update read receipts
    return Promise.resolve();
  },

  postMessage: async (groupId: string, senderId: string, senderName: string, content: string, messageType = 'text') => {
    return realGroupChatService.sendMessage(groupId, senderId, senderName, content, messageType as any);
  },
};

export default enhancedGroupChatService;
