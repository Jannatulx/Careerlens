import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BriefcaseBusiness, UsersRound, Plus, Search, Bell,
  Menu, X, ArrowUpRight, MapPin, Clock3, Eye, CheckCircle2, XCircle,
  CalendarDays, Building2, LogOut, ChevronRight, Sparkles, Send, BellRing,
  Pencil, Trash2, PauseCircle, PlayCircle, Mail,
} from "lucide-react";
import logo from "../../assets/logo.png";
import "./RecruiterDashboard.css";

const initialJobs = [
  { id: 1, title: "Frontend Developer Intern", company: "CareerLens Demo Co.", type: "Internship", location: "Hybrid · Chattogram", description: "Build responsive interfaces with the product team. Work with React, JavaScript, and modern CSS while learning from experienced developers.", skills: ["React", "JavaScript", "CSS"], applicants: 18, status: "Active", posted: "2 days ago" },
  { id: 2, title: "Junior MERN Stack Developer", company: "CareerLens Demo Co.", type: "Full-time", location: "On-site · Agrabad", description: "Help develop and maintain full-stack web applications using MongoDB, Express, React, and Node.js. Collaborate with design and product teams.", skills: ["React", "Node.js", "MongoDB"], applicants: 12, status: "Active", posted: "5 days ago" },
  { id: 3, title: "UI/UX Design Intern", company: "CareerLens Demo Co.", type: "Internship", location: "Remote", description: "Support user research, wireframes, and prototypes. Work closely with developers to create accessible and user-friendly experiences.", skills: ["Figma", "Wireframing", "Prototyping"], applicants: 9, status: "Draft", posted: "1 week ago" },
];

const applicants = [
  { id: 1, name: "Nusrat Jahan", role: "Frontend Developer Intern", email: "nusrat.jahan@example.com", education: "BSc in CSE · 4th year", skills: ["React", "JavaScript", "CSS"], match: 92, applied: "Today", initials: "NJ", tone: "mint" },
  { id: 2, name: "Samiul Hasan", role: "Junior MERN Stack Developer", email: "samiul.hasan@example.com", education: "BSc in CSE · Recent graduate", skills: ["Node.js", "MongoDB", "Express"], match: 87, applied: "Yesterday", initials: "SH", tone: "lavender" },
  { id: 3, name: "Ayesha Rahman", role: "Frontend Developer Intern", email: "ayesha.rahman@example.com", education: "BSc in Software Engineering", skills: ["HTML", "React", "Figma"], match: 84, applied: "2 days ago", initials: "AR", tone: "peach" },
  { id: 4, name: "Tanvir Ahmed", role: "Junior MERN Stack Developer", email: "tanvir.ahmed@example.com", education: "Diploma + BSc in CSE", skills: ["React", "Node.js", "Git"], match: 78, applied: "3 days ago", initials: "TA", tone: "blue" },
];

const navItems = [
  { label: "Dashboard", path: "/recruiter", icon: LayoutDashboard },
  { label: "Post Opportunities", path: "/recruiter/post-opportunities", icon: BriefcaseBusiness },
  { label: "Applicant Profiles", path: "/recruiter/applicants", icon: UsersRound },
];

