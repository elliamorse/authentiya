/**
 * StudentDashboard.tsx
 * 
 * This component renders the main student dashboard including the document editor.
 * It allows students to write and edit documents, link to assignments, and track metrics.
 * Document names can be edited with confirmation popups only when actually changed.
 * Now uses a WordProcessor component for a more robust document editing experience.
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import WordProcessor from "./WordProcessor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  BookOpen, 
  FileText, 
  Quote, 
  SendHorizontal,
  Edit,
  Check
} from "lucide-react";

interface StudentDashboardProps {
  userEmail: string | null;
  onLogout: () => void;
}

export default function StudentDashboard({ userEmail, onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignment, setLinkedAssignment] = useState<string | null>(null);
  const [linkedAssignmentTitle, setLinkedAssignmentTitle] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  const [documentName, setDocumentName] = useState("Untitled Document");
  const [isEditingName, setIsEditingName] = useState(false);
  const [originalDocumentName, setOriginalDocumentName] = useState("Untitled Document");
  
  useEffect(() => {
    const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
    const savedLinkedAssignmentTitle = window.localStorage.getItem("linkedAssignmentTitle");
    
    if (savedLinkedAssignment) {
      setLinkedAssignment(savedLinkedAssignment);
      if (savedLinkedAssignmentTitle) {
        setLinkedAssignmentTitle(savedLinkedAssignmentTitle);
        setDocumentName(savedLinkedAssignmentTitle);
        setOriginalDocumentName(savedLinkedAssignmentTitle);
      }
      setStartTime(new Date());
    } else {
      setShowAssignmentPrompt(true);
    }
    
    const savedContent = window.localStorage.getItem("currentDocument");
    if (savedContent) {
      setContent(savedContent);
      
      const words = savedContent.trim().split(/\s+/);
      setWordCount(savedContent.trim() === "" ? 0 : words.length);
    }
    
    const savedDocumentName = window.localStorage.getItem("documentName");
    if (savedDocumentName) {
      setDocumentName(savedDocumentName);
      setOriginalDocumentName(savedDocumentName);
    }
  }, []);
  
  useEffect(() => {
    if (content) {
      window.localStorage.setItem("currentDocument", content);
    }
  }, [content]);
  
  useEffect(() => {
    if (documentName) {
      window.localStorage.setItem("documentName", documentName);
    }
  }, [documentName]);
  
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      if (linkedAssignment && e.target instanceof HTMLTextAreaElement) {
        const pastedText = e.clipboardData?.getData('text') || "";
        if (pastedText.trim()) {
          setCopiedText(pastedText);
          setCopyPasteCount(prev => prev + 1);
          setShowCitationPrompt(true);
          
          console.log("Paste detected:", pastedText.substring(0, 50) + (pastedText.length > 50 ? "..." : ""));
          toast.info("Content pasted", {
            description: "Please cite your source"
          });
        }
      }
    };
    
    document.addEventListener('paste', handlePasteEvent);
    
    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, [linkedAssignment]);
  
  const handleLinkAssignment = (assignmentId: string, assignmentTitle?: string) => {
    setLinkedAssignment(assignmentId);
    
    if (assignmentTitle) {
      setLinkedAssignmentTitle(assignmentTitle);
      setDocumentName(assignmentTitle);
      setOriginalDocumentName(assignmentTitle);
      window.localStorage.setItem("linkedAssignmentTitle", assignmentTitle);
    }
    
    setStartTime(new Date());
    setShowAssignmentPrompt(false);
    
    window.localStorage.setItem("linkedAssignment", assignmentId);
    
    toast.success("Assignment linked successfully", {
      description: "Your writing is now linked to this assignment"
    });
  };
  
  const handleTextChange = (newContent: string) => {
    setContent(newContent);
    
    const words = newContent.trim().split(/\s+/);
    setWordCount(newContent.trim() === "" ? 0 : words.length);
  };
  
  const handleAddCitation = (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => {
    setCitationCount(prev => prev + 1);
    setShowCitationPrompt(false);
    
    toast.success("Citation added", {
      description: `Added citation from ${citation.source}`
    });
  };
  
  const handleSubmitAssignment = () => {
    toast.success("Assignment submitted", {
      description: "Your assignment has been successfully submitted"
    });
    
    setLinkedAssignment(null);
    setLinkedAssignmentTitle(null);
    setStartTime(null);
    setWordCount(0);
    setCopyPasteCount(0);
    setCitationCount(0);
    setContent("");
    setDocumentName("Untitled Document");
    setOriginalDocumentName("Untitled Document");
    
    window.localStorage.removeItem("linkedAssignment");
    window.localStorage.removeItem("linkedAssignmentTitle");
    window.localStorage.removeItem("currentDocument");
    window.localStorage.removeItem("documentName");
    
    navigate("/student/assignments");
  };
  
  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
    if (!isEditingName) {
      setOriginalDocumentName(documentName);
    }
  };
  
  const saveDocumentName = () => {
    setIsEditingName(false);
    
    if (documentName.trim() === "") {
      setDocumentName(linkedAssignmentTitle || "Untitled Document");
    }
    
    if (documentName !== originalDocumentName) {
      toast.success("Document renamed", {
        description: `Saved as "${documentName}"`
      });
      setOriginalDocumentName(documentName);
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
          {linkedAssignment ? (
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
      
      {startTime && (
        <WritingMetrics 
          startTime={startTime} 
          wordCount={wordCount} 
          copyPasteCount={copyPasteCount}
          citationCount={citationCount}
        />
      )}
      
      <div className="academic-card">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-authentiya-maroon" />
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="h-8 w-64"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveDocumentName();
                      } else if (e.key === "Escape") {
                        setIsEditingName(false);
                        setDocumentName(originalDocumentName);
                      }
                    }}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={saveDocumentName}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
                    {documentName}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleEditName}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {startTime && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => {
                    setCitationCount(prev => prev + 1);
                    toast.success("Citation added", {
                      description: "Manual citation added"
                    });
                  }}
                >
                  <Quote className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Citation</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 academic-btn-primary"
                  onClick={handleSubmitAssignment}
                  disabled={!linkedAssignment || wordCount === 0}
                >
                  <SendHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Submit</span>
                </Button>
              </div>
            )}
          </div>
          
          <WordProcessor 
            content={content} 
            onChange={handleTextChange}
            placeholder="Start typing your document here..."
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
