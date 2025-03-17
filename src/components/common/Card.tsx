/**
 * Card.tsx
 * 
 * This component provides a customizable card with various styles and hover effects.
 * It uses the class-variance-authority library to manage different card variants.
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
 * - `variant`: string - The style variant of the card (e.g., 'default', 'glass', 'glass-lg').
 * - `hover`: string - The hover effect of the card (e.g., 'default', 'lift').
 * 
 * Unacceptable Input:
 * - Any value for `variant` or `hover` that is not defined in the `cardVariants` object.
 * 
 * Postconditions:
 * - Renders a card with the specified styles and hover effects.
 * 
 * Return Values:
 * - None directly, but renders a card element.
 * 
 * Error and Exception Conditions:
 * - None identified.
 * 
 * Side Effects:
 * - None identified.
 * 
 * Invariants:
 * - The card must always have a valid `variant` and `hover`.
 * 
 * Known Faults:
 * - None identified.
 */

// Import React library
// Import cva function and VariantProps type from class-variance-authority
// Import cn utility function

// Define card variants using the cva function
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border shadow transition-all",
  {
    variants: {
      variant: {
        default: "bg-card",
        glass: "glass-panel",
        "glass-lg": "glass-panel-lg",
      },
      hover: {
        default: "",
        lift: "hover-lift",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "default",
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, variant, hover, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, hover, className }))}
    {...props}
  />
));
Card.displayName = "Card";

const cardHeaderVariants = cva(
  "flex flex-col space-y-1.5 p-6",
  {
    variants: {
      variant: {
        default: "",
        glass: "border-b border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<
  HTMLDivElement,
  CardHeaderProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardHeaderVariants({ variant, className }))}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
