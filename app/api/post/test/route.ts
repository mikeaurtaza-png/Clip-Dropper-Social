import { NextResponse } from 'next/server';
export async function POST(req:Request){const body=await req.json().catch(()=>({}));return NextResponse.json({ok:true,message:'Test post route is working. Real YouTube/Facebook upload requires OAuth tokens.',received:body})}
