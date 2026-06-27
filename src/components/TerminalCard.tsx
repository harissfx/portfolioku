import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function TerminalCard() {
const lines = [
  '> initializing IoT workspace...',
  '> compiling firmware...',
  '> deploying dashboard...',
  '> status: ready to build!',
];

  const [visibleText, setVisibleText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    setCanDrag(mql.matches);
    const mqlListener = (e: MediaQueryListEvent) => setCanDrag(e.matches);
    mql.addEventListener('change', mqlListener);
    return () => mql.removeEventListener('change', mqlListener);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      const resetTimeout = setTimeout(() => {
        setVisibleText([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }

    const currentRawLine = lines[currentLineIndex];

    if (currentCharIndex < currentRawLine.length) {
      const charTimeout = setTimeout(() => {
        setVisibleText((prev) => {
          const next = [...prev];
          if (!next[currentLineIndex]) {
            next[currentLineIndex] = '';
          }
          next[currentLineIndex] += currentRawLine[currentCharIndex];
          return next;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(charTimeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 600);
      return () => clearTimeout(lineTimeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <motion.div
      drag={canDrag}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.15}
      whileDrag={{ scale: 1.05, rotate: -2, zIndex: 40 }}
      whileHover={canDrag ? {
        y: -6,
        rotate: -1,
        boxShadow: '12px 12px 0px 0px #111111',
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`w-full bg-white border-3 border-brutal-dark shadow-[8px_8px_0px_0px_#111111] font-mono overflow-hidden select-none relative ${canDrag ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      <div className="bg-brutal-dark p-2.5 flex gap-2 items-center">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="text-white text-[10px] ml-2 opacity-60 font-mono">iot_workspace.sh</span>
        <span className="ml-auto text-white text-[10px] opacity-40 font-mono hidden lg:inline">[Drag Terminal]</span>
      </div>
      <div className="p-5 min-h-[160px] text-left text-sm text-brutal-dark flex flex-col justify-start gap-1 select-none pointer-events-none">
        {visibleText.map((textLine, i) => (
          <p key={i} className={i === lines.length - 1 ? 'text-brutal-pink font-bold' : ''}>
            {textLine}
          </p>
        ))}
        <span className="animate-cursor-blink font-bold">_</span>
      </div>
    </motion.div>
  );
}
