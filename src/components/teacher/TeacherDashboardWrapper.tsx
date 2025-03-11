
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TeacherDashboard from "./Dashboard";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

export default function TeacherDashboardWrapper() {
  const navigate = useNavigate();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  
  // Fetch assignments
  const { data: assignments, isLoading } = useQuery({
    queryKey: ["teacherAssignments"],
    queryFn: async () => {
      try {
        // First get the teacher's classes
        const { data: classes, error: classesError } = await supabase
          .from("classes")
          .select("id");
        
        if (classesError) throw classesError;
        
        if (!classes || classes.length === 0) {
          return [];
        }
        
        // Then get assignments for those classes
        const classIds = classes.map(c => c.id);
        const { data, error } = await supabase
          .from("assignments")
          .select(`
            id, 
            title, 
            class_id, 
            due_date, 
            created_at,
            classes(name)
          `)
          .in("class_id", classIds);
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          return [];
        }
        
        // For each assignment, get student metrics
        const assignmentsWithMetrics = await Promise.all(
          data.map(async (assignment) => {
            const { data: studentAssignments, error: studentError } = await supabase
              .from("student_assignments")
              .select(`
                status,
                word_count,
                time_spent
              `)
              .eq("assignment_id", assignment.id);
            
            if (studentError) {
              console.error("Error fetching student assignments:", studentError);
              return null;
            }
            
            const totalStudents = studentAssignments?.length || 0;
            const studentsStarted = studentAssignments?.filter(sa => sa.status !== "not_started").length || 0;
            const studentsSubmitted = studentAssignments?.filter(sa => sa.status === "submitted").length || 0;
            const totalTimeSpent = studentAssignments?.reduce((acc, curr) => acc + (curr.time_spent || 0), 0) || 0;
            const totalWordCount = studentAssignments?.reduce((acc, curr) => acc + (curr.word_count || 0), 0) || 0;
            
            return {
              id: assignment.id,
              title: assignment.title,
              className: assignment.classes?.name || "Unknown Class",
              dueDate: assignment.due_date,
              createdAt: assignment.created_at,
              totalStudents,
              studentsStarted,
              studentsSubmitted,
              averageTimeSpent: totalStudents ? Math.round(totalTimeSpent / totalStudents) : 0,
              averageWordCount: totalStudents ? Math.round(totalWordCount / totalStudents) : 0
            };
          })
        );
        
        return assignmentsWithMetrics.filter(Boolean);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments");
        return [];
      }
    }
  });
  
  // Set the first assignment as selected when data loads
  useEffect(() => {
    if (assignments && assignments.length > 0 && !selectedAssignmentId) {
      setSelectedAssignmentId(assignments[0].id);
    }
  }, [assignments, selectedAssignmentId]);
  
  if (isLoading) {
    return (
      <main className="flex-1 container py-6">
        <div>Loading teacher dashboard...</div>
      </main>
    );
  }
  
  return (
    <main className="flex-1 container py-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-playfair">Assignment Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor student progress and assignment metrics
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            className="academic-btn-primary flex items-center gap-1"
            onClick={() => navigate("/teacher")}
          >
            <GraduationCap className="h-4 w-4" />
            Go to Classes
          </Button>
        </div>
      </div>
      
      {assignments && assignments.length > 0 ? (
        <TeacherDashboard
          selectedAssignmentId={selectedAssignmentId || assignments[0].id}
          onAssignmentSelect={setSelectedAssignmentId}
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No Assignments Found</h3>
          <p className="text-muted-foreground mb-6">You don't have any assignments created yet.</p>
          <Button onClick={() => navigate("/teacher")}>
            Go to Classes to Create Assignments
          </Button>
        </div>
      )}
    </main>
  );
}
