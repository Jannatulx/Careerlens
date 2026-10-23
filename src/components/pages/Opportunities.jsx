import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Bell, Bookmark, BookmarkCheck, BriefcaseBusiness,
  CalendarClock, Check, CheckCircle2, ChevronDown, ChevronRight, Clock3,
  Compass, ExternalLink, FileText, Filter, GraduationCap,
  LayoutDashboard, List, MapPin, Menu, Search, ShieldCheck,
  SlidersHorizontal, Sparkles, Target, TrendingUp, UserRound, X, Grid2X2,
  Wallet, BookOpen, ChartNoAxesCombined, ClipboardList, Star,
  RotateCcw, Send, Eye, CircleCheck, Layers3,
} from 'lucide-react';
import brandLogo from '../../assets/logo.png';
import './Opportunities.css';
import CareerFooter from '../shared/CareerFooter';
import CareerSidebar, {
  CareerMenuButton,
  useCareerSidebar
} from '../shared/CareerSidebar';
/**
 * CareerLens / Opportunities frontend demo.
 * All companies, roles and vacancies below are fictional illustrative content.
 * Nothing here is scraped, live, AI-ranked, or submitted to an employer.
 */
const OPPORTUNITIES = [
  { id:'op-01', company:'Nexora Labs', mark:'N', tone:'mint', title:'Frontend Developer Intern', type:'Internship', mode:'Hybrid', location:'Dhaka', experience:'Student', pay:'৳18k–25k /mo', posted:1, deadline:9, featured:true,
    required:['React','JavaScript','HTML','CSS','Git & GitHub'], preferred:['TypeScript','Figma'], benefits:['Mentorship','Flexible hours','Learning stipend'],
    summary:'Help a product-focused team craft fast, accessible, delightful web interfaces.',
    responsibilities:['Build reusable components in React','Work with designers to implement responsive UI','Improve accessibility and user experience','Collaborate through GitHub pull requests'] },
  { id:'op-02', company:'OrbitStack', mark:'O', tone:'violet', title:'MERN Stack Developer', type:'Full-time', mode:'On-site', location:'Dhaka', experience:'1–2 years', pay:'৳45k–70k /mo', posted:2, deadline:21, featured:true,
    required:['JavaScript','React','Node.js','Express.js','MongoDB'], preferred:['REST API','Git & GitHub','Deployment'], benefits:['Health support','Performance bonus','Career growth'],
    summary:'Build complete product features across frontend, API and document database layers.',
    responsibilities:['Develop REST APIs with Express.js','Build interactive React workflows','Model application data in MongoDB','Participate in code reviews and testing'] },
  { id:'op-03', company:'BluePeak Digital', mark:'B', tone:'sky', title:'Junior UI Engineer', type:'Full-time', mode:'Remote', location:'Remote', experience:'Fresh graduate', pay:'৳30k–48k /mo', posted:3, deadline:17, featured:false,
    required:['HTML','CSS','JavaScript','React'], preferred:['Figma','TypeScript','Git & GitHub'], benefits:['Work from anywhere','Remote setup','Mentorship'],
    summary:'Transform ambitious ideas into thoughtful, responsive web experiences.',
    responsibilities:['Build UI from design systems','Ensure mobile and desktop responsiveness','Collaborate on design handoffs','Optimize page performance'] },
  { id:'op-04', company:'CloudNest Technologies', mark:'C', tone:'peach', title:'Backend Engineering Intern', type:'Internship', mode:'On-site', location:'Chattogram', experience:'Student', pay:'৳12k–18k /mo', posted:4, deadline:6, featured:false,
    required:['Node.js','JavaScript','REST API','MongoDB'], preferred:['Express.js','Git & GitHub','Authentication'], benefits:['Team mentorship','Practical projects','Certificate'],
    summary:'Learn how real-world APIs, databases and backend services come together.',
    responsibilities:['Develop endpoints with Node.js','Work with MongoDB collections','Write simple API documentation','Support backend debugging'] },
  { id:'op-05', company:'TeraBloom Studio', mark:'T', tone:'pink', title:'Product Design & UI Intern', type:'Internship', mode:'Remote', location:'Remote', experience:'Student', pay:'৳15k–22k /mo', posted:2, deadline:14, featured:false,
    required:['Figma','HTML','CSS','Communication'], preferred:['React','Problem Solving'], benefits:['Design mentorship','Remote hours','Portfolio reviews'],
    summary:'Explore the intersection of interface design, accessibility and real product work.',
    responsibilities:['Create visual explorations','Prepare reusable UI patterns','Prototype responsive screens','Document design decisions'] },
  { id:'op-06', company:'GreenByte Systems', mark:'G', tone:'green', title:'React Developer (Part-time)', type:'Part-time', mode:'Hybrid', location:'Dhaka', experience:'Fresh graduate', pay:'৳20k–32k /mo', posted:6, deadline:12, featured:false,
    required:['React','JavaScript','CSS','Git & GitHub'], preferred:['TypeScript','REST API'], benefits:['Flexible schedule','Peer learning','Project ownership'],
    summary:'Ship practical customer-facing interfaces with a small cross-functional team.',
    responsibilities:['Build feature components','Integrate client-side APIs','Fix UI defects','Work in weekly sprints'] },
  { id:'op-07', company:'DataForge Works', mark:'D', tone:'indigo', title:'Data Analyst Trainee', type:'Internship', mode:'On-site', location:'Dhaka', experience:'Student', pay:'৳15k–20k /mo', posted:5, deadline:26, featured:false,
    required:['Python','SQL','Excel','Communication'], preferred:['Statistics','Power BI','Data Visualization'], benefits:['Real datasets','Learning sessions','Career coaching'],
    summary:'Turn messy datasets into useful charts and business-facing insights.',
    responsibilities:['Prepare data quality reports','Explore structured business data','Build charts and summaries','Present findings to mentors'] },
  { id:'op-08', company:'PixelRoute', mark:'P', tone:'amber', title:'Web Development Intern', type:'Internship', mode:'Hybrid', location:'Sylhet', experience:'Student', pay:'৳10k–16k /mo', posted:8, deadline:5, featured:false,
    required:['HTML','CSS','JavaScript','Git & GitHub'], preferred:['React','Figma'], benefits:['Mentorship','Project certificate','Friendly culture'],
    summary:'Get hands-on experience building responsive websites and small interactive tools.',
    responsibilities:['Create responsive landing pages','Improve existing frontend code','Use Git branches for tasks','Test pages across devices'] },
  { id:'op-09', company:'ArcNova Solutions', mark:'A', tone:'mint', title:'Junior Node.js Developer', type:'Full-time', mode:'Remote', location:'Remote', experience:'1–2 years', pay:'৳38k–60k /mo', posted:1, deadline:29, featured:false,
    required:['Node.js','Express.js','REST API','MongoDB','Authentication'], preferred:['Docker','Git & GitHub'], benefits:['Remote first','Learning budget','Growth reviews'],
    summary:'Design clean APIs for modern service-oriented web products.',
    responsibilities:['Implement Express routes','Validate API requests','Write reliable database operations','Apply authentication best practices'] },
  { id:'op-10', company:'Lumina Apps', mark:'L', tone:'sky', title:'Associate Software Engineer', type:'Full-time', mode:'On-site', location:'Khulna', experience:'Fresh graduate', pay:'৳28k–45k /mo', posted:7, deadline:37, featured:false,
    required:['JavaScript','React','Git & GitHub','Problem Solving'], preferred:['Node.js','REST API','MongoDB'], benefits:['Training program','Annual review','Team events'],
    summary:'Start your engineering career with structured learning and real software releases.',
    responsibilities:['Implement small product features','Write maintainable code','Review feedback with senior engineers','Support QA testing'] },
  { id:'op-11', company:'ByteHarbor', mark:'BH', tone:'indigo', title:'Full-Stack Internship', type:'Internship', mode:'Remote', location:'Remote', experience:'Student', pay:'৳16k–24k /mo', posted:3, deadline:10, featured:true,
    required:['JavaScript','React','Node.js','MongoDB'], preferred:['Express.js','REST API','Git & GitHub'], benefits:['Remote mentorship','Learning stipend','Team demo days'],
    summary:'Contribute to both user-facing features and simple backend APIs.',
    responsibilities:['Develop React pages','Integrate API endpoints','Build backend starter routes','Present work during sprint demos'] },
  { id:'op-12', company:'CedarFlow', mark:'CF', tone:'green', title:'QA & Test Automation Trainee', type:'Internship', mode:'Hybrid', location:'Rajshahi', experience:'Student', pay:'৳12k–17k /mo', posted:11, deadline:18, featured:false,
    required:['JavaScript','Git & GitHub','Problem Solving'], preferred:['Testing','REST API','Communication'], benefits:['Structured onboarding','Friendly mentors','Certificate'],
    summary:'Learn how to protect user experience through thoughtful software testing.',
    responsibilities:['Test UI workflows','Write bug reports','Run simple JavaScript tests','Document reproduction steps'] },
  { id:'op-13', company:'Northstar Analytics', mark:'NA', tone:'violet', title:'Junior Data Visualization Developer', type:'Part-time', mode:'Remote', location:'Remote', experience:'Fresh graduate', pay:'৳22k–35k /mo', posted:9, deadline:24, featured:false,
    required:['JavaScript','React','Data Visualization','CSS'], preferred:['Python','SQL'], benefits:['Flexible hours','Portfolio-ready work','Remote collaboration'],
    summary:'Build intuitive, data-rich user interfaces for analytics products.',
    responsibilities:['Turn datasets into clear visuals','Implement responsive analytics views','Collaborate with product teams','Improve chart interactions'] },
  { id:'op-14', company:'CraftCloud', mark:'CC', tone:'peach', title:'Junior React & UI Developer', type:'Full-time', mode:'Hybrid', location:'Chattogram', experience:'Fresh graduate', pay:'৳32k–50k /mo', posted:12, deadline:33, featured:false,
    required:['React','JavaScript','HTML','CSS'], preferred:['Git & GitHub','Figma','TypeScript'], benefits:['Mentoring','Medical support','Flexible start time'],
    summary:'Craft modern web interfaces for a growing digital product studio.',
    responsibilities:['Build React components','Translate design files into HTML/CSS','Support UI performance improvements','Maintain component documentation'] },
  { id:'op-15', company:'NovaBridge', mark:'NB', tone:'amber', title:'Software Support & Web Intern', type:'Part-time', mode:'On-site', location:'Sylhet', experience:'Student', pay:'৳9k–14k /mo', posted:13, deadline:8, featured:false,
    required:['HTML','CSS','JavaScript','Communication'], preferred:['Git & GitHub','React'], benefits:['Hands-on learning','Flexible classes','Certificate'],
    summary:'Support website improvements and gain practical exposure to software teams.',
    responsibilities:['Fix simple UI issues','Support customer-facing teams','Document UI changes','Test updates before release'] },
];

