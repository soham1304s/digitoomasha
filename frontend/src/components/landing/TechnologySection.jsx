import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const TechnologySection = () => {
  const containerRef = useRef(null);

  const techBadges = [
    'AI & LLMs', 'Data Pipelines', 'Automation Agents', 
    'React & Next.js', 'Node.js Backends', 'Performance Marketing',
    'Custom Analytics', 'Cloud Infrastructure', 'API Integrations'
  ];

  useGSAP(() => {
    // Section entrance overlap
    gsap.fromTo(containerRef.current,
      { y: 60, opacity: 0.9 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    // Staggered tech badges reveal
    gsap.fromTo('.tech-badge-item',
      { opacity: 0, scale: 0.85, y: 25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.tech-badges-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="py-28 md:py-40 px-6 md:px-12 bg-[#1E3A2B] text-white rounded-t-[3.5rem] md:rounded-t-[5rem] -mt-16 md:-mt-24 relative z-10 shadow-2xl overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#D99B00] blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D99B00] mb-3">
          // TECH STACK & ENGINE
        </div>
        <h2 className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold tracking-tighter leading-none mb-12 uppercase">
          THE NEXT <span className="text-[#D99B00]">LAYER OF GROWTH.</span>
        </h2>

        <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mb-12 leading-relaxed">
          We combine cutting-edge software architecture with intelligent AI agents to automate and scale digital operations seamlessly.
        </p>

        <div className="tech-badges-grid flex flex-wrap gap-4">
          {techBadges.map((badge, idx) => (
            <div 
              key={idx} 
              className="tech-badge-item px-7 py-4 rounded-full border border-white/20 bg-white/10 text-sm font-extrabold uppercase tracking-wider text-white hover:bg-[#D99B00] hover:text-[#1A1A1A] hover:border-[#D99B00] hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
            >
              ⚡ {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