function RecruiterLayout({ children, currentPath, sidebarOpen, setSidebarOpen }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const email = (() => { try { return localStorage.getItem("cl_email") || "recruiter@careerlens.demo"; } catch { return "recruiter@careerlens.demo"; } })();
  const active = navItems.find((item) => item.path === currentPath)?.label || "Dashboard";
  return (
    <div className="clr-app">
      {sidebarOpen && <button className="clr-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
      <aside className={`clr-sidebar ${sidebarOpen ? "clr-sidebar-open" : ""}`}>
        <div className="clr-brand-row">
          <Link to="/" className="clr-brand"><img src={logo} alt="CareerLens" /><span><b>CareerLens</b><small>RECRUITER WORKSPACE</small></span></Link>
          <button className="clr-icon-btn clr-mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <p className="clr-nav-caption">WORKSPACE</p>
        <nav className="clr-nav">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link key={path} to={path} onClick={() => setSidebarOpen(false)} className={`clr-nav-link ${currentPath === path ? "is-active" : ""}`}>
              <Icon size={18} /><span>{label}</span>{currentPath === path && <i />}
            </Link>
          ))}
        </nav>
        <div className="clr-sidebar-bottom">
          <div className="clr-sidebar-tip"><Sparkles size={19} /><b>Find your next great hire</b><p>Connect with skilled candidates who are ready to grow.</p></div>
          <Link to="/" className="clr-back-link"><LogOut size={16} /> Back to website</Link>
        </div>
      </aside>
      <div className="clr-workspace">
        <header className="clr-topbar">
          <div className="clr-top-left"><button className="clr-icon-btn clr-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div><span className="clr-top-kicker">RECRUITER WORKSPACE</span><b>{active}</b></div></div>
          <div className="clr-top-right"><span className="clr-demo-pill"><span /> Demo workspace</span><div className="clr-popover-wrap"><button className="clr-icon-btn clr-notification" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((v) => !v); setProfileOpen(false); }}><Bell size={18} />{!notificationsRead && <i />}</button>{notificationsOpen && <div className="clr-popover clr-notice-popover"><div className="clr-popover-head"><b>Notifications</b><button onClick={() => setNotificationsRead(true)}>Mark all read</button></div><div className="clr-notice-item"><span className="clr-notice-icon"><UsersRound size={16} /></span><span><b>Candidate activity</b><small>New candidates are ready for your review.</small></span></div><div className="clr-notice-item"><span className="clr-notice-icon"><BriefcaseBusiness size={16} /></span><span><b>Keep listings fresh</b><small>Review active opportunities regularly.</small></span></div></div>}</div><div className="clr-popover-wrap"><button className="clr-user clr-user-button" onClick={() => { setProfileOpen((v) => !v); setNotificationsOpen(false); }} aria-expanded={profileOpen}><span className="clr-user-avatar">{(email.split("@")[0][0] || "R").toUpperCase()}</span><span><b>Recruiter</b><small>Hiring team</small></span><ChevronRight size={14} /></button>{profileOpen && <div className="clr-popover clr-profile-popover"><span className="clr-profile-menu-name">Recruiter workspace</span><span className="clr-profile-menu-email">{email}</span><button onClick={() => { try { localStorage.removeItem("cl_role"); } catch {} window.location.href = "/signin"; }}><LogOut size={15} /> Sign out</button></div>}</div></div>
        </header>
        <main className="clr-main">{children}<footer className="clr-footer">© 2026 CareerLens <span>Built to make hiring more human.</span></footer></main>
      </div>
    </div>
  );
}

