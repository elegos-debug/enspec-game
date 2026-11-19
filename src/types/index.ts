export type Category='Anime & Gaming'|'Moroccan History'|'General Knowledge'|'Sports'
export interface Question{id:string;category:Category;difficulty:'HARD'|'VERY HARD';question:string;options:string[];answer:number}
export interface Answer{choice:number|null;correct:boolean}
export interface ActiveGame{id:string;team:string;ids:string[];index:number;answers:Answer[];startedAt:number;feedbackUntil:number|null}
export interface Result{id:string;team:string;score:number;correct:number;incorrect:number;unanswered:number;accuracy:number;completedAt:string}
