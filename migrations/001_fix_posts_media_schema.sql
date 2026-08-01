-- Migration: Fix posts and media tables to match Drizzle schema
-- Date: 2026-08-02
-- Purpose: The existing tables were created by Payload CMS and don't match
--          the Drizzle schema. Since tables are empty, we drop and recreate.
--
-- NOTE: This migration was already executed successfully.
--       The neon HTTP driver requires tagged template literals for DDL,
--       so this was done via Node.js script (create-tables.cjs).

-- =============================================
-- 1. DROP OLD TABLES (Payload CMS schema)
-- =============================================
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS media CASCADE;

-- =============================================
-- 2. DROP ORPHANED ENUM TYPES
-- =============================================
DROP TYPE IF EXISTS enum_posts_status CASCADE;
DROP TYPE IF EXISTS enum_media_category CASCADE;
DROP TYPE IF EXISTS enum_posts_seo_robots CASCADE;

-- =============================================
-- 3. CREATE POSTS TABLE (matching Drizzle schema)
-- =============================================
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- 4. CREATE MEDIA TABLE (matching Drizzle schema)
-- =============================================
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  alt TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'general',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- RESULT:
--   posts: id, title, slug, excerpt, content, featured_image_url,
--          category_id, status, published_at, created_at, updated_at
--   media: id, alt, caption, category, image_url, created_at
--   site_settings: (unchanged, already matched)
-- =============================================
