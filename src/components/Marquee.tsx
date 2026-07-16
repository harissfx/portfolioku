export default function Marquee() {
  const words = [
    'UI/UX DESIGN',
    'FRONTEND DEVELOPMENT',
    'CREATIVE CODING',
    'BRUTALIST WEB',
    'REACT WORKFLOWS',
    'NEXT.JS STRUCTURES',
  ];

  const repeatedText = words.join(' • ') + ' • ';

  return (
    <div className="border-t-3 border-b-3 border-brutal-dark bg-brutal-yellow overflow-hidden py-3.5 md:py-5 select-none relative z-10 font-black">
      <div className="flex w-max">
        {/* First running track */}
        <div className="animate-marquee whitespace-nowrap text-sm sm:text-lg tracking-wider uppercase flex">
          <span className="inline-block">{repeatedText}</span>
          <span className="inline-block">{repeatedText}</span>
          <span className="inline-block">{repeatedText}</span>
          <span className="inline-block">{repeatedText}</span>
        </div>
        {/* Second identical running track for seamless overlap */}
        <div className="animate-marquee whitespace-nowrap text-sm sm:text-lg tracking-wider uppercase flex" aria-hidden="true">
          <span className="inline-block">{repeatedText}</span>
          <span className="inline-block">{repeatedText}</span>
          <span className="inline-block">{repeatedText}</span>
          <span className="inline-block">{repeatedText}</span>
        </div>
      </div>
    </div>
  );
}