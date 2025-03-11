
/**
 * This file provides a custom hook for managing document state,
 * including document linking to assignments, naming, and session tracking.
 * 
 * Features:
 * - Link documents to assignments
 * - Document naming and renaming
 * - Session time tracking
 * - Document initialization and loading
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAssignments, Assignment, AssignmentStatus } from "@/lib/student-assignments";

export const useDocumentState = () => {
  const navigate = useNavigate();
  const { assignments, updateAssignment, getAssignment, createDocument } = useAssignments();
  
  const [showAssignmentPrompt, setShowAssignmentPrompt] = useState(false);
  const [linkedAssignment, setLinkedAssignment] = useState<string | null>(null);
  const [assignmentDetails, setAssignmentDetails] = useState<{id: string, title: string} | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [documentName, setDocumentName] = useState("Untitled Document");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  
  // Initialize document based on URL params or localStorage
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
        setCurrentDocId(assignmentId);
        
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
    }
    
    // Initialize start time
    setStartTime(new Date());
  }, [assignments]);

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

  return {
    showAssignmentPrompt,
    setShowAssignmentPrompt,
    linkedAssignment,
    assignmentDetails,
    startTime,
    documentName,
    showSubmitDialog,
    setShowSubmitDialog,
    currentDocId,
    content,
    setContent,
    handleLinkAssignment,
    handleDocumentNameChange,
    handleSubmitAssignment
  };
};
