import { env } from './env';

export function oauthUrl(base: string, params: Record<string, string | undefined>) {
  const u = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
  });
  return u.toString();
}

export function qs(params: Record<string, string | undefined>) {
  return new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null) as [string, string][]
  ).toString();
}

export function state() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const googleRedirect = `${env.appUrl}/api/auth/google/callback`;
export const youtubeRedirect = `${env.appUrl}/api/connections/youtube/callback`;
export const dropboxRedirect = `${env.appUrl}/api/connections/dropbox/callback`;
export const facebookRedirect = `${env.appUrl}/api/connections/facebook/callback`;