const SAMPLE_SKILLS = [
  {id:'s1',name:'JavaScript',level:86}, {id:'s2',name:'React',level:74},
  {id:'s3',name:'HTML',level:92}, {id:'s4',name:'CSS',level:84},
  {id:'s5',name:'Node.js',level:59}, {id:'s6',name:'MongoDB',level:66},
  {id:'s7',name:'Python',level:65}, {id:'s8',name:'Git & GitHub',level:76},
  {id:'s9',name:'Communication',level:81},
];
const KEY_SKILLS = 'careerlens-demo-skills-v1';
const KEY_SAVED = 'careerlens-demo-saved-opportunities-v1';
const KEY_APPLIED = 'careerlens-demo-applications-v1';
const SKILL_OPTIONS = [...new Set(OPPORTUNITIES.flatMap(j=>[...j.required,...j.preferred]))].sort();
const LOCATIONS = [...new Set(OPPORTUNITIES.map(j=>j.location))].sort();
const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g,'');
const safeGet = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
const safeSet = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch { /* demo can still work without localStorage */ } };
const readArray = (key) => { try { const arr=JSON.parse(safeGet(key)||'[]'); return Array.isArray(arr)?arr:[]; } catch { return []; } };
const readSkills = () => {
  try { const raw=safeGet(KEY_SKILLS); if(raw===null) return SAMPLE_SKILLS;
    const skills=JSON.parse(raw); return Array.isArray(skills)?skills.filter(s=>s && typeof s.name==='string').map(s=>({name:s.name,level:Math.max(0,Math.min(100,Number(s.level)||0))})):SAMPLE_SKILLS;
  } catch { return SAMPLE_SKILLS; }
};
const readSaved = () => readArray(KEY_SAVED).filter(id=>typeof id==='string');
const readApplications = () => readArray(KEY_APPLIED).filter(a=>a && typeof a==='object');
const dateOffset = (n) => { const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d; };
const humanDate = (n) => dateOffset(n).toLocaleDateString('en-US',{month:'short',day:'numeric'});
const stageLabel = n => n<=7?`${n}d left`:n<=14?'Closing soon':`${n}d left`;
const makesSkillSet = skills => new Map(skills.map(s=>[normalize(s.name),Math.max(0,Math.min(100,Number(s.level)||0))]));

