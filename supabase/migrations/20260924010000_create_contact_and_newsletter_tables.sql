-- Contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- No auth: anyone can submit a contact message, but no one (other than the
-- service role, which bypasses RLS) can read, edit, or delete them via the
-- public API.
create policy "Anyone can submit a contact message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Newsletter signups
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Anyone can subscribe to the newsletter"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);
