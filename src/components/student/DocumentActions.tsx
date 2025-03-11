
/**
 * DocumentActions.tsx
 * 
 * This component displays action buttons for the document editor, such as
 * adding citations and submitting assignments. It handles the action logic
 * and button rendering.
 */

import { Button } from "@/components/ui/button";
import { Quote, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

interface DocumentActionsProps {
  linkedAssignment: string | null;
  wordCount: number;
  onAddCitation: () => void;
  onSubmitAssignment: () => void;
}

export default function DocumentActions({
  linkedAssignment,
  wordCount,
  onAddCitation,
  onSubmitAssignment
}: DocumentActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onAddCitation}
      >
        <Quote className="h-4 w-4" />
        <span className="hidden sm:inline">Add Citation</span>
      </Button>
      <Button 
        size="sm" 
        className="gap-2 academic-btn-primary"
        onClick={onSubmitAssignment}
        disabled={!linkedAssignment || wordCount === 0}
      >
        <SendHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Submit</span>
      </Button>
    </div>
  );
}
