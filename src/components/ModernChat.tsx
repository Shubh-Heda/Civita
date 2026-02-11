/**
 * Modern Chat Component
 * Beautiful WhatsApp/Telegram-style chat interface
 * with all modern features: reactions, typing, read receipts, etc.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Send,
  Phone,
  Video,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Plus,
  X,
  MessageSquarePlus,
  Users,
  Info,
  Archive,
  Bell,
  Circle,
  Edit,
  Trash2,
  Reply,
  Flame,
  Heart,
  ThumbsUp,
  Laugh,
  EyeOff,
} from 'lucide-react';
import { modernChatService, Conversation, ChatMessage, ConversationMember } from '../services/modernChatService';
import { supabaseAuth, usersService } from '../services/supabaseAuthService';
import { toast } from 'sonner';
import './ModernChat.css';

interface ModernChatProps {
  selectedConversationId?: string;
  onClose?: () => void;
}

interface SelectedMessage {
  messageId: string;
  replyTo?: ChatMessage;
}

// ============================================
// EMOJIS FOR REACTIONS
// ============================================

const REACTION_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🔥', '✨'];

// ============================================
// MODERN CHAT COMPONENT
// ============================================

export const ModernChat: React.FC<ModernChatProps> = ({ selectedConversationId, onClose }) => {
  // State Management
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // UI State
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'calls'>('chats');
  const [showNewChat, setShowNewChat] = useState(false);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<SelectedMessage | null>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  // New Chat Form
  const [newChatEmail, setNewChatEmail] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');

  // Live Features
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [onlineStatus, setOnlineStatus] = useState<Map<string, boolean>>(new Map());

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageUnsubRef = useRef<(() => void) | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================
  // LOAD CURRENT USER
  // ============================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await supabaseAuth.getCurrentUser();
        if (user) {
          const profileResult = await usersService.getUserProfile(user.id);
          const profileData = profileResult && 'data' in profileResult ? profileResult.data : null;
          setCurrentUser({
            id: user.id,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            avatar: profileData?.avatar_url || profileData?.avatar,
            email: user.email,
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    loadUser();
  }, []);

  // ============================================
  // LOAD CONVERSATIONS
  // ============================================

  useEffect(() => {
    const loadConversations = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        const convs = await modernChatService.getUserConversations(currentUser.id);
        setConversations(convs);

        if (selectedConversationId) {
          const selected = convs.find(c => c.id === selectedConversationId);
          if (selected) setSelectedConv(selected);
        } else if (convs.length > 0) {
          setSelectedConv(convs[0]);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
        toast.error('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [currentUser, selectedConversationId]);

  // ============================================
  // LOAD MESSAGES
  // ============================================

  useEffect(() => {
    if (!selectedConv || !currentUser) {
      setMessages([]);
      return;
    }

    let mounted = true;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const msgs = await modernChatService.getMessages(selectedConv.id);
        if (mounted) {
          setMessages(msgs);
          await modernChatService.markAsRead(selectedConv.id, currentUser.id);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Subscribe to real-time updates
    messageUnsubRef.current = modernChatService.subscribeToMessages(
      selectedConv.id,
      (newMessages) => {
        if (mounted) setMessages(newMessages);
      }
    );

    return () => {
      mounted = false;
      messageUnsubRef.current?.();
    };
  }, [selectedConv, currentUser]);

  // ============================================
  // AUTO SCROLL
  // ============================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConv || !currentUser || sendingMessage) return;

    try {
      setSendingMessage(true);
      await modernChatService.sendMessage(
        selectedConv.id,
        currentUser.id,
        currentUser.name,
        messageInput.trim(),
        'text',
        currentUser.avatar
      );
      setMessageInput('');
      setSelectedMessage(null);

      // Clear typing indicator
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleTyping = async () => {
    if (!selectedConv || !currentUser) return;

    try {
      await modernChatService.sendTypingIndicator(
        selectedConv.id,
        currentUser.id,
        currentUser.name
      );

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setMessageInput('');
      }, 5000);
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }
  };

  const handleReactToMessage = async (messageId: string, emoji: string) => {
    if (!currentUser) return;

    try {
      await modernChatService.reactToMessage(messageId, currentUser.id, emoji);
      toast.success(`Reacted with ${emoji}`);
    } catch (error) {
      console.error('Error reacting to message:', error);
      toast.error('Failed to react');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!currentUser) return;

    try {
      await modernChatService.deleteMessage(messageId, currentUser.id);
      toast.success('Message deleted');
      setHoveredMessageId(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const handleCreateDirectChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatEmail.trim() || !currentUser) return;

    try {
      // Find user by email
      const { data: users } = await usersService.searchUsers(newChatEmail.trim());
      if (!users || users.length === 0) {
        toast.error('User not found');
        return;
      }

      const otherUser = users[0];
      const conv = await modernChatService.createDirectConversation(
        currentUser.id,
        otherUser.id,
        currentUser.name,
        otherUser.name || newChatEmail
      );

      setConversations([conv, ...conversations]);
      setSelectedConv(conv);
      setShowNewChat(false);
      setNewChatEmail('');
      toast.success('Chat created! 🎉');
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat');
    }
  };

  const handleCreateGroupChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim() || !currentUser) return;

    try {
      const conv = await modernChatService.createGroupConversation(
        newGroupName.trim(),
        newGroupDescription.trim(),
        currentUser.id,
        currentUser.name,
        selectedMembers
      );

      setConversations([conv, ...conversations]);
      setSelectedConv(conv);
      setShowGroupChat(false);
      setNewGroupName('');
      setNewGroupDescription('');
      setSelectedMembers([]);
      toast.success('Group created! 🎉');
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Failed to create group');
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !selectedConv || !currentUser) return;

    try {
      const result = await modernChatService.inviteUserByEmail(
        selectedConv.id,
        currentUser.id,
        inviteEmail.trim()
      );

      if (result.success) {
        toast.success(result.message);
        setInviteEmail('');
        setShowInvite(false);
        
        // Refresh conversation to get updated members
        const updatedConv = await modernChatService.getConversation(selectedConv.id);
        setSelectedConv(updatedConv);
        
        // Refresh conversations list
        const convs = await modernChatService.getUserConversations(currentUser.id);
        setConversations(convs);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error inviting member:', error);
      toast.error('Failed to invite member');
    }
  };

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    return messages.filter(msg =>
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    return conversations.filter(conv =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  if (!currentUser) {
    return (
      <div className="modern-chat-loading">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="modern-chat-container">
      {/* ============================================
          LEFT SIDEBAR - CONVERSATIONS LIST
          ============================================ */}
      <div className="modern-chat-sidebar">
        {/* Header */}
        <div className="modern-chat-header">
          <h1 className="modern-chat-title">Messages</h1>
          <div className="modern-chat-header-actions">
            <button
              className="icon-btn"
              onClick={() => setShowSearch(!showSearch)}
              title="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="icon-btn"
              onClick={() => setShowNewChat(!showNewChat)}
              title="New Chat"
            >
              <MessageSquarePlus size={20} />
            </button>
            <button className="icon-btn" title="Settings">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="modern-chat-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* New Chat Modal */}
        {showNewChat && (
          <div className="modern-chat-modal-overlay">
            <div className="modern-chat-modal">
              <div className="modal-tabs">
                <button
                  className={`tab ${!showGroupChat ? 'active' : ''}`}
                  onClick={() => setShowGroupChat(false)}
                >
                  Direct Chat
                </button>
                <button
                  className={`tab ${showGroupChat ? 'active' : ''}`}
                  onClick={() => setShowGroupChat(true)}
                >
                  Group Chat
                </button>
              </div>

              {!showGroupChat ? (
                <form onSubmit={handleCreateDirectChat}>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={newChatEmail}
                    onChange={(e) => setNewChatEmail(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="primary-btn">
                    Create Chat
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCreateGroupChat}>
                  <input
                    type="text"
                    placeholder="Group name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    autoFocus
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                  />
                  <button type="submit" className="primary-btn">
                    Create Group
                  </button>
                </form>
              )}

              <button
                className="close-modal"
                onClick={() => setShowNewChat(false)}
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Invite Member Modal */}
        {showInvite && selectedConv && selectedConv.type === 'group' && (
          <div className="modern-chat-modal-overlay">
            <div className="modern-chat-modal">
              <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Invite Member</h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#aaa' }}>
                Add someone to {selectedConv.name}
              </p>
              
              <form onSubmit={handleInviteMember}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  autoFocus
                  required
                />
                <button type="submit" className="primary-btn">
                  Send Invite
                </button>
              </form>

              <button
                className="close-modal"
                onClick={() => {
                  setShowInvite(false);
                  setInviteEmail('');
                }}
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Conversations List */}
        <div className="modern-chat-list">
          {loading && conversations.length === 0 ? (
            <div className="empty-state">Loading chats...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="empty-state">
              <MessageSquarePlus size={40} />
              <p>No chats yet</p>
              <button onClick={() => setShowNewChat(true)} className="text-btn">
                Start a conversation
              </button>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedConv?.id === conv.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedConv(conv);
                  setSearchQuery('');
                }}
              >
                {/* Avatar */}
                <div className="conv-avatar">
                  {conv.type === 'direct' && conv.members[0]?.avatar ? (
                    <img
                      src={conv.members[0].avatar}
                      alt={conv.members[0].name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.id}`;
                      }}
                    />
                  ) : (
                    <div className="avatar-fallback">
                      {conv.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {conv.members[0]?.is_online && (
                    <div className="online-indicator" title="Online">
                      <Circle size={10} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="conv-info">
                  <div className="conv-header">
                    <h3 className="conv-name">{conv.name}</h3>
                    <span className="conv-time">
                      {conv.last_message_at
                        ? new Date(conv.last_message_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </span>
                  </div>
                  <p className="conv-message">
                    {conv.last_message?.content || 'No messages yet'}
                  </p>
                </div>

                {conv.unread_count > 0 && (
                  <div className="unread-badge">{conv.unread_count}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ============================================
          MAIN CHAT AREA
          ============================================ */}
      <div className="modern-chat-main">
        {!selectedConv ? (
          <div className="empty-chat">
            <MessageSquarePlus size={64} />
            <h2>Select a chat to start messaging</h2>
            <button onClick={() => setShowNewChat(true)} className="primary-btn">
              Start New Chat
            </button>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="modern-chat-header-main">
              <div className="chat-header-left">
                {selectedConv.type === 'direct' && selectedConv.members[0] && (
                  <>
                    <div className="chat-avatar-small">
                      {selectedConv.members[0].avatar ? (
                        <img
                          src={selectedConv.members[0].avatar}
                          alt={selectedConv.members[0].name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConv.id}`;
                          }}
                        />
                      ) : (
                        <div className="avatar-fallback-small">
                          {selectedConv.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="chat-title">{selectedConv.name}</h2>
                      <p className="chat-subtitle">
                        {selectedConv.members[0].is_online
                          ? 'Active now'
                          : `Last seen ${selectedConv.members[0].last_seen ? new Date(selectedConv.members[0].last_seen).toLocaleTimeString() : 'recently'}`}
                      </p>
                    </div>
                  </>
                )}

                {selectedConv.type === 'group' && (
                  <>
                    <div className="chat-avatar-small group">
                      <Users size={20} />
                    </div>
                    <div>
                      <h2 className="chat-title">{selectedConv.name}</h2>
                      <p className="chat-subtitle">
                        {selectedConv.members.length} members
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="chat-header-actions">
                {selectedConv.type === 'group' && (
                  <button 
                    className="icon-btn" 
                    title="Invite Members"
                    onClick={() => setShowInvite(true)}
                  >
                    <Plus size={20} />
                  </button>
                )}
                <button className="icon-btn" title="Call">
                  <Phone size={20} />
                </button>
                <button className="icon-btn" title="Video Call">
                  <Video size={20} />
                </button>
                <button className="icon-btn" title="Search">
                  <Search size={20} />
                </button>
                <button className="icon-btn" title="Info">
                  <Info size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="modern-chat-messages">
              {loading ? (
                <div className="loading-messages">Loading messages...</div>
              ) : filteredMessages.length === 0 ? (
                <div className="no-messages">
                  <Smile size={48} />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                filteredMessages.map((msg, idx) => {
                  const isOwn = msg.sender_id === currentUser.id;
                  const showAvatar =
                    idx === 0 ||
                    filteredMessages[idx - 1].sender_id !== msg.sender_id;

                  return (
                    <div key={msg.id} className={`message-group ${isOwn ? 'own' : ''}`}>
                      {/* Reply Indicator */}
                      {msg.reply_to && (
                        <div className="message-reply-indicator">
                          <Reply size={14} />
                          <span>Replying to a message</span>
                        </div>
                      )}

                      {/* Avatar */}
                      {!isOwn && showAvatar && (
                        <div className="message-avatar">
                          {msg.sender_avatar ? (
                            <img
                              src={msg.sender_avatar}
                              alt={msg.sender_name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender_id}`;
                              }}
                            />
                          ) : (
                            <div className="avatar-fallback-sm">
                              {msg.sender_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message */}
                      <div
                        className="message-bubble-wrapper"
                        onMouseEnter={() => setHoveredMessageId(msg.id)}
                        onMouseLeave={() => setHoveredMessageId(null)}
                      >
                        <div className="message-bubble">
                          {!isOwn && <p className="message-sender">{msg.sender_name}</p>}
                          <p className="message-content">{msg.content}</p>
                          {msg.edited_at && (
                            <p className="message-edited">(edited)</p>
                          )}
                          <span className="message-time">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        {/* Message Actions */}
                        {hoveredMessageId === msg.id && (
                          <div className="message-actions">
                            <div className="reaction-picker">
                              {REACTION_EMOJIS.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => handleReactToMessage(msg.id, emoji)}
                                  className="reaction-btn"
                                  title={`React with ${emoji}`}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>

                            <button
                              className="action-btn reply"
                              onClick={() =>
                                setSelectedMessage({ messageId: msg.id, replyTo: msg })
                              }
                              title="Reply"
                            >
                              <Reply size={16} />
                            </button>

                            {isOwn && (
                              <>
                                <button
                                  className="action-btn edit"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="action-btn delete"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Reactions */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div className="message-reactions">
                          {msg.reactions.map((reaction) => (
                            <button
                              key={reaction.emoji}
                              className="reaction-display"
                              onClick={() =>
                                handleReactToMessage(msg.id, reaction.emoji)
                              }
                            >
                              <span>{reaction.emoji}</span>
                              <span className="reaction-count">{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {/* Typing Indicator */}
              {typingUsers.size > 0 && (
                <div className="typing-indicator">
                  <p>
                    {Array.from(typingUsers).join(', ')} is typing
                    <span className="dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Reply Preview */}
            {selectedMessage?.replyTo && (
              <div className="reply-preview">
                <div className="reply-info">
                  <Reply size={16} />
                  <div>
                    <p className="reply-to-name">
                      {selectedMessage.replyTo.sender_name}
                    </p>
                    <p className="reply-to-content">
                      {selectedMessage.replyTo.content}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="close-reply"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="modern-chat-input">
              <div className="input-wrapper">
                <button type="button" className="icon-btn">
                  <Plus size={20} />
                </button>

                <button type="button" className="icon-btn">
                  <Paperclip size={20} />
                </button>

                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    handleTyping();
                  }}
                  disabled={sendingMessage}
                  className="message-input"
                />

                <button type="button" className="icon-btn">
                  <Smile size={20} />
                </button>

                {messageInput.trim() ? (
                  <button
                    type="submit"
                    disabled={sendingMessage}
                    className="icon-btn send"
                    title="Send"
                  >
                    <Send size={20} fill="currentColor" />
                  </button>
                ) : (
                  <button type="button" className="icon-btn">
                    <Mic size={20} />
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ModernChat;
