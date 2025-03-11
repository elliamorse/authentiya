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
