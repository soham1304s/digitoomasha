import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Lottie } from 'lottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import digitalMarketingAnimation from '@/assets/Digital Marketing Animation.json';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);

  useGSAP(() => {
    // Intro Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.fromTo('.hero-tag-reveal',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo('.hero-title-line',
        { opacity: 0, y: 70, rotateX: 20 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.15 },
        '-=0.4'
      )
      .fromTo('.hero-subtext',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.6'
      )
      .fromTo('.hero-cta-group',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(animationRef.current,
        { opacity: 0, scale: 0.88, rotateY: -10, y: 50 },
        { opacity: 1, scale: 1, rotateY: 0, y: 0, duration: 1.4, ease: 'power3.out' },
        '-=1.0'
      );

    // Parallax & Shrink Transition on Scroll
    gsap.to(contentRef.current, {
      scale: 0.92,
      opacity: 0.15,
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] w-full flex items-center overflow-hidden pt-28 md:pt-36 pb-20 px-6 md:px-12 bg-[#FAF8F2]"
    >
      {/* Background Subtle Warm Gradient Auras */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#EFE1B3]/50 blur-[130px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#1E3A2B]/5 blur-[140px]" />
      </div>

      <div ref={contentRef} className="container mx-auto max-w-7xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Main Hero Headlines & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Tagline Badge */}
            <div className="hero-tag-reveal flex items-center gap-2.5 mb-6 bg-[#EAE6D6] border border-[#D8D4C4] px-4 py-1.5 rounded-full w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D99B00] animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E3A2B]">
                DIGITAL GROWTH & AI SYSTEMS STUDIO
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title text-[clamp(3.2rem,6.8vw,7.5rem)] font-extrabold tracking-tighter leading-[0.92] text-[#1A1A1A] mb-8">
              <div className="hero-title-line overflow-hidden text-[#1A1A1A]">We Build</div>
              <div className="hero-title-line overflow-hidden text-[#1E3A2B]">Digital</div>
              <div className="hero-title-line overflow-hidden text-[#D99B00]">
                Momentum<span className="text-[#1A1A1A]">.</span>
              </div>
            </h1>

            {/* Subtext Paragraph */}
            <p className="hero-subtext text-lg md:text-xl text-[#5A5A55] font-medium max-w-xl mb-10 leading-relaxed">
              Strategy, technology, creativity, and AI engineered to move ambitious brands forward and unlock exponential revenue.
            </p>

            {/* Call to Action Buttons */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="group flex items-center gap-3 bg-[#1E3A2B] text-white px-8 py-4 rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-[#14291E] transition-all duration-300 shadow-md text-decoration-none hover:scale-105"
              >
                START A PROJECT
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/work"
                className="group flex items-center gap-3 bg-white border border-[#E0DDD2] text-[#1A1A1A] px-8 py-4 rounded-full font-extrabold text-xs uppercase tracking-wider hover:border-[#1E3A2B] transition-all duration-300 text-decoration-none hover:scale-105 shadow-sm"
              >
                EXPLORE WORK
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Right Visual Lottie Animation Section (Frameless) */}
          <div
            ref={animationRef}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center relative w-full"
          >
            <div className="w-full max-w-[520px] h-[360px] md:h-[460px] flex items-center justify-center">
              <Lottie
                src={digitalMarketingAnimation}
                animationData={digitalMarketingAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
