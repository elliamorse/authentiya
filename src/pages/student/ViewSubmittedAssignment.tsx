
/**
 * This file provides a read-only view for submitted assignments,
 * allowing students to view their submitted work without the ability to edit.
 */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, Clock, GraduationCap } from "lucide-react";
import { useAssignments } from "@/lib/student-assignments";
import { toast } from "sonner";

export default function ViewSubmittedAssignment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get('id');
  const { getAssignment } = useAssignments();
  const [assignment, setAssignment] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!assignmentId) {
      toast.error("No assignment specified");
      navigate("/student/assignments");
      return;
    }
    
    const assignmentData = getAssignment(assignmentId);
    if (!assignmentData) {
      toast.error("Assignment not found");
      navigate("/student/assignments");
      return;
    }
    
    if (assignmentData.status !== "submitted") {
      // Redirect to editor if the assignment is not submitted
      navigate(`/student/editor?id=${assignmentId}`);
      return;
    }
    
    setAssignment(assignmentData);
    
    // Set content in the view
    if (contentRef.current && assignmentData.content) {
      contentRef.current.innerHTML = assignmentData.content;
    }
  }, [assignmentId, navigate, getAssignment]);
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          userEmail="student@example.com" 
          userRole="student" 
          onLogout={() => navigate("/")} 
        />
        <main className="flex-1 container py-6 space-y-6">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Loading assignment...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        userEmail="student@example.com" 
        userRole="student" 
        onLogout={() => navigate("/")} 
      />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => navigate("/student/assignments")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assignments
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
              {assignment.title}
            </h1>
            <p className="text-muted-foreground">
              Submitted Assignment View
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            Submitted
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Assignment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Class: {assignment.className}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due Date: {formatDate(assignment.dueDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Submitted: {formatDate(assignment.submittedOn)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Submission Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Word Count</div>
                  <div className="text-lg font-semibold">{assignment.wordCount}</div>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Time Spent</div>
                  <div className="text-lg font-semibold">{Math.floor(assignment.timeSpent / 60)}h {assignment.timeSpent % 60}m</div>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Citations</div>
                  <div className="text-lg font-semibold">{assignment.citationCount || 0}</div>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Pastes</div>
                  <div className="text-lg font-semibold">{assignment.copyPasteCount || 0}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="overflow-hidden">
          <div className="p-2 bg-muted/40 border-b">
            <div className="text-sm font-medium px-2 py-1">Document Content (Read-Only)</div>
          </div>
          
          <CardContent className="p-6">
            <div 
              ref={contentRef} 
              className="min-h-[400px] focus:outline-none prose dark:prose-invert max-w-none"
              style={{ overflowY: 'auto', maxHeight: '60vh' }}
            ></div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
