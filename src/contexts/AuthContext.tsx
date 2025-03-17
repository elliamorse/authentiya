/**
 * AuthContext.tsx
 * 
 * This context provides authentication state and methods throughout the application.
 * It handles user sessions, login/logout functionality, and authentication state changes.
 *  
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - Supabase client must be properly configured and initialized.
 * 
 * Acceptable Input:
 * - `children`: React.ReactNode - The child components that will be wrapped by the AuthProvider.
 * 
 * Unacceptable Input:
 * - Any non-React.ReactNode type for `children`.
 * 
 * Postconditions:
 * - Provides authentication context to the wrapped components.
 * 
 * Return Values:
 * - None directly, but provides context values through React's Context API.
 * 
 * Error and Exception Conditions:
 * - Errors related to Supabase client initialization and session handling.
 * 
 * Side Effects:
 * - Updates the authentication state and user session.
 * 
 * Invariants:
 * - The context must always provide the current session and user state.
 * 
 * Known Faults:
 * - None identified.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
