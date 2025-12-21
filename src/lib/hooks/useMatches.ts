import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { matchService } from '../../services/backendService';
import { supabase } from '../supabase';

export interface Match {
  id: string;
  user_id: string;
  category: 'sports' | 'events' | 'parties';
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed';
  created_at: string;
}

// Mock matches storage (fallback)
const mockMatches: Record<string, Match[]> = {
  sports: [],
  events: [],
  parties: []
};

export function useMatches(category: 'sports' | 'events' | 'parties') {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [useBackend, setUseBackend] = useState(true);

  useEffect(() => {
    loadMatches();
    
    // Subscribe to real-time updates if using backend
    if (useBackend) {
      const channel = supabase
        .channel('matches-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'matches',
            filter: `category=eq.${category}`,
          },
          () => {
            loadMatches();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [category, useBackend]);

  const loadMatches = async () => {
    try {
      if (useBackend) {
        // Try backend first
        const data = await matchService.getMatches({ 
          category,
          status: 'upcoming' 
        });
        setMatches(data);
      } else {
        // Fallback to mock
        await new Promise(resolve => setTimeout(resolve, 300));
        const categoryMatches = mockMatches[category] || [];
        setMatches(categoryMatches);
      }
    } catch (error: any) {
      console.error('Backend failed, using fallback:', error);
      // Silently fall back to mock
      setUseBackend(false);
      const categoryMatches = mockMatches[category] || [];
      setMatches(categoryMatches);
    } finally {
      setLoading(false);
    }
  };

  const createMatch = async (matchData: Partial<Match>) => {
    try {
      if (useBackend) {
        // Try backend first
        const newMatch = await matchService.createMatch({
          user_id: 'current-user',
          category,
          status: 'upcoming',
          title: matchData.title || '',
          description: matchData.description,
          date: matchData.date || '',
          time: matchData.time || '',
          location: matchData.location || '',
          turf_name: matchData.location || '',
          sport: 'General',
          visibility: 'public',
          payment_option: 'free',
        } as any);
        
        await loadMatches();
        toast.success('Match created successfully!');
        return newMatch as Match;
      } else {
        // Fallback to mock
        const newMatch: Match = {
          id: `match-${Date.now()}-${Math.random()}`,
          user_id: 'current-user',
          category,
          status: 'upcoming',
          created_at: new Date().toISOString(),
          title: matchData.title || '',
          description: matchData.description,
          date: matchData.date || '',
          time: matchData.time || '',
          location: matchData.location || '',
        };

        if (!mockMatches[category]) {
          mockMatches[category] = [];
        }
        mockMatches[category].push(newMatch);
        setMatches(prev => [...prev, newMatch]);
        toast.success('Match created successfully!');
        return newMatch;
      }
    } catch (error: any) {
      console.error('Backend failed, using fallback:', error);
      // Fall back to mock on error
      setUseBackend(false);
      const newMatch: Match = {
        id: `match-${Date.now()}-${Math.random()}`,
        user_id: 'current-user',
        category,
        status: 'upcoming',
        created_at: new Date().toISOString(),
        title: matchData.title || '',
        description: matchData.description,
        date: matchData.date || '',
        time: matchData.time || '',
        location: matchData.location || '',
      };

      if (!mockMatches[category]) {
        mockMatches[category] = [];
      }
      mockMatches[category].push(newMatch);
      setMatches(prev => [...prev, newMatch]);
      toast.success('Match created successfully!');
      return newMatch;
    }
  };

  const updateMatchStatus = async (matchId: string, status: 'upcoming' | 'completed') => {
    try {
      // Update in mock storage
      const matchIndex = mockMatches[category].findIndex(m => m.id === matchId);
      if (matchIndex !== -1) {
        mockMatches[category][matchIndex].status = status;
        
        // Update local state
        setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status } : m));
        toast.success('Match status updated!');
      }
    } catch (error: any) {
      console.error('Error updating match status:', error);
      toast.error('Failed to update match status');
    }
  };

  const deleteMatch = async (matchId: string) => {
    try {
      // Remove from mock storage
      mockMatches[category] = mockMatches[category].filter(m => m.id !== matchId);
      
      // Update local state
      setMatches(prev => prev.filter(m => m.id !== matchId));
      toast.success('Match deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting match:', error);
      toast.error('Failed to delete match');
    }
  };

  const discoverMatches = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Return all matches for this category
      return mockMatches[category] || [];
    } catch (error: any) {
      console.error('Error discovering matches:', error);
      toast.error('Failed to discover matches');
      return [];
    }
  };

  return {
    matches,
    loading,
    createMatch,
    updateMatchStatus,
    deleteMatch,
    discoverMatches,
    reloadMatches: loadMatches,
  };
}
