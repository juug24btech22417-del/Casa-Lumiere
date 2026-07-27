-- Newsletter signup support.
--
-- The leads table exists but its column set doesn't include
-- `email` (or `ai_summary`). The newsletter form on the website
-- writes to leads with `{ email }` and fails with "Could not find
-- the 'email' column of 'leads' in the schema cache" until this
-- column exists.
--
-- Run this once in the Supabase SQL editor (or `supabase db push`
-- if you have the CLI configured). It's idempotent — safe to re-run.
--
-- After running, also make sure anon (the role used by the website's
-- anon Supabase key) can INSERT into leads. If row-level security is
-- enabled on leads, add a permissive INSERT policy, e.g.:
--
--   create policy "anon can insert newsletter signups"
--     on public.leads
--     for insert
--     to anon
--     with check (true);

alter table public.leads
  add column if not exists email text;

-- Optional but recommended: a unique index on email so duplicate
-- signups don't pile up. Safe to re-run.
create unique index if not exists leads_email_unique_idx
  on public.leads (email)
  where email is not null;
