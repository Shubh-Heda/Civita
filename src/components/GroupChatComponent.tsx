import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/AuthProvider';
import { realGroupChatService, RealGroupChat, ChatMessage, ChatMember } from '../services/groupChatServiceReal';
import { Send, Users, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  chatId?: string | null;
  onClose?: () => void;
}

export default function GroupChatComponent({ chatId, onClose }: Props) {
  const { user } = useAuth();
  const [chats, setChats] = useState<RealGroupChat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId || null);
  const [chat, setChat] = useState<RealGroupChat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [members, setMembers] = useState<ChatMember[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatEmail, setNewChatEmail] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

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
      setMessages([]);
      setMembers([]);
      return;
    }

    let unsubMsgs: (() => void) | null = null;
    let unsubMembers: (() => void) | null = null;

    (async () => {
      try {
        setLoading(true);
        const c = await realGroupChatService.getGroupChat(id);
        if (!mounted) return;
        setChat(c || null);

        const msgs = await realGroupChatService.getMessages(id);
        if (!mounted) return;
        setMessages(msgs || []);

        const m = await realGroupChatService.getMembers(id);
        if (!mounted) return;
        setMembers(m || []);

        unsubMsgs = realGroupChatService.subscribeToMessages(id, (newMsgs) => setMessages(newMsgs));
        unsubMembers = realGroupChatService.subscribeToMembers(id, (newMembers) => setMembers(newMembers));
      } catch (err) {
        console.error(err);
        toast.error('Failed to load chat');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      try { unsubMsgs && unsubMsgs(); } catch (_) {}
      try { unsubMembers && unsubMembers(); } catch (_) {}
    };
  }, [currentChatId, chatId]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const id = currentChatId || chatId;
    if (!id || !messageInput.trim() || !user) return;
    try {
      await realGroupChatService.sendMessage(id, user.id, (user as any).name || (user as any).email || 'Anonymous', messageInput.trim(), 'text', (user as any).avatar);
      setMessageInput('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex h-full">
      <aside className="w-72 border-r p-3 bg-white">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold">Chats</h4>
          <button className="text-sm">+</button>
        </div>
        <div className="mb-3 flex items-center gap-2 bg-slate-50 p-2 rounded">
          <Search className="w-4 h-4 text-slate-400" />
          <input placeholder="Search" className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <ul className="space-y-2">
          {chats.map(c => (
            <li key={c.id} className={`p-2 rounded hover:bg-slate-100 cursor-pointer ${currentChatId === c.id ? 'bg-slate-100' : ''}`} onClick={() => setCurrentChatId(c.id)}>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-slate-500">{(c as any).match_id ? 'Match' : 'Group'}</div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button onClick={() => setShowNewChat(true)} className="w-full px-3 py-2 bg-blue-600 text-white rounded">New chat</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="border-b p-4 bg-white">
          <div className="font-bold">{chat?.name || 'Group Chat'}</div>
          {chat?.description && <div className="text-sm text-slate-500">{chat.description}</div>}
        </div>

        {/* New Chat Modal */}
        {showNewChat && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-3">Start a new chat</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Name</label>
                  <input value={newChatName} onChange={(e) => setNewChatName(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Friend name" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Email or ID</label>
                  <input value={newChatEmail} onChange={(e) => setNewChatEmail(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="friend@example.com (used as id)" />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowNewChat(false)} className="px-3 py-2 border rounded">Cancel</button>
                  <button onClick={async () => {
                    if (!newChatEmail.trim()) return toast.error('Enter an id/email');
                    try {
                      const otherId = newChatEmail.trim();
                      const otherName = newChatName.trim() || newChatEmail.split('@')[0];
                      const created = await realGroupChatService.getOrCreatePersonalChat(
                        user.id,
                        (user as any).name || (user as any).email || 'You',
                        (user as any).email || '',
                        otherId,
                        otherName,
                        otherId
                      );
                      // refresh chat list and open
                      const list = await realGroupChatService.getUserGroupChats(user.id);
                      setChats(list || []);
                      setCurrentChatId(created.id);
                      setShowNewChat(false);
                      setNewChatEmail('');
                      setNewChatName('');
                    } catch (err) {
                      console.error(err);
                      toast.error('Failed to create chat');
                    }
                  }} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-slate-500 mt-8">No messages yet</div>
          ) : (
            messages.map(m => (
              <div key={m.id} className={`max-w-2xl ${m.sender_id === (user as any)?.id ? 'ml-auto text-right' : ''}`}>
                <div className="text-sm font-semibold">{m.sender_name}</div>
                <div className="mt-1 p-3 bg-white rounded shadow-sm">{m.content}</div>
                <div className="text-xs text-slate-400 mt-1">{new Date(m.created_at).toLocaleTimeString()}</div>
              </div>
            ))
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={send} className="p-4 border-t bg-white flex gap-2">
          <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="flex-1 px-3 py-2 border rounded" placeholder="Write a message..." />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded"><Send className="w-4 h-4" /></button>
        </form>
      </main>
    </div>
  );
}

