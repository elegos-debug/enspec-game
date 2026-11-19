import {useEffect,useState} from 'react'
import {RotateCcw} from 'lucide-react'
import type {ActiveGame,Result} from '../types'
import {Logo} from '../components/ui'
import {byId,toResult} from '../utils/scoring'
import {addResult,clearActive,saveActive} from '../utils/storage'
import {FEEDBACK_MS,LIMIT,remaining} from '../utils/timer'

export default function Game({initial,onFinish,onExit}:{initial:ActiveGame;onFinish:(r:Result)=>void;onExit:()=>void}){
 const [g,setG]=useState(initial),[now,setNow]=useState(Date.now())
 useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),200);return()=>clearInterval(t)},[])
 const q=byId(g.ids[g.index]),left=remaining(g.startedAt,now),ans=g.answers[g.index]
 const commit=(n:ActiveGame)=>{setG(n);saveActive(n)}
 const submit=(choice:number|null)=>{if(g.answers[g.index])return
  commit({...g,answers:[...g.answers,{choice,correct:choice===q.answer}],feedbackUntil:Date.now()+FEEDBACK_MS})}
 const next=()=>{
  if(g.index+1>=g.ids.length){const r=toResult(g);addResult(r);clearActive();onFinish(r)}
  else commit({...g,index:g.index+1,startedAt:Date.now(),feedbackUntil:null})}
 useEffect(()=>{
  if(ans){if(g.feedbackUntil&&now>=g.feedbackUntil)next()}
  else if(left<=0)submit(null)
 // eslint-disable-next-line
 },[now])
 const score=g.answers.filter(a=>a.correct).length*10,secs=Math.ceil(left),urgent=!ans&&left<=5,warn=!ans&&left<=10
 const reset=()=>{if(confirm('Reset this game? Your saved leaderboard scores will be kept.')){clearActive();onExit()}}
 return(<div className="min-h-screen min-h-[100dvh] flex flex-col items-center px-4 pt-[max(.75rem,env(safe-area-inset-top))] pb-[max(.75rem,env(safe-area-inset-bottom))]">
 <div className="w-full max-w-2xl flex-1 flex flex-col">
  <div className="flex items-center justify-between"><Logo small/>
   <div className="text-right"><div className="font-display text-champagne text-lg leading-none">{g.team}</div><div className="font-display text-gold text-2xl leading-none">{score} PTS</div></div></div>
  <div className="mt-3 flex items-center justify-between font-display tracking-wider text-warm text-sm"><span>QUESTION {g.index+1}/{g.ids.length}</span><span>{q.category}</span></div>
  <div className="h-1.5 mt-1 bg-coal rounded"><div className="h-full gold-btn rounded transition-all duration-500" style={{width:`${(g.index+(ans?1:0))/g.ids.length*100}%`}}/></div>
  <div className="flex flex-col items-center my-4">
   <div className={`font-display text-7xl leading-none ${urgent?'text-red-500 animate-pulse':warn?'text-champagne':'gold-text'}`} aria-live="off">{secs}</div>
   <div className="h-1 w-40 mt-2 bg-coal rounded overflow-hidden"><div className={`h-full ${urgent?'bg-red-500':'bg-gold'}`} style={{width:`${(left/LIMIT)*100}%`}}/></div>
   <div className="h-5 text-sm font-display tracking-widest text-red-400">{urgent?'HURRY UP!':''}</div></div>
  <div key={g.index} className="pop border border-gold/50 rounded-lg p-4 bg-coal/80">
   <h2 className="text-xl sm:text-2xl leading-snug">{q.question}</h2></div>
  <div key={'o'+g.index} className="mt-4 grid gap-3 pop">
   {q.options.map((o,i)=>{const mine=ans?.choice===i
    const cls=!ans?'border-gold/70 text-white hover:bg-gold/10 active:bg-gold/20':mine?(ans.correct?'gold-btn border-champagne':'border-red-500 bg-red-950/60 text-white shake'):'border-darkgold/40 text-warm/50'
    return(<button key={i} disabled={!!ans} onClick={()=>submit(i)} className={`min-h-[60px] text-left px-4 py-3 rounded-md border-2 transition flex items-center gap-3 text-lg ${cls}`}>
     <span className="font-display text-xl w-7 shrink-0">{'ABCD'[i]}</span><span>{o}</span></button>)})}
  </div>
  <div className="h-7 text-center mt-3 font-display tracking-widest">{ans&&(ans.choice===null?<span className="text-warm">TIME'S UP</span>:ans.correct?<span className="text-champagne">CORRECT +10</span>:<span className="text-red-400">INCORRECT</span>)}</div>
  <button onClick={reset} className="mt-auto self-center text-warm/70 text-sm flex items-center gap-1 min-h-[44px]"><RotateCcw size={14}/>Reset game</button>
 </div></div>)}
