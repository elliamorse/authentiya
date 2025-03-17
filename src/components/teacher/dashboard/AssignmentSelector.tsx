/**
 * AssignmentSelector.tsx
 * 
 * This component renders a selector for assignments,
 * allowing the teacher to select an assignment to view or edit.
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
 * - `assignments`: array - A list of assignment objects.
 * - `onSelect`: function - The function to handle assignment selection.
 * 
 * Postconditions:
 * - Renders a selector for assignments.
 * 
 * Return Values:
 * - None directly, but renders a selector element.
 */

import React from "react";
import { Button } from "@/components/common/Button";
import { BookOpen } from "lucide-react";
import { Assignment } from "@/lib/teacherData";

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
          <span className="hidden sm:inline">{assignment.title}</span>
          <span className="sm:hidden">Assignment {assignment.id}</span>
        </Button>
      ))}
    </div>
  );
}
