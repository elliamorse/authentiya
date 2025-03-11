
/**
 * DocumentsSection.tsx
 * 
 * This component renders the documents section with filters and cards.
 */

import React from 'react';
import { FileText } from 'lucide-react';
import DocumentStatusFilter from './DocumentStatusFilter';
import DocumentCard from './DocumentCard';
import NewDocumentCard from './NewDocumentCard';

interface DocumentsSectionProps {
  documentStatus: string;
  setDocumentStatus: React.Dispatch<React.SetStateAction<string>>;
  filteredDocuments: any[];
  renderStatusBadge: (status: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
  formatDateTime: (dateString: string) => string;
  onOpenDocument: (doc: any) => void;
  documents: any[];
  setDocuments: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function DocumentsSection({
  documentStatus,
  setDocumentStatus,
  filteredDocuments,
  renderStatusBadge,
  formatDate,
  formatDateTime,
  onOpenDocument,
  documents,
  setDocuments
}: DocumentsSectionProps) {
  const handleCreateDocument = () => {
    const newDoc = {
      id: `d${Date.now()}`,
      title: "Untitled Document",
      assignmentId: null,
      className: null,
      teacherName: null,
      lastEdited: new Date().toISOString(),
      status: "draft",
      dueDate: null,
      timeSpent: 0,
      wordCount: 0,
      content: ""
    };
    setDocuments([...documents, newDoc]);
    onOpenDocument(newDoc);
  };
  
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 font-playfair">My Documents</h3>
      <DocumentStatusFilter 
        documentStatus={documentStatus} 
        setDocumentStatus={setDocumentStatus} 
      />
      
      {filteredDocuments.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No documents found with the selected status</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              formatDate={formatDate}
              formatDateTime={formatDateTime}
              onOpenDocument={onOpenDocument}
              renderStatusBadge={renderStatusBadge}
            />
          ))}
          
          <NewDocumentCard onCreateDocument={handleCreateDocument} />
        </div>
      )}
    </div>
  );
}
