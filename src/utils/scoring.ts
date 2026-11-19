import type {ActiveGame,Category,Question,Result} from '../types'
import all from '../data/questions.json'

export const QUESTIONS=all as Question[]
export const POINTS=10
export const GAME_SIZE=15
export const byId=(id:string)=>QUESTIONS.find(q=>q.id===id)!

const CATS:Category[]=['Anime & Gaming','Moroccan History','General Knowledge','Sports']
const TIERS=['EASY','MEDIUM','HARD'] as const
const tierOf=(q:Question)=>q.difficulty==='EASY'?'EASY':q.difficulty==='MEDIUM'?'MEDIUM':'HARD'

export const shuffle=<T,>(a:T[])=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}

// 5 per tier: one from each category + 1 random extra from any category
export function pickIds():string[]{
  const out:string[]=[]
  for(const t of TIERS){
    const pool=QUESTIONS.filter(q=>tierOf(q)===t)
    const chosen:Question[]=[]
    for(const c of CATS){
      const q=shuffle(pool.filter(x=>x.category===c))[0]
      if(q)chosen.push(q)
    }
    const extra=shuffle(pool.filter(q=>!chosen.includes(q)))[0]
    if(extra)chosen.push(extra)
    out.push(...shuffle(chosen).map(q=>q.id))
  }
  return out
}

export const newGame=(team:string):ActiveGame=>({id:crypto.randomUUID?.()??String(Date.now()),team,ids:pickIds(),index:0,answers:[],startedAt:Date.now(),feedbackUntil:null})

export function toResult(g:ActiveGame):Result{
  const total=g.ids.length
  const correct=g.answers.filter(a=>a.correct).length
  const unanswered=total-g.answers.filter(a=>a.choice!==null).length
  return{id:g.id,team:g.team,score:correct*POINTS,correct,incorrect:total-correct-unanswered,unanswered,accuracy:Math.round(correct/total*100),completedAt:new Date().toISOString()}
}
