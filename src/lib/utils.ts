
/**
 * utils.ts
 * 
 * This utility file provides common functions used throughout the application,
 * primarily for CSS class name manipulation and merging.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-10-01
 * 
 * Revision History:
 * - 2023-11-15: Added additional documentation by Authentiya Team
 * - 2024-06-22: Updated with comprehensive documentation by Authentiya Team
 * 
 * Preconditions:
 * - None
 * 
 * Input Types:
 * - inputs: ClassValue[] - Array of class values to be merged
 * 
 * Postconditions:
 * - None
 * 
 * Return:
 * - string - Merged and deduplicated class names
 * 
 * Error Conditions:
 * - None specifically handled
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - Function will always return a string, even if inputs are empty
 * 
 * Known Faults:
 * - None
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn (className)
 * 
 * This utility function combines multiple class names into a single string,
 * merging Tailwind CSS classes properly to avoid conflicts.
 * 
 * @param inputs - An array of class values to be merged
 * @returns A string of merged class names with duplicates and conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  // Use clsx to merge class names and handle conditional classes
  // Then pass the result to twMerge to handle Tailwind-specific class conflicts
  return twMerge(clsx(inputs))
}
