
/**
 * This file provides a component for viewing a student's work on an assignment.
 * It displays the content of a student's submission with options to filter by 
 * different content types (all content, paragraphs, citations).
 * 
 * Updates:
 * - Enhanced content display with proper formatting
 * - Added citation highlighting
 * - Improved filtering options for different content types
 * - Fixed empty state messaging for different assignment statuses
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Filter, Quote } from "lucide-react";
import { StudentAssignment } from "@/lib/teacher-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentWorkViewProps {
  studentAssignment: StudentAssignment;
}

export const StudentWorkView: React.FC<StudentWorkViewProps> = ({ studentAssignment }) => {
  const [viewOption, setViewOption] = useState<string>("all");
  const [displayContent, setDisplayContent] = useState<string | null>(null);
  
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

  // Process content based on view option
  useEffect(() => {
    if (!studentAssignment.content && studentAssignment.status === "not_started") {
      setDisplayContent(null);
      return;
    }
    
    if (!studentAssignment.content && (studentAssignment.status === "in_progress" || studentAssignment.status === "submitted")) {
      setDisplayContent("The student has started this assignment but has not added any content yet.");
      return;
    }
    
    const content = studentAssignment.content || `
      This is a sample essay on the assigned topic.
      
      The introduction provides context and establishes the main thesis. This paragraph outlines the key arguments that will be developed in the body of the essay.
      
      The first body paragraph presents evidence supporting the first main point. The student has included a quote from a relevant source and provided analysis to connect it to the thesis.
      
      The second body paragraph explores a counterargument, demonstrating critical thinking and engagement with multiple perspectives on the topic.
      
      The conclusion summarizes the key points and restates the thesis in light of the evidence presented. The student ends with a thought-provoking final statement that invites further reflection.
    `;
    
    // Process content based on view option
    if (viewOption === "citations" && studentAssignment.citationCount > 0) {
      // Extract paragraphs with citations (for demo purposes, we'll assume paragraphs with quotes are citations)
      const paragraphs = content.split("\n\n");
      const citationParagraphs = paragraphs.filter(p => p.includes('"') || p.includes("'"));
      if (citationParagraphs.length > 0) {
        setDisplayContent(citationParagraphs.join("\n\n"));
      } else {
        // Fall back to highlighting quotes
        setDisplayContent(content.replace(/(["'])(.*?)\1/g, '<span class="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">$1$2$1</span>'));
      }
    } else if (viewOption === "paragraphs") {
      // Show only regular paragraphs (not too short)
      const paragraphs = content.split("\n\n");
      const normalParagraphs = paragraphs.filter(p => p.length > 50);
      setDisplayContent(normalParagraphs.join("\n\n"));
    } else {
      // Show all content
      setDisplayContent(content);
    }
    
  }, [studentAssignment, viewOption]);

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
                viewOption === "citations" ? (
                  <div dangerouslySetInnerHTML={{ __html: displayContent }} className="whitespace-pre-line" />
                ) : (
                  <div className="whitespace-pre-line">{displayContent}</div>
                )
              ) : (
                <div className="text-center py-8">
                  <Quote className="h-8 w-8 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground italic">No content yet</p>
                </div>
              )}
            </div>
            
            {studentAssignment.citationCount > 0 && (
              <div className="mt-2 text-xs text-muted-foreground flex items-center">
                <Quote className="h-3 w-3 mr-1" />
                <span>Citations: {studentAssignment.citationCount}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
