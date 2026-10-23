

import { useEffect, useMemo, useState } from "react";

import {

  Menu, X, LayoutDashboard, Users, BriefcaseBusiness,

  ClipboardCheck, BarChart3, Settings, LogOut, Bell,

  Search, Plus, Pencil, Check, Ban, Trash2, ArrowUpRight,

  ArrowRight, TrendingUp, GraduationCap, ShieldCheck,

  Activity, Clock3, ChevronDown, Sparkles, UserCheck,

  FileText, Target, CheckCircle2, AlertCircle,

  Filter, Save, Mail, MapPin, RefreshCw

} from "lucide-react";



import logo from "../../assets/logo.png";

import "./AdminDashboard.css";



/* ------------------ DEMO DATABASE ------------------ */



const INITIAL_USERS = [

  { id: 1, name: "Zarin Sultana", email: "zarin@example.com", role: "Student", skills: 9, status: "Active", joined: "2026-10-01" },

  { id: 2, name: "Tanvir Ahmed", email: "tanvir@example.com", role: "Student", skills: 12, status: "Active", joined: "2026-10-02" },

  { id: 3, name: "Nusrat Jahan", email: "nusrat@example.com", role: "Student", skills: 7, status: "Active", joined: "2026-10-04" },

  { id: 4, name: "Rafi Islam", email: "rafi@example.com", role: "Student", skills: 5, status: "Suspended", joined: "2026-10-05" },

  { id: 5, name: "Sadia Rahman", email: "sadia@example.com", role: "Student", skills: 11, status: "Active", joined: "2026-10-08" },

  { id: 6, name: "Mahin Khan", email: "mahin@example.com", role: "Student", skills: 8, status: "Active", joined: "2026-10-10" },

];



const INITIAL_JOBS = [

  { id: 101, title: "Frontend Developer Intern", company: "TechNova", type: "Internship", location: "Remote", status: "Pending", date: "2026-10-12" },

  { id: 102, title: "Junior MERN Developer", company: "CodeLabs", type: "Full-time", location: "Dhaka", status: "Approved", date: "2026-10-11" },

  { id: 103, title: "UI/UX Design Intern", company: "CreativeLab", type: "Internship", location: "Hybrid", status: "Pending", date: "2026-10-10" },

  { id: 104, title: "Backend Developer", company: "SoftZone", type: "Full-time", location: "Chattogram", status: "Approved", date: "2026-10-09" },

  { id: 105, title: "React Developer", company: "NextStack", type: "Contract", location: "Remote", status: "Rejected", date: "2026-10-08" },

];



const INITIAL_LOGS = [

  { id: 1, text: "New student registered", detail: "Mahin Khan", time: "Demo activity", type: "user" },

  { id: 2, text: "Job submitted for review", detail: "TechNova", time: "Demo activity", type: "job" },

  { id: 3, text: "Job approved", detail: "CodeLabs", time: "Demo activity", type: "success" },

];



const NAVIGATION = [

  { id: "overview", title: "Dashboard", icon: LayoutDashboard },

  { id: "users", title: "User Management", icon: Users },

  { id: "jobs", title: "Job Management", icon: BriefcaseBusiness },

  { id: "approvals", title: "Pending Approvals", icon: ClipboardCheck },

  { id: "analytics", title: "Career Analytics", icon: BarChart3 },

  { id: "activity", title: "Activity Logs", icon: Activity },

  { id: "settings", title: "Settings", icon: Settings },

];



const USER_GROWTH = [

  { label: "May", value: 30 },

  { label: "Jun", value: 42 },

  { label: "Jul", value: 38 },

  { label: "Aug", value: 61 },

  { label: "Sep", value: 73 },

  { label: "Oct", value: 89 },

];



const initialForm = {

  name: "",

  email: "",

  skills: 0,

  title: "",

  company: "",

  type: "Internship",

  location: "Remote",

};



function loadDemo(key, fallback) {

  try {

    const saved = JSON.parse(localStorage.getItem(key));

    return Array.isArray(saved) ? saved : fallback;

  } catch {

    return fallback;

  }

}



