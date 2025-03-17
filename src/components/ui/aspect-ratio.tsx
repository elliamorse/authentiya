/**
 * aspect-ratio.tsx
 * 
 * This component renders a container with a specified aspect ratio, maintaining the ratio for its content.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Acceptable Input:
 * - `ratio`: number - The aspect ratio to be maintained (e.g., 16/9).
 * 
 * Postconditions:
 * - Renders a container with the specified aspect ratio.
 * 
 * Return Values:
 * - None directly, but renders a container element.
 */

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
