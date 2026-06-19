import { motion } from 'motion/react';

export default function ContactSection() {
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

        <motion.a
          href="mailto:email@anda.com"
          whileHover={{
            scale: 1.05,
            rotate: 1.5,
            backgroundColor: '#111111',
            color: '#ff3366',
            boxShadow: '12px 12px 0px 0px #ff3366',
          }}
          whileTap={{ scale: 0.96, x: 4, y: 4, boxShadow: '4px 4px 0px 0px #111111' }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="btn-mega inline-block text-lg sm:text-xl md:text-3xl font-black uppercase tracking-wider text-white bg-brutal-pink px-8 py-5 md:px-12 md:py-7 border-3 border-brutal-dark shadow-[8px_8px_0_0_#111111] select-none cursor-pointer max-w-full word-break break-all relative group"
        >
          email@anda.com{' '}
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="inline-block"
          >
            ↗
          </motion.span>
        </motion.a>
        <div className="flex gap-4 mt-6 flex-wrap justify-center">
  <a
    href="https://wa.me/6285124014109"
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-sm border-2 border-brutal-dark px-4 py-2 font-bold"
  >
    WHATSAPP
  </a>

  <a
    href="https://github.com/harissfx"
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-sm border-2 border-brutal-dark px-4 py-2 font-bold"
  >
    GITHUB
  </a>
</div>
      </motion.div>
    </section>
  );
}
