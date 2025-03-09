
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/common/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getAssignmentsForClass, 
  getClassesForTeacher, 
  AssignmentInfo,
  ClassInfo 
} from "@/lib/teacher-data";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Edit3, 
  FileText, 
  Search, 
  Users 
} from "lucide-react";

export default function TeacherAssignments() {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  
  // Get classes for teacher to display the selected class info
  useEffect(() => {
    const classes = getClassesForTeacher();
    
    if (classId) {
      const classInfo = classes.find(c => c.id === classId) || null;
      setSelectedClass(classInfo);
    }
  }, [classId]);
  
  // Get assignments based on the path parameters
  const assignments = classId 
    ? getAssignmentsForClass(classId)
    : [];
  
  // Filter assignments based on search query and active tab
  const filteredAssignments = assignments.filter(assignment => 
    (assignment.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeTab === "all" || (activeTab === "active" && assignment.status === "active") || 
     (activeTab === "past" && assignment.status === "past"))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        userEmail="teacher@example.com" 
        userRole="teacher" 
        onLogout={() => navigate("/")} 
      />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="flex flex-col space-y-4">
          <Button 
            variant="ghost" 
            className="w-fit flex items-center gap-2 -ml-2 mb-2"
            onClick={() => navigate("/teacher")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Classes
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
                {selectedClass?.name || "Assignments"}
              </h1>
              <p className="text-muted-foreground">
                {selectedClass?.subject} • {selectedClass?.period} • {selectedClass?.studentCount} students
              </p>
            </div>
            
            <div className="relative w-full sm:w-auto min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <Tabs defaultValue="active" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
              <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No assignments found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search query" 
                  : "Create a new assignment to get started"}
              </p>
            </div>
          ) : (
            filteredAssignments.map((assignment) => (
              <AssignmentCard 
                key={assignment.id} 
                assignment={assignment} 
                onClick={() => navigate(`/teacher/assignment/${assignment.id}`)} 
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

interface AssignmentCardProps {
  assignment: AssignmentInfo;
  onClick: () => void;
}

function AssignmentCard({ assignment, onClick }: AssignmentCardProps) {
  // Calculate completion percentage
  const startedPercentage = Math.round((assignment.studentsStarted / assignment.totalStudents) * 100);
  const submittedPercentage = Math.round((assignment.studentsSubmitted / assignment.totalStudents) * 100);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining until due date
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check if assignment is past due
  const isPastDue = dueDate < currentDate;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 academic-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-authentiya-maroon" />
            <span className="text-sm font-medium text-muted-foreground">
              {assignment.className}
            </span>
          </div>
          
          {assignment.status === "active" && (
            isPastDue ? (
              <Badge variant="destructive" className="text-xs">Past Due</Badge>
            ) : (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
              </Badge>
            )
          )}
          
          {assignment.status === "past" && (
            <Badge variant="secondary" className="text-xs">Completed</Badge>
          )}
        </div>
        
        <CardTitle className="text-xl mt-2">{assignment.title}</CardTitle>
        
        <CardDescription className="flex items-center gap-4 mt-1">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Due: {formatDate(assignment.dueDate)}
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <div className="text-muted-foreground">Total Students</div>
            <div className="font-medium">{assignment.totalStudents}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Avg. Time Spent</div>
            <div className="font-medium">
              {Math.floor(assignment.averageTimeSpent / 60)}h {assignment.averageTimeSpent % 60}m
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Started</div>
            <div className="font-medium flex items-center gap-1">
              <Edit3 className="h-3 w-3 text-blue-500" />
              {assignment.studentsStarted} ({startedPercentage}%)
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Submitted</div>
            <div className="font-medium flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {assignment.studentsSubmitted} ({submittedPercentage}%)
            </div>
          </div>
        </div>
        
        <Button
          variant="default"
          className="w-full academic-btn-primary"
          onClick={onClick}
        >
          View Assignment
        </Button>
      </CardContent>
    </Card>
  );
}
