import { useState, useEffect } from 'react';
import { useAuth } from '../AuthProvider';

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

// Mock data storage
const mockRoomsStorage: VibeRoom[] = [
  {
    id: '1',
    title: 'Weekend Football Planning',
    category: 'sports',
    type: 'planning',
    host: 'Alex Thompson',
    hostId: 'mock-user-id',
    participants: ['mock-user-id'],
    participantNames: ['Alex Thompson'],
    maxParticipants: 10,
    isPublic: true,
    isActive: true,
    tags: ['Football', 'Weekend'],
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    title: 'Music Festival Meetup',
    category: 'cultural',
    type: 'discussion',
    host: 'Sarah Chen',
    hostId: 'user-2',
    participants: ['user-2', 'user-3'],
    participantNames: ['Sarah Chen', 'Mike Johnson'],
    maxParticipants: 15,
    isPublic: true,
    isActive: true,
    tags: ['Music', 'Festival'],
    createdAt: Date.now() - 7200000,
  },
  {
    id: '3',
    title: 'Birthday Party Coordination',
    category: 'party',
    type: 'planning',
    host: 'Emma Davis',
    hostId: 'user-4',
    participants: ['user-4'],
    participantNames: ['Emma Davis'],
    maxParticipants: 20,
    isPublic: false,
    isActive: true,
    tags: ['Birthday', 'Celebration'],
    createdAt: Date.now() - 1800000,
  },
];

export function useVibeRooms(category?: 'cultural' | 'sports' | 'party' | 'all') {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<VibeRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get rooms from storage
      const storedRooms = localStorage.getItem('vibeRooms');
      let allRooms: VibeRoom[] = storedRooms ? JSON.parse(storedRooms) : mockRoomsStorage;
      
      // Filter by category if needed
      if (category && category !== 'all') {
        allRooms = allRooms.filter(room => room.category === category);
      }
      
      setRooms(allRooms);
      setError(null);
    } catch (err: any) {
      console.error('[useVibeRooms] Error fetching vibe rooms:', err);
      setError(err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize storage with mock data if empty
    if (!localStorage.getItem('vibeRooms')) {
      localStorage.setItem('vibeRooms', JSON.stringify(mockRoomsStorage));
    }
    
    fetchRooms();
  }, [category]);

  const createRoom = async (roomData: {
    title: string;
    category: 'cultural' | 'sports' | 'party';
    type: 'planning' | 'feedback' | 'discussion';
    tags: string[];
    maxParticipants: number;
    isPublic: boolean;
  }) => {
    if (!user) {
      throw new Error('Must be logged in to create a room');
    }

    try {
      // Create new room
      const newRoom: VibeRoom = {
        id: Date.now().toString(),
        ...roomData,
        host: user.name || user.email || 'Unknown User',
        hostId: user.id,
        participants: [user.id],
        participantNames: [user.name || user.email || 'Unknown User'],
        isActive: true,
        createdAt: Date.now(),
      };

      // Get existing rooms
      const storedRooms = localStorage.getItem('vibeRooms');
      const existingRooms: VibeRoom[] = storedRooms ? JSON.parse(storedRooms) : mockRoomsStorage;
      
      // Add new room
      const updatedRooms = [...existingRooms, newRoom];
      localStorage.setItem('vibeRooms', JSON.stringify(updatedRooms));
      
      await fetchRooms(); // Refresh rooms list
      return newRoom;
    } catch (err: any) {
      console.error('Error creating room:', err);
      throw err;
    }
  };

  const joinRoom = async (roomId: string) => {
    if (!user) {
      throw new Error('Must be logged in to join a room');
    }

    try {
      const storedRooms = localStorage.getItem('vibeRooms');
      const existingRooms: VibeRoom[] = storedRooms ? JSON.parse(storedRooms) : mockRoomsStorage;
      
      // Find and update room
      const updatedRooms = existingRooms.map(room => {
        if (room.id === roomId) {
          const userName = user.name || user.email || 'Unknown User';
          
          // Check if already a participant
          if (room.participants.includes(user.id)) {
            return room;
          }
          
          // Check if room is full
          if (room.participants.length >= room.maxParticipants) {
            throw new Error('Room is full');
          }
          
          return {
            ...room,
            participants: [...room.participants, user.id],
            participantNames: [...room.participantNames, userName],
          };
        }
        return room;
      });
      
      localStorage.setItem('vibeRooms', JSON.stringify(updatedRooms));
      
      await fetchRooms(); // Refresh rooms list
      return updatedRooms.find(r => r.id === roomId);
    } catch (err: any) {
      console.error('Error joining room:', err);
      throw err;
    }
  };

  const leaveRoom = async (roomId: string) => {
    if (!user) {
      throw new Error('Must be logged in to leave a room');
    }

    try {
      const storedRooms = localStorage.getItem('vibeRooms');
      const existingRooms: VibeRoom[] = storedRooms ? JSON.parse(storedRooms) : mockRoomsStorage;
      
      // Find and update room
      const updatedRooms = existingRooms.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            participants: room.participants.filter(id => id !== user.id),
            participantNames: room.participantNames.filter((_, idx) => 
              room.participants[idx] !== user.id
            ),
          };
        }
        return room;
      });
      
      localStorage.setItem('vibeRooms', JSON.stringify(updatedRooms));
      
      await fetchRooms(); // Refresh rooms list
    } catch (err: any) {
      console.error('Error leaving room:', err);
      throw err;
    }
  };

  return {
    rooms,
    loading,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    refresh: fetchRooms,
  };
}