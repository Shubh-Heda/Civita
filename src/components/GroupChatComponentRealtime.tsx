import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/AuthProvider';
import { useRealtimeChat } from '../hooks/useRealtimeChat';
import { realGroupChatService, RealGroupChat, ChatMember } from '../services/groupChatServiceReal';
import { Send, Users, Search, Circle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  chatId?: string | null;
  onClose?: () => void;
}

export default function GroupChatComponentRealtime({ chatId, onClose }: Props) {
  const { user } = useAuth();
  const [chats, setChats] = useState<RealGroupChat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId || null);
  const [chat, setChat] = useState<RealGroupChat | null>(null);
  const [members, setMembers] = useState<ChatMember[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement | null>(null);

  // ✨ NEW: Use the real-time chat hook
  const { 
    messages, 
    onlineUsers, 
    isConnected,
    error,
    sendMessage, 
    deleteMessage,
    sendTypingIndicator 
  } = useRealtimeChat(currentChatId || undefined, user?.id);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    (async () => {
      try {
        const list = await realGroupChatService.getUserGroupChats(user.id);
        if (!mounted) return;
        setChats(list || []);
        if (!currentChatId && list && list.length) setCurrentChatId(list[0].id);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const id = currentChatId || chatId;
    if (!id) {
      setLoading(false);
      setChat(null);
      setMembers([]);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const c = await realGroupChatService.getGroupChat(id);
        if (!mounted) return;
        setChat(c || null);

        const m = await realGroupChatService.getMembers(id);
        if (!mounted) return;
        setMembers(m || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load chat');
      } finally {
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [currentChatId, chatId]);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  const send = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !user) return;
    
    try {
      // ✨ NEW: Use the hook's sendMessage function
      await sendMessage(messageInput.trim(), 'text');
      setMessageInput('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message');
    }
  };

  const handleTyping = () => {
    // ✨ NEW: Send typing indicator when user types
    sendTypingIndicator();
  };

  if (loading) return <div className="p-8 text-center">Loading chat...</div>;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Chats</h2>
          {/* ✨ NEW: Connection status indicator */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Circle className={`w-2 h-2 ${isConnected ? 'fill-green-500 text-green-500 animate-pulse' : 'fill-red-500 text-red-500'}`} />
            <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
              {isConnected ? '🟢 Live' : '🔴 Reconnecting...'}
            </span>
          </div>
          {error && (
            <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded text-xs text-red-300">
              {error}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((c) => (
            <div
              key={c.id}
              onClick={() => setCurrentChatId(c.id)}
              className={`p-4 cursor-pointer hover:bg-gray-800 border-b border-gray-800 transition ${
                currentChatId === c.id ? 'bg-gray-800' : ''
              }`}
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-400 truncate">{c.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {chat ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{chat.name}</h2>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {members.length} members
                {/* ✨ NEW: Show online users count */}
                {onlineUsers.size > 0 && (
                  <span className="text-green-500">
                    • {onlineUsers.size} online
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.sender_id === user?.id;
              const isOnline = onlineUsers.has(msg.sender_id);
              
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${isMe ? 'bg-blue-600' : 'bg-gray-800'} rounded-lg p-3`}>
                    {!isMe && (
                      <div className="text-xs font-semibold mb-1 flex items-center gap-2">
                        {(msg as any).sender_name || 'Unknown'}
                        {/* ✨ NEW: Online indicator */}
                        {isOnline && (
                          <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                        )}
                      </div>
                    )}
                    <div className="break-words">{msg.content}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(msg.created_at).toLocaleTimeString()}
                      {/* ✨ NEW: Show if edited or deleted */}
                      {msg.is_edited && ' (edited)'}
                      {msg.is_deleted && ' (deleted)'}
                    </div>
                    {/* ✨ NEW: Delete button for own messages */}
                    {isMe && !msg.is_deleted && (
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="text-xs text-red-400 hover:text-red-300 mt-1"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form onSubmit={send} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  handleTyping(); // ✨ NEW: Send typing indicator
                }}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg px-6 py-2 flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}
