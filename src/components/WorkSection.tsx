import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  category: string;
  color: string;
  image: string;
  link: string;
  gridClass: string;
  detail: {
    description: string;
    tools: string[];
    highlights: string[];
  };
}

export default function WorkSection() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'proj1',
      title: 'Desain 3D Modeling',
      category: 'Blender • Fusion 360 • CAD',
      color: 'bg-brutal-pink',
      image: '/images/3d-modeling.jpg',
      link: '#',
      gridClass: 'lg:col-span-8 col-span-1',
      detail: {
        description:
          'Pembuatan model 3D untuk keperluan prototyping produk, visualisasi desain elektronik, hingga render presentasi. Menggunakan Blender untuk aset kreatif dan Fusion 360 untuk desain engineering yang presisi. Hasil ekspor siap cetak 3D atau digunakan sebagai referensi manufaktur.',
        tools: ['Blender', 'Fusion 360', 'FreeCAD', 'STL Export', '3D Printing'],
        highlights: [
          'Model enclosure custom untuk perangkat IoT',
          'Render visualisasi produk photorealistic',
          'Desain mekanik dengan toleransi presisi',
          'Animasi 3D untuk presentasi proyek',
        ],
      },
    },
    {
      id: 'proj2',
      title: 'Desain PCB',
      category: 'EasyEDA • KiCad • Schematic',
      color: 'bg-brutal-yellow',
      image: '/images/pcb-design.jpg',
      link: '#',
      gridClass: 'lg:col-span-4 col-span-1',
      detail: {
        description:
          'Perancangan PCB dari tahap skematik hingga layout siap produksi. Meliputi desain single-layer maupun multi-layer board, penempatan komponen optimal, routing jalur sinyal dan daya, serta persiapan file Gerber untuk fabrikasi. Sudah berpengalaman membuat modul sensor, driver motor, hingga board mikrokontroler custom.',
        tools: ['EasyEDA', 'KiCad', 'Altium Designer', 'Gerber Files', 'LCSC BOM'],
        highlights: [
          'PCB custom ESP32 dengan antena terintegrasi',
          'Driver motor brushless compact',
          'Board sensor multi-channel',
          'Integrasi power management & regulasi tegangan',
        ],
      },
    },
    {
      id: 'proj3',
      title: 'Website & Dashboard IoT',
      category: 'React • Node.js • WebServer IoT',
      color: 'bg-sky-500',
      image: '/images/dashboard-iot.jpg',
      link: '#',
      gridClass: 'lg:col-span-5 col-span-1',
      detail: {
        description:
          'Membangun website sederhana hingga dashboard monitoring IoT berbasis web yang berjalan langsung di webserver ESP32/ESP8266. Tampilan real-time dengan grafik data sensor, kontrol relay & aktuator, serta notifikasi kondisi tertentu. Dapat diakses via LAN tanpa koneksi internet.',
        tools: ['React', 'Tailwind CSS', 'Node.js', 'WebSocket', 'ESP32 WebServer', 'MQTT'],
        highlights: [
          'Dashboard monitoring suhu & kelembaban real-time',
          'Kontrol relay via tombol web',
          'Grafik historis data sensor',
          'Autentikasi login halaman admin',
        ],
      },
    },
    {
      id: 'proj4',
      title: 'Bikin APK Custom',
      category: 'Android • MIT App Inventor • IoT UI',
      color: 'bg-amber-500',
      image: '/images/custom-apk.jpg',
      link: '#',
      gridClass: 'lg:col-span-7 col-span-1',
      detail: {
        description:
          'Pembuatan aplikasi Android custom untuk kontrol dan monitoring perangkat IoT. Dari antarmuka sederhana berbasis MIT App Inventor hingga aplikasi lebih kompleks menggunakan framework modern. Mendukung komunikasi Bluetooth, WiFi, dan MQTT untuk integrasi langsung dengan ESP32/ESP8266.',
        tools: ['MIT App Inventor', 'Android Studio', 'Bluetooth Serial', 'MQTT', 'REST API'],
        highlights: [
          'APK kontrol robot berbasis Bluetooth',
          'Antarmuka monitoring sensor realtime',
          'APK smart home dengan kontrol relay',
          'UI IoT kustom sesuai kebutuhan proyek',
        ],
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 900) {
        setIsStuck(false);
        return;
      }
      if (sectionTitleRef.current) {
        const rect = sectionTitleRef.current.getBoundingClientRect();
        setIsStuck(rect.top <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const newRipple = { id: Date.now() + Math.random(), x, y, size };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section id="work" className="py-20 md:py-28 px-4 md:px-8 xl:px-12 relative overflow-visible">
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
            onPointerDown={(e) => handlePointerDown(e)}
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
            {/* Image Panel */}
            <div className="h-48 md:h-60 border-b-3 border-brutal-dark relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.placeholder-box')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = `placeholder-box w-full h-full flex items-center justify-center ${project.color}`;
                    placeholder.innerHTML = `<span style="font-size:3rem">🖼️</span>`;
                    parent.appendChild(placeholder);
                  }
                }}
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

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProject(project);
                }}
                className="arrow-link font-black text-xs md:text-sm text-brutal-dark border-b-2 border-brutal-pink pb-1 hover:gap-4 transition-all duration-300 inline-flex items-center gap-2 select-none self-start bg-transparent cursor-pointer"
              >
                LIHAT DETAIL <span className="text-brutal-pink">→</span>
              </button>
            </div>

            {/* Ripple effects */}
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
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                }}
              />
            ))}
          </motion.article>
        ))}
      </div>

      {/* ── MODAL POPUP ── */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-brutal-dark/70 backdrop-blur-sm z-50"
            />

            {/* Modal box */}
            <motion.div
              key="modal"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto bg-white border-3 border-brutal-dark shadow-[8px_8px_0px_0px_#111111] max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header image */}
                <div className={`h-40 border-b-3 border-brutal-dark relative overflow-hidden ${activeProject.color}`}>
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Close button */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white border-2 border-brutal-dark font-black text-brutal-dark flex items-center justify-center hover:bg-brutal-yellow transition-colors duration-150 shadow-[2px_2px_0px_0px_#111111]"
                    aria-label="Tutup"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal content */}
                <div className="p-6 md:p-8">
                  <p className="font-mono text-xs text-brutal-dark/50 tracking-widest uppercase mb-1">
                    {activeProject.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-brutal-dark mb-4 leading-tight">
                    {activeProject.title}
                  </h3>

                  <p className="font-mono text-sm text-brutal-dark/80 leading-relaxed mb-6">
                    {activeProject.detail.description}
                  </p>

                  {/* Tools used */}
                  <div className="mb-6">
                    <p className="font-mono text-xs font-black text-brutal-pink uppercase tracking-widest mb-3">
                      // TOOLS & TEKNOLOGI
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.detail.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="border-2 border-brutal-dark text-brutal-dark px-3 py-1 font-mono text-xs font-bold uppercase"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="font-mono text-xs font-black text-brutal-yellow uppercase tracking-widest mb-3">
                      // HIGHLIGHT PROYEK
                    </p>
                    <ul className="space-y-2">
                      {activeProject.detail.highlights.map((item, i) => (
                        <li
                          key={i}
                          className="font-mono text-sm text-brutal-dark flex items-start gap-2"
                        >
                          <span className="text-brutal-pink font-black mt-0.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Close CTA */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="mt-8 w-full border-3 border-brutal-dark bg-brutal-dark text-white font-black py-3 text-sm tracking-widest uppercase hover:bg-brutal-yellow hover:text-brutal-dark transition-colors duration-200 shadow-[4px_4px_0px_0px_#d4ff00]"
                  >
                    TUTUP
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes ripple-expand {
          0% { transform: scale(0) rotate(0deg); opacity: 0.7; }
          100% { transform: scale(1.5) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}