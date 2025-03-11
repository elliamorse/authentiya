
/**
 * TextEditor.tsx
 * 
 * This component provides a rich text editor for students to write their assignments.
 * It includes features for formatting, citation management, and tracking writing metrics.
 */

import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/providers/UserProvider';
import { useDebounce } from '@/hooks/useDebounce';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Edit, Eye } from "lucide-react";

interface TextEditorProps {
  content: string;
  onChange: (newContent: string) => void;
  onPaste?: (pastedText: string) => void;
  readOnly?: boolean;
  assignmentId?: string;
  studentAssignmentId?: string | null;
}

// Custom citation type
interface Citation {
  id: string;
  type: string;
  source: string;
  details: string;
  student_assignment_id?: string;
}

// Quill toolbar configuration
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],                                         // remove formatting button
  ],
};

const formats = [
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'header', 'list', 'script', 'indent', 'direction',
  'size', 'color', 'background', 'font', 'align',
  'clean', 'link', 'image', 'video'
];

export default function TextEditor({ 
  content, 
  onChange, 
  onPaste, 
  readOnly = false,
  assignmentId, 
  studentAssignmentId 
}: TextEditorProps) {
  const [isCitationDialogOpen, setIsCitationDialogOpen] = useState(false);
  const [citationType, setCitationType] = useState('');
  const [citationSource, setCitationSource] = useState('');
  const [citationDetails, setCitationDetails] = useState('');
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  const queryClient = useQueryClient();
  const { user } = useUser();
  const quillRef = useRef<ReactQuill>(null);

  // Fetch citations if we have a student assignment ID
  const { data: fetchedCitations } = useQuery({
    queryKey: ["citations", studentAssignmentId],
    queryFn: async () => {
      if (!studentAssignmentId) return [];

      const { data, error } = await supabase
        .from("citations")
        .select("*")
        .eq("student_assignment_id", studentAssignmentId);

      if (error) {
        console.error("Error fetching citations:", error);
        return [];
      }

      return data as Citation[];
    },
    enabled: !!studentAssignmentId,
  });

  useEffect(() => {
    if (fetchedCitations) {
      setCitations(fetchedCitations);
    }
  }, [fetchedCitations]);

  // Handle citation creation
  const handleCreateCitation = async () => {
    if (!citationType || !citationSource || !citationDetails || !studentAssignmentId) {
      toast.error("Please fill in all citation details");
      return;
    }

    if (!selectedCitationId) {
      toast.error("No citation selected");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("citations")
        .insert([
          {
            type: citationType,
            source: citationSource,
            details: citationDetails,
            student_assignment_id: studentAssignmentId,
            id: selectedCitationId,
          },
        ])
        .select();

      if (error) {
        console.error("Error creating citation:", error);
        toast.error("Failed to create citation");
        return;
      }

      if (data) {
        setCitations([...citations, data[0] as Citation]);
      }
      setIsCitationDialogOpen(false);
      toast.success("Citation created successfully!");
    } catch (error) {
      console.error("Error creating citation:", error);
      toast.error("Failed to create citation");
    }
  };

  // Handle citation updates
  const handleUpdateCitation = async () => {
    if (!citationType || !citationSource || !citationDetails || !studentAssignmentId) {
      toast.error("Please fill in all citation details");
      return;
    }

    if (!selectedCitationId) {
      toast.error("No citation selected");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("citations")
        .update({
          type: citationType,
          source: citationSource,
          details: citationDetails,
        })
        .eq("id", selectedCitationId)
        .select();

      if (error) {
        console.error("Error updating citation:", error);
        toast.error("Failed to update citation");
        return;
      }

      if (data) {
        setCitations(citations.map(citation => {
          if (citation.id === selectedCitationId) {
            return data[0] as Citation;
          }
          return citation;
        }));
      }
      setIsCitationDialogOpen(false);
      toast.success("Citation updated successfully!");
    } catch (error) {
      console.error("Error updating citation:", error);
      toast.error("Failed to update citation");
    }
  };

  // Handle citation deletion
  const handleDeleteCitation = async () => {
    if (!selectedCitationId) {
      toast.error("No citation selected");
      return;
    }

    try {
      const { error } = await supabase
        .from("citations")
        .delete()
        .eq("id", selectedCitationId);

      if (error) {
        console.error("Error deleting citation:", error);
        toast.error("Failed to delete citation");
        return;
      }

      setCitations(citations.filter(citation => citation.id !== selectedCitationId));
      setIsCitationDialogOpen(false);
      toast.success("Citation deleted successfully!");
    } catch (error) {
      console.error("Error deleting citation:", error);
      toast.error("Failed to delete citation");
    }
  };

  // Handle editor change
  const handleChange = (value: string) => {
    onChange(value);
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    if (onPaste) {
      const text = e.clipboardData.getData('text/plain');
      onPaste(text);
    }
  };

  // Handle citation dialog open
  const handleCitationDialogOpen = (citationId: string) => {
    const citation = citations.find(c => c.id === citationId);
    if (citation) {
      setCitationType(citation.type);
      setCitationSource(citation.source);
      setCitationDetails(citation.details);
    } else {
      setCitationType('');
      setCitationSource('');
      setCitationDetails('');
    }
    setSelectedCitationId(citationId);
    setIsCitationDialogOpen(true);
  };

  // Proper toggle group implementation
  const EditorModeToggle = () => {
    return (
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => {
          if (value) setMode(value as "edit" | "preview");
        }}
        className="justify-end"
      >
        <ToggleGroupItem value="edit" aria-label="Edit mode">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </ToggleGroupItem>
        <ToggleGroupItem value="preview" aria-label="Preview mode">
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </ToggleGroupItem>
      </ToggleGroup>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <EditorModeToggle />
      </div>

      {mode === "edit" ? (
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          onPaste={handlePaste}
          modules={modules}
          formats={formats}
          placeholder="Start writing here..."
          className="bg-white"
          readOnly={readOnly}
        />
      ) : (
        <div
          className="prose bg-white p-4 rounded"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <Dialog open={isCitationDialogOpen} onOpenChange={setIsCitationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Citation Details</DialogTitle>
            <DialogDescription>
              Add or update the citation details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="citation-type" className="text-right">
                Type
              </Label>
              <Input
                id="citation-type"
                value={citationType}
                onChange={(e) => setCitationType(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="citation-source" className="text-right">
                Source
              </Label>
              <Input
                id="citation-source"
                value={citationSource}
                onChange={(e) => setCitationSource(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="citation-details" className="text-right">
                Details
              </Label>
              <Textarea
                id="citation-details"
                value={citationDetails}
                onChange={(e) => setCitationDetails(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleDeleteCitation}>
              Delete Citation
            </Button>
            <Button type="button" onClick={handleUpdateCitation}>
              Update Citation
            </Button>
            <Button type="submit" onClick={handleCreateCitation}>
              Create Citation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
