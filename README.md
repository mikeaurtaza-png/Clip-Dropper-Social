# ClipDropper Social

A V1 Next.js app for your workflow:

Dropbox clip → AI title/description/caption → review/edit → schedule → YouTube Shorts + Facebook Reels → analytics dashboard.

## What is included

- Google login gate locked to `mikeaurtaza@gmail.com`
- Dashboard, Clip Queue, Calendar, Settings, Analytics pages
- Manual clip add flow
- AI copy generation with monthly budget hard stop
- YouTube default tags field
- Dropbox, YouTube, Facebook OAuth start/callback routes
- YouTube and Facebook upload API route scaffolding
- Vercel cron routes for publishing and analytics
- Supabase SQL schema
- Demo mode: if Supabase env vars are empty, local runtime memory is used so the app can still load during development

## Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Required Vercel environment variables

Copy `.env.example` into Vercel Project Settings → Environment Variables.

At minimum for local UI testing:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
ALLOWED_EMAIL=mikeaurtaza@gmail.com
AUTH_SECRET=make-this-long-and-random
CRON_SECRET=make-this-long-and-random
```

For real data persistence, create Supabase and run `supabase/schema.sql`, then add:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

For AI:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
AI_MONTHLY_BUDGET_CENTS=1000
AI_HARD_STOP=true
```

For YouTube OAuth/upload:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
YOUTUBE_DEFAULT_PRIVACY=private
```

For Dropbox:

```env
DROPBOX_APP_KEY=
DROPBOX_APP_SECRET=
DROPBOX_FOLDER=/Shorts Ready
```

For Facebook:

```env
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_PAGE_ID=
```

## OAuth callback URLs

Set these in each developer console after deploying:

- Google login: `https://YOURDOMAIN.com/api/auth/google/callback`
- YouTube: `https://YOURDOMAIN.com/api/auth/youtube/callback`
- Dropbox: `https://YOURDOMAIN.com/api/auth/dropbox/callback`
- Facebook: `https://YOURDOMAIN.com/api/auth/facebook/callback`

For local development use `http://localhost:3000/...` versions.

## Important note

This ZIP has been generated as a working V1 scaffold and build-tested. Real posting still depends on your developer app permissions and live tokens. YouTube manager/channel-permission behavior must be verified with the included YouTube connect/test flow.


## Build test result

Tested in this environment with:

```bash
npm install --no-audit --no-fund --progress=false
NEXT_TELEMETRY_DISABLED=1 npm run build
```

Result: build completed successfully. Next.js prints a harmless config warning for `outputFileTracing` in this environment, but the production build finished and generated all routes.
