import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import Icon, { GoogleIcon } from "../components/Icons";
import "../styles/Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function savedEmail() {
  try { return localStorage.getItem("cl_email") || ""; } catch { return ""; }
}

export default function SignIn() {
  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(!!savedEmail());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email, like name@example.com.";
    if (!password) e.password = "Please enter your password.";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      if (remember) localStorage.setItem("cl_email", email.trim());
      else localStorage.removeItem("cl_email");
    } catch { /* storage unavailable */ }
    // TODO: replace with your real sign-in API call
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
  }

  return (
    <AuthLayout
      badge="Welcome back"
      title="Pick up your career journey"
      accent="where you left off."
      text="Your CV insights, skill gaps and matched opportunities are waiting for you."
      points={[
        { i: "cv", t: "AI CV Insights", d: "Understand your strengths instantly" },
        { i: "target", t: "Smart Skill Matching", d: "Roles that fit your skills" },
        { i: "board", t: "Application Tracking", d: "Every application in one place" },
      ]}
    >
      <div className="card">
        <header className="card-head">
          <h1>Welcome back</h1>
          <p>Sign in to continue your career journey.</p>
        </header>

        {done && (
          <div className="success" role="status">
            <Icon n="check" size={18} /> Signed in successfully.
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <Field id="email" label="Email address" icon="mail" type="email" placeholder="name@example.com"
            autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />

          <Field id="password" label="Password" icon="lock" type="password" placeholder="Enter your password"
            autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
            error={errors.password} />

          <div className="form-row">
            <label className="check">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="box"><Icon n="check" size={12} /></span>
              Remember me
            </label>
            <a href="#forgot-password" className="text-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn-main" disabled={loading}>
            {loading ? <span className="spin" aria-label="Signing in" /> : <>Sign In <Icon n="arrow" size={18} /></>}
          </button>

          <div className="divider"><span>or continue with</span></div>

          <button type="button" className="btn-google"><GoogleIcon /> Continue with Google</button>
        </form>

        <p className="switch">
          Don&apos;t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
