
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock } from "lucide-react";
import { Assignment } from "@/lib/teacher-data";

interface AssignmentOverviewProps {
  assignment: Assignment;
}

export function AssignmentOverview({ assignment }: AssignmentOverviewProps) {
  // Calculate completion percentage
  const startedPercentage = Math.round((assignment.studentsStarted / assignment.totalStudents) * 100);
  const submittedPercentage = Math.round((assignment.studentsSubmitted / assignment.totalStudents) * 100);
  
  // Helper to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining until due date
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check if assignment is past due
  const isPastDue = dueDate < currentDate;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Assignment Overview</CardTitle>
        {isPastDue ? (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Past Due
          </Badge>
        ) : (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-xl mb-1">{assignment.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{assignment.className}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Created:</span>
              <span className="ml-1 font-medium">{formatDate(assignment.createdAt)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Due:</span>
              <span className="ml-1 font-medium">{formatDate(assignment.dueDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Students:</span>
              <span className="ml-1 font-medium">{assignment.totalStudents}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg. Words:</span>
              <span className="ml-1 font-medium">{assignment.averageWordCount}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Started</span>
            <span className="font-medium">
              {assignment.studentsStarted} / {assignment.totalStudents}
            </span>
          </div>
          <Progress value={startedPercentage} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span>Submitted</span>
            <span className="font-medium">
              {assignment.studentsSubmitted} / {assignment.totalStudents}
            </span>
          </div>
          <Progress value={submittedPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
