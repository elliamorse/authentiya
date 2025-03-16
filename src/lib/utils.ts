
/**
 * File: utils.ts
 * 
 * Description: This utility file provides common helper functions used throughout the application.
 * It includes functions for class name merging, date formatting, and other utility operations.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - None
 * 
 * Postconditions:
 *   - Provides utility functions for other components
 * 
 * Side effects:
 *   - None
 * 
 * Known issues:
 *   - None currently identified
 */

import { type ClassValue, clsx } from "clsx"; // Import clsx for class name composition
import { twMerge } from "tailwind-merge"; // Import tailwind-merge to resolve Tailwind CSS class conflicts

/**
 * Combines class names using clsx and tailwind-merge
 * 
 * This utility function merges multiple class values and resolves
 * any Tailwind CSS conflicts using tailwind-merge.
 * 
 * @param inputs - Any number of class values (strings, objects, arrays)
 * @returns A string of merged and resolved class names
 * 
 * Example:
 * cn('text-red-500', 'bg-blue-500', { 'p-4': true, 'hidden': false })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date as a string using Intl.DateTimeFormat
 * 
 * @param date - Date to format (Date object or ISO string)
 * @param options - Intl.DateTimeFormatOptions for customizing format
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
) {
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Return formatted date string
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Truncates a string to specified length and adds ellipsis
 * 
 * @param str - String to truncate
 * @param length - Maximum length (default: 100)
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number = 100): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Generates a unique ID with a custom prefix
 * 
 * @param prefix - Optional prefix for the ID
 * @returns A unique string ID
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Safely accesses nested object properties without errors
 * 
 * @param obj - Object to access properties from
 * @param path - Dot-separated path to the property
 * @param defaultValue - Value to return if path doesn't exist
 * @returns The property value or defaultValue if not found
 * 
 * Example:
 * safeGet(user, 'profile.address.city', 'Unknown')
 */
export function safeGet(obj: any, path: string, defaultValue: any = undefined): any {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}

/**
 * Debounces a function call
 * 
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
