
/**
 * AssignmentSection.tsx
 * 
 * This component renders a section of assignments with a title.
 */

import React from 'react';
import AssignmentCard from './AssignmentCard';

interface AssignmentSectionProps {
  title: string;
  assignments: any[];
  formatDate: (dateString: string) => string;
  onOpenDocument: (doc: any) => void;
  documents: any[];
  setDocuments: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AssignmentSection({
  title,
  assignments,
  formatDate,
  onOpenDocument,
  documents,
  setDocuments
}: AssignmentSectionProps) {
  if (assignments.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 font-playfair">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            formatDate={formatDate}
            onOpenDocument={onOpenDocument}
            documents={documents}
            setDocuments={setDocuments}
          />
        ))}
      </div>
    </div>
  );
}
