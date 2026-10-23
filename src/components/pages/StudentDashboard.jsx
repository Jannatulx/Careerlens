
import { useState } from "react";
import {
  ArrowRight,
  Zap,
  BookOpen,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  ClipboardList,
  Target,
  UserRound,
  FileText,
  ChartNoAxesCombined,
  Clock3,
  CalendarDays,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Search,
} from "lucide-react";

import DashboardLayout from "../dashboard/DashboardLayout";
import "./StudentDashboard.css";

const stats = [
  {
    title: "Career Readiness",
    value: "78%",
    detail: "Demo readiness score",
    icon: Target,
    tone: "green",
  },
  {
    title: "Skills Identified",
    value: "14",
    detail: "Skills in your profile",
    icon: BrainCircuit,
    tone: "purple",
  },
  {
    title: "Job Matches",
    value: "12",
    detail: "Suggested opportunities",
    icon: BriefcaseBusiness,
    tone: "blue",
  },
  {
    title: "Applications",
    value: "08",
    detail: "Applications tracked",
    icon: ClipboardList,
    tone: "orange",
  },
];

const skills = [
  { name: "JavaScript", score: 90 },
  { name: "React.js", score: 78 },
  { name: "Node.js", score: 62 },
  { name: "MongoDB", score: 58 },
  { name: "Git & GitHub", score: 75 },
];

const jobs = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Remote",
    type: "Internship",
    match: 94,
    skills: ["React", "JavaScript", "Git"],
    initial: "T",
    tone: "green",
  },
  {
    title: "Junior MERN Developer",
    company: "CodeLabs",
    location: "Hybrid",
    type: "Full-time",
    match: 87,
    skills: ["Node.js", "React", "MongoDB"],
    initial: "C",
    tone: "purple",
  },
  {
    title: "Web Developer Intern",
    company: "SoftZone",
    location: "On-site",
    type: "Internship",
    match: 82,
    skills: ["HTML", "CSS", "JavaScript"],
    initial: "S",
    tone: "blue",
  },
];

const deadlines = [
  {
    title: "Frontend Internship",
    days: "3 days left",
    urgent: true,
  },
  {
    title: "Software Engineer Intern",
    days: "7 days left",
    urgent: false,
  },
  {
    title: "Junior Developer",
    days: "12 days left",
    urgent: false,
  },
];

const activities = [
  {
    title: "Profile updated",
    detail: "Skills and education reviewed",
    icon: UserRound,
  },
  {
    title: "CV analysis completed",
    detail: "Resume feedback generated",
    icon: FileText,
  },
  {
    title: "New job recommendations",
    detail: "3 suggested opportunities",
    icon: BriefcaseBusiness,
  },
];

function StatCard({ data }) {
  const Icon = data.icon;

  return (
    <article className="cld-stat-card">
      <div className="cld-stat-heading">
        <span className={`cld-stat-icon cld-${data.tone}`}>
          <Icon size={20} />
        </span>

        <ArrowUpRight
          size={16}
          className="cld-subtle-icon"
        />
      </div>

      <p>{data.title}</p>
      <strong>{data.value}</strong>
      <small>{data.detail}</small>
    </article>
  );
}

