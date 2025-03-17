/**
 * DocumentStatusFilter.tsx
 * 
 * This component renders a filter for document status,
 * allowing the user to filter documents by their status.
 * 
 * Programmer: Ellia Morse
 * Date Created: 3/16/2025
 * 
 * Revisions:
 * - 3/16/2025: Initial creation of the file - Ellia Morse
 * 
 * Preconditions:
 * - None identified.
 * 
 * Acceptable Input:
 * - `status`: string - The current status filter.
 * - `onStatusChange`: function - The function to handle status changes.
 * 
 * Postconditions:
 * - Renders a filter for document status.
 * 
 * Return Values:
 * - None directly, but renders a filter element.
 */

import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, FilterX } from 'lucide-react';

interface DocumentStatusFilterProps {
  documentStatus: string;
  setDocumentStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function DocumentStatusFilter({
  documentStatus,
  setDocumentStatus
}: DocumentStatusFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm font-medium">Filter by:</span>
      <Button
        variant={documentStatus === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setDocumentStatus("all")}
        className={documentStatus === "all" ? "bg-authentiya-maroon hover:bg-authentiya-maroon/90" : ""}
      >
        <FilterX className="h-3.5 w-3.5 mr-1" />
        All
      </Button>
      <Button
        variant={documentStatus === "in_progress" ? "default" : "outline"}
        size="sm"
        onClick={() => setDocumentStatus("in_progress")}
        className={documentStatus === "in_progress" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
      >
        <Clock className="h-3.5 w-3.5 mr-1" />
        In Progress
      </Button>
      <Button
        variant={documentStatus === "completed" ? "default" : "outline"}
        size="sm"
        onClick={() => setDocumentStatus("completed")}
        className={documentStatus === "completed" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
      >
        <CheckCircle className="h-3.5 w-3.5 mr-1" />
        Completed
      </Button>
      <Button
        variant={documentStatus === "draft" ? "default" : "outline"}
        size="sm"
        onClick={() => setDocumentStatus("draft")}
        className={documentStatus === "draft" ? "bg-gray-500 hover:bg-gray-600 text-white" : ""}
      >
        <FileText className="h-3.5 w-3.5 mr-1" />
        Drafts
      </Button>
    </div>
  );
}
