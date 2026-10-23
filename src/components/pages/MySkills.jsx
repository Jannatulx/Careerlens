import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brandLogo from '../../assets/logo.png';;
import './MySkills.css';

// Self-assessed starter data. This is a UI demo; no backend or AI scoring is involved.
const INITIAL_SKILLS = [
  { id: 's1', name: 'JavaScript', category: 'Programming', level: 86, tint: 'gold', updated: '2026-10-02' },
  { id: 's2', name: 'React', category: 'Frontend', level: 74, tint: 'blue', updated: '2026-10-03' },
  { id: 's3', name: 'HTML', category: 'Frontend', level: 92, tint: 'orange', updated: '2026-09-22' },
  { id: 's4', name: 'CSS', category: 'Frontend', level: 84, tint: 'purple', updated: '2026-09-29' },
  { id: 's5', name: 'Node.js', category: 'Backend', level: 59, tint: 'green', updated: '2026-10-07' },
  { id: 's6', name: 'MongoDB', category: 'Database', level: 66, tint: 'teal', updated: '2026-10-04' },
  { id: 's7', name: 'Python', category: 'Programming', level: 65, tint: 'indigo', updated: '2026-09-24' },
  { id: 's8', name: 'Git & GitHub', category: 'Tools', level: 76, tint: 'coral', updated: '2026-10-06' },
  { id: 's9', name: 'Communication', category: 'Soft Skills', level: 81, tint: 'pink', updated: '2026-09-21' },
];
const CATEGORIES = ['All Skills', 'Programming', 'Frontend', 'Backend', 'Database', 'Tools', 'Soft Skills'];
const ROLES = {
  'MERN Developer': ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Git & GitHub'],
  'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git & GitHub'],
  'Backend Developer': ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Git & GitHub'],
};
const OPTIONS = ['JavaScript', 'React', 'HTML', 'CSS', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Git & GitHub', 'TypeScript', 'REST API', 'Docker', 'Figma', 'SQL', 'Communication', 'Problem Solving', 'Teamwork'];
const PALETTE = ['blue', 'green', 'purple', 'gold', 'orange', 'teal', 'pink', 'coral', 'indigo'];
const ICON_PATHS = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.7"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
  clipboard: <><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M9 5.5V3h6v2.5M8 11h8M8 15h5"/></>,
  chart: <><path d="M3 3v18h18M7 16l4-4 3 2 5-7"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9ZM10 21h4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M4 12 2 10l2-3 3 1 2-2V3h6v3l2 2 3-1 2 3-2 2 2 2-2 3-3-1-2 2v3H9v-3l-2-2-3 1-2-3 2-2Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
  chevron: <path d="m7 10 5 5 5-5"/>,
  check: <path d="m4 12 5 5L20 6"/>,
  close: <path d="M5 5 19 19M19 5 5 19"/>,
  edit: <><path d="m16 5 3 3M4 20l4.5-1 11-11a2 2 0 0 0-3-3l-11 11L4 20Z"/></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></>,
  bolt: <path d="m13 2-9 11h7l-1 9 10-12h-7V2Z"/>,
  sparkle: <><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/></>,
  trending: <path d="m3 17 7-7 4 4 7-8M15 6h6v6"/>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
  filter: <><path d="M4 7h16M7 12h10M10 17h4"/></>,
  logout: <><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 16l4-4-4-4M8 12h10"/></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  checkcircle: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></>,
};
function Icon({ name, size = 19, ...props }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{ICON_PATHS[name]}</svg>;
}
const levelName = (n) => n >= 80 ? 'Advanced' : n >= 55 ? 'Intermediate' : 'Beginner';
const today = () => new Date().toISOString().slice(0, 10);
const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const readSkills = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('careerlens-demo-skills-v1'));
    return Array.isArray(saved) && saved.every(x => x && typeof x.name === 'string' && typeof x.level === 'number') ? saved : INITIAL_SKILLS;
  } catch { return INITIAL_SKILLS; }
};
const formatDate = (d) => d ? new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';
const itemEnter = { hidden: { opacity: 0, y: 17 }, visible: { opacity: 1, y: 0, transition: { duration: .34 } } };

