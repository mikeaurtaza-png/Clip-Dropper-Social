import { supabaseAdmin } from './supabaseAdmin';
import { getAccount } from './accounts';

export async function dbx(path: string, token: string, init?: RequestInit) {
  const r = await fetch(`https://api.dropboxapi.com/2/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function importDropboxFolder(folder = '/Shorts Ready') {
  const account = await getAccount('dropbox');
  const token = account.access_token || account.tokens?.access_token;
  const data = await dbx('files/list_folder', token, {
    method: 'POST',
    body: JSON.stringify({ path: folder, recursive: false, include_media_info: true })
  });

  const entries = (data.entries || []).filter((e: any) => e['.tag'] === 'file');
  for (const e of entries) {
    const filename = e.name;
    const dropbox_path = e.path_display || e.path_lower;
    await supabaseAdmin.from('clips').upsert(
      { filename, dropbox_path, status: 'draft', updated_at: new Date().toISOString() },
      { onConflict: 'dropbox_path' }
    );
  }
  return { imported: entries.length };
}
