
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import WelcomeDialog from "./WelcomeDialog";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import TextEditor from "./TextEditor"; // We'll implement this next
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  BookOpen, 
  Edit2,
  Save, 
  Quote, 
  SendHorizontal
} from "lucide-react";
import { useStudentAssignment } from "@/hooks/useStudentAssignment";
import { useTypingMetrics } from "@/hooks/useTypingMetrics";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isNewUser, setIsNewUser] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignmentId, setLinkedAssignmentId] = useState<string | null>(null);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  const [editingDocName, setEditingDocName] = useState(false);
  const [documentName, setDocumentName] = useState("Untitled Document");
  
  // Custom hooks
  const { trackTyping, wpm, isTyping } = useTypingMetrics();
  const {
    studentAssignment,
    updateTimeSpent,
    incrementCopyPasteCount,
    saveContent,
    updateWordCount,
    updateDocumentName,
    submitAssignment,
    addCitation
  } = useStudentAssignment(linkedAssignmentId);
  
  // Check if the user is new
  useEffect(() => {
    if (user) {
      const userCreationTime = new Date(user.created_at || Date.now());
      const now = new Date();
      const diffMs = now.getTime() - userCreationTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      // If user account is less than 5 minutes old, consider them new
      if (diffMins < 5) {
        setIsNewUser(true);
        setShowWelcomeDialog(true);
      }
    }
  }, [user]);
  
  // Check for saved linked assignment
  useEffect(() => {
    const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
    if (savedLinkedAssignment) {
      setLinkedAssignmentId(savedLinkedAssignment);
    } else if (!isNewUser) {
      setShowAssignmentPrompt(true);
    }
    
    // Cleanup function to update time spent
    return () => {
      if (studentAssignment?.id) {
        updateTimeSpent();
      }
    };
  }, []);
  
  // Set initial content and document name if available from database
  useEffect(() => {
    if (studentAssignment) {
      if (studentAssignment.content) {
        setContent(studentAssignment.content);
      }
      if (studentAssignment.document_name) {
        setDocumentName(studentAssignment.document_name);
      }
    }
  }, [studentAssignment]);
  
  // Save content periodically
  useEffect(() => {
    if (!studentAssignment?.id || !content) return;
    
    const saveTimer = setTimeout(() => {
      saveContent(content);
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
  
  // Enhanced text area change handler that tracks typing metrics
  const handleContentChange = (newContent: string) => {
    const oldContent = content;
    
    // Use our custom hook to track typing metrics and get word count
    const wordCount = trackTyping(oldContent, newContent);
    
    setContent(newContent);
    updateWordCount(wordCount);
  };
  
  // Document name editing
  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };
  
  const saveDocumentName = () => {
    updateDocumentName(documentName);
    setEditingDocName(false);
  };
  
  const handlePasteDetected = (pastedText: string) => {
    if (studentAssignment?.id && pastedText.trim()) {
      setCopiedText(pastedText);
      incrementCopyPasteCount();
      setShowCitationPrompt(true);
      
      toast.info("Content pasted", {
        description: "Please cite your source"
      });
    }
  };
  
  const handleAddCitation = async (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => {
    const success = await addCitation(citation);
    if (success) {
      setShowCitationPrompt(false);
    }
  };
  
  const handleSubmitAssignment = async () => {
    const success = await submitAssignment(content);
    if (success) {
      // Reset state
      setLinkedAssignmentId(null);
      setContent("");
      window.localStorage.removeItem("linkedAssignment");
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
          wpm={wpm}
          copyPasteCount={studentAssignment.copy_paste_count || 0}
          citationCount={studentAssignment.citation_count || 0}
          isTyping={isTyping}
        />
      )}
      
      <div className="academic-card">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3 flex-1">
              {editingDocName ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={documentName}
                    onChange={handleDocNameChange}
                    className="max-w-xs"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveDocumentName();
                    }}
                  />
                  <Button size="sm" onClick={saveDocumentName}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
                    {documentName}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setEditingDocName(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {studentAssignment?.id && (
              <div className="flex items-center gap-2">
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
                  disabled={!studentAssignment || !studentAssignment.word_count || studentAssignment.word_count === 0}
                >
                  <SendHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Submit</span>
                </Button>
              </div>
            )}
          </div>
          
          <TextEditor 
            content={content}
            onChange={handleContentChange}
            onPaste={handlePasteDetected}
            readOnly={!studentAssignment?.id}
          />
        </div>
      </div>
      
      {showWelcomeDialog && (
        <WelcomeDialog
          open={showWelcomeDialog}
          onOpenChange={setShowWelcomeDialog}
          onLinkAssignment={handleLinkAssignment}
        />
      )}
      
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
