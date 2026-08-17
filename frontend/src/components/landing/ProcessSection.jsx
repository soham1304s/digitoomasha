import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { id: '01', title: 'Discover', desc: 'We immerse ourselves in your business, analyzing the market, technical constraints, and growth opportunities.' },
  { id: '02', title: 'Define', desc: 'Establishing the core strategy, KPIs, and architectural roadmap that will guide the entire project.' },
  { id: '03', title: 'Design', desc: 'Crafting premium, user-centric interfaces and brand systems that communicate authority.' },
  { id: '04', title: 'Build', desc: 'Engineering robust, scalable solutions using modern tech stacks and AI integrations.' },
  { id: '05', title: 'Launch', desc: 'Rigorous testing and strategic deployment to ensure maximum initial impact.' },
  { id: '06', title: 'Scale', desc: 'Continuous optimization, performance marketing, and iterative enhancements for sustained growth.' },
];

export const ProcessSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.process-card-item',
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAF8F2] border-t border-[#E0DDD2]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D99B00]" />
          // OUR METHODOLOGY
        </div>
        <h2 className="text-[clamp(2.5rem,5.5vw,6rem)] font-extrabold tracking-tighter leading-none text-[#1A1A1A] uppercase mb-16">
          FROM IDEA <span className="text-[#1E3A2B]">TO </span><span className="text-[#D99B00]">IMPACT.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stages.map((stage) => (
            <div 
              key={stage.id} 
              className="process-card-item bg-[#EAE6D6]/40 p-8 rounded-3xl border border-[#E0DDD2] flex flex-col justify-between min-h-[270px] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="text-sm font-mono font-bold text-[#1E3A2B] mb-4 group-hover:scale-110 origin-left transition-transform">
                  STAGE {stage.id}
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] uppercase mb-3 group-hover:text-[#1E3A2B] transition-colors">
                  {stage.title}
                </h3>
                <p className="text-sm md:text-base text-[#5A5A55] font-medium leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E0DDD2]/80 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A5A55]">MODULE {stage.id}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D99B00] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
