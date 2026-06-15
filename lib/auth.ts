import { cookies } from 'next/headers';import { redirect } from 'next/navigation';import { env } from './env';
export async function getUser(){const raw=(await cookies()).get('cds_user')?.value;if(!raw)return null;try{return JSON.parse(Buffer.from(raw,'base64url').toString()) as {email:string,name?:string}}catch{return null}}
export async function requireUser(){const u=await getUser();if(!u||u.email!==env.allowedEmail)redirect('/login');return u}
export async function setUserCookie(user:{email:string,name?:string}){(await cookies()).set('cds_user',Buffer.from(JSON.stringify(user)).toString('base64url'),{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30})}
export async function clearUserCookie(){(await cookies()).delete('cds_user')}
