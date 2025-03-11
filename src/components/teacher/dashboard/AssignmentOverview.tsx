
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
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-playfair">Assignment Overview</CardTitle>
        {isPastDue ? (
          <Badge variant="secondary" className="flex items-center gap-1 dark:bg-gray-700">
            <Clock className="h-3 w-3" />
            Inactive
          </Badge>
        ) : (
          <Badge variant="default" className="flex items-center gap-1 dark:bg-emerald-800 dark:text-emerald-100">
            <Clock className="h-3 w-3" />
            Active
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-xl mb-1 font-playfair dark:text-white">{assignment.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 dark:text-gray-300">{assignment.className}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground dark:text-gray-400">Created:</span>
              <span className="ml-1 font-medium dark:text-gray-200">{formatDate(assignment.createdAt)}</span>
            </div>
            <div>
              <span className="text-muted-foreground dark:text-gray-400">Due:</span>
              <span className="ml-1 font-medium dark:text-gray-200">{formatDate(assignment.dueDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground dark:text-gray-400">Students:</span>
              <span className="ml-1 font-medium dark:text-gray-200">{assignment.totalStudents}</span>
            </div>
            <div>
              <span className="text-muted-foreground dark:text-gray-400">Avg. Words:</span>
              <span className="ml-1 font-medium dark:text-gray-200">{assignment.averageWordCount}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="dark:text-gray-300">Started</span>
            <span className="font-medium dark:text-gray-200">
              {assignment.studentsStarted} / {assignment.totalStudents}
            </span>
          </div>
          <Progress value={startedPercentage} className="h-2 dark:bg-gray-700" />
          
          <div className="flex justify-between text-sm">
            <span className="dark:text-gray-300">Submitted</span>
            <span className="font-medium dark:text-gray-200">
              {assignment.studentsSubmitted} / {assignment.totalStudents}
            </span>
          </div>
          <Progress value={submittedPercentage} className="h-2 dark:bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  );
}
