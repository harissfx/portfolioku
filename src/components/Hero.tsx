import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import ScrambleText from './ScrambleText';
import TerminalCard from './TerminalCard';

function StatCounter({ endValue, label, delay = 0 }: { endValue: number; label: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          // Wait for delayed entry animation to start counting
          setTimeout(() => {
            let start = 0;
            const duration = 1200;
            const stepTime = Math.abs(Math.floor(duration / endValue));
            
            const timer = setInterval(() => {
              start += 1;
              setCount(start);
              if (start >= endValue) {
                setCount(endValue);
                clearInterval(timer);
              }
            }, Math.max(stepTime, 10));
          }, delay * 10);
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, hasRun, delay]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ y: 40, scale: 0.8 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 0.6,
        delay: delay + 0.1,
      }}
      whileHover={{
        y: -6,
        x: -2,
        rotate: [0, -1, 1, 0],
        boxShadow: '10px 10px 0px 0px #111111',
      }}
      transition-hover={{ type: 'spring', stiffness: 400, damping: 10 }}
      className="border-3 border-brutal-dark p-4 md:p-6 bg-white shadow-[4px_4px_0px_0px_#111111] cursor-grab active:cursor-grabbing flex-1 min-w-[140px] select-none text-left"
    >
      <span className="block text-3xl md:text-4xl font-black text-brutal-pink mb-1 font-mono">
        {count}+
      </span>
      <span className="font-mono text-xs text-brutal-dark/70 uppercase tracking-wider font-bold">
        {label}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    setCanDrag(mql.matches);
    const mqlListener = (e: MediaQueryListEvent) => setCanDrag(e.matches);
    mql.addEventListener('change', mqlListener);
    return () => mql.removeEventListener('change', mqlListener);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      const headerHeight = 80;
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="grid grid-cols-1 lg:grid-cols-12 min-h-[95vh] pt-32 pb-16 px-4 md:px-8 xl:px-12 items-center gap-10 bg-grid relative overflow-visible"
    >
      {/* Playful Interactive Workspace Sticker Badge (Draggable on Desktop only) */}
      <motion.div
        drag={canDrag}
        dragConstraints={containerRef}
        dragElastic={0.4}
        whileDrag={{ scale: 1.15, rotate: -8, cursor: 'grabbing' }}
        whileHover={{ rotate: 12, scale: 1.05 }}
        initial={{ scale: 0, x: 100, y: -50 }}
        animate={{ scale: 1, x: 0, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          delay: 1.2,
        }}
        className="absolute top-26 right-4 md:right-16 z-30 bg-brutal-pink border-3 border-brutal-dark text-white px-4 py-2 font-mono font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_#111111] rotate-[-6deg] select-none cursor-grab active:cursor-grabbing hidden sm:block"
      >
        <span className="inline-block animate-bounce mr-1">✊</span> Geser Aku!
      </motion.div>

      {/* Left Column (Content) */}
      <div className="lg:col-span-7 flex flex-col justify-center text-left">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-6">
          <span className="overflow-hidden inline-block py-1">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.3, delay: 0.1 }}
              className="inline-block"
            >
              <ScrambleText text="HARDWARE &" delay={100} />
            </motion.span>
          </span>
          <br />
          <span className="overflow-hidden inline-block py-1">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', duration: 0.8, bounce: 0.3, delay: 0.3 }}
              className="inline-block"
            >
              <ScrambleText text="SOFTWARE" delay={400} />
            </motion.span>
          </span>
          <br />
          <span className="overflow-hidden inline-block py-2">
            <motion.span
              initial={{ y: '100%', rotate: -15, scale: 0.8 }}
              animate={{ y: 0, rotate: -2, scale: 1 }}
              transition={{ type: 'spring', duration: 1, bounce: 0.4, delay: 0.6 }}
              className="inline-block bg-brutal-yellow px-3 sm:px-4 py-1 border-3 border-brutal-dark shadow-[4px_4px_0_0_#111111] my-1 origin-left"
            >
              <ScrambleText text="ENGINEER" delay={800} />
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', duration: 0.8, delay: 0.9 }}
          className="font-mono text-sm sm:text-base text-brutal-dark/80 max-w-xl mb-8 border-l-4 border-brutal-pink pl-4 select-none leading-relaxed"
        >
          Mengembangkan sistem IoT, mikrokontroler, dan aplikasi web modern.
Dari desain PCB hingga dashboard online yang mengendalikan perangkat nyata.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
          <motion.button
            onClick={scrollToWork}
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', duration: 0.8, delay: 1 }}
            whileHover={{
              y: -3,
              x: -1,
              shadow: '11px',
              backgroundColor: '#ff3366',
              boxShadow: '8px 8px 0px 0px #111111',
            }}
            whileTap={{ scale: 0.97, x: 2, y: 2 }}
            className="px-6 py-3.5 bg-brutal-dark text-white border-3 border-brutal-dark shadow-[6px_6px_0px_0px_#111111] uppercase font-bold text-sm tracking-wider select-none cursor-pointer text-center"
          >
            Lihat Proyek
          </motion.button>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            <StatCounter endValue={2} label="Tahun Pengalaman" delay={1.1} />
            <StatCounter endValue={500} label="Proyek Selesai" delay={0.2} />
          </div>
        </div>
      </div>

      {/* Right Column (Visual terminal presentation with drag-to-play) */}
      <motion.div
        initial={{ y: 60, scale: 0.95, rotate: 3 }}
        animate={{ y: 0, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1, bounce: 0.2, delay: 0.8 }}
        className="lg:col-span-12 xl:col-span-5 flex justify-center items-center overflow-visible"
      >
        <div className="w-full max-w-md xl:max-w-lg">
          <TerminalCard />
        </div>
      </motion.div>
    </section>
  );
}
