import { NextResponse } from "next/server"; import { isAllowed, setSession } from "@/lib/auth";
export async function POST(req:Request){ const f=await req.formData(); const email=String(f.get('email')||''); if(!isAllowed(email)) return NextResponse.redirect(new URL('/login?denied=1',req.url)); await setSession(email); return NextResponse.redirect(new URL('/',req.url)); }
