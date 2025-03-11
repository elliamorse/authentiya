
/**
 * EmptyState.tsx
 * 
 * This component renders an empty state message with an icon.
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
