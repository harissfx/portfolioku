import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

export default function WorkSection() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const [isStuck, setIsStuck] = useState(false);

const projects = [
  {
    id: 'proj1',
    title: 'WaBot IoT',
    category: 'ESP32 • WhatsApp Automation',
    color: 'bg-brutal-pink',
    image: '/images/wabot-iot.jpg',
    link: '#',
    gridClass: 'lg:col-span-8 col-span-1',
  },
  {
    id: 'proj2',
    title: 'Multi Servo Controller',
    category: 'ESP32 • PWM Control',
    color: 'bg-brutal-yellow',
    image: '/images/wabot-iot.jpg',
    link: '#',
    gridClass: 'lg:col-span-4 col-span-1',
  },
  {
    id: 'proj3',
    title: 'Smart Home Dashboard',
    category: 'IoT Web Application',
    color: 'bg-sky-500',
    image: '/images/wabot-iot.jpg',
    link: '#',
    gridClass: 'lg:col-span-5 col-span-1',
  },
  {
    id: 'proj4',
    title: 'Custom PCB Prototype',
    category: 'EasyEDA • Electronics',
    color: 'bg-amber-500',
    image: '/images/wabot-iot.jpg',
    link: '#',
    gridClass: 'lg:col-span-7 col-span-1',
  },
];

  // Handle sticky title shadow check on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 900) {
        setIsStuck(false);
        return;
      }
      if (sectionTitleRef.current) {
        const rect = sectionTitleRef.current.getBoundingClientRect();
        if (rect.top <= 80) {
          setIsStuck(true);
        } else {
          setIsStuck(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, cardId: string) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Clean up ripple after 600ms
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section id="work" className="py-20 md:py-28 px-4 md:px-8 xl:px-12 relative overflow-visible">
      {/* Scroll-tracked Animated Title Header */}
      <motion.h2
        ref={sectionTitleRef}
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.2 }}
        className={`section-title text-3xl sm:text-4xl md:text-5xl font-black mb-10 md:mb-16 border-b-3 border-brutal-dark pb-3 inline-block tracking-tight text-brutal-dark transition-all duration-300 ${
          isStuck ? 'sticky top-20 z-10 bg-brutal-bg shadow-[0_4px_0_0_#111111]' : ''
        }`}
      >
        PROYEK <span className="outline-text">NYATA</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 overflow-visible">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            onPointerDown={(e) => handlePointerDown(e, project.id)}
            initial={{ y: 150, scale: 0.9 }}
            whileInView={{ y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              type: 'spring',
              bounce: 0.3,
              duration: 0.8,
              delay: index * 0.12,
            }}
            whileHover={{
              y: -10,
              x: -4,
              boxShadow: '14px 14px 0px 0px #111111',
            }}
            whileTap={{ scale: 0.98, x: 2, y: 2, boxShadow: '4px 4px 0px 0px #111111' }}
            className={`work-card relative border-3 border-brutal-dark bg-white shadow-[6px_6px_0px_0px_#111111] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden select-none group cursor-pointer ${project.gridClass}`}
          >
            {/* Visual Panel representing image with clip path zoom */}
<div className="h-48 md:h-60 border-b-3 border-brutal-dark relative overflow-hidden">
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
</div>

            {/* Info details */}
            <div className="p-5 md:p-6 flex-grow flex flex-col justify-between relative z-10 bg-white">
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-extrabold text-brutal-dark mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-brutal-dark/60 tracking-wider">
                  {project.category}
                </p>
              </div>

              <a
                href={project.link}
                className="arrow-link font-black text-xs md:text-sm text-brutal-dark border-b-2 border-brutal-pink pb-1 hover:gap-4 transition-all duration-300 inline-flex items-center gap-2 select-none self-start"
                onClick={(e) => e.stopPropagation()}
              >
                LIHAT DETAIL <span className="text-brutal-pink">→</span>
              </a>
            </div>

            {/* Custom Interactive pointer ripples */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute bg-brutal-yellow/60 border border-brutal-dark opacity-70 pointer-events-none scale-0 animate-[ripple-expand_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                style={{
                  left: ripple.x - ripple.size / 2,
                  top: ripple.y - ripple.size / 2,
                  width: ripple.size,
                  height: ripple.size,
                  transformOrigin: 'center',
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Star/brutalist geometry shape
                }}
              />
            ))}
          </motion.article>
        ))}
      </div>

      <style>{`
        @keyframes ripple-expand {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.5) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
