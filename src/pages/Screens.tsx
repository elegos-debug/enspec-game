import {useState} from 'react'
import {ArrowLeft,Download,Home as HomeIcon,HelpCircle,Play,RotateCcw,Trash2,Trophy} from 'lucide-react'
import type {Result} from '../types'
import {Divider,GhostBtn,GoldBtn,Logo,Shell} from '../components/ui'
import {clearResults,exportCsv,getResults} from '../utils/storage'
import {GAME_SIZE,POINTS} from '../utils/scoring'

export const Home=({go}:{go:(v:string)=>void})=>(<Shell>
 <div className="flex justify-center pt-4"><Logo/></div>
 <div className="flex-1 flex flex-col justify-center text-center">
  <Divider/>
  <h1 className="font-display gold-text uppercase leading-[.9] text-7xl sm:text-8xl">Knowledge<br/>Battle</h1>
  <p className="font-display text-champagne tracking-[.2em] mt-3">ENSPEC EDITION</p>
  <p className="mt-2 italic text-white text-xl">Think Fast. Know More. Win Together.</p>
  <Divider/>
  <p className="text-warm max-w-md mx-auto">Fifteen questions, thirty seconds each. Gather your team, pick your answers and climb the leaderboard.</p>
  <div className="mt-8 grid gap-3 max-w-sm w-full mx-auto">
   <GoldBtn onClick={()=>go('register')} className="text-2xl min-h-[64px]"><Play size={22}/>Play</GoldBtn>
   <GhostBtn onClick={()=>go('board')}><Trophy size={18}/>Leaderboard</GhostBtn>
   <GhostBtn onClick={()=>go('how')}><HelpCircle size={18}/>How to play</GhostBtn></div></div></Shell>)

export function Register({onStart,onBack}:{onStart:(t:string)=>void;onBack:()=>void}){
 const [t,setT]=useState(''),[err,setErr]=useState('')
 const go=()=>{const v=t.trim().replace(/\s+/g,' ');if(v.length<2)return setErr('Enter a team name of at least 2 characters.');if(v.length>30)return setErr('Team name can have at most 30 characters.');onStart(v)}
 return(<Shell><div className="pt-4"><Logo small/></div>
  <div className="flex-1 flex flex-col justify-center"><h2 className="font-display gold-text text-5xl uppercase">Your team</h2><Divider/>
   <label htmlFor="team" className="text-warm mb-2">Team name</label>
   <input id="team" value={t} maxLength={40} autoComplete="off" onChange={e=>{setT(e.target.value);setErr('')}} onKeyDown={e=>e.key==='Enter'&&go()}
    className="bg-coal border-2 border-gold/70 focus:border-champagne outline-none rounded-md px-4 min-h-[60px] text-xl text-white" placeholder="e.g. The Quizzards"/>
   <p className="text-red-400 min-h-6 mt-2">{err}</p>
   <div className="grid gap-3 mt-4"><GoldBtn onClick={go}>Start game</GoldBtn><GhostBtn onClick={onBack}><ArrowLeft size={18}/>Back</GhostBtn></div></div></Shell>)}

export const HowTo=({onBack}:{onBack:()=>void})=>(<Shell><div className="pt-4"><Logo small/></div>
 <div className="flex-1 flex flex-col justify-center"><h2 className="font-display gold-text text-5xl uppercase">How to play</h2><Divider/>
  <ol className="space-y-3 text-lg">{['Enter your team name.','Start the game.','Answer 15 challenging questions.','You have 30 seconds per question.','Each correct answer earns 10 points.','Maximum score is 150 points.','Your result is automatically saved on your device.'].map((s,i)=>
   <li key={i} className="flex gap-3 border-b border-darkgold/40 pb-2"><span className="font-display text-gold text-2xl w-6">{i+1}</span>{s}</li>)}</ol>
  <GoldBtn onClick={onBack} className="mt-8"><HomeIcon size={18}/>Back to home</GoldBtn></div></Shell>)

export const Results=({r,go,again}:{r:Result;go:(v:string)=>void;again:()=>void})=>(<Shell><div className="pt-4"><Logo small/></div>
 <div className="flex-1 flex flex-col justify-center text-center">
  <p className="font-display text-champagne text-2xl tracking-widest uppercase">{r.team}</p>
  <div className={`font-display gold-text text-[9rem] leading-none ${r.score>=70?'glow':''}`}>{r.score}</div>
  <p className="font-display text-warm tracking-widest -mt-2">OUT OF {GAME_SIZE*POINTS}</p><Divider/>
  <div className="grid grid-cols-2 gap-3 text-left">{([['Correct',r.correct],['Incorrect',r.incorrect],['Unanswered',r.unanswered],['Accuracy',r.accuracy+'%']] as const).map(([k,v])=>
   <div key={k} className="border border-gold/50 rounded-md p-3 bg-coal"><div className="text-warm text-sm">{k}</div><div className="font-display text-3xl text-champagne">{v}</div></div>)}</div>
  <p className="text-warm text-sm mt-3">{new Date(r.completedAt).toLocaleString()} · Saved on this device</p>
  <div className="grid gap-3 mt-6"><GoldBtn onClick={again}><RotateCcw size={18}/>Play again</GoldBtn><GhostBtn onClick={()=>go('board')}><Trophy size={18}/>Leaderboard</GhostBtn><GhostBtn onClick={()=>go('home')}><HomeIcon size={18}/>Home</GhostBtn></div></div></Shell>)

export function Board({onBack}:{onBack:()=>void}){
 const [rs,setRs]=useState(getResults())
 const clear=()=>{if(confirm('Clear the entire leaderboard on this device? This cannot be undone.')){clearResults();setRs([])}}
 const top=['border-champagne bg-gold/20','border-gold bg-gold/10','border-darkgold bg-darkgold/20']
 return(<Shell><div className="pt-4"><Logo small/></div><h2 className="font-display gold-text text-5xl uppercase mt-2">Leaderboard</h2><Divider/>
  <p className="text-warm text-sm mb-3">Scores are saved locally on this device and browser only.</p>
  <div className="flex-1 space-y-2">{rs.length===0&&<p className="text-warm text-center py-10">No games yet. Finish a game to appear here.</p>}
   {rs.map((r,i)=><div key={r.id} className={`flex items-center gap-3 rounded-md border p-3 ${top[i]??'border-darkgold/40 bg-coal'}`}>
    <span className={`font-display text-3xl w-9 text-center ${i<3?'gold-text':'text-warm'}`}>{i+1}</span>
    <div className="flex-1 min-w-0"><div className="truncate text-lg">{r.team}</div><div className="text-warm text-xs">{new Date(r.completedAt).toLocaleDateString()} · {r.correct}/{GAME_SIZE} correct</div></div>
    <span className="font-display text-3xl text-champagne">{r.score}</span></div>)}</div>
  <div className="grid gap-3 mt-6"><GhostBtn onClick={exportCsv} disabled={!rs.length}><Download size={18}/>Export to CSV</GhostBtn>
   <GhostBtn onClick={clear} disabled={!rs.length}><Trash2 size={18}/>Clear leaderboard</GhostBtn><GoldBtn onClick={onBack}><HomeIcon size={18}/>Home</GoldBtn></div></Shell>)}
