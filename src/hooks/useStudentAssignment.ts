
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useStudentAssignment(linkedAssignmentId: string | null) {
  const { user } = useAuth();
  
  // Get the linked student assignment
  const { data: studentAssignment, refetch: refetchAssignment } = useQuery({
    queryKey: ["studentAssignment", linkedAssignmentId],
    queryFn: async () => {
      if (!linkedAssignmentId || !user) return null;
      
      try {
        // First check if this student assignment already exists
        const { data, error } = await supabase
          .from("student_assignments")
          .select(`
            id, 
            status, 
            start_time, 
            submission_time,
            time_spent,
            word_count,
            copy_paste_count,
            citation_count,
            content,
            assignment_id,
            assignments(title, due_date, classes(name))
          `)
          .eq("student_id", user.id)
          .eq("assignment_id", linkedAssignmentId)
          .maybeSingle();
        
        if (error) {
          console.error("Error checking for existing assignment:", error);
          return null;
        }
        
        if (data) {
          return data;
        }
        
        // If it doesn't exist, create it
        const now = new Date().toISOString();
        const { data: newData, error: insertError } = await supabase
          .from("student_assignments")
          .insert({
            student_id: user.id,
            assignment_id: linkedAssignmentId,
            status: "in_progress",
            start_time: now,
            last_active: now
          })
          .select()
          .single();
        
        if (insertError) {
          console.error("Error creating assignment:", insertError);
          return null;
        }
        
        return newData;
      } catch (error) {
        console.error("Error fetching student assignment:", error);
        toast.error("Failed to load assignment");
        return null;
      }
    },
    enabled: !!linkedAssignmentId && !!user,
  });
  
  // Get assignment details
  const { data: assignment } = useQuery({
    queryKey: ["assignment", studentAssignment?.assignment_id],
    queryFn: async () => {
      if (!studentAssignment?.assignment_id) return null;
      
      try {
        const { data, error } = await supabase
          .from("assignments")
          .select(`
            id,
            title,
            due_date,
            classes(name)
          `)
          .eq("id", studentAssignment.assignment_id)
          .single();
        
        if (error) throw error;
        
        return data;
      } catch (error) {
        console.error("Error fetching assignment details:", error);
        return null;
      }
    },
    enabled: !!studentAssignment?.assignment_id,
  });
  
  // Mutation to update the student assignment
  const updateAssignment = useMutation({
    mutationFn: async (data: any) => {
      if (!studentAssignment?.id) throw new Error("No assignment linked");
      
      const { error } = await supabase
        .from("student_assignments")
        .update(data)
        .eq("id", studentAssignment.id);
      
      if (error) throw error;
      
      return true;
    },
    onSuccess: () => {
      refetchAssignment();
    },
    onError: (error) => {
      console.error("Error updating assignment:", error);
      toast.error("Failed to update assignment");
    }
  });
  
  const updateTimeSpent = () => {
    if (!studentAssignment?.id) return;
    
    // Calculate time spent
    const startTime = studentAssignment.start_time ? new Date(studentAssignment.start_time) : new Date();
    const now = new Date();
    const diffMinutes = Math.round((now.getTime() - startTime.getTime()) / (1000 * 60));
    
    // Add to the existing time spent
    const totalTimeSpent = (studentAssignment.time_spent || 0) + diffMinutes;
    
    updateAssignment.mutate({
      time_spent: totalTimeSpent,
      last_active: now.toISOString()
    });
  };
  
  const incrementCopyPasteCount = () => {
    if (!studentAssignment?.id) return;
    
    const newCount = (studentAssignment.copy_paste_count || 0) + 1;
    updateAssignment.mutate({
      copy_paste_count: newCount
    });
  };
  
  const saveContent = (content: string) => {
    if (!studentAssignment?.id) return;
    
    updateAssignment.mutate({
      content,
      last_active: new Date().toISOString()
    });
  };
  
  const updateWordCount = (wordCount: number) => {
    if (!studentAssignment?.id) return;
    
    updateAssignment.mutate({
      word_count: wordCount
    });
  };
  
  const submitAssignment = async (content: string) => {
    if (!studentAssignment?.id) return false;
    
    try {
      const { error } = await supabase
        .from("student_assignments")
        .update({
          status: "submitted",
          submission_time: new Date().toISOString(),
          content: content
        })
        .eq("id", studentAssignment.id);
        
      if (error) throw error;
      
      toast.success("Assignment submitted", {
        description: "Your assignment has been successfully submitted"
      });
      
      // Refetch to get updated data
      refetchAssignment();
      return true;
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment");
      return false;
    }
  };
  
  const addCitation = async (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => {
    if (!studentAssignment?.id || !user) return false;
    
    try {
      // Create the citation
      const { error } = await supabase
        .from("citations")
        .insert({
          student_assignment_id: studentAssignment.id,
          type: citation.type,
          source: citation.source,
          details: citation.details || null
        });
        
      if (error) throw error;
      
      // Update citation count
      const newCount = (studentAssignment.citation_count || 0) + 1;
      updateAssignment.mutate({
        citation_count: newCount
      });
      
      toast.success("Citation added", {
        description: `Added citation from ${citation.source}`
      });
      
      return true;
    } catch (error: any) {
      console.error("Error adding citation:", error);
      toast.error("Failed to add citation");
      return false;
    }
  };
  
  return {
    studentAssignment,
    assignment,
    updateTimeSpent,
    incrementCopyPasteCount,
    saveContent,
    updateWordCount,
    submitAssignment,
    addCitation
  };
}
