/**
 * StudentList.tsx
 * 
 * This component renders a list of students for the teacher,
 * including student information cards for each student.
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
 * - `students`: array - A list of student objects.
 * 
 * Postconditions:
 * - Renders a list of students with student information cards.
 * 
 * Return Values:
 * - None directly, but renders a list element.
 */

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { StudentAssignment } from "@/lib/teacherData";
import EmptyState from "@/components/student/EmptyState";

interface StudentListProps {
  students: StudentAssignment[];
  onViewStudent: (studentId: string) => void;
}

export default function StudentList({ students, onViewStudent }: StudentListProps) {
  // Log the students being rendered for debugging
  console.log("StudentList rendering with", students.length, "students");
  
  // Format time for display
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Render the status badge based on assignment status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Submitted
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="info" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case "not_started":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Not Started
          </Badge>
        );
      default:
        return (
          <Badge variant="default">
            Unknown
          </Badge>
        );
    }
  };
  
  // If there are no students, show an empty state
  if (students.length === 0) {
    return <EmptyState icon={Eye} message="No students assigned to this assignment" />;
  }
  
  // Render the students table
  return (
    <div className="overflow-auto max-h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Words</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.studentId}>
              <TableCell className="font-medium">{student.studentName}</TableCell>
              <TableCell>{renderStatusBadge(student.status)}</TableCell>
              <TableCell>{formatTime(student.timeSpent)}</TableCell>
              <TableCell>{student.wordCount}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewStudent(student.studentId)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
