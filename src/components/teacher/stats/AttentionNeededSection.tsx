
import React from "react";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { AlertTriangle, Clock } from "lucide-react";
import { Assignment } from "@/lib/teacher-data";

// Students that need attention
const attentionStudents = [
  {
    id: "3",
    name: "Michael Chen",
    status: "not_started",
    issue: "Has not started yet, due date approaching",
  },
  {
    id: "4",
    name: "Sophia Patel",
    issue: "Working much slower than peers (30 min, only 250 words)",
  },
  {
    id: "7",
    name: "David Thompson",
    status: "in_progress",
    issue: "Started very late, may not complete on time",
  },
];

interface AttentionNeededSectionProps {
  assignment: Assignment;
}

export function AttentionNeededSection({ assignment }: AttentionNeededSectionProps) {
  // Calculate time left until due date
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
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
        
        <div className="space-y-3">
          {attentionStudents.map(student => (
            <div key={student.id} className="flex items-start gap-3 p-3 bg-yellow-50/50 rounded-md border border-yellow-100">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-muted-foreground">{student.issue}</div>
              </div>
            </div>
          ))}
        </div>
        
        {daysRemaining > 0 && daysRemaining <= 3 && (
          <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-100 flex items-center gap-3">
            <Clock className="h-5 w-5 text-red-500" />
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
