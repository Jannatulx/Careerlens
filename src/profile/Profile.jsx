import { useState } from "react";
import "./profile.css";

const STORAGE_KEY = "careerlens_profile";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Default data — replace with data from your backend later
const DEFAULT_PROFILE = {
  name: "Name",
  department: "Computer Science",
  university: "International Islamic University Chittagong",
  email: "name@example.com",
  phone: "+880 17XX-XXXXXX",
  graduation: "2027",
  targetRole: "MERN Developer",
  industry: "Technology",
  location: "Dhaka / Remote",
  employment: "Internship / Full-time",
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Python", "Git"],
  degree: "B.Sc. in Computer Science",
  eduFrom: "2023",
  eduTo: "2027",
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function initials(name) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "?";
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}

// One label/value row. Shows an input while editing.
function Row({ label, k, data, edit, setField, error, type = "text" }) {
  return (
    <div className="row">
      <span className="row-label">{label}</span>
      {edit ? (
        <div className="row-edit">
          <input
            type={type}
            value={data[k]}
            onChange={(e) => setField(k, e.target.value)}
            aria-label={label}
            aria-invalid={!!error}
            className={error ? "bad" : ""}
          />
          {error && <small className="err">{error}</small>}
        </div>
      ) : (
        <span className="row-value">{data[k] || "—"}</span>
      )}
    </div>
  );
}

export default function Profile() {
  const [saved, setSaved] = useState(load);
  const [draft, setDraft] = useState(saved);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [toast, setToast] = useState("");

  const data = edit ? draft : saved;
  const setField = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  function startEdit() {
    setDraft(saved);
    setErrors({});
    setNewSkill("");
    setEdit(true);
  }

  function cancel() {
    setEdit(false);
    setErrors({});
  }

  function save() {
    const e = {};
    if (!draft.name.trim()) e.name = "Name is required.";
    if (!EMAIL_RE.test(draft.email.trim())) e.email = "Enter a valid email.";
    setErrors(e);
    if (Object.keys(e).length) return;
    const clean = Object.fromEntries(
      Object.entries(draft).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );
    setSaved(clean);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(clean)); } catch { /* ignore */ }
    setEdit(false);
    setToast("Profile updated");
    setTimeout(() => setToast(""), 2200);
  }

  function addSkill(ev) {
    ev.preventDefault();
    const s = newSkill.trim();
    if (!s) return;
    if (!draft.skills.some((x) => x.toLowerCase() === s.toLowerCase()))
      setDraft((d) => ({ ...d, skills: [...d.skills, s] }));
    setNewSkill("");
  }

  const removeSkill = (s) => setDraft((d) => ({ ...d, skills: d.skills.filter((x) => x !== s) }));

  return (
    <main className="page">
      <div className="wrap">
        {/* Header */}
        <header className="head">
          <div>
            <h1>My Profile</h1>
            <p>Keep your career profile complete and up to date.</p>
          </div>
          {edit ? (
            <div className="actions">
              <button className="btn ghost" onClick={cancel}>Cancel</button>
              <button className="btn primary" onClick={save}>Save Changes</button>
            </div>
          ) : (
            <button className="btn primary" onClick={startEdit}>Edit Profile</button>
          )}
        </header>

        {/* Profile summary */}
        <section className="card summary">
          <div className="avatar" aria-hidden="true">{initials(data.name)}</div>
          <div className="summary-info">
            {edit ? (
              <div className="summary-edit">
                <div>
                  <input value={data.name} onChange={(e) => setField("name", e.target.value)}
                    placeholder="Full name" aria-label="Full name" className={"name-input" + (errors.name ? " bad" : "")} />
                  {errors.name && <small className="err">{errors.name}</small>}
                </div>
                <div className="two">
                  <input value={data.department} onChange={(e) => setField("department", e.target.value)}
                    placeholder="Department" aria-label="Department" />
                  <input value={data.university} onChange={(e) => setField("university", e.target.value)}
                    placeholder="University" aria-label="University" />
                </div>
              </div>
            ) : (
              <>
                <h2>{data.name}</h2>
                <p>{[data.department, data.university].filter(Boolean).join(" • ")}</p>
              </>
            )}
            <span className="badge"><i /> Career Ready</span>
          </div>
        </section>

        {/* Info cards */}
        <div className="grid2">
          <section className="card">
            <h3>Personal Information</h3>
            <Row label="Email" k="email" type="email" data={data} edit={edit} setField={setField} error={errors.email} />
            <Row label="Phone" k="phone" data={data} edit={edit} setField={setField} />
            <Row label="University" k="university" data={data} edit={edit} setField={setField} />
            <Row label="Graduation" k="graduation" data={data} edit={edit} setField={setField} />
          </section>

          <section className="card">
            <h3>Career Preference</h3>
            <Row label="Target role" k="targetRole" data={data} edit={edit} setField={setField} />
            <Row label="Industry" k="industry" data={data} edit={edit} setField={setField} />
            <Row label="Location" k="location" data={data} edit={edit} setField={setField} />
            <Row label="Employment" k="employment" data={data} edit={edit} setField={setField} />
          </section>
        </div>

        {/* Skills */}
        <section className="card block">
          <h3>Skills</h3>
          <ul className="chips">
            {data.skills.map((s) => (
              <li key={s} className="chip">
                {s}
                {edit && (
                  <button className="chip-x" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>×</button>
                )}
              </li>
            ))}
            {!data.skills.length && <li className="muted">No skills added yet.</li>}
          </ul>
          {edit && (
            <form className="add-skill" onSubmit={addSkill}>
              <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill, e.g. TypeScript" aria-label="Add a skill" maxLength={30} />
              <button type="submit" className="btn soft">Add</button>
            </form>
          )}
        </section>

        {/* Education */}
        <section className="card block">
          <h3>Education</h3>
          {edit ? (
            <div className="edu-edit">
              <input value={data.degree} onChange={(e) => setField("degree", e.target.value)} placeholder="Degree" aria-label="Degree" />
              <input value={data.university} onChange={(e) => setField("university", e.target.value)} placeholder="University" aria-label="University" />
              <div className="two">
                <input value={data.eduFrom} onChange={(e) => setField("eduFrom", e.target.value)} placeholder="From" aria-label="From year" />
                <input value={data.eduTo} onChange={(e) => setField("eduTo", e.target.value)} placeholder="To" aria-label="To year" />
              </div>
            </div>
          ) : (
            <div className="edu">
              <b>{data.degree} — {data.university}</b>
              <span>{data.eduFrom} — {data.eduTo}</span>
            </div>
          )}
        </section>
      </div>

      <div className={"toast" + (toast ? " show" : "")} role="status">{toast}</div>
    </main>
  );
}
