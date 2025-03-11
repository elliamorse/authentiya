
/**
 * AssignmentCard.tsx
 * 
 * This component renders a single assignment card in the student assignments list.
 * It displays assignment details, status, and provides a button to start or continue working on it.
 * Updated to handle completed assignments with a view-only option.
 */

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { AlertTriangle, Book, Calendar, CheckCircle, Clock, Eye, GraduationCap } from 'lucide-react';

interface AssignmentCardProps {
  assignment: any;
  formatDate: (dateString: string) => string;
  onOpenDocument: (doc: any) => void;
  documents: any[];
  setDocuments: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AssignmentCard({ 
  assignment, 
  formatDate, 
  onOpenDocument, 
  documents, 
  setDocuments 
}: AssignmentCardProps) {
  
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return (
          <Badge variant="info" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> In Progress
          </Badge>
        );
      case "not_started":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Not Started
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Submitted
          </Badge>
        );
      default:
        return null;
    }
  };

  const existingDocument = documents.find(d => d.assignmentId === assignment.id);

  return (
    <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="h-2 bg-authentiya-maroon"></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-lg font-playfair">{assignment.title}</h4>
          {renderStatusBadge(assignment.status)}
        </div>
        
        <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
          <Book className="h-3 w-3" />
          <span>{assignment.className}</span>
        </div>
        
        <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
          <GraduationCap className="h-3 w-3" />
          <span>{assignment.teacherName}</span>
        </div>
        
        <div className="text-sm text-muted-foreground flex gap-1 items-center mb-3">
          <Calendar className="h-3 w-3" />
          <span>Due: {formatDate(assignment.dueDate)}</span>
        </div>
        
        {assignment.status === "in_progress" && (
          <div className="mt-2 p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-900/30 text-xs">
            <div className="flex justify-between mb-1">
              <span>Time spent:</span>
              <span className="font-medium">{Math.floor(assignment.timeSpent / 60)}h {assignment.timeSpent % 60}m</span>
            </div>
            <div className="flex justify-between">
              <span>Words written:</span>
              <span className="font-medium">{assignment.wordCount}</span>
            </div>
          </div>
        )}
        
        <Button 
          variant="default" 
          size="sm" 
          className={`w-full mt-3 ${assignment.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'academic-btn-primary'}`}
          onClick={() => {
            // If the assignment is already completed, view the submission
            if (assignment.status === "completed") {
              // Find the document and open it in view mode
              const doc = documents.find(d => d.assignmentId === assignment.id);
              if (doc) {
                onOpenDocument(doc);
              }
            } else {
              // For in-progress or not started assignments, open or create a document
              if (existingDocument) {
                onOpenDocument(existingDocument);
              } else {
                const newDoc = {
                  id: `d${Date.now()}`,
                  title: assignment.title,
                  assignmentId: assignment.id,
                  className: assignment.className,
                  teacherName: assignment.teacherName,
                  lastEdited: new Date().toISOString(),
                  status: "in_progress",
                  dueDate: assignment.dueDate,
                  timeSpent: 0,
                  wordCount: 0,
                  content: ""
                };
                setDocuments([...documents, newDoc]);
                onOpenDocument(newDoc);
              }
            }
          }}
        >
          {assignment.status === "completed" ? (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>View Submission</span>
            </div>
          ) : (
            assignment.status === "not_started" ? "Start Assignment" : "Continue Working"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
