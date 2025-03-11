
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  BookOpen, 
  Copy, 
  FileText,
  Edit2,
  Save, 
  Quote, 
  SendHorizontal,
  Trash2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { useStudentAssignment } from "@/hooks/useStudentAssignment";
import { useTypingMetrics } from "@/hooks/useTypingMetrics";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
  }, [studentAssignment?.id]);
  
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
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
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
  
  // Text formatting functions
  const applyFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newCursorPos = 0;
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = end + 4;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = end + 2;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        newCursorPos = end + 2;
        break;
      case 'align-left':
      case 'align-center':
      case 'align-right':
        // Simple alignment tags (in a real editor, you'd use proper formatting)
        formattedText = `[${format}]${selectedText}[/${format}]`;
        newCursorPos = end + format.length * 2 + 5;
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Save the content
    saveContent(newContent);
    
    // Set selection to after the formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  
  // Simulate copy/paste detection for demo purposes
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
              <FileText className="h-5 w-5 text-authentiya-maroon" />
              
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
                  disabled={!studentAssignment || !studentAssignment.word_count || studentAssignment.word_count === 0}
                >
                  <SendHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Submit</span>
                </Button>
              </div>
            )}
          </div>
          
          {/* Text formatting toolbar */}
          <div className="flex items-center gap-2 mb-3 p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => applyFormat('bold')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => applyFormat('italic')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => applyFormat('underline')}
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => applyFormat('align-left')}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => applyFormat('align-center')}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => applyFormat('align-right')}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Textarea
            ref={textareaRef}
            className="w-full min-h-[300px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-authentiya-maroon/50 transition-all resize-y text-base"
            placeholder="Start typing your document here..."
            value={content}
            onChange={handleTextAreaChange}
            disabled={!studentAssignment?.id}
            autoFocus
          />
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
