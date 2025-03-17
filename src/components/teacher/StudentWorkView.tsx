/**
 * StudentWorkView.tsx
 * 
 * This component renders a view of a student's work,
 * including the student's assignments and documents.
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
 * - `studentId`: string - The ID of the student.
 * 
 * Postconditions:
 * - Renders a view of the student's work.
 * 
 * Return Values:
 * - None directly, but renders a view element.
 */

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Filter } from "lucide-react";
import { StudentAssignment } from "@/lib/teacherData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentWorkViewProps {
  studentAssignment: StudentAssignment;
}

export const StudentWorkView: React.FC<StudentWorkViewProps> = ({ studentAssignment }) => {
  const [viewOption, setViewOption] = useState<string>("all");
  
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
              <div className="flex items-center gap-2">
                {studentAssignment.lastActive && (
                  <span className="text-xs text-muted-foreground">
                    Last active: {formatDateTime(studentAssignment.lastActive)}
                  </span>
                )}
                <Select defaultValue="all" onValueChange={setViewOption}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    <SelectValue placeholder="View options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Content</SelectItem>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="citations">Citations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
}
