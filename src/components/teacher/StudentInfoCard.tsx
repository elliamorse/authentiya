
/**
 * StudentInfoCard.tsx
 * 
 * This component displays information about a student's work on an assignment,
 * including submission status, time spent, and activity metrics.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-11-10
 * 
 * Revision History:
 * - 2023-12-15: Added activity tracking visualization by Authentiya Team
 * - 2024-06-22: Fixed badge variant type by Authentiya Team
 * - 2024-06-26: Fixed startDate property error by Authentiya Team
 * 
 * Preconditions:
 * - Must be used within a React component tree
 * - Requires valid studentAssignment data
 * 
 * Input Types:
 * - studentAssignment: StudentAssignment - Data object containing student's assignment information
 * - assignmentTitle: string - Title of the assignment
 * - assignmentClassName: string - Name of the class the assignment belongs to
 * - dueDate: string - Due date of the assignment
 * 
 * Postconditions:
 * - Renders a card with student assignment information
 * 
 * Return:
 * - React.ReactNode - The rendered component
 * 
 * Error Conditions:
 * - None specifically handled, will display available data or fallbacks
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - Will always display basic information even if some metrics are missing
 * 
 * Known Faults:
 * - None
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/common/Badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { StudentAssignment } from "@/lib/teacherData";

interface StudentInfoCardProps {
  studentAssignment: StudentAssignment;
  assignmentTitle: string;
  assignmentClassName: string;
  dueDate: string;
}

export const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ 
  studentAssignment,
  assignmentTitle,
  assignmentClassName,
  dueDate
}) => {
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };
  
  // Calculate time spent in hours and minutes
  const formatTimeSpent = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Determine the badge to show based on assignment status
  const getStatusBadge = () => {
    switch (studentAssignment.status) {
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
            <AlertCircle className="h-3 w-3" />
            Not Started
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Unknown
          </Badge>
        );
    }
  };
  
  // Render the component
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{studentAssignment.studentName}</h3>
          {getStatusBadge()}
        </div>
        
        <div className="space-y-4">
          {/* Student metrics section */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span>Words:</span>
            </div>
            <div className="font-medium">{studentAssignment.wordCount}</div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Time Spent:</span>
            </div>
            <div className="font-medium">{formatTimeSpent(studentAssignment.timeSpent)}</div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Started:</span>
            </div>
            <div className="font-medium">{formatDate(studentAssignment.startTime)}</div>
          </div>
          
          {/* Progress section only shown for started assignments */}
          {studentAssignment.status !== "not_started" && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Completion</span>
                <span className="font-medium">
                  {studentAssignment.status === "submitted" ? "100%" : "In progress"}
                </span>
              </div>
              <Progress 
                value={studentAssignment.status === "submitted" ? 100 : 
                      studentAssignment.wordCount > 0 ? Math.min(85, studentAssignment.wordCount / 10) : 10} 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
