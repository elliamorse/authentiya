
/**
 * Badge.tsx
 * 
 * This component renders a badge with various styling variants.
 * It's used to visually indicate statuses and categories across the application.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-10-15
 * 
 * Revision History:
 * - 2023-11-28: Updated variant types to include additional styles by Authentiya Team
 * - 2023-12-10: Added glass variant for special emphasis by Authentiya Team
 * - 2024-06-22: Updated documentation and fixed variant type issues by Authentiya Team
 * 
 * Preconditions:
 * - Must be used within a React component tree
 * 
 * Input Types:
 * - className: string (optional) - Additional CSS classes to apply
 * - variant: string enum - Style variant ["default", "secondary", "destructive", "outline", "success", "warning", "info", "glass"]
 * - children: React.ReactNode - Content to display inside the badge
 * 
 * Postconditions:
 * - Renders a styled badge element containing the provided children
 * 
 * Return:
 * - React.ReactNode - The rendered badge component
 * 
 * Error Conditions:
 * - None specifically handled, relies on React's error boundaries
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - Component will always render with at least the base styling
 * 
 * Known Faults:
 * - None
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define the badge variants using cva (class-variance-authority)
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-authentiya-green text-white",
        warning: "border-transparent bg-yellow-500 text-white",
        info: "border-transparent bg-authentiya-blue text-white",
        glass: "glass-panel",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Define the props interface for the Badge component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component definition
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
