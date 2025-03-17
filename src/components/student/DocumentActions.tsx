/**
 * DocumentActions.tsx
 * 
 * This component renders a set of actions that can be performed on a document,
 * including editing, deleting, and sharing the document.
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
 * - `documentId`: string - The ID of the document.
 * 
 * Postconditions:
 * - Renders a set of actions for the document.
 * 
 * Return Values:
 * - None directly, but renders a set of action elements.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Quote, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import CitationPrompt from "./CitationPrompt";

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
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  
  const handleSubmitClick = () => {
    if (!linkedAssignment) {
      toast.error("No assignment linked. Please link an assignment before submitting.");
      return;
    }
    
    if (wordCount === 0) {
      toast.error("Document is empty. Please add some content before submitting.");
      return;
    }
    
    // If validation passes, call the onSubmitAssignment function
    onSubmitAssignment();
  };
  
  const handleCitationSubmit = (citation: {
    type: "website" | "book" | "ai" | "other";
    source: string;
    details?: string;
  }) => {
    onAddCitation();
    setShowCitationPrompt(false);
    
    toast.success("Citation added", {
      description: `Added citation from ${citation.source}`
    });
  };
  
  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setShowCitationPrompt(true)}
          title="Add citation to your document"
        >
          <Quote className="h-4 w-4" />
          <span className="hidden sm:inline">Add Citation</span>
        </Button>
        <Button 
          size="sm" 
          className="gap-2 academic-btn-primary"
          onClick={handleSubmitClick}
          disabled={!linkedAssignment || wordCount === 0}
          title={!linkedAssignment 
            ? "Link to an assignment first" 
            : wordCount === 0 
              ? "Add content before submitting" 
              : "Submit your assignment"}
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Submit</span>
        </Button>
      </div>
      
      {showCitationPrompt && (
        <CitationPrompt
          onSubmit={handleCitationSubmit}
          onDismiss={() => setShowCitationPrompt(false)}
        />
      )}
    </>
  );
}
