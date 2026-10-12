
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import How from "./components/HowItWorks";
import Play from "./components/Play";
import Marquee from "./components/Marquee";
import CTA from "./components/CTA";
import Foot from "./components/Footer";

import SignIn from "./auth/pages/SignIn";
import SignUp from "./auth/pages/SignUp";

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
      </Routes>
    </BrowserRouter>
  );
}
