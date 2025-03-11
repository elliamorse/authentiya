
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/common/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/common/Badge";
import { GraduationCap, BookOpen, Calendar, X } from "lucide-react";
import { toast } from "sonner";

interface Assignment {
  id: string;
  title: string;
  class: string;
  class_id: string;
  dueDate: string;
}

interface AssignmentPromptProps {
  onSelect: (assignmentId: string) => void;
  onDismiss: () => void;
}

export default function AssignmentPrompt({ onSelect, onDismiss }: AssignmentPromptProps) {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [selectedAssignment, setSelectedAssignment] = useState<string | undefined>();
  
  // Fetch classes the student is enrolled in
  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ["studentClasses"],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from("class_students")
          .select(`
            class_id,
            classes(id, name)
          `)
          .eq("student_id", user.id);
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          return [];
        }
        
        return data.map(item => ({
          id: item.classes.id,
          name: item.classes.name
        }));
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to load classes");
        return [];
      }
    },
    enabled: !!user
  });
  
  // Fetch assignments for the selected class
  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ["classAssignments", selectedClass],
    queryFn: async () => {
      if (!selectedClass) return [];
      
      try {
        const { data, error } = await supabase
          .from("assignments")
          .select(`
            id,
            title,
            due_date,
            class_id,
            classes(name)
          `)
          .eq("class_id", selectedClass);
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          return [];
        }
        
        return data.map(item => ({
          id: item.id,
          title: item.title,
          class: item.classes.name,
          class_id: item.class_id,
          dueDate: item.due_date
        }));
      } catch (error) {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments");
        return [];
      }
    },
    enabled: !!selectedClass
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // If no real data, show mock data for demonstration
  const mockClasses = [
    { id: 'c1', name: 'English 101' },
    { id: 'c2', name: 'Physics 202' },
    { id: 'c3', name: 'History 105' },
  ];
  
  const mockAssignments = [
    { id: '1', title: 'Essay on American Literature', class: 'English 101', class_id: 'c1', dueDate: '2023-11-15' },
    { id: '2', title: 'Physics Problem Set', class: 'Physics 202', class_id: 'c2', dueDate: '2023-11-18' },
    { id: '3', title: 'History Research Paper', class: 'History 105', class_id: 'c3', dueDate: '2023-11-20' },
  ];
  
  // Use real data if available, otherwise use mock data
  const displayClasses = classes && classes.length > 0 ? classes : mockClasses;
  const displayAssignments = assignments && assignments.length > 0 ? assignments : 
                           (selectedClass ? mockAssignments.filter(a => a.class_id === selectedClass) : []);
  
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
                {displayClasses.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      {c.name}
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
                {displayAssignments.map(a => (
                  <SelectItem key={a.id} value={a.id}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {a.title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Due: {formatDate(a.dueDate)}
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
                  {displayAssignments.find(a => a.id === selectedAssignment)?.title}
                </h4>
                <Badge variant="info">Selected</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {displayAssignments.find(a => a.id === selectedAssignment)?.class}
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
