import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 xl:px-12 text-center relative bg-grid overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, y: 80 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.3 }}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center overflow-visible"
      >
<h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase text-brutal-dark leading-none tracking-tight mb-4 select-none">
  SIAP UNTUK
  <br />
  PROYEK BERIKUTNYA?
</h2>

<p className="font-mono text-sm sm:text-base text-brutal-dark/70 mb-10 max-w-md select-none leading-relaxed">
  Hubungi saya untuk pengembangan IoT, ESP32, sistem kontrol, dashboard web, dan solusi elektronik lainnya.
</p>

        <div className="flex flex-col items-center">
          <motion.button
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover={{
              scale: 1.05,
              rotate: 1.5,
              backgroundColor: '#111111',
              color: '#ff3366',
              boxShadow: '12px 12px 0px 0px #ff3366',
            }}
            whileTap={{ scale: 0.96, x: 4, y: 4, boxShadow: '4px 4px 0px 0px #111111' }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="btn-mega inline-flex items-center gap-3 text-lg sm:text-xl md:text-3xl font-black uppercase tracking-wider text-white bg-brutal-pink px-8 py-5 md:px-12 md:py-7 border-3 border-brutal-dark shadow-[8px_8px_0_0_#111111] select-none cursor-pointer"
          >
            Hubungi Saya
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="inline-block text-2xl md:text-4xl leading-none"
            >
              +
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.95, height: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
                exit={{ opacity: 0, y: -12, scale: 0.95, height: 0 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
                className="flex flex-col sm:flex-row gap-4 mt-6 overflow-hidden"
              >
                <motion.a
                  href="mailto:harissyc65@gmail.com"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#111111',
                    color: '#ff3366',
                    boxShadow: '6px 6px 0px 0px #ff3366',
                  }}
                  whileTap={{ scale: 0.96, x: 3, y: 3, boxShadow: '2px 2px 0px 0px #111111' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="btn-mega inline-block text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-brutal-dark bg-white px-6 py-3 md:px-8 md:py-4 border-3 border-brutal-dark shadow-[6px_6px_0_0_#111111] select-none cursor-pointer max-w-full break-all"
                >
                  Email ↗
                </motion.a>
                <motion.a
                  href="https://t.me/HanzOfc"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#111111',
                    color: '#ff3366',
                    boxShadow: '6px 6px 0px 0px #ff3366',
                  }}
                  whileTap={{ scale: 0.96, x: 3, y: 3, boxShadow: '2px 2px 0px 0px #111111' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="btn-mega inline-block text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-brutal-dark bg-white px-6 py-3 md:px-8 md:py-4 border-3 border-brutal-dark shadow-[6px_6px_0_0_#111111] select-none cursor-pointer"
                >
                  Telegram ↗
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}