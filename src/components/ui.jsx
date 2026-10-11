import { useState, useEffect, useRef } from 'react';

const P={cv:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z M14 2v6h6 M16 13H8 M16 17H8",
target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
zap:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",board:"M3 3h18v18H3z M9 3v18 M15 3v12",pulse:"M22 12h-4l-3 9L9 3l-3 9H2",
bars:"M12 20V10 M18 20V4 M6 20v-4",moon:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",mark:"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",arrow:"M5 12h14 M12 5l7 7-7 7"};
export const Ic=({n})=><svg className="ic" viewBox="0 0 24 24"><path d={P[n]}/></svg>;
export function useIn(){const r=useRef(),[v,s]=useState(false);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){s(true);o.disconnect()}},{threshold:.2});o.observe(r.current);return()=>o.disconnect()},[]);return[r,v]}
export const Rv=({children,d=0})=>{const[r,v]=useIn();return <div ref={r} className={"rv"+(v?" in":"")} style={{transitionDelay:d+"ms"}}>{children}</div>};
export function Count({to,suf=""}){const[r,v]=useIn(),[n,setN]=useState(0);
 useEffect(()=>{if(!v)return;const s=performance.now();const f=t=>{const k=Math.min((t-s)/1400,1);setN(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)},[v]);
 return <span ref={r}>{n.toLocaleString()}{suf}</span>}
