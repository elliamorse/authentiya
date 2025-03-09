
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { StudentAssignment } from "@/lib/teacher-data";

interface StudentWorkViewProps {
  studentAssignment: StudentAssignment;
}

export const StudentWorkView: React.FC<StudentWorkViewProps> = ({ studentAssignment }) => {
  // Format date and time
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card>
      <CardContent className="p-4">
        {studentAssignment.status === "not_started" ? (
          <div className="text-center py-8">
            <Clock className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              Student hasn't started this assignment yet.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-semibold">Student Work</h3>
              {studentAssignment.lastActive && (
                <span className="text-xs text-muted-foreground">
                  Last active: {formatDateTime(studentAssignment.lastActive)}
                </span>
              )}
            </div>
            
            <div className="min-h-[300px] max-h-[500px] overflow-y-auto border rounded-md p-4 bg-background">
              {studentAssignment.content ? (
                <p className="whitespace-pre-line">{studentAssignment.content}</p>
              ) : (
                <p className="text-muted-foreground italic">No content yet</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
