import { NextResponse } from 'next/server';
export async function GET(){return NextResponse.json({ok:true,message:'Settings are currently saved in browser storage for deploy-safe V1. Add Supabase encrypted storage after deployment.'})}
export async function POST(){return NextResponse.json({ok:true,message:'Settings save endpoint ready for Supabase encrypted storage.'})}
