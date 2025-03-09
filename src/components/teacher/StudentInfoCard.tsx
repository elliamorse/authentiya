
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/common/Badge";
import { StudentAssignment } from "@/lib/teacher-data";
import { BookOpen, Calendar, CheckCircle2, Clock, Copy, Quote, User } from "lucide-react";

interface StudentInfoCardProps {
  studentAssignment: StudentAssignment;
  assignmentTitle: string;
  assignmentClassName: string;
  dueDate: string | null;
}

export const StudentInfoCard: React.FC<StudentInfoCardProps> = ({
  studentAssignment,
  assignmentTitle,
  assignmentClassName,
  dueDate,
}) => {
  // Format date and time
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not started";
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time spent
  const formatTimeSpent = (minutes: number) => {
    if (minutes === 0) return "N/A";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    }
    
    return `${hours}h ${mins}m`;
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Submitted
        </Badge>;
      case "in_progress":
        return <Badge variant="info" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> In Progress
        </Badge>;
      case "not_started":
        return <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Not Started
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-authentiya-maroon/10 flex items-center justify-center">
              <User className="h-4 w-4 text-authentiya-maroon" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{studentAssignment.studentName}</h2>
              <p className="text-sm text-muted-foreground">Student</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 text-sm mt-2">
            <div>
              <div className="text-muted-foreground">Status</div>
              <div>{getStatusBadge(studentAssignment.status)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Started</div>
              <div className="font-medium">{formatDate(studentAssignment.startTime)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Time Spent</div>
              <div className="font-medium">{formatTimeSpent(studentAssignment.timeSpent)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Word Count</div>
              <div className="font-medium">{studentAssignment.wordCount}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Copy/Paste Count</div>
              <div className="font-medium flex items-center gap-1">
                <Copy className="h-3 w-3" />
                {studentAssignment.copyPasteCount}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Citations</div>
              <div className="font-medium flex items-center gap-1">
                <Quote className="h-3 w-3" />
                {studentAssignment.citationCount}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-authentiya-maroon" />
            <h3 className="font-medium">{assignmentTitle}</h3>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {formatDate(dueDate)}</span>
          </div>
          <div className="text-sm text-muted-foreground">{assignmentClassName}</div>
        </div>
      </CardContent>
    </Card>
  );
};
