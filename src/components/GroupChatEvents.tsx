import { useState } from 'react';
import { ArrowLeft, Users, Send, Plus, Search, MessageCircle, MoreVertical, Check, Calendar, MapPin, Clock, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { SoftExitMenu } from './SoftExitMenu';

interface Event {
  id: string;
  title: string;
  turfName: string;
  date: string;
  time: string;
  sport: string;
  status: 'upcoming' | 'completed';
  visibility: string;
  amount?: number;
  groupName?: string;
  createGroupChat?: boolean;
}

interface GroupChatEventsProps {
  onNavigate: (page: string, turfId?: string, matchId?: string) => void;
  matchId?: string | null;
  events: Event[];
}

interface Message {
  id: string;
  sender: string;
  senderInitial: string;
  senderColor: string;
  text: string;
  time: string;
  isSystem?: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  members: number;
  lastMessage: string;
  unread: number;
}

const defaultChatRooms: ChatRoom[] = [
  {
    id: 'events-2',
    name: 'Music Lovers United',
    members: 25,
    lastMessage: 'Can\'t wait for the concert!',
    unread: 0,
  },
  {
    id: 'events-3',
    name: 'Art Gallery Enthusiasts',
    members: 18,
    lastMessage: 'The exhibition was amazing!',
    unread: 3,
  },
];

export function GroupChatEvents({ onNavigate, matchId, events }: GroupChatEventsProps) {
  const eventChatRooms: ChatRoom[] = events
    .filter(e => e.status === 'upcoming' && e.createGroupChat)
    .map(e => ({
      id: e.id,
      name: e.groupName || e.title,
      members: 15,
      lastMessage: `Event on ${e.date} at ${e.time}`,
      unread: matchId === e.id ? 0 : 1,
    }));
  
  const chatRooms = [...eventChatRooms, ...defaultChatRooms];
  const [selectedRoom, setSelectedRoom] = useState<string>(matchId || chatRooms[0]?.id || 'events-2');
  const [newMessage, setNewMessage] = useState('');
  const [showSoftExitMenu, setShowSoftExitMenu] = useState(false);

  const currentEvent = events.find(e => e.id === selectedRoom);

  const messages: Message[] = [
    {
      id: '1',
      sender: 'System',
      senderInitial: '🎭',
      senderColor: 'from-purple-400 to-pink-500',
      text: currentEvent 
        ? `🎭 Event group created! ${currentEvent.visibility === 'public' ? 'Open to everyone!' : 'Private event'}\n\n✨ Connect with other attendees\n💬 Share your excitement\n🤝 Make new friends at the event!`
        : 'Welcome to the group!',
      time: '10:00 AM',
      isSystem: true,
    },
    {
      id: '2',
      sender: 'Emma Williams',
      senderInitial: 'E',
      senderColor: 'from-purple-400 to-pink-500',
      text: 'So excited for this event! Anyone else going?',
      time: '10:30 AM',
    },
    {
      id: '3',
      sender: 'James Chen',
      senderInitial: 'J',
      senderColor: 'from-pink-400 to-purple-500',
      text: 'Count me in! Looking forward to meeting everyone 🎉',
      time: '10:32 AM',
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success('Message sent!');
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-purple-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('events-dashboard')}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-purple-700" />
            </button>
            <div>
              <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Cultural Events Chats</h1>
              <p className="text-sm text-slate-600">{chatRooms.length} active conversations</p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Group
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* Chat List */}
          <div className="col-span-4 bg-white rounded-2xl border border-purple-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-purple-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search chats..."
                  className="pl-10 bg-purple-50 border-purple-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-4 flex items-start gap-3 border-b border-slate-100 hover:bg-purple-50 transition-colors ${
                    selectedRoom === room.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                    <Music className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm text-slate-900 truncate">{room.name}</h3>
                      {room.unread > 0 && (
                        <Badge className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {room.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 truncate">{room.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{room.members} members</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 bg-white rounded-2xl border border-purple-200 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-slate-900">{chatRooms.find(r => r.id === selectedRoom)?.name}</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-600">
                        {chatRooms.find(r => r.id === selectedRoom)?.members} members
                      </p>
                      <Badge className="bg-purple-100 text-purple-700 text-xs border border-purple-200">
                        Event Chat
                      </Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSoftExitMenu(true)}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Event Details Banner */}
            {currentEvent && (
              <div className="p-4 border-b border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span className="text-slate-700">{currentEvent.turfName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-slate-700">{currentEvent.date} at {currentEvent.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.isSystem ? 'flex justify-center' : 'flex items-start gap-3'}>
                  {msg.isSystem ? (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl px-5 py-4 max-w-lg shadow-sm">
                      <p className="text-sm text-purple-900 whitespace-pre-line leading-relaxed">{msg.text}</p>
                    </div>
                  ) : (
                    <>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${msg.senderColor} flex items-center justify-center text-white flex-shrink-0`}>
                        {msg.senderInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-slate-900">{msg.sender}</span>
                          <span className="text-xs text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-slate-700">{msg.text}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-purple-200">
              <div className="flex gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-purple-50 border-purple-200"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Exit Menu */}
      {showSoftExitMenu && (
        <SoftExitMenu
          onClose={() => setShowSoftExitMenu(false)}
          onLeave={() => {
            setShowSoftExitMenu(false);
            toast.success('You\'ve left the group');
            onNavigate('events-dashboard');
          }}
        />
      )}
    </div>
  );
}
