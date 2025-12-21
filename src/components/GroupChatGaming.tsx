import { useState } from 'react';
import { ArrowLeft, Send, Plus, X, Search, Users, Gamepad2, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface GroupChatGamingProps {
  onNavigate: (page: string) => void;
  matchId?: string | null;
}

export function GroupChatGaming({ onNavigate, matchId }: GroupChatGamingProps) {
  const [selectedRoom, setSelectedRoom] = useState(matchId || 'squad-1');
  const [newMessage, setNewMessage] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');

  const [gamingRooms] = useState([
    {
      id: 'squad-1',
      name: 'FIFA 24 Champions',
      game: 'FIFA 24',
      members: 8,
      lastMessage: 'Tournament starting in 1 hour!',
      unread: 0,
    },
    {
      id: 'squad-2',
      name: 'Valorant Competitive',
      game: 'Valorant',
      members: 5,
      lastMessage: 'GG! Great match everyone',
      unread: 2,
    },
    {
      id: 'squad-3',
      name: 'COD MW3 Squad',
      game: 'COD: MW3',
      members: 6,
      lastMessage: 'Team up for ranked?',
      unread: 1,
    },
  ]);

  const [messages] = useState([
    {
      id: '1',
      sender: 'System',
      senderInitial: '🎮',
      senderColor: 'from-purple-400 to-pink-500',
      text: 'Gaming squad created! Ready to dominate? 🚀',
      time: '10:00 AM',
      isSystem: true,
    },
    {
      id: '2',
      sender: 'Pro Player Alex',
      senderInitial: 'P',
      senderColor: 'from-cyan-400 to-blue-500',
      text: 'Yo everyone! Who wants to grind ranked today? 💪',
      time: '10:05 AM',
      isSystem: false,
    },
    {
      id: '3',
      sender: 'Gaming Coach Sam',
      senderInitial: 'G',
      senderColor: 'from-purple-400 to-purple-500',
      text: 'Count me in! Let\'s show them what we\'ve got! 🔥',
      time: '10:07 AM',
      isSystem: false,
    },
    {
      id: '4',
      sender: 'You',
      senderInitial: 'Y',
      senderColor: 'from-green-400 to-emerald-500',
      text: 'Let\'s get it! I\'m ready whenever',
      time: '10:10 AM',
      isSystem: false,
    },
  ]);

  const currentRoom = gamingRooms.find(r => r.id === selectedRoom);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success('Message sent! 🎮');
    setNewMessage('');
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error('Enter a group name');
      return;
    }
    toast.success('Gaming group created!');
    setGroupName('');
    setShowCreateGroup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('gaming-hub')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-slate-900 font-semibold">Gaming Squad Chat</h1>
              <p className="text-sm text-slate-600">Connect with your gaming team</p>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateGroup(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Squad
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* Squad List */}
          <div className="col-span-4 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search squads..."
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {gamingRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-4 flex items-start gap-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    selectedRoom === room.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    🎮
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-slate-900 truncate">{room.name}</p>
                    <p className="text-xs text-slate-500 truncate">{room.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-purple-100 text-purple-700 text-xs">{room.game}</Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {room.members}
                      </span>
                    </div>
                  </div>
                  {room.unread > 0 && (
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {room.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{currentRoom?.name}</h3>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Users className="w-4 h-4" /> {currentRoom?.members} members
                </p>
              </div>
              <Badge className="bg-purple-100 text-purple-700">{currentRoom?.game}</Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-xs ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                    {!msg.isSystem && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 text-sm font-bold bg-gradient-to-br ${msg.senderColor}`}>
                        {msg.senderInitial}
                      </div>
                    )}
                    <div className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                      {!msg.isSystem && (
                        <p className="text-xs text-slate-600 mb-1">{msg.sender}</p>
                      )}
                      <div className={`px-4 py-2 rounded-2xl ${
                        msg.isSystem 
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900'
                          : msg.sender === 'You'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message your gaming squad..."
                  className="flex-1 border-slate-200"
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

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Create Gaming Squad</h2>
              <button
                onClick={() => setShowCreateGroup(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Squad name (e.g., FIFA Champions)"
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleCreateGroup}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Create Squad
              </Button>
              <Button
                onClick={() => setShowCreateGroup(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
