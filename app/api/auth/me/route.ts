import { NextResponse } from "next/server"; import { getUserEmail } from "@/lib/auth";
export async function GET(){ return NextResponse.json({email:await getUserEmail()}); }
