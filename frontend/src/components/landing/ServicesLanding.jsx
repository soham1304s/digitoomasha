import React, { useState, useRef } from 'react';
import { services } from '@/data/services';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export const ServicesLanding = () => {
  const [activeId, setActiveId] = useState('01');
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo('.services-header-anim',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Accordion Rows Cascade Reveal
    gsap.fromTo('.service-row-anim',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-list-container',
          start: 'top 82%',
        }
      }
    );
  }, { scope: containerRef });

  const toggleService = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="services" ref={containerRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAF8F2]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="services-header-anim flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#E0DDD2] pb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D99B00]" />
              // OUR CAPABILITIES
            </div>
            <h2 className="text-[clamp(2.5rem,5.5vw,6rem)] font-extrabold tracking-tighter leading-none text-[#1A1A1A] uppercase">
              WHAT WE DO
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#5A5A55] max-w-md font-medium mt-4 md:mt-0">
            End-to-end digital solutions designed to accelerate growth, automate workflows, and create competitive advantage.
          </p>
        </div>

        {/* Services Accordion List */}
        <div className="services-list-container flex flex-col divide-y divide-[#E0DDD2] border-t border-b border-[#E0DDD2]">
          {services.map((service) => {
            const isOpen = activeId === service.id;
            return (
              <div 
                key={service.id} 
                className={cn(
                  "service-row-anim transition-colors duration-300",
                  isOpen ? "bg-[#EAE6D6]/50" : "hover:bg-[#EAE6D6]/30"
                )}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full py-8 md:py-10 px-4 md:px-8 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-sm md:text-base font-mono font-bold text-[#1E3A2B]">
                      {service.id}
                    </span>
                    <h3 className="text-xl md:text-3xl font-extrabold tracking-tight text-[#1A1A1A] uppercase group-hover:text-[#1E3A2B] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline-block text-xs font-bold uppercase tracking-widest text-[#5A5A55]">
                      {(service.items || []).length} MODULES
                    </span>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
                      isOpen ? "bg-[#1E3A2B] text-white border-[#1E3A2B]" : "border-[#E0DDD2] text-[#1A1A1A] group-hover:border-[#1E3A2B]"
                    )}>
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Content Drawer */}
                {isOpen && (
                  <div className="px-4 md:px-8 pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
                    <div className="lg:col-span-6 lg:col-start-3">
                      <p className="text-base md:text-lg text-[#5A5A55] font-medium leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      {/* Sub-items grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {(service.items || []).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D99B00]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex items-end justify-end">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E3A2B] hover:text-[#D99B00] transition-colors text-decoration-none"
                      >
                        Inquire About {service.title}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
