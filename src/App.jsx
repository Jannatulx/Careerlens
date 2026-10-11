import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import How from './components/HowItWorks';
import Play from './components/Play';
import Marquee from './components/Marquee';
import CTA from './components/CTA';
import Foot from './components/Footer';
import MySkills from './components/pages/MySkills';
export default function App() {
  if (window.location.pathname === '/my-skills') {
  return <MySkills />;
}
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
