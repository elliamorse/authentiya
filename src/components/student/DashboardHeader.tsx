
/**
 * DashboardHeader.tsx
 * 
 * This component displays the header for the student dashboard.
 * It has been updated to remove the "Dashboard" title and only shows 
 * linked assignment information or the option to link an assignment.
 */

import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

interface DashboardHeaderProps {
  linkedAssignment: string | null;
  onShowAssignmentPrompt: () => void;
}

export default function DashboardHeader({
  linkedAssignment,
  onShowAssignmentPrompt
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      {!linkedAssignment && (
        <div className="flex gap-4 items-center">
          <Button
            onClick={onShowAssignmentPrompt}
            variant="outline"
            className="gap-2"
          >
            <Link2 className="h-4 w-4" />
            Link to Assignment
          </Button>
          <span className="text-sm text-muted-foreground">
            Linking to an assignment will enable tracking features
          </span>
        </div>
      )}
      
      {linkedAssignment && (
        <div className="flex gap-4 items-center">
          <div className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded-full dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1">
            <Link2 className="h-3 w-3" />
            Assignment Linked
          </div>
        </div>
      )}
    </div>
  );
}