function Ring({ percent, size = 120, stroke = 10, children, track = '#e8f0eb' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return <div className="cl-ring" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <motion.circle cx={size / 2} cy={size / 2} r={r} stroke="#35a779" strokeWidth={stroke} strokeLinecap="round" fill="none" strokeDasharray={c} transform={`rotate(-90 ${size / 2} ${size / 2})`} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - percent / 100) }} transition={{ duration: 1.2, ease: 'easeOut' }} />
    </svg>
    <div className="cl-ring-inside">{children}</div>
  </div>;
}

const NAV = [
  { label: 'Dashboard', icon: 'grid', href: null },
  { label: 'My Profile', icon: 'user', href: null },
  { label: 'Resume Analyzer', icon: 'file', href: null },
  { label: 'My Skills', icon: 'layers', href: '/my-skills' },
  { label: 'Skill Gap', icon: 'target', href: null },
  { label: 'Opportunities', icon: 'briefcase', href: null },
  { label: 'Saved Jobs', icon: 'bookmark', href: null },
  { label: 'Applications', icon: 'clipboard', href: null },
  { label: 'Career Analytics', icon: 'chart', href: null },
];
function Sidebar({ close, comingSoon }) {
  return <>
    <a className="cl-brand" href="/" title="CareerLens — Home">
      <span className="cl-brand-symbol"><img src={brandLogo} alt="" /></span>
      <span><b>CareerLens</b><small>Student workspace</small></span>
    </a>
    <div className="cl-side-caption">WORKSPACE</div>
    <nav className="cl-sidenav" aria-label="Student navigation">
      {NAV.map(({ label, icon, href }) => href ?
        <a key={label} className="cl-navitem cl-navactive" aria-current="page" href={href} onClick={close}><Icon name={icon} size={19}/><span>{label}</span><span className="cl-navactive-dot" /></a> :
        <button key={label} className="cl-navitem" type="button" onClick={() => { comingSoon(label); close(); }}><Icon name={icon} size={19}/><span>{label}</span></button>
      )}
    </nav>
    <div className="cl-side-bottom">
      <div className="cl-side-caption">ACCOUNT</div>
      <button className="cl-navitem" onClick={() => comingSoon('Settings')}><Icon name="settings"/><span>Settings</span></button>
      <a className="cl-navitem" href="/"><Icon name="logout"/><span>Back to website</span></a>
      <div className="cl-sidebar-promo"><span className="cl-promo-icon"><Icon name="sparkle" size={19}/></span><b>Your growth starts here.</b><p>Every skill you build gets you closer to your next opportunity.</p><span>KEEP GROWING <Icon name="arrow" size={13}/></span></div>
    </div>
  </>;
}

