import { NextResponse } from 'next/server';import { env } from '@/lib/env';import { oauthUrl,dropboxRedirect } from '@/lib/oauth';
export async function GET(){return NextResponse.redirect(oauthUrl('https://www.dropbox.com/oauth2/authorize',{client_id:env.dropboxClientId,redirect_uri:dropboxRedirect,response_type:'code',token_access_type:'offline'}))}