// Transparent, deterministic match; not AI. 80% required + 20% preferred.
// Each matched skill contributes 70% for coverage, 30% for self-rated proficiency.
function matchDetails(job,skills) {
  const lookup=makesSkillSet(skills);
  const present=job.required.filter(s=>lookup.has(normalize(s)));
  const missing=job.required.filter(s=>!lookup.has(normalize(s)));
  const prefPresent=job.preferred.filter(s=>lookup.has(normalize(s)));
  const scoreList = list => list.length? list.reduce((a,s)=>a + (lookup.has(normalize(s)) ? (.7 + .3 * lookup.get(normalize(s))/100):0),0) / list.length : 0;
  const result=job.preferred.length?(.8*scoreList(job.required)+.2*scoreList(job.preferred)):scoreList(job.required);
  return {score:Math.round(result*100),present,missing,prefPresent};
}
const ALL_FILTERS={ types:[],modes:[],location:'All locations',experience:'All levels',skill:'Any skill',deadline:'Anytime',minimum:0 };
const ROUTES = [
  [LayoutDashboard,'Overview',null],[UserRound,'My Profile',null],
  [FileText,'Resume Analyzer',null],[BookOpen,'My Skills','/my-skills'],
  [Target,'Skill Gap Analysis','/skill-gap'],[BriefcaseBusiness,'Opportunities','/opportunities'],
  [Bookmark,'Saved Jobs','/opportunities?saved=1'],
  [ClipboardList,'Applications',null],[ChartNoAxesCombined,'Career Analytics',null],
];

function Sidebar({mobile,onClose,soon,savedCount}) {
  return <>
    <AnimatePresence>{mobile && <motion.button className="op-mobile-shade" aria-label="Close navigation" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>}</AnimatePresence>
    <aside className={`op-sidebar ${mobile?'op-sidebar-open':''}`} aria-label="Student navigation">
      <a className="op-brand" href="/" aria-label="CareerLens landing page"><span className="op-brand-img"><img src={brandLogo} alt=""/></span><span><strong>CareerLens</strong><small>Student workspace</small></span></a>
      <div className="op-side-eyebrow">WORKSPACE</div>
      <nav className="op-side-nav">
        {ROUTES.map(([Icon,title,href])=>href?
          <a href={href} key={title} onClick={onClose} className={`op-nav-link ${((title==='Opportunities'&&!window.location.search.includes('saved=1'))||(title==='Saved Jobs'&&window.location.search.includes('saved=1')))?'op-nav-highlight':''}`} aria-current={((title==='Opportunities'&&!window.location.search.includes('saved=1'))||(title==='Saved Jobs'&&window.location.search.includes('saved=1')))?'page':undefined}>
            <Icon size={18}/><span>{title}</span>{title==='Saved Jobs' && savedCount>0?<small>{savedCount}</small>:null}{title==='Opportunities'?<span className="op-nav-dot"/>:null}
          </a>:
          <button type="button" key={title} className="op-nav-link" onClick={()=>{soon(title);onClose();}}><Icon size={18}/><span>{title}</span></button>)}
      </nav>
      <div className="op-side-bottom"><span className="op-side-eyebrow">YOUR NEXT STEP</span><div className="op-side-tip"><Sparkles size={20}/><strong>Skills meet possibility.</strong><p>Find roles where your strengths shine, and see what to learn next.</p><span>KEEP EXPLORING <ArrowRight size={13}/></span></div><a href="/" className="op-back-home">Back to website <ArrowUpRight size={14}/></a></div>
    </aside>
  </>;
}

