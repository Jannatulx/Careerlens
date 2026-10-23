import { useEffect, useState } from 'react';
import {
  LayoutDashboard, UserRound, FileText, BookOpen,
  BrainCircuit, BriefcaseBusiness, Bookmark,
  ClipboardList, ChartNoAxesCombined, ArrowRight,
  LogOut, Menu, Sparkles, Settings,
} from 'lucide-react';
import careerLogo from '../../assets/logo.png';
import './CareerSidebar.css';

// Edit this one menu array to update navigation on every page.
const MENU_ITEMS = [
  { label: 'Overview',           icon: LayoutDashboard,      href: null },
  { label: 'My Profile',         icon: UserRound,            href: null },
  { label: 'Resume Analyzer',    icon: FileText,             href: null },
  { label: 'My Skills',          icon: BookOpen,             href: '/my-skills' },
  { label: 'Skill Gap Analysis', icon: BrainCircuit,         href: '/skill-gap' },
  { label: 'Opportunities',      icon: BriefcaseBusiness,    href: '/opportunities' },
  { label: 'Saved Jobs',         icon: Bookmark,             href: '/opportunities?saved=1' },
  { label: 'Applications',       icon: ClipboardList,        href: null },
  { label: 'Career Analytics',   icon: ChartNoAxesCombined,  href: null },
];

// Open by default on desktop, closed by default on smaller screens.
// Call this once at the top level of each page component.
export function useCareerSidebar() {
  const [open, setOpen] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth > 900
  );
  return { open, setOpen };
}

export function CareerMenuButton({ open, onClick }) {
  return (
    <button
      type="button"
      className="clw-menu-button"
      onClick={onClick}
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
      aria-controls="clw-sidebar"
    >
      <Menu size={20} strokeWidth={2} />
    </button>
  );
}

function isCurrent(item, location) {
  if (!item.href) return false;
  const savedMode = location.pathname === '/opportunities' &&
    new URLSearchParams(location.search).get('saved') === '1';
  if (item.label === 'Saved Jobs') return savedMode;
  if (item.label === 'Opportunities') return location.pathname === '/opportunities' && !savedMode || location.pathname === '/dashboard/jobs';
  if (item.label === 'My Skills') return ['/my-skills', '/dashboard/skills'].includes(location.pathname);
  if (item.label === 'Skill Gap Analysis') return ['/skill-gap', '/dashboard/skill-gap'].includes(location.pathname);
  return location.pathname === item.href;
}

export default function CareerSidebar({ open, onClose }) {
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const current = typeof window !== 'undefined' ? window.location : { pathname: '', search: '' };

  return (
    <>
      {open && <button type="button" className="clw-backdrop" aria-label="Close navigation" onClick={onClose} />}
      <aside id="clw-sidebar" aria-label="Student workspace navigation" className={`clw-sidebar ${open ? 'clw-sidebar-open' : ''}`} aria-hidden={!open}>
        <a href="/" className="clw-brand" onClick={onClose}>
          <span className="clw-brand-symbol"><img src={careerLogo} alt="" /></span>
          <span><strong>CareerLens</strong><small>Student workspace</small></span>
        </a>

        <div className="clw-caption">WORKSPACE</div>
        <nav className="clw-nav" aria-label="CareerLens pages">
          {MENU_ITEMS.map(({ label, icon: Icon, href }) => {
            const active = isCurrent({ label, href }, current);
            return href ? (
              <a key={label} href={href} className={`clw-link ${active ? 'clw-link-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={onClose}>
                <Icon size={19} strokeWidth={1.8}/><span>{label}</span>{active && <i className="clw-active-dot" aria-hidden="true" />}
              </a>
            ) : (
              <button key={label} type="button" className="clw-link" onClick={() => setNotice(`${label} page is coming soon`)}>
                <Icon size={19} strokeWidth={1.8}/><span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="clw-bottom">
          <div className="clw-account-caption">ACCOUNT</div>
          <button
            className="clw-account-settings"
            type="button"
            onClick={() => setNotice('Settings page is coming soon')}
          >
            <Settings size={20} strokeWidth={1.8}/>
            <span>Settings</span>
          </button>
          <a className="clw-back-home" href="/" onClick={onClose}>
            <LogOut size={19} strokeWidth={1.8}/> Back to website
          </a>
          <div className="clw-promo">
            <div className="clw-promo-icon"><Sparkles size={19}/></div>
            <strong>Your growth starts here.</strong>
            <p>Every skill you build gets you closer to your next opportunity.</p>
            <span>KEEP GROWING <ArrowRight size={13}/></span>
          </div>
        </div>
        {notice && <div className="clw-notice" role="status">{notice}</div>}
      </aside>
    </>
  );
}
