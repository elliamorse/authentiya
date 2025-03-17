/**
 * use-toast.ts
 * 
 * This hook provides functionality for displaying toast notifications,
 * allowing components to trigger toast messages.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - None identified.
 * 
 * Acceptable Input:
 * - `message`: string - The message to be displayed in the toast.
 * - `type`: string - The type of the toast (e.g., 'success', 'error').
 * 
 * Postconditions:
 * - Provides functionality to trigger toast notifications.
 * 
 * Return Values:
 * - None directly, but returns functions to trigger toast notifications.
 */

import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
