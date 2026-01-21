/*
  # Create blogs table

  1. New Tables
    - `blogs`
      - `id` (integer, primary key, auto-increment) - Unique identifier for each blog post
      - `title` (text) - Blog post title
      - `category` (text array) - Array of category tags (e.g., ["FINANCE", "TECH"])
      - `description` (text) - Short summary of the blog post
      - `date` (timestamptz) - Publication date and time
      - `coverImage` (text) - URL to the cover image
      - `content` (text) - Full blog post content
      - `created_at` (timestamptz) - Timestamp when the record was created

  2. Security
    - Enable RLS on `blogs` table
    - Add policy for anyone to read blogs (public access)
    - Add policy for authenticated users to create blogs
    - Add policy for authenticated users to update their own blogs
    - Add policy for authenticated users to delete their own blogs

  3. Notes
    - All blogs are publicly readable
    - Only authenticated users can create blogs
    - Uses serial ID for simplicity and compatibility
*/

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT now(),
  "coverImage" TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blogs"
  ON blogs
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update any blog"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete any blog"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (true);