create extension if not exists "uuid-ossp";
create table if not exists clips(
  id uuid primary key default uuid_generate_v4(),
  filename text not null,
  dropbox_path text,
  status text not null default 'draft' check(status in ('draft','scheduled','posted','failed')),
  notes text,
  title_options jsonb default '[]'::jsonb,
  youtube_title text,
  youtube_description text,
  youtube_tags text,
  facebook_caption text,
  hashtags text,
  scheduled_at timestamptz,
  posted_at timestamptz,
  youtube_url text,
  facebook_url text,
  youtube_views bigint default 0,
  facebook_views bigint default 0,
  youtube_likes bigint default 0,
  facebook_reactions bigint default 0,
  comments bigint default 0,
  shares bigint default 0,
  ai_estimated_cost_usd numeric default 0,
  error_message text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists connections(
  provider text primary key,
  status text default 'not_connected',
  tokens jsonb,
  folder_path text,
  account_name text,
  page_id text,
  channel_id text,
  updated_at timestamptz default now()
);
create table if not exists ai_budget(
  id text primary key default 'default',
  monthly_budget_usd numeric default 10,
  warning_budget_usd numeric default 8,
  hard_stop boolean default true,
  updated_at timestamptz default now()
);
insert into ai_budget(id, monthly_budget_usd, warning_budget_usd, hard_stop) values('default',10,8,true) on conflict(id) do nothing;
create table if not exists ai_usage(
  id uuid primary key default uuid_generate_v4(),
  clip_id uuid references clips(id) on delete cascade,
  month text not null,
  estimated_cost_usd numeric default 0,
  prompt_tokens int default 0,
  completion_tokens int default 0,
  created_at timestamptz default now()
);
create table if not exists youtube_defaults(
  id text primary key default 'default',
  default_tags text,
  description_footer text,
  visibility text default 'private'
);
insert into youtube_defaults(id, default_tags, description_footer, visibility) values('default','','#49ers #NFL #FTTB','private') on conflict(id) do nothing;
create table if not exists facebook_defaults(
  id text primary key default 'default',
  caption_footer text,
  default_hashtags text
);
insert into facebook_defaults(id, caption_footer, default_hashtags) values('default','','#49ers #NFL #FTTB') on conflict(id) do nothing;
create table if not exists post_results(
  id uuid primary key default uuid_generate_v4(),
  clip_id uuid references clips(id) on delete cascade,
  platform text not null,
  status text not null,
  url text,
  raw_response jsonb,
  error_message text,
  created_at timestamptz default now()
);
create table if not exists analytics_snapshots(
  id uuid primary key default uuid_generate_v4(),
  clip_id uuid references clips(id) on delete cascade,
  platform text not null,
  views bigint default 0,
  likes bigint default 0,
  comments bigint default 0,
  shares bigint default 0,
  raw jsonb,
  created_at timestamptz default now()
);
