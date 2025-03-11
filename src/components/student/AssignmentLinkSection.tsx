
/**
 * This file provides a component for displaying and managing the assignment
 * linking status in the document editor.
 */
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface AssignmentLinkSectionProps {
  linkedAssignment: string | null;
  onLinkAssignment: () => void;
}

export default function AssignmentLinkSection({
  linkedAssignment,
  onLinkAssignment
}: AssignmentLinkSectionProps) {
  return (
    <div className="flex items-center gap-2">
      {linkedAssignment ? (
        <>
          <div className="bg-authentiya-maroon/10 text-authentiya-maroon px-3 py-1 rounded-full font-medium text-sm flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            Assignment Linked
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onLinkAssignment}
          >
            Change
          </Button>
        </>
      ) : (
        <Button 
          variant="default" 
          size="sm"
          className="academic-btn-primary"
          onClick={onLinkAssignment}
        >
          Link to Assignment
        </Button>
      )}
    </div>
  );
}
