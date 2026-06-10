import React, { useState, useEffect, useRef } from 'react';
import { realGroupChatService } from '../../services/groupChatServiceReal';
import { usersService, supabaseAuth } from '../../services/supabaseAuthService';
import { supabase, supabaseEnabled } from '../../lib/supabaseClient';
import { Send, Search, MoreVertical, Plus, X, Users, ArrowLeft, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  message_type: 'text' | 'system' | 'invite' | 'payment';
  created_at: string;
}

interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;       // true = match group, false = personal DM
  memberCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  description?: string;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface WhatsAppChatProps {
  selectedConversationId?: string;
  onClose?: () => void;
}

// ─── Style tokens ─────────────────────────────────────────────
const C = {
  bg: '#f5f0e8',
  surface: '#fdfaf5',
  border: '#e2d9cc',
  accent: '#5c7a4e',
  accentLight: '#edf4e8',
  accentDim: '#a8c090',
  text: '#2d2416',
  muted: '#7a6a52',
  faint: '#8b7355',
  sent: '#5c7a4e',
  sentText: '#fff',
  received: '#fff',
  receivedText: '#2d2416',
  system: '#f0ebe0',
  systemText: '#8b7355',
};

const font = "'Georgia', serif";
const sans = "'DM Sans', system-ui, sans-serif";

