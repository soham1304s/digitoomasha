import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FinalCTASection = () => {
  const containerRef = useRef(null);
  const auraRef = useRef(null);

  useGSAP(() => {
    // Reveal content
    gsap.fromTo('.final-cta-content',
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Glowing Aura expansion on scroll
    gsap.fromTo(auraRef.current,
      { scale: 0.7, opacity: 0.2 },
      {
        scale: 1.4,
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="py-32 md:py-48 px-6 md:px-12 bg-[#1E3A2B] text-white rounded-t-[3.5rem] md:rounded-t-[5rem] -mt-16 md:-mt-24 relative z-20 overflow-hidden shadow-2xl"
    >
      
      {/* Background Radial Aura Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div ref={auraRef} className="w-[600px] h-[600px] rounded-full bg-[#D99B00] blur-[170px]" />
      </div>

      <div className="final-cta-content container mx-auto max-w-5xl relative z-10 text-center flex flex-col items-center">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D99B00] mb-4">
          // LET'S BUILD MOMENTUM
        </div>

        <h2 className="text-[clamp(2.8rem,6.5vw,7.5rem)] font-extrabold tracking-tighter leading-[0.92] mb-8 uppercase">
          READY TO <br />
          <span className="text-[#D99B00]">BUILD WHAT'S NEXT?</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 max-w-xl font-medium mb-12 leading-relaxed">
          Tell us what you're building. We'll help you turn the idea into measurable business growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            to="/login" 
            className="group flex items-center justify-center gap-3 bg-[#D99B00] text-[#1A1A1A] px-10 py-5 rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-xl text-decoration-none"
          >
            START A PROJECT
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link 
            to="/contact" 
            className="group flex items-center justify-center gap-3 bg-transparent border border-white/30 text-white px-10 py-5 rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-white/10 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-decoration-none"
          >
            LET'S TALK
          </Link>
        </div>
      </div>
    </section>
  );
};
