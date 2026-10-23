
import { useEffect, useState } from "react";
import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

import logo from "../../assets/logo.png";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout({
  children,
  currentPath = "/dashboard",
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="cld-app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={currentPath}
      />

      <header className="cld-topbar">
        <div className="cld-top-left">
          <button
            type="button"
            className="cld-menu-button"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="cld-sidebar"
            onClick={() => setSidebarOpen(v => !v)}
          >
            <Menu size={22} />
          </button>

          <a href="/" className="cld-top-brand">
            <img src={logo} alt="CareerLens" />
            <div>
              <strong>CareerLens</strong>
              <small>Career Growth Platform</small>
            </div>
          </a>
        </div>

        <div className="cld-top-actions">
          <span className="cld-workspace-label">
            Student Workspace
          </span>

          <span className="cld-user-menu">
            <span className="cld-avatar">S</span>
            Student
          </span>
        </div>
      </header>

      <main className="cld-main">
        {children}
      </main>
    </div>
  );
}
