
/**
 * File: CitationPrompt.tsx
 * 
 * Description: This component provides a modal dialog for students to add citations
 * when they copy-paste content from external sources. It supports different citation
 * types and collects source information.
 * 
 * Programmer: AI Assistant
 * Created: February 2024
 * Revised: June 2024 - Added comprehensive documentation and comments
 * 
 * Preconditions:
 *   - Requires onSubmit callback to handle citation data
 *   - Requires onDismiss callback to handle closing the prompt
 * 
 * Postconditions:
 *   - Collects citation data and passes it to the onSubmit handler
 *   - Allows user to cancel citation entry
 * 
 * Side effects:
 *   - None
 * 
 * Known issues:
 *   - None currently identified
 */

import { useState } from "react"; // Import React and state hook
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input"; // Import Input component
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component
import { Label } from "@/components/ui/label"; // Import Label component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import Radio components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { BookOpen, Globe, Bot, Quote } from "lucide-react"; // Import icons

/**
 * Props interface for the CitationPrompt component
 */
interface CitationPromptProps {
  onSubmit: (citation: { // Function to call when citation is submitted
    type: "website" | "book" | "ai" | "other"; // Type of source
    source: string; // Name or URL of source
    details?: string; // Additional citation details
  }) => void;
  onDismiss: () => void; // Function to call when prompt is dismissed
}

/**
 * CitationPrompt Component
 * 
 * Displays a modal dialog for adding citations when content is pasted from external sources.
 * Collects information about the source type and details.
 * 
 * @param onSubmit - Callback function when citation is submitted
 * @param onDismiss - Callback function when dialog is dismissed
 */
export default function CitationPrompt({ onSubmit, onDismiss }: CitationPromptProps) {
  // State for form fields
  const [citationType, setCitationType] = useState<"website" | "book" | "ai" | "other">("website"); // Type of source
  const [sourceText, setSourceText] = useState(""); // Source name or URL
  const [details, setDetails] = useState(""); // Additional details about the source
  
  /**
   * Handles form submission
   * Collects form data and calls onSubmit callback
   * @param e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Don't submit if source is empty
    if (!sourceText.trim()) return;
    
    // Call onSubmit with citation data
    onSubmit({
      type: citationType,
      source: sourceText.trim(),
      details: details.trim() || undefined,
    });
  };
  
  /**
   * Gets label and placeholder text based on citation type
   * @returns Object with label and placeholder text
   */
  const getSourceFieldProps = () => {
    switch (citationType) {
      case "website":
        return {
          label: "Website URL or Name",
          placeholder: "https://example.com or Example Website",
        };
      case "book":
        return {
          label: "Book Title and Author",
          placeholder: "Book Title by Author Name",
        };
      case "ai":
        return {
          label: "AI Tool",
          placeholder: "ChatGPT, Claude, Bard, etc.",
        };
      case "other":
        return {
          label: "Source Name",
          placeholder: "Source description",
        };
    }
  };
  
  // Get source field props based on current citation type
  const sourceFieldProps = getSourceFieldProps();
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-authentiya-maroon" />
            Add Citation
          </CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Citation type selection */}
            <div className="space-y-2">
              <Label>Source Type</Label>
              <RadioGroup 
                value={citationType} 
                onValueChange={(value: "website" | "book" | "ai" | "other") => setCitationType(value)}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="website" id="website" />
                  <Label htmlFor="website" className="flex items-center gap-2 cursor-pointer">
                    <Globe className="h-4 w-4 text-blue-500" />
                    Website
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="book" id="book" />
                  <Label htmlFor="book" className="flex items-center gap-2 cursor-pointer">
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                    Book
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="ai" id="ai" />
                  <Label htmlFor="ai" className="flex items-center gap-2 cursor-pointer">
                    <Bot className="h-4 w-4 text-purple-500" />
                    AI Tool
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex items-center gap-2 cursor-pointer">
                    <Quote className="h-4 w-4 text-amber-500" />
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Source input field */}
            <div className="space-y-2">
              <Label htmlFor="source">{sourceFieldProps.label}</Label>
              <Input
                id="source"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder={sourceFieldProps.placeholder}
                required
              />
            </div>
            
            {/* Additional details field */}
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Page numbers, publication date, or other citation details"
                className="min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={onDismiss}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="academic-btn-primary"
              disabled={!sourceText.trim()}
            >
              Add Citation
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
