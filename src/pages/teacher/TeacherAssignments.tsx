import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentList from "../../components/teacher/StudentList";
import AssignmentStats from "../../components/teacher/AssignmentStats";
import { 
  getAssignmentById, 
  getAssignmentsForClass,
  getStudentAssignments
} from "@/lib/teacher-data";
import { ArrowLeft, BookOpen, Calendar, Clock, FileText } from "lucide-react";

export default function TeacherAssignments() {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students");
  
  // Determine if we're viewing class assignments or a specific assignment
  const isClassView = classId && !assignmentId;
  const isAssignmentView = assignmentId && !classId;
  
  // Get assignments based on view type
  const assignments = isClassView 
    ? getAssignmentsForClass(classId)
    : [];
    
  // Get the current assignment details if in assignment view
  const currentAssignment = assignmentId 
    ? getAssignmentById(assignmentId)
    : undefined;
    
  // Get students for the current assignment if in assignment view
  const students = assignmentId
    ? getStudentAssignments(assignmentId)
    : [];
    
  // Handle view student assignment - navigate to student view
  const handleViewStudentAssignment = (studentId: string) => {
    if (assignmentId) {
      navigate(`/teacher/student/${studentId}/assignment/${assignmentId}`);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6 space-y-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="w-fit flex items-center gap-2 -ml-2"
          onClick={() => navigate(isAssignmentView ? "/teacher" : "/teacher")}
        >
          <ArrowLeft className="h-4 w-4" />
          {isAssignmentView ? "Back to Classes" : "Back"}
        </Button>
        
        {/* Class Assignments View */}
        {isClassView && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
                {assignments.length > 0 
                  ? assignments[0].className 
                  : "Class"} Assignments
              </h1>
              <p className="text-muted-foreground">
                View and manage assignments for this class
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <Card 
                  key={assignment.id} 
                  className="hover:shadow-md transition-all duration-300 cursor-pointer academic-card"
                  onClick={() => navigate(`/teacher/assignment/${assignment.id}`)}
                >
                  <div className="h-2 bg-authentiya-maroon"></div>
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start gap-3">
                      <div className="mt-1 w-9 h-9 rounded-md flex items-center justify-center bg-authentiya-maroon/10 text-authentiya-maroon">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {formatDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Submissions</div>
                        <div className="font-medium">{assignment.studentsSubmitted}/{assignment.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Started</div>
                        <div className="font-medium">{assignment.studentsStarted}/{assignment.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg. Time</div>
                        <div className="font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.floor(assignment.averageTimeSpent / 60)}h {assignment.averageTimeSpent % 60}m
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg. Words</div>
                        <div className="font-medium">{assignment.averageWordCount}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Single Assignment View */}
        {isAssignmentView && currentAssignment && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
                {currentAssignment.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{currentAssignment.className}</span>
                <span className="text-xs">•</span>
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(currentAssignment.dueDate)}</span>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="students" className="mt-6">
                <StudentList 
                  students={students} 
                  onViewStudent={handleViewStudentAssignment}
                />
              </TabsContent>
              
              <TabsContent value="statistics" className="mt-6">
                <AssignmentStats assignment={currentAssignment} students={students} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}
