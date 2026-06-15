import { google } from 'googleapis';
import { env } from './env';
import { getAccount } from './accounts';
import { supabaseAdmin } from './supabaseAdmin';

export function youtubeClient(tokens: any) {
  const oauth2 = new google.auth.OAuth2(
    env.googleClientId,
    env.googleClientSecret,
    `${env.appUrl}/api/connections/youtube/callback`
  );
  oauth2.setCredentials(tokens);
  return google.youtube({ version: 'v3', auth: oauth2 });
}

export async function testYouTube(tokens: any) {
  const yt = youtubeClient(tokens);
  const r = await yt.channels.list({ part: ['snippet'], mine: true });
  return r.data.items?.map((c) => ({ id: c.id, title: c.snippet?.title })) || [];
}

export async function uploadYoutube(clip: any) {
  // V1 safe implementation: marks the clip as ready for YouTube upload wiring.
  // Real upload requires streaming the Dropbox file into youtube.videos.insert.
  const url = clip.youtube_url || `https://youtube.com/shorts/pending-${clip.id}`;
  await supabaseAdmin.from('post_results').insert({
    clip_id: clip.id,
    platform: 'youtube',
    status: 'pending_api_upload',
    url,
    raw_response: { note: 'YouTube OAuth is wired. Replace uploadYoutube with videos.insert streaming.' }
  });
  return { id: `pending-${clip.id}`, url };
}

export async function getYoutubeAccount() {
  return getAccount('youtube');
}
