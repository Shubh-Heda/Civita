-- Website feedback table for landing page feedback
create table if not exists website_feedback (
  id uuid primary key default gen_random_uuid(),
  rating int not null check (rating between 1 and 5),
  feedback_text text not null,
  feature text,
  source text default 'landing',
  created_at timestamptz not null default now()
);

alter table website_feedback enable row level security;

create policy "Website feedback inserts" on website_feedback
  for insert
  with check (true);
