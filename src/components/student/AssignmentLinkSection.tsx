
/**
 * This file provides a component for displaying and managing the assignment
 * linking status in the document editor.
 * 
 * Updates:
 * - Improved display of linked assignment title
 * - Enhanced mobile responsiveness
 * - Added tooltip for long assignment titles
 */
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssignmentLinkSectionProps {
  linkedAssignment: string | null;
  onLinkAssignment: () => void;
}

export default function AssignmentLinkSection({
  linkedAssignment,
  onLinkAssignment
}: AssignmentLinkSectionProps) {
  const displayTitle = linkedAssignment && linkedAssignment.length > 25 
    ? linkedAssignment.substring(0, 22) + '...' 
    : linkedAssignment;
    
  return (
    <div className="flex items-center gap-2">
      {linkedAssignment ? (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-authentiya-maroon/10 text-authentiya-maroon px-3 py-1 rounded-full font-medium text-sm flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {displayTitle}
                </div>
              </TooltipTrigger>
              {linkedAssignment.length > 25 && (
                <TooltipContent>
                  <p>{linkedAssignment}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
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
