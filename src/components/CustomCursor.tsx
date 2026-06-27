import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (min-width: 901px)');
    const checkVisibility = () => {
      setIsVisible(mql.matches);
    };
    
    checkVisibility();
    mql.addEventListener('change', checkVisibility);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mql.matches) return;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === 'A' ||
        target?.tagName === 'BUTTON' ||
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('.magnetic') ||
        target?.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      mql.removeEventListener('change', checkVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-brutal-pink rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className="fixed top-0 left-0 border-2 border-brutal-pink rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '70px' : '40px',
          height: isHovered ? '70px' : '40px',
          backgroundColor: isHovered ? 'rgba(255, 51, 102, 0.2)' : 'transparent',
        }}
      />
    </>
  );
}
