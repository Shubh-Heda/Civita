import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: { user: User } | null; error: any }>;
  signUp: (email: string, password: string, userData: { name: string }) => Promise<{ data: { user: User } | null; error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      name: email.includes('demo') ? 'Demo User' : email.split('@')[0],
    };
    
    setUser(newUser);
    setLoading(false);
    
    return { data: { user: newUser }, error: null };
  };

  const signUp = async (email: string, password: string, userData: { name: string }) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      name: userData.name,
    };
    
    setUser(newUser);
    setLoading(false);
    
    return { data: { user: newUser }, error: null };
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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
