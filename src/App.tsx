import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WorkSection from './components/WorkSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollNavigation from './components/ScrollNavigation';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-brutal-bg text-brutal-dark font-sans selection:bg-brutal-yellow selection:text-brutal-dark">
      {/* Visual noise effect filter */}
      <div className="fixed inset-0 pointer-events-none z-[1001] opacity-[0.035] noise-overlay" />

      {/* Decorative full-body Grid alignment layout */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-grid" />

      {/* Structured Site Modules */}
      <Header />
      <main className="relative z-10 w-full max-w-7xl mx-auto">
        <Hero />
        <Marquee />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Ambient feedback controls */}
      <ScrollNavigation />
      <CustomCursor />
    </div>
  );
}