// ─── Helpers ──────────────────────────────────────────────────
function timeAgo(dateStr: string) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'now';
  if (m < 60) return `${m}m`;
  if (m < 1440) return `${Math.floor(m / 60)}h`;
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function initials(name: string) {
  return name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({ name, size = 40, isGroup = false }: { name: string; size?: number; isGroup?: boolean }) {
  const colors = ['#5c7a4e', '#4a6ea8', '#8b5c7a', '#7a5c4e', '#4e7a6e'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: isGroup ? 'linear-gradient(135deg, #5c7a4e, #3d5c30)' : color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.35,
      fontFamily: sans, flexShrink: 0,
    }}>
      {isGroup ? <Users size={size * 0.4} /> : initials(name)}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ selectedConversationId, onClose }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [showNewDM, setShowNewDM] = useState(false);
  const [dmEmail, setDmEmail] = useState('');
  const [dmSearching, setDmSearching] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // ── Load current user ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const user = await supabaseAuth.getCurrentUser();
        if (!user) return;
        const { data: profile } = await usersService.getUserProfile(user.id);
        setCurrentUser({
          id: user.id,
          name: (profile as any)?.name || (profile as any)?.displayName || user.email?.split('@')[0] || 'You',
          email: user.email || '',
          avatar: (profile as any)?.avatar_url,
        });
      } catch (e) {
        console.error('Error loading user:', e);
      }
    })();
  }, []);

  // ── Load conversations ─────────────────────────────────────
  useEffect(() => {
    if (!currentUser) return;
    loadConversations();
  }, [currentUser]);

  const loadConversations = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);

      // Get all group chats user is member of (includes personal chats & match groups)
      let chats: any[] = [];

      if (!supabaseEnabled || !supabase) {
        // Demo mode: read localStorage
        const localChats = JSON.parse(localStorage.getItem('local_group_chats') || '[]');
        const localMembers = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        const localMessages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');

        const myChatIds = localMembers
          .filter((m: any) => m.user_id === currentUser.id && m.is_active)
          .map((m: any) => m.group_chat_id);

        chats = localChats
          .filter((c: any) => myChatIds.includes(c.id))
          .map((c: any) => {
            const members = localMembers.filter((m: any) => m.group_chat_id === c.id && m.is_active);
            const msgs = localMessages.filter((m: any) => m.group_chat_id === c.id);
            const lastMsg = msgs[msgs.length - 1];
            return {
              id: c.id,
              name: c.name,
              isGroup: !!c.match_id || members.length > 2,
              memberCount: members.length,
              lastMessage: lastMsg?.content,
              lastMessageTime: lastMsg?.created_at || c.updated_at,
              description: c.description,
            };
          });
      } else {
        // Supabase mode
        const { data: memberships } = await supabase
          .from('chat_members')
          .select('group_chat_id')
          .eq('user_id', currentUser.id)
          .eq('is_active', true);

        if (memberships && memberships.length > 0) {
          const chatIds = memberships.map((m: any) => m.group_chat_id);

          const { data: groupChats } = await supabase
            .from('group_chats')
            .select('*')
            .in('id', chatIds)
            .order('updated_at', { ascending: false });

          chats = await Promise.all((groupChats || []).map(async (c: any) => {
            const { data: members } = await supabase!
              .from('chat_members')
              .select('user_id')
              .eq('group_chat_id', c.id)
              .eq('is_active', true);

            const { data: lastMsgs } = await supabase!
              .from('chat_messages')
              .select('content, created_at, sender_name')
              .eq('group_chat_id', c.id)
              .order('created_at', { ascending: false })
              .limit(1);

            const lastMsg = lastMsgs?.[0];
            const mCount = members?.length || 0;

            return {
              id: c.id,
              name: c.name,
              isGroup: !!c.match_id || mCount > 2,
              memberCount: mCount,
              lastMessage: lastMsg?.content,
              lastMessageTime: lastMsg?.created_at || c.updated_at,
              description: c.description,
            };
          }));
        }
      }

      // Sort by most recent activity
      chats.sort((a, b) =>
        new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime()
      );

      setConversations(chats);

      // Auto-select if prop provided
      if (selectedConversationId) {
        const found = chats.find(c => c.id === selectedConversationId);
        if (found) selectChat(found);
      }
    } catch (e) {
      console.error('Error loading conversations:', e);
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  // ── Load messages for selected chat ───────────────────────
  useEffect(() => {
    if (!selectedChat || !currentUser) return;

    // Unsubscribe from previous
    unsubscribeRef.current?.();

    (async () => {
      try {
        const msgs = await realGroupChatService.getMessages(selectedChat.id);
        setMessages(msgs as ChatMessage[]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

        // Subscribe to new messages using modern Supabase API
        if (supabaseEnabled && supabase) {
          const channel = supabase
            .channel(`chat:${selectedChat.id}`)
            .on('postgres_changes', {
              event: 'INSERT',
              schema: 'public',
              table: 'chat_messages',
              filter: `group_chat_id=eq.${selectedChat.id}`,
            }, async () => {
              const fresh = await realGroupChatService.getMessages(selectedChat.id);
              setMessages(fresh as ChatMessage[]);
              setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
            })
            .subscribe();

          unsubscribeRef.current = () => supabase.removeChannel(channel);
        } else {
          // Demo mode: poll localStorage every 2s
          const interval = setInterval(async () => {
            const fresh = await realGroupChatService.getMessages(selectedChat.id);
            setMessages(fresh as ChatMessage[]);
          }, 2000);
          unsubscribeRef.current = () => clearInterval(interval);
        }
      } catch (e) {
        console.error('Error loading messages:', e);
      }
    })();

    return () => { unsubscribeRef.current?.(); };
  }, [selectedChat?.id]);

  const selectChat = (chat: Conversation) => {
    setSelectedChat(chat);
    setMessages([]);
    setMobileChatOpen(true);
  };

  // ── Send message ───────────────────────────────────────────
  const handleSend = async () => {
    if (!messageInput.trim() || !selectedChat || !currentUser || sending) return;
    const content = messageInput.trim();
    setMessageInput('');

    // Optimistic update
    const optimistic: ChatMessage = {
      id: `opt-${Date.now()}`,
      sender_id: currentUser.id,
      sender_name: currentUser.name,
      content,
      message_type: 'text',
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

    try {
      setSending(true);
      await realGroupChatService.sendMessage(
        selectedChat.id,
        currentUser.id,
        currentUser.name,
        content,
        'text',
        currentUser.avatar
      );

      // Refresh conversations to update last message
      loadConversations();
    } catch (e) {
      console.error('Error sending message:', e);
      toast.error('Failed to send');
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
    } finally {
      setSending(false);
    }
  };

  // ── Start DM ───────────────────────────────────────────────
  const handleStartDM = async () => {
    if (!dmEmail.trim() || !currentUser) return;
    try {
      setDmSearching(true);
      const users = await usersService.searchUsers(dmEmail.trim());
      if (!users || users.length === 0) { toast.error('User not found'); return; }

      const target = users[0] as any;
      const targetName = target.name || target.displayName || target.email?.split('@')[0] || 'User';

      const chat = await realGroupChatService.getOrCreatePersonalChat(
        currentUser.id, currentUser.name, currentUser.email,
        target.id, targetName, target.email || ''
      );

      const conv: Conversation = {
        id: chat.id,
        name: targetName,
        isGroup: false,
        memberCount: 2,
      };

      setConversations(prev => {
        const exists = prev.find(c => c.id === chat.id);
        return exists ? prev : [conv, ...prev];
      });

      selectChat(conv);
      setShowNewDM(false);
      setDmEmail('');
      toast.success(`Chat started with ${targetName}`);
    } catch (e) {
      console.error('Error starting DM:', e);
      toast.error('Failed to start chat');
    } finally {
      setDmSearching(false);
    }
  };

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex', height: '100vh',
      background: C.bg, fontFamily: sans, overflow: 'hidden',
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 320, flexShrink: 0,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column',
        ...(mobileChatOpen ? { display: 'none' } : {}),
      }}
        className="chat-sidebar"
      >
        {/* Sidebar header */}
        <div style={{
          padding: '1rem 1.25rem 0.75rem',
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {onClose && (
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.accent, display: 'flex' }}>
                  <ArrowLeft size={18} />
                </button>
              )}
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: '1.1rem', color: C.text }}>Messages</span>
            </div>
            <button onClick={() => setShowNewDM(true)} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: C.accentLight, border: `1px solid ${C.accentDim}`,
              borderRadius: 8, padding: '0.4rem 0.75rem',
              color: C.accent, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
            }}>
              <Plus size={14} /> New Chat
            </button>
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: C.faint }} />
            <input
              style={{
                width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 8, fontSize: '0.85rem', color: C.text,
                outline: 'none', boxSizing: 'border-box',
              }}
              placeholder="Search chats…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: C.muted, fontSize: '0.875rem' }}>
              Loading chats…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <MessageSquare size={32} style={{ color: C.border, margin: '0 auto 0.75rem' }} />
              <p style={{ color: C.muted, fontSize: '0.875rem', margin: 0 }}>No chats yet</p>
              <p style={{ color: C.faint, fontSize: '0.78rem', marginTop: '0.3rem' }}>
                Start a DM or join a match to see chats here
              </p>
            </div>
          ) : filtered.map(conv => (
            <div key={conv.id} onClick={() => selectChat(conv)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.7rem 1.25rem', cursor: 'pointer',
              background: selectedChat?.id === conv.id ? C.accentLight : 'transparent',
              borderLeft: selectedChat?.id === conv.id ? `3px solid ${C.accent}` : '3px solid transparent',
              transition: 'all 0.15s',
            }}>
              <Avatar name={conv.name} size={42} isGroup={conv.isGroup} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>
                    {conv.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: C.faint, flexShrink: 0, marginLeft: '0.5rem' }}>
                    {conv.lastMessageTime ? timeAgo(conv.lastMessageTime) : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {conv.isGroup && (
                    <span style={{ fontSize: '0.65rem', background: C.accentLight, color: C.accent, padding: '0.1rem 0.4rem', borderRadius: 100, fontWeight: 700, flexShrink: 0 }}>
                      Group
                    </span>
                  )}
                  <p style={{ margin: 0, fontSize: '0.78rem', color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.lastMessage || conv.description || 'No messages yet'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat area ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: '#fafaf7', overflow: 'hidden',
      }}>
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div style={{
              padding: '0.85rem 1.5rem',
              background: C.surface,
              borderBottom: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <button
                onClick={() => setMobileChatOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.accent, display: 'flex' }}
                className="back-to-list"
              >
                <ArrowLeft size={18} />
              </button>
              <Avatar name={selectedChat.name} size={38} isGroup={selectedChat.isGroup} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font, fontWeight: 700, color: C.text, fontSize: '0.95rem' }}>{selectedChat.name}</div>
                <div style={{ fontSize: '0.72rem', color: C.muted }}>
                  {selectedChat.isGroup
                    ? `${selectedChat.memberCount || 0} members`
                    : 'Personal chat'}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '1rem 1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}>
              {messages.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.muted }}>
                  <MessageSquare size={40} style={{ color: C.border, marginBottom: '0.75rem' }} />
                  <p style={{ fontFamily: font, fontSize: '0.95rem', margin: 0 }}>No messages yet</p>
                  <p style={{ fontSize: '0.8rem', color: C.faint, marginTop: '0.3rem' }}>Say hello 👋</p>
                </div>
              ) : messages.map(msg => {
                const isMine = msg.sender_id === currentUser?.id;
                const isSystem = msg.message_type === 'system';

                if (isSystem) return (
                  <div key={msg.id} style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                    <span style={{
                      display: 'inline-block',
                      background: C.system, color: C.systemText,
                      fontSize: '0.72rem', padding: '0.25rem 0.75rem',
                      borderRadius: 100, fontStyle: 'italic',
                    }}>{msg.content}</span>
                  </div>
                );

                return (
                  <div key={msg.id} style={{
                    display: 'flex',
                    justifyContent: isMine ? 'flex-end' : 'flex-start',
                    animation: 'msgIn 0.2s ease',
                  }}>
                    <div style={{ maxWidth: '65%' }}>
                      {!isMine && selectedChat.isGroup && (
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: C.accent, marginBottom: '0.2rem', paddingLeft: '0.1rem' }}>
                          {msg.sender_name}
                        </div>
                      )}
                      <div style={{
                        padding: '0.6rem 0.9rem',
                        borderRadius: isMine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: isMine ? C.sent : C.received,
                        color: isMine ? C.sentText : C.receivedText,
                        fontSize: '0.9rem', lineHeight: 1.45,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                        border: isMine ? 'none' : `1px solid ${C.border}`,
                        wordBreak: 'break-word',
                      }}>
                        {msg.content}
                      </div>
                      <div style={{
                        fontSize: '0.65rem', color: C.faint,
                        marginTop: '0.2rem',
                        textAlign: isMine ? 'right' : 'left',
                        paddingLeft: '0.1rem',
                      }}>
                        {new Date(msg.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '0.85rem 1.25rem',
              background: C.surface,
              borderTop: `1px solid ${C.border}`,
              display: 'flex', gap: '0.75rem', alignItems: 'center',
            }}>
              <input
                style={{
                  flex: 1, padding: '0.7rem 1rem',
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 24, fontSize: '0.9rem', color: C.text,
                  outline: 'none', fontFamily: sans,
                }}
                placeholder="Type a message…"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button
                onClick={handleSend}
                disabled={!messageInput.trim() || sending}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: messageInput.trim() ? C.sent : C.border,
                  border: 'none', cursor: messageInput.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s', flexShrink: 0,
                }}
              >
                <Send size={16} color="#fff" />
              </button>
            </div>
          </>
        ) : (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', color: C.muted,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <MessageSquare size={36} style={{ color: C.accent }} />
            </div>
            <h2 style={{ fontFamily: font, color: C.text, margin: '0 0 0.4rem', fontSize: '1.2rem' }}>Your Messages</h2>
            <p style={{ color: C.muted, fontSize: '0.875rem', margin: '0 0 1.5rem', textAlign: 'center', maxWidth: 260 }}>
              Select a chat from the sidebar, or start a new conversation
            </p>
            <button onClick={() => setShowNewDM(true)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: C.sent, color: '#fff', border: 'none',
              borderRadius: 10, padding: '0.7rem 1.25rem',
              fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: sans,
            }}>
              <Plus size={16} /> Start New Chat
            </button>
          </div>
        )}
      </div>

      {/* ── New DM modal ── */}
      {showNewDM && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(4px)',
        }} onClick={() => setShowNewDM(false)}>
          <div style={{
            background: C.surface, borderRadius: 16,
            padding: '1.5rem', width: 380, maxWidth: '90vw',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            border: `1px solid ${C.border}`,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: '1rem', color: C.text }}>Start a conversation</span>
              <button onClick={() => setShowNewDM(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.82rem', color: C.muted, margin: '0 0 0.75rem' }}>
              Enter the email of someone on Civita to start chatting
            </p>
            <input
              type="email"
              style={{
                width: '100%', padding: '0.7rem 1rem',
                background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 10, fontSize: '0.9rem', color: C.text,
                outline: 'none', boxSizing: 'border-box', marginBottom: '0.75rem',
              }}
              placeholder="user@example.com"
              value={dmEmail}
              onChange={e => setDmEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStartDM()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowNewDM(false)} style={{
                padding: '0.6rem 1rem', background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 8, fontSize: '0.875rem', color: C.muted, cursor: 'pointer',
              }}>Cancel</button>
              <button
                onClick={handleStartDM}
                disabled={!dmEmail.trim() || dmSearching}
                style={{
                  padding: '0.6rem 1.25rem',
                  background: dmEmail.trim() ? C.sent : C.border,
                  border: 'none', borderRadius: 8,
                  fontSize: '0.875rem', fontWeight: 700,
                  color: '#fff', cursor: dmEmail.trim() ? 'pointer' : 'default',
                }}
              >
                {dmSearching ? 'Finding…' : 'Start Chat'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes msgIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 640px) {
          .chat-sidebar { display: flex !important; width: 100% !important; }
          .back-to-list { display: flex !important; }
        }
        @media (min-width: 641px) {
          .back-to-list { display: none !important; }
          .chat-sidebar { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppChat;