
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState<{
    invitation_id: string;
    class_id: string;
    class_name: string;
  } | null>(null);

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
      const { data, error } = await supabase.rpc<{
        invitation_id: string;
        class_id: string;
        class_name: string;
      }>('check_student_invitation', {
        student_email: studentEmail,
        invite_code: code
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setInvitation(data[0]);
        toast.info(`You've been invited to join ${data[0].class_name}`);
      }
    } catch (error) {
      console.error('Error checking invitation:', error);
      toast.error('Invalid invitation code');
    }
  };

  const processInvitation = async (userId: string, studentEmail: string, code: string) => {
    try {
      // Check if invitation is valid
      const { data, error } = await supabase.rpc<{
        invitation_id: string;
        class_id: string;
        class_name: string;
      }>('check_student_invitation', {
        student_email: studentEmail,
        invite_code: code
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const invitationData = data[0];
        
        // Add student to class
        const { error: enrollError } = await supabase
          .from('class_students')
          .insert({
            student_id: userId,
            class_id: invitationData.class_id
          });
          
        if (enrollError) throw enrollError;
        
        // Update invitation status to 'accepted'
        const { error: updateError } = await supabase.rpc('update_invitation_status', {
          invitation_identifier: invitationData.invitation_id,
          new_status: 'accepted'
        });
        
        if (updateError) throw updateError;
        
        toast.success(`You've been added to ${invitationData.class_name}`);
      }
    } catch (error) {
      console.error('Error processing invitation:', error);
      toast.error('Failed to process invitation');
    }
  };

  const handleSignUpSuccess = async (userId: string, email: string) => {
    // If there was an invitation, process it
    if (inviteCode && email && invitation) {
      await processInvitation(userId, email, inviteCode);
    }
    
    // Redirect to dashboard
    navigate('/dashboard');
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
          redirectTo="/dashboard" 
          defaultEmail={email || ''} 
          onSignUpSuccess={handleSignUpSuccess}
          invitation={invitation}
        />
      </div>
    </div>
  );
};

export default Auth;
