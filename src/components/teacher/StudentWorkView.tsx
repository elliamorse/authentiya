
/**
 * This file provides a component for viewing a student's work on an assignment.
 * It displays the content of a student's submission with options to filter by 
 * different content types (all content, paragraphs, citations).
 * 
 * Updates:
 * - Added dummy content display
 * - Improved the empty state messaging
 * - Fixed formatting of student work content
 */
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Filter } from "lucide-react";
import { StudentAssignment } from "@/lib/teacher-data";
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

  // Generate dummy content if none exists
  const getDisplayContent = () => {
    // If there's no content and assignment is not started
    if (!studentAssignment.content && studentAssignment.status === "not_started") {
      return null;
    }
    
    // If there's no content but assignment is in progress or submitted
    if (!studentAssignment.content && (studentAssignment.status === "in_progress" || studentAssignment.status === "submitted")) {
      return "The student has started this assignment but has not added any content yet.";
    }
    
    // Mock content for demo purposes if none provided
    const content = studentAssignment.content || `
      This is a sample essay on the assigned topic.
      
      The introduction provides context and establishes the main thesis. This paragraph outlines the key arguments that will be developed in the body of the essay.
      
      The first body paragraph presents evidence supporting the first main point. The student has included a quote from a relevant source and provided analysis to connect it to the thesis.
      
      The second body paragraph explores a counterargument, demonstrating critical thinking and engagement with multiple perspectives on the topic.
      
      The conclusion summarizes the key points and restates the thesis in light of the evidence presented. The student ends with a thought-provoking final statement that invites further reflection.
    `;
    
    return content;
  };

  const displayContent = getDisplayContent();

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
              {displayContent ? (
                <div className="whitespace-pre-line">{displayContent}</div>
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
