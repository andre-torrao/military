-- Run this in Supabase → SQL Editor

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text,
  email text,
  goal text,
  level text,
  age integer,
  days_per_week integer default 3,
  workouts_completed integer default 0,
  total_minutes integer default 0,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policy: users can only read/write their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
