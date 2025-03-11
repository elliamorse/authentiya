
/**
 * DocumentHeader.tsx
 * 
 * This component handles the document title display and editing functionality.
 * It shows an editable document name with an edit button, and handles saving changes
 * only when the name is actually changed from its previous value.
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Check } from "lucide-react";
import { toast } from "sonner";

interface DocumentHeaderProps {
  documentName: string;
  originalDocumentName: string;
  setDocumentName: (name: string) => void;
  setOriginalDocumentName: (name: string) => void;
  linkedAssignmentTitle: string | null;
}

export default function DocumentHeader({
  documentName,
  originalDocumentName,
  setDocumentName,
  setOriginalDocumentName,
  linkedAssignmentTitle
}: DocumentHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  
  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
    if (!isEditingName) {
      setOriginalDocumentName(documentName);
    }
  };
  
  const saveDocumentName = () => {
    setIsEditingName(false);
    
    if (documentName.trim() === "") {
      setDocumentName(linkedAssignmentTitle || "Untitled Document");
    }
    
    if (documentName !== originalDocumentName) {
      toast.success("Document renamed", {
        description: `Saved as "${documentName}"`
      });
      setOriginalDocumentName(documentName);
    }
  };
  
  return (
    <div className="flex items-center gap-3">
      <FileText className="h-5 w-5 text-authentiya-maroon" />
      {isEditingName ? (
        <div className="flex items-center gap-2">
          <Input
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="h-8 w-64"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveDocumentName();
              } else if (e.key === "Escape") {
                setIsEditingName(false);
                setDocumentName(originalDocumentName);
              }
            }}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={saveDocumentName}
            className="h-8 w-8"
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-authentiya-charcoal-darkest dark:text-authentiya-accent-cream">
            {documentName}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleEditName}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
