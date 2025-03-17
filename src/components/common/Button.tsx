/**
 * Button.tsx
 * 
 * This component provides a customizable button with various styles and sizes.
 * It uses the class-variance-authority library to manage different button variants.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - The class-variance-authority library must be installed and properly configured.
 * 
 * Acceptable Input:
 * - `variant`: string - The style variant of the button (e.g., 'default', 'destructive').
 * - `size`: string - The size of the button (e.g., 'default', 'sm', 'lg', 'icon').
 * 
 * Unacceptable Input:
 * - Any value for `variant` or `size` that is not defined in the `buttonVariants` object.
 * 
 * Postconditions:
 * - Renders a button with the specified styles and sizes.
 * 
 * Return Values:
 * - None directly, but renders a button element.
 * 
 * Error and Exception Conditions:
 * - None identified.
 * 
 * Side Effects:
 * - None identified.
 * 
 * Invariants:
 * - The button must always have a valid `variant` and `size`.
 * 
 * Known Faults:
 * - None identified.
 */

import React from "react"; // Import React library
import { cva, type VariantProps } from "class-variance-authority"; // Import cva function and VariantProps type from class-variance-authority
import { cn } from "@/lib/utils"; // Import cn utility function

// Define button variants using the cva function
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:brightness-110", // Default button style
        destructive: "bg-destructive text-destructive-foreground shadow hover:brightness-110", // Destructive button style
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Outline button style
        secondary: "bg-secondary text-secondary-foreground shadow hover:brightness-95", // Secondary button style
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost button style
        link: "text-primary underline-offset-4 hover:underline", // Link button style
        glass: "glass-panel hover:shadow-glass-lg hover:-translate-y-0.5", // Glass button style
        "glass-primary": "glass-panel bg-primary bg-opacity-90 text-primary-foreground hover:bg-opacity-100 hover:shadow-glass-lg hover:-translate-y-0.5", // Glass primary button style
        "glass-accent": "glass-panel bg-accent bg-opacity-90 text-accent-foreground hover:bg-opacity-100 hover:shadow-glass-lg hover:-translate-y-0.5", // Glass accent button style
      },
      size: {
        default: "h-10 px-4 py-2", // Default button size
        sm: "h-9 px-3 rounded-md", // Small button size
        lg: "h-11 px-8 rounded-md", // Large button size
        icon: "h-10 w-10", // Icon button size
      },
    },
  }
);

// Define the Button component with forwardRef to pass refs to the button element
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(
  // Destructure props and ref, and return a button element
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))} // Apply class names based on variants and size
        ref={ref} // Attach ref to the button element
        {...props} // Spread remaining props to the button element
      >
        {children} // Render children inside the button
      </button>
    );
  }
);

// Set the display name for the Button component
Button.displayName = "Button";

// Export the Button component and buttonVariants object
export { Button, buttonVariants };
