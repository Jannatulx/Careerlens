import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Award, BarChart3,
  Bell, BookOpen, Bookmark, BriefcaseBusiness, Check, CheckCheck, CheckCircle2,
  ChevronDown, ChevronRight, CircleDashed, Compass,
  Download, FileText, Filter, GraduationCap, LayoutDashboard, Lightbulb,
  LockKeyhole, Menu, Plus, Rocket, Search, Settings, ShieldCheck,
  Sparkles, Target, TrendingUp, UserRound, X, Zap,
} from 'lucide-react';
import careerLensLogo from '../../assets/logo.png';
import './SkillGap.css';
import CareerFooter from '../shared/CareerFooter';
import CareerSidebar, {
  CareerMenuButton,
  useCareerSidebar
} from '../shared/CareerSidebar';
// A transparent, configurable role-skill checklist. NOT an AI evaluation.
const CAREERS = {
  'MERN Developer': {
    subtitle: 'Build modern web applications from frontend to database.',
    category: 'Full-stack development',
    skills: [
      ['HTML', 'Low', 'Structure semantic pages', ['Semantic HTML', 'Forms and accessibility', 'Build a multipage site']],
      ['CSS', 'Low', 'Create responsive layouts', ['Flexbox and Grid', 'Responsive design', 'Build a responsive landing page']],
      ['JavaScript', 'High', 'Master modern JavaScript', ['Async/await and promises', 'ES modules', 'Complete a JavaScript mini project']],
      ['React', 'High', 'Build interactive interfaces', ['React hooks', 'Component composition', 'Build an interactive dashboard']],
      ['Node.js', 'High', 'Understand backend fundamentals', ['Node.js runtime and modules', 'Asynchronous APIs', 'Create a small backend service']],
      ['Express.js', 'High', 'Learn REST API development', ['Routing and middleware', 'Request validation', 'Create a REST CRUD API']],
      ['MongoDB', 'Medium', 'Work with document databases', ['Collections and schema design', 'Mongoose relationships', 'Connect your API to MongoDB']],
      ['REST API', 'High', 'Design and consume APIs', ['REST endpoints', 'HTTP methods and status codes', 'Test routes in Postman']],
      ['Authentication', 'High', 'Implement secure authentication', ['Password hashing', 'JWT and protected routes', 'Build login and registration']],
      ['Git & GitHub', 'Medium', 'Collaborate safely with Git', ['Commits and branching', 'Pull requests', 'Contribute to a shared project']],
      ['Deployment', 'Medium', 'Publish a full-stack project', ['Environment variables', 'Build and deploy frontend', 'Deploy a backend and connect DB']],
      ['Docker', 'Medium', 'Explore deployment basics', ['Images and containers', 'Write a Dockerfile', 'Run a sample service']],
    ],
  },
  'Frontend Developer': {
    subtitle: 'Create fast, accessible and delightful user interfaces.',
    category: 'Frontend development',
    skills: [
      ['HTML', 'High', 'Build accessible document structure', ['Semantic sections', 'Accessible forms', 'Audit a sample page']],
      ['CSS', 'High', 'Craft adaptive layouts', ['Grid and Flexbox', 'Responsive patterns', 'Advanced CSS transitions']],
      ['JavaScript', 'High', 'Write robust client-side logic', ['DOM and browser APIs', 'Async/await', 'Build interactive UI features']],
      ['React', 'High', 'Develop scalable React apps', ['Hooks and context', 'Reusable components', 'Build a production-like SPA']],
      ['TypeScript', 'High', 'Add reliable static types', ['Type fundamentals', 'React types', 'Convert a React feature']],
      ['Git & GitHub', 'Medium', 'Work in a team repository', ['Feature branches', 'Pull requests', 'Code review workflow']],
      ['REST API', 'Medium', 'Integrate backend services', ['Fetch and Axios', 'Loading/error states', 'Build an API-driven screen']],
      ['Figma', 'Medium', 'Translate designs into UI', ['Auto Layout', 'Design tokens', 'Implement a Figma screen']],
      ['Testing', 'Medium', 'Test user-facing features', ['Test fundamentals', 'Component testing', 'Write tests for a feature']],
      ['Deployment', 'Medium', 'Launch frontend applications', ['Production builds', 'Environment variables', 'Deploy an SPA']],
    ],
  },
  'Backend Developer': {
    subtitle: 'Design APIs and reliable services behind great products.',
    category: 'Backend development',
    skills: [
      ['JavaScript', 'High', 'Write server-side JavaScript', ['Async JavaScript', 'Error handling', 'Build a small service']],
      ['Node.js', 'High', 'Master Node.js fundamentals', ['Event loop', 'Modules', 'File and HTTP APIs']],
      ['Express.js', 'High', 'Build production-like APIs', ['Routing', 'Middleware', 'Validation and controllers']],
      ['MongoDB', 'High', 'Model and query data', ['Mongoose schemas', 'Indexes', 'Build CRUD operations']],
      ['REST API', 'High', 'Design consistent APIs', ['Resource design', 'Status codes', 'Document endpoints']],
      ['Authentication', 'High', 'Protect application access', ['Password hashing', 'JWT flows', 'Authorization']],
      ['SQL', 'Medium', 'Understand relational databases', ['SQL queries', 'Relationships', 'Design basic schemas']],
      ['Git & GitHub', 'Medium', 'Maintain reliable team workflows', ['Feature branches', 'Pull requests', 'Handle merge conflicts']],
      ['Docker', 'Medium', 'Package services for deployment', ['Containers', 'Dockerfiles', 'Local multi-service setup']],
      ['Testing', 'Medium', 'Verify backend behavior', ['Unit tests', 'API integration tests', 'Test failure scenarios']],
    ],
  },
  'Data Analyst': {
    subtitle: 'Turn data into clear insights and practical decisions.',
    category: 'Data & analytics',
    skills: [
      ['Excel', 'High', 'Analyze structured datasets', ['Formulas and pivot tables', 'Data cleaning', 'Build a report']],
      ['SQL', 'High', 'Query and transform datasets', ['Joins and filtering', 'Aggregations', 'Solve analysis queries']],
      ['Python', 'High', 'Automate analysis with Python', ['Python foundations', 'Pandas basics', 'Analyze a public dataset']],
      ['Statistics', 'High', 'Interpret patterns with statistics', ['Distributions', 'Hypothesis testing', 'Explain a result']],
      ['Power BI', 'Medium', 'Build interactive dashboards', ['Data modeling', 'DAX basics', 'Publish an interactive report']],
      ['Data Visualization', 'High', 'Communicate insights effectively', ['Choosing charts', 'Dashboard design', 'Tell a story with data']],
      ['Git & GitHub', 'Low', 'Version your work', ['Git basics', 'README files', 'Publish a portfolio project']],
      ['Communication', 'Medium', 'Explain analysis to stakeholders', ['Summaries', 'Clear presentations', 'Write key insights']],
    ],
  },
};

