import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const client = createClient(env.supabaseUrl, env.supabaseServiceKey, {
  auth: { persistSession: false }
});

export const supabaseAdmin = Object.assign(() => client, client);
