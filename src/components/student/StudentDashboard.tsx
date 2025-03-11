
/**
 * This file provides the main student dashboard component with an enhanced document editor
 * that resembles a word processor, including document renaming and assignment submission.
 */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import DocumentMetadata from "./DocumentMetadata";
import DocumentToolbar from "./DocumentToolbar";
import SubmitAssignmentDialog from "./SubmitAssignmentDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  BookOpen, 
  Copy, 
  FileText, 
  Quote, 
  SendHorizontal,
  Save
} from "lucide-react";

interface StudentDashboardProps {
  userEmail: string | null;
  onLogout: () => void;
}

export default function StudentDashboard({ userEmail, onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignment, setLinkedAssignment] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  const [documentName, setDocumentName] = useState("Untitled Document");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  
  // Check for saved linked assignment
  useEffect(() => {
    const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
    const savedDocumentName = window.localStorage.getItem("documentName");
    const savedContent = window.localStorage.getItem("documentContent");
    
    if (savedLinkedAssignment) {
      setLinkedAssignment(savedLinkedAssignment);
      setStartTime(new Date());
    } else {
      setShowAssignmentPrompt(true);
    }
    
    if (savedDocumentName) {
      setDocumentName(savedDocumentName);
    }
    
    if (savedContent) {
      setContent(savedContent);
      
      // Initialize editor with content
      if (editorRef.current) {
        editorRef.current.innerHTML = savedContent;
      }
    }
  }, []);
  
  // Auto-save effect
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (editorRef.current && editorRef.current.innerHTML !== content) {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        window.localStorage.setItem("documentContent", newContent);
        setLastSavedTime(new Date());
      }
    }, 5000); // Auto-save every 5 seconds
    
    return () => clearInterval(saveInterval);
  }, [content]);
  
  // Add event listeners for copy-paste detection
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      // Only proceed if we have an active assignment
      if (linkedAssignment && editorRef.current) {
        const pastedText = e.clipboardData?.getData('text') || "";
        if (pastedText.trim()) {
          setCopiedText(pastedText);
          setCopyPasteCount(prev => prev + 1);
          setShowCitationPrompt(true);
          
          // Log the paste event
          console.log("Paste detected:", pastedText.substring(0, 50) + (pastedText.length > 50 ? "..." : ""));
          toast.info("Content pasted", {
            description: "Please cite your source"
          });
        }
      }
    };
    
    // Add event listener to the editor div
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('paste', handlePasteEvent);
    }
    
    return () => {
      // Clean up event listener
      if (editor) {
        editor.removeEventListener('paste', handlePasteEvent);
      }
    };
  }, [linkedAssignment, editorRef]);
  
  // Track word count
  useEffect(() => {
    if (editorRef.current) {
      const calculateWordCount = () => {
        // Get text content from editor
        const text = editorRef.current?.textContent || "";
        // Count words (split by whitespace)
        const words = text.trim().split(/\s+/);
        setWordCount(text.trim() === "" ? 0 : words.length);
      };
      
      // Initial calculation
      calculateWordCount();
      
      // Setup mutation observer to detect content changes
      const observer = new MutationObserver(calculateWordCount);
      observer.observe(editorRef.current, { 
        childList: true, 
        subtree: true, 
        characterData: true 
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  const handleLinkAssignment = (assignmentId: string) => {
    setLinkedAssignment(assignmentId);
    setStartTime(new Date());
    setShowAssignmentPrompt(false);
    
    window.localStorage.setItem("linkedAssignment", assignmentId);
    
    toast.success("Assignment linked successfully", {
      description: "Your writing is now linked to this assignment"
    });
  };
  
  const handleDocumentNameChange = (name: string) => {
    setDocumentName(name);
    window.localStorage.setItem("documentName", name);
    toast.success("Document renamed", {
      description: `Document is now named "${name}"`
    });
  };
  
  const handleFormatCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      // Make the editor the active element
      editorRef.current.focus();
      
      // Execute formatting command
      document.execCommand(command, false, value);
      
      // Update content
      setContent(editorRef.current.innerHTML);
      window.localStorage.setItem("documentContent", editorRef.current.innerHTML);
      setLastSavedTime(new Date());
    }
  };
  
  // Simulate copy/paste detection
  const handleManualPaste = () => {
    setCopyPasteCount(prev => prev + 1);
    // Get clipboard text (in a real app, this would access navigator.clipboard)
    // For demo, we'll just simulate it
    setCopiedText("This is a simulated copied text from an external source...");
    setShowCitationPrompt(true);
  };
  
  const handleAddCitation = (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => {
    setCitationCount(prev => prev + 1);
    setShowCitationPrompt(false);
    
    // Insert citation into the document
    if (editorRef.current) {
      // Create citation element
      const citationElement = document.createElement('div');
      citationElement.className = 'citation-element p-2 my-2 bg-muted/30 border rounded-md text-sm';
      
      // Format the citation text based on type
      let citationText = '';
      switch (citation.type) {
        case 'website':
          citationText = `Web: ${citation.source}`;
          break;
        case 'book':
          citationText = `Book: ${citation.source}`;
          break;
        case 'ai':
          citationText = `AI: ${citation.source}`;
          break;
      }
      
      if (citation.details) {
        citationText += ` - ${citation.details}`;
      }
      
      citationElement.textContent = citationText;
      
      // Get selection or insert at end
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(citationElement);
      } else {
        editorRef.current.appendChild(citationElement);
      }
      
      // Update content
      setContent(editorRef.current.innerHTML);
      window.localStorage.setItem("documentContent", editorRef.current.innerHTML);
      setLastSavedTime(new Date());
    }
    
    toast.success("Citation added", {
      description: `Added citation from ${citation.source}`
    });
  };
  
  const handleManualSave = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      window.localStorage.setItem("documentContent", newContent);
      setLastSavedTime(new Date());
      
      toast.success("Document saved", {
        description: "Your document has been saved"
      });
    }
  };
  
  const handleSubmitAssignment = (classId: string, assignmentId: string) => {
    // In a real app, this would make an API call
    toast.success("Assignment submitted", {
      description: "Your assignment has been successfully submitted"
    });
    
    // Reset state if needed
    setLinkedAssignment(null);
    window.localStorage.removeItem("linkedAssignment");
  };
  
  return (
    <main className="flex-1 container py-6 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Document Editor</h1>
          <p className="text-muted-foreground">Create, edit and submit your assignments</p>
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
      
      <div className="academic-card overflow-hidden">
        <DocumentMetadata 
          documentName={documentName}
          onDocumentNameChange={handleDocumentNameChange}
          lastSavedTime={lastSavedTime}
          wordCount={wordCount}
        />
        
        <DocumentToolbar onFormat={handleFormatCommand} />
        
        <div 
          ref={editorRef}
          contentEditable
          className="min-h-[400px] p-6 focus:outline-none"
          style={{ overflowY: 'auto', maxHeight: '60vh' }}
        ></div>
        
        <div className="p-2 border-t flex justify-between items-center">
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleManualPaste}
            >
              <Copy className="h-4 w-4" />
              <span>Simulate Paste</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 ml-2"
              onClick={() => {
                setCitationCount(prev => prev + 1);
                toast.success("Citation added", {
                  description: "Manual citation added"
                });
              }}
            >
              <Quote className="h-4 w-4" />
              <span>Add Citation</span>
            </Button>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 mr-2"
              onClick={handleManualSave}
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Button 
              size="sm" 
              className="gap-1 academic-btn-primary"
              onClick={() => setShowSubmitDialog(true)}
            >
              <SendHorizontal className="h-4 w-4" />
              <span>Submit</span>
            </Button>
          </div>
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
      
      <SubmitAssignmentDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        onSubmit={handleSubmitAssignment}
        documentName={documentName}
      />
    </main>
  );
}
