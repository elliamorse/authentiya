
/**
 * This file provides a component for selecting assignments in the teacher dashboard.
 * It renders a list of assignment buttons that a teacher can use to switch between
 * different assignments they're monitoring.
 * 
 * Updates:
 * - Enhanced styling for selected assignments
 * - Improved responsive behavior
 * - Better handling of long assignment titles
 */
import React from "react";
import { Button } from "@/components/common/Button";
import { BookOpen } from "lucide-react";
import { Assignment } from "@/lib/teacher-data";

interface AssignmentSelectorProps {
  assignments: Assignment[];
  selectedAssignmentId: string;
  onAssignmentSelect: (assignmentId: string) => void;
}

export function AssignmentSelector({ 
  assignments,
  selectedAssignmentId,
  onAssignmentSelect
}: AssignmentSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {assignments.map(assignment => (
        <Button 
          key={assignment.id}
          variant={assignment.id === selectedAssignmentId ? "default" : "outline"}
          size="sm"
          onClick={() => onAssignmentSelect(assignment.id)}
          className="flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline truncate max-w-36">{assignment.title}</span>
          <span className="sm:hidden">Assignment {assignment.id}</span>
        </Button>
      ))}
    </div>
  );
}
