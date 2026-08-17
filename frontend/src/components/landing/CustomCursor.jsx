import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoverText, setHoverText] = useState('');

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move cursor
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    // Handle hover states
    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Find closest interactive element
      const interactiveEl = target.closest('a, button, [data-hover]');
      
      if (interactiveEl) {
        setIsHovering(true);
        const dataHoverText = interactiveEl.getAttribute('data-hover-text');
        if (dataHoverText) {
          setHoverText(dataHoverText);
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center rounded-full mix-blend-difference bg-white transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
        isHovering ? (hoverText ? 'w-24 h-24' : 'w-12 h-12') : 'w-4 h-4'
      }`}
    >
      {hoverText && (
        <span className="text-black text-[10px] font-bold tracking-widest uppercase text-center leading-none">
          {hoverText.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </span>
      )}
    </div>
  );
};
