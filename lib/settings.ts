import { supabaseAdmin } from './supabaseAdmin';
export async function getSetting(key:string, fallback:string){const {data}=await supabaseAdmin().from('settings').select('value').eq('key',key).single();return data?.value ?? fallback}
export async function setSetting(key:string,value:string){await supabaseAdmin().from('settings').upsert({key,value,updated_at:new Date().toISOString()},{onConflict:'key'})}
