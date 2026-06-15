export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  allowedEmail: process.env.NEXT_PUBLIC_ALLOWED_EMAIL || process.env.ALLOWED_EMAIL || 'mikeaurtaza@gmail.com',
  supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key',
  openaiKey: process.env.OPENAI_API_KEY || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || process.env.YOUTUBE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.YOUTUBE_CLIENT_SECRET || '',
  dropboxClientId: process.env.DROPBOX_CLIENT_ID || process.env.DROPBOX_APP_KEY || '',
  dropboxClientSecret: process.env.DROPBOX_CLIENT_SECRET || process.env.DROPBOX_APP_SECRET || '',
  facebookClientId: process.env.FACEBOOK_CLIENT_ID || process.env.FACEBOOK_APP_ID || '',
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || process.env.FACEBOOK_APP_SECRET || '',
  cronSecret: process.env.CRON_SECRET || 'change-me'
};
