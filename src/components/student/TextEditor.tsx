
import React, { useEffect, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  TextQuote,
  Link,
  Image,
  Code
} from "lucide-react";

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onPaste: (pastedText: string) => void;
  readOnly?: boolean;
}

export default function TextEditor({ 
  content, 
  onChange, 
  onPaste,
  readOnly = false 
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  
  // Initialize editor
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    
    // Set initial content
    if (content) {
      editor.innerHTML = content;
    }
    
    // Make it editable
    editor.contentEditable = readOnly ? "false" : "true";
    
    // Handle paste event
    const handlePaste = (e: ClipboardEvent) => {
      if (readOnly) return;
      
      // Get plain text from clipboard
      const pastedText = e.clipboardData?.getData('text/plain') || "";
      if (pastedText.trim()) {
        onPaste(pastedText);
      }
    };
    
    // Add event listener
    editor.addEventListener('paste', handlePaste);
    
    // Clean up
    return () => {
      editor.removeEventListener('paste', handlePaste);
    };
  }, [readOnly]);
  
  // Update content on input
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    
    const handleInput = () => {
      const newContent = editor.innerHTML;
      onChange(newContent);
      checkActiveFormats();
    };
    
    editor.addEventListener('input', handleInput);
    
    return () => {
      editor.removeEventListener('input', handleInput);
    };
  }, [onChange]);
  
  // Check active formats based on current selection
  const checkActiveFormats = () => {
    if (document.queryCommandState('bold')) {
      setActiveFormats(prev => prev.includes('bold') ? prev : [...prev, 'bold']);
    } else {
      setActiveFormats(prev => prev.filter(format => format !== 'bold'));
    }
    
    if (document.queryCommandState('italic')) {
      setActiveFormats(prev => prev.includes('italic') ? prev : [...prev, 'italic']);
    } else {
      setActiveFormats(prev => prev.filter(format => format !== 'italic'));
    }
    
    if (document.queryCommandState('underline')) {
      setActiveFormats(prev => prev.includes('underline') ? prev : [...prev, 'underline']);
    } else {
      setActiveFormats(prev => prev.filter(format => format !== 'underline'));
    }
  };
  
  // Apply format
  const applyFormat = (command: string, value: string = '') => {
    if (readOnly) return;
    
    document.execCommand(command, false, value);
    checkActiveFormats();
    
    // Update content
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  // Handle selection change to update active formats
  useEffect(() => {
    const handleSelectionChange = () => {
      checkActiveFormats();
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);
  
  // Insert link
  const insertLink = () => {
    if (readOnly) return;
    
    const url = prompt('Enter URL:');
    if (url) {
      applyFormat('createLink', url);
    }
  };
  
  // Insert image
  const insertImage = () => {
    if (readOnly) return;
    
    const url = prompt('Enter image URL:');
    if (url) {
      applyFormat('insertImage', url);
    }
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      {!readOnly && (
        <div className="bg-gray-50 dark:bg-gray-800 border-b p-2">
          <Tabs defaultValue="formatting" className="w-full">
            <TabsList className="w-full justify-start mb-2">
              <TabsTrigger value="formatting">Formatting</TabsTrigger>
              <TabsTrigger value="insert">Insert</TabsTrigger>
              <TabsTrigger value="view">View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="formatting" className="m-0">
              <div className="flex flex-wrap gap-1">
                <ToggleGroup type="multiple" value={activeFormats}>
                  <ToggleGroupItem 
                    value="bold" 
                    onClick={() => applyFormat('bold')}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="italic" 
                    onClick={() => applyFormat('italic')}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="underline" 
                    onClick={() => applyFormat('underline')}
                    title="Underline"
                  >
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
                
                <ToggleGroup type="single">
                  <ToggleGroupItem 
                    value="alignLeft" 
                    onClick={() => applyFormat('justifyLeft')}
                    title="Align Left"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="alignCenter" 
                    onClick={() => applyFormat('justifyCenter')}
                    title="Align Center"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="alignRight" 
                    onClick={() => applyFormat('justifyRight')}
                    title="Align Right"
                  >
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
                
                <ToggleGroup type="single">
                  <ToggleGroupItem 
                    value="bulletList" 
                    onClick={() => applyFormat('insertUnorderedList')}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="numberedList" 
                    onClick={() => applyFormat('insertOrderedList')}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
                
                <ToggleGroup type="single">
                  <ToggleGroupItem 
                    value="h1" 
                    onClick={() => applyFormat('formatBlock', '<h1>')}
                    title="Heading 1"
                  >
                    <Heading1 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="h2" 
                    onClick={() => applyFormat('formatBlock', '<h2>')}
                    title="Heading 2"
                  >
                    <Heading2 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="quote" 
                    onClick={() => applyFormat('formatBlock', '<blockquote>')}
                    title="Quote"
                  >
                    <TextQuote className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="code" 
                    onClick={() => applyFormat('formatBlock', '<pre>')}
                    title="Code Block"
                  >
                    <Code className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="insert" className="m-0">
              <div className="flex gap-1">
                <ToggleGroup type="single">
                  <ToggleGroupItem 
                    value="link" 
                    onClick={insertLink}
                    title="Insert Link"
                  >
                    <Link className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="image" 
                    onClick={insertImage}
                    title="Insert Image"
                  >
                    <Image className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="view" className="m-0">
              <div className="flex gap-1">
                <ToggleGroup type="single" value={[viewMode]}>
                  <ToggleGroupItem 
                    value="edit" 
                    onClick={() => setViewMode("edit")}
                  >
                    Edit
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="preview" 
                    onClick={() => setViewMode("preview")}
                  >
                    Preview
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <div
        ref={editorRef}
        className={`min-h-[300px] p-4 focus:outline-none overflow-auto ${
          viewMode === "preview" ? "prose dark:prose-invert max-w-none" : ""
        }`}
        style={{ 
          display: viewMode === "edit" || readOnly ? "block" : "none",
          maxHeight: "500px" 
        }}
      ></div>
      
      {viewMode === "preview" && !readOnly && (
        <div 
          className="min-h-[300px] p-4 prose dark:prose-invert max-w-none overflow-auto"
          style={{ maxHeight: "500px" }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
    </div>
  );
}
