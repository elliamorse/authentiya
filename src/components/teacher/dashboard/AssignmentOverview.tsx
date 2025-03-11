/**
 * File: AssignmentOverview.tsx
 * 
 * Description: This component displays a comprehensive overview of a selected assignment,
 * including submission statistics, AI usage risk indicators, and time-related metrics.
 * The component serves as a key part of the teacher dashboard, providing at-a-glance
 * information about student progress and potential academic integrity concerns.
 * 
 * Updates: Now uses actual calculated statistics from the student data instead of hardcoded values.
 */

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, FileCheck, FileWarning, BarChart, User } from "lucide-react";
import { Assignment } from "@/lib/teacherData";

interface AssignmentOverviewProps {
  assignment: Assignment;
}

export function AssignmentOverview({ assignment }: AssignmentOverviewProps) {
  // Calculate completion percentage based on actual student data
  const startedPercentage = Math.round((assignment.studentsStarted / assignment.totalStudents) * 100);
  const submittedPercentage = Math.round((assignment.studentsSubmitted / assignment.totalStudents) * 100);
  
  // Calculate estimated AI usage risk (for demo purposes)
  // In a real app, this would come from Authentiya's analysis algorithms
  const potentialAiRiskCount = Math.floor(assignment.studentsSubmitted * 0.2); // Simulating 20% of submissions flagged
  const aiRiskPercentage = assignment.studentsSubmitted > 0 
    ? Math.round((potentialAiRiskCount / assignment.studentsSubmitted) * 100)
    : 0;
  
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
        
        {/* Authentiya AI Usage Risk Metrics Section */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
            <BarChart className="h-4 w-4 text-authentiya-maroon" />
            <span>Authentiya Insights</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Potential AI Usage</span>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileWarning className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
                  <span className="font-medium">{potentialAiRiskCount}</span>
                </div>
                <Badge 
                  variant={aiRiskPercentage > 30 ? "destructive" : aiRiskPercentage > 15 ? "warning" : "secondary"} 
                  className="text-xs"
                >
                  {aiRiskPercentage}%
                </Badge>
              </div>
            </div>
            
            <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Original Work</span>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileCheck className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  <span className="font-medium">{assignment.studentsSubmitted - potentialAiRiskCount}</span>
                </div>
                <Badge variant="success" className="text-xs">
                  {assignment.studentsSubmitted > 0 ? (100 - aiRiskPercentage) : 0}%
                </Badge>
              </div>
            </div>
            
            <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Avg. Time Spent</span>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                <span className="font-medium">{assignment.averageTimeSpent} min</span>
              </div>
            </div>
            
            <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Requiring Review</span>
              <div className="flex items-center">
                <AlertTriangle className="h-3.5 w-3.5 text-authentiya-maroon mr-1.5" />
                <span className="font-medium">
                  {Math.max(Math.floor(assignment.studentsSubmitted * 0.15), 0)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground flex items-center">
            <User className="h-3 w-3 mr-1 inline-block" />
            <span>Last analysis: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
