'use client';
import { Shell } from '@/components/Shell';
import { seedClips } from '@/lib/mock';
import { Clip } from '@/lib/types';
import { useEffect, useState } from 'react';
const KEY='cds_clips_v1';
export default function Calendar(){const [clips,setClips]=useState<Clip[]>([]);useEffect(()=>{const s=localStorage.getItem(KEY);setClips(s?JSON.parse(s):seedClips)},[]);const scheduled=clips.filter(c=>c.status==='scheduled');return <Shell><div className="space-y-6"><div><h1 className="text-4xl font-black">Calendar</h1><p className="text-slate-400">Upcoming scheduled Shorts/Reels.</p></div><div className="card rounded-2xl p-5"><h2 className="text-xl font-bold mb-4">Scheduled Queue</h2><div className="space-y-3">{scheduled.length?scheduled.map(c=><div key={c.id} className="pill rounded-xl p-4 flex justify-between gap-4"><div><b>{c.youtubeTitle||c.filename}</b><div className="text-sm text-slate-400">{c.filename}</div></div><div className="text-sm text-slate-300">{c.scheduledAt?new Date(c.scheduledAt).toLocaleString():'No time'}</div></div>):<div className="text-slate-400">No scheduled clips yet.</div>}</div></div></div></Shell>}
