import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  const scrollToComponent = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 80;
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      if (isOpen) {
        toggleMenu();
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-20 bg-brutal-bg border-b-3 border-brutal-dark flex justify-between items-center px-4 md:px-8 xl:px-12 z-[100] transition-transform duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* LOGO */}
        <button
          onClick={() => scrollToComponent('hero')}
          className="logo font-mono text-xl md:text-2xl font-black tracking-tight text-brutal-dark select-none cursor-pointer hover:rotate-[-4deg] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Portofolio<span className="text-brutal-pink">.</span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6 lg:gap-10 items-center">
          <button
            onClick={() => scrollToComponent('work')}
            className="text-xs uppercase font-bold tracking-wider text-brutal-dark relative py-1 cursor-pointer group select-none"
          >
            Karya
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brutal-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </button>
          <button
            onClick={() => scrollToComponent('about')}
            className="text-xs uppercase font-bold tracking-wider text-brutal-dark relative py-1 cursor-pointer group select-none"
          >
            Tentang
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brutal-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </button>
          <button
            onClick={() => scrollToComponent('contact')}
            className="px-5 py-2.5 bg-brutal-dark text-white border-3 border-brutal-dark shadow-[4px_4px_0px_0px_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#111111] hover:bg-brutal-yellow hover:text-brutal-dark text-xs uppercase font-bold tracking-wider cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 select-none"
          >
            Hubungi Saya
          </button>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-between w-9 h-6 bg-transparent border-none cursor-pointer p-0 z-[101] focus:outline-none"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block w-full h-1 bg-brutal-dark transition-all duration-300 origin-center ${
              isOpen ? 'translate-y-2.5 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-full h-1 bg-brutal-dark transition-all duration-300 ${
              isOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-full h-1 bg-brutal-dark transition-all duration-300 origin-center ${
              isOpen ? '-translate-y-2.5 -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      {/* MOBILE NAV DRAWER */}
      <div
        className={`fixed inset-0 bg-brutal-bg z-[99] flex flex-col justify-center items-center gap-8 px-6 transition-transform duration-500 bg-grid ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!isOpen}
      >
        <button
          onClick={() => scrollToComponent('work')}
          className="text-3xl md:text-4xl font-black uppercase text-brutal-dark hover:text-brutal-pink transition-colors cursor-pointer select-none"
        >
          Karya
        </button>
        <button
          onClick={() => scrollToComponent('about')}
          className="text-3xl md:text-4xl font-black uppercase text-brutal-dark hover:text-brutal-pink transition-colors cursor-pointer select-none"
        >
          Tentang
        </button>
        <button
          onClick={() => scrollToComponent('contact')}
          className="text-3xl md:text-4xl font-black uppercase text-brutal-dark hover:text-brutal-pink transition-colors cursor-pointer select-none"
        >
          Hubungi
        </button>
        <a
          href="mailto:harissyc65@gmail.com"
          className="px-6 py-3 bg-brutal-pink text-white border-3 border-brutal-dark shadow-[6px_6px_0_0_#111111] hover:shadow-[4px_4px_0_0_#111111] active:translate-x-1 active:translate-y-1 active:shadow-none text-xl font-bold uppercase tracking-wider select-none"
        >
          Email ↗
        </a>

        <div className="absolute bottom-8 text-center font-mono text-xs text-brutal-dark/60 select-none">
          <p>© 2026 Haris Syc. Semua hak dilindungi.</p>
        </div>
      </div>
    </>
  );
}
