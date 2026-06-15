import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'ClipDropper Social', description: 'YouTube Shorts and Facebook Reels scheduler' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
