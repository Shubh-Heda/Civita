-- Minimal schema for Avento photo persistence

-- Enable pgcrypto extension (needed for gen_random_uuid)
create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text,
  display_name text,
  created_at timestamptz default now()
);

create table if not exists albums (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id) on delete set null,
  title text,
  description text,
  cover_photo text,
  total_photos int default 0,
  created_at timestamptz default now()
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references albums(id) on delete cascade,
  owner_id uuid references users(id) on delete set null,
  storage_path text,
  public_url text,
  caption text,
  uploaded_at timestamptz default now(),
  likes int default 0
);


