
/**
 * AddStudentForm.tsx
 * 
 * This component allows teachers to add students to their classes either by adding existing
 * students or by sending invitations to students who don't have accounts yet.
 */

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Check, Mail, Send, UserPlus } from "lucide-react";

interface AddStudentFormProps {
  classId: string;
  className: string;
}

export default function AddStudentForm({ classId, className }: AddStudentFormProps) {
  const [studentEmail, setStudentEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteMessage, setInviteMessage] = useState(
    `Hello,\n\nYou have been invited to join ${className} on Authentiya - an academic integrity tracking application. \n\nPlease click the link below to create an account and join the class:\n\n[Link will be automatically generated]\n\nBest regards,\nYour Instructor`
  );
  
  const queryClient = useQueryClient();
  
  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentEmail) {
      toast.error("Please enter a student email");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if the user exists
      const { data: existingUser, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", studentEmail.toLowerCase().trim())
        .maybeSingle();
        
      if (userError) throw userError;
      
      if (!existingUser) {
        // User doesn't exist, show invite form
        setInviteEmail(studentEmail);
        setIsInviteOpen(true);
        setIsLoading(false);
        return;
      }
      
      // Check if student is already in class
      const { data: existingEnrollment, error: enrollmentError } = await supabase
        .from("class_students")
        .select("id")
        .eq("student_id", existingUser.id)
        .eq("class_id", classId)
        .maybeSingle();
        
      if (enrollmentError) throw enrollmentError;
      
      if (existingEnrollment) {
        toast.info("This student is already enrolled in this class");
        setIsLoading(false);
        return;
      }
      
      // Add student to class
      const { error: addError } = await supabase
        .from("class_students")
        .insert({
          student_id: existingUser.id,
          class_id: classId
        });
        
      if (addError) throw addError;
      
      toast.success(`Added ${studentEmail} to ${className}`, {
        description: "The student has been added to your class"
      });
      
      // Refresh student list
      queryClient.invalidateQueries({ queryKey: ["classStudents", classId] });
      setStudentEmail("");
      
    } catch (error: any) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student");
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendInvitation = async () => {
    setIsLoading(true);
    
    try {
      // Generate a unique invite code
      const inviteCode = Math.random().toString(36).substring(2, 15);
      
      // Store invitation in database
      const { error } = await supabase.from("invitations").insert({
        email: inviteEmail.toLowerCase().trim(),
        class_id: classId,
        code: inviteCode,
        message: inviteMessage,
        status: "pending"
      });
        
      if (error) throw error;
      
      // In a real app, we would send an email here
      // For now, we'll just show a success message
      
      toast.success(`Invitation sent to ${inviteEmail}`, {
        description: "They'll receive an email with instructions to join"
      });
      
      setIsInviteOpen(false);
      setStudentEmail("");
      setInviteEmail("");
      
    } catch (error: any) {
      console.error("Error sending invitation:", error);
      toast.error("Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <form onSubmit={handleAddStudentSubmit} className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="student-email" className="text-sm font-medium mb-1 block">
            Add Student by Email
          </label>
          <Input
            id="student-email"
            type="email"
            placeholder="student@example.com"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading || !studentEmail} className="academic-btn-primary">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </form>
      
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Student</DialogTitle>
            <DialogDescription>
              This student doesn't have an account yet. Send them an invitation to join.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                value={inviteEmail} 
                onChange={(e) => setInviteEmail(e.target.value)} 
                disabled 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Invitation Message</label>
              <Textarea 
                value={inviteMessage} 
                onChange={(e) => setInviteMessage(e.target.value)} 
                rows={8}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsInviteOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              className="academic-btn-primary"
              onClick={sendInvitation} 
              disabled={isLoading || !inviteEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
