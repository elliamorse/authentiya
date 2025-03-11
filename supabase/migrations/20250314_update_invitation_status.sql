
-- Function to update invitation status (to work around type issues)
CREATE OR REPLACE FUNCTION public.update_invitation_status(
  invitation_identifier UUID,
  new_status TEXT
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.invitations
  SET status = new_status
  WHERE id = invitation_identifier;
END;
$$;
