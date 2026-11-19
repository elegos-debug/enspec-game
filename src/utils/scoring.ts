import type {ActiveGame,Question,Result} from '../types'
import all from '../data/questions.json'
export const QUESTIONS=all as Question[]
export const byId=(id:string)=>QUESTIONS.find(q=>q.id===id)!
const DIST:Record<string,number>={'Anime & Gaming':3,'Moroccan History':2,'General Knowledge':3,'Sports':2}
export const shuffle=<T,>(a:T[])=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
export const pickIds=()=>shuffle(Object.entries(DIST).flatMap(([c,n])=>shuffle(QUESTIONS.filter(q=>q.category===c)).slice(0,n))).map(q=>q.id)
export const newGame=(team:string):ActiveGame=>({id:crypto.randomUUID?.()??String(Date.now()),team,ids:pickIds(),index:0,answers:[],startedAt:Date.now(),feedbackUntil:null})
export function toResult(g:ActiveGame):Result{
 const correct=g.answers.filter(a=>a.correct).length,unanswered=g.ids.length-g.answers.filter(a=>a.choice!==null).length
 return{id:g.id,team:g.team,score:correct*10,correct,incorrect:g.ids.length-correct-unanswered,unanswered,accuracy:Math.round(correct/g.ids.length*100),completedAt:new Date().toISOString()}}
