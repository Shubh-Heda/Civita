import { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, Users, Lock, Globe, Mic, MicOff, Plus, Volume2, MessageCircle, Coffee } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlassCard } from './GlassCard';
import { CreateRoomDialog } from './CreateRoomDialog';
import { useVibeRooms } from '../lib/hooks/useVibeRooms';
import { toast } from 'sonner@2.0.3';

interface VibeRoom {
  id: string;
  title: string;
  category: 'cultural' | 'sports' | 'party';
  type: 'planning' | 'feedback' | 'discussion';
  host: string;
  hostId: string;
  participants: string[];
  participantNames: string[];
  maxParticipants: number;
  isPublic: boolean;
  isActive: boolean;
  tags: string[];
  createdAt: number;
}

interface VibeRoomsProps {
  category?: 'cultural' | 'sports' | 'party' | 'all';
  onJoinRoom?: (roomId: string) => void;
}

export function VibeRooms({ category = 'all', onJoinRoom }: VibeRoomsProps) {
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { rooms, loading, error, createRoom, joinRoom, leaveRoom } = useVibeRooms(category);

  const filteredRooms = category === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === category);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'sports':
        return 'from-cyan-500 to-emerald-500';
      case 'cultural':
        return 'from-purple-500 to-pink-500';
      case 'party':
        return 'from-orange-500 to-pink-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'planning':
        return <Coffee className="w-4 h-4" />;
      case 'feedback':
        return <MessageCircle className="w-4 h-4" />;
      case 'discussion':
        return <Users className="w-4 h-4" />;
      default:
        return <Radio className="w-4 h-4" />;
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      setActiveRoomId(roomId);
      if (onJoinRoom) {
        onJoinRoom(roomId);
      }
      await joinRoom(roomId);
      toast.success('🎉 Joined room successfully!', {
        description: 'You can now chat and collaborate with others',
      });
    } catch (error: any) {
      toast.error('Failed to join room', {
        description: error.message,
      });
      setActiveRoomId(null);
    }
  };

  const handleLeaveRoom = async () => {
    if (!activeRoomId) return;
    
    try {
      await leaveRoom(activeRoomId);
      setActiveRoomId(null);
      setIsMuted(true);
      toast.success('Left room');
    } catch (error: any) {
      toast.error('Failed to leave room', {
        description: error.message,
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Create Room Dialog */}
      <CreateRoomDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreateRoom={createRoom}
        category={category === 'all' ? 'sports' : category}
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-5 h-5 text-purple-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
          </div>
          <h2>Vibe Rooms</h2>
          <Badge className="bg-purple-100 text-purple-700">
            {filteredRooms.length} Active
          </Badge>
        </div>
        
        <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4" />
          Create Room
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-2 text-sm text-slate-600">Loading vibe rooms...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <GlassCard>
          <div className="p-6 text-center">
            <p className="text-red-600 mb-2">Unable to load vibe rooms</p>
            <p className="text-sm text-slate-600 mb-4">
              There was an issue loading the vibe rooms. Please try refreshing the page.
            </p>
            <details className="text-left mb-4">
              <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                Technical details
              </summary>
              <pre className="text-xs bg-slate-100 p-2 rounded mt-2 overflow-auto">
                {error}
              </pre>
            </details>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                Refresh Page
              </Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Empty State */}
      {!loading && !error && filteredRooms.length === 0 && (
        <GlassCard>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Radio className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="mb-2">No Active Rooms</h3>
            <p className="text-slate-600 mb-4">
              Be the first to create a vibe room and start connecting!
            </p>
            <Button 
              className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="w-4 h-4" />
              Create First Room
            </Button>
          </div>
        </GlassCard>
      )}

      {/* Active Room Banner */}
      {activeRoomId && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <GlassCard variant="highlighted">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-white animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">You're in</p>
                    <h3>{rooms.find(r => r.id === activeRoomId)?.title}</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className={isMuted ? 'bg-red-50' : 'bg-emerald-50'}
                  >
                    {isMuted ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4 text-emerald-600" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLeaveRoom}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Leave Room
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${getCategoryColor('sports')} border-2 border-white flex items-center justify-center text-white text-sm`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {rooms.find(r => r.id === activeRoomId)?.participants.length} people listening
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Rooms List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`bg-gradient-to-r ${getCategoryColor(room.category)} text-white`}>
                        {getTypeIcon(room.type)}
                        <span className="ml-1 capitalize">{room.type}</span>
                      </Badge>
                      {room.isPublic ? (
                        <Badge variant="outline" className="gap-1">
                          <Globe className="w-3 h-3" />
                          Public
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Lock className="w-3 h-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <h3 className="mb-2">{room.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      Hosted by {room.host}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {room.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(3, room.participants.length))].map((_, i) => (
                        <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${getCategoryColor(room.category)} border-2 border-white`} />
                      ))}
                    </div>
                    <span>{room.participants.length}/{room.maxParticipants}</span>
                  </div>

                  {activeRoomId === room.id ? (
                    <Badge className="bg-emerald-500 text-white">
                      <Radio className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleJoinRoom(room.id)}
                      className={`gap-2 bg-gradient-to-r ${getCategoryColor(room.category)} hover:opacity-90 text-white`}
                    >
                      <Radio className="w-4 h-4" />
                      Join
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}