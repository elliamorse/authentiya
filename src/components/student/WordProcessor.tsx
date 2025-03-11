
/**
 * WordProcessor.tsx
 * 
 * This component provides a rich text editor similar to Google Docs or Microsoft Word.
 * It includes text formatting options like bold, italic, underline, and text alignment.
 * The editor maintains state of the document content and handles formatting commands.
 */

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Undo,
  Redo
} from "lucide-react";

interface WordProcessorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function WordProcessor({
  content,
  onChange,
  placeholder = "Start typing your document here..."
}: WordProcessorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    underline: false
  });
  
  // Handle text formatting commands
  const handleFormat = (format: keyof typeof fontStyle) => {
    setFontStyle(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
    
    // Focus back on the textarea after clicking a format button
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Handle text alignment
  const handleAlign = (alignment: typeof textAlign) => {
    setTextAlign(alignment);
    
    // Focus back on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Handle content changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 border-b p-2 flex flex-wrap items-center gap-1">
        {/* Text formatting controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${fontStyle.bold ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={() => handleFormat("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${fontStyle.italic ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={() => handleFormat("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${fontStyle.underline ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={() => handleFormat("underline")}
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        {/* Text alignment controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${textAlign === "left" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={() => handleAlign("left")}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${textAlign === "center" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={() => handleAlign("center")}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${textAlign === "right" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
            onClick={() => handleAlign("right")}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        {/* List controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        {/* Heading controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block" />
        
        {/* Undo/Redo controls */}
        <div className="flex items-center gap-1 hidden sm:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Textarea
        ref={textareaRef}
        className="w-full min-h-[350px] p-4 border-0 rounded-none focus:outline-none focus:ring-0 resize-y text-authentiya-charcoal-darkest bg-white dark:bg-white"
        placeholder={placeholder}
        value={content}
        onChange={handleChange}
        style={{
          fontFamily: 'serif',
          fontSize: '16px',
          lineHeight: '1.6',
          textAlign: textAlign,
          fontWeight: fontStyle.bold ? 'bold' : 'normal',
          fontStyle: fontStyle.italic ? 'italic' : 'normal',
          textDecoration: fontStyle.underline ? 'underline' : 'none'
        }}
      />
    </div>
  );
}
