/**
 * ModernChat — Premium warm earthy chat UI
 * Backend: realGroupChatService → conversations / conversation_members / messages
 * Realtime: Supabase postgres_changes (modern API)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { realGroupChatService } from '../services/groupChatServiceReal';
import { usersService } from '../services/supabaseAuthService';
import { supabase, supabaseEnabled } from '../lib/supabaseClient';
import { Send, Search, Plus, X, ArrowLeft, Users, MessageSquare, Hash, Lock } from 'lucide-react';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name?: string;   // not in DB — resolved from members or optimistic
  sender_avatar?: string; // not in DB — optimistic only
  content: string;
  message_type: 'text' | 'system' | 'invite' | 'payment';
  is_deleted?: boolean;
  created_at: string;
}

interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  memberCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  description?: string;
  chatType?: string;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ModernChatProps {
  selectedConversationId?: string;
  currentUser?: { id: string; name?: string; email?: string };
  onClose?: () => void;
}

// ─── Design tokens ────────────────────────────────────────────
const C = {
  // Sidebar
  sidebarBg: '#1a1510',
  sidebarBorder: '#2d2416',
  sidebarHover: '#241e14',
  sidebarActive: '#2d2416',
  sidebarActiveBar: '#8b7355',

  // Chat area
  chatBg: '#f5f0e8',
  chatPattern: 'rgba(139,115,85,0.04)',
  inputBg: '#fdfaf5',
  inputBorder: '#e2d9cc',

  // Bubbles
  sentBg: '#4a6640',
  sentText: '#f0f5ed',
  receivedBg: '#fdfaf5',
  receivedText: '#2d2416',
  receivedBorder: '#e2d9cc',

  // System
  systemBg: 'rgba(139,115,85,0.12)',
  systemText: '#8b7355',

  // Accents
  accent: '#8b7355',
  accentGreen: '#4a6640',
  accentLight: '#f0ebe0',

  // Text
  textPrimary: '#f0e8d8',
  textSecondary: '#8b7355',
  textMuted: '#5a4e3a',
};

const font = "'Georgia', 'Times New Roman', serif";
const sans = "'DM Sans', system-ui, -apple-system, sans-serif";

// ─── Helpers ──────────────────────────────────────────────────
function timeAgo(d: string) {
  if (!d) return '';
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'now';
  if (m < 60) return `${m}m`;
  if (m < 1440) return `${Math.floor(m / 60)}h`;
  if (m < 10080) return new Date(d).toLocaleDateString('en-IN', { weekday: 'short' });
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function initials(n: string) {
  return (n || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({ name, size = 40, isGroup = false, chatType }: { name: string; size?: number; isGroup?: boolean; chatType?: string }) {
  const earthyColors = ['#5c4a30', '#4a6640', '#6b4e3d', '#3d5c6b', '#6b5c3d'];
  const col = earthyColors[(name?.charCodeAt(0) || 0) % earthyColors.length];

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: isGroup
        ? 'linear-gradient(135deg, #3d5c30 0%, #2d4422 100%)'
        : col,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#f0e8d8', fontWeight: 700,
      fontSize: size * 0.36, fontFamily: sans,
      border: '1.5px solid rgba(255,255,255,0.08)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }}>
      {isGroup
        ? (chatType === 'match' ? <Hash size={size * 0.38} /> : <Users size={size * 0.38} />)
        : initials(name)
      }
    </div>
  );
}

// ─── Date separator ───────────────────────────────────────────
function DateSeparator({ date }: { date: string }) {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  let label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  if (d.toDateString() === today.toDateString()) label = 'Today';
  else if (d.toDateString() === yesterday.toDateString()) label = 'Yesterday';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0 0.5rem' }}>
      <div style={{ flex: 1, height: 1, background: C.inputBorder }} />
      <span style={{ fontSize: '0.7rem', color: C.accent, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: C.inputBorder }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────
export const ModernChat: React.FC<ModernChatProps> = ({ selectedConversationId, currentUser: appUser, onClose }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<Record<string, string>>({}); // userId → name
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDM, setShowNewDM] = useState(false);
  const [dmEmail, setDmEmail] = useState('');
  const [dmSearching, setDmSearching] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubRef = useRef<(() => void) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Resolve user ─────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const FAKE = ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'];
        if (appUser?.id && !FAKE.includes(appUser.id)) {
          setCurrentUser({ id: appUser.id, name: appUser.name || appUser.email?.split('@')[0] || 'User', email: appUser.email || '' });
          return;
        }
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setCurrentUser({
              id: session.user.id,
              name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: session.user.user_metadata?.avatar_url,
            });
            return;
          }
        }
        const raw = localStorage.getItem('civita_current_user') || localStorage.getItem('civta_current_user');
        if (raw) { const u = JSON.parse(raw); setCurrentUser({ id: u.id, name: u.name || u.email?.split('@')[0] || 'User', email: u.email || '' }); }
      } catch (e) { console.error('resolveUser:', e); }
    })();
  }, [appUser]);

  // ── Load conversations ────────────────────────────────────
  const loadConversations = useCallback(async () => {
    if (!currentUser) return;
    setLoadingConvs(true);
    try {
      let rows: Conversation[] = [];

      if (!supabaseEnabled || !supabase) {
        const localChats = JSON.parse(localStorage.getItem('local_group_chats') || '[]');
        const localMembers = JSON.parse(localStorage.getItem('local_chat_members') || '[]');
        const localMessages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        const myChatIds = localMembers.filter((m: any) => m.user_id === currentUser.id).map((m: any) => m.conversation_id || m.group_chat_id);
        rows = localChats.filter((c: any) => myChatIds.includes(c.id)).map((c: any) => {
          const members = localMembers.filter((m: any) => (m.conversation_id || m.group_chat_id) === c.id);
          const msgs = localMessages.filter((m: any) => m.conversation_id === c.id);
          const last = msgs[msgs.length - 1];
          return { id: c.id, name: c.name, isGroup: c.type === 'group' || members.length > 2, chatType: c.type || c.chat_type, memberCount: members.length, lastMessage: last?.content, lastMessageTime: last?.created_at || c.updated_at, description: c.description };
        });
      } else {
        const { data: memberships } = await supabase.from('conversation_members').select('conversation_id').eq('user_id', currentUser.id);
        if (memberships?.length) {
          const ids = memberships.map((m: any) => m.conversation_id);
          const { data: chats } = await supabase.from('conversations').select('*').in('id', ids).order('updated_at', { ascending: false });
          rows = await Promise.all((chats || []).map(async (c: any) => {
            const { data: mems } = await supabase!.from('conversation_members').select('user_id').eq('conversation_id', c.id);
            const { data: lastMsgs } = await supabase!.from('messages').select('content,created_at').eq('conversation_id', c.id).eq('is_deleted', false).order('created_at', { ascending: false }).limit(1);
            const last = lastMsgs?.[0];
            return {
              id: c.id, name: c.name, chatType: c.type,
              isGroup: c.type === 'group' || (mems?.length || 0) > 2,
              memberCount: mems?.length || 0,
              lastMessage: last?.content,
              lastMessageTime: last?.created_at || c.updated_at,
              description: c.description,
            };
          }));
        }
      }

      rows.sort((a, b) => new Date(b.lastMessageTime || 0).getTime() - new Date(a.lastMessageTime || 0).getTime());
      setConversations(rows);

      if (selectedConversationId) {
        const found = rows.find(c => c.id === selectedConversationId);
        if (found) selectChat(found);
      }
    } catch (e) { console.error('loadConversations:', e); }
    finally { setLoadingConvs(false); }
  }, [currentUser, selectedConversationId]);

  useEffect(() => { if (currentUser) loadConversations(); }, [currentUser]);

  // ── Load messages + subscribe ─────────────────────────────
  useEffect(() => {
    if (!selectedConv || !currentUser) return;
    unsubRef.current?.();
    setLoadingMsgs(true);
    setMembers({});

    (async () => {
      try {
        // Load members for sender name resolution
        const chatMembers = await realGroupChatService.getMembers(selectedConv.id);
        const memberMap: Record<string, string> = {};
        chatMembers.forEach((m: any) => { memberMap[m.user_id] = m.user_name; });
        setMembers(memberMap);
        const msgs = await realGroupChatService.getMessages(selectedConv.id);
        setMessages(msgs as ChatMessage[]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
      } catch (e) { console.error('loadMessages:', e); }
      finally { setLoadingMsgs(false); }

      // Supabase Realtime
      if (supabaseEnabled && supabase) {
        const channel = supabase
          .channel(`chat-room-${selectedConv.id}`)
          .on('postgres_changes', {
            event: 'INSERT', schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${selectedConv.id}`,
          }, async (payload) => {
            const raw = payload.new as any;
            // sender_name is not stored in DB — resolve from members or use fallback
            const newMsg: ChatMessage = {
              ...raw,
              sender_name: raw.sender_name || currentUser?.id === raw.sender_id
                ? currentUser?.name
                : raw.sender_id,
            };
            setMessages(prev => {
              // Replace optimistic message if same sender+content within 5s, else append
              const optIdx = prev.findIndex(
                m => m.id.startsWith('opt-') &&
                  m.sender_id === newMsg.sender_id &&
                  m.content === newMsg.content &&
                  Math.abs(new Date(m.created_at).getTime() - new Date(newMsg.created_at).getTime()) < 5000
              );
              if (optIdx !== -1) {
                const next = [...prev];
                next[optIdx] = newMsg;
                return next;
              }
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
            loadConversations();
          })
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') console.log('✅ Realtime subscribed:', selectedConv.id);
          });
        unsubRef.current = () => supabase.removeChannel(channel);
      } else {
        // Demo mode: poll localStorage every 1.5s
        const iv = setInterval(async () => {
          const fresh = await realGroupChatService.getMessages(selectedConv.id);
          setMessages(fresh as ChatMessage[]);
        }, 1500);
        unsubRef.current = () => clearInterval(iv);
      }
    })();

    return () => { unsubRef.current?.(); };
  }, [selectedConv?.id]);

  const selectChat = (c: Conversation) => {
    setSelectedConv(c);
    setMessages([]);
    setMobileChatOpen(true);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // ── Send ──────────────────────────────────────────────────
  const handleSend = async () => {
    if (!messageInput.trim() || !selectedConv || !currentUser || sending) return;
    const content = messageInput.trim();
    setMessageInput('');

    // Optimistic update
    const optId = `opt-${Date.now()}`;
    const optimistic: ChatMessage = {
      id: optId, sender_id: currentUser.id, sender_name: currentUser.name,
      content, message_type: 'text', created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 30);

    try {
      setSending(true);
      const sent = await realGroupChatService.sendMessage(
        selectedConv.id, currentUser.id, currentUser.name, content, 'text', currentUser.avatar
      );
      // Replace optimistic with confirmed message (realtime may also fire — dedup handles it)
      setMessages(prev => prev.map(m => m.id === optId ? { ...sent, sender_name: currentUser.name } as ChatMessage : m));
      loadConversations();
    } catch (e) {
      console.error('send:', e);
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(m => m.id !== optId));
      setMessageInput(content);
    } finally { setSending(false); }
  };

  // ── Start DM ──────────────────────────────────────────────
  const handleStartDM = async () => {
    if (!dmEmail.trim() || !currentUser) return;
    try {
      setDmSearching(true);
      let targetId = dmEmail.trim();
      let targetName = dmEmail.split('@')[0];
      let targetEmail = dmEmail.trim();

      try {
        const users = await usersService.searchUsers(dmEmail.trim());
        if (users?.length) {
          const t = users[0] as any;
          targetId = t.id; targetName = t.name || t.displayName || targetName; targetEmail = t.email || targetEmail;
        }
      } catch { /* use email as fallback */ }

      const chat = await realGroupChatService.getOrCreatePersonalChat(
        currentUser.id, currentUser.name, currentUser.email,
        targetId, targetName, targetEmail
      );
      const conv: Conversation = { id: chat.id, name: targetName, isGroup: false, memberCount: 2, chatType: 'direct' };
      setConversations(prev => prev.find(c => c.id === chat.id) ? prev : [conv, ...prev]);
      selectChat(conv);
      setShowNewDM(false); setDmEmail('');
      toast.success(`Chat started with ${targetName}`);
    } catch (e) { console.error('startDM:', e); toast.error('Failed to start chat'); }
    finally { setDmSearching(false); }
  };

  // ── Group messages by date ────────────────────────────────
  const groupedMessages = (() => {
    const groups: { date: string; messages: ChatMessage[] }[] = [];
    messages.forEach(msg => {
      const date = msg.created_at.split('T')[0];
      const last = groups[groups.length - 1];
      if (!last || last.date !== date) groups.push({ date, messages: [msg] });
      else last.messages.push(msg);
    });
    return groups;
  })();

  const filtered = conversations.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // ─── RENDER ───────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: sans, overflow: 'hidden', background: C.sidebarBg }}>

      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <div style={{
        width: 300, flexShrink: 0,
        background: C.sidebarBg,
        borderRight: `1px solid ${C.sidebarBorder}`,
        display: mobileChatOpen ? 'none' : 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.1rem 1.25rem 0.9rem',
          borderBottom: `1px solid ${C.sidebarBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {onClose && (
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textSecondary, display: 'flex', padding: 0, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}>
                <ArrowLeft size={17} />
              </button>
            )}
            <span style={{ fontFamily: font, fontWeight: 700, fontSize: '1rem', color: C.textPrimary, letterSpacing: '0.01em' }}>
              Messages
            </span>
          </div>
          <button onClick={() => setShowNewDM(true)} style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: 'rgba(139,115,85,0.15)', border: '1px solid rgba(139,115,85,0.25)',
            borderRadius: 7, padding: '0.35rem 0.7rem',
            color: C.accent, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,115,85,0.25)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(139,115,85,0.15)'; }}>
            <Plus size={12} /> New
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '0.75rem 1rem', borderBottom: `1px solid ${C.sidebarBorder}` }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: C.textMuted }} />
            <input style={{
              width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.1rem',
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.sidebarBorder}`,
              borderRadius: 8, fontSize: '0.82rem', color: C.textPrimary, outline: 'none',
              boxSizing: 'border-box', fontFamily: sans,
            }}
              placeholder="Search chats…"
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Chat list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loadingConvs ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: C.textMuted, fontSize: '0.82rem' }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
              <MessageSquare size={28} style={{ color: C.textMuted, margin: '0 auto 0.75rem' }} />
              <p style={{ color: C.textSecondary, fontSize: '0.82rem', margin: '0 0 0.3rem', fontWeight: 600 }}>No chats yet</p>
              <p style={{ color: C.textMuted, fontSize: '0.75rem', margin: 0 }}>Start a DM or join a match</p>
            </div>
          ) : filtered.map(conv => {
            const active = selectedConv?.id === conv.id;
            return (
              <div key={conv.id} onClick={() => selectChat(conv)} style={{
                display: 'flex', alignItems: 'center', gap: '0.7rem',
                padding: '0.7rem 1.25rem 0.7rem 0',
                cursor: 'pointer',
                background: active ? C.sidebarActive : 'transparent',
                borderLeft: active ? `3px solid ${C.sidebarActiveBar}` : '3px solid transparent',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = C.sidebarHover; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{ width: 3 }} />
                <Avatar name={conv.name} size={40} isGroup={conv.isGroup} chatType={conv.chatType} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: active ? C.textPrimary : '#d4c9b0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
                      {conv.name}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: C.textMuted, flexShrink: 0, marginLeft: '0.4rem' }}>
                      {conv.lastMessageTime ? timeAgo(conv.lastMessageTime) : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {conv.isGroup && (
                      <span style={{ fontSize: '0.58rem', background: 'rgba(139,115,85,0.2)', color: C.accent, padding: '0.1rem 0.4rem', borderRadius: 100, fontWeight: 700, flexShrink: 0, letterSpacing: '0.04em' }}>
                        {conv.chatType === 'match' ? 'MATCH' : 'GROUP'}
                      </span>
                    )}
                    <p style={{ margin: 0, fontSize: '0.75rem', color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {conv.lastMessage || conv.description || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User strip */}
        {currentUser && (
          <div style={{ padding: '0.75rem 1.25rem', borderTop: `1px solid ${C.sidebarBorder}`, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Avatar name={currentUser.name} size={32} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#d4c9b0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.name}</p>
              <p style={{ margin: 0, fontSize: '0.68rem', color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUser.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* ══ CHAT AREA ════════════════════════════════════════ */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        background: C.chatBg,
        backgroundImage: `radial-gradient(circle at 2px 2px, ${C.chatPattern} 1px, transparent 0)`,
        backgroundSize: '28px 28px',
      }}>
        {selectedConv ? (
          <>
            {/* Chat header */}
            <div style={{
              padding: '0.85rem 1.5rem',
              background: 'rgba(253,250,245,0.95)',
              backdropFilter: 'blur(8px)',
              borderBottom: `1px solid ${C.inputBorder}`,
              display: 'flex', alignItems: 'center', gap: '0.85rem',
              boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
            }}>
              <button onClick={() => setMobileChatOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.accent, display: 'flex', padding: 0 }}>
                <ArrowLeft size={17} />
              </button>
              <Avatar name={selectedConv.name} size={38} isGroup={selectedConv.isGroup} chatType={selectedConv.chatType} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font, fontWeight: 700, color: '#2d2416', fontSize: '0.95rem', lineHeight: 1.2 }}>{selectedConv.name}</div>
                <div style={{ fontSize: '0.7rem', color: C.accent }}>
                  {selectedConv.isGroup
                    ? `${selectedConv.memberCount || 0} members · ${selectedConv.chatType === 'match' ? 'Match group' : 'Group chat'}`
                    : 'Personal chat'}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1.5rem 1rem' }}>
              {loadingMsgs ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: C.accent, fontSize: '0.85rem' }}>Loading messages…</div>
              ) : messages.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(139,115,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <MessageSquare size={28} style={{ color: C.accent }} />
                  </div>
                  <p style={{ fontFamily: font, fontSize: '1rem', color: '#5a4e3a', margin: '0 0 0.3rem', fontWeight: 600 }}>No messages yet</p>
                  <p style={{ fontSize: '0.8rem', color: C.accent, margin: 0 }}>Be the first to say something 👋</p>
                </div>
              ) : (
                groupedMessages.map(group => (
                  <div key={group.date}>
                    <DateSeparator date={group.date} />
                    {group.messages.map((msg, idx) => {
                      const isMine = msg.sender_id === currentUser?.id;
                      const isSystem = msg.message_type === 'system';
                      const prevMsg = idx > 0 ? group.messages[idx - 1] : null;
                      const senderName = msg.sender_name || members[msg.sender_id] || msg.sender_id;
                      const showName = !isMine && selectedConv.isGroup && prevMsg?.sender_id !== msg.sender_id;

                      if (isSystem) return (
                        <div key={msg.id} style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                          <span style={{
                            display: 'inline-block',
                            background: C.systemBg, color: C.systemText,
                            fontSize: '0.72rem', padding: '0.25rem 0.85rem',
                            borderRadius: 100, fontStyle: 'italic',
                          }}>{msg.content}</span>
                        </div>
                      );

                      return (
                        <div key={msg.id} style={{
                          display: 'flex', flexDirection: 'column',
                          alignItems: isMine ? 'flex-end' : 'flex-start',
                          marginBottom: '0.2rem',
                          marginTop: showName ? '0.6rem' : '0',
                        }}>
                          {showName && (
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: C.accentGreen, marginBottom: '0.2rem', paddingLeft: '0.75rem' }}>
                              {senderName}
                            </span>
                          )}
                          <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                            <div style={{
                              padding: '0.6rem 0.95rem',
                              borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                              background: isMine ? C.sentBg : C.receivedBg,
                              color: isMine ? C.sentText : C.receivedText,
                              fontSize: '0.9rem', lineHeight: 1.5,
                              boxShadow: isMine ? '0 2px 8px rgba(74,102,64,0.25)' : '0 1px 4px rgba(0,0,0,0.08)',
                              border: isMine ? 'none' : `1px solid ${C.receivedBorder}`,
                              wordBreak: 'break-word',
                            }}>
                              {msg.content}
                            </div>
                            <span style={{
                              fontSize: '0.62rem', color: C.accent,
                              marginTop: '0.2rem',
                              padding: isMine ? '0 0.1rem 0 0' : '0 0 0 0.1rem',
                            }}>
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div style={{
              padding: '0.85rem 1.25rem',
              background: 'rgba(253,250,245,0.97)',
              backdropFilter: 'blur(8px)',
              borderTop: `1px solid ${C.inputBorder}`,
              display: 'flex', gap: '0.65rem', alignItems: 'center',
            }}>
              <input
                ref={inputRef}
                style={{
                  flex: 1, padding: '0.7rem 1.1rem',
                  background: C.chatBg, border: `1px solid ${C.inputBorder}`,
                  borderRadius: 24, fontSize: '0.9rem', color: '#2d2416',
                  outline: 'none', fontFamily: sans,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                placeholder="Type a message…"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                onFocus={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,115,85,0.1)`; }}
                onBlur={e => { e.currentTarget.style.borderColor = C.inputBorder; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
              />
              <button
                onClick={handleSend}
                disabled={!messageInput.trim() || sending}
                style={{
                  width: 42, height: 42, borderRadius: '50%', border: 'none',
                  background: messageInput.trim() ? C.accentGreen : '#d4c9b0',
                  cursor: messageInput.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: messageInput.trim() ? '0 4px 12px rgba(74,102,64,0.3)' : 'none',
                  transition: 'all 0.2s',
                  transform: messageInput.trim() ? 'scale(1)' : 'scale(0.95)',
                }}>
                <Send size={16} color="#fff" style={{ marginLeft: 1 }} />
              </button>
            </div>
          </>
        ) : (
          /* Empty state */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'rgba(139,115,85,0.1)',
              border: '2px solid rgba(139,115,85,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
            }}>
              <MessageSquare size={36} style={{ color: C.accent }} />
            </div>
            <h2 style={{ fontFamily: font, color: '#3d3020', margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
              Your Messages
            </h2>
            <p style={{ color: '#7a6a52', fontSize: '0.875rem', margin: '0 0 0.4rem', textAlign: 'center', maxWidth: 280 }}>
              Connect with teammates, coordinate matches, and stay in touch.
            </p>
            <p style={{ color: C.accent, fontSize: '0.8rem', margin: '0 0 1.75rem', textAlign: 'center' }}>
              {conversations.length > 0 ? `${conversations.length} chat${conversations.length > 1 ? 's' : ''} waiting` : 'No chats yet — start one below'}
            </p>
            <button onClick={() => setShowNewDM(true)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: C.accentGreen, color: '#f0f5ed', border: 'none',
              borderRadius: 10, padding: '0.75rem 1.4rem',
              fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: sans,
              boxShadow: '0 4px 16px rgba(74,102,64,0.25)',
            }}>
              <Plus size={16} /> Start New Chat
            </button>
          </div>
        )}
      </div>

      {/* ══ NEW DM MODAL ═════════════════════════════════════ */}
      {showNewDM && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(26,21,16,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, backdropFilter: 'blur(6px)',
        }} onClick={() => setShowNewDM(false)}>
          <div style={{
            background: '#fdfaf5', borderRadius: 18, padding: '1.75rem',
            width: 380, maxWidth: '92vw',
            boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            border: `1px solid ${C.inputBorder}`,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: '1.05rem', color: '#2d2416' }}>New conversation</span>
              <button onClick={() => setShowNewDM(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.accent, display: 'flex', padding: 4 }}><X size={17} /></button>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#7a6a52', margin: '0 0 1rem' }}>
              Enter the email address of someone on Civita
            </p>
            <input
              type="email"
              style={{
                width: '100%', padding: '0.8rem 1rem',
                background: C.chatBg, border: `1.5px solid ${C.inputBorder}`,
                borderRadius: 10, fontSize: '0.9rem', color: '#2d2416',
                outline: 'none', boxSizing: 'border-box', marginBottom: '1rem',
                fontFamily: sans,
              }}
              placeholder="user@example.com"
              value={dmEmail}
              onChange={e => setDmEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStartDM()}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowNewDM(false)} style={{
                padding: '0.65rem 1.1rem', background: C.chatBg,
                border: `1px solid ${C.inputBorder}`, borderRadius: 9,
                fontSize: '0.875rem', color: '#7a6a52', cursor: 'pointer', fontFamily: sans,
              }}>Cancel</button>
              <button
                onClick={handleStartDM}
                disabled={!dmEmail.trim() || dmSearching}
                style={{
                  padding: '0.65rem 1.25rem',
                  background: dmEmail.trim() ? C.accentGreen : '#d4c9b0',
                  border: 'none', borderRadius: 9,
                  fontSize: '0.875rem', fontWeight: 700, color: '#fff',
                  cursor: dmEmail.trim() ? 'pointer' : 'default', fontFamily: sans,
                  boxShadow: dmEmail.trim() ? '0 4px 12px rgba(74,102,64,0.25)' : 'none',
                }}>
                {dmSearching ? 'Searching…' : 'Start Chat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernChat;