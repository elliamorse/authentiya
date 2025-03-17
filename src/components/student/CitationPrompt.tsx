/**
 * CitationPrompt.tsx
 * 
 * This component renders a prompt for students to add citations to their document.
 * It includes a button to add a new citation.
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
 * - `documentId`: string - The ID of the document to which citations will be added.
 * 
 * Postconditions:
 * - Renders a prompt with a button to add citations.
 * 
 * Return Values:
 * - None directly, but renders a prompt element.
 */

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Globe, Bot, HelpCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the props interface for the CitationPrompt component
export interface CitationPromptProps {
  // Function to call when the citation form is submitted
  onSubmit: (citation: {
    type: "website" | "book" | "ai" | "other";
    source: string;
    details?: string;
  }) => void;
  // Function to call when the citation form is dismissed
  onDismiss: () => void;
  // Optional text that was copied for citation
  copiedText?: string;
}

// CitationPrompt component definition
export default function CitationPrompt({ onSubmit, onDismiss, copiedText = "" }: CitationPromptProps) {
  // State for the citation type
  const [citationType, setCitationType] = useState<"website" | "book" | "ai" | "other">("website");
  // State for the citation source
  const [source, setSource] = useState(copiedText || "");
  // State for additional citation details
  const [details, setDetails] = useState("");
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that a source is provided
    if (!source.trim()) {
      alert("Please enter a source");
      return;
    }
    
    // Call the onSubmit callback with the citation data
    onSubmit({
      type: citationType,
      source: source.trim(),
      details: details.trim() || undefined
    });
  };
  
  // Render the citation form
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Citation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Citation Type</Label>
            <RadioGroup 
              defaultValue={citationType} 
              onValueChange={(value) => setCitationType(value as any)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2 rounded-md border p-2">
                <RadioGroupItem value="website" id="website" />
                <Label htmlFor="website" className="flex items-center cursor-pointer">
                  <Globe className="h-3.5 w-3.5 mr-1.5" />
                  Website
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-2">
                <RadioGroupItem value="book" id="book" />
                <Label htmlFor="book" className="flex items-center cursor-pointer">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  Book
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-2">
                <RadioGroupItem value="ai" id="ai" />
                <Label htmlFor="ai" className="flex items-center cursor-pointer">
                  <Bot className="h-3.5 w-3.5 mr-1.5" />
                  AI Source
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="flex items-center cursor-pointer">
                  <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
                  Other
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="source">
              {citationType === "website" ? "URL / Website Name" : 
               citationType === "book" ? "Book Title / Author" :
               citationType === "ai" ? "AI Tool Name" : "Source Name"}
            </Label>
            <Input 
              id="source" 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder={
                citationType === "website" ? "https://example.com or Website name" : 
                citationType === "book" ? "Book title by Author" :
                citationType === "ai" ? "ChatGPT, Claude, etc." : "Source name or identifier"
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Additional Details (optional)</Label>
            <Textarea 
              id="details" 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter any additional reference information..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onDismiss}>Cancel</Button>
            <Button type="submit">Add Citation</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
