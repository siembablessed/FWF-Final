-- Example for seeding a new Admin profile if one doesn't exist
INSERT INTO public.profiles (user_id, email, role)
VALUES (
  'auth.uid()', -- Replace with a known admin user_id or a placeholder
  'admin@example.com', 
  'admin'
) ON CONFLICT (email) DO NOTHING;