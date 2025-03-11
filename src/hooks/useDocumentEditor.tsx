
/**
 * This file provides a custom hook for managing document editing functionality,
 * including content updates, autosaving, and document metadata management.
 * 
 * Features:
 * - Document content management
 * - Auto-saving with visual indicator
 * - Word count tracking
 * - Copy/paste detection
 * - Citation tracking
 */
import { useState, useEffect, useRef, RefObject } from "react";
import { toast } from "sonner";
import { useAssignments, Assignment, AssignmentStatus } from "@/lib/student-assignments";

interface UseDocumentEditorProps {
  currentDocId: string | null;
  linkedAssignment: string | null;
}

interface UseDocumentEditorReturn {
  editorRef: RefObject<HTMLDivElement>;
  content: string;
  setContent: (content: string) => void;
  wordCount: number;
  lastSavedTime: Date | null;
  isAutoSaving: boolean;
  copyPasteCount: number;
  pastedWordCount: number;
  citationCount: number;
  showCitationPrompt: boolean;
  setShowCitationPrompt: (show: boolean) => void;
  copiedText: string;
  handleFormatCommand: (command: string, value?: string) => void;
  handleAddCitation: (citation: {
    type: "website" | "book" | "ai";
    source: string;
    details?: string;
  }) => void;
}

export const useDocumentEditor = ({ 
  currentDocId, 
  linkedAssignment 
}: UseDocumentEditorProps): UseDocumentEditorReturn => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { updateAssignment, getAssignment } = useAssignments();
  
  const [content, setContent] = useState("");
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [copyPasteCount, setCopyPasteCount] = useState(0);
  const [pastedWordCount, setPastedWordCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [showCitationPrompt, setShowCitationPrompt] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  
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
        setTimeout(() => setIsAutoSaving(false), 2000);
        
        // Only update if we have a valid currentDocId
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
    }, 3000);
    
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
  
  return {
    editorRef,
    content,
    setContent,
    wordCount,
    lastSavedTime,
    isAutoSaving,
    copyPasteCount,
    pastedWordCount,
    citationCount,
    showCitationPrompt,
    setShowCitationPrompt,
    copiedText,
    handleFormatCommand,
    handleAddCitation
  };
};
