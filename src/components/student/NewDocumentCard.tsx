/**
 * NewDocumentCard.tsx
 * 
 * This component renders a card for creating a new document,
 * including a button to start a new document.
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
 * - `onCreate`: function - The function to handle the creation of a new document.
 * 
 * Postconditions:
 * - Renders a card with a button to create a new document.
 * 
 * Return Values:
 * - None directly, but renders a card element.
 */
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface NewDocumentCardProps {
  onCreateDocument: () => void;
}

export default function NewDocumentCard({ onCreateDocument }: NewDocumentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border-dashed border-2">
      <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
        <div className="h-12 w-12 rounded-full bg-authentiya-charcoal/10 flex items-center justify-center mb-3">
          <FileText className="h-6 w-6 text-authentiya-charcoal" />
        </div>
        <h4 className="font-medium text-lg font-playfair mb-2">Create New Document</h4>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Start a new document without linking to an assignment
        </p>
        <Button 
          variant="default" 
          size="sm" 
          className="academic-btn-primary"
          onClick={onCreateDocument}
        >
          Create Document
        </Button>
      </CardContent>
    </Card>
  );
}
