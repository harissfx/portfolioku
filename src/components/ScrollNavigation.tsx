import { useEffect, useState } from 'react';

export default function ScrollNavigation() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState<'hero' | 'work' | 'about' | 'contact'>('hero');
  const [arrowVisible, setArrowVisible] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let arrowTimeout: number;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);

      const sections = [
        { id: 'hero', index: 'hero' },
        { id: 'work', index: 'work' },
        { id: 'about', index: 'about' },
        { id: 'contact', index: 'contact' },
      ];

      let currentActiveIndex: 'hero' | 'work' | 'about' | 'contact' = 'hero';
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActiveIndex = sec.index as 'hero' | 'work' | 'about' | 'contact';
            break;
          }
        }
      }
      setActiveSection(currentActiveIndex);

      const delta = Math.abs(scrollTop - lastScrollY);
      if (delta > 10) {
        setArrowVisible(true);
        setIsScrollUp(scrollTop < lastScrollY);

        window.clearTimeout(arrowTimeout);
        arrowTimeout = window.setTimeout(() => {
          setArrowVisible(false);
        }, 1500);
      }

      lastScrollY = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(arrowTimeout);
    };
  }, []);

  const scrollToComponent = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  const sectionIndexes = {
    hero: '01',
    work: '02',
    about: '03',
    contact: '04',
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-brutal-pink z-[1000] transition-[width] duration-75 origin-left"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Scroll Progress Dots (Side-lying menu) */}
      <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[98] hidden sm:flex flex-col gap-3 p-3 bg-white/95 border-3 border-brutal-dark shadow-[4px_4px_0_0_#111111] backdrop-blur-sm select-none">
        {(['hero', 'work', 'about', 'contact'] as const).map((id) => (
          <button
            key={id}
            onClick={() => scrollToComponent(id)}
            className={`group relative w-2.5 h-2.5 bg-transparent border-2 border-brutal-dark cursor-pointer transition-all duration-300 ${
              activeSection === id ? 'bg-brutal-pink scale-125' : 'hover:scale-110'
            }`}
            aria-label={`Scroll to ${id}`}
          >
            {/* Label Tooltip on hover */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-brutal-dark text-white text-[10px] font-mono uppercase font-bold py-1 px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {id === 'hero' ? 'Home' : id === 'work' ? 'Karya' : id === 'about' ? 'Tentang' : 'Kontak'}
            </span>
          </button>
        ))}
      </div>

      {/* Section Counter Bottom-Left */}
      <div className="fixed left-3 md:left-5 bottom-4 md:bottom-8 z-[97] hidden sm:block font-mono font-black text-xs md:text-sm text-brutal-dark bg-brutal-bg border-3 border-brutal-dark px-3.5 py-2 shadow-[4px_4px_0_0_#111111] pointer-events-none select-none">
        <span className="text-brutal-pink text-base">{sectionIndexes[activeSection]}</span>/
        <span>04</span>
      </div>

      {/* Scroll Direction Indicator Bottom-Right */}
      <div
        className={`fixed right-16 md:right-24 bottom-4 md:bottom-8 z-[96] w-9 h-9 md:w-10 md:h-10 bg-brutal-yellow border-3 border-brutal-dark shadow-[3px_3px_0_0_#111111] hidden sm:flex items-center justify-center pointer-events-none transition-all duration-300 ${
          arrowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          className={`w-5 h-5 transition-transform duration-350 ${isScrollUp ? 'rotate-180' : ''}`}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </>
  );
}
