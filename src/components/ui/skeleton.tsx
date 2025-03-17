/**
 * skeleton.tsx
 * 
 * This component renders a skeleton loader, providing a placeholder for content that is loading.
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
 * - `width`: string - The width of the skeleton loader.
 * - `height`: string - The height of the skeleton loader.
 * 
 * Postconditions:
 * - Renders a skeleton loader with the specified width and height.
 * 
 * Return Values:
 * - None directly, but renders a skeleton loader element.
 */

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