function MatchRing({score,size=58}) {
  const reduced=useReducedMotion();
  const r=(size-9)/2;const len=2*Math.PI*r;
  return <div className="op-match-ring" style={{width:size,height:size}} title={`${score}% skill-based match`}>
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${score}% skill match`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e7f0e9" strokeWidth="5.5"/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={score>=75?'#31a978':score>=45?'#6fad80':'#e7ad65'} strokeWidth="5.5" strokeLinecap="round" strokeDasharray={len} transform={`rotate(-90 ${size/2} ${size/2})`} initial={reduced?false:{strokeDashoffset:len}} animate={{strokeDashoffset:len*(1-score/100)}} transition={{duration:1,ease:'easeOut'}}/>
    </svg><strong>{score}%</strong>
  </div>;
}

function JobCard({job,match,saved,applied,onSave,onDetails,onApply,index,layout}) {
  return <motion.article layout initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.97}} transition={{duration:.32,delay:Math.min(index*.025,.18)}} className={`op-job-card ${layout==='list'?'op-card-list':''}`}>
    <div className="op-job-top"><div className={`op-company-avatar op-tone-${job.tone}`}>{job.mark}</div><div className="op-company-info"><div>{job.company}{job.featured&&<span className="op-featured-badge"><Star size={10} fill="currentColor"/> Featured</span>}</div><small><MapPin size={12}/>{job.location} · {job.mode}</small></div>
      <button type="button" className={`op-save-circle ${saved?'op-saved':''}`} onClick={()=>onSave(job.id)} aria-label={`${saved?'Remove':'Save'} ${job.title}`} aria-pressed={saved} title={saved?'Remove saved job':'Save this opportunity'}>{saved?<BookmarkCheck size={18}/>:<Bookmark size={18}/>}</button>
    </div>
    <button type="button" className="op-job-title" onClick={()=>onDetails(job)}>{job.title} <ArrowUpRight size={16}/></button>
    <div className="op-job-submeta"><span className="op-type-pill">{job.type}</span><span><Wallet size={13}/>{job.pay}</span><span><GraduationCap size={13}/>{job.experience}</span></div>
    <p className="op-job-summary">{job.summary}</p>
    <div className="op-job-skills-caption">REQUIRED SKILLS <span>{match.present.length}/{job.required.length} matched</span></div>
    <div className="op-job-chips">{job.required.slice(0,4).map(s=><span key={s} className={match.present.includes(s)?'op-chip-match':'op-chip-miss'}>{match.present.includes(s)&&<Check size={11}/>} {s}</span>)}{job.required.length>4&&<span className="op-chip-more">+{job.required.length-4}</span>}</div>
    <div className="op-job-foot"><div className="op-match-group"><MatchRing score={match.score}/><div><strong>{match.score>=80?'Excellent match':match.score>=60?'Good fit':match.score>=35?'Potential fit':'Growth opportunity'}</strong><small>Based on your skills</small></div></div><span className={`op-deadline ${job.deadline<=7?'op-deadline-soon':''}`}><CalendarClock size={14}/>{stageLabel(job.deadline)}</span></div>
    <div className="op-card-actions"><button type="button" className="op-button op-button-outline" onClick={()=>onDetails(job)}><Eye size={15}/> View details</button><button type="button" className="op-button op-button-primary" onClick={()=>onApply(job)} disabled={applied}>{applied?<><CheckCircle2 size={15}/> Applied (demo)</>:<>Apply now <ArrowUpRight size={15}/></>}</button></div>
  </motion.article>;
}

function FilterSidebar({filters,setFilters,onClear,found}) {
  const toggle=(key,value)=>setFilters(old=>({...old,[key]:old[key].includes(value)?old[key].filter(v=>v!==value):[...old[key],value]}));
  return <aside className="op-filter-panel" aria-label="Opportunity filters">
    <div className="op-filter-head"><div><SlidersHorizontal size={17}/><strong>Filters</strong></div><button type="button" onClick={onClear}>Reset all</button></div>
    <div className="op-filter-group"><div className="op-filter-title">OPPORTUNITY TYPE</div>{['Internship','Full-time','Part-time'].map(t=><label key={t} className="op-checkline"><input type="checkbox" checked={filters.types.includes(t)} onChange={()=>toggle('types',t)}/><span>{t}</span></label>)}</div>
    <div className="op-filter-group"><div className="op-filter-title">WORK ARRANGEMENT</div>{['Remote','Hybrid','On-site'].map(t=><label key={t} className="op-checkline"><input type="checkbox" checked={filters.modes.includes(t)} onChange={()=>toggle('modes',t)}/><span>{t}</span></label>)}</div>
    <div className="op-filter-group"><label className="op-filter-title" htmlFor="op-loc">LOCATION</label><div className="op-select-wrap"><MapPin size={16}/><select id="op-loc" value={filters.location} onChange={e=>setFilters(o=>({...o,location:e.target.value}))}>{['All locations',...LOCATIONS].map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={14}/></div></div>
    <div className="op-filter-group"><label className="op-filter-title" htmlFor="op-experience">EXPERIENCE LEVEL</label><div className="op-select-wrap"><GraduationCap size={16}/><select id="op-experience" value={filters.experience} onChange={e=>setFilters(o=>({...o,experience:e.target.value}))}>{['All levels','Student','Fresh graduate','1–2 years'].map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={14}/></div></div>
    <div className="op-filter-group"><label className="op-filter-title" htmlFor="op-skill">REQUIRED SKILL</label><div className="op-select-wrap"><Layers3 size={16}/><select id="op-skill" value={filters.skill} onChange={e=>setFilters(o=>({...o,skill:e.target.value}))}>{['Any skill',...SKILL_OPTIONS].map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={14}/></div></div>
    <div className="op-filter-group"><label className="op-filter-title" htmlFor="op-deadline">APPLICATION DEADLINE</label><div className="op-select-wrap"><Clock3 size={16}/><select id="op-deadline" value={filters.deadline} onChange={e=>setFilters(o=>({...o,deadline:e.target.value}))}>{['Anytime','Within 7 days','Within 14 days','Within 30 days'].map(l=><option key={l}>{l}</option>)}</select><ChevronDown size={14}/></div></div>
    <div className="op-filter-group op-score-filter"><label className="op-filter-title" htmlFor="op-minmatch">MINIMUM MATCH <b>{filters.minimum}%</b></label><input id="op-minmatch" type="range" min="0" max="100" step="10" value={filters.minimum} onChange={e=>setFilters(o=>({...o,minimum:Number(e.target.value)}))}/><div><span>0%</span><span>100%</span></div></div>
    <div className="op-filter-result"><CircleCheck size={16}/><span><b>{found}</b> opportunities match your filters</span></div>
  </aside>;
}

function DetailsModal({job,match,saved,applied,onSave,onApply,onClose}) {
  useEffect(()=>{
    const esc=e=>{if(e.key==='Escape') onClose();};document.addEventListener('keydown',esc);
    const prev=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.removeEventListener('keydown',esc);document.body.style.overflow=prev;};
  },[onClose]);
  return <motion.div className="op-modal-screen" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <motion.section role="dialog" aria-modal="true" aria-labelledby="op-detail-title" className="op-detail-modal" initial={{opacity:0,y:25,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:14,scale:.97}} transition={{duration:.23}}>
      <div className="op-modal-header"><span><Sparkles size={16}/> OPPORTUNITY DETAILS</span><button type="button" aria-label="Close job details" onClick={onClose}><X size={20}/></button></div>
      <div className="op-detail-head"><span className={`op-company-avatar op-tone-${job.tone}`}>{job.mark}</span><div><h2 id="op-detail-title">{job.title}</h2><p>{job.company} <span>·</span> {job.location} <span>·</span> {job.mode}</p></div><MatchRing size={78} score={match.score}/></div>
      <div className="op-detail-badges"><span><BriefcaseBusiness size={14}/>{job.type}</span><span><Wallet size={14}/>{job.pay}</span><span><Clock3 size={14}/>Deadline {humanDate(job.deadline)}</span><span><GraduationCap size={14}/>{job.experience}</span></div>
      <div className="op-detail-intro"><Sparkles size={19}/><div><strong>Why this matches you</strong><p>{match.present.length} of {job.required.length} required skills are in your profile. {match.missing.length?`You could strengthen your profile by learning ${match.missing.slice(0,2).join(' and ')}.`:'All required skills are listed in your profile.'} Match is a transparent skill-based estimate, not an AI or recruiter judgment.</p></div></div>
      <div className="op-detail-grid"><div><h3>About this opportunity</h3><p>{job.summary}</p><h3>What you will do</h3><ul>{job.responsibilities.map(x=><li key={x}>{x}</li>)}</ul><h3>Benefits & support</h3><div className="op-detail-tags">{job.benefits.map(x=><span key={x}><CheckCircle2 size={13}/>{x}</span>)}</div></div><aside><h3>Skill match</h3><div className="op-detail-mini-title">MATCHED REQUIREMENTS</div><div className="op-detail-tags">{match.present.length?match.present.map(x=><span className="op-tag-present" key={x}><Check size={12}/>{x}</span>):<small>None of the required skills are currently in your profile.</small>}</div><div className="op-detail-mini-title">MISSING REQUIREMENTS</div><div className="op-detail-tags">{match.missing.length?match.missing.map(x=><span className="op-tag-missing" key={x}>{x}</span>):<small>All required skills listed!</small>}</div><div className="op-detail-mini-title">PREFERRED SKILLS</div><div className="op-detail-tags">{job.preferred.map(x=><span key={x} className={match.prefPresent.includes(x)?'op-tag-present':''}>{x}</span>)}</div></aside></div>
      <div className="op-modal-footer"><button className="op-button op-button-outline" type="button" onClick={()=>onSave(job.id)}>{saved?<BookmarkCheck size={16}/>:<Bookmark size={16}/>} {saved?'Saved':'Save opportunity'}</button><button className="op-button op-button-primary" disabled={applied} type="button" onClick={()=>onApply(job)}>{applied?<><Check size={16}/> Applied (demo)</>:<>Apply now <ArrowUpRight size={16}/></>}</button></div>
    </motion.section>
  </motion.div>;
}

function ApplyModal({job,onCancel,onConfirm}) {
  useEffect(()=>{const esc=e=>{if(e.key==='Escape') onCancel();};document.addEventListener('keydown',esc);return()=>document.removeEventListener('keydown',esc);},[onCancel]);
  return <motion.div className="op-modal-screen op-apply-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onCancel();}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <motion.section className="op-apply-modal" role="dialog" aria-modal="true" aria-labelledby="op-apply-title" initial={{opacity:0,scale:.95,y:15}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:14}}><div className="op-apply-icon"><Send size={23}/></div><h2 id="op-apply-title">Save a demo application?</h2><p>You selected <b>{job.title}</b> at <b>{job.company}</b>. This is a fictional sample role. The action will create a local demo application record in your browser only—<b>no actual employer receives an application.</b></p><div className="op-apply-actions"><button className="op-button op-button-outline" onClick={onCancel}>Cancel</button><button className="op-button op-button-primary" onClick={onConfirm}><Check size={16}/> Mark as applied (demo)</button></div></motion.section>
  </motion.div>;
}

export function OpportunitiesContent() {
  const [skills,setSkills]=useState(readSkills);
  const [saved,setSaved]=useState(readSaved);
  const [applications,setApplications]=useState(readApplications);
  const [query,setQuery]=useState('');
  const [filters,setFilters]=useState(ALL_FILTERS);
  const [sort,setSort]=useState('Best match');
  const [layout,setLayout]=useState('grid');
  const [savedOnly,setSavedOnly]=useState(()=>new URLSearchParams(window.location.search).get('saved')==='1');
  const [detail,setDetail]=useState(null);
  const [applyJob,setApplyJob]=useState(null);
  const [toast,setToast]=useState('');
  const [filterOpen,setFilterOpen]=useState(false);
  const reduced=useReducedMotion();

  useEffect(()=>{const load=()=>{setSkills(readSkills());setSaved(readSaved());setApplications(readApplications());};window.addEventListener('storage',load);window.addEventListener('focus',load);return()=>{window.removeEventListener('storage',load);window.removeEventListener('focus',load);};},[]);
  useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),3400);return()=>clearTimeout(id);},[toast]);
  useEffect(()=>{if(!filterOpen)return;const prev=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=prev;};},[filterOpen]);
  const scored=useMemo(()=>OPPORTUNITIES.map(j=>({...j,match:matchDetails(j,skills)})),[skills]);
  const savedSet=useMemo(()=>new Set(saved),[saved]);
  const appliedSet=useMemo(()=>new Set(applications.map(a=>a.opportunityId||a.id)),[applications]);
  const visible=useMemo(()=>scored.filter(j=>{
    const term=query.trim().toLowerCase();
    if(term && ![j.title,j.company,j.location,j.mode,j.type,j.summary,...j.required,...j.preferred].some(x=>String(x).toLowerCase().includes(term)))return false;
    if(savedOnly&&!savedSet.has(j.id))return false;
    if(filters.types.length&&!filters.types.includes(j.type))return false;
    if(filters.modes.length&&!filters.modes.includes(j.mode))return false;
    if(filters.location!=='All locations'&&j.location!==filters.location)return false;
    if(filters.experience!=='All levels'&&j.experience!==filters.experience)return false;
    if(filters.skill!=='Any skill'&&!j.required.includes(filters.skill))return false;
    const limit=filters.deadline==='Within 7 days'?7:filters.deadline==='Within 14 days'?14:filters.deadline==='Within 30 days'?30:Infinity;
    if(j.deadline>limit || j.match.score<filters.minimum)return false;
    return true;
  }).sort((a,b)=>sort==='Latest'?a.posted-b.posted:sort==='Deadline'?a.deadline-b.deadline:b.match.score-a.match.score||a.deadline-b.deadline),[scored,query,savedOnly,savedSet,filters,sort]);
  const activeFilters=filters.types.length+filters.modes.length+(filters.location!=='All locations'?1:0)+(filters.experience!=='All levels'?1:0)+(filters.skill!=='Any skill'?1:0)+(filters.deadline!=='Anytime'?1:0)+(filters.minimum>0?1:0)+(savedOnly?1:0);
  const topMatch=scored.reduce((max,j)=>Math.max(max,j.match.score),0);
  const clearAll=()=>{setFilters(ALL_FILTERS);setSavedOnly(false);setQuery('');};
  const toggleSaved=id=>{const isSaved=savedSet.has(id);const next=isSaved?saved.filter(x=>x!==id):[...saved,id];setSaved(next);safeSet(KEY_SAVED,next);window.dispatchEvent(new Event('careerlens:opportunities-updated'));setToast(isSaved?'Removed from saved opportunities':'Opportunity added to Saved Jobs');};
  const confirmApply=()=>{if(!applyJob)return;const job=applyJob;const next=[...applications,{id:`demo-${job.id}`,opportunityId:job.id,title:job.title,company:job.company,status:'Applied',appliedAt:new Date().toISOString(),source:'careerlens-demo'}];setApplications(next);safeSet(KEY_APPLIED,next);setApplyJob(null);setToast('Demo application saved in this browser — not sent to an employer');};
  const openApply=job=>{setDetail(null);if(appliedSet.has(job.id)){setToast('Already marked as applied in this demo');return;}setApplyJob(job);};
  const exportResults=()=>{const headers=['Role','Company','Type','Work mode','Location','Match %','Deadline','Required skills'];const esc=x=>`"${String(x).replace(/"/g,'""')}"`;const rows=visible.map(j=>[j.title,j.company,j.type,j.mode,j.location,j.match.score,humanDate(j.deadline),j.required.join('; ')]);const csv=[headers,...rows].map(r=>r.map(esc).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='CareerLens_Opportunities_Demo.csv';a.click();URL.revokeObjectURL(url);setToast('Demo opportunities exported as CSV');};
  return <div className="op-content">
    <motion.div className="op-headline" initial={reduced?false:{opacity:0,y:13}} animate={{opacity:1,y:0}}><div><div className="op-kicker">YOUR CAREER WORKSPACE <span>/</span> DISCOVER</div><h1>Explore Opportunities <span>✳</span></h1><p>Discover roles that connect to your strengths—and see exactly what to grow next.</p></div><button type="button" className="op-button op-button-secondary op-export" onClick={exportResults}><ExternalLink size={15}/> Export results</button></motion.div>
    <section className="op-hero"><div className="op-hero-copy"><span className="op-hero-eyebrow"><span className="op-hero-pulse"/> SMARTER SEARCH. BRIGHTER FUTURES.</span><h2>The right opportunity<br/>starts with <em>your skills.</em></h2><p>One workspace to explore internships, discover your fit, and build the career you've been working toward.</p><a href="#op-discover" className="op-hero-cta">Explore your matches <ArrowRight size={17}/></a></div><div className="op-hero-art" aria-hidden="true"><span className="op-radar-ring op-ring-one"/><span className="op-radar-ring op-ring-two"/><span className="op-radar-ring op-ring-three"/><span className="op-hero-radar"><Compass size={36}/></span><span className="op-floating-chip op-chip-top"><Sparkles size={14}/> SKILLS FIRST</span><span className="op-floating-chip op-chip-bottom"><CheckCircle2 size={14}/> Better matches</span><span className="op-hero-star op-star-one">✳</span><span className="op-hero-star op-star-two">✦</span></div></section>
    <section className="op-stats" aria-label="Opportunity overview"><div className="op-stat op-stat-primary"><span className="op-stat-icon"><BriefcaseBusiness size={20}/></span><small>Available opportunities</small><strong>{OPPORTUNITIES.length.toString().padStart(2,'0')}</strong><span>Curated demo listings</span></div><div className="op-stat"><span className="op-stat-icon op-stat-lime"><Target size={20}/></span><small>Best skill match</small><strong>{topMatch}%</strong><span>Based on My Skills</span></div><div className="op-stat"><span className="op-stat-icon op-stat-peach"><Bookmark size={20}/></span><small>Saved jobs</small><strong>{saved.length.toString().padStart(2,'0')}</strong><span>In your local collection</span></div><div className="op-stat"><span className="op-stat-icon op-stat-violet"><Send size={20}/></span><small>Demo applications</small><strong>{applications.length.toString().padStart(2,'0')}</strong><span>Not real submissions</span></div></section>
    <section id="op-discover" className="op-discovery"><div className="op-discover-heading"><div><span className="op-section-kicker">01 / OPPORTUNITY EXPLORER</span><h2>Find your next big move.</h2><p>Search, compare and shortlist opportunities that suit you.</p></div><div className="op-results-pill"><span/> {visible.length} result{visible.length!==1?'s':''} found</div></div>
      <div className="op-searchbar"><Search size={21}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search jobs, internships, companies or skills..." aria-label="Search opportunities" />{query&&<button type="button" className="op-clear-search" aria-label="Clear search" onClick={()=>setQuery('')}><X size={16}/></button>}<button className="op-search-button" type="button" onClick={()=>document.getElementById('op-results')?.scrollIntoView({behavior:'smooth',block:'start'})}>View results <ArrowRight size={16}/></button></div>
      <div className="op-quick-row"><div className="op-quick-left"><span>QUICK FIND</span>{[['All roles',null],['Internships','Internship'],['Full-time','Full-time'],['Part-time','Part-time']].map(([label,value])=><button key={label} type="button" onClick={()=>setFilters(o=>({...o,types:value?[value]:[]}))} className={(value?filters.types.length===1&&filters.types[0]===value:filters.types.length===0)?'op-quick-active':''}>{label}</button>)}</div><button type="button" className={`op-saved-toggle ${savedOnly?'op-saved-toggle-on':''}`} aria-pressed={savedOnly} onClick={()=>setSavedOnly(s=>!s)}><Bookmark size={15}/> Saved only <span>{saved.length}</span></button></div>
      <div className="op-explorer-grid">
        <div className={`op-filter-column ${filterOpen?'op-filter-open':''}`}><div className="op-mobile-filter-head"><strong>Filter opportunities</strong><button onClick={()=>setFilterOpen(false)} aria-label="Close filters"><X size={21}/></button></div><FilterSidebar filters={filters} setFilters={setFilters} onClear={clearAll} found={visible.length}/><div className="op-mobile-filter-bottom"><button className="op-button op-button-primary" onClick={()=>setFilterOpen(false)}>Show {visible.length} results <ArrowRight size={15}/></button></div></div>
        {filterOpen&&<button type="button" className="op-filter-backdrop" aria-label="Close filter drawer" onClick={()=>setFilterOpen(false)}/>}
        <div id="op-results" className="op-results-column"><div className="op-results-toolbar"><div className="op-results-copy"><strong>Recommended for you</strong><p>{savedOnly?'Your bookmarked roles': 'Ranked by your self-assessed skills'}</p></div><div className="op-results-controls"><button type="button" className="op-mobile-filter-btn" onClick={()=>setFilterOpen(true)}><Filter size={16}/> Filters {activeFilters>0&&<span>{activeFilters}</span>}</button><label className="op-sort-wrap">Sort by <select aria-label="Sort opportunities" value={sort} onChange={e=>setSort(e.target.value)}><option>Best match</option><option>Latest</option><option>Deadline</option></select><ChevronDown size={14}/></label><div className="op-view-modes"><button type="button" className={layout==='grid'?'op-view-active':''} aria-label="Grid view" aria-pressed={layout==='grid'} onClick={()=>setLayout('grid')}><Grid2X2 size={18}/></button><button type="button" className={layout==='list'?'op-view-active':''} aria-label="List view" aria-pressed={layout==='list'} onClick={()=>setLayout('list')}><List size={18}/></button></div></div></div>
          {activeFilters>0&&<div className="op-active-filters"><span>{activeFilters} filter{activeFilters===1?'':'s'} active</span><button type="button" onClick={clearAll}><RotateCcw size={12}/> Clear all</button></div>}
          <div className={`op-jobs-grid ${layout==='list'?'op-jobs-list':''}`}><AnimatePresence mode="popLayout">{visible.map((job,index)=><JobCard key={job.id} index={index} job={job} match={job.match} saved={savedSet.has(job.id)} applied={appliedSet.has(job.id)} onSave={toggleSaved} onDetails={setDetail} onApply={openApply} layout={layout}/>)}</AnimatePresence></div>
          {!visible.length&&<div className="op-empty-state"><div><Search size={29}/></div><h3>{savedOnly?'No saved opportunities yet':'No opportunities found'}</h3><p>{savedOnly?'Save a role using the bookmark icon, then find it here.':'Try different keywords or remove a few filters to see more roles.'}</p><button type="button" className="op-button op-button-primary" onClick={clearAll}><RotateCcw size={16}/> Show all opportunities</button></div>}
          <div className="op-demo-note"><ShieldCheck size={18}/><p><b>CareerLens preview data:</b> These companies and openings are fictional examples, not verified vacancies. Match percentages are deterministic estimates from your My Skills profile (80% required, 20% preferred, considering skill presence and self-rated level), not AI or recruiter evaluations. Save and Apply actions are local demos only.</p></div>
        </div>
      </div>
    </section>
    <section className="op-bottom-banner"><div className="op-bottom-symbol"><TrendingUp size={25}/></div><div><strong>Want better matches? Build a stronger skill profile.</strong><p>Update your strengths in My Skills, then come back to watch match scores change.</p></div><a href="/my-skills" className="op-button op-button-primary">Manage My Skills <ArrowRight size={16}/></a></section>
    <CareerFooter />
    <AnimatePresence>{detail&&<DetailsModal key={detail.id} job={detail} match={scored.find(j=>j.id===detail.id)?.match||matchDetails(detail,skills)} saved={savedSet.has(detail.id)} applied={appliedSet.has(detail.id)} onClose={()=>setDetail(null)} onSave={toggleSaved} onApply={openApply}/>}</AnimatePresence>
    <AnimatePresence>{applyJob&&<ApplyModal key={applyJob.id} job={applyJob} onCancel={()=>setApplyJob(null)} onConfirm={confirmApply}/>}</AnimatePresence>
    <AnimatePresence>{toast&&<motion.div role="status" className="op-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}><CheckCircle2 size={18}/>{toast}<button type="button" aria-label="Dismiss notification" onClick={()=>setToast('')}><X size={14}/></button></motion.div>}</AnimatePresence>
  </div>;
}

