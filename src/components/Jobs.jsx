import { useState, useEffect, useRef } from 'react';
import { Ic, Rv } from './ui';

const JOBS=[["Frontend Intern","PixelNest","Chattogram · Hybrid","Internship",["React","JavaScript","CSS"],92,"3 days left","#4F6BFF","৳15–20k/mo"],["MERN Developer","CodeCrate","Dhaka · Remote","Full-time",["React","Node.js","MongoDB"],84,"7 days left","#35A77A","৳45–60k/mo"],["Software Engineer Intern","Nexora Labs","Dhaka · On-site","Internship",["JavaScript","Git","Python"],81,"7 days left","#8B5CF6","৳20k/mo"],["Junior Web Developer","BlueOrbit","Remote","Full-time",["HTML","React","REST API"],78,"12 days left","#F4B942","৳35–45k/mo"]];

function Jobs(){const[f,setF]=useState("All");const[sv,setSv]=useState({});
 const list=JOBS.filter(j=>f==="All"||j[3]===f||(f==="Remote"&&j[2].includes("Remote")));
 return <section id="jobs" style={{background:"var(--card)"}}><div className="w"><Rv><span className="eyebrow">Opportunities</span><h2>Find opportunities that match you.</h2></Rv>
 <div className="tabs" style={{marginTop:24,marginBottom:0}}>{["All","Internship","Full-time","Remote"].map(t=><button key={t} className={"tab"+(f===t?" on":"")} onClick={()=>setF(t)}>{t}</button>)}</div>
 <div className="jg">{list.map((j,k)=><div className="job" key={j[0]} style={{animationDelay:k*80+"ms"}}>
  <div className="jt"><div className="co" style={{background:j[7]}}>{j[1][0]}</div><div><h3>{j[0]}</h3><small>{j[1]} · {j[2]}</small></div><div className="mr" style={{background:`conic-gradient(var(--ok) ${j[5]*3.6}deg,var(--bd) 0)`}}><span>{j[5]}%</span></div></div>
  <div className="bd"><em className="o">{j[3]}</em>{j[4].map(s=><em key={s}>{s}</em>)}<em style={{background:"transparent",color:"var(--mut)"}}>{j[8]}</em></div>
  <div className="jf"><span>⏳ {j[6]}</span><div style={{display:"flex",gap:8}}><button className={"sv"+(sv[j[0]]?" on":"")} onClick={()=>setSv({...sv,[j[0]]:!sv[j[0]]})} aria-label="Save"><Ic n="mark"/></button><a className="btn p" href="#cta" style={{padding:"9px 16px",fontSize:13}}>View Details</a></div></div></div>)}</div></div></section>}

export default Jobs;
