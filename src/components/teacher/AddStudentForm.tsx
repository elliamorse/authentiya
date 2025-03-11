
/**
 * AddStudentForm.tsx
 * 
 * This component allows teachers to add students to their classes either by adding existing
 * students or by generating signup links.
 */

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ClipboardCopy, Link, Mail, UserPlus } from "lucide-react";
import StudentSearch from "./StudentSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddStudentFormProps {
  classId: string;
  className: string;
}

export default function AddStudentForm({ classId, className }: AddStudentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const queryClient = useQueryClient();
  
  const generateInviteLink = async () => {
    try {
      const inviteCode = Math.random().toString(36).substring(2, 15);
      const { error } = await supabase.rpc(
        'create_invitation',
        { 
          student_email: '',
          class_identifier: classId,
          invitation_code: inviteCode,
          invitation_message: null
        }
      );
      
      if (error) throw error;
      
      const link = `${window.location.origin}/auth?invite=${inviteCode}`;
      setGeneratedLink(link);
      toast.success("Invitation link generated successfully");
      
    } catch (error) {
      console.error('Error generating invitation link:', error);
      toast.error("Failed to generate invitation link");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error("Failed to copy link");
    }
  };

  const handleStudentAdded = () => {
    queryClient.invalidateQueries({ queryKey: ["classStudents", classId] });
    queryClient.invalidateQueries({ queryKey: ["available-students", classId] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="academic-btn-primary">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Students to {className}</DialogTitle>
          <DialogDescription>
            Add existing students or generate a signup link
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Existing Students</TabsTrigger>
            <TabsTrigger value="link">Generate Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="existing" className="mt-4">
            <StudentSearch classId={classId} onStudentAdded={handleStudentAdded} />
          </TabsContent>
          
          <TabsContent value="link" className="mt-4">
            <div className="space-y-4">
              <Button
                onClick={generateInviteLink}
                className="w-full academic-btn-primary"
              >
                <Link className="h-4 w-4 mr-2" />
                Generate Signup Link
              </Button>
              
              {generatedLink && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Share this link with students:</p>
                  <div className="flex gap-2">
                    <Input value={generatedLink} readOnly />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                    >
                      <ClipboardCopy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
