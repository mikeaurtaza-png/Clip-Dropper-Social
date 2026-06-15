# ClipDropper Social

Deploy-safe V1 for GitHub + Vercel.

## What works now

- Next.js dashboard
- Clip queue
- Calendar
- Settings page
- AI budget UI
- YouTube/Facebook/Dropbox credential UI
- Demo AI text generation
- No cron jobs
- Minimal dependencies to avoid Vercel npm install failure

## What this version intentionally does not do yet

- It does not perform real YouTube uploads yet.
- It does not perform real Facebook Reels uploads yet.
- It does not perform Dropbox OAuth yet.
- It does not store secrets server-side yet.

This package is designed to deploy cleanly first. After deploy, add real Supabase encrypted settings storage and OAuth upload routes.

## Vercel settings

- Framework: Next.js
- Node: 20.x
- Install command: npm install --no-audit --no-fund
- Build command: npm run build

No `vercel.json` is included because free Hobby cron jobs were blocking deployment.
