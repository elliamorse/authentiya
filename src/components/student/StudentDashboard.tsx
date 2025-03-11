/**
 * StudentDashboard.tsx
 * 
 * This component renders the main student dashboard including the document editor.
 * It allows students to write and edit documents, link to assignments, and track metrics.
 * Document names can be edited with confirmation popups only when actually changed.
 * Now uses a WordProcessor component for a more robust document editing experience.
 * Refactored into smaller components for better maintainability.
 * Citation handling has been updated to use the CitationPrompt component directly.
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import WordProcessor from "./WordProcessor";
import DashboardHeader from "./DashboardHeader";
import DocumentHeader from "./DocumentHeader";
import DocumentActions from "./DocumentActions";
import { toast } from "sonner";

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
  
  const handleAddCitation = (citation?: {
    type: "website" | "book" | "ai" | "other";
    source: string;
    details?: string;
  }) => {
    setCitationCount(prev => prev + 1);
    setShowCitationPrompt(false);
    
    if (citation) {
      toast.success("Citation added", {
        description: `Added citation from ${citation.source}`
      });
    } else {
      toast.success("Citation added", {
        description: "Manual citation added"
      });
    }
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
  
  return (
    <main className="flex-1 container py-6 space-y-6">
      <DashboardHeader 
        linkedAssignment={linkedAssignment}
        onShowAssignmentPrompt={() => setShowAssignmentPrompt(true)}
      />
      
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
            <DocumentHeader 
              documentName={documentName}
              originalDocumentName={originalDocumentName}
              setDocumentName={setDocumentName}
              setOriginalDocumentName={setOriginalDocumentName}
              linkedAssignmentTitle={linkedAssignmentTitle}
            />
            
            {startTime && (
              <DocumentActions 
                linkedAssignment={linkedAssignment}
                wordCount={wordCount}
                onAddCitation={handleAddCitation}
                onSubmitAssignment={handleSubmitAssignment}
              />
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
