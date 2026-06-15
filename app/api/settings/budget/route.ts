import { NextResponse } from 'next/server';import { setSetting } from '@/lib/settings';
export async function POST(req:Request){const f=await req.formData();await setSetting('ai_monthly_budget',String(f.get('budget')||'10'));return NextResponse.redirect(new URL('/settings',req.url));}
