import { useState, useEffect, useRef } from 'react';
import { Rv } from './ui';

const ROLES={"MERN Developer":{s:72,have:["HTML","CSS","JavaScript","React","MongoDB"],need:[["Express.js","High","Learn REST API development"],["Node.js","High","Backend fundamentals"],["Authentication","Medium","JWT, sessions, roles"],["Deployment","Medium","Docker & CI basics"]],tip:"Strengthen Node.js and Express — they appear in most MERN openings on the platform."},
"Data Analyst":{s:58,have:["Python","SQL","Excel","Git"],need:[["Pandas","High","DataFrames & cleaning"],["Statistics","High","Inference & distributions"],["Power BI","Medium","Dashboards & storytelling"]],tip:"Add two data projects with real datasets and publish the insights on GitHub."},
"Cybersecurity":{s:49,have:["Linux","Python","Networking","C"],need:[["Web Security","High","OWASP Top 10 labs"],["Pen Testing","High","Kali & Burp Suite practice"],["SIEM Basics","Medium","Log analysis fundamentals"]],tip:"Document CTF write-ups — recruiters value proof of hands-on practice."}};

function Play(){const[r,setR]=useState("MERN Developer");const d=ROLES[r],C=2*Math.PI*52;
 return <section id="play"><div className="w"><Rv><span className="eyebrow">AI Skill Gap Analyzer</span><h2>Choose a role. See your gap instantly.</h2><p className="lead">Try it — switch the target role and watch your readiness and learning path update.</p></Rv>
 <div className="play"><div className="pn"><div className="tabs">{Object.keys(ROLES).map(k=><button key={k} className={"tab"+(r===k?" on":"")} onClick={()=>setR(k)}>{k}</button>)}</div>
  <div className="rg"><svg viewBox="0 0 120 120"><circle className="bg" cx="60" cy="60" r="52"/><circle className="fg" cx="60" cy="60" r="52" strokeDasharray={C} strokeDashoffset={C*(1-d.s/100)}/></svg><div><b>{d.s}%</b><small>Career Readiness</small></div></div>
  <div className="lab">You have</div><div className="chips" key={r}>{d.have.map((h,k)=><span className="ch" key={h} style={{animationDelay:k*60+"ms"}}>✓ {h}</span>)}</div></div>
 <div className="pn"><div className="lab" style={{marginTop:0}}>You need → recommended learning</div><div key={r}>{d.need.map((n,k)=><div className="nd" key={n[0]} style={{animationDelay:k*90+"ms"}}><b>{n[0]}<small>→ {n[2]}</small></b><span className={"pb "+n[1]}>{n[1]}</span></div>)}</div>
  <div className="ai"><b>✦ AI Insight</b><br/>{d.tip}</div></div></div></div></section>}

export default Play;
