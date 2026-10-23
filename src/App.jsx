
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing Page Components
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import How from "./components/HowItWorks";
import Play from "./components/Play";
import Marquee from "./components/Marquee";
import CTA from "./components/CTA";
import Foot from "./components/Footer";

// Student Pages
import StudentDashboard from "./components/pages/StudentDashboard";
import MySkills from "./components/pages/MySkills";
import Opportunities from "./components/pages/Opportunities";
import SkillGap from "./components/pages/SkillGap";


// Recruiter Page
import RecruiterDashboard from "./components/pages/RecruiterDashboard";

// Authentication Pages
import SignIn from "./auth/pages/SignIn";
import SignUp from "./auth/pages/SignUp";

// Admin Page
import AdminDashboard from "./components/admin/AdminDashboard";
function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Marquee />
      <Features />
      <How />
      <Play />
      <CTA />
      <Foot />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/my-skills" element={<MySkills />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/skillgaps" element={<SkillGap/>} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="*"
          element={
            <div style={{ padding: "40px", textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
              <a href="/">Back to Home</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
