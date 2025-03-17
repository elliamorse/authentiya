/**
 * collapsible.tsx
 * 
 * This component renders a collapsible section, allowing users to expand and collapse content.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * Acceptable Input:
 * - `isOpen`: boolean - The open state of the collapsible section.
 * - `onToggle`: function - The function to handle toggling the open state.
 * 
 * Postconditions:
 * - Renders a collapsible section with the specified open state and toggle handler.
 * 
 * Return Values:
 * - None directly, but renders a collapsible element.
 */

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
