
/**
 * Auth.tsx
 * 
 * This file contains the authentication page component that handles user login,
 * registration, and processing invitation links for classes.
 * 
 * Updates:
 * - Fixed TypeScript errors by properly typing Supabase RPC function calls
 * - Added proper type narrowing for RPC responses
 * - Improved type safety when accessing properties from RPC responses
 * - Added type assertions to handle returned data correctly
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

// Define an interface for invitation data 
interface InvitationData {
  invitation_id: string;
  class_id: string;
  class_name: string;
}

interface AuthFormData {
  email: string;
  role: "student" | "teacher";
}

// Define the structure of our RPC response
interface InvitationResponseItem {
  invitation_id: string;
  class_id: string;
  class_name: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const inviteCode = searchParams.get('invite');
  const email = searchParams.get('email');

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is already logged in
        // If there's an invite code and email, process the invitation
        if (inviteCode && email) {
          // Accept the invitation
          await processInvitation(session.user.id, email, inviteCode);
        }
        
        // Redirect to dashboard
        const { data } = await supabase.rpc('get_current_user_role');
        if (data === 'teacher') {
          navigate('/teacher/classes');
        } else {
          navigate('/dashboard');
        }
      } else {
        // If there's an invite code and email, check the invitation
        if (inviteCode && email) {
          await checkInvitation(email, inviteCode);
        }
        
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, inviteCode, email]);

  const checkInvitation = async (studentEmail: string, code: string) => {
    try {
      // Check if invitation is valid
      const { data, error } = await supabase.rpc(
        'check_student_invitation',
        { student_email: studentEmail, invite_code: code }
      );
      
      if (error) throw error;
      
      // Type assertion for the returned data
      const invitationData = data as InvitationResponseItem[];
      
      if (invitationData && invitationData.length > 0) {
        // Get the first item from the array
        const firstInvitation = invitationData[0];
        setInvitation({
          invitation_id: firstInvitation.invitation_id,
          class_id: firstInvitation.class_id,
          class_name: firstInvitation.class_name
        });
        toast.info(`You've been invited to join ${firstInvitation.class_name}`);
      }
    } catch (error) {
      console.error('Error checking invitation:', error);
      toast.error('Invalid invitation code');
    }
  };

  const processInvitation = async (userId: string, studentEmail: string, code: string) => {
    try {
      // Check if invitation is valid
      const { data, error } = await supabase.rpc(
        'check_student_invitation',
        { student_email: studentEmail, invite_code: code }
      );
      
      if (error) throw error;
      
      // Type assertion for the returned data
      const invitationData = data as InvitationResponseItem[];
      
      if (invitationData && invitationData.length > 0) {
        // Get the first item from the array
        const firstInvitation = invitationData[0];
        
        // Add student to class
        const { error: enrollError } = await supabase
          .from('class_students')
          .insert({
            student_id: userId,
            class_id: firstInvitation.class_id
          });
          
        if (enrollError) throw enrollError;
        
        // Update invitation status to 'accepted'
        const { error: updateError } = await supabase.rpc(
          'update_invitation_status',
          { 
            invitation_identifier: firstInvitation.invitation_id,
            new_status: 'accepted'
          }
        );
        
        if (updateError) throw updateError;
        
        toast.success(`You've been added to ${firstInvitation.class_name}`);
      }
    } catch (error) {
      console.error('Error processing invitation:', error);
      toast.error('Failed to process invitation');
    }
  };

  const handleAuthComplete = async (formData: AuthFormData) => {
    try {
      // If there was an invitation, process it
      if (inviteCode && formData.email && invitation) {
        // This would be handled by the AuthForm component now
        await processInvitation("user-id-will-be-provided-later", formData.email, inviteCode);
      }
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during auth completion:', error);
      toast.error('Authentication failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 auth-container">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <AuthForm 
          onComplete={handleAuthComplete}
        />
      </div>
    </div>
  );
};

export default Auth;
