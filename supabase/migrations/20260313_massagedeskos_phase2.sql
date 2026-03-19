create extension if not exists pgcrypto;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.is_massagedeskos_owner()
returns boolean
language sql
stable
as $$
  select coalesce(
    lower(auth.jwt() ->> 'email') in (
      'jblaylock650@gmail.com',
      'juxtaposedtidesmedia@gmail.com'
    ),
    false
  );
$$;

create table if not exists public.massagedeskos_sales (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text unique,
  checkout_session_id text not null unique,
  payment_intent_id text,
  payment_link_id text,
  payment_link_url text,
  stripe_customer_id text,
  stripe_customer_email text not null,
  buyer_name text,
  business_name text default '',
  plan_id text not null check (plan_id in ('starter', 'professional', 'studio')),
  amount_total integer not null default 0,
  currency text not null default 'usd',
  payment_status text not null default 'paid',
  fulfillment_status text not null default 'payment_received' check (
    fulfillment_status in (
      'payment_received',
      'buyer_contacted',
      'portal_ready',
      'setup_scheduled',
      'fulfillment_in_progress',
      'delivered',
      'closed'
    )
  ),
  owner_assignee text not null default 'jblaylock650@gmail.com',
  notes text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  portal_access_sent boolean not null default false,
  intake_captured boolean not null default true,
  payment_confirmed boolean not null default true,
  purchased_at timestamptz not null default timezone('utc', now()),
  due_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.massagedeskos_sale_tasks (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.massagedeskos_sales(id) on delete cascade,
  task_key text not null,
  label text not null,
  owner_hint text not null default 'Owner',
  completed boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (sale_id, task_key)
);

create table if not exists public.massagedeskos_buyer_entitlements (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null unique references public.massagedeskos_sales(id) on delete cascade,
  buyer_email text not null,
  plan_id text not null check (plan_id in ('starter', 'professional', 'studio')),
  status text not null default 'active' check (status in ('active', 'revoked', 'pending')),
  portal_url text not null default '/buyers/massagedeskos',
  access_granted_at timestamptz not null default timezone('utc', now()),
  access_expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists trg_massagedeskos_sales_updated_at on public.massagedeskos_sales;
create trigger trg_massagedeskos_sales_updated_at
before update on public.massagedeskos_sales
for each row
execute function public.handle_updated_at();

drop trigger if exists trg_massagedeskos_sale_tasks_updated_at on public.massagedeskos_sale_tasks;
create trigger trg_massagedeskos_sale_tasks_updated_at
before update on public.massagedeskos_sale_tasks
for each row
execute function public.handle_updated_at();

drop trigger if exists trg_massagedeskos_buyer_entitlements_updated_at on public.massagedeskos_buyer_entitlements;
create trigger trg_massagedeskos_buyer_entitlements_updated_at
before update on public.massagedeskos_buyer_entitlements
for each row
execute function public.handle_updated_at();

alter table public.massagedeskos_sales enable row level security;
alter table public.massagedeskos_sale_tasks enable row level security;
alter table public.massagedeskos_buyer_entitlements enable row level security;

drop policy if exists "massagedeskos owners manage sales" on public.massagedeskos_sales;
create policy "massagedeskos owners manage sales"
on public.massagedeskos_sales
for all
using (public.is_massagedeskos_owner())
with check (public.is_massagedeskos_owner());

drop policy if exists "massagedeskos owners manage sale tasks" on public.massagedeskos_sale_tasks;
create policy "massagedeskos owners manage sale tasks"
on public.massagedeskos_sale_tasks
for all
using (public.is_massagedeskos_owner())
with check (public.is_massagedeskos_owner());

drop policy if exists "massagedeskos owners manage entitlements" on public.massagedeskos_buyer_entitlements;
create policy "massagedeskos owners manage entitlements"
on public.massagedeskos_buyer_entitlements
for all
using (public.is_massagedeskos_owner())
with check (public.is_massagedeskos_owner());

drop policy if exists "buyers can view their entitlements" on public.massagedeskos_buyer_entitlements;
create policy "buyers can view their entitlements"
on public.massagedeskos_buyer_entitlements
for select
using (lower(buyer_email) = lower(auth.jwt() ->> 'email'));