const EXAMPLE_SKILLS = [
  { id: 's1', name: 'JavaScript', category: 'Programming', level: 86 },
  { id: 's2', name: 'React', category: 'Frontend', level: 74 },
  { id: 's3', name: 'HTML', category: 'Frontend', level: 92 },
  { id: 's4', name: 'CSS', category: 'Frontend', level: 84 },
  { id: 's5', name: 'Node.js', category: 'Backend', level: 59 },
  { id: 's6', name: 'MongoDB', category: 'Database', level: 66 },
  { id: 's7', name: 'Python', category: 'Programming', level: 65 },
  { id: 's8', name: 'Git & GitHub', category: 'Tools', level: 76 },
  { id: 's9', name: 'Communication', category: 'Soft Skills', level: 81 },
];

const STORAGE_SKILLS = 'careerlens-demo-skills-v1'; // Shared with MySkills.jsx
const STORAGE_ROLE = 'careerlens-demo-target-role-v1';
const STORAGE_PROGRESS = 'careerlens-demo-learning-v1';
const normalize = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const percent = n => `${Math.max(0, Math.min(100, Math.round(n)))}%`;
const priorities = { High: 0, Medium: 1, Low: 2 };

function loadSkills() {
  try {
    const raw = localStorage.getItem(STORAGE_SKILLS);
    if (raw === null) return EXAMPLE_SKILLS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(s => s && typeof s.name === 'string').map(s => ({ ...s, level: Number.isFinite(Number(s.level)) ? Math.min(100, Math.max(0, Number(s.level))) : 0 }))
      : EXAMPLE_SKILLS;
  } catch { return EXAMPLE_SKILLS; }
}
function readRole() {
  try { const value = localStorage.getItem(STORAGE_ROLE); return CAREERS[value] ? value : 'MERN Developer'; }
  catch { return 'MERN Developer'; }
}
function readProgress() {
  try { const parsed = JSON.parse(localStorage.getItem(STORAGE_PROGRESS) || '{}'); return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}; }
  catch { return {}; }
}
function useClickOutside(callback) {
  const ref = useRef(null);
  useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) callback(); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [callback]);
  return ref;
}

