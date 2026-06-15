import { NextResponse } from 'next/server';import { importDropboxFolder } from '@/lib/dropbox';
export async function GET(req:Request){const challenge=new URL(req.url).searchParams.get('challenge')||'';return new NextResponse(challenge,{headers:{'Content-Type':'text/plain'}})}
export async function POST(){importDropboxFolder().catch(()=>{});return NextResponse.json({ok:true})}
