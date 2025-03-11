
/**
 * This file provides the main document editor component with rich text editing capabilities.
 * It handles content editing, formatting, and integrates with the document state management.
 */
import { useState } from "react";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DocumentMetadata from "./DocumentMetadata";
import DocumentToolbar from "./DocumentToolbar";
import { useAssignments } from "@/lib/student-assignments";

interface DocumentEditorProps {
  editorRef: React.RefObject<HTMLDivElement>;
  documentName: string;
  onDocumentNameChange: (name: string) => void;
  lastSavedTime: Date | null;
  wordCount: number;
  isAutoSaving: boolean;
  onFormat: (command: string, value?: string) => void;
  onAddCitation: () => void;
  onSubmit: () => void;
  initialContent?: string;
}

export default function DocumentEditor({
  editorRef,
  documentName,
  onDocumentNameChange,
  lastSavedTime,
  wordCount,
  isAutoSaving,
  onFormat,
  onAddCitation,
  onSubmit,
  initialContent = ""
}: DocumentEditorProps) {
  // Set initial content if provided
  if (editorRef.current && initialContent && editorRef.current.innerHTML === '') {
    editorRef.current.innerHTML = initialContent;
  }
  
  return (
    <div className="academic-card overflow-hidden">
      <DocumentMetadata 
        documentName={documentName}
        onDocumentNameChange={onDocumentNameChange}
        lastSavedTime={lastSavedTime}
        wordCount={wordCount}
        isAutoSaving={isAutoSaving}
      />
      
      <DocumentToolbar onFormat={onFormat} />
      
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
            onClick={onAddCitation}
          >
            <Quote className="h-4 w-4" />
            <span>Add Citation</span>
          </Button>
        </div>
        
        <div>
          <Button 
            size="sm" 
            className="gap-1 academic-btn-primary"
            onClick={onSubmit}
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
