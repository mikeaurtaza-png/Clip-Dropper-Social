import { cookies } from "next/headers";
import crypto from "crypto";
import { ALLOWED_EMAIL, env } from "./env";
const COOKIE = "cds_session";
function sign(email: string) { const secret = env("AUTH_SECRET", "dev-secret"); const h = crypto.createHmac("sha256", secret).update(email).digest("hex"); return `${email}:${h}`; }
function verify(value?: string) { if (!value) return null; const [email, sig] = value.split(":"); if (!email || !sig) return null; return sign(email) === value ? email : null; }
export async function getUserEmail() { const c = await cookies(); const email = verify(c.get(COOKIE)?.value); return email?.toLowerCase() || null; }
export async function requireUser() { const email = await getUserEmail(); if (email !== ALLOWED_EMAIL) throw new Error("Unauthorized"); return email; }
export async function setSession(email: string) { const c = await cookies(); c.set(COOKIE, sign(email.toLowerCase()), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60*60*24*30 }); }
export async function clearSession() { const c = await cookies(); c.delete(COOKIE); }
export function isAllowed(email: string) { return email.toLowerCase() === ALLOWED_EMAIL; }
