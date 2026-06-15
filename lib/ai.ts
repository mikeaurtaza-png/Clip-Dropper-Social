import OpenAI from 'openai';
import { supabaseAdmin } from './supabaseAdmin';
import { getSetting } from './settings';

const INPUT_PER_1M = 0.40;
const OUTPUT_PER_1M = 1.60;

export async function monthlyAiSpend() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const { data } = await supabaseAdmin().from('ai_usage').select('estimated_cost_usd').gte('created_at', start.toISOString());
  return (data || []).reduce((s: number, r: any) => s + Number(r.estimated_cost_usd || 0), 0);
}

export async function ensureBudget() {
  const cap = Number(await getSetting('ai_monthly_budget', process.env.AI_MONTHLY_BUDGET_DEFAULT || '10'));
  const spend = await monthlyAiSpend();
  if (spend >= cap) throw new Error(`AI budget cap reached: $${spend.toFixed(4)} / $${cap.toFixed(2)}`);
  return { cap, spend };
}

export async function generateCopy(clip: any) {
  await ensureBudget();
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'missing-key' });
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = `You are helping Mike run a 49ers short-form sports channel. Create platform-specific copy for this clip. Keep it accurate, energetic, and not clickbait unless warranted. Return JSON only with youtube_title, youtube_description, facebook_caption, hashtags array. Clip filename/path: ${clip.filename} ${clip.dropbox_path}`;

  const res = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'Return valid JSON only.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const output = JSON.parse(res.choices[0]?.message?.content || '{}');
  const usage = res.usage;
  const inputTokens = usage?.prompt_tokens || 0;
  const outputTokens = usage?.completion_tokens || 0;
  const estimated = (inputTokens / 1_000_000) * INPUT_PER_1M + (outputTokens / 1_000_000) * OUTPUT_PER_1M;

  await supabaseAdmin().from('ai_usage').insert({
    clip_id: clip.id,
    month: new Date().toISOString().slice(0, 7),
    prompt_tokens: inputTokens,
    completion_tokens: outputTokens,
    estimated_cost_usd: estimated
  });

  return output;
}