/** Standalone shell now; later render only <OpportunitiesContent /> in shared DashboardLayout. */
export default function Opportunities() {
  const {
  open: mobile,
  setOpen: setMobile
} = useCareerSidebar(); const [notice,setNotice]=useState('');
  const [savedCount,setSavedCount]=useState(()=>readSaved().length);
  useEffect(()=>{const sync=()=>setSavedCount(readSaved().length);window.addEventListener('storage',sync);window.addEventListener('focus',sync);window.addEventListener('careerlens:opportunities-updated',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('focus',sync);window.removeEventListener('careerlens:opportunities-updated',sync);};},[]);
  useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),3100);return()=>clearTimeout(t);},[notice]);
  useEffect(()=>{if(!mobile)return;const fn=e=>{if(e.key==='Escape')setMobile(false);};document.addEventListener('keydown',fn);return()=>document.removeEventListener('keydown',fn);},[mobile]);
  return <div className="op-page">
<CareerSidebar
  open={mobile}
  onClose={() => setMobile(false)}
/>

<div className={`op-main ${
  mobile ? 'clw-main-open' : 'clw-main-closed'
}`}>
<header className="op-topbar"><div className="op-top-left">
<CareerMenuButton
  open={mobile}
  onClick={() => setMobile(prev => !prev)}
/>
<span>Workspace</span><ChevronRight size={14}/><b>Opportunities</b></div><div className="op-top-right"><span className="op-workspace-live"><i/> Student workspace</span><button type="button" className="op-bell-button" aria-label="Notifications (coming soon)" onClick={()=>setNotice('Notifications are coming soon')}><Bell size={19}/></button><span className="op-top-separator"/><span className="op-avatar">MT</span><span className="op-top-user"><strong>Md. Taher</strong><small>Student account</small></span><ChevronDown size={15}/></div></header><OpportunitiesContent/></div><AnimatePresence>{notice&&<motion.div role="status" className="op-toast op-shell-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}><CheckCircle2 size={18}/>{notice}</motion.div>}</AnimatePresence></div>;
}
