import { groupChatService } from './groupChatService';

// Lightweight compatibility shim for legacy `chatService` API used by some components.
const chatService = {
  async createRoom(opts: any) {
    // Use related_id as matchId if provided, otherwise generate an id
    const matchId = opts.related_id || `room-${Date.now()}`;
    const name = opts.name || opts.title || `Room ${matchId}`;
    const description = opts.description || '';

    // Use createMatchGroupChat to create a chat-like object in local storage
    const chat = await groupChatService.createMatchGroupChat(matchId, name, 0, 'system', 'System', 'system@example.com');
    return chat;
  },

  async sendMessage(roomId: string, content: string, type: string = 'text') {
    // Use 'system' as sender for shim operations
    return groupChatService.sendMessage(roomId, 'system', 'System', content, type as any);
  },
};

export default chatService;
