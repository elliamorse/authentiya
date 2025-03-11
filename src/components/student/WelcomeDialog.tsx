
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  class_name: string;
  due_date: string;
}

export default function WelcomeDialog({ 
  open, 
  onOpenChange, 
  onLinkAssignment 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onLinkAssignment: (id: string) => void;
}) {
  const { user } = useAuth();
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  
  // Get classes the student is enrolled in
  const { data: assignments, isLoading } = useQuery({
    queryKey: ["studentAssignments"],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from("class_students")
          .select(`
            class_id,
            classes(
              id,
              name,
              assignments(
                id,
                title,
                due_date
              )
            )
          `)
          .eq("student_id", user.id);
        
        if (error) throw error;
        
        // Flatten the data
        const flattenedAssignments: Assignment[] = [];
        
        data?.forEach(item => {
          if (item.classes && item.classes.assignments) {
            item.classes.assignments.forEach((assignment: any) => {
              flattenedAssignments.push({
                id: assignment.id,
                title: assignment.title,
                class_name: item.classes.name,
                due_date: assignment.due_date
              });
            });
          }
        });
        
        return flattenedAssignments;
      } catch (error) {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load your assignments");
        return [];
      }
    },
    enabled: !!user && open
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
  
  const handleLinkAssignment = () => {
    if (selectedAssignment) {
      onLinkAssignment(selectedAssignment);
      onOpenChange(false);
    }
  };
  
  const handleSkip = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Authentiya!</DialogTitle>
          <DialogDescription>
            Would you like to link your writing to an assignment?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs defaultValue="assignments">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="freestyle">Freestyle Writing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignments" className="pt-4 space-y-4">
              {isLoading ? (
                <div className="text-center py-6">
                  <div className="animate-spin h-8 w-8 border-2 border-t-primary border-primary/30 rounded-full mx-auto"></div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading your assignments...</p>
                </div>
              ) : assignments && assignments.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {assignments.map(assignment => (
                    <div 
                      key={assignment.id}
                      className={`p-3 border rounded-md cursor-pointer transition-all ${
                        selectedAssignment === assignment.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedAssignment(assignment.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{assignment.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            {assignment.class_name}
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {formatDate(assignment.due_date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No assignments found</h3>
                  <p className="text-muted-foreground">You don't have any active assignments yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="freestyle" className="pt-4">
              <div className="text-center py-6">
                <p>Start with a blank document and write whatever you want.</p>
                <p className="text-muted-foreground text-sm mt-2">
                  You can always link an assignment later.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button 
            onClick={handleLinkAssignment} 
            disabled={!selectedAssignment}
            className="academic-btn-primary"
          >
            Link Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
