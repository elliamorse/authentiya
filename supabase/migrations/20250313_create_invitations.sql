
-- Create table for student invitations
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  class_id UUID NOT NULL REFERENCES public.classes(id),
  code TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS invitations_email_idx ON public.invitations(email);
CREATE INDEX IF NOT EXISTS invitations_class_id_idx ON public.invitations(class_id);
CREATE INDEX IF NOT EXISTS invitations_code_idx ON public.invitations(code);

-- Enable Row Level Security
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Teachers can read invitations they created
CREATE POLICY "Teachers can read invitations for their classes" 
  ON public.invitations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = invitations.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

-- Teachers can create invitations for their classes
CREATE POLICY "Teachers can create invitations for their classes" 
  ON public.invitations 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = invitations.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

-- Teachers can update invitations they created
CREATE POLICY "Teachers can update invitations for their classes" 
  ON public.invitations 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = invitations.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

-- Function to check if a student has been invited to a class
CREATE OR REPLACE FUNCTION public.check_student_invitation(student_email TEXT, invite_code TEXT)
RETURNS TABLE (
  invitation_id UUID,
  class_id UUID,
  class_name TEXT
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    i.id AS invitation_id,
    i.class_id,
    c.name AS class_name
  FROM 
    public.invitations i
    JOIN public.classes c ON i.class_id = c.id
  WHERE 
    i.email = student_email
    AND i.code = invite_code
    AND i.status = 'pending'
$$;
