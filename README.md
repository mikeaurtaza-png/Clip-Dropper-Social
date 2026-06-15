# ClipDropper Social

Private dashboard for Mike's 49ers short-form workflow: Dropbox clips -> AI copy -> schedule -> YouTube Shorts + Facebook Reels.

## What is included
- Google login lock to `mikeaurtaza@gmail.com`
- Dashboard, clips, calendar, analytics, settings
- Supabase schema
- OAuth connection routes for Dropbox, YouTube, Facebook
- OpenAI title/description/caption generation with monthly budget cap
- YouTube default tags field, 500 characters
- Scheduled publishing cron placeholder

## Important
The repo is wired for OAuth and posting architecture, but real YouTube/Facebook video upload needs final testing with your live developer apps and channel/page permissions. The cron publish route currently marks due clips as posted with a mock URL so you can test scheduling safely before live posting.

## Setup
1. Create Supabase project and run `supabase/schema.sql` in SQL editor.
2. Copy `.env.example` to `.env.local`.
3. Fill Supabase, OpenAI, Google, Dropbox, and Facebook credentials.
4. Run:

```bash
npm install
npm run dev
```

## OAuth callback URLs
Use these in each developer console:

```text
http://localhost:3000/api/auth/google/callback
http://localhost:3000/api/connections/youtube/callback
http://localhost:3000/api/connections/dropbox/callback
http://localhost:3000/api/connections/facebook/callback
```

For Vercel, replace localhost with your Vercel URL.

## Vercel Cron
Create a cron for:

```text
/api/cron/publish
```

Header:

```text
Authorization: Bearer YOUR_CRON_SECRET
```
