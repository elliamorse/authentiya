
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/common/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/common/Badge";
import { GraduationCap, BookOpen, Calendar, X } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  class: string;
  dueDate: string;
}

interface AssignmentPromptProps {
  onSelect: (assignmentId: string) => void;
  onDismiss: () => void;
}

const mockAssignments: Assignment[] = [
  { id: '1', title: 'Essay on American Literature', class: 'English 101', dueDate: '2023-11-15' },
  { id: '2', title: 'Physics Problem Set', class: 'Physics 202', dueDate: '2023-11-18' },
  { id: '3', title: 'History Research Paper', class: 'History 105', dueDate: '2023-11-20' },
];

export default function AssignmentPrompt({ onSelect, onDismiss }: AssignmentPromptProps) {
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [selectedAssignment, setSelectedAssignment] = useState<string | undefined>();
  
  const filteredAssignments = selectedClass 
    ? mockAssignments.filter(a => a.class === selectedClass)
    : mockAssignments;
  
  const classes = Array.from(new Set(mockAssignments.map(a => a.class)));
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Link to Assignment</CardTitle>
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Class</label>
            <Select 
              value={selectedClass} 
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map(c => (
                  <SelectItem key={c} value={c}>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      {c}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Assignment</label>
            <Select 
              value={selectedAssignment} 
              onValueChange={setSelectedAssignment}
              disabled={!selectedClass}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedClass ? "Select an assignment" : "Select a class first"} />
              </SelectTrigger>
              <SelectContent>
                {filteredAssignments.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {a.title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(a.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedAssignment && (
            <div className="p-3 bg-secondary rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {mockAssignments.find(a => a.id === selectedAssignment)?.title}
                </h4>
                <Badge variant="info">Selected</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {mockAssignments.find(a => a.id === selectedAssignment)?.class}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onDismiss}>
            Dismiss
          </Button>
          <Button 
            disabled={!selectedAssignment} 
            onClick={() => selectedAssignment && onSelect(selectedAssignment)}
          >
            Link Assignment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
