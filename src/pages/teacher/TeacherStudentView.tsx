
/**
 * TeacherStudentView.tsx
 * 
 * This component provides a detailed view of a specific student's assignment,
 * including their work, comments, and submission details for a teacher to review.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-11-15
 * 
 * Revision History:
 * - 2023-12-20: Added tabbed interface for work/comments by Authentiya Team
 * - 2024-06-26: Updated StudentInfoCard props to match component definition by Authentiya Team
 * 
 * Preconditions:
 * - Must be used within a React component tree with React Router
 * - Requires studentId and assignmentId as URL parameters
 * 
 * Input Types:
 * - URL parameters: studentId, assignmentId
 * 
 * Postconditions:
 * - Renders a detailed view of a student's assignment
 * 
 * Return:
 * - React.ReactNode - The rendered component
 * 
 * Error Conditions:
 * - Handles missing student/assignment data with a not found message
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - Will always display "not found" message if data is missing
 * 
 * Known Faults:
 * - None
 */

import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStudentAssignment, getAssignmentById } from "@/lib/teacherData";
import { ArrowLeft, FileText, MessageSquare } from "lucide-react";
import { StudentInfoCard } from "@/components/teacher/StudentInfoCard";
import { StudentWorkView } from "@/components/teacher/StudentWorkView";
import { CommentsSection } from "@/components/teacher/CommentsSection";

export default function TeacherStudentView() {
  const { studentId, assignmentId } = useParams();
  const navigate = useNavigate();
  
  // Get student assignment data
  const studentAssignment = studentId && assignmentId
    ? getStudentAssignment(studentId, assignmentId)
    : undefined;
  
  // Get assignment details
  const assignment = assignmentId
    ? getAssignmentById(assignmentId)
    : undefined;
  
  // Handle navigation if data is missing
  if (!studentAssignment || !assignment) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          userEmail="teacher@example.com" 
          userRole="teacher" 
          onLogout={() => navigate("/")} 
        />
        
        <main className="flex-1 container py-6 space-y-6">
          <Button 
            variant="ghost" 
            className="w-fit flex items-center gap-2 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">Student assignment not found</h3>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        userEmail="teacher@example.com" 
        userRole="teacher" 
        onLogout={() => navigate("/")} 
      />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="flex flex-col space-y-6">
          <Button 
            variant="ghost" 
            className="w-fit flex items-center gap-2 -ml-2"
            onClick={() => navigate(`/teacher/assignment/${assignmentId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assignment
          </Button>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Student Information Card */}
            <StudentInfoCard 
              studentAssignment={studentAssignment}
              assignmentTitle={assignment.title}
              assignmentClassName={assignment.className}
              dueDate={assignment.dueDate}
            />
            
            {/* Student Work and Comments */}
            <div className="md:col-span-2 space-y-4">
              <Tabs defaultValue="work">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="work" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Student Work
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments ({studentAssignment.comments.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="work" className="mt-4">
                  <StudentWorkView studentAssignment={studentAssignment} />
                </TabsContent>
                
                <TabsContent value="comments" className="mt-4">
                  <CommentsSection 
                    studentId={studentId!}
                    assignmentId={assignmentId!}
                    initialComments={studentAssignment.comments}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
