/**
 * AttentionNeededSection.tsx
 * 
 * This component renders a section highlighting students or assignments that need attention,
 * including those with low grades or incomplete assignments.
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
 * - `attentionNeeded`: array - A list of students or assignments that need attention.
 * 
 * Postconditions:
 * - Renders a section highlighting students or assignments that need attention.
 * 
 * Return Values:
 * - None directly, but renders a section element.
 */
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { AlertTriangle, Clock } from "lucide-react";
import { Assignment, StudentAssignment } from "@/lib/teacherData";

interface AttentionNeededSectionProps {
  assignment: Assignment;
  students?: StudentAssignment[];
}

export function AttentionNeededSection({ assignment, students = [] }: AttentionNeededSectionProps) {
  // Calculate time left until due date
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Find students who need attention
  const attentionStudents = useMemo(() => {
    const result = [];
    
    // Check for students who haven't started yet
    const notStartedStudents = students.filter(s => s.status === "not_started");
    for (const student of notStartedStudents) {
      result.push({
        id: student.studentId,
        name: student.studentName,
        status: "not_started",
        issue: "Has not started yet, due date approaching",
      });
    }
    
    // Check for students who started but have low productivity
    const lowProductivityStudents = students.filter(s => 
      s.status === "in_progress" && 
      s.timeSpent > 30 && 
      s.wordCount < 250
    );
    
    for (const student of lowProductivityStudents) {
      result.push({
        id: student.studentId,
        name: student.studentName,
        status: "in_progress",
        issue: `Working slowly (${student.timeSpent} min, only ${student.wordCount} words)`,
      });
    }
    
    // Check for students who started very late (in last 24 hours)
    const lateStartStudents = students.filter(s => {
      if (!s.startTime) return false;
      const startDate = new Date(s.startTime);
      const timeSinceStart = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
      return s.status === "in_progress" && timeSinceStart < 24 && daysRemaining <= 2;
    });
    
    for (const student of lateStartStudents) {
      result.push({
        id: student.studentId,
        name: student.studentName,
        status: "in_progress",
        issue: "Started very late, may not complete on time",
      });
    }
    
    return result;
  }, [students, daysRemaining]);
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Students Needing Attention</h3>
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {attentionStudents.length} students
          </Badge>
        </div>
        
        {attentionStudents.length > 0 ? (
          <div className="space-y-3">
            {attentionStudents.map(student => (
              <div key={student.id} className="flex items-start gap-3 p-3 bg-yellow-50/50 dark:bg-yellow-900/20 rounded-md border border-yellow-100 dark:border-yellow-900/30">
                <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mt-0.5" />
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.issue}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-green-50/50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/30">
            <p className="text-sm text-center text-green-600 dark:text-green-400">
              No students currently need attention
            </p>
          </div>
        )}
        
        {daysRemaining > 0 && daysRemaining <= 3 && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-100 dark:border-red-900/30 flex items-center gap-3">
            <Clock className="h-5 w-5 text-red-500 dark:text-red-400" />
            <div>
              <div className="font-medium">Due Date Approaching</div>
              <div className="text-sm text-muted-foreground">
                This assignment is due in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}. 
                {assignment.studentsStarted < assignment.totalStudents && 
                  ` ${assignment.totalStudents - assignment.studentsStarted} students haven't started yet.`}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