function initials(name = "") {

  return name

    .split(" ")

    .slice(0, 2)

    .map(word => word[0] || "")

    .join("")

    .toUpperCase();

}



function Status({ value }) {

  return (

    <span className={`ad-status ad-status-${value.toLowerCase()}`}>

      <span />

      {value}

    </span>

  );

}



function Modal({ title, children, onClose }) {

  useEffect(() => {

    const onEscape = event => {

      if (event.key === "Escape") onClose();

    };



    window.addEventListener("keydown", onEscape);

    return () => window.removeEventListener("keydown", onEscape);

  }, [onClose]);



  return (

    <div

      className="ad-modal-backdrop"

      onMouseDown={event => {

        if (event.target === event.currentTarget) onClose();

      }}

    >

      <section

        className="ad-modal"

        role="dialog"

        aria-modal="true"

        aria-label={title}

      >

        <div className="ad-modal-top">

          <div>

            <span className="ad-eyebrow">ADMIN WORKSPACE</span>

            <h2>{title}</h2>

          </div>



          <button className="ad-icon-btn" onClick={onClose} aria-label="Close modal">

            <X size={19} />

          </button>

        </div>

        {children}

      </section>

    </div>

  );

}



/* ---------------- MAIN ADMIN DASHBOARD ---------------- */



