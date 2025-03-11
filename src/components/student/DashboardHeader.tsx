
/**
 * DashboardHeader.tsx
 * 
 * This component displays the dashboard header with title, description,
 * and assignment linking controls.
 */

import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface DashboardHeaderProps {
  linkedAssignment: string | null;
  onShowAssignmentPrompt: () => void;
}

export default function DashboardHeader({
  linkedAssignment,
  onShowAssignmentPrompt
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Student Dashboard</h1>
        <p className="text-muted-foreground">Track your writing progress and assignments</p>
      </div>
      
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
              onClick={onShowAssignmentPrompt}
            >
              Change
            </Button>
          </>
        ) : (
          <Button 
            variant="default" 
            size="sm"
            className="academic-btn-primary"
            onClick={onShowAssignmentPrompt}
          >
            Link to Assignment
          </Button>
        )}
      </div>
    </div>
  );
}