const NAVIGATION = [
  [LayoutDashboard, 'Overview', '/dashboard'], [UserRound, 'My Profile', null],
  [FileText, 'Resume Analyzer', null], [BookOpen, 'My Skills', '/my-skills'],
  [Target, 'Skill Gap Analysis', '/skill-gap'], [BriefcaseBusiness, 'Opportunities', null],
  [Bookmark, 'Saved Jobs', null], [BarChart3, 'Career Analytics', null],
];

function Sidebar({ open, onClose, onComingSoon }) {
  return <>
    <AnimatePresence>{open && <motion.button type="button" aria-label="Close menu" className="sg-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/>}</AnimatePresence>
    <aside className={`sg-sidebar ${open ? 'sg-sidebar-open' : ''}`}>
      <a href="/" className="sg-brand" aria-label="CareerLens homepage">
        <span className="sg-brand-img"><img src={careerLensLogo} alt="" /></span>
        <span><strong>CareerLens</strong><small>Student workspace</small></span>
      </a>
      <div className="sg-side-label">WORKSPACE</div>
      <nav className="sg-nav" aria-label="Student navigation">
        {NAVIGATION.map(([Icon, label, href]) => href ?
          <a href={href} key={label} className={`sg-nav-link ${label === 'Skill Gap Analysis' ? 'sg-nav-current' : ''}`} aria-current={label === 'Skill Gap Analysis' ? 'page' : undefined} onClick={onClose}>
            <Icon size={18} strokeWidth={2}/><span>{label}</span>{label === 'Skill Gap Analysis' && <span className="sg-selected-dot"/>}
          </a> :
          <button key={label} type="button" className="sg-nav-link" onClick={() => { onComingSoon(label); onClose(); }}><Icon size={18}/><span>{label}</span></button>
        )}
      </nav>
      <div className="sg-side-footer">
        <div className="sg-side-label">ACCOUNT</div>
        <button type="button" className="sg-nav-link" onClick={() => onComingSoon('Settings')}><Settings size={18}/><span>Settings</span></button>
        <div className="sg-side-note"><Sparkles size={20}/><strong>Small steps. Big progress.</strong><p>Every new skill brings your next opportunity closer.</p><span>KEEP BUILDING <ArrowRight size={13}/></span></div>
      </div>
    </aside>
  </>;
}

function RadialScore({ score, large = false }) {
  const reduceMotion = useReducedMotion();
  const size = large ? 188 : 118;
  const r = large ? 76 : 47;
  const circumference = 2 * Math.PI * r;
  return <div className={`sg-radial ${large ? 'sg-radial-lg' : ''}`} style={{ width: size, height: size }}>
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size/2} cy={size/2} r={r} className="sg-ring-bg" strokeWidth={large ? 13 : 10}/>
      <motion.circle cx={size/2} cy={size/2} r={r} className="sg-ring-fill" strokeWidth={large ? 13 : 10} strokeLinecap="round" strokeDasharray={circumference} initial={reduceMotion ? false : { strokeDashoffset: circumference }} animate={{ strokeDashoffset: circumference * (1 - score/100) }} transition={{ duration: 1.25, ease: [0.16,1,0.3,1] }} transform={`rotate(-90 ${size/2} ${size/2})`}/>
    </svg>
    <div className="sg-radial-center"><strong>{score}%</strong><span>{large ? 'ROLE READINESS' : 'READY'}</span></div>
  </div>;
}