export default function AdminDashboard() {

  const [section, setSection] = useState("overview");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState(() => loadDemo("cl-admin-users-v1", INITIAL_USERS));

  const [jobs, setJobs] = useState(() => loadDemo("cl-admin-jobs-v1", INITIAL_JOBS));

  const [logs, setLogs] = useState(() => loadDemo("cl-admin-logs-v1", INITIAL_LOGS));



  const [userSearch, setUserSearch] = useState("");

  const [jobSearch, setJobSearch] = useState("");

  const [jobFilter, setJobFilter] = useState("All");

  const [modal, setModal] = useState(null);

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [toast, setToast] = useState("");

  const [notificationsOpen, setNotificationsOpen] = useState(false);



  useEffect(() => {

    try {

      localStorage.setItem("cl-admin-users-v1", JSON.stringify(users));

      localStorage.setItem("cl-admin-jobs-v1", JSON.stringify(jobs));

      localStorage.setItem("cl-admin-logs-v1", JSON.stringify(logs));

    } catch {

      // Demo still works if browser storage is unavailable.

    }

  }, [users, jobs, logs]);



  useEffect(() => {

    if (!toast) return;

    const timer = setTimeout(() => setToast(""), 3200);

    return () => clearTimeout(timer);

  }, [toast]);



  useEffect(() => {

    const close = event => {

      if (event.key === "Escape") {

        setSidebarOpen(false);

        setNotificationsOpen(false);

      }

    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);

  }, []);



  const pendingJobs = jobs.filter(job => job.status === "Pending");

  const activeJobs = jobs.filter(job => job.status === "Approved");

  const activeUsers = users.filter(user => user.status === "Active");



  const metrics = [

    {

      title: "Total Students",

      value: users.length.toString().padStart(2, "0"),

      sub: `${activeUsers.length} active accounts`,

      icon: Users,

      tone: "mint",

    },

    {

      title: "Active Jobs",

      value: activeJobs.length.toString().padStart(2, "0"),

      sub: "Approved job listings",

      icon: BriefcaseBusiness,

      tone: "blue",

    },

    {

      title: "Pending Approvals",

      value: pendingJobs.length.toString().padStart(2, "0"),

      sub: "Waiting for review",

      icon: ClipboardCheck,

      tone: "peach",

    },

    {

      title: "Applications",

      value: "128",

      sub: "Sample platform metric",

      icon: FileText,

      tone: "purple",

    },

  ];



  const filteredUsers = useMemo(

    () => users.filter(user =>

      `${user.name} ${user.email} ${user.status}`

        .toLowerCase()

        .includes(userSearch.toLowerCase())

    ),

    [users, userSearch]

  );



  const filteredJobs = useMemo(

    () => jobs.filter(job =>

      (jobFilter === "All" || job.status === jobFilter) &&

      `${job.title} ${job.company} ${job.location}`

        .toLowerCase()

        .includes(jobSearch.toLowerCase())

    ),

    [jobs, jobFilter, jobSearch]

  );



  const addLog = (text, detail, type = "success") => {

    setLogs(old => [

      {

        id: Date.now() + Math.random(),

        text,

        detail,

        type,

        time: new Date().toLocaleString(),

      },

      ...old,

    ].slice(0, 40));

  };



  const changeSection = id => {

    setSection(id);

    setSidebarOpen(false);

    setUserSearch("");

    setJobSearch("");

    setJobFilter("All");

  };



  const updateJobStatus = (id, status) => {

    const job = jobs.find(item => item.id === id);

    if (!job) return;



    setJobs(old => old.map(item =>

      item.id === id ? { ...item, status } : item

    ));



    addLog(`Job ${status.toLowerCase()}`, `${job.company} · ${job.title}`, "job");

    setToast(`Job marked as ${status.toLowerCase()}`);

  };



  const toggleUser = id => {

    const user = users.find(item => item.id === id);

    if (!user) return;



    const next = user.status === "Active" ? "Suspended" : "Active";



    setUsers(old => old.map(item =>

      item.id === id ? { ...item, status: next } : item

    ));



    addLog(`Student ${next.toLowerCase()}`, user.name, "user");

    setToast(`${user.name} is now ${next.toLowerCase()}`);

  };



  const openUserModal = (user = null) => {

    setEditing(user);

    setForm({

      ...initialForm,

      name: user?.name ?? "",

      email: user?.email ?? "",

      skills: user?.skills ?? 0,

    });

    setModal("user");

  };



  const openJobModal = (job = null) => {

    setEditing(job);

    setForm({

      ...initialForm,

      title: job?.title ?? "",

      company: job?.company ?? "",

      type: job?.type ?? "Internship",

      location: job?.location ?? "Remote",

    });

    setModal("job");

  };



  const saveUser = event => {

    event.preventDefault();

    const name = form.name.trim();

    const email = form.email.trim().toLowerCase();



    if (!name || !email) return;



    if (users.some(user => user.email.toLowerCase() === email && user.id !== editing?.id)) {

      setToast("This email already exists");

      return;

    }



    const record = {

      id: editing?.id ?? Date.now(),

      name,

      email,

      role: "Student",

      skills: Math.max(0, Number(form.skills) || 0),

      status: editing?.status ?? "Active",

      joined: editing?.joined ?? new Date().toISOString().slice(0, 10),

    };



    setUsers(old =>

      editing

        ? old.map(user => user.id === editing.id ? record : user)

        : [record, ...old]

    );



    addLog(editing ? "Student updated" : "Student added", name, "user");

    setToast(editing ? "Student updated successfully" : "Student added successfully");

    setModal(null);

  };



  const saveJob = event => {

    event.preventDefault();



    const title = form.title.trim();

    const company = form.company.trim();



    if (!title || !company) return;



    const record = {

      id: editing?.id ?? Date.now(),

      title,

      company,

      type: form.type,

      location: form.location.trim() || "Remote",

      status: editing?.status ?? "Pending",

      date: editing?.date ?? new Date().toISOString().slice(0, 10),

    };



    setJobs(old =>

      editing

        ? old.map(job => job.id === editing.id ? record : job)

        : [record, ...old]

    );



    addLog(editing ? "Job updated" : "New job submitted", `${company} · ${title}`, "job");

    setToast(editing ? "Job updated successfully" : "Job added for review");

    setModal(null);

  };



  const resetDemo = () => {

    if (!window.confirm("Reset all admin demo changes?")) return;

    setUsers(INITIAL_USERS);

    setJobs(INITIAL_JOBS);

    setLogs(INITIAL_LOGS);

    setToast("Demo data restored");

  };



  return (

    <div className="ad-app">

      {/* MOBILE / OVERLAY SIDEBAR */}

      {sidebarOpen && (

        <button

          className="ad-scrim"

          aria-label="Close sidebar"

          onClick={() => setSidebarOpen(false)}

        />

      )}



      <aside
          id="admin-sidebar"
          className={`ad-sidebar ${sidebarOpen ? "ad-sidebar-open" : ""}`}
          aria-hidden={!sidebarOpen}
          inert={!sidebarOpen}
        >

        <div className="ad-side-brand">

          <a href="/" className="ad-brand-link">

            <img src={logo} alt="CareerLens" />

            <span>

              <strong>CareerLens</strong>

              <small>Admin workspace</small>

            </span>

          </a>

          <button className="ad-side-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">

            <X size={19} />

          </button>

        </div>



        <div className="ad-nav-title">MANAGEMENT</div>



        <nav className="ad-navigation">

          {NAVIGATION.map(({ id, title, icon: Icon }) => (

            <button

              type="button"

              key={id}

              className={`ad-nav-item ${section === id ? "ad-nav-active" : ""}`}

              onClick={() => changeSection(id)}

            >

              <Icon size={18} />

              <span>{title}</span>

              {id === "approvals" && pendingJobs.length > 0 && (

                <small className="ad-nav-count">{pendingJobs.length}</small>

              )}

              {section === id && <span className="ad-nav-dot" />}

            </button>

          ))}

        </nav>



        <div className="ad-side-bottom">

          <div className="ad-admin-support">

            <span className="ad-support-icon"><ShieldCheck size={20} /></span>

            <strong>Platform control center</strong>

            <p>Manage your students, review opportunities and keep CareerLens running smoothly.</p>

          </div>



          <a href="/" className="ad-back-link">

            <LogOut size={17} />

            Back to website

          </a>

        </div>

      </aside>



      <div className="ad-workspace">

        {/* TOPBAR */}

        <header className="ad-topbar">

          <div className="ad-top-left">

            <button
                type="button"
                className="ad-menu-toggle"
                onClick={() => setSidebarOpen(v => !v)}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                aria-expanded={sidebarOpen}
                aria-controls="admin-sidebar"
              >

              <Menu size={21} />

            </button>

            <span className="ad-crumb">Workspace</span>

            <ChevronDown size={14} className="ad-crumb-arrow" />

            <strong>{NAVIGATION.find(item => item.id === section)?.title}</strong>

          </div>



          <div className="ad-top-right">

            <span className="ad-online"><i /> Admin workspace</span>

            <div className="ad-notification-area">

              <button

                className="ad-icon-btn"

                aria-label="Notifications"

                aria-expanded={notificationsOpen}

                onClick={() => setNotificationsOpen(v => !v)}

              >

                <Bell size={19} />

                {pendingJobs.length > 0 && <span className="ad-bell-dot" />}

              </button>

              {notificationsOpen && (

                <div className="ad-notification-popover">

                  <strong>Notifications</strong>

                  <p>{pendingJobs.length} job listings are waiting for review.</p>

                  <button onClick={() => {

                    changeSection("approvals");

                    setNotificationsOpen(false);

                  }}>View approvals <ArrowRight size={14} /></button>

                </div>

              )}

            </div>

            <span className="ad-top-divider" />

            <span className="ad-avatar">AD</span>

            <div className="ad-top-account">

              <strong>Administrator</strong>

              <small>Demo admin account</small>

            </div>

          </div>

        </header>



        <main className="ad-content">

          {/* OVERVIEW */}

          {section === "overview" && (

            <>

              <div className="ad-pageheading">

                <div>

                  <div className="ad-eyebrow">CAREERLENS / ADMIN DASHBOARD</div>

                  <h1>Platform Overview <span>✳</span></h1>

                  <p>Everything happening across your career platform, in one place.</p>

                </div>

                <span className="ad-demo-pill"><Sparkles size={14} /> Demo Dashboard</span>

              </div>



              <section className="ad-hero">

                <div className="ad-hero-copy">

                  <div className="ad-hero-kicker"><Sparkles size={14} /> PLATFORM MANAGEMENT MADE SIMPLE</div>

                  <h2>Powering better careers,<br /><em>one student at a time.</em></h2>

                  <p>Monitor your growing community, review job opportunities, and manage your platform with confidence.</p>

                  <button onClick={() => changeSection("users")}>

                    Manage students <ArrowRight size={17} />

                  </button>

                </div>

                <div className="ad-hero-visual" aria-hidden="true">

                  <div className="ad-orbit ad-orbit-one" />

                  <div className="ad-orbit ad-orbit-two" />

                  <div className="ad-center-emblem"><ShieldCheck size={43} /></div>

                  <div className="ad-float ad-float-one"><UserCheck size={16} /> Students <b>{users.length}</b></div>

                  <div className="ad-float ad-float-two"><BriefcaseBusiness size={16} /> Active jobs <b>{activeJobs.length}</b></div>

                  <span className="ad-hero-star">✳</span>

                </div>

              </section>



              <section className="ad-stats">

                {metrics.map(({ title, value, sub, icon: Icon, tone }) => (

                  <article className="ad-stat-card" key={title}>

                    <div className={`ad-stat-icon ad-tone-${tone}`}><Icon size={21} /></div>

                    <div className="ad-stat-label">{title}</div>

                    <div className="ad-stat-bottom">

                      <strong>{value}</strong>

                      <span>{sub}</span>

                    </div>

                  </article>

                ))}

              </section>



              <div className="ad-dashboard-grid">

                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div>

                      <span className="ad-eyebrow">PLATFORM INSIGHTS</span>

                      <h2>Student Growth</h2>

                      <p>Illustrative monthly growth chart</p>

                    </div>

                    <TrendingUp size={21} />

                  </div>

                  <div className="ad-chart">

                    {USER_GROWTH.map(item => (

                      <div className="ad-chart-column" key={item.label}>

                        <div className="ad-chart-track">

                          <div style={{ height: `${item.value}%` }} />

                        </div>

                        <span>{item.label}</span>

                      </div>

                    ))}

                  </div>

                </section>



                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div>

                      <span className="ad-eyebrow">ATTENTION NEEDED</span>

                      <h2>Pending Job Reviews</h2>

                      <p>Approve or reject new opportunities</p>

                    </div>

                    <ClipboardCheck size={21} />

                  </div>



                  <div className="ad-quick-list">

                    {pendingJobs.length === 0 ? (

                      <div className="ad-empty">All jobs have been reviewed.</div>

                    ) : pendingJobs.slice(0, 3).map(job => (

                      <div className="ad-quick-job" key={job.id}>

                        <span className="ad-list-icon"><BriefcaseBusiness size={18} /></span>

                        <div>

                          <strong>{job.title}</strong>

                          <small>{job.company}</small>

                        </div>

                        <button title="Approve job" aria-label={`Approve ${job.title}`} onClick={() => updateJobStatus(job.id, "Approved")} className="ad-icon-success"><Check size={16} /></button>

                        <button title="Reject job" aria-label={`Reject ${job.title}`} onClick={() => updateJobStatus(job.id, "Rejected")} className="ad-icon-danger"><Ban size={16} /></button>

                      </div>

                    ))}

                  </div>

                  <button className="ad-text-link" onClick={() => changeSection("approvals")}>

                    View all approvals <ArrowRight size={16} />

                  </button>

                </section>

              </div>



              <div className="ad-dashboard-grid">

                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div>

                      <span className="ad-eyebrow">COMMUNITY</span>

                      <h2>Recent Students</h2>

                      <p>Recently registered accounts</p>

                    </div>

                    <Users size={20} />

                  </div>

                  <div className="ad-table-wrap">

                    <table className="ad-table">

                      <thead><tr><th>Student</th><th>Skills</th><th>Status</th></tr></thead>

                      <tbody>

                        {users.slice(0, 4).map(user => (

                          <tr key={user.id}>

                            <td><div className="ad-user-cell"><span className="ad-mini-avatar">{initials(user.name)}</span><span><b>{user.name}</b><small>{user.email}</small></span></div></td>

                            <td>{user.skills}</td>

                            <td><Status value={user.status} /></td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                  <button className="ad-text-link" onClick={() => changeSection("users")}>

                    Manage students <ArrowRight size={16} />

                  </button>

                </section>



                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div>

                      <span className="ad-eyebrow">LATEST EVENTS</span>

                      <h2>Recent Activity</h2>

                      <p>Changes across your workspace</p>

                    </div>

                    <Activity size={20} />

                  </div>

                  <ActivityList logs={logs.slice(0, 4)} />

                  <button className="ad-text-link" onClick={() => changeSection("activity")}>

                    View activity history <ArrowRight size={16} />

                  </button>

                </section>

              </div>

            </>

          )}



          {/* USERS */}

          {section === "users" && (

            <>

              <PageTitle eyebrow="STUDENT MANAGEMENT" title="Manage Students" subtitle="Search profiles, update details and manage student access." action={

                <button className="ad-primary-btn" onClick={() => openUserModal()}><Plus size={17} /> Add Student</button>

              } />



              <div className="ad-management-summary">

                <span><Users size={18} /> {users.length} Total Students</span>

                <span><CheckCircle2 size={18} /> {activeUsers.length} Active</span>

                <span><Ban size={18} /> {users.length - activeUsers.length} Suspended</span>

              </div>



              <section className="ad-panel">

                <div className="ad-toolbar">

                  <div className="ad-search">

                    <Search size={18} />

                    <input placeholder="Search name, email or status..." value={userSearch} onChange={e => setUserSearch(e.target.value)} />

                  </div>

                  <span className="ad-record-count">{filteredUsers.length} students</span>

                </div>

                <div className="ad-table-wrap">

                  <table className="ad-table ad-data-table">

                    <thead><tr><th>Student</th><th>Skills</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>

                    <tbody>

                      {filteredUsers.map(user => (

                        <tr key={user.id}>

                          <td><div className="ad-user-cell"><span className="ad-mini-avatar">{initials(user.name)}</span><span><b>{user.name}</b><small>{user.email}</small></span></div></td>

                          <td>{user.skills}</td>

                          <td>{user.joined}</td>

                          <td><Status value={user.status} /></td>

                          <td>

                            <div className="ad-row-actions">

                              <button onClick={() => openUserModal(user)} title="Edit student"><Pencil size={16} /></button>

                              <button onClick={() => toggleUser(user.id)} title={user.status === "Active" ? "Suspend student" : "Activate student"}>

                                {user.status === "Active" ? <Ban size={16} /> : <Check size={16} />}

                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                  {filteredUsers.length === 0 && <div className="ad-empty">No students found.</div>}

                </div>

              </section>

            </>

          )}



          {/* JOBS AND APPROVALS */}

          {(section === "jobs" || section === "approvals") && (

            <>

              <PageTitle

                eyebrow="OPPORTUNITY MANAGEMENT"

                title={section === "approvals" ? "Pending Approvals" : "Manage Jobs"}

                subtitle="Review job submissions and maintain high-quality opportunities."

                action={<button className="ad-primary-btn" onClick={() => openJobModal()}><Plus size={17} /> Add Job</button>}

              />



              <section className="ad-panel">

                <div className="ad-toolbar">

                  <div className="ad-search">

                    <Search size={18} />

                    <input placeholder="Search jobs or companies..." value={jobSearch} onChange={e => setJobSearch(e.target.value)} />

                  </div>



                  <div className="ad-filter-tabs">

                    {(section === "approvals" ? ["Pending"] : ["All", "Pending", "Approved", "Rejected"]).map(tab => (

                      <button

                        key={tab}

                        className={(section === "approvals" ? tab === "Pending" : jobFilter === tab) ? "ad-filter-active" : ""}

                        onClick={() => setJobFilter(tab)}

                      >

                        {tab}

                      </button>

                    ))}

                  </div>

                </div>



                <div className="ad-table-wrap">

                  <table className="ad-table ad-data-table">

                    <thead><tr><th>Job & Company</th><th>Type</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>

                    <tbody>

                      {filteredJobs.filter(job => section !== "approvals" || job.status === "Pending").map(job => (

                        <tr key={job.id}>

                          <td><div className="ad-user-cell"><span className="ad-job-avatar"><BriefcaseBusiness size={17} /></span><span><b>{job.title}</b><small>{job.company}</small></span></div></td>

                          <td>{job.type}</td>

                          <td>{job.location}</td>

                          <td><Status value={job.status} /></td>

                          <td>

                            <div className="ad-row-actions">

                              <button title="Edit job" onClick={() => openJobModal(job)}><Pencil size={16} /></button>

                              {job.status !== "Approved" && <button title="Approve job" onClick={() => updateJobStatus(job.id, "Approved")}><Check size={16} /></button>}

                              {job.status !== "Rejected" && <button title="Reject job" onClick={() => updateJobStatus(job.id, "Rejected")}><Ban size={16} /></button>}

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                  {filteredJobs.filter(job => section !== "approvals" || job.status === "Pending").length === 0 && (

                    <div className="ad-empty">No matching jobs found.</div>

                  )}

                </div>

              </section>

            </>

          )}



          {/* ANALYTICS */}

          {section === "analytics" && (

            <>

              <PageTitle eyebrow="PLATFORM PERFORMANCE" title="Career Analytics" subtitle="Understand your platform's growth and opportunity pipeline." />



              <section className="ad-stats">

                {metrics.map(({ title, value, sub, icon: Icon, tone }) => (

                  <article className="ad-stat-card" key={title}>

                    <div className={`ad-stat-icon ad-tone-${tone}`}><Icon size={21} /></div>

                    <div className="ad-stat-label">{title}</div>

                    <div className="ad-stat-bottom"><strong>{value}</strong><span>{sub}</span></div>

                  </article>

                ))}

              </section>



              <div className="ad-dashboard-grid">

                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div><span className="ad-eyebrow">GROWTH REPORT</span><h2>Student Registrations</h2><p>Sample monthly series</p></div>

                    <TrendingUp size={20} />

                  </div>

                  <div className="ad-chart">

                    {USER_GROWTH.map(item => (

                      <div className="ad-chart-column" key={item.label}>

                        <div className="ad-chart-track"><div style={{ height: `${item.value}%` }} /></div>

                        <span>{item.label}</span>

                      </div>

                    ))}

                  </div>

                </section>



                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div><span className="ad-eyebrow">JOB MODERATION</span><h2>Job Status Breakdown</h2><p>Based on current demo records</p></div>

                    <Target size={20} />

                  </div>

                  <div className="ad-breakdown">

                    {["Approved", "Pending", "Rejected"].map(status => {

                      const count = jobs.filter(job => job.status === status).length;

                      const percent = jobs.length ? Math.round(count / jobs.length * 100) : 0;

                      return (

                        <div className="ad-breakdown-row" key={status}>

                          <div><strong>{status}</strong><span>{count} jobs · {percent}%</span></div>

                          <div className="ad-breakdown-track"><span style={{ width: `${percent}%` }} /></div>

                        </div>

                      );

                    })}

                  </div>

                </section>

              </div>

            </>

          )}



          {/* ACTIVITY */}

          {section === "activity" && (

            <>

              <PageTitle eyebrow="SYSTEM HISTORY" title="Recent Activity" subtitle="A record of changes made in this demo admin workspace." />

              <section className="ad-panel">

                <ActivityList logs={logs} />

              </section>

            </>

          )}



          {/* SETTINGS */}

          {section === "settings" && (

            <>

              <PageTitle eyebrow="WORKSPACE SETTINGS" title="Admin Settings" subtitle="Review demo workspace options and controls." />

              <div className="ad-settings-grid">

                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div><h2>Workspace information</h2><p>Your admin dashboard setup</p></div>

                    <ShieldCheck size={20} />

                  </div>

                  <div className="ad-setting-line"><span>Platform</span><strong>CareerLens</strong></div>

                  <div className="ad-setting-line"><span>Workspace mode</span><strong>Frontend demo</strong></div>

                  <div className="ad-setting-line"><span>Data storage</span><strong>Browser localStorage</strong></div>

                </section>



                <section className="ad-panel">

                  <div className="ad-panel-heading">

                    <div><h2>Demo data controls</h2><p>Restore the original sample records</p></div>

                    <RefreshCw size={20} />

                  </div>

                  <p className="ad-settings-description">

                    This action resets student records, job records and activity history in this browser only.

                  </p>

                  <button className="ad-outline-btn" onClick={resetDemo}><RefreshCw size={16} /> Reset Demo Data</button>

                </section>

              </div>

            </>

          )}



          <footer className="ad-footer">

            <span>CareerLens © 2026 · Admin Workspace</span>

            <span>From Your Skills to Your Next Opportunity.</span>

          </footer>

        </main>

      </div>



      {/* MODALS */}

      {modal === "user" && (

        <Modal title={editing ? "Edit Student" : "Add New Student"} onClose={() => setModal(null)}>

          <form onSubmit={saveUser} className="ad-modal-form">

            <label>Full name<input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter student name" /></label>

            <label>Email address<input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="student@example.com" /></label>

            <label>Skills identified<input type="number" min="0" max="500" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} /></label>

            <div className="ad-modal-actions">

              <button type="button" className="ad-outline-btn" onClick={() => setModal(null)}>Cancel</button>

              <button type="submit" className="ad-primary-btn"><Save size={16} /> Save Student</button>

            </div>

          </form>

        </Modal>

      )}



      {modal === "job" && (

        <Modal title={editing ? "Edit Job" : "Add New Job"} onClose={() => setModal(null)}>

          <form onSubmit={saveJob} className="ad-modal-form">

            <label>Job title<input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. React Developer" /></label>

            <label>Company name<input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" /></label>

            <div className="ad-form-two">

              <label>Job type<select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>

                <option>Internship</option><option>Full-time</option><option>Part-time</option><option>Contract</option>

              </select></label>

              <label>Location<input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Remote / City" /></label>

            </div>

            <div className="ad-modal-actions">

              <button type="button" className="ad-outline-btn" onClick={() => setModal(null)}>Cancel</button>

              <button type="submit" className="ad-primary-btn"><Save size={16} /> Save Job</button>

            </div>

          </form>

        </Modal>

      )}



      {toast && (

        <div className="ad-toast" role="status">

          <CheckCircle2 size={18} />

          {toast}

          <button aria-label="Dismiss" onClick={() => setToast("")}><X size={16} /></button>

        </div>

      )}

    </div>

  );

}



function PageTitle({ eyebrow, title, subtitle, action }) {

  return (

    <div className="ad-pageheading">

      <div>

        <div className="ad-eyebrow">{eyebrow}</div>

        <h1>{title} <span>✳</span></h1>

        <p>{subtitle}</p>

      </div>

      {action}

    </div>

  );

}



function ActivityList({ logs }) {

  return (

    <div className="ad-activity-list">

      {logs.map(log => (

        <div className="ad-activity-row" key={log.id}>

          <span className={`ad-activity-icon ad-event-${log.type}`}>

            {log.type === "user" ? <Users size={17} /> :

              log.type === "job" ? <BriefcaseBusiness size={17} /> :

              <CheckCircle2 size={17} />}

          </span>

          <div>

            <strong>{log.text}</strong>

            <small>{log.detail}</small>

          </div>

          <span className="ad-activity-time">{log.time}</span>

        </div>

      ))}

      {logs.length === 0 && <div className="ad-empty">No recent activity.</div>}

    </div>

  );

}