function SkillModal({ editing, onClose, onSave, existing }) {
  const [name, setName] = useState(editing?.name || '');
  const [category, setCategory] = useState(editing?.category || 'Frontend');
  const [level, setLevel] = useState(editing?.level || 60);
  const [error, setError] = useState('');
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);
  const submit = (e) => {
    e.preventDefault();
    const cleaned = name.trim();
    if (!cleaned) { setError('Please enter a skill name.'); return; }
    if (existing.some(s => s.name.toLowerCase() === cleaned.toLowerCase() && s.id !== editing?.id)) { setError('This skill is already in your profile.'); return; }
    onSave({ id: editing?.id || makeId(), name: cleaned, category, level: Number(level), tint: editing?.tint || PALETTE[existing.length % PALETTE.length], updated: today() });
  };
  return <motion.div className="cl-modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section role="dialog" aria-modal="true" aria-labelledby="cl-modal-title" className="cl-modal" initial={{ opacity: 0, y: 22, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .2 }}>
      <div className="cl-modal-head"><div><span className="cl-kicker">YOUR SKILL PROFILE</span><h2 id="cl-modal-title">{editing ? 'Edit your skill' : 'Add a new skill'}</h2><p>Keep your strengths and proficiency up to date.</p></div><button className="cl-iconbutton" onClick={onClose} aria-label="Close modal"><Icon name="close"/></button></div>
      <form onSubmit={submit} className="cl-modal-form">
        <label htmlFor="cl-skill-name">Skill name</label>
        <input id="cl-skill-name" list="cl-skill-suggestions" autoFocus value={name} maxLength={42} onChange={e => { setName(e.target.value); setError(''); }} placeholder="e.g. TypeScript" />
        <datalist id="cl-skill-suggestions">{OPTIONS.map(s => <option key={s} value={s}/>)}</datalist>
        <label htmlFor="cl-skill-category">Category</label>
        <select id="cl-skill-category" value={category} onChange={e => setCategory(e.target.value)}>{CATEGORIES.slice(1).map(s => <option key={s}>{s}</option>)}</select>
        <div className="cl-modal-level"><label htmlFor="cl-skill-level">Self-assessed proficiency</label><span><b>{level}%</b> · {levelName(Number(level))}</span></div>
        <input id="cl-skill-level" aria-label="Proficiency percentage" type="range" min="1" max="100" value={level} onChange={e => setLevel(e.target.value)} style={{ '--value': `${level}%` }} />
        <div className="cl-range-labels"><span>Just starting</span><span>Confident</span><span>Highly proficient</span></div>
        {error && <p role="alert" className="cl-form-error">{error}</p>}
        <div className="cl-modal-actions"><button type="button" className="cl-btn cl-btn-outline" onClick={onClose}>Cancel</button><button className="cl-btn cl-btn-primary" type="submit"><Icon name="check" size={17}/>{editing ? 'Save changes' : 'Add skill'}</button></div>
      </form>
    </motion.section>
  </motion.div>;
}

function SkillCard({ skill, index, edit, remove }) {
  return <motion.article className="cl-skill-card" variants={itemEnter} layout>
    <div className="cl-skill-card-top"><div className={`cl-skill-icon cl-icon-${skill.tint || 'blue'}`}><span>{skill.name === 'Git & GitHub' ? 'G' : skill.name === 'JavaScript' ? 'JS' : skill.name === 'HTML' ? '5' : skill.name === 'CSS' ? '3' : skill.name === 'Communication' ? 'Co' : skill.name.slice(0, 2)}</span></div><div className="cl-skill-actions"><button type="button" title={`Edit ${skill.name}`} aria-label={`Edit ${skill.name}`} onClick={() => edit(skill)}><Icon name="edit" size={16}/></button><button type="button" title={`Remove ${skill.name}`} aria-label={`Remove ${skill.name}`} onClick={() => remove(skill)}><Icon name="trash" size={16}/></button></div></div>
    <div className="cl-skill-name">{skill.name}</div><div className="cl-skill-cat">{skill.category}</div>
    <div className="cl-progress-row"><span className={`cl-level cl-${levelName(skill.level).toLowerCase()}`}>{levelName(skill.level)}</span><b>{skill.level}%</b></div>
    <div className="cl-progress-rail"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: .85, delay: Math.min(index * .05, .35) }} /></div>
    <div className="cl-skill-footer"><span><Icon name="checkcircle" size={13}/> Self assessed</span><span>Updated {formatDate(skill.updated)}</span></div>
  </motion.article>;
}

