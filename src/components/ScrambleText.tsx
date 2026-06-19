import { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, className = '', delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: number;

    const startScramble = () => {
      let frame = 0;
      const queue: Array<{ from: string; to: string; start: number; end: number; char: string }> = [];
      const length = text.length;

      for (let i = 0; i < length; i++) {
        const from = '';
        const to = text[i];
        const start = Math.floor(Math.random() * 10);
        const end = start + Math.floor(Math.random() * 15);
        queue.push({ from, to, start, end, char: '' });
      }

      const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          let { to, start, end, char } = queue[i];

          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queue[i].char = char;
            }
            output += char;
          } else {
            output += ' ';
          }
        }

        setDisplayText(output);

        if (complete < queue.length) {
          frame++;
          animationFrameId = requestAnimationFrame(update);
        }
      };

      animationFrameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            timeoutId = window.setTimeout(startScramble, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [text, delay, hasAnimated]);

  return (
    <span ref={elementRef} className={`${className} inline-block font-sans`}>
      {displayText || text}
    </span>
  );
}
