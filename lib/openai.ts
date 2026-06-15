import { env } from "./env";
export async function generateCopy(input:{filename:string; existing?:string}){
  const fallback = { youtube_title: input.filename.replace(/[-_]/g," ").replace(/\.mp4$/i,"").slice(0,70), youtube_description: `Daily 49ers coverage and analysis.\n\n#49ers #NFL #FTTB`, facebook_caption: `New 49ers clip: ${input.filename.replace(/\.mp4$/i,"")}.`, hashtags: "#49ers #NFL #FTTB", estimated_cost_cents: 1 };
  const key=env("OPENAI_API_KEY"); if(!key) return fallback;
  const prompt=`Create social copy for a 49ers short-form clip. Return JSON only with youtube_title, youtube_description, facebook_caption, hashtags. Filename: ${input.filename}`;
  const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({model:env("OPENAI_MODEL","gpt-4o-mini"),messages:[{role:"system",content:"You write concise 49ers YouTube Shorts and Facebook Reels copy. No emojis unless needed. Avoid fake facts."},{role:"user",content:prompt}],response_format:{type:"json_object"},max_tokens:500})});
  if(!r.ok) throw new Error(await r.text()); const j=await r.json(); const text=j.choices?.[0]?.message?.content||"{}"; const parsed=JSON.parse(text); return {...fallback,...parsed,estimated_cost_cents: Math.max(1, Math.ceil(((j.usage?.total_tokens||500)/1000000)*20*100))};
}
