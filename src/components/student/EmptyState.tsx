/**
 * EmptyState.tsx
 * 
 * This component renders an empty state message when there are no documents or assignments to display.
 * It includes a message and an optional action button.
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
 * - `message`: string - The empty state message.
 * - `action`: object (optional) - The action button details including label and onClick handler.
 * 
 * Postconditions:
 * - Renders an empty state message with an optional action button.
 * 
 * Return Values:
 * - None directly, but renders an empty state element.
 */
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
}

export default function EmptyState({ icon: Icon, message }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <Icon className="h-12 w-12 mx-auto text-muted-foreground/50" />
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
}
