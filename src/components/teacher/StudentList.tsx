
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Search, Clock, AlertTriangle, Edit3, CheckCircle2 } from "lucide-react";

// Mock data for students
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    status: "in_progress",
    startTime: "2023-11-10T14:30:00",
    timeSpent: 85, // in minutes
    wordCount: 950,
    needsAttention: false,
  },
  {
    id: "2",
    name: "Emma Rodriguez",
    status: "submitted",
    startTime: "2023-11-09T10:15:00",
    timeSpent: 120, // in minutes
    wordCount: 1100,
    needsAttention: false,
  },
  {
    id: "3",
    name: "Michael Chen",
    status: "not_started",
    startTime: null,
    timeSpent: 0,
    wordCount: 0,
    needsAttention: true,
  },
  {
    id: "4",
    name: "Sophia Patel",
    status: "in_progress",
    startTime: "2023-11-11T09:45:00",
    timeSpent: 30, // in minutes
    wordCount: 250,
    needsAttention: true,
  },
  {
    id: "5",
    name: "James Wilson",
    status: "submitted",
    startTime: "2023-11-08T16:20:00",
    timeSpent: 160, // in minutes
    wordCount: 1250,
    needsAttention: false,
  },
];

interface StudentListProps {
  assignmentId: string;
}

export default function StudentList({ assignmentId }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // Filter students based on search query and filter status
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === null || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  
  // Helper to format date
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
  
  // Helper to format time spent
  const formatTimeSpent = (minutes: number) => {
    if (minutes === 0) return "N/A";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    }
    
    return `${hours}h ${mins}m`;
  };
  
  // Helper for status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Submitted
        </Badge>;
      case "in_progress":
        return <Badge variant="info" className="flex items-center gap-1">
          <Edit3 className="h-3 w-3" /> In Progress
        </Badge>;
      case "not_started":
        return <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Not Started
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex-1 relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterStatus === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(null)}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === "in_progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("in_progress")}
          >
            In Progress
          </Button>
          <Button 
            variant={filterStatus === "submitted" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("submitted")}
          >
            Submitted
          </Button>
          <Button 
            variant={filterStatus === "not_started" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("not_started")}
          >
            Not Started
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead>Word Count</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map(student => (
                <TableRow key={student.id} className={student.needsAttention ? "bg-yellow-50/50" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {student.name}
                      {student.needsAttention && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 ml-2" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{formatDate(student.startTime)}</TableCell>
                  <TableCell>{formatTimeSpent(student.timeSpent)}</TableCell>
                  <TableCell>{student.wordCount > 0 ? student.wordCount : "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={student.status === "not_started"}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
