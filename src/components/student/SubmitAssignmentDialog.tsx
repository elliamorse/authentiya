
/**
 * This file provides a dialog for submitting an assignment to a chosen class/assignment.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, BookOpen, Calendar, Clock } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
}

interface Class {
  id: string;
  name: string;
  assignments: Assignment[];
}

interface SubmitAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (classId: string, assignmentId: string) => void;
  documentName: string;
}

// Mock data
const mockClasses: Class[] = [
  {
    id: "c1",
    name: "English 101",
    assignments: [
      {
        id: "1",
        title: "Essay on American Literature",
        dueDate: "2023-11-15",
      },
      {
        id: "4",
        title: "Poetry Analysis",
        dueDate: "2023-12-05",
      }
    ]
  },
  {
    id: "c2",
    name: "Physics 202",
    assignments: [
      {
        id: "2",
        title: "Physics Problem Set",
        dueDate: "2023-11-18",
      }
    ]
  },
  {
    id: "c3",
    name: "History 105",
    assignments: [
      {
        id: "3",
        title: "History Research Paper",
        dueDate: "2023-11-20",
      }
    ]
  }
];

export default function SubmitAssignmentDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  documentName 
}: SubmitAssignmentDialogProps) {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedAssignment("");  // Reset assignment when class changes
  };
  
  const handleAssignmentChange = (value: string) => {
    setSelectedAssignment(value);
  };
  
  const handleSubmit = () => {
    if (selectedClass && selectedAssignment) {
      onSubmit(selectedClass, selectedAssignment);
      onOpenChange(false);
    }
  };
  
  // Get available assignments for selected class
  const availableAssignments = selectedClass 
    ? mockClasses.find(c => c.id === selectedClass)?.assignments || []
    : [];
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining
  const getTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `${diffDays} days remaining`;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <DialogDescription>
            Submit "{documentName || "Untitled Document"}" to a class assignment
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Class</label>
            <Select value={selectedClass} onValueChange={handleClassChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your Classes</SelectLabel>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        {cls.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Assignment</label>
            <Select 
              value={selectedAssignment} 
              onValueChange={handleAssignmentChange}
              disabled={!selectedClass}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedClass ? "Choose an assignment" : "Select a class first"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Assignments</SelectLabel>
                  {availableAssignments.length > 0 ? (
                    availableAssignments.map(assignment => (
                      <SelectItem key={assignment.id} value={assignment.id}>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{assignment.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(assignment.dueDate)}</span>
                            <Clock className="h-3 w-3 ml-1" />
                            <span>{getTimeRemaining(assignment.dueDate)}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                      No assignments available for this class
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="submit" 
            disabled={!selectedClass || !selectedAssignment}
            onClick={handleSubmit}
            className="academic-btn-primary"
          >
            Submit Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
