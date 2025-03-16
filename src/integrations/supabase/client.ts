
/**
 * File: client.ts
 * 
 * Description: This file configures and exports the Supabase client for authentication
 * and database operations throughout the application.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - Requires Supabase project URL and anon key to be available in environment variables
 * 
 * Postconditions:
 *   - Exports configured Supabase client ready for use
 * 
 * Side effects:
 *   - Creates a Supabase client instance that persists for the application lifetime
 * 
 * Known issues:
 *   - None currently identified
 */

import { createClient } from '@supabase/supabase-js'; // Import Supabase client creator

/**
 * Supabase project URL from environment variables
 * This should be set in the environment configuration for the application
 * 
 * For local development, this would be in a .env file
 * For production, this would be set in the hosting environment
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

/**
 * Supabase anonymous key from environment variables
 * This is a public key safe to use in the client-side code
 * It has limited permissions defined by Row Level Security policies
 */
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Validate that required environment variables are present
 * This helps catch configuration issues early during development
 */
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

/**
 * Create and configure the Supabase client
 * 
 * The client is used for:
 * - Authentication (sign up, sign in, sign out)
 * - Database operations (queries, inserts, updates)
 * - Storage operations (file uploads, downloads)
 * 
 * All operations are subject to Row Level Security (RLS) policies
 * configured in the Supabase dashboard
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persistent session storage by default
    persistSession: true,
    
    // Auto refresh token before expiry
    autoRefreshToken: true,
    
    // Debug auth in development
    debug: import.meta.env.DEV,
  },
});

/**
 * Helper function to get the current user ID
 * This is useful for operations that need the current user's ID
 * 
 * @returns The current user's ID or null if not authenticated
 */
export const getCurrentUserId = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id || null;
};

/**
 * Helper function to get the current user's role
 * 
 * @returns Promise resolving to the user's role or null if not authenticated
 */
export const getCurrentUserRole = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase.rpc('get_current_user_role');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};
