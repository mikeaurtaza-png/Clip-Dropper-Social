import { getAccount } from './accounts';
import { supabaseAdmin } from './supabaseAdmin';

export async function fbGraph(path: string, token: string, init?: RequestInit) {
  const url = `https://graph.facebook.com/v20.0/${path}${path.includes('?') ? '&' : '?'}access_token=${encodeURIComponent(token)}`;
  const r = await fetch(url, init);
  const data = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function publishFacebook(clip: any) {
  // V1 safe implementation: marks the clip as ready for Facebook Reels upload wiring.
  // Real upload requires Meta Page video/Reels upload session using the Dropbox file URL/bytes.
  const account = await getAccount('facebook').catch(() => null);
  const url = clip.facebook_url || `https://facebook.com/reel/pending-${clip.id}`;
  await supabaseAdmin.from('post_results').insert({
    clip_id: clip.id,
    platform: 'facebook',
    status: 'pending_api_upload',
    url,
    raw_response: { page_id: account?.meta?.page_id || account?.page_id || null, note: 'Facebook OAuth is wired. Replace publishFacebook with Reels upload session.' }
  });
  return { id: `pending-${clip.id}`, url };
}
