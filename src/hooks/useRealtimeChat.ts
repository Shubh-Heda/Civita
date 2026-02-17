import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  created_at: string;
  sender?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
}

export function useRealtimeChat(roomId: string | undefined, userId: string | undefined) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isTyping, setIsTyping] = useState<Map<string, boolean>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    if (!roomId || !userId || !supabase) {
      console.warn('⚠️ Missing required data:', { roomId, userId, supabase: !!supabase });
      return;
    }

    console.log('🚀 Initializing realtime chat for room:', roomId);

    // Load initial messages
    loadMessages();

    // Create a unique channel for this room with detailed config
    const roomChannel = supabase.channel(`room:${roomId}:${Date.now()}`, {
      config: {
        presence: {
          key: userId,
        },
        broadcast: {
          self: false,
        },
      },
    });

    console.log('📡 Setting up realtime subscriptions...');

    // Listen for new messages
    roomChannel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          console.log('✅ New message received via websocket:', payload);
          
          try {
            // Fetch sender info
            const { data: sender } = await supabase
              .from('profiles')
              .select('id, full_name:name, avatar_url')
              .eq('user_id', payload.new.sender_id)
              .single();

            const newMessage: ChatMessage = {
              ...(payload.new as any),
              sender,
            };

            setMessages((prev) => {
              // Avoid duplicates
              if (prev.some(m => m.id === newMessage.id)) {
                return prev;
              }
              return [...prev, newMessage];
            });
          } catch (error) {
            console.error('Error processing new message:', error);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('📝 Message updated:', payload);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === payload.new.id ? { ...msg, ...(payload.new as any) } : msg
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log('🗑️ Message deleted:', payload);
          setMessages((prev) => prev.filter((msg) => msg.id !== payload.old.id));
        }
      )
      .on('presence', { event: 'sync' }, () => {
        const state = roomChannel.presenceState();
        const users = new Set(Object.keys(state));
        setOnlineUsers(users);
        console.log('👥 Online users synced:', Array.from(users));
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        console.log('👤 User joined:', key);
        setOnlineUsers((prev) => new Set([...prev, key]));
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('👋 User left:', key);
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      })
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        const typingUserId = payload.user_id;
        if (typingUserId !== userId) {
          setIsTyping((prev) => {
            const newMap = new Map(prev);
            newMap.set(typingUserId, true);
            return newMap;
          });

          // Clear typing indicator after 3 seconds
          setTimeout(() => {
            setIsTyping((prev) => {
              const newMap = new Map(prev);
              newMap.delete(typingUserId);
              return newMap;
            });
          }, 3000);
        }
      })
      .subscribe(async (status, err) => {
        console.log('📡 Realtime subscription status:', status);
        
        if (err) {
          console.error('❌ Subscription error:', err);
          setError(err.message);
          setIsConnected(false);
          
          // Attempt to reconnect
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current++;
            console.log(`🔄 Reconnect attempt ${reconnectAttempts.current}/${maxReconnectAttempts}`);
            setTimeout(() => {
              roomChannel.subscribe();
            }, 2000 * reconnectAttempts.current);
          }
          return;
        }
        
        if (status === 'SUBSCRIBED') {
          console.log('✅ Successfully subscribed to room:', roomId);
          setIsConnected(true);
          setError(null);
          reconnectAttempts.current = 0;
          
          // Track user presence
          try {
            await roomChannel.track({
              user_id: userId,
              online_at: new Date().toISOString(),
            });
            console.log('📍 User presence tracked');
          } catch (error) {
            console.error('Error tracking presence:', error);
          }
        } else if (status === 'CLOSED') {
          console.warn('⚠️ Channel closed');
          setIsConnected(false);
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Channel error');
          setIsConnected(false);
          setError('Connection error');
        } else if (status === 'TIMED_OUT') {
          console.error('⏱️ Connection timed out');
          setIsConnected(false);
          setError('Connection timed out');
        }
      });

    setChannel(roomChannel);

    // Cleanup
    return () => {
      console.log('🔌 Unsubscribing from room:', roomId);
      roomChannel.unsubscribe();
    };
  }, [roomId, userId]);

  // Load initial messages
  const loadMessages = async () => {
    if (!roomId || !supabase) return;
    
    try {
      console.log('📥 Loading initial messages for room:', roomId);
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender:profiles!chat_messages_sender_id_fkey(id, full_name:name, avatar_url)
        `)
        .eq('room_id', roomId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error('❌ Error loading messages:', error);
        throw error;
      }
      
      console.log('✅ Loaded', data?.length || 0, 'initial messages');
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  };

  // Send message function
  const sendMessage = async (content: string, messageType: string = 'text') => {
    if (!content.trim() || !roomId || !userId || !supabase) {
      console.error('❌ Cannot send message: missing required data');
      return;
    }

    console.log('📤 Sending message:', content.substring(0, 50));
    
    try {
      const { data, error } = await supabase.from('chat_messages').insert({
        room_id: roomId,
        sender_id: userId,
        content: content.trim(),
        message_type: messageType,
      }).select().single();

      if (error) {
        console.error('❌ Error sending message:', error);
        throw error;
      }
      
      console.log('✅ Message sent successfully');
      return data;
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  };

  // Send typing indicator
  const sendTypingIndicator = async () => {
    if (channel) {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'typing',
          payload: { user_id: userId },
        }, { skipSubscriptionCheck: true });
      } catch (error) {
        console.warn('⚠️ Typing indicator failed:', error);
        // Fallback - not critical if this fails
      }
    }
  };

  // Delete message
  const deleteMessage = async (messageId: string) => {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('chat_messages')
      .update({ is_deleted: true, content: '[deleted]' })
      .eq('id', messageId)
      .eq('sender_id', userId);

    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  };

  // Get typing users
  const getTypingUsers = () => {
    return Array.from(isTyping.entries())
      .filter(([_, isTyping]) => isTyping)
      .map(([userId]) => userId);
  };

  return {
    messages,
    onlineUsers,
    isConnected,
    error,
    sendMessage,
    sendTypingIndicator,
    deleteMessage,
    getTypingUsers,
    loadMessages,
  };
}
