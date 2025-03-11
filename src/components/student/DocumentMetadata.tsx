
/**
 * This file provides a component for managing document metadata like name, last saved time,
 * and other document properties in the student editor.
 * 
 * Updates:
 * - Added isAutoSaving prop to show autosaving status
 * - Improved display of document metadata with autosave indicator
 * - Only trigger rename when name actually changes from previous value
 */
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/common/Badge";
import { Clock, Save } from "lucide-react";

interface DocumentMetadataProps {
  documentName: string;
  onDocumentNameChange: (name: string) => void;
  lastSavedTime: Date | null;
  wordCount: number;
  isAutoSaving?: boolean;
}

export default function DocumentMetadata({
  documentName,
  onDocumentNameChange,
  lastSavedTime,
  wordCount,
  isAutoSaving = false
}: DocumentMetadataProps) {
  const [name, setName] = useState(documentName);
  const [isEditing, setIsEditing] = useState(false);
  const previousNameRef = useRef(documentName);
  
  useEffect(() => {
    setName(documentName);
    previousNameRef.current = documentName;
  }, [documentName]);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  const handleNameSubmit = () => {
    if (name.trim()) {
      // Only trigger rename if the name actually changed
      if (name !== previousNameRef.current) {
        onDocumentNameChange(name);
        previousNameRef.current = name;
      }
    } else {
      setName(previousNameRef.current);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setName(previousNameRef.current);
      setIsEditing(false);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-background border-b">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <Input
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-[200px] h-8 text-sm"
            placeholder="Document name"
          />
        ) : (
          <h3 
            className="font-medium hover:bg-muted/50 p-1 px-2 rounded cursor-pointer" 
            onClick={() => setIsEditing(true)}
            title="Click to edit document name"
          >
            {documentName || "Untitled Document"}
          </h3>
        )}
      </div>
      
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>{wordCount} words</span>
        </div>
        
        {lastSavedTime && (
          <div className="flex items-center gap-1">
            {isAutoSaving ? (
              <Badge variant="outline" className="text-xs h-6 gap-1">
                <Save className="h-3 w-3" />
                Autosaving
              </Badge>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                <span>Last saved {formatTime(lastSavedTime)}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
