
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getClassesForTeacher, ClassInfo } from "@/lib/teacher-data";
import { Award, BookOpen, Clock, FileText, GraduationCap, Search, Users } from "lucide-react";
import AddStudentForm from "@/components/teacher/AddStudentForm";

export default function TeacherClasses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  
  // Get classes for this teacher
  const classes = getClassesForTeacher();
  
  // Filter classes based on search query
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
              My Classes
            </h1>
            <p className="text-muted-foreground">
              View and manage all your classes and assignments
            </p>
          </div>
          
          <div className="relative w-full sm:w-auto min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        {selectedClass && (
          <Card>
            <CardHeader>
              <CardTitle>Add Students to {selectedClass.name}</CardTitle>
              <CardDescription>
                Invite students to join this class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddStudentForm 
                classId={selectedClass.id} 
                className={selectedClass.name} 
              />
            </CardContent>
          </Card>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No classes found</h3>
              <p className="text-muted-foreground">Try adjusting your search query</p>
            </div>
          ) : (
            filteredClasses.map((classInfo) => (
              <ClassCard 
                key={classInfo.id} 
                classInfo={classInfo} 
                onClick={() => navigate(`/teacher/class/${classInfo.id}`)}
                onAddStudents={() => setSelectedClass(classInfo)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

interface ClassCardProps {
  classInfo: ClassInfo;
  onClick: () => void;
  onAddStudents: () => void;
}

function ClassCard({ classInfo, onClick, onAddStudents }: ClassCardProps) {
  const subjectIconMap = {
    "English": BookOpen,
    "Math": FileText,
    "Science": Award,
    "History": Clock,
    "default": GraduationCap
  };
  
  // Get the icon for the subject or default to GraduationCap
  const SubjectIcon = subjectIconMap[classInfo.subject as keyof typeof subjectIconMap] || subjectIconMap.default;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 academic-card">
      <div className="h-2 bg-authentiya-maroon"></div>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-md flex items-center justify-center bg-authentiya-maroon/10 text-authentiya-maroon">
          <SubjectIcon className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-xl">{classInfo.name}</CardTitle>
          <CardDescription>{classInfo.period}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Students</span>
            <span className="font-medium flex items-center">
              <Users className="h-4 w-4 mr-1 text-authentiya-maroon" />
              {classInfo.studentCount}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Active Assignments</span>
            <span className="font-medium flex items-center">
              <FileText className="h-4 w-4 mr-1 text-authentiya-maroon" />
              {classInfo.activeAssignmentCount}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="default" 
            className="w-full academic-btn-primary"
            onClick={onClick}
          >
            View Class
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onAddStudents();
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            Add Students
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
