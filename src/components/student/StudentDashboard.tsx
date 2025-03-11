
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
 * - Refactored into smaller components
 * - Extracted document editing logic to hooks
 * - Improved component organization
 */

import { useEffect } from "react";
import { toast } from "sonner";
import AssignmentPrompt from "./AssignmentPrompt";
import WritingMetrics from "./WritingMetrics";
import CitationPrompt from "./CitationPrompt";
import DocumentEditor from "./DocumentEditor";
import AssignmentLinkSection from "./AssignmentLinkSection";
import SubmitAssignmentDialog from "./SubmitAssignmentDialog";
import { useDocumentState } from "@/hooks/useDocumentState";
import { useDocumentEditor } from "@/hooks/useDocumentEditor";
import { useAssignments } from "@/lib/student-assignments";

interface StudentDashboardProps {
  userEmail: string | null;
  onLogout: () => void;
}

export default function StudentDashboard({ userEmail, onLogout }: StudentDashboardProps) {
  // Get document state management
  const {
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
  } = useDocumentState();
  
  // Get document editor functionality
  const {
    editorRef,
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
  } = useDocumentEditor({ 
    currentDocId, 
    linkedAssignment 
  });
  
  // Set initial content in editor
  useEffect(() => {
    if (editorRef.current && content && editorRef.current.innerHTML === '') {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef]);
  
  // Additional citation handler for manual citations
  const handleManualCitation = () => {
    const { getAssignment, updateAssignment } = useAssignments();
    
    if (currentDocId) {
      const assignment = getAssignment(currentDocId);
      if (assignment) {
        const updatedAssignment = {
          ...assignment,
          citationCount: (assignment.citationCount || 0) + 1
        };
        updateAssignment(updatedAssignment);
      }
    }
    
    toast.success("Citation added", {
      description: "Manual citation added"
    });
  };
  
  return (
    <main className="flex-1 container py-6 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">Document Editor</h1>
          <p className="text-muted-foreground">Create, edit and submit your assignments</p>
        </div>
        
        <AssignmentLinkSection 
          linkedAssignment={linkedAssignment ? assignmentDetails?.title : null}
          onLinkAssignment={() => setShowAssignmentPrompt(true)}
        />
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
      
      <DocumentEditor 
        editorRef={editorRef}
        documentName={documentName}
        onDocumentNameChange={handleDocumentNameChange}
        lastSavedTime={lastSavedTime}
        wordCount={wordCount}
        isAutoSaving={isAutoSaving}
        onFormat={handleFormatCommand}
        onAddCitation={handleManualCitation}
        onSubmit={() => setShowSubmitDialog(true)}
        initialContent={content}
      />
      
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
