
/**
 * File: Badge.tsx
 * 
 * Description: This component renders styled badges for status indicators, 
 * tags, and labels throughout the application.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - Requires tailwind CSS for styling
 * 
 * Postconditions:
 *   - Renders a badge with the specified variant styling
 *   - Applies any additional className props
 * 
 * Side effects:
 *   - None
 * 
 * Known issues:
 *   - None currently identified
 */

import React from "react"; // Import React
import { cn } from "@/lib/utils"; // Import utility for class name composition

/**
 * Props for the Badge component
 */
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'; // Visual variant of the badge
  children: React.ReactNode; // Content to display inside the badge
}

/**
 * Badge Component
 * 
 * Renders a styled badge with different visual variants for status indication,
 * tags, or labels throughout the application.
 * 
 * @param variant - Visual style of the badge (default, success, warning, etc)
 * @param children - Content to display inside the badge
 * @param className - Additional CSS classes to apply
 * @param props - Any other HTML div attributes
 */
export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  children, 
  className,
  ...props 
}) => {
  // Define the base styles for all badges
  const baseStyles = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  
  // Variant-specific styles mapped by variant name
  const variantStyles: Record<string, string> = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    outline: "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
  };
  
  // Combine base styles, variant styles, and any additional classes
  const badgeClasses = cn(
    baseStyles,
    variantStyles[variant],
    className
  );

  // Render the badge with the combined classes
  return (
    <div className={badgeClasses} {...props}>
      {children}
    </div>
  );
};
