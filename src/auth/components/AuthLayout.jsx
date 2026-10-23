import { useEffect, useState } from "react";
import Logo, { HOME_URL } from "./Logo";
import Icon from "./Icons";
import student from "../assets/student.png";
import resume from "../assets/resume.png";

const slides = [student, resume];

export default function AuthLayout({ badge, title, accent, text, points, children }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="split">
      <aside className="showcase">
        <div className="showcase-bg">
          {slides.map((s, i) => (
            <img key={i} src={s} alt="" className={i === cur ? "active" : ""} />
          ))}
        </div>
        <div className="showcase-overlay" />
        <div className="showcase-in">
          <Logo light />
          <div className="showcase-body">
            <span className="badge">{badge}</span>
            <h2>
              {title} <span>{accent}</span>
            </h2>
            <p>{text}</p>
            <ul className="points">
              {points.map((p) => (
                <li key={p.t}>
                  <span className="pt-ic"><Icon n={p.i} size={18} /></span>
                  <span><b>{p.t}</b><small>{p.d}</small></span>
                </li>
              ))}
            </ul>
          </div>
          <p className="showcase-foot">© {new Date().getFullYear()} CareerLens</p>
        </div>
      </aside>

      <section className="formside">
        <div className="topbar">
          <div className="topbar-logo"><Logo /></div>
          <a href={HOME_URL} className="back"><Icon n="back" size={16} /> Back to home</a>
        </div>
        <div className="formside-in">{children}</div>
      </section>
    </main>
  );
}
