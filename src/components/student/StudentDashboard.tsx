
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  BookOpen, 
  Copy, 
  FileText, 
  Quote, 
  SendHorizontal 
} from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignmentId, setLinkedAssignmentId] = useState<string | null>(null);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  
  // Get the linked student assignment
  const { data: studentAssignment, refetch: refetchAssignment } = useQuery({
    queryKey: ["studentAssignment", linkedAssignmentId],
    queryFn: async () => {
      if (!linkedAssignmentId || !user) return null;
      
      try {
        // First check if this student assignment already exists
        const { data: existing, error } = await supabase
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
          .single();
        
        if (error && error.code !== "PGRST116") {
          throw error;
        }
        
        if (existing) {
          // If there's content, set it
          if (existing.content) {
            setContent(existing.content);
          }
          
          return existing;
        }
        
        // If it doesn't exist, create it
        const now = new Date().toISOString();
        const { data: created, error: createError } = await supabase
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
        
        if (createError) throw createError;
        
        return created;
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
  
  // Check for saved linked assignment
  useEffect(() => {
    const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
    if (savedLinkedAssignment) {
      setLinkedAssignmentId(savedLinkedAssignment);
    } else {
      setShowAssignmentPrompt(true);
    }
    
    // Cleanup function to update time spent
    return () => {
      if (studentAssignment?.id) {
        updateTimeSpent();
      }
    };
  }, []);
  
  // Add event listeners for copy-paste detection
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      // Only proceed if we have an active assignment
      if (studentAssignment?.id) {
        const pastedText = e.clipboardData?.getData('text') || "";
        if (pastedText.trim()) {
          setCopiedText(pastedText);
          incrementCopyPasteCount();
          setShowCitationPrompt(true);
          
          // Log the paste event
          console.log("Paste detected:", pastedText.substring(0, 50) + (pastedText.length > 50 ? "..." : ""));
          toast.info("Content pasted", {
            description: "Please cite your source"
          });
        }
      }
    };
    
    // Add event listener to the textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('paste', handlePasteEvent);
    }
    
    return () => {
      // Clean up event listener
      if (textarea) {
        textarea.removeEventListener('paste', handlePasteEvent);
      }
    };
  }, [studentAssignment?.id, textareaRef]);
  
  // Mutation to update the student assignment
  const updateAssignmentMutation = useMutation({
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
  
  // Function to update time spent
  const updateTimeSpent = () => {
    if (!studentAssignment?.id) return;
    
    // Calculate time spent
    const startTime = studentAssignment.start_time ? new Date(studentAssignment.start_time) : new Date();
    const now = new Date();
    const diffMinutes = Math.round((now.getTime() - startTime.getTime()) / (1000 * 60));
    
    // Add to the existing time spent
    const totalTimeSpent = (studentAssignment.time_spent || 0) + diffMinutes;
    
    updateAssignmentMutation.mutate({
      time_spent: totalTimeSpent,
      last_active: now.toISOString()
    });
  };
  
  // Increment copy paste count
  const incrementCopyPasteCount = () => {
    if (!studentAssignment?.id) return;
    
    const newCount = (studentAssignment.copy_paste_count || 0) + 1;
    updateAssignmentMutation.mutate({
      copy_paste_count: newCount
    });
  };
  
  // Save content periodically
  useEffect(() => {
    if (!studentAssignment?.id || !content) return;
    
    const saveTimer = setTimeout(() => {
      updateAssignmentMutation.mutate({
        content,
        last_active: new Date().toISOString()
      });
    }, 3000);
    
    return () => clearTimeout(saveTimer);
  }, [content, studentAssignment?.id]);
  
  const handleLinkAssignment = (assignmentId: string) => {
    setLinkedAssignmentId(assignmentId);
    setShowAssignmentPrompt(false);
    
    window.localStorage.setItem("linkedAssignment", assignmentId);
    
    toast.success("Assignment linked successfully", {
      description: "Your writing is now linked to this assignment"
    });
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Count words (simple splitting by spaces)
    const words = newContent.trim().split(/\s+/);
    const wordCount = newContent.trim() === "" ? 0 : words.length;
    
    updateAssignmentMutation.mutate({
      word_count: wordCount
    });
  };
  
  // Simulate copy/paste detection
  const handleManualPaste = () => {
    incrementCopyPasteCount();
    // Get clipboard text (in a real app, this would access navigator.clipboard)
    // For demo, we'll just simulate it
    setCopiedText("This is a simulated copied text from an external source...");
    setShowCitationPrompt(true);
  };
  
  const handleAddCitation = async (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => {
    if (!studentAssignment?.id || !user) return;
    
    try {
      // Create the citation
      await supabase
        .from("citations")
        .insert({
          student_assignment_id: studentAssignment.id,
          type: citation.type,
          source: citation.source,
          details: citation.details
        });
      
      // Update citation count
      const newCount = (studentAssignment.citation_count || 0) + 1;
      updateAssignmentMutation.mutate({
        citation_count: newCount
      });
      
      setShowCitationPrompt(false);
      
      toast.success("Citation added", {
        description: `Added citation from ${citation.source}`
      });
    } catch (error) {
      console.error("Error adding citation:", error);
      toast.error("Failed to add citation");
    }
  };
  
  const handleSubmitAssignment = async () => {
    if (!studentAssignment?.id) return;
    
    try {
      await supabase
        .from("student_assignments")
        .update({
          status: "submitted",
          submission_time: new Date().toISOString(),
          content: content
        })
        .eq("id", studentAssignment.id);
      
      toast.success("Assignment submitted", {
        description: "Your assignment has been successfully submitted"
      });
      
      // Reset state
      setLinkedAssignmentId(null);
      setContent("");
      
      window.localStorage.removeItem("linkedAssignment");
      
      // Refetch to get updated data
      refetchAssignment();
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment");
    }
  };
  
  return (
    <main className="flex-1 container py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your writing progress and assignments</p>
        </div>
        
        <div className="flex items-center gap-2">
          {linkedAssignmentId ? (
            <>
              <div className="bg-authentiya-maroon/10 text-authentiya-maroon px-3 py-1 rounded-full font-medium text-sm flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                Assignment Linked
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAssignmentPrompt(true)}
              >
                Change
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              className="academic-btn-primary"
              onClick={() => setShowAssignmentPrompt(true)}
            >
              Link to Assignment
            </Button>
          )}
        </div>
      </div>
      
      {studentAssignment?.start_time && (
        <WritingMetrics 
          startTime={new Date(studentAssignment.start_time)} 
          wordCount={studentAssignment.word_count || 0} 
          copyPasteCount={studentAssignment.copy_paste_count || 0}
          citationCount={studentAssignment.citation_count || 0}
        />
      )}
      
      <div className="academic-card">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-authentiya-maroon" />
              <h2 className="text-xl font-semibold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">My Document</h2>
            </div>
            
            {studentAssignment?.id && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2" 
                  onClick={handleManualPaste}
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">Simulate Copy/Paste</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => {
                    setShowCitationPrompt(true);
                  }}
                >
                  <Quote className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Citation</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 academic-btn-primary"
                  onClick={handleSubmitAssignment}
                  disabled={!studentAssignment || studentAssignment.word_count === 0}
                >
                  <SendHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Submit</span>
                </Button>
              </div>
            )}
          </div>
          
          <textarea
            ref={textareaRef}
            className="w-full min-h-[300px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-authentiya-maroon/50 transition-all resize-y"
            placeholder="Start typing your document here..."
            value={content}
            onChange={handleTextAreaChange}
            disabled={!studentAssignment?.id}
          ></textarea>
        </div>
      </div>
      
      {showAssignmentPrompt && (
        <AssignmentPrompt
          onSelect={handleLinkAssignment}
          onDismiss={() => setShowAssignmentPrompt(false)}
        />
      )}
      
      {showCitationPrompt && (
        <CitationPrompt
          copiedText={copiedText}
          onSubmit={handleAddCitation}
          onDismiss={() => setShowCitationPrompt(false)}
        />
      )}
    </main>
  );
}
