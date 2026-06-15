create table if not exists clips (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  dropbox_path text,
  video_url text,
  status text not null default 'draft',
  youtube_title text,
  youtube_description text,
  youtube_tags text,
  facebook_caption text,
  scheduled_at timestamptz,
  posted_at timestamptz,
  youtube_video_id text,
  youtube_url text,
  facebook_post_id text,
  facebook_url text,
  yt_views int default 0,
  yt_likes int default 0,
  yt_comments int default 0,
  fb_views int default 0,
  fb_reactions int default 0,
  fb_comments int default 0,
  fb_shares int default 0,
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists connections (
  provider text primary key,
  account_name text,
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  meta jsonb default '{}'::jsonb,
  connected_at timestamptz default now()
);
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);
create table if not exists ai_usage (
  id uuid primary key default gen_random_uuid(),
  clip_id uuid references clips(id) on delete set null,
  cost_cents int not null default 0,
  created_at timestamptz default now()
);
create table if not exists post_results (
  id uuid primary key default gen_random_uuid(),
  clip_id uuid references clips(id) on delete cascade,
  provider text not null,
  status text not null,
  url text,
  error text,
  created_at timestamptz default now()
);
create table if not exists analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  clip_id uuid references clips(id) on delete cascade,
  provider text not null,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);