function PageHeading({ eyebrow, title, text, action }) {
  return <div className="clr-page-heading"><div><div className="clr-eyebrow"><span />{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>{action}</div>;
}

function Stat({ icon: Icon, label, value, detail, tone }) {
  return <article className="clr-stat-card"><div className="clr-stat-top"><span className={`clr-stat-icon ${tone}`}><Icon size={20} /></span><ArrowUpRight size={17} className="clr-muted-icon" /></div><p>{label}</p><strong>{value}</strong><small>{detail}</small></article>;
}

function RecruiterHome({ jobs, setPage }) {
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
  return <>
    <PageHeading eyebrow="YOUR HIRING OVERVIEW" title="Build your next great team 👋" text="Everything you need to discover talent and manage opportunities." action={<span className="clr-demo-tag"><Sparkles size={14} /> Hiring hub</span>} />
    <section className="clr-welcome-banner"><div className="clr-banner-copy"><span><Sparkles size={14} /> YOUR TALENT, YOUR NEXT CHAPTER</span><h2>Great teams start with<br /><em>the right opportunity.</em></h2><p>Post a role, explore candidate profiles, and find people who fit your team.</p><button className="clr-primary-btn" onClick={() => setPage("/recruiter/post-opportunities")}>Post an opportunity <ChevronRight size={17} /></button></div><div className="clr-banner-illustration"><div className="clr-orbit clr-orbit-one" /><div className="clr-orbit clr-orbit-two" /><div className="clr-team-icon"><UsersRound size={48} /></div><div className="clr-float-card clr-float-top"><span className="clr-float-dot" /> New talent found</div><div className="clr-float-card clr-float-bottom"><CheckCircle2 size={17} /> Strong match</div></div></section>
    <section className="clr-stats-grid"><Stat icon={BriefcaseBusiness} label="Opportunities" value={jobs.length.toString().padStart(2, "0")} detail="Roles created so far" tone="green" /><Stat icon={CheckCircle2} label="Active listings" value={activeJobs.toString().padStart(2, "0")} detail="Currently visible to talent" tone="purple" /><Stat icon={UsersRound} label="Applicants" value={totalApplicants.toString().padStart(2, "0")} detail="Across all opportunities" tone="blue" /><Stat icon={Eye} label="Profiles to review" value="04" detail="Candidates in your shortlist" tone="orange" /></section>
    <section className="clr-panel clr-opportunities-panel"><div className="clr-panel-heading"><div><h2>Recent opportunities</h2><p>Keep track of your latest job listings.</p></div><button className="clr-text-btn" onClick={() => setPage("/recruiter/post-opportunities")}>Manage opportunities <ChevronRight size={16} /></button></div><div className="clr-job-list">{jobs.slice(0, 3).map((job) => <article className="clr-job-row" key={job.id}><div className="clr-job-symbol"><Building2 size={20} /></div><div className="clr-job-info"><b>{job.title}</b><span><MapPin size={13} /> {job.location} <i>·</i> <Clock3 size={13} /> {job.type}</span></div><div className="clr-job-applicants"><b>{job.applicants}</b><small>Applicants</small></div><span className={`clr-status ${job.status === "Active" ? "active" : "draft"}`}>{job.status}</span><button className="clr-row-arrow" onClick={() => setPage("/recruiter/applicants")} aria-label={`View applicants for ${job.title}`}><ChevronRight size={18} /></button></article>)}</div></section>
    <section className="clr-bottom-grid"><div className="clr-panel clr-quick-panel"><div className="clr-panel-heading"><div><h2>Quick actions</h2><p>Move your hiring forward.</p></div></div><button className="clr-action-card" onClick={() => setPage("/recruiter/post-opportunities")}><span className="clr-action-icon green"><Plus size={19} /></span><span><b>Post an opportunity</b><small>Create a new job listing</small></span><ChevronRight size={18} /></button><button className="clr-action-card" onClick={() => setPage("/recruiter/applicants")}><span className="clr-action-icon purple"><UsersRound size={19} /></span><span><b>View applicant profiles</b><small>Review candidate experience</small></span><ChevronRight size={18} /></button></div><div className="clr-panel clr-tip-panel"><span className="clr-tip-icon"><Sparkles size={21} /></span><h3>A little hiring tip</h3><p>Clear responsibilities and skill requirements help the right candidates recognise themselves in your opportunity.</p><button onClick={() => setPage("/recruiter/post-opportunities")}>Create a clear listing <ArrowUpRight size={16} /></button></div></section>
  </>;
}

function PostOpportunities({ jobs, setJobs }) {
  const emptyForm = { title: "", company: "", type: "Full-time", location: "", description: "", skills: "" };
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const update = (key) => (event) => setForm((old) => ({ ...old, [key]: event.target.value }));
  function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.location.trim() || !form.description.trim()) { setNotice("Please complete the required fields before publishing."); return; }
    const cleanJob = { title: form.title.trim(), company: form.company.trim(), type: form.type, location: form.location.trim(), description: form.description.trim(), skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) };
    if (editingId !== null) {
      setJobs((old) => old.map((job) => job.id === editingId ? { ...job, ...cleanJob } : job));
      setNotice("Opportunity updated successfully.");
      setEditingId(null);
    } else {
      setJobs((old) => [{ id: Date.now(), ...cleanJob, applicants: 0, status: "Active", posted: "Just now" }, ...old]);
      setNotice("Your opportunity has been published in this demo workspace.");
    }
    setForm(emptyForm);
  }
  return <>
    <PageHeading eyebrow="GROW YOUR TEAM" title="Post an opportunity" text="Share a role and help the right people find their next step." action={<span className="clr-demo-tag"><BriefcaseBusiness size={14} /> Job studio</span>} />
    <div className="clr-post-layout"><section className="clr-panel clr-form-panel"><div className="clr-panel-heading"><div><h2>{editingId !== null ? "Edit opportunity" : "Opportunity details"}</h2><p>Fields marked with * are required.</p></div><span className="clr-step-chip">01 / DETAILS</span></div>{notice && <div className={`clr-form-notice ${/successfully|published|deleted/i.test(notice) ? "success" : ""}`} role="status">{notice}</div>}<form className="clr-job-form" onSubmit={submit}><label>Job title *<input value={form.title} onChange={update("title")} placeholder="e.g. Frontend Developer Intern" /></label><div className="clr-form-two"><label>Company name *<input value={form.company} onChange={update("company")} placeholder="Your company" /></label><label>Employment type<select value={form.type} onChange={update("type")}><option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option><option>Remote</option></select></label></div><label>Location / work mode *<input value={form.location} onChange={update("location")} placeholder="e.g. Agrabad, Chattogram · Hybrid" /></label><label>Required skills <input value={form.skills} onChange={update("skills")} placeholder="React, JavaScript, Git (comma separated)" /></label><label>Role description *<textarea value={form.description} onChange={update("description")} rows={5} placeholder="Describe the role, responsibilities and what makes this opportunity special..." /></label><div className="clr-form-actions"><span><CheckCircle2 size={15} /> You can edit the listing later.</span><div className="clr-form-button-row">{editingId !== null && <button className="clr-secondary-btn" type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setNotice(""); }}>Cancel edit</button>}<button className="clr-primary-btn" type="submit"><Send size={16} /> {editingId !== null ? "Save changes" : "Publish opportunity"}</button></div></div></form></section><aside className="clr-post-aside"><div className="clr-preview-card"><div className="clr-preview-icon"><BriefcaseBusiness size={23} /></div><span className="clr-preview-label">LISTING CHECKLIST</span><h3>Make your post stand out</h3><ul><li><CheckCircle2 size={16} /> A clear, specific job title</li><li><CheckCircle2 size={16} /> Required skills and experience</li><li><CheckCircle2 size={16} /> Work mode and location</li><li><CheckCircle2 size={16} /> Responsibilities and expectations</li></ul></div><div className="clr-aside-note"><Sparkles size={18} /><p><b>Good to know</b><br />This is a front-end demo. New listings are saved in the current page session and are not published to a real job board.</p></div></aside></div>
    <section className="clr-panel clr-manage-jobs"><div className="clr-panel-heading"><div><h2>Manage opportunities</h2><p>Edit, pause, reactivate, or remove your demo listings.</p></div><span className="clr-count-chip">{jobs.length} total</span></div>
      {jobs.length === 0 ? <div className="clr-empty"><BriefcaseBusiness size={26} /><b>No opportunities yet</b><p>Publish your first opportunity using the form above.</p></div> : <div className="clr-manage-list">{jobs.map((job) => <article className="clr-manage-row" key={job.id}><span className="clr-job-symbol"><Building2 size={19} /></span><div className="clr-manage-info"><b>{job.title}</b><small>{job.company || "Company not specified"} · {job.location}</small></div><span className={`clr-status ${job.status === "Active" ? "active" : "draft"}`}>{job.status}</span><div className="clr-manage-actions"><button className="clr-small-action" title="Edit listing" aria-label={`Edit ${job.title}`} onClick={() => { setForm({ title: job.title || "", company: job.company || "", type: job.type || "Full-time", location: job.location || "", description: job.description || "", skills: (job.skills || []).join(", ") }); setEditingId(job.id); setNotice(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}><Pencil size={15} /></button><button className="clr-small-action" title={job.status === "Active" ? "Pause listing" : "Reactivate listing"} aria-label={job.status === "Active" ? `Pause ${job.title}` : `Reactivate ${job.title}`} onClick={() => setJobs((old) => old.map((item) => item.id === job.id ? { ...item, status: item.status === "Active" ? "Draft" : "Active" } : item))}>{job.status === "Active" ? <PauseCircle size={15} /> : <PlayCircle size={15} />}</button><button className="clr-small-action danger" title="Delete listing" aria-label={`Delete ${job.title}`} onClick={() => setConfirmDelete(job.id)}><Trash2 size={15} /></button></div>{confirmDelete === job.id && <div className="clr-delete-confirm"><span>Delete this opportunity?</span><button onClick={() => { setJobs((old) => old.filter((item) => item.id !== job.id)); setConfirmDelete(null); if (editingId === job.id) { setEditingId(null); setForm(emptyForm); } setNotice("Opportunity deleted."); }}>Yes, delete</button><button onClick={() => setConfirmDelete(null)}>Cancel</button></div>}</article>)}</div>}
    </section>
  </>;
}

function ApplicantProfiles() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All opportunities");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [decisions, setDecisions] = useState(() => { try { return JSON.parse(localStorage.getItem("clr_applicant_decisions") || "{}"); } catch { return {}; } });
  useEffect(() => { try { localStorage.setItem("clr_applicant_decisions", JSON.stringify(decisions)); } catch {} }, [decisions]);
  const roles = ["All opportunities", ...new Set(applicants.map((person) => person.role))];
  const filtered = useMemo(() => applicants.filter((person) => `${person.name} ${person.role} ${person.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase()) && (role === "All opportunities" || person.role === role) && (statusFilter === "All statuses" || (decisions[person.id] || "In review") === statusFilter)), [query, role, statusFilter, decisions]);
  return <>
    <PageHeading eyebrow="MEET YOUR CANDIDATES" title="Applicant profiles" text="Explore candidate experience, skills, and role fit in one place." action={<span className="clr-demo-tag"><UsersRound size={14} /> Talent pool</span>} />
    <section className="clr-panel clr-applicants-panel"><div className="clr-applicant-summary"><div><h2>Candidate applications</h2><p>Review profiles and keep your hiring process moving.</p></div><div className="clr-applicant-count"><b>{filtered.length.toString().padStart(2, "0")}</b><span>profiles shown</span></div></div><div className="clr-filters"><label className="clr-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, role or skill..." /></label><select aria-label="Filter by opportunity" value={role} onChange={(e) => setRole(e.target.value)}>{roles.map((r) => <option key={r}>{r}</option>)}</select><select aria-label="Filter by applicant status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>{["All statuses", "In review", "Shortlisted", "Rejected"].map((status) => <option key={status}>{status}</option>)}</select></div><div className="clr-candidate-list">{filtered.map((person) => <article className="clr-candidate-row" key={person.id}><div className={`clr-candidate-avatar ${person.tone}`}>{person.initials}</div><div className="clr-candidate-info"><b>{person.name}</b><span>{person.role}</span><small>{person.education}</small><div className="clr-candidate-skills">{person.skills.map((skill) => <i key={skill}>{skill}</i>)}</div></div><div className="clr-match-column"><span>SKILL MATCH</span><b>{person.match}%</b><div><i style={{ width: `${person.match}%` }} /></div></div><div className="clr-applied"><CalendarDays size={14} /> {person.applied}</div><div className="clr-candidate-actions"><button className="clr-view-btn" onClick={() => setSelected(person)}><Eye size={15} /> View profile</button><button className={`clr-decision-btn ${decisions[person.id] === "Shortlisted" ? "chosen" : ""}`} onClick={() => setDecisions((old) => ({ ...old, [person.id]: old[person.id] === "Shortlisted" ? "In review" : "Shortlisted" }))} aria-label={`Shortlist ${person.name}`} title="Shortlist / undo shortlist"><CheckCircle2 size={17} /></button><button className={`clr-decision-btn clr-reject-btn ${decisions[person.id] === "Rejected" ? "chosen" : ""}`} onClick={() => setDecisions((old) => ({ ...old, [person.id]: old[person.id] === "Rejected" ? "In review" : "Rejected" }))} aria-label={`Reject ${person.name}`} title="Reject / undo reject"><XCircle size={17} /></button></div><span className={`clr-candidate-status ${String(decisions[person.id] || "In review").toLowerCase().replaceAll(" ", "-")}`}>{decisions[person.id] || "In review"}</span></article>)}{filtered.length === 0 && <div className="clr-empty"><UsersRound size={28} /><b>No matching candidates</b><p>Try another name, role, or skill.</p></div>}</div></section>
    {selected && <div className="clr-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="clr-profile-modal" role="dialog" aria-modal="true" aria-labelledby="clr-profile-title" onClick={(e) => e.stopPropagation()}><button className="clr-modal-close" onClick={() => setSelected(null)} aria-label="Close profile"><X size={19} /></button><div className={`clr-candidate-avatar clr-modal-avatar ${selected.tone}`}>{selected.initials}</div><span className="clr-profile-eyebrow">CANDIDATE PROFILE</span><h2 id="clr-profile-title">{selected.name}</h2><p className="clr-profile-role">{selected.role}</p><div className="clr-profile-match"><span>Skill match</span><b>{selected.match}%</b></div><div className="clr-profile-detail"><span>EMAIL</span><b>{selected.email}</b></div><div className="clr-profile-detail"><span>EDUCATION</span><b>{selected.education}</b></div><div className="clr-profile-detail"><span>KEY SKILLS</span><div className="clr-candidate-skills">{selected.skills.map((skill) => <i key={skill}>{skill}</i>)}</div></div><div className="clr-profile-modal-actions"><button className="clr-secondary-btn" onClick={() => setSelected(null)}>Close</button><a className="clr-contact-btn" href={`mailto:${selected.email}?subject=${encodeURIComponent(`CareerLens opportunity: ${selected.role}`)}`}><Mail size={15} /> Contact</a><button className="clr-primary-btn" onClick={() => { setDecisions((old) => ({ ...old, [selected.id]: "Shortlisted" })); setSelected(null); }}><CheckCircle2 size={16} /> Shortlist</button></div><small className="clr-demo-disclaimer">Sample profile for demonstration only.</small></section></div>}
  </>;
}

export default function RecruiterDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState(() => { try { const saved = localStorage.getItem("clr_recruiter_jobs"); return saved ? JSON.parse(saved) : initialJobs; } catch { return initialJobs; } });
  useEffect(() => { try { localStorage.setItem("clr_recruiter_jobs", JSON.stringify(jobs)); } catch {} }, [jobs]);
  const path = location.pathname;
  return <RecruiterLayout currentPath={path} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
    {path === "/recruiter/post-opportunities" ? <PostOpportunities jobs={jobs} setJobs={setJobs} /> : path === "/recruiter/applicants" ? <ApplicantProfiles /> : <RecruiterHome jobs={jobs} setPage={navigate} />}
  </RecruiterLayout>;
}
