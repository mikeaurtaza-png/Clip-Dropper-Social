import { NextRequest,NextResponse } from 'next/server';import { env } from '@/lib/env';import { publishDueClips } from '@/lib/posting';
export async function GET(req:NextRequest){if(req.headers.get('authorization')!==`Bearer ${env.cronSecret}`)return NextResponse.json({error:'unauthorized'},{status:401});return NextResponse.json({results:await publishDueClips()})}
