
import { useState } from "react";
import { StudentAssignment } from "@/lib/teacher-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  Copy, 
  ExternalLink,
  FileText, 
  Quote, 
  Search, 
  User 
} from "lucide-react";

interface StudentListProps {
  students: StudentAssignment[];
  onViewStudent: (studentId: string) => void;
}

export default function StudentList({ students, onViewStudent }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter students based on search query
  const filteredStudents = students.filter(s => 
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Submitted
        </Badge>;
      case "in_progress":
        return <Badge variant="info" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> In Progress
        </Badge>;
      case "not_started":
        return <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Not Started
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  // Format date
  const formatDate = (dateString: string | null) => {
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
    <div className="space-y-4">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className="text-center py-10">
          <User className="h-10 w-10 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No students found</h3>
          <p className="text-muted-foreground">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <Card key={student.studentId} className="academic-card">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-9 h-9 rounded-full bg-authentiya-maroon/10 flex items-center justify-center text-authentiya-maroon">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{student.studentName}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {student.status === "not_started" 
                              ? "Not started" 
                              : `Started: ${formatDate(student.startTime)}`}
                          </span>
                        </div>
                        <div>{getStatusBadge(student.status)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Words</div>
                        <div className="font-medium flex items-center gap-1">
                          <FileText className="h-3 w-3 text-authentiya-maroon" />
                          {student.wordCount}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Copies</div>
                        <div className="font-medium flex items-center gap-1">
                          <Copy className="h-3 w-3 text-authentiya-maroon" />
                          {student.copyPasteCount}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Citations</div>
                        <div className="font-medium flex items-center gap-1">
                          <Quote className="h-3 w-3 text-authentiya-maroon" />
                          {student.citationCount}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1 ml-2"
                      onClick={() => onViewStudent(student.studentId)}
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
