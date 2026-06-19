export default function Footer() {
  const socials = [
    { name: 'GitHub', link: 'https://github.com/harissfx' },
    { name: 'LinkedIn', link: 'https://linkedin.com/in/haris-syc' },
    { name: 'Instagram', link: 'https://instagram.com/haris_sfx77' },
  ];

  return (
    <footer className="border-t-3 border-brutal-dark bg-brutal-bg py-10 px-4 md:px-8 xl:px-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Attribution */}
        <p className="font-mono text-xs sm:text-sm text-brutal-dark/70 font-bold tracking-wide">
  © {new Date().getFullYear()} Haris Syc. Building things.
</p>

        {/* Social Links */}
        <div className="flex gap-6 flex-wrap justify-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-sm text-brutal-dark font-extrabold tracking-wider uppercase border-b-2 border-transparent hover:border-brutal-pink hover:text-brutal-pink transition-all duration-200 select-none cursor-pointer py-1 block"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
