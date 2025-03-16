
/**
 * CitationPrompt.tsx
 * 
 * This component provides a form for students to add citations to their documents.
 * It supports various citation types and source details.
 * 
 * Created by: Authentiya Development Team
 * Created on: 2023-11-15
 * 
 * Revision History:
 * - 2023-12-05: Added support for AI source citations by Authentiya Team
 * - 2024-06-22: Updated interface to include copiedText property by Authentiya Team
 * 
 * Preconditions:
 * - Must be used within a React component tree
 * 
 * Input Types:
 * - onSubmit: Function - Callback when citation is submitted
 * - onDismiss: Function - Callback when form is dismissed
 * - copiedText: string (optional) - Text that was copied for citation
 * 
 * Postconditions:
 * - When submitted, calls onSubmit with citation data
 * - When dismissed, calls onDismiss
 * 
 * Return:
 * - React.ReactNode - The rendered citation form
 * 
 * Error Conditions:
 * - Form validation errors when required fields are missing
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - Citation type will always be one of the predefined options
 * 
 * Known Faults:
 * - None
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
