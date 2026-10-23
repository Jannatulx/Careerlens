
import logo from "../../assets/logo.png";
import {
  X,
  LayoutDashboard,
  UserRound,
  FileText,
  BrainCircuit,
  BriefcaseBusiness,
  Bookmark,
  ClipboardList,
  ChartNoAxesCombined,
  Settings,
  BookOpen,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

export const sidebarItems = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", path: "/dashboard/profile", icon: UserRound },
  { label: "Resume Analyzer", path: "/dashboard/resume", icon: FileText },
  { label: "My Skills", path: "/dashboard/skills", icon: BookOpen },
  { label: "Skill Gap Analysis", path: "/dashboard/skill-gap", icon: BrainCircuit },
   { label: "Opportunities", path: "/dashboard/opportunities", icon: BrainCircuit },
  { label: "Job Search", path: "/dashboard/jobs", icon: BriefcaseBusiness },
  { label: "Saved Jobs", path: "/dashboard/saved", icon: Bookmark },
  { label: "Applications", path: "/dashboard/applications", icon: ClipboardList },
  { label: "Career Analytics", path: "/dashboard/analytics", icon: ChartNoAxesCombined },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({
  open,
  onClose,
  currentPath = "/dashboard",
}) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="cld-backdrop"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        id="cld-sidebar"
        className={`cld-sidebar ${open ? "cld-sidebar-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="cld-side-top">
          <a href="/" className="cld-side-brand">
            <img src={logo} alt="CareerLens" />
            <div>
              <strong>CareerLens</strong>
              <span>STUDENT WORKSPACE</span>
            </div>
          </a>

          <button
            type="button"
            className="cld-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <div className="cld-side-label">WORKSPACE</div>

        <nav className="cld-side-menu">
          {sidebarItems.map(({ label, path, icon: Icon }) => {
            const active = currentPath === path;
            const available = path === "/dashboard";

            return available ? (
              <a
                key={path}
                href={path}
                onClick={onClose}
                className={`cld-side-link ${active ? "cld-selected" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{label}</span>
                {active && <span className="cld-selected-dot" />}
              </a>
            ) : (
              <button
                key={path}
                type="button"
                className="cld-side-link"
                disabled
                title={`${label} coming soon`}
              >
                <Icon size={18} />
                <span>{label}</span>
                <small>Soon</small>
              </button>
            );
          })}
        </nav>

        <div className="cld-side-bottom">
          <div className="cld-side-help">
            <BookOpen size={22} />
            <strong>Grow with CareerLens</strong>
            <p>Build your skills. Discover what's next.</p>
          </div>

          <a href="/" className="cld-home-link">
            <LogOut size={17} />
            Back to Website
          </a>
        </div>
      </aside>
    </>
  );
}
