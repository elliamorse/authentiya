/**
 * DocumentCard.tsx
 * 
 * This component renders a card displaying information about a document,
 * including the title, status, and last modified date.
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
 * - `document`: object - The document details including title, status, and last modified date.
 * 
 * Postconditions:
 * - Renders a card with document information.
 * 
 * Return Values:
 * - None directly, but renders a card element.
 */

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { 
  Book, 
  Calendar, 
  CheckCircle,
  Clock, 
  FileText, 
  GraduationCap
} from 'lucide-react';

interface DocumentCardProps {
  doc: any;
  formatDate: (dateString: string) => string;
  formatDateTime: (dateString: string) => string;
  onOpenDocument: (doc: any) => void;
  renderStatusBadge: (status: string) => React.ReactNode;
}

export default function DocumentCard({ 
  doc, 
  formatDate, 
  formatDateTime, 
  onOpenDocument,
  renderStatusBadge
}: DocumentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className={`h-2 ${
        doc.status === "completed" ? "bg-green-500" : 
        doc.status === "in_progress" ? "bg-blue-500" : 
        "bg-authentiya-charcoal"
      }`}></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-lg font-playfair line-clamp-1">{doc.title}</h4>
          {renderStatusBadge(doc.status)}
        </div>
        
        {doc.className && (
          <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
            <Book className="h-3 w-3" />
            <span>{doc.className}</span>
          </div>
        )}
        
        {doc.teacherName && (
          <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
            <GraduationCap className="h-3 w-3" />
            <span>{doc.teacherName}</span>
          </div>
        )}
        
        {doc.dueDate && (
          <div className="text-sm text-muted-foreground flex gap-1 items-center mb-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {formatDate(doc.dueDate)}</span>
          </div>
        )}
        
        <div className="text-sm text-muted-foreground flex gap-1 items-center mb-3">
          <Clock className="h-3 w-3" />
          <span>Last edited: {formatDateTime(doc.lastEdited)}</span>
        </div>
        
        <div className="mt-2 p-2 bg-gray-50/50 dark:bg-gray-900/20 rounded border border-gray-100 dark:border-gray-900/30 text-xs">
          <div className="flex justify-between mb-1">
            <span>Time spent:</span>
            <span className="font-medium">{Math.floor(doc.timeSpent / 60)}h {doc.timeSpent % 60}m</span>
          </div>
          <div className="flex justify-between">
            <span>Words written:</span>
            <span className="font-medium">{doc.wordCount}</span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground line-clamp-2">
          {doc.content}
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          className="w-full mt-3 academic-btn-primary"
          onClick={() => onOpenDocument(doc)}
        >
          Open Document
        </Button>
      </CardContent>
    </Card>
  );
}
