import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ImpactSection = () => {
  const sectionRef = useRef(null);

  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 12, suffix: "+", label: "Industries Served" },
    { value: 3, suffix: "x", label: "Average Growth" },
    { value: 24, suffix: "/7", label: "Automation Systems" },
  ];

  useGSAP(() => {
    // Overlap Slide Reveal Animation
    gsap.fromTo(sectionRef.current,
      { y: 60, opacity: 0.9 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      }
    );

    // Number Counting Animation on Scroll
    const counters = gsap.utils.toArray('.stat-val-counter');
    
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      
      gsap.to(counter, {
        innerText: target,
        duration: 2,
        ease: 'power3.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          once: true,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="py-28 md:py-40 px-6 md:px-12 bg-[#1E3A2B] text-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-16 md:-mt-24 relative z-10 shadow-2xl overflow-hidden"
    >
      {/* Glow Auras */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-[30%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#D99B00] blur-[160px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D99B00] mb-4">
          // OUR NUMBERS
        </div>
        
        <h2 className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold tracking-tighter leading-none mb-16 uppercase max-w-4xl">
          BUILT FOR <br />
          <span className="text-[#D99B00]">MEASURABLE IMPACT.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 border-t border-white/15 pt-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-baseline font-extrabold tracking-tighter text-5xl md:text-7xl">
                <span className="stat-val-counter" data-target={stat.value}>0</span>
                <span className="text-[#D99B00] ml-1">{stat.suffix}</span>
              </div>
              <div className="text-xs font-bold tracking-widest uppercase text-white/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
