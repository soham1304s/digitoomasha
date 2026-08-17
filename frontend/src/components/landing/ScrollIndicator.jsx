import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const ScrollIndicator = () => {
  const indicatorRef = useRef(null);

  useGSAP(() => {
    // Subtle pulse animation
    gsap.to('.scroll-arrow', {
      y: 10,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Hide indicator when scrolled
    gsap.to(indicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: 'body',
        start: 'top -100px',
        end: 'top -200px',
        scrub: true,
      },
    });
  }, { scope: indicatorRef });

  return (
    <div 
      ref={indicatorRef} 
      className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4 z-10 opacity-100 pointer-events-none"
    >
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase origin-left rotate-90 translate-y-12 whitespace-nowrap text-text-secondary">
        Scroll to Explore
      </span>
      <div className="w-[1px] h-12 bg-border-light relative mt-16 overflow-hidden">
        <div className="scroll-arrow absolute top-0 left-0 w-full h-full bg-[#1E3A2B]" />
      </div>
    </div>
  );
};
