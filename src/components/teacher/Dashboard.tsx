
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Clock, AlertTriangle, Sparkles } from "lucide-react";
import StudentList from "./StudentList";
import AssignmentStats from "./AssignmentStats";

// Mock data for assignments
const mockAssignments = [
  {
    id: "1",
    title: "Essay on American Literature",
    className: "English 101",
    dueDate: "2023-11-15",
    totalStudents: 28,
    studentsStarted: 22,
    studentsSubmitted: 16,
    averageTimeSpent: 95, // in minutes
    averageWordCount: 850,
    createdAt: "2023-11-01",
  },
  {
    id: "2",
    title: "Physics Problem Set",
    className: "Physics 202",
    dueDate: "2023-11-18",
    totalStudents: 24,
    studentsStarted: 18,
    studentsSubmitted: 10,
    averageTimeSpent: 120, // in minutes
    averageWordCount: 650,
    createdAt: "2023-11-05",
  },
  {
    id: "3",
    title: "History Research Paper",
    className: "History 105",
    dueDate: "2023-11-20",
    totalStudents: 32,
    studentsStarted: 20,
    studentsSubmitted: 8,
    averageTimeSpent: 150, // in minutes
    averageWordCount: 1200,
    createdAt: "2023-11-03",
  },
];

interface TeacherDashboardProps {
  selectedAssignmentId?: string;
  onAssignmentSelect: (assignmentId: string) => void;
}

export default function TeacherDashboard({ 
  selectedAssignmentId = "1",
  onAssignmentSelect 
}: TeacherDashboardProps) {
  const selectedAssignment = mockAssignments.find(a => a.id === selectedAssignmentId) || mockAssignments[0];
  
  // Calculate completion percentage
  const startedPercentage = Math.round((selectedAssignment.studentsStarted / selectedAssignment.totalStudents) * 100);
  const submittedPercentage = Math.round((selectedAssignment.studentsSubmitted / selectedAssignment.totalStudents) * 100);
  
  // Helper to format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining until due date
  const dueDate = new Date(selectedAssignment.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check if assignment is past due
  const isPastDue = dueDate < currentDate;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor student progress and assignment metrics
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {mockAssignments.map(assignment => (
            <Button 
              key={assignment.id}
              variant={assignment.id === selectedAssignmentId ? "default" : "outline"}
              size="sm"
              onClick={() => onAssignmentSelect(assignment.id)}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{assignment.title}</span>
              <span className="sm:hidden">Assignment {assignment.id}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Assignment Overview</CardTitle>
            {isPastDue ? (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Past Due
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-xl mb-1">{selectedAssignment.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{selectedAssignment.className}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-1 font-medium">{formatDate(selectedAssignment.createdAt)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Due:</span>
                  <span className="ml-1 font-medium">{formatDate(selectedAssignment.dueDate)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Students:</span>
                  <span className="ml-1 font-medium">{selectedAssignment.totalStudents}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg. Words:</span>
                  <span className="ml-1 font-medium">{selectedAssignment.averageWordCount}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Started</span>
                <span className="font-medium">
                  {selectedAssignment.studentsStarted} / {selectedAssignment.totalStudents}
                </span>
              </div>
              <Progress value={startedPercentage} className="h-2" />
              
              <div className="flex justify-between text-sm">
                <span>Submitted</span>
                <span className="font-medium">
                  {selectedAssignment.studentsSubmitted} / {selectedAssignment.totalStudents}
                </span>
              </div>
              <Progress value={submittedPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assignment Statistics</CardTitle>
            <CardDescription>
              Key metrics for {selectedAssignment.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stats">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Statistics
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Students
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="animate-fade-in">
                <AssignmentStats assignment={selectedAssignment} />
              </TabsContent>
              <TabsContent value="students" className="animate-fade-in">
                <StudentList assignmentId={selectedAssignment.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