function SkillRow({ item, index, onAdd }) {
  const Icon = item.state === 'ready' ? CheckCheck : item.state === 'improve' ? TrendingUp : Plus;
  const status = item.state === 'ready' ? 'On track' : item.state === 'improve' ? 'Improve' : 'Missing';
  return <motion.div layout className="sg-skill-row" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:.97 }} transition={{ delay: Math.min(index*.035,.28), duration:.3 }}>
    <span className={`sg-skill-glyph sg-glyph-${item.state}`}><Icon size={18}/></span>
    <div className="sg-skill-copy"><strong>{item.name}</strong><span>{item.priority} priority · {item.summary}</span></div>
    <div className="sg-skill-progress"><div className="sg-meter-track"><motion.div className={`sg-meter-fill sg-meter-${item.state}`} initial={{ width: 0 }} animate={{ width: percent(item.level) }} transition={{ delay:.05 + index*.035, duration:.65 }}/></div><small>{item.level}%</small></div>
    <span className={`sg-status-pill sg-pill-${item.state}`}>{status}</span>
    {item.state === 'missing' && <button className="sg-row-add" onClick={() => onAdd(item)} aria-label={`Add ${item.name} to your skills`} title={`Add ${item.name} to My Skills`}><Plus size={17}/></button>}
  </motion.div>;
}

function LearningCard({ item, index, onToggle, learning, expanded, onExpand, onAdd }) {
  const key = normalize(item.name);
  const active = !!learning[key];
  return <motion.article layout className={`sg-learn-item ${expanded ? 'sg-learn-expanded' : ''}`} initial={{ opacity:0, y:13 }} animate={{ opacity:1, y:0 }} transition={{ delay:index*.055 }}>
    <div className="sg-learn-top">
      <span className={`sg-priority-icon sg-priority-${item.priority.toLowerCase()}`}>{String(index + 1).padStart(2, '0')}</span>
      <div className="sg-learn-info"><div className="sg-learn-heading"><strong>{item.name}</strong><span className={`sg-priority-badge sg-priority-${item.priority.toLowerCase()}`}>{item.priority}</span></div><p>{item.summary}</p></div>
      <button type="button" className="sg-expand-btn" aria-label={`View learning steps for ${item.name}`} aria-expanded={expanded} onClick={onExpand}><ChevronDown size={19}/></button>
    </div>
    <AnimatePresence initial={false}>{expanded && <motion.div className="sg-learn-details" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.25 }}>
      <div className="sg-learn-details-inner"><div className="sg-detail-title"><GraduationCap size={16}/> Recommended learning steps</div>
        <ol>{item.steps.map(step => <li key={step}>{step}</li>)}</ol>
        <div className="sg-learn-actions">
          <button type="button" className={`sg-learning-btn ${active ? 'sg-learning-active' : ''}`} onClick={() => onToggle(key)}>{active ? <Check size={15}/> : <BookOpen size={15}/>} {active ? 'Added to learning plan' : 'Add to learning plan'}</button>
          {item.state === 'missing' && <button type="button" className="sg-learning-link" onClick={() => onAdd(item)}>Add skill to profile <ArrowUpRight size={14}/></button>}
        </div>
      </div>
    </motion.div>}</AnimatePresence>
  </motion.article>;
}

