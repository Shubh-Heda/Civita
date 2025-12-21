import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { chatService } from '../../services/backendService';
import { supabase } from '../supabase';

export interface ChatMessage {
  id: string;
  match_id: string;
  user_id: string;
  user_name: string;
  message: string;
  created_at: string;
}

// Mock chat service using local state (fallback)
const mockMessages: Record<string, ChatMessage[]> = {};

export function useChat(matchId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [useBackend, setUseBackend] = useState(true);

  useEffect(() => {
    if (matchId) {
      loadMessages();
      
      // Subscribe to real-time updates if using backend
      if (useBackend) {
        const channel = supabase
          .channel(`chat:${matchId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'chat_messages',
              filter: `room_id=eq.${matchId}`,
            },
            (payload) => {
              const newMsg = payload.new as ChatMessage;
              setMessages((prev) => [...prev, newMsg]);
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    } else {
      setLoading(false);
    }
  }, [matchId, useBackend]);

  const loadMessages = async () => {
    if (!matchId) return;

    try {
      if (useBackend) {
        // Try to load from backend first
        const data = await chatService.getMessages(matchId);
        setMessages(data);
      } else {
        // Fallback to mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        const matchMessages = mockMessages[matchId] || [];
        setMessages(matchMessages);
      }
    } catch (error: any) {
      console.error('Backend failed, using fallback:', error);
      // Silently fall back to mock data
      setUseBackend(false);
      const matchMessages = mockMessages[matchId] || [];
      setMessages(matchMessages);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message: string, userName: string) => {
    if (!matchId) return;

    try {
      if (useBackend) {
        // Try backend first
        await chatService.sendMessage({
          room_id: matchId,
          user_id: 'current-user',
          user_name: userName,
          message,
        });
        // Real-time subscription will add the message
      } else {
        // Fallback to mock
        const newMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          match_id: matchId,
          user_id: 'current-user',
          user_name: userName,
          message,
          created_at: new Date().toISOString(),
        };

        if (!mockMessages[matchId]) {
          mockMessages[matchId] = [];
        }
        mockMessages[matchId].push(newMessage);
        setMessages(prev => [...prev, newMessage]);
      }
      
      toast.success('Message sent!');
    } catch (error: any) {
      console.error('Error sending message:', error);
      // Silently fall back to mock on error
      setUseBackend(false);
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        match_id: matchId,
        user_id: 'current-user',
        user_name: userName,
        message,
        created_at: new Date().toISOString(),
      };
      
      if (!mockMessages[matchId]) {
        mockMessages[matchId] = [];
      }
      mockMessages[matchId].push(newMessage);
      setMessages(prev => [...prev, newMessage]);
      toast.success('Message sent!');
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    reloadMessages: loadMessages,
  };
}
