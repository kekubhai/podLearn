/*
  # Initial Schema for Podcast Learning Platform

  1. New Tables
    - `profiles`
      - Stores user profile information and role
      - Links to Supabase auth.users
    - `content`
      - Stores podcast/video content information
      - Includes YouTube video details and metadata
    - `challenges`
      - Stores learning challenges linked to content
    - `user_progress`
      - Tracks user progress, tokens, and completed challenges
    - `comments`
      - Stores user comments on content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('viewer', 'podcaster')),
  tokens integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content table
CREATE TABLE content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('youtube', 'audio')),
  youtube_url text,
  youtube_thumbnail text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create challenges table
CREATE TABLE challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  token_reward integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  content_id uuid REFERENCES content(id) NOT NULL,
  challenge_id uuid REFERENCES challenges(id),
  completed boolean DEFAULT false,
  tokens_earned integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_id, challenge_id)
);

-- Create comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  message text NOT NULL,
  votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Content policies
CREATE POLICY "Content is viewable by everyone"
  ON content FOR SELECT
  USING (true);

CREATE POLICY "Podcasters can insert content"
  ON content FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'podcaster'
    )
  );

CREATE POLICY "Podcasters can update own content"
  ON content FOR UPDATE
  USING (creator_id = auth.uid());

-- Challenges policies
CREATE POLICY "Challenges are viewable by everyone"
  ON challenges FOR SELECT
  USING (true);

CREATE POLICY "Podcasters can create challenges for own content"
  ON challenges FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM content
      WHERE id = content_id
      AND creator_id = auth.uid()
    )
  );

-- User progress policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON user_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Comments policies
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    new.id,
    new.email,
    'viewer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();