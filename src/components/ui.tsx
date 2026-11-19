import type {ReactNode,ButtonHTMLAttributes} from 'react'
export const Shell=({children}:{children:ReactNode})=>(
<div className="min-h-screen min-h-[100dvh] flex flex-col items-center px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
 <div className="w-full max-w-2xl flex-1 flex flex-col pop">{children}</div></div>)
export const Logo=({small}:{small?:boolean})=>(<img src="/enspec-logo.jpg" alt="ENSPEC" className={`${small?'h-9':'h-16'} w-auto rounded border border-darkgold/60`}/>)
export const Divider=()=>(<div className="flex items-center gap-3 my-4" aria-hidden><div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold"/><div className="w-2 h-2 rotate-45 bg-gold"/><div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold"/></div>)
export const GoldBtn=({className='',...p}:ButtonHTMLAttributes<HTMLButtonElement>)=>(<button {...p} className={`gold-btn font-display uppercase tracking-widest text-lg min-h-[56px] px-6 rounded-md active:scale-[.98] transition hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2 ${className}`}/>)
export const GhostBtn=({className='',...p}:ButtonHTMLAttributes<HTMLButtonElement>)=>(<button {...p} className={`font-display uppercase tracking-widest min-h-[52px] px-5 rounded-md border border-gold/70 text-champagne hover:bg-gold/10 active:scale-[.98] transition flex items-center justify-center gap-2 ${className}`}/>)