function ProgressBar({ name, score }) {
  return (
    <div className="cld-skill-item">
      <div className="cld-skill-meta">
        <strong>{name}</strong>
        <span>{score}%</span>
      </div>

      <div
        className="cld-skill-track"
        role="progressbar"
        aria-label={`${name} progress`}
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <article className="cld-job-card">
      <div className="cld-job-head">
        <div
          className={`cld-company-icon cld-${job.tone}`}
        >
          {job.initial}
        </div>

        <span className="cld-match">
          {job.match}% Match
        </span>
      </div>

      <h3>{job.title}</h3>
      <p className="cld-company">{job.company}</p>

      <div className="cld-job-tags">
        <span>{job.type}</span>
        <span>{job.location}</span>
      </div>

      <div className="cld-required-skills">
        {job.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="cld-job-bottom">
        <span>Example listing</span>
        <ArrowUpRight size={18} />
      </div>
    </article>
  );
}

export default function StudentDashboard() {
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.skills.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout currentPath="/dashboard">

      {/* PAGE HEADING */}
      <div className="cld-page-heading">
        <div>
          <div className="cld-eyebrow">
            <span />
            YOUR CAREER OVERVIEW
          </div>

          <h1>Good morning, future achiever 👋</h1>

          <p>
            Here's a snapshot of your career journey so far.
          </p>
        </div>

        <span className="cld-demo-label">
          <Sparkles size={14} />
          Demo Workspace
        </span>
      </div>

      {/* PREMIUM GREEN HERO */}
      <section
        className="cld-premium-hero"
        aria-label="Career growth overview"
      >
        <div className="cld-hero-copy">
          <div className="cld-hero-kicker">
            <Sparkles size={14} />
            YOUR JOURNEY STARTS HERE
          </div>

          <h2>
            Turn your potential into
            <br />
            <em>your next opportunity.</em>
          </h2>

          <p>
            Build meaningful skills, understand where you
            stand, and move closer to the career you want.
          </p>

          <a
            href="#cld-your-skills"
            className="cld-hero-action"
          >
            Explore your progress
            <ArrowRight size={16} />
          </a>
        </div>

        <div
          className="cld-hero-art"
          aria-hidden="true"
        >
          <span className="cld-hero-orbit cld-hero-orbit-one" />
          <span className="cld-hero-orbit cld-hero-orbit-two" />

          <div className="cld-hero-mark">
            <Zap size={38} />
          </div>

          <div className="cld-floating-skill cld-float-first">
            <BookOpen size={16} />
            React
            <b>78%</b>
          </div>

          <div className="cld-floating-skill cld-float-second">
            <Sparkles size={16} />
            Career ready
            <b>78%</b>
          </div>

          <span className="cld-hero-star">✳</span>
        </div>
      </section>

      {/* OVERVIEW STATS */}
      <section className="cld-stats">
        {stats.map((item) => (
          <StatCard key={item.title} data={item} />
        ))}
      </section>

      {/* CAREER READINESS AND DEADLINES */}
      <div className="cld-overview-grid">

        <section className="cld-panel">
          <div className="cld-panel-title">
            <div>
              <h2>Career Readiness</h2>
              <p>Your career preparation overview</p>
            </div>

            <Target size={20} />
          </div>

          <div className="cld-readiness-body">
            <div className="cld-donut">
              <div className="cld-donut-inside">
                <strong>78%</strong>
                <small>Readiness</small>
              </div>
            </div>

            <div className="cld-readiness-breakdown">
              {[
                ["Resume", 85],
                ["Skills", 72],
                ["Projects", 80],
                ["Experience", 65],
              ].map(([name, score]) => (
                <div
                  className="cld-mini-skill"
                  key={name}
                >
                  <div>
                    <span>{name}</span>
                    <b>{score}%</b>
                  </div>

                  <div className="cld-mini-track">
                    <span
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cld-panel-footnote">
            <TrendingUp size={15} />
            Improve your profile to strengthen your readiness.
          </div>
        </section>

        <section className="cld-panel">
          <div className="cld-panel-title">
            <div>
              <h2>Upcoming Deadlines</h2>
              <p>Keep track of application timelines</p>
            </div>

            <CalendarDays size={20} />
          </div>

          <div className="cld-deadline-list">
            {deadlines.map((item) => (
              <div
                className="cld-deadline"
                key={item.title}
              >
                <div
                  className={`cld-deadline-icon ${
                    item.urgent ? "cld-urgent" : ""
                  }`}
                >
                  <Clock3 size={18} />
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.days}</small>
                </div>

                <span
                  className={
                    item.urgent
                      ? "cld-due-badge"
                      : "cld-upcoming-badge"
                  }
                >
                  {item.urgent ? "Soon" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>

          <p className="cld-panel-footnote">
            Example deadlines for UI preview.
          </p>
        </section>

      </div>

      {/* RECOMMENDED OPPORTUNITIES */}
      <section className="cld-jobs-section">
        <div className="cld-section-heading">
          <div>
            <span className="cld-section-eyebrow">
              DISCOVER
            </span>

            <h2>Recommended Opportunities</h2>

            <p>
              Explore roles aligned with your career interests.
            </p>
          </div>

          <span className="cld-results-count">
            {filteredJobs.length} results
          </span>
        </div>

        <div className="cld-dashboard-search">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search recommended jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search recommended jobs"
          />
        </div>

        <div className="cld-jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.title} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="cld-empty-state">
            No jobs matched your search.
          </div>
        )}
      </section>

      {/* SKILLS AND RECENT ACTIVITY */}
      <div
        className="cld-bottom-grid"
        id="cld-your-skills"
      >
        <section className="cld-panel">
          <div className="cld-panel-title">
            <div>
              <h2>Skill Progress</h2>
              <p>Your technical strengths at a glance</p>
            </div>

            <ChartNoAxesCombined size={20} />
          </div>

          <div className="cld-skill-list">
            {skills.map((skill) => (
              <ProgressBar
                key={skill.name}
                {...skill}
              />
            ))}
          </div>
        </section>

        <section className="cld-panel">
          <div className="cld-panel-title">
            <div>
              <h2>Recent Activity</h2>
              <p>Your recent career milestones</p>
            </div>

            <Clock3 size={20} />
          </div>

          <div className="cld-activity-list">
            {activities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="cld-activity"
                  key={item.title}
                >
                  <span className="cld-activity-icon">
                    <Icon size={17} />
                  </span>

                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>

                  <CheckCircle2
                    size={17}
                    className="cld-activity-check"
                  />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="cld-footer">
        <span>CareerLens © 2026</span>

        <span>
          From Your Skills to Your Next Opportunity.
        </span>
      </footer>

    </DashboardLayout>
  );
}
