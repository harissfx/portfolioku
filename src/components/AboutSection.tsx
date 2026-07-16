import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Send } from 'lucide-react';

export default function AboutSection() {
  const socials = [
    { name: 'GitHub', link: 'https://github.com/harissfx', icon: Github },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/haris-syc', icon: Linkedin },
    { name: 'X', link: 'https://x.com/HarisSfx', icon: Twitter },
    { name: 'Telegram', link: 'https://t.me/HanzOfc', icon: Send },
  ];

  const socialContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const socialItemVariants = {
    hidden: { y: 30, scale: 0.5, opacity: 0 },
    show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.6,
      },
    },
  };

  const skills = [
    '3D Modeling & Design',
    'Blender',
    'Fusion 360',
    'PCB Design',
    'EasyEDA',
    'KiCad',
    'Schematic Design',
    'Web Development',
    'Dashboard Webserver',
    'IoT Web Interface',
    'React / Next.js',
    'Node.js',
    'REST API',
    'Custom APK',
    'Android Development',
    'MIT App Inventor',
    'IoT Interface Design',
    'ESP32 / ESP8266',
    'Arduino',
    'Git / GitHub',
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const skillVariants = {
    hidden: { y: 60, scale: 0.5 },
    show: {
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 md:py-28 px-4 md:px-8 xl:px-12 bg-brutal-dark text-brutal-bg relative overflow-visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Left Column */}
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            bounce: 0.2,
          }}
          className="lg:col-span-6 flex flex-col justify-start"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 border-b-3 border-white/20 pb-4 inline-block tracking-tight text-white select-none">
            TENTANG <br />
            <span className="outline-text-white uppercase font-black">
              SAYA
            </span>
          </h2>

          <div className="font-mono text-sm sm:text-base leading-relaxed text-slate-300 gap-6 flex flex-col max-w-xl select-none">
            <p>
              Saya adalah developer dan maker yang berfokus pada pengembangan
              sistem IoT, mikrokontroler, serta aplikasi web modern. Saya
              menyukai proses mengubah ide menjadi perangkat nyata yang dapat
              bekerja secara otomatis dan memberikan solusi untuk kebutuhan
              sehari-hari.
            </p>

            <p>
              Pengalaman saya mencakup pengembangan proyek menggunakan ESP32,
              ESP8266, Arduino, sensor elektronik, sistem kontrol servo,
              desain PCB, hingga integrasi perangkat keras dengan dashboard
              web dan layanan berbasis internet.
            </p>

            <p>
              Selain hardware, saya juga mengembangkan aplikasi menggunakan
              React, Next.js, Tailwind CSS, dan Node.js untuk membangun
              antarmuka yang cepat, responsif, dan mudah digunakan.
            </p>

            <p>
              Saya percaya bahwa teknologi terbaik bukan hanya terlihat keren,
              tetapi juga dapat bekerja stabil, efisien, dan menyelesaikan
              masalah nyata.
            </p>
          </div>

          <motion.h3
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
            }}
            className="font-mono text-xs text-brutal-yellow font-black uppercase tracking-wider mt-10 mb-5 select-none"
          >
            // TERHUBUNG DENGAN SAYA
          </motion.h3>

          <motion.div
            variants={socialContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex gap-3.5"
          >
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  variants={socialItemVariants}
                  whileHover={{
                    scale: 1.1,
                    rotate: -6,
                    backgroundColor: '#d4ff00',
                    color: '#111111',
                    boxShadow: '4px 4px 0px 0px #d4ff00',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 flex items-center justify-center border-2 border-brutal-yellow text-brutal-yellow transition-colors duration-200 select-none cursor-pointer"
                >
                  <Icon size={20} strokeWidth={2.5} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <div className="lg:col-span-6 flex flex-col justify-start py-4 overflow-visible">
          <motion.h3
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
            }}
            className="font-mono text-xs text-brutal-yellow font-black uppercase tracking-wider mb-6 select-none"
          >
            // SKILLSET UTAMA
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="flex flex-wrap gap-3.5 overflow-visible"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={skillVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: -3,
                  backgroundColor: '#d4ff00',
                  color: '#111111',
                  boxShadow: '4px 4px 0px 0px #d4ff00',
                  zIndex: 20,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="border-2 border-brutal-yellow text-brutal-yellow px-4 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-200 select-none cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}