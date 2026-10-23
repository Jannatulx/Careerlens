import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import Icon, { GoogleIcon } from "../components/Icons";
import "../styles/Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ROLES = ["Student", "Graduate", "Professional", "Recruiter"];

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];

export default function SignUp() {
  const [f, setF] = useState({ name: "", email: "", university: "", role: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const s = f.password ? strength(f.password) : -1;

  function validate() {
    const e = {};
    if (!f.name.trim()) e.name = "Please enter your full name.";
    if (!f.email.trim()) e.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email, like name@example.com.";
    if (!f.role) e.role = "Please choose your role.";
    if (!f.password) e.password = "Please create a password.";
    else if (f.password.length < 8) e.password = "Use at least 8 characters.";
    if (!f.confirm) e.confirm = "Please confirm your password.";
    else if (f.confirm !== f.password) e.confirm = "Passwords do not match.";
    if (!agree) e.agree = "Please accept the Terms and Privacy Policy.";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    // TODO: replace with your real sign-up API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
  }

  return (
    <AuthLayout
      badge="Join CareerLens"
      title="Your career workspace,"
      accent="all in one place."
      text="Understand your skills, find the right opportunities and track your progress."
      points={[
        { i: "cv", t: "Upload your CV", d: "Get instant AI-powered feedback" },
        { i: "target", t: "Analyze your skills", d: "Spot gaps and learn what to build next" },
        { i: "board", t: "Find roles & track applications", d: "Matched jobs, organised progress" },
      ]}
    >
      <div className="card">
        <header className="card-head">
          <h1>Create your account</h1>
          <p>Join CareerLens and take the next step.</p>
        </header>

        {done && (
          <div className="success" role="status">
            <Icon n="check" size={18} /> Account created! Welcome to CareerLens.
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <Field id="name" label="Full name" icon="user" placeholder="Enter your name" autoComplete="name"
            value={f.name} onChange={set("name")} error={errors.name} />

          <Field id="email" label="Email address" icon="mail" type="email" placeholder="name@example.com"
            autoComplete="email" value={f.email} onChange={set("email")} error={errors.email} />

          <div className="two-col">
            <Field id="university" label="University" icon="school" placeholder="Optional"
              autoComplete="organization" value={f.university} onChange={set("university")} />

            <Field id="role" label="I am a" icon="brief" error={errors.role}>
              <select id="role" value={f.role} onChange={set("role")} aria-invalid={!!errors.role}
                className={f.role ? "" : "placeholder"}>
                <option value="" disabled>Select role</option>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
          </div>

          <div className="two-col">
            <Field id="password" label="Password" icon="lock" type="password" placeholder="Min. 8 characters"
              autoComplete="new-password" value={f.password} onChange={set("password")} error={errors.password} />

            <Field id="confirm" label="Confirm password" icon="lock" type="password" placeholder="Repeat password"
              autoComplete="new-password" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
          </div>

          {s >= 0 && (
            <div className="meter" aria-live="polite">
              <div className={"bars s" + Math.max(s, 1)}>
                {[0, 1, 2, 3].map((i) => <i key={i} className={i < Math.max(s, 1) ? "on" : ""} />)}
              </div>
              <span>{LABELS[s]}</span>
            </div>
          )}

          <div className={"agree" + (errors.agree ? " has-error" : "")}>
            <label className="check">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span className="box"><Icon n="check" size={12} /></span>
              <span>I agree to the <a href="#terms" className="text-link">Terms</a> and <a href="#privacy" className="text-link">Privacy Policy</a></span>
            </label>
            {errors.agree && <p className="err" role="alert"><Icon n="alert" size={14} /> {errors.agree}</p>}
          </div>

          <button type="submit" className="btn-main" disabled={loading}>
            {loading ? <span className="spin" aria-label="Creating account" /> : <>Create Account <Icon n="arrow" size={18} /></>}
          </button>

          <div className="divider"><span>or sign up with</span></div>

          <button type="button" className="btn-google"><GoogleIcon /> Continue with Google</button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
