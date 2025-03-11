
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
  assignmentId: string;
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
    ['citation']
  ],
};

const formats = [
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'header', 'list', 'script', 'indent', 'direction',
  'size', 'color', 'background', 'font', 'align',
  'clean', 'link', 'image', 'video', 'citation'
];

export default function TextEditor({ assignmentId, studentAssignmentId }: TextEditorProps) {
  const [content, setContent] = useState('');
  const [documentName, setDocumentName] = useState('Untitled Document');
  const [isCitationDialogOpen, setIsCitationDialogOpen] = useState(false);
  const [citationType, setCitationType] = useState('');
  const [citationSource, setCitationSource] = useState('');
  const [citationDetails, setCitationDetails] = useState('');
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [mode, setMode] = useState("edit");

  const queryClient = useQueryClient();
  const { user } = useUser();
  const quillRef = useRef<ReactQuill>(null);
  const debouncedContent = useDebounce(content, 500);

  // Fetch existing student assignment
  const { data: studentAssignment, isLoading: isAssignmentLoading } = useQuery({
    queryKey: ["studentAssignment", assignmentId, user?.id],
    queryFn: async () => {
      if (!assignmentId || !user?.id) return null;

      const { data, error } = await supabase
        .from("student_assignments")
        .select("*")
        .eq("assignment_id", assignmentId)
        .eq("student_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching student assignment:", error);
        return null;
      }

      return data;
    },
    enabled: !!assignmentId && !!user?.id,
  });

  // Fetch citations
  const { data: fetchedCitations } = useQuery({
    queryKey: ["citations", studentAssignment?.id],
    queryFn: async () => {
      if (!studentAssignment?.id) return [];

      const { data, error } = await supabase
        .from("citations")
        .select("*")
        .eq("student_assignment_id", studentAssignment.id);

      if (error) {
        console.error("Error fetching citations:", error);
        return [];
      }

      return data as Citation[];
    },
    enabled: !!studentAssignment?.id,
  });

  useEffect(() => {
    if (fetchedCitations) {
      setCitations(fetchedCitations);
    }
  }, [fetchedCitations]);

  // Initialize content and document name
  useEffect(() => {
    if (studentAssignment) {
      setContent(studentAssignment.content || '');
      setDocumentName(studentAssignment.document_name || 'Untitled Document');
    }
  }, [studentAssignment]);

  // Mutation to create a new student assignment
  const createStudentAssignmentMutation = useMutation({
    mutationFn: async () => {
      if (!assignmentId || !user?.id) return null;

      const { data, error } = await supabase
        .from("student_assignments")
        .insert([
          {
            assignment_id: assignmentId,
            student_id: user.id,
            content: debouncedContent,
            document_name: documentName,
            status: 'draft',
          },
        ])
        .select();

      if (error) {
        console.error("Error creating student assignment:", error);
        throw new Error("Failed to create student assignment");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentAssignment", assignmentId, user?.id] });
    },
  });

  // Mutation to update an existing student assignment
  const updateStudentAssignmentMutation = useMutation({
    mutationFn: async () => {
      if (!studentAssignment?.id) return null;

      const { data, error } = await supabase
        .from("student_assignments")
        .update({
          content: debouncedContent,
          document_name: documentName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", studentAssignment.id)
        .select();

      if (error) {
        console.error("Error updating student assignment:", error);
        throw new Error("Failed to update student assignment");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentAssignment", assignmentId, user?.id] });
    },
  });

  // Save content to database
  useEffect(() => {
    if (!debouncedContent) return;

    if (studentAssignment) {
      // Update existing assignment
      updateStudentAssignmentMutation.mutate();
    } else {
      // Create new assignment
      createStudentAssignmentMutation.mutate();
    }
  }, [debouncedContent, studentAssignment]);

  // Handle citation creation
  const handleCreateCitation = async () => {
    if (!citationType || !citationSource || !citationDetails || !studentAssignment?.id) {
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
            student_assignment_id: studentAssignment.id,
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
    if (!citationType || !citationSource || !citationDetails || !studentAssignment?.id) {
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
    setContent(value);
  };

  // Handle document name change
  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
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
          if (value) setMode(value);
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
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Label htmlFor="document-name" className="block text-sm font-medium text-gray-700">
          Document Name
        </Label>
        <Input
          type="text"
          id="document-name"
          className="mt-1 block w-full"
          placeholder="Untitled Document"
          value={documentName}
          onChange={handleDocumentNameChange}
        />
      </div>

      <EditorModeToggle />

      {mode === "edit" ? (
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder="Start writing here..."
          className="bg-white"
        />
      ) : (
        <div
          className="prose"
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
