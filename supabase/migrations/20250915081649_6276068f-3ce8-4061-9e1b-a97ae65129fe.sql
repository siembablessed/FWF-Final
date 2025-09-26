-- Insert default content for impact section
INSERT INTO public.content_sections (section_key, section_name, content) VALUES 
('impact_section', 'Impact Section', '{
  "mainTitle": "Our Impact",
  "mainDescription": "Founded in 2024, Future Wings began as an explorative initiative to understand what really holds students back from succeeding in school.",
  "studentsSupported": "718",
  "sanitaryPads": "5,500+",
  "winterJerseys": "40+", 
  "schoolsRenovated": "1",
  "ctaTitle": "Ready to Make a Difference?",
  "ctaDescription": "Want to partner with us and help restore dignity in education across Zimbabwe?"
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
content = EXCLUDED.content;