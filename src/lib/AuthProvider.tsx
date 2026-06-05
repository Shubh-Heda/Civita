import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseAuth, usersService } from '../services/supabaseAuthService';
import { supabase, supabaseEnabled } from './supabaseClient';

interface User {
  id: string;
  email: string;
  name: string;
  age?: string;
  phone?: string;
  profession?: string;
  onboarding_completed?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: { user: User } | null; error: any }>;
  signUp: (email: string, password: string, userData: { name: string }) => Promise<{ data: { user: User } | null; error: any }>;
  signInWithGoogle: () => Promise<{ data: { user: User } | null; error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isProduction = import.meta.env.PROD;

  const buildUserFromAuth = async (authUser: any): Promise<User> => {
    const fallback: User = {
      id: authUser.id,
      email: authUser.email || '',
      name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
      age: authUser.user_metadata?.age ? String(authUser.user_metadata.age) : undefined,
      phone: authUser.user_metadata?.phone,
      profession: authUser.user_metadata?.profession,
      onboarding_completed: authUser.user_metadata?.onboarding_completed || false,
    };

    if (!supabaseEnabled) {
      return fallback;
    }

    const { data: profile } = await usersService.getUserProfile(authUser.id);
    if (!profile) {
      await usersService.createProfile({
        id: authUser.id,
        user_id: authUser.id,
        email: authUser.email || '',
        name: fallback.name,
        avatar: authUser.user_metadata?.avatar_url,
        onboarding_completed: fallback.onboarding_completed,
      });
      return fallback;
    }

    return {
      ...fallback,
      name: profile.name || fallback.name,
      age: profile.age ? String(profile.age) : fallback.age,
      phone: profile.phone || fallback.phone,
      profession: profile.profession || fallback.profession,
      onboarding_completed: Boolean(profile.onboarding_completed),
    };
  };

  useEffect(() => {
    // Clean up any OAuth error parameters from URL
    const params = new URLSearchParams(window.location.search);
    if (params.has('error') || params.has('error_code') || params.has('error_description')) {
      console.log('🧹 Cleaning OAuth error from URL');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check if Supabase is configured - if yes, use real backend even on localhost
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

    // On localhost without Supabase: Clear session on mount (force re-auth)
    if (!isProduction && !isSupabaseConfigured) {
      localStorage.removeItem('civita_current_user');
      setUser(null);
      setLoading(false);
      return;
    }

    // On production OR localhost with Supabase configured: Listen for Supabase auth changes
    const unsubscribe = supabaseAuth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(await buildUserFromAuth(authUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isProduction]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Demo account only on localhost
      if (!import.meta.env.PROD && email === 'demo@civita.com' && password === 'demo123') {
        // Use consistent UUID for demo user across sessions
        const DEMO_USER_UUID = '00000000-0000-0000-0000-000000000001';
        console.log('🔥 FIXED CODE RUNNING - Demo User UUID:', DEMO_USER_UUID);
        const user: User = {
          id: DEMO_USER_UUID,
          email: email,
          name: 'Demo User',
          onboarding_completed: true,
        };
        setUser(user);
        setLoading(false);
        return { data: { user }, error: null };
      }

      // Use Supabase auth
      const result = await supabaseAuth.signIn(email, password);
      if (result && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email || '',
          name: result.user.user_metadata?.full_name || result.user.user_metadata?.name || email.split('@')[0],
          age: result.user.user_metadata?.age ? String(result.user.user_metadata.age) : undefined,
          phone: result.user.user_metadata?.phone,
          profession: result.user.user_metadata?.profession,
          onboarding_completed: result.user.user_metadata?.onboarding_completed || false,
        };
        setUser(user);
        setLoading(false);
        return { data: { user }, error: null };
      }
      setLoading(false);
      return { data: null, error: result?.error };
    } catch (error) {
      setLoading(false);
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, userData: { name: string }) => {
    setLoading(true);
    try {
      const result = await supabaseAuth.signUp(email, password, userData.name);
      if (result && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email || '',
          name: userData.name,
          onboarding_completed: false, // New signup - show onboarding form
        };
        setUser(user);
        setLoading(false);
        return { data: { user }, error: null };
      }
      setLoading(false);
      return { data: null, error: result?.error };
    } catch (error) {
      setLoading(false);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    setLoading(true);
    await supabaseAuth.signOut();
    setUser(null);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await supabaseAuth.signInWithGoogle();
      if (result && result.user) {
        const user: User = {
          id: result.user.id,
          email: result.user.email || '',
          name: result.user.user_metadata?.full_name || result.user.email?.split('@')[0] || 'Google User',
        };
        setUser(user);
        setLoading(false);
        return { data: { user }, error: null };
      }
      setLoading(false);
      return { data: null, error: result?.error };
    } catch (error) {
      setLoading(false);
      return { data: null, error };
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      if (supabaseEnabled && supabase) {
        usersService.updateUserProfile(user.id, updates);
        supabase.auth.updateUser({
          data: {
            full_name: updates.name || updatedUser.name,
            age: updates.age || updatedUser.age,
            phone: updates.phone || updatedUser.phone,
            profession: updates.profession || updatedUser.profession,
            onboarding_completed: updates.onboarding_completed ?? updatedUser.onboarding_completed,
          },
        });
      }
      
      // Update localStorage for demo mode
      const currentUser = localStorage.getItem('civita_current_user');
      if (currentUser) {
        const userObj = JSON.parse(currentUser);
        localStorage.setItem('civita_current_user', JSON.stringify({
          ...userObj,
          user_metadata: {
            ...userObj.user_metadata,
            full_name: updates.name || userObj.user_metadata?.full_name,
            age: updates.age || userObj.user_metadata?.age,
            phone: updates.phone || userObj.user_metadata?.phone,
            profession: updates.profession || userObj.user_metadata?.profession,
            onboarding_completed: updates.onboarding_completed !== undefined ? updates.onboarding_completed : userObj.user_metadata?.onboarding_completed,
          }
        }));
        
        // Trigger storage event for other listeners
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'civita_current_user',
          newValue: localStorage.getItem('civita_current_user') || '',
        }));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
