import { NextResponse } from 'next/server';import { env } from '@/lib/env';import { oauthUrl,googleRedirect } from '@/lib/oauth';
export async function GET(){return NextResponse.redirect(oauthUrl('https://accounts.google.com/o/oauth2/v2/auth',{client_id:env.googleClientId,redirect_uri:googleRedirect,response_type:'code',scope:'openid email profile',access_type:'offline',prompt:'consent'}))}
