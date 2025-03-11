
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  CalendarClock,
  CheckCircle 
} from "lucide-react";

// Mock data for student assignments
const studentAssignments = [
  {
    id: "1",
    title: "Essay on American Literature",
    className: "English 101",
    teacherName: "Dr. Smith",
    dueDate: "2023-11-15"
  },
  {
    id: "2",
    title: "Physics Problem Set",
    className: "Physics 202",
    teacherName: "Prof. Johnson",
    dueDate: "2023-11-18"
  },
  {
    id: "3",
    title: "History Research Paper",
    className: "History 105",
    teacherName: "Dr. Williams",
    dueDate: "2023-11-20"
  },
  {
    id: "4",
    title: "Poetry Analysis",
    className: "English 101",
    teacherName: "Dr. Smith",
    dueDate: "2023-12-05"
  }
];

interface AssignmentPromptProps {
  onSelect: (assignmentId: string, assignmentTitle?: string) => void;
  onDismiss: () => void;
}

export default function AssignmentPrompt({ 
  onSelect, 
  onDismiss 
}: AssignmentPromptProps) {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [newDocument, setNewDocument] = useState(false);
  
  const handleSelectAssignment = () => {
    if (newDocument) {
      onSelect("new");
    } else if (selectedAssignmentId) {
      const assignment = studentAssignments.find(a => a.id === selectedAssignmentId);
      onSelect(selectedAssignmentId, assignment?.title);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onDismiss}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link to Assignment</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <button
              className={`w-full text-left p-3 rounded-lg border ${newDocument ? 'border-authentiya-maroon bg-authentiya-maroon/10' : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'} transition-all mb-4`}
              onClick={() => {
                setNewDocument(true);
                setSelectedAssignmentId(null);
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full ${newDocument ? 'bg-authentiya-maroon/20' : 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center`}>
                  <Book className={`h-4 w-4 ${newDocument ? 'text-authentiya-maroon' : 'text-gray-500 dark:text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-medium">Create New Document</p>
                  <p className="text-sm text-muted-foreground">Start a new document without linking to an assignment</p>
                </div>
                {newDocument && (
                  <CheckCircle className="ml-auto h-5 w-5 text-authentiya-maroon" />
                )}
              </div>
            </button>
            
            <div className="text-sm font-medium mb-2">
              Select an Assignment:
            </div>
            
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
              {studentAssignments.map(assignment => (
                <button
                  key={assignment.id}
                  className={`w-full text-left p-3 rounded-lg border ${selectedAssignmentId === assignment.id ? 'border-authentiya-maroon bg-authentiya-maroon/10' : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'} transition-all`}
                  onClick={() => {
                    setSelectedAssignmentId(assignment.id);
                    setNewDocument(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full ${selectedAssignmentId === assignment.id ? 'bg-authentiya-maroon/20' : 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center`}>
                      <Book className={`h-4 w-4 ${selectedAssignmentId === assignment.id ? 'text-authentiya-maroon' : 'text-gray-500 dark:text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">{assignment.className} • {assignment.teacherName}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <CalendarClock className="h-3 w-3" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                    {selectedAssignmentId === assignment.id && (
                      <CheckCircle className="ml-auto h-5 w-5 text-authentiya-maroon" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onDismiss}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSelectAssignment}
            disabled={!newDocument && !selectedAssignmentId}
            className="academic-btn-primary"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
