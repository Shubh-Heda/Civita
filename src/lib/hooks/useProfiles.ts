import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  user_id: string;
  category: 'sports' | 'events' | 'parties';
  display_name: string;
  bio?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Mock profiles storage
const mockProfiles: Record<string, UserProfile> = {};

export function useProfiles() {
  const [profiles, setProfiles] = useState<{ sports?: UserProfile; events?: UserProfile; parties?: UserProfile }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const profilesMap: any = {};
      Object.values(mockProfiles).forEach((profile: UserProfile) => {
        profilesMap[profile.category] = profile;
      });
      
      setProfiles(profilesMap);
    } catch (error: any) {
      console.error('Error loading profiles:', error);
      toast.error('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (category: 'sports' | 'events' | 'parties', updates: Partial<UserProfile>) => {
    try {
      const currentProfile = profiles[category];
      const profileKey = `current-user-${category}`;
      
      const updatedProfile: UserProfile = {
        id: currentProfile?.id || profileKey,
        user_id: 'current-user',
        category,
        display_name: updates.display_name || currentProfile?.display_name || '',
        bio: updates.bio || currentProfile?.bio,
        avatar_url: updates.avatar_url || currentProfile?.avatar_url,
        preferences: updates.preferences || currentProfile?.preferences,
        created_at: currentProfile?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Update mock storage
      mockProfiles[profileKey] = updatedProfile;
      
      // Update local state
      setProfiles(prev => ({
        ...prev,
        [category]: updatedProfile,
      }));
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const createProfile = async (category: 'sports' | 'events' | 'parties', profileData: Partial<UserProfile>) => {
    try {
      const profileKey = `current-user-${category}`;
      
      const newProfile: UserProfile = {
        id: profileKey,
        user_id: 'current-user',
        category,
        display_name: profileData.display_name || '',
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        preferences: profileData.preferences,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add to mock storage
      mockProfiles[profileKey] = newProfile;
      
      // Update local state
      setProfiles(prev => ({
        ...prev,
        [category]: newProfile,
      }));
      
      toast.success('Profile created successfully!');
    } catch (error: any) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile');
    }
  };

  return {
    profiles,
    loading,
    updateProfile,
    createProfile,
    reloadProfiles: loadProfiles,
  };
}
