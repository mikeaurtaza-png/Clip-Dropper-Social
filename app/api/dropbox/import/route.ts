import { NextResponse } from 'next/server';import { importDropboxFolder } from '@/lib/dropbox';
export async function POST(req:Request){try{await importDropboxFolder();return NextResponse.redirect(new URL('/clips',req.url));}catch(e:any){return NextResponse.json({error:e.message},{status:400})}}
