import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const Statement = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const words = textRef.current.querySelectorAll('.statement-word');

    gsap.fromTo(words,
      { color: '#C0BCAE', opacity: 0.3 },
      {
        color: (index, target) => {
          if (target.dataset.accent === 'green') return '#1E3A2B';
          if (target.dataset.accent === 'gold') return '#D99B00';
          return '#1A1A1A';
        },
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.8,
        }
      }
    );
  }, { scope: containerRef });

  const statementText = [
    { word: "WE", accent: "none" },
    { word: "DON'T", accent: "none" },
    { word: "JUST", accent: "none" },
    { word: "BUILD", accent: "none" },
    { word: "WEBSITES.", accent: "none" },
    { word: "WE", accent: "none" },
    { word: "ENGINEER", accent: "green" },
    { word: "HIGH-CONVERTING", accent: "green" },
    { word: "DIGITAL", accent: "none" },
    { word: "GROWTH", accent: "gold" },
    { word: "SYSTEMS", accent: "gold" },
    { word: "THAT", accent: "none" },
    { word: "SCALE", accent: "none" },
    { word: "AMBITIOUS", accent: "none" },
    { word: "BRANDS.", accent: "none" },
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-12 bg-[#FAF8F2] border-y border-[#E0DDD2]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D99B00]" />
          // OUR PHILOSOPHY
        </div>
        
        <h2 
          ref={textRef} 
          className="text-[clamp(2.2rem,5vw,5.2rem)] font-extrabold tracking-tighter leading-[1.05] uppercase flex flex-wrap gap-x-[0.35em] gap-y-[0.1em]"
        >
          {statementText.map((item, idx) => (
            <span 
              key={idx} 
              className="statement-word transition-colors duration-200"
              data-accent={item.accent}
            >
              {item.word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};
