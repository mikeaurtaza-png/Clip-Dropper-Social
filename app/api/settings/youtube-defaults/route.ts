import { NextResponse } from "next/server"; import { requireUser } from "@/lib/auth"; import { upsertSetting } from "@/lib/supabaseRest";
export async function POST(req:Request){ await requireUser(); const f=await req.formData(); await upsertSetting('youtube_defaults',{tags:String(f.get('tags')||'').slice(0,500)}); return NextResponse.redirect(new URL('/settings',req.url)); }
