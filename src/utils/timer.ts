export const LIMIT=30, FEEDBACK_MS=1200
export const remaining=(startedAt:number,now=Date.now())=>Math.max(0,LIMIT-(now-startedAt)/1000)
