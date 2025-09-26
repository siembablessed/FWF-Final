-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create content sections table
CREATE TABLE public.content_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  section_name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;

-- Insert default content sections
INSERT INTO public.content_sections (section_key, section_name, content) VALUES
('hero', 'Hero Section', '{
  "slides": [
    {
      "title": "EVERY CHILD DESERVES TO LEARN WITH DIGNITY.",
      "subtitle": "At Future Wings Foundation, we are reimagining education for students in under-resourced communities across Zimbabwe."
    },
    {
      "title": "WE DON''T JUST PROVIDE SUPPLIES, WE RESTORE CONFIDENCE.",
      "subtitle": "Through our dignity-first model, we equip children aged 6–18 with the tools, environments, and support systems they need to thrive."
    },
    {
      "title": "WE''RE NOT HERE TO TICK BOXES. WE''RE HERE TO BUILD FUTURES.",
      "subtitle": "Explore our work, meet our community, and join the movement."
    }
  ],
  "buttonText": "DONATE NOW"
}'),
('change_section', 'Change Section', '{
  "title": "Who We Are",
  "description": "Future Wings Foundation is a Zimbabwean non-profit organisation working at the intersection of education access, student dignity, and community empowerment.",
  "subdescription": "We work in peri-urban public schools to deliver low-cost, high-impact interventions that help students thrive not just survive in school. We believe that dignity, not just resources, is the barrier no one is addressing.",
  "buttonText": "MORE ABOUT US"
}'),
('team_section', 'Team Section', '{
  "title": "Meet Our Team",
  "description": "Our dedicated team is committed to restoring dignity and creating lasting change in education across Zimbabwe."
}');

-- Profiles policies
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ) OR NOT EXISTS (SELECT 1 FROM public.profiles)
);

-- Content sections policies
CREATE POLICY "Content sections are viewable by everyone" 
ON public.content_sections 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins and editors can modify content" 
ON public.content_sections 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_sections_updated_at
  BEFORE UPDATE ON public.content_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY definer SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, role)
  VALUES (
    NEW.id, 
    NEW.email,
    CASE 
      WHEN NOT EXISTS (SELECT 1 FROM public.profiles) THEN 'admin'
      ELSE 'viewer'
    END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for content_sections
ALTER TABLE public.content_sections REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.content_sections;