-- Create users table
create table if not exists public.users (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    phone_number text unique not null,
    notification_time time not null,
    timezone text not null,
    active boolean default true
);

-- Create responses table
create table if not exists public.responses (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references public.users(id) not null,
    emotion text not null
);

-- Set up RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.responses enable row level security;

-- Create policies
create policy "Enable read access for all users"
    on public.users for select
    using (true);

create policy "Enable insert for authenticated users only"
    on public.users for insert
    with check (true);

create policy "Enable read access for all users"
    on public.responses for select
    using (true);

create policy "Enable insert for authenticated users only"
    on public.responses for insert
    with check (true);

-- Create indexes
create index if not exists users_notification_time_idx on public.users(notification_time);
create index if not exists users_phone_number_idx on public.users(phone_number);
create index if not exists responses_user_id_idx on public.responses(user_id);
create index if not exists responses_created_at_idx on public.responses(created_at); 