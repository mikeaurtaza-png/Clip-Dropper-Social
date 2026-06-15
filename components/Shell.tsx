import { Nav } from './Nav';
export function Shell({children}:{children:React.ReactNode}){return <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(170,0,0,.22),transparent_32%),radial-gradient(circle_at_top_right,rgba(179,153,93,.18),transparent_30%),#05070d]"><div className="flex"><Nav/><section className="flex-1 p-4 md:p-8">{children}</section></div></main>}
