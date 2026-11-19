import type {ActiveGame,Result} from '../types'
const R='kb_results_v1',A='kb_active_v1'
function read<T>(k:string,f:T):T{try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}}
function write(k:string,v:unknown){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
export const getResults=()=>read<Result[]>(R,[]).sort((a,b)=>b.score-a.score||a.completedAt.localeCompare(b.completedAt))
export function addResult(r:Result){const all=read<Result[]>(R,[]);if(!all.some(x=>x.id===r.id))write(R,[...all,r])}
export const clearResults=()=>{try{localStorage.removeItem(R)}catch{}}
export const getActive=()=>read<ActiveGame|null>(A,null)
export const saveActive=(g:ActiveGame)=>write(A,g)
export const clearActive=()=>{try{localStorage.removeItem(A)}catch{}}
export function exportCsv(){
 const q=(v:string|number)=>`"${String(v).replace(/"/g,'""')}"`
 const rows=[['Rank','Game ID','Team','Score','Correct','Incorrect','Unanswered','Accuracy %','Completed'],...getResults().map((r,i)=>[i+1,r.id,r.team,r.score,r.correct,r.incorrect,r.unanswered,r.accuracy,r.completedAt])]
 const url=URL.createObjectURL(new Blob(['\ufeff'+rows.map(r=>r.map(q).join(',')).join('\n')],{type:'text/csv;charset=utf-8'}))
 const a=document.createElement('a');a.href=url;a.download='knowledge-battle-results.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
