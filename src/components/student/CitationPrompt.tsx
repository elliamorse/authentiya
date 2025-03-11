
/**
 * CitationPrompt.tsx
 * 
 * This component displays a popup dialog for users to cite their sources.
 * It supports website, book, AI, and other citation types, and allows users
 * to either add a citation or defer it for later.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, BookOpen, MessageSquare, Link2, FileQuestion } from "lucide-react";

interface CitationPromptProps {
  copiedText?: string;
  onSubmit: (citation: {
    type: "website" | "book" | "ai" | "other";
    source: string;
    details?: string;
  }) => void;
  onDismiss: () => void;
}

export default function CitationPrompt({ copiedText = "", onSubmit, onDismiss }: CitationPromptProps) {
  const [activeTab, setActiveTab] = useState<"website" | "book" | "ai" | "other">("website");
  const [website, setWebsite] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [aiModel, setAiModel] = useState("ChatGPT");
  const [aiPrompt, setAiPrompt] = useState("");
  const [otherSource, setOtherSource] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  
  const handleSubmit = () => {
    if (activeTab === "website" && website) {
      onSubmit({ type: "website", source: website });
    } else if (activeTab === "book" && bookTitle) {
      onSubmit({ 
        type: "book", 
        source: bookTitle, 
        details: bookAuthor ? `by ${bookAuthor}` : undefined 
      });
    } else if (activeTab === "ai" && aiModel) {
      onSubmit({ 
        type: "ai", 
        source: aiModel, 
        details: aiPrompt ? `Prompt: ${aiPrompt}` : undefined 
      });
    } else if (activeTab === "other" && otherSource) {
      onSubmit({
        type: "other",
        source: otherSource,
        details: otherDetails || undefined
      });
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-lg animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Cite Your Source</CardTitle>
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {copiedText && (
            <div className="p-3 bg-muted rounded-md text-sm">
              <p className="font-medium mb-1">Copied text:</p>
              <p className="text-muted-foreground line-clamp-3">
                {copiedText}
              </p>
            </div>
          )}
          
          <Tabs 
            value={activeTab} 
            onValueChange={(v) => setActiveTab(v as "website" | "book" | "ai" | "other")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="website" className="flex items-center gap-1">
                <Link2 className="h-4 w-4" />
                Website
              </TabsTrigger>
              <TabsTrigger value="book" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Book
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                AI
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-1">
                <FileQuestion className="h-4 w-4" />
                Other
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="website" className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="website-url">Website URL</Label>
                <Input
                  id="website-url"
                  type="url"
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="book" className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="book-title">Book Title</Label>
                <Input
                  id="book-title"
                  placeholder="Enter book title"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="book-author">Author (optional)</Label>
                <Input
                  id="book-author"
                  placeholder="Enter author name"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Input
                  id="ai-model"
                  placeholder="ChatGPT, Claude, etc."
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Prompt Used (optional)</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="Enter the prompt you used"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="other-source">Source Type</Label>
                <Input
                  id="other-source"
                  placeholder="Interview, Lecture, Video, etc."
                  value={otherSource}
                  onChange={(e) => setOtherSource(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-details">Details (optional)</Label>
                <Textarea
                  id="other-details"
                  placeholder="Enter any additional details about this source"
                  value={otherDetails}
                  onChange={(e) => setOtherDetails(e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onDismiss}>
            Cite Later
          </Button>
          <Button onClick={handleSubmit}>
            Add Citation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
