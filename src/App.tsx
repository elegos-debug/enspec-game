import {useState} from 'react'
import type {ActiveGame,Result} from './types'
import Game from './pages/Game'
import {Board,Home,HowTo,Register,Results} from './pages/Screens'
import {newGame} from './utils/scoring'
import {getActive,saveActive} from './utils/storage'

export default function App(){
 const [game,setGame]=useState<ActiveGame|null>(()=>getActive())
 const [view,setView]=useState(game?'game':'home')
 const [res,setRes]=useState<Result|null>(null),[last,setLast]=useState('')
 const start=(team:string)=>{const g=newGame(team);saveActive(g);setGame(g);setLast(team);setView('game')}
 if(view==='game'&&game)return<Game key={game.id} initial={game} onFinish={r=>{setRes(r);setLast(r.team);setGame(null);setView('result')}} onExit={()=>{setGame(null);setView('home')}}/>
 if(view==='register')return<Register onStart={start} onBack={()=>setView('home')}/>
 if(view==='how')return<HowTo onBack={()=>setView('home')}/>
 if(view==='board')return<Board onBack={()=>setView('home')}/>
 if(view==='result'&&res)return<Results r={res} go={setView} again={()=>last?start(last):setView('register')}/>
 return<Home go={setView}/>
}
