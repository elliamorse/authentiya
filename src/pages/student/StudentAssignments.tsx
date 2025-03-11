/**
 * This file provides the student assignments page where students can view their
 * assignments across classes, organized by status (in-progress, submitted, all).
 * 
 * Updates:
 * - Added "Submitted" tab to show completed assignments
 * - Enhanced assignment organization by due date
 * - Added ability to click assignments to open them in the document editor
 * - Uses shared assignment data store for consistency with editor
 * - Shows documents created in the editor in the assignments list
 * - Added dummy content for all assignment states
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/common/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Book, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  School,
  FileText,
  Plus
} from "lucide-react";
import { useAssignments, Assignment, Class } from "@/lib/student-assignments";

export default function StudentAssignments() {
  const navigate = useNavigate();
  const { assignments } = useAssignments();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Filter assignments based on tab
  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return assignment.status === "in_progress";
    if (activeTab === "pending") return assignment.status === "not_started";
    if (activeTab === "submitted") return assignment.status === "submitted";
    return false;
  });
  
  // Open assignment in editor
  const handleOpenAssignment = (assignmentId: string) => {
    // Get the assignment to check its status
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (assignment && assignment.status === "submitted") {
      // For submitted assignments, show a view-only mode
      navigate(`/student/view?id=${assignmentId}`);
    } else {
      // For other assignments, open in the editor
      navigate(`/student/editor?id=${assignmentId}`);
    }
  };
  
  // Group assignments by due date (today, this week, future, past)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);
  
  const groupedAssignments = {
    today: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    }),
    thisWeek: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate > today && dueDate <= endOfWeek;
    }),
    future: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate > endOfWeek && a.status !== "submitted";
    }),
    past: filteredAssignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today && a.status === "submitted";
    })
  };
  
  // Create a map of classes for display
  const classesMap: Record<string, { name: string, teacher: string }> = {};
  assignments.forEach(assignment => {
    if (!classesMap[assignment.className]) {
      classesMap[assignment.className] = {
        name: assignment.className,
        teacher: assignment.teacherName
      };
    }
  });
  
  const studentClasses = Object.keys(classesMap).map(className => ({
    id: className.toLowerCase().replace(/\s+/g, '-'),
    name: className,
    teacherName: classesMap[className].teacher,
    semester: "Fall 2023",
    assignments: assignments.filter(a => a.className === className)
  }));
  
  // Render badge for assignment status
  const renderStatusBadge = (status: string, grade?: string) => {
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
      case "submitted":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> {grade ? `Grade: ${grade}` : "Submitted"}
          </Badge>
        );
      default:
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Complete
          </Badge>
        );
    }
  };
  
  // Render a section of assignments
  const renderAssignmentSection = (title: string, assignments: Assignment[]) => {
    if (assignments.length === 0) return null;
    
    return (
      <div className="mt-6">
        <h3 className="font-semibold mb-3 font-playfair">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.map(assignment => (
            <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="h-2 bg-authentiya-maroon"></div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-lg font-playfair">{assignment.title}</h4>
                  {renderStatusBadge(assignment.status, assignment.grade)}
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
                
                {assignment.status === "submitted" && (
                  <div className="mt-2 p-2 bg-green-50/50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900/30 text-xs">
                    <div className="flex justify-between mb-1">
                      <span>Submitted on:</span>
                      <span className="font-medium">{formatDate(assignment.submittedOn || '')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Word count:</span>
                      <span className="font-medium">{assignment.wordCount}</span>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full mt-3 academic-btn-primary"
                  onClick={() => handleOpenAssignment(assignment.id)}
                  disabled={false}
                >
                  {assignment.status === "not_started" ? "Start Assignment" : 
                   assignment.status === "submitted" ? "View Submission" : "Continue Working"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  // Render classes
  const renderClasses = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {studentClasses.map(cls => (
          <Card key={cls.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="h-2 bg-authentiya-charcoal"></div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-authentiya-maroon/10 flex items-center justify-center">
                  <School className="h-4 w-4 text-authentiya-maroon" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg font-playfair">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground">{cls.semester}</p>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground flex gap-1 items-center mb-3">
                <GraduationCap className="h-3 w-3" />
                <span>{cls.teacherName}</span>
              </div>
              
              <div className="p-2 bg-gray-50/50 dark:bg-gray-900/20 rounded border border-gray-100 dark:border-gray-900/30 mb-3">
                <div className="flex justify-between text-xs">
                  <span>Active Assignments:</span>
                  <span className="font-medium">{cls.assignments.filter(a => a.status === "in_progress").length}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Pending Assignments:</span>
                  <span className="font-medium">{cls.assignments.filter(a => a.status === "not_started").length}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                View Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        userEmail="student@example.com" 
        userRole="student" 
        onLogout={() => navigate("/")} 
      />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-playfair text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
              My Assignments
            </h1>
            <p className="text-muted-foreground">
              View and manage all your assignments across classes
            </p>
          </div>
          
          <Button 
            onClick={() => navigate("/student/editor")}
            className="academic-btn-primary gap-2"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Open Document Editor</span>
            <span className="sm:hidden">Editor</span>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>In Progress</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Not Started</span>
            </TabsTrigger>
            <TabsTrigger value="submitted" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Submitted</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                onClick={() => navigate("/student/editor")}
              >
                <Plus className="h-4 w-4" />
                New Document
              </Button>
            </div>
            
            {renderAssignmentSection("Due Today", groupedAssignments.today)}
            {renderAssignmentSection("Due This Week", groupedAssignments.thisWeek)}
            {renderAssignmentSection("Future Assignments", groupedAssignments.future)}
            {renderAssignmentSection("Completed Assignments", groupedAssignments.past)}
            
            {filteredAssignments.length === 0 && (
              <div className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No assignments found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="animate-fade-in">
            {renderAssignmentSection("Due Today", groupedAssignments.today.filter(a => a.status === "in_progress"))}
            {renderAssignmentSection("Due This Week", groupedAssignments.thisWeek.filter(a => a.status === "in_progress"))}
            {renderAssignmentSection("Future Assignments", groupedAssignments.future.filter(a => a.status === "in_progress"))}
            
            {filteredAssignments.filter(a => a.status === "in_progress").length === 0 && (
              <div className="py-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No active assignments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="animate-fade-in">
            {renderAssignmentSection("Due Today", groupedAssignments.today.filter(a => a.status === "not_started"))}
            {renderAssignmentSection("Due This Week", groupedAssignments.thisWeek.filter(a => a.status === "not_started"))}
            {renderAssignmentSection("Future Assignments", groupedAssignments.future.filter(a => a.status === "not_started"))}
            
            {filteredAssignments.filter(a => a.status === "not_started").length === 0 && (
              <div className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No pending assignments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="animate-fade-in">
            {renderAssignmentSection("Recently Submitted", groupedAssignments.thisWeek.filter(a => a.status === "submitted"))}
            {renderAssignmentSection("Past Submissions", groupedAssignments.past)}
            
            {filteredAssignments.filter(a => a.status === "submitted").length === 0 && (
              <div className="py-12 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No submitted assignments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="classes" className="animate-fade-in">
            {renderClasses()}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