export default function MySkills() {
  const [skills, setSkills] = useState(readSkills);
  const [filter, setFilter] = useState('All Skills');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('proficiency');
  const [role, setRole] = useState('MERN Developer');
  const [editing, setEditing] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => { try { localStorage.setItem('careerlens-demo-skills-v1', JSON.stringify(skills)); } catch { /* Private browsing storage may be unavailable. */ } }, [skills]);
  useEffect(() => { if (!toast) return; const timeout = setTimeout(() => setToast(''), 3400); return () => clearTimeout(timeout); }, [toast]);
  useEffect(() => { document.body.style.overflow = modalOpen || deleting || mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [modalOpen, deleting, mobileOpen]);
  const average = skills.length ? Math.round(skills.reduce((sum, x) => sum + x.level, 0) / skills.length) : 0;
  const categoriesCount = new Set(skills.map(s => s.category)).size;
  const advancedCount = skills.filter(x => x.level >= 80).length;
  const roleSkills = ROLES[role];
  const roleMatched = roleSkills.filter(name => skills.some(s => s.name.toLowerCase() === name.toLowerCase()));
  const rolePercent = Math.round(roleMatched.length / roleSkills.length * 100);
  const roleMissing = roleSkills.filter(name => !roleMatched.includes(name));
  const categoryData = CATEGORIES.slice(1).map(name => ({ name, count: skills.filter(s => s.category === name).length })).filter(x => x.count > 0);
  const visible = useMemo(() => {
    const list = skills.filter(s => (filter === 'All Skills' || s.category === filter) && `${s.name} ${s.category}`.toLowerCase().includes(query.trim().toLowerCase()));
    return list.sort((a,b) => sort === 'alphabetical' ? a.name.localeCompare(b.name) : sort === 'recent' ? b.updated.localeCompare(a.updated) : b.level - a.level);
  }, [skills, filter, query, sort]);
  const openAdd = (suggestion = '') => { setEditing(suggestion ? { name: suggestion, category: suggestion === 'Express.js' || suggestion === 'REST API' ? 'Backend' : 'Tools', level: 35 } : null); setModalOpen(true); };
  const saveSkill = s => {
    setSkills(old => old.some(x => x.id === s.id) ? old.map(x => x.id === s.id ? s : x) : [...old, s]);
    setToast(editing?.id ? `${s.name} updated successfully` : `${s.name} added to your skills`);
    setModalOpen(false); setEditing(undefined);
  };
  return <div className="skills-page">
    <aside className={`cl-sidebar ${mobileOpen ? 'cl-sidebar-open' : ''}`}><Sidebar close={() => setMobileOpen(false)} comingSoon={name => setToast(`${name} is coming soon. Your My Skills page is ready!`)}/></aside>
    {mobileOpen && <button className="cl-mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)}/>}
    <div className="cl-appmain">
      <header className="cl-topbar">
        <div className="cl-top-left"><button type="button" className="cl-mobile-menu cl-iconbutton" aria-label="Open navigation menu" onClick={() => setMobileOpen(true)}><Icon name="menu"/></button><span className="cl-topcrumb">Workspace</span><Icon name="chevron" size={14}/><b>My Skills</b></div>
        <div className="cl-top-right"><span className="cl-online"><i/> Your workspace</span><button className="cl-topbell" title="Notifications (coming soon)" aria-label="Notifications" onClick={() => setToast('Notifications are coming soon')}><Icon name="bell"/></button><span className="cl-top-divider"/><div className="cl-avatar" aria-label="Demo student avatar">ZS</div><div className="cl-top-profile"><b>Zarin Sultana</b><span>Student account</span></div><Icon name="chevron" size={15}/></div>
      </header>
      <main className="cl-content">
        <motion.div className="cl-pageheading" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
          <div><div className="cl-breadcrumb">YOUR CAREER WORKSPACE <span>/</span> SKILLS</div><h1>My Skills <span className="cl-heading-spark">✳</span></h1><p>See what you're good at, celebrate your progress, and discover what to learn next.</p></div>
          <button type="button" className="cl-btn cl-btn-primary cl-add-top" onClick={() => openAdd()}><Icon name="plus" size={18}/> Add New Skill</button>
        </motion.div>
        <motion.section className="cl-intro-banner" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .07 }}>
          <div className="cl-banner-copy"><div className="cl-banner-label"><Icon name="sparkle" size={14}/> YOUR SKILLS, YOUR SUPERPOWER</div><h2>Build a profile that<br/><em>opens doors.</em></h2><p>Every skill is a step toward your next big opportunity. Keep your profile updated so future job matches reflect your strengths.</p><button type="button" onClick={() => openAdd()} className="cl-banner-link">Grow your skillset <Icon name="arrow" size={18}/></button></div>
          <div className="cl-banner-visual" aria-hidden="true"><div className="cl-orbit cl-orbit-a"/><div className="cl-orbit cl-orbit-b"/><div className="cl-center-emblem"><Icon name="bolt" size={35}/></div><div className="cl-float-pill cl-float-one"><span>✦</span> React <b>74%</b></div><div className="cl-float-pill cl-float-two"><span>✦</span> JavaScript <b>86%</b></div><div className="cl-float-check"><Icon name="check" size={18}/></div><div className="cl-visual-star cl-star-one">✳</div><div className="cl-visual-star cl-star-two">✦</div></div>
        </motion.section>
        <section className="cl-overview" aria-label="Skill overview">
          <div className="cl-stat-card"><div className="cl-stat-icon cl-stat-mint"><Icon name="layers" size={22}/></div><div className="cl-stat-label">Total skills</div><div className="cl-stat-bottom"><strong>{String(skills.length).padStart(2,'0')}</strong><span className="cl-stat-note">In your profile</span></div></div>
          <div className="cl-stat-card"><div className="cl-stat-icon cl-stat-lavender"><Icon name="trending" size={22}/></div><div className="cl-stat-label">Average proficiency</div><div className="cl-stat-bottom"><strong>{average}%</strong><span className="cl-stat-note">Self-assessed</span></div></div>
          <div className="cl-stat-card"><div className="cl-stat-icon cl-stat-peach"><Icon name="checkcircle" size={22}/></div><div className="cl-stat-label">Advanced skills</div><div className="cl-stat-bottom"><strong>{String(advancedCount).padStart(2,'0')}</strong><span className="cl-stat-note">80% and above</span></div></div>
          <div className="cl-stat-card"><div className="cl-stat-icon cl-stat-sky"><Icon name="grid" size={22}/></div><div className="cl-stat-label">Skill categories</div><div className="cl-stat-bottom"><strong>{String(categoriesCount).padStart(2,'0')}</strong><span className="cl-stat-note">Areas of expertise</span></div></div>
        </section>
        <div className="cl-lower-grid">
          <section className="cl-mainpanel" aria-label="Your skill library">
            <div className="cl-section-title"><div><div className="cl-section-eyebrow">YOUR SKILL LIBRARY</div><h2>Skills you bring to the table <span className="cl-small-count">{skills.length}</span></h2><p>A snapshot of your knowledge, tools and strengths.</p></div></div>
            <div className="cl-toolbar"><div className="cl-search-wrap"><Icon name="search" size={19}/><input aria-label="Search skills" placeholder="Search for a skill..." value={query} onChange={e => setQuery(e.target.value)} />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" size={15}/></button>}</div><label className="cl-sort-wrap"><Icon name="filter" size={16}/><span>Sort:</span><select aria-label="Sort skills" value={sort} onChange={e => setSort(e.target.value)}><option value="proficiency">Proficiency</option><option value="alphabetical">A to Z</option><option value="recent">Recently updated</option></select></label></div>
            <div className="cl-filters" role="group" aria-label="Filter skills by category">{CATEGORIES.map(category => <button type="button" key={category} className={filter === category ? 'cl-filter-active' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>
            <motion.div className="cl-skill-grid" variants={{ hidden: {}, visible: { transition: { staggerChildren: .045 } } }} initial="hidden" animate="visible" key={`${filter}-${sort}-${query}`}>
              <AnimatePresence mode="popLayout">{visible.map((skill, i) => <SkillCard key={skill.id} skill={skill} index={i} edit={s => { setEditing(s); setModalOpen(true); }} remove={setDeleting}/>)}</AnimatePresence>
              {visible.length === 0 && <div className="cl-empty-state"><div><Icon name="search" size={27}/></div><h3>No skills found</h3><p>Try a different search or category, or add your first skill.</p><button className="cl-btn cl-btn-outline" onClick={() => { setFilter('All Skills'); setQuery(''); }}>Clear filters</button></div>}
              <button className="cl-add-skill-card" onClick={() => openAdd()}><span><Icon name="plus" size={23}/></span><b>Add another skill</b><small>Keep your profile growing</small></button>
            </motion.div>
            <div className="cl-skill-help"><Icon name="info" size={17}/><span>Skill levels are your own estimates and can be updated anytime. Your data is saved in this browser for this demo.</span></div>
          </section>
          <aside className="cl-aside-panel" aria-label="Skill insights">
            <section className="cl-insight-card"><div className="cl-card-heading"><div><div className="cl-section-eyebrow">YOUR GROWTH SNAPSHOT</div><h3>Skill balance</h3></div><span className="cl-mini-icon"><Icon name="chart" size={18}/></span></div><div className="cl-ring-container"><Ring percent={average} size={154} stroke={12}><strong>{average}%</strong><span>AVG. LEVEL</span></Ring></div><p className="cl-chart-caption">Average across your {skills.length} self-assessed skill{skills.length !== 1 ? 's' : ''}</p><div className="cl-insight-rule"/><div className="cl-category-heading">Category breakdown</div><div className="cl-category-bars">{categoryData.length ? categoryData.map(({ name, count }, i) => <div className="cl-category-bar" key={name}><span className="cl-cat-name"><i className={`cl-bar-dot cl-dot-${i % 5}`}/>{name}</span><span className="cl-category-track"><span style={{ width: `${count / Math.max(skills.length, 1) * 100}%` }} /></span><b>{count}</b></div>) : <p className="cl-nodata">Add a skill to see your distribution.</p>}</div></section>
            <section className="cl-path-card"><div className="cl-path-top"><div className="cl-path-icon"><Icon name="compass" size={20}/></div><span>CAREER PATH PREVIEW</span></div><h3>Your next destination</h3><label className="cl-role-select-label" htmlFor="cl-target-role">Target role</label><select id="cl-target-role" value={role} onChange={e => setRole(e.target.value)}>{Object.keys(ROLES).map(s => <option key={s}>{s}</option>)}</select><div className="cl-role-completion"><strong>{rolePercent}%</strong><span>{roleMatched.length} of {roleSkills.length} key skills listed</span></div><div className="cl-path-progress"><motion.div key={role} initial={{ width: 0 }} animate={{ width: `${rolePercent}%` }} transition={{ duration: .6 }}/></div><div className="cl-missing-title">Skills to explore next</div><div className="cl-missing-list">{roleMissing.length ? roleMissing.map(s => <button type="button" key={s} onClick={() => openAdd(s)} title={`Add ${s} to My Skills`}><Icon name="plus" size={13}/>{s}</button>) : <span className="cl-all-present">All core skills listed — great start!</span>}</div><p className="cl-path-fine">Preview uses the skill names on your profile, not AI assessment. Skill Gap Analysis will be a separate page.</p></section>
            <div className="cl-tip-card"><div className="cl-tip-icon"><Icon name="sparkle" size={19}/></div><div><strong>Little steps. Big progress.</strong><p>Keep building real projects and revisit your skill levels as you learn.</p></div></div>
          </aside>
        </div>
        <footer className="cl-page-footer"><span>© CareerLens · Your journey, in progress.</span><span>Made for the next generation of talent <span aria-hidden="true">✦</span></span></footer>
      </main>
    </div>
    <AnimatePresence>{modalOpen && <SkillModal key={editing?.id || editing?.name || 'new'} editing={editing} existing={skills} onSave={saveSkill} onClose={() => { setModalOpen(false); setEditing(undefined); }}/>}</AnimatePresence>
    <AnimatePresence>{deleting && <motion.div className="cl-modal-overlay" onMouseDown={e => { if(e.target === e.currentTarget) setDeleting(null); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="cl-confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="cl-confirm-title" initial={{ scale: .95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .95, opacity: 0 }}><div className="cl-confirm-icon"><Icon name="trash" size={22}/></div><h2 id="cl-confirm-title">Remove {deleting.name}?</h2><p>This skill will be removed from your profile in this browser. You can add it again later.</p><div className="cl-modal-actions"><button className="cl-btn cl-btn-outline" onClick={() => setDeleting(null)}>Keep skill</button><button className="cl-btn cl-btn-danger" onClick={() => { setSkills(old => old.filter(s => s.id !== deleting.id)); setToast(`${deleting.name} removed`); setDeleting(null); }}>Remove skill</button></div></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{toast && <motion.div className="cl-toast" role="status" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}><Icon name="checkcircle" size={17}/>{toast}<button onClick={() => setToast('')} aria-label="Dismiss notification"><Icon name="close" size={14}/></button></motion.div>}</AnimatePresence>
  </div>;
}
