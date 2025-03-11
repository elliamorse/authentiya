
-- Function to create an invitation (to work around type issues)
CREATE OR REPLACE FUNCTION public.create_invitation(
  student_email TEXT,
  class_identifier UUID,
  invitation_code TEXT,
  invitation_message TEXT DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.invitations (
    email, 
    class_id, 
    code, 
    message, 
    status
  ) VALUES (
    student_email,
    class_identifier,
    invitation_code,
    invitation_message,
    'pending'
  );
END;
$$;
