-- ClipDropper Social future production schema
create table if not exists app_settings (
  id text primary key default 'main',
  encrypted_payload text,
  updated_at timestamptz default now()
);
create table if not exists clips (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  dropbox_path text,
  status text default 'draft',
  youtube_title text,
  youtube_description text,
  facebook_caption text,
  tags text,
  scheduled_at timestamptz,
  youtube_url text,
  facebook_url text,
  yt_views bigint default 0,
  fb_views bigint default 0,
  created_at timestamptz default now()
);
create table if not exists post_results (
  id uuid primary key default gen_random_uuid(),
  clip_id uuid references clips(id) on delete cascade,
  platform text not null,
  status text not null,
  url text,
  error text,
  created_at timestamptz default now()
);
