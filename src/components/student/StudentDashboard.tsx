/**
 * This file provides the main student dashboard component with an enhanced document editor
 * that resembles a word processor, including document renaming and assignment submission.
 * 
 * Features:
 * - Auto-prompt for assignment linking when opening editor
 * - Default document name from linked assignment
 * - Session time tracking (active typing only)
 * - Autosaving with visual indicator
 * - Documents added to My Assignments page
 * - Citation tracking and prompting
 * 
 * Updates:
 * - Fixed type issues with Assignment interface
 * - Properly handling AssignmentStatus type
 * - Added proper typing for citationCount
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
  Quote, 
  SendHorizontal
} from "lucide-react";
import { useAssignments, Assignment, AssignmentStatus } from "@/lib/student-assignments";

interface StudentDashboardProps {
  userEmail: string | null;
  onLogout: () => void;
}

export default function StudentDashboard({ userEmail, onLogout }: StudentDashboardProps) {
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  const { assignments, updateAssignment, getAssignment, createDocument } = useAssignments();
  
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignment, setLinkedAssignment] = useState<string | null>(null);
  const [assignmentDetails, setAssignmentDetails] = useState<{id: string, title: string} | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [pastedWordCount, setPastedWordCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [content, setContent] = useState("");
  const [documentName, setDocumentName] = useState("Untitled Document");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  
  // Prompt for assignment linking on first load if no assignment is linked
  useEffect(() => {
    const savedLinkedAssignment = window.localStorage.getItem("linkedAssignment");
    const savedDocumentName = window.localStorage.getItem("documentName");
    const savedContent = window.localStorage.getItem("documentContent");
    
    // Check if we're editing an existing assignment from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get('id');
    
    if (assignmentId) {
      const assignment = getAssignment(assignmentId);
      if (assignment) {
        setLinkedAssignment(assignmentId);
        setAssignmentDetails({ id: assignmentId, title: assignment.title });
        setDocumentName(assignment.title);
        setContent(assignment.content || '');
        setCopyPasteCount(assignment.copyPasteCount || 0);
        setWordCount(assignment.wordCount);
        setCurrentDocId(assignmentId);
        
        // Initialize editor with content
        if (editorRef.current && assignment.content) {
          editorRef.current.innerHTML = assignment.content;
        }
        
        // Update localStorage
        window.localStorage.setItem("linkedAssignment", assignmentId);
        window.localStorage.setItem("documentName", assignment.title);
        window.localStorage.setItem("documentContent", assignment.content || '');
        
        // Mark as in progress if it wasn't already
        if (assignment.status === "not_started") {
          const updatedAssignment: Assignment = {
            ...assignment,
            status: "in_progress" as AssignmentStatus,
            startedOn: new Date().toISOString()
          };
          updateAssignment(updatedAssignment);
        }
        
        return;
      }
    }
    
    if (savedLinkedAssignment) {
      setLinkedAssignment(savedLinkedAssignment);
      
      // Find assignment details to set document name
      const assignment = assignments.find(a => a.id === savedLinkedAssignment);
      if (assignment) {
        setAssignmentDetails({ id: savedLinkedAssignment, title: assignment.title });
        setCurrentDocId(savedLinkedAssignment);
        
        // Only use assignment title if no custom document name was saved
        if (!savedDocumentName) {
          setDocumentName(assignment.title);
          window.localStorage.setItem("documentName", assignment.title);
        }
      } else {
        // Create a new document and link it to this ID
        const newDoc = createDocument(savedDocumentName || "Untitled Document", null);
        setCurrentDocId(newDoc.id);
      }
    } else {
      // Show assignment prompt immediately if no assignment is linked
      setShowAssignmentPrompt(true);
      
      // Create a new unlinked document
      const newDoc = createDocument("Untitled Document", null);
      setCurrentDocId(newDoc.id);
    }
    
    // Load saved document name if exists
    if (savedDocumentName) {
      setDocumentName(savedDocumentName);
    }
    
    // Load saved content if exists
    if (savedContent) {
      setContent(savedContent);
      
      // Initialize editor with content
      if (editorRef.current) {
        editorRef.current.innerHTML = savedContent;
      }
    }
    
    // Initialize start time
    setStartTime(new Date());
  }, [assignments]);
  
  // Auto-save effect
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (editorRef.current && editorRef.current.innerHTML !== content) {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        window.localStorage.setItem("documentContent", newContent);
        setLastSavedTime(new Date());
        
        // Show autosaving indicator
        setIsAutoSaving(true);
        
        // Hide autosaving indicator after 2 seconds
        setTimeout(() => {
          setIsAutoSaving(false);
        }, 2000);
        
        // Update assignment in store
        if (currentDocId) {
          const assignment = getAssignment(currentDocId);
          if (assignment) {
            const updatedAssignment: Assignment = {
              ...assignment,
              content: newContent,
              wordCount,
              timeSpent: assignment.timeSpent + 1,
              lastActive: new Date().toISOString()
            };
            updateAssignment(updatedAssignment);
          }
        }
      }
    }, 3000); // Auto-save every 3 seconds
    
    return () => clearInterval(saveInterval);
  }, [content, currentDocId, wordCount]);
  
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
          
          // Calculate approximate word count of pasted text
          const pastedWords = pastedText.trim().split(/\s+/).length;
          setPastedWordCount(prev => prev + pastedWords);
          
          // Log the paste event
          console.log("Paste detected:", pastedText.substring(0, 50) + (pastedText.length > 50 ? "..." : ""));
          toast.info("Content pasted", {
            description: "Please cite your source"
          });
          
          // Update assignment in store
          if (currentDocId) {
            const assignment = getAssignment(currentDocId);
            if (assignment) {
              updateAssignment({
                ...assignment,
                copyPasteCount: (assignment.copyPasteCount || 0) + 1
              });
            }
          }
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
  }, [linkedAssignment, editorRef, currentDocId]);
  
  // Track word count
  useEffect(() => {
    if (editorRef.current) {
      const calculateWordCount = () => {
        // Get text content from editor
        const text = editorRef.current?.textContent || "";
        // Count words (split by whitespace)
        const words = text.trim().split(/\s+/);
        const newWordCount = text.trim() === "" ? 0 : words.length;
        setWordCount(newWordCount);
        
        // Update assignment in store if word count changed
        if (currentDocId && newWordCount !== wordCount) {
          const assignment = getAssignment(currentDocId);
          if (assignment) {
            updateAssignment({
              ...assignment,
              wordCount: newWordCount
            });
          }
        }
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
  }, [currentDocId]);
  
  const handleLinkAssignment = (assignmentId: string) => {
    setLinkedAssignment(assignmentId);
    
    // Find assignment details
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setAssignmentDetails({ id: assignmentId, title: assignment.title });
      
      // Only set document name if it's still the default
      if (documentName === "Untitled Document") {
        setDocumentName(assignment.title);
        window.localStorage.setItem("documentName", assignment.title);
      }
      
      // Update the assignment status to in_progress
      const updatedAssignment: Assignment = {
        ...assignment,
        status: "in_progress" as AssignmentStatus,
        startedOn: assignment.startedOn || new Date().toISOString()
      };
      updateAssignment(updatedAssignment);
      
      // Set current document to this assignment
      setCurrentDocId(assignmentId);
      
      // Update content if empty
      if (content === "" && assignment.content) {
        setContent(assignment.content);
        if (editorRef.current) {
          editorRef.current.innerHTML = assignment.content;
        }
      }
    } else {
      // Create a new document linked to this assignment ID
      const newDoc = createDocument(documentName, assignmentId);
      setCurrentDocId(newDoc.id);
    }
    
    window.localStorage.setItem("linkedAssignment", assignmentId);
    setShowAssignmentPrompt(false);
    
    toast.success("Assignment linked successfully", {
      description: "Your writing is now linked to this assignment"
    });
  };
  
  const handleDocumentNameChange = (name: string) => {
    if (name !== documentName) {
      setDocumentName(name);
      window.localStorage.setItem("documentName", name);
      
      // Update assignment in store
      if (currentDocId) {
        const assignment = getAssignment(currentDocId);
        if (assignment) {
          updateAssignment({
            ...assignment,
            title: name
          });
        }
      }
      
      toast.success("Document renamed", {
        description: `Document is now named "${name}"`
      });
    }
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
      
      // Show autosaving indicator
      setIsAutoSaving(true);
      
      // Hide autosaving indicator after 2 seconds
      setTimeout(() => {
        setIsAutoSaving(false);
      }, 2000);
      
      // Update assignment in store
      if (currentDocId) {
        const assignment = getAssignment(currentDocId);
        if (assignment) {
          updateAssignment({
            ...assignment,
            content: editorRef.current.innerHTML
          });
        }
      }
    }
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
      
      // Update content and trigger autosave
      setContent(editorRef.current.innerHTML);
      window.localStorage.setItem("documentContent", editorRef.current.innerHTML);
      setLastSavedTime(new Date());
      setIsAutoSaving(true);
      
      // Hide autosaving indicator after 2 seconds
      setTimeout(() => {
        setIsAutoSaving(false);
      }, 2000);
      
      // Update assignment in store
      if (currentDocId) {
        const assignment = getAssignment(currentDocId);
        if (assignment) {
          const updatedAssignment: Assignment = {
            ...assignment,
            content: editorRef.current.innerHTML,
            citationCount: (assignment.citationCount || 0) + 1
          };
          updateAssignment(updatedAssignment);
        }
      }
    }
    
    toast.success("Citation added", {
      description: `Added citation from ${citation.source}`
    });
  };
  
  const handleSubmitAssignment = (classId: string, assignmentId: string) => {
    // Update the assignment status to submitted
    if (currentDocId) {
      const assignment = getAssignment(currentDocId);
      if (assignment) {
        const updatedAssignment: Assignment = {
          ...assignment,
          status: "submitted" as AssignmentStatus,
          submittedOn: new Date().toISOString()
        };
        updateAssignment(updatedAssignment);
      }
    }
    
    // Clear localStorage
    window.localStorage.removeItem("linkedAssignment");
    window.localStorage.removeItem("documentName");
    window.localStorage.removeItem("documentContent");
    
    toast.success("Assignment submitted", {
      description: "Your assignment has been successfully submitted"
    });
    
    // Navigate to assignments page
    navigate("/student/assignments");
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
          activeTypingOnly={true}
          pastedWordCount={pastedWordCount}
        />
      )}
      
      <div className="academic-card overflow-hidden">
        <DocumentMetadata 
          documentName={documentName}
          onDocumentNameChange={handleDocumentNameChange}
          lastSavedTime={lastSavedTime}
          wordCount={wordCount}
          isAutoSaving={isAutoSaving}
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
              onClick={() => {
                setCitationCount(prev => prev + 1);
                
                // Update assignment in store
                if (currentDocId) {
                  const assignment = getAssignment(currentDocId);
                  if (assignment) {
                    const updatedAssignment: Assignment = {
                      ...assignment,
                      citationCount: (assignment.citationCount || 0) + 1
                    };
                    updateAssignment(updatedAssignment);
                  }
                }
                
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
