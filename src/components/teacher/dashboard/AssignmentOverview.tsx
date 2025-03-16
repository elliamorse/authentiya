
/**
 * AssignmentOverview.tsx
 * 
 * This component displays an overview of an assignment's details and metrics,
 * including due date, student progress, and other important information.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-11-08
 * 
 * Revision History:
 * - 2023-12-15: Added completion percentage visualization by Authentiya Team
 * - 2024-06-22: Fixed badge variant type issues by Authentiya Team
 * - 2024-06-26: Fixed error badge variant by Authentiya Team
 * 
 * Preconditions:
 * - Must be used within a React component tree
 * - Requires valid assignment data object
 * 
 * Input Types:
 * - assignment: Assignment - Object containing assignment details and metrics
 * 
 * Postconditions:
 * - Renders a card with assignment overview information
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
 * - Will always display basic assignment information even if some metrics are missing
 * 
 * Known Faults:
 * - None
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/Card";
import { Assignment } from "@/lib/teacherData";
import { Badge } from "@/components/common/Badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, Users, BookOpen, CalendarClock } from "lucide-react";

interface AssignmentOverviewProps {
  assignment: Assignment;
}

export function AssignmentOverview({ assignment }: AssignmentOverviewProps) {
  // Format the due date for display
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Calculate days remaining until due date
  const getDaysRemaining = (dateString: string) => {
    const dueDate = new Date(dateString);
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Determine the due date badge color and text
  const getDueDateBadge = (dateString: string) => {
    const daysRemaining = getDaysRemaining(dateString);
    
    if (daysRemaining < 0) {
      return <Badge variant="destructive">Past Due</Badge>;
    } else if (daysRemaining === 0) {
      return <Badge variant="warning">Due Today</Badge>;
    } else if (daysRemaining <= 2) {
      return <Badge variant="warning">{daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left</Badge>;
    } else {
      return <Badge variant="info">{daysRemaining} days left</Badge>;
    }
  };
  
  // Calculate completion percentage
  const completionPercentage = Math.round((assignment.studentsSubmitted / assignment.totalStudents) * 100);
  
  // Render the component
  return (
    <Card className="md:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Assignment Overview</CardTitle>
        {getDueDateBadge(assignment.dueDate)}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Assignment title and class */}
          <div>
            <h3 className="font-semibold text-xl font-playfair">{assignment.title}</h3>
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{assignment.className}</span>
            </div>
          </div>
          
          {/* Important dates */}
          <div className="grid grid-cols-2 gap-2 text-sm p-2 rounded-md bg-muted/40">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Due Date:</span>
            </div>
            <div className="font-medium">{formatDueDate(assignment.dueDate)}</div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              <span>Created:</span>
            </div>
            <div className="font-medium">{formatDueDate(assignment.createdAt)}</div>
          </div>
          
          {/* Student progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} />
          </div>
          
          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-2">
              <div className="text-center">
                <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xl font-bold">{assignment.studentsSubmitted} / {assignment.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Submitted</p>
              </div>
            </Card>
            
            <Card className="p-2">
              <div className="text-center">
                <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <div className="text-xl font-bold">{Math.floor(assignment.averageTimeSpent / 60)}h {assignment.averageTimeSpent % 60}m</div>
                <p className="text-xs text-muted-foreground">Avg. Time</p>
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
