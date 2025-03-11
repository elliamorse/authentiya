
/**
 * This file provides a toolbar component with formatting options for the student document editor.
 */
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
  Heading3,
  Undo,
  Redo,
  Link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";

interface DocumentToolbarProps {
  onFormat: (command: string, value?: string) => void;
  disabled?: boolean;
}

export default function DocumentToolbar({ 
  onFormat, 
  disabled = false 
}: DocumentToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-1 overflow-x-auto bg-muted/40 border-b">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('undo')}
        disabled={disabled}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('redo')}
        disabled={disabled}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <ToggleGroup type="multiple" className="justify-start">
        <ToggleGroupItem 
          value="bold" 
          size="sm" 
          onClick={() => onFormat('bold')}
          disabled={disabled}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="italic" 
          size="sm" 
          onClick={() => onFormat('italic')}
          disabled={disabled}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="underline" 
          size="sm" 
          onClick={() => onFormat('underline')}
          disabled={disabled}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <ToggleGroup type="single" className="justify-start">
        <ToggleGroupItem 
          value="left" 
          size="sm" 
          onClick={() => onFormat('justifyLeft')}
          disabled={disabled}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="center" 
          size="sm" 
          onClick={() => onFormat('justifyCenter')}
          disabled={disabled}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="right" 
          size="sm" 
          onClick={() => onFormat('justifyRight')}
          disabled={disabled}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('insertUnorderedList')}
        disabled={disabled}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('insertOrderedList')}
        disabled={disabled}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('formatBlock', '<h1>')}
        disabled={disabled}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('formatBlock', '<h2>')}
        disabled={disabled}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => onFormat('formatBlock', '<h3>')}
        disabled={disabled}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={() => {
          const url = prompt('Enter URL:');
          if (url) onFormat('createLink', url);
        }}
        disabled={disabled}
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
}