// Exportable content component: later the team can use it inside DashboardLayout.
export function SkillGapContent() {
  const [skills, setSkills] = useState(loadSkills);
  const [role, setRole] = useState(readRole);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [learning, setLearning] = useState(readProgress);
  const [expanded, setExpanded] = useState('Express.js');
  const [notice, setNotice] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const roleMenuRef = useClickOutside(() => setDropdown(false));
  const skillsAnchor = useRef(null);

  useEffect(() => {
    const refresh = () => setSkills(loadSkills());
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('focus', refresh); };
  }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE_ROLE, role); } catch {} }, [role]);
  useEffect(() => { try { localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(learning)); } catch {} }, [learning]);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(''), 3500); return () => clearTimeout(t); }, [notice]);

  const items = useMemo(() => CAREERS[role].skills.map(([name, priority, summary, steps]) => {
    const found = skills.find(s => normalize(s.name) === normalize(name));
    const level = found ? found.level : 0;
    return { name, priority, summary, steps, level,
      state: !found ? 'missing' : level >= 70 ? 'ready' : 'improve' };
  }), [role, skills]);
  const have = items.filter(s => s.state !== 'missing');
  const ready = items.filter(s => s.state === 'ready');
  const need = items.filter(s => s.state === 'missing');
  const improve = items.filter(s => s.state === 'improve');
  const gaps = [...need, ...improve].sort((a,b) => priorities[a.priority] - priorities[b.priority] || (a.state === 'missing' ? -1 : 1));
  // Self-assessed estimate: skill level contribution; a missing skill scores zero.
  const readiness = Math.round(items.reduce((sum,s) => sum + s.level, 0) / items.length);
  const coverage = Math.round(have.length / items.length * 100);
  const filtered = items.filter(s => (filter === 'All' || (filter === 'Have' && s.state !== 'missing') || (filter === 'Improve' && s.state === 'improve') || (filter === 'Missing' && s.state === 'missing')) && s.name.toLowerCase().includes(search.trim().toLowerCase()));
  const completedLearning = Object.values(learning).filter(Boolean).length;

  function addSkill(item) {
    if (skills.some(s => normalize(s.name) === normalize(item.name))) { setNotice(`${item.name} is already on your profile`); return; }
    const category = ['React','HTML','CSS','TypeScript','Figma'].includes(item.name) ? 'Frontend' : ['Node.js','Express.js','REST API','Authentication','Deployment','Docker','Testing'].includes(item.name) ? 'Backend' : ['MongoDB','SQL','Power BI'].includes(item.name) ? 'Database' : 'Tools';
    const next = [...skills, { id: (globalThis.crypto?.randomUUID?.() || `skill-${Date.now()}`), name:item.name, category, level:25, tint:'green', updated:new Date().toISOString().slice(0,10) }];
    setSkills(next);
    try { localStorage.setItem(STORAGE_SKILLS, JSON.stringify(next)); } catch {}
    setNotice(`${item.name} added to My Skills at 25%. You can edit its level there.`);
  }
  function downloadPlan() {
    const lines = [`CAREERLENS — SKILL GAP LEARNING ROADMAP`, `Target role: ${role}`, `Skill readiness (self-assessed): ${readiness}%`, `Skills listed: ${have.length} / ${items.length}`, '', ...gaps.map((s,i) => `${i+1}. ${s.name} (${s.priority} priority, ${s.state === 'missing' ? 'Missing' : 'Improve'})\n   ${s.summary}\n   - ${s.steps.join('\n   - ')}`), '', 'Note: This is a self-assessment based on a sample role checklist, not an AI-generated score.'];
    const blob = new Blob([lines.join('\n')], { type:'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CareerLens-${role.replace(/\W+/g,'-')}-Roadmap.txt`;
    document.body.append(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    setNotice('Your learning roadmap has been downloaded.');
  }
  return <div className="sg-content">
    <motion.div className="sg-page-heading" initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}>
      <div><div className="sg-breadcrumb">YOUR CAREER WORKSPACE <span>/</span> GROWTH ROADMAP</div><h1>Skill Gap Analysis <span>✳</span></h1><p>See how your current skills connect to the career you want.</p></div>
      <button type="button" className="sg-btn sg-btn-outline sg-export-top" onClick={downloadPlan}><Download size={17}/> Export roadmap</button>
    </motion.div>

    <section className="sg-hero">
      <div className="sg-hero-left"><div className="sg-hero-eyebrow"><span className="sg-hero-pulse"/><Sparkles size={14}/> YOUR NEXT CHAPTER STARTS HERE</div>
        <h2>Turn skill gaps into<br/><em>growth opportunities.</em></h2>
        <p>Choose a role, understand where you stand, and follow a clear path to your next milestone.</p>
        <button className="sg-hero-cta" type="button" onClick={() => skillsAnchor.current?.scrollIntoView({ behavior:'smooth', block:'start' })}>Explore my skill gaps <ArrowRight size={17}/></button>
      </div>
      <div className="sg-hero-art" aria-hidden="true"><div className="sg-hero-orbit sg-orbit-1"/><div className="sg-hero-orbit sg-orbit-2"/><div className="sg-hero-orbit sg-orbit-3"/><div className="sg-hero-core"><Target size={39}/></div><div className="sg-hero-chip sg-chip-top"><span>✦</span> NEXT MILESTONE</div><div className="sg-hero-chip sg-chip-bottom"><CheckCircle2 size={15}/> Skills in motion</div><div className="sg-hero-spark sg-spark-a">✳</div><div className="sg-hero-spark sg-spark-b">✦</div></div>
    </section>

    <div className="sg-intro-row">
      <div className="sg-intro-copy"><div className="sg-eyebrow">01 / CHOOSE YOUR PATH</div><h2>Where do you want to go?</h2><p>Your roadmap updates instantly when you switch careers.</p></div>
      <div className="sg-role-select-container" ref={roleMenuRef}>
        <button type="button" className="sg-role-picker" aria-haspopup="listbox" aria-expanded={dropdown} onClick={() => setDropdown(x=>!x)}><span className="sg-role-icon"><Compass size={20}/></span><span><small>YOUR TARGET ROLE</small><strong>{role}</strong></span><ChevronDown size={18} className={dropdown?'sg-chevron-active':''}/></button>
        <AnimatePresence>{dropdown && <motion.div className="sg-role-menu" role="listbox" initial={{ opacity:0, y:-7 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-7 }} transition={{ duration:.16 }}>{Object.keys(CAREERS).map(r => <button type="button" key={r} role="option" aria-selected={r===role} onClick={() => { setRole(r); setExpanded(''); setFilter('All'); setSearch(''); setDropdown(false); }}><span><strong>{r}</strong><small>{CAREERS[r].category}</small></span>{r===role && <Check size={17}/>}</button>)}</motion.div>}</AnimatePresence>
      </div>
    </div>

    <div className="sg-stats-grid">
      <article className="sg-stat sg-stat-featured"><span className="sg-stat-icon sg-icon-mint"><Target size={21}/></span><span className="sg-stat-label">Role readiness</span><strong>{readiness}%</strong><span className="sg-stat-foot"><TrendingUp size={13}/> Skill-level estimate</span></article>
      <article className="sg-stat"><span className="sg-stat-icon sg-icon-lime"><CheckCheck size={21}/></span><span className="sg-stat-label">Skills you have</span><strong>{have.length.toString().padStart(2,'0')}<small> / {items.length}</small></strong><span className="sg-stat-foot">{coverage}% of role skills listed</span></article>
      <article className="sg-stat"><span className="sg-stat-icon sg-icon-peach"><CircleDashed size={21}/></span><span className="sg-stat-label">Skills to acquire</span><strong>{need.length.toString().padStart(2,'0')}</strong><span className="sg-stat-foot">Not in your profile yet</span></article>
      <article className="sg-stat"><span className="sg-stat-icon sg-icon-lavender"><Rocket size={21}/></span><span className="sg-stat-label">Skills to improve</span><strong>{improve.length.toString().padStart(2,'0')}</strong><span className="sg-stat-foot">Below 70% self-rating</span></article>
    </div>

    <div className="sg-dashboard-grid">
      <div className="sg-primary-column">
        <section className="sg-panel sg-readiness-panel"><div className="sg-panel-heading"><div><span className="sg-eyebrow">02 / READINESS OVERVIEW</span><h2>Your career readiness</h2><p>A personalized snapshot based on your saved skills.</p></div><span className="sg-panel-symbol"><BarChart3 size={19}/></span></div>
          <div className="sg-readiness-detail"><RadialScore score={readiness} large/><div className="sg-readiness-right"><span className="sg-readiness-tag"><Sparkles size={14}/> YOUR GROWTH SNAPSHOT</span><h3>{readiness >= 80 ? 'Almost there — keep going!' : readiness >= 55 ? 'You have a strong foundation.' : 'Every expert starts somewhere.'}</h3><p>{have.length} role skills on your profile. Focus on {gaps.length} skill {gaps.length === 1 ? 'area' : 'areas'} to move forward.</p>
            <div className="sg-legend"><span><i className="sg-legend-green"/> On track · {ready.length}</span><span><i className="sg-legend-gold"/> Improve · {improve.length}</span><span><i className="sg-legend-gray"/> Missing · {need.length}</span></div>
          </div></div>
          <div className="sg-coverage-line"><div><span>Required skill coverage</span><strong>{coverage}%</strong></div><div className="sg-coverage-track"><motion.div initial={{ width:0 }} animate={{ width:percent(coverage) }} transition={{ duration:.8 }}/></div><small>Skill coverage counts names present on your profile. Readiness also considers your self-rated proficiency.</small></div>
        </section>

        <section className="sg-panel sg-matrix-panel" ref={skillsAnchor}><div className="sg-panel-heading"><div><span className="sg-eyebrow">03 / SKILLS BREAKDOWN</span><h2>What you have. What you need.</h2><p>Compare your skill profile with the {role} role checklist.</p></div><span className="sg-count-badge">{items.length} skills</span></div>
          <div className="sg-matrix-toolbar"><div className="sg-search"><Search size={17}/><input aria-label="Search required skills" placeholder="Search a required skill..." value={search} onChange={e=>setSearch(e.target.value)} />{search && <button type="button" onClick={()=>setSearch('')} aria-label="Clear search"><X size={15}/></button>}</div></div>
          <div className="sg-filters" role="group" aria-label="Filter skill status">{[['All','All skills',items.length], ['Have','You have',have.length], ['Improve','Needs practice',improve.length], ['Missing','Missing',need.length]].map(([key,label,count])=><button type="button" key={key} className={filter===key?'sg-filter-on':''} onClick={()=>setFilter(key)}>{label}<span>{count}</span></button>)}</div>
          <div className="sg-matrix-labels"><span>REQUIRED SKILL</span><span>YOUR LEVEL</span><span>STATUS</span></div>
          <AnimatePresence mode="popLayout"><div className="sg-skills-list" key={`${role}-${filter}-${search}`}>{filtered.map((item,index)=><SkillRow key={item.name} item={item} index={index} onAdd={addSkill}/>)}{!filtered.length && <div className="sg-empty"><Search size={24}/><strong>No skills found</strong><p>Try changing the search or category.</p><button type="button" onClick={()=>{setFilter('All');setSearch('');}}>Reset filters</button></div>}</div></AnimatePresence>
          <div className="sg-matrix-foot"><ShieldCheck size={16}/><p>Levels are self-assessed and taken from My Skills. Missing skills show 0% until you add them.</p><a href="/my-skills">Manage my skills <ArrowUpRight size={14}/></a></div>
        </section>
      </div>

      <aside className="sg-secondary-column">
        <section className="sg-roadmap sg-panel"><div className="sg-panel-heading"><div><span className="sg-eyebrow">04 / YOUR ACTION PLAN</span><h2>Learning roadmap</h2><p>Prioritized steps to close your gaps.</p></div><span className="sg-panel-symbol"><GraduationCap size={20}/></span></div>
          <div className="sg-plan-banner"><div className="sg-plan-icon"><Zap size={19}/></div><div><strong>{gaps.length ? `${gaps.length} focus areas identified` : 'Your checklist is on track!'}</strong><p>{gaps.length ? 'Start with high-priority foundations.' : 'Keep developing your strengths.'}</p></div></div>
          <div className="sg-roadmap-items">{gaps.slice(0,7).map((item,index)=><LearningCard key={`${role}-${item.name}`} item={item} index={index} expanded={expanded===item.name} onExpand={()=>setExpanded(expanded===item.name?'':item.name)} learning={learning} onToggle={key=>setLearning(old=>({...old,[key]:!old[key]}))} onAdd={addSkill}/>)}{!gaps.length && <div className="sg-no-gaps"><Award size={30}/><strong>Great progress!</strong><p>All required skills are present with at least 70% self-rating.</p></div>}</div>
          <div className="sg-roadmap-footer"><div><CheckCircle2 size={17}/><span>{completedLearning} learning items saved</span></div><button onClick={downloadPlan}>Download plan <Download size={15}/></button></div>
        </section>
        <section className="sg-mentor-card"><div className="sg-mentor-top"><span><Lightbulb size={20}/></span> CAREERLENS INSIGHT</div><h3>Learn it. Build it.<br/>Show it.</h3><p>A skill becomes valuable when you can demonstrate it. Turn every new topic into a small portfolio project.</p><div className="sg-mentor-footer"><span>Keep moving forward</span><ArrowUpRight size={19}/></div><div className="sg-mentor-decoration" aria-hidden="true">✳</div></section>
        <section className="sg-footnote"><LockKeyhole size={17}/><p><strong>About this analysis</strong>This is an illustrative, rule-based estimate using your self-rated My Skills data and predefined role checklists. No AI API or recruiter validation is used.</p></section>
      </aside>
    </div>
    <div className="sg-bottom-callout"><div className="sg-bottom-icon"><Compass size={22}/></div><div><strong>Ready to take the next step?</strong><p>Update your skills as you learn to watch the gap close.</p></div><a className="sg-btn sg-btn-primary" href="/my-skills">Go to My Skills <ArrowRight size={16}/></a></div>
    <CareerFooter />
    <AnimatePresence>{notice && <motion.div role="status" className="sg-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}><CheckCircle2 size={17}/>{notice}<button type="button" aria-label="Dismiss notification" onClick={()=>setNotice('')}><X size={14}/></button></motion.div>}</AnimatePresence>
  </div>;
}

// Standalone shell for now. To use the team's shared sidebar later, render only <SkillGapContent />.
export default function SkillGap() {
  const {
  open: menuOpen,
  setOpen: setMenuOpen
} = useCareerSidebar();
  const [toast, setToast] = useState('');
  useEffect(() => { if (!menuOpen) return; const close = e=>{if(e.key==='Escape') setMenuOpen(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close); }, [menuOpen]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),3200);return()=>clearTimeout(t);},[toast]);
  return <div className="sg-app">
<CareerSidebar
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
/>

<div className={`sg-app-main ${
  menuOpen ? 'clw-main-open' : 'clw-main-closed'
}`}>

    <header className="sg-topbar"><div className="sg-top-left">
<CareerMenuButton
  open={menuOpen}
  onClick={() => setMenuOpen(prev => !prev)}
/>
<span>Workspace</span><ChevronRight size={14}/><strong>Skill Gap Analysis</strong></div><div className="sg-top-right"><span className="sg-active-workspace"><i/> Student workspace</span><button className="sg-top-bell" aria-label="Notifications" title="Notifications coming soon" onClick={()=>setToast('Notifications coming soon')}><Bell size={18}/></button><span className="sg-top-divider"/><span className="sg-avatar">MT</span><div className="sg-user"><strong>Md. Taher</strong><small>Student account</small></div><ChevronDown size={14} className="sg-user-chevron"/></div></header>
    <SkillGapContent/>
  </div><AnimatePresence>{toast && <motion.div role="status" className="sg-toast sg-shell-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}><CheckCircle2 size={17}/>{toast}<button type="button" aria-label="Dismiss notification" onClick={()=>setToast('')}><X size={14}/></button></motion.div>}</AnimatePresence></div>;
}
