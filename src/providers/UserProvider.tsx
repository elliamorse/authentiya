
/**
 * UserProvider.tsx
 * 
 * This provider gives access to the current authenticated user throughout the application.
 * It handles user authentication state and provides context for user data.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchUserProfile() {
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setUser(null);
        return;
      }
      
      // Get additional user profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profileError) {
        throw profileError;
      }
      
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        role: profile?.role,
        firstName: profile?.first_name,
        lastName: profile?.last_name
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchUserProfile();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          fetchUserProfile();
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
    setLoading(true);
    await fetchUserProfile();
  };

  const value = {
    user,
    loading,
    error,
    refreshUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
