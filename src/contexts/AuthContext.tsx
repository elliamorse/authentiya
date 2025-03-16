
/**
 * File: AuthContext.tsx
 * 
 * Description: This context provides authentication state and methods throughout the application.
 * It manages user sessions, login/logout functionality, and authentication state changes.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - Requires Supabase client to be configured
 *   - Must be used as a wrapper around components that need auth state
 * 
 * Postconditions:
 *   - Provides auth state and methods to child components
 *   - Listens to auth state changes and updates context accordingly
 * 
 * Side effects:
 *   - Sets up subscription to auth state changes
 *   - Cleans up subscription when component unmounts
 * 
 * Known issues:
 *   - None currently identified
 */

import { createContext, useContext, useState, useEffect } from 'react'; // Import React hooks and context
import { Session, User } from '@supabase/supabase-js'; // Import Supabase auth types
import { supabase } from '@/integrations/supabase/client'; // Import Supabase client

/**
 * Type definition for the authentication context
 * Specifies the shape of the context value
 */
type AuthContextType = {
  session: Session | null; // Current user session
  user: User | null; // Current user data
  loading: boolean; // Loading state for auth operations
  signOut: () => Promise<void>; // Method to sign out the user
};

// Create the context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Provides authentication state and methods to the component tree.
 * Handles session management and auth state changes.
 * 
 * @param children - Child components that will have access to auth context
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State for auth data
  const [session, setSession] = useState<Session | null>(null); // State for user session
  const [user, setUser] = useState<User | null>(null); // State for user data
  const [loading, setLoading] = useState(true); // Loading state for initial session fetch

  useEffect(() => {
    // Get initial session when component mounts
    const getInitialSession = async () => {
      try {
        // Fetch current session from Supabase
        const { data } = await supabase.auth.getSession();
        setSession(data.session); // Set session state
        setUser(data.session?.user ?? null); // Set user state from session
      } catch (error) {
        // Log errors but don't throw to prevent app crash
        console.error('Error getting initial session:', error);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    // Call the function to get initial session
    getInitialSession();

    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Update state when auth changes
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Sign out the current user
   * Calls Supabase auth signOut method
   */
  const signOut = async () => {
    await supabase.auth.signOut();
    // Auth state change listener will update context state
  };

  // Create context value object with all state and methods
  const value = {
    session,
    user,
    loading,
    signOut,
  };

  // Provide context to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the auth context
 * Simplifies accessing auth state and methods in components
 * 
 * @throws Error if used outside of AuthProvider
 * @returns AuthContextType object with auth state and methods
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Context is undefined when hook is used outside of provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
