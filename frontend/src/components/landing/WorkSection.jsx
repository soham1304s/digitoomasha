import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WorkSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo('.work-header-anim',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards entrance & image parallax scrub
    const workCards = gsap.utils.toArray('.work-card-box');
    
    workCards.forEach((card) => {
      // Entrance reveal
      gsap.fromTo(card,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );

      // Image Parallax inside frame
      const img = card.querySelector('.work-parallax-img');
      if (img) {
        gsap.fromTo(img,
          { yPercent: -10, scale: 1.1 },
          {
            yPercent: 10,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section id="work" ref={containerRef} className="py-16 md:py-24 px-6 md:px-12 bg-[#FAF8F2]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="work-header-anim flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E0DDD2] pb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D99B00]" />
              // CASE STUDIES
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,5rem)] font-extrabold tracking-tighter leading-none text-[#1A1A1A] uppercase">
              SELECTED WORK
            </h2>
          </div>
          <Link 
            to="/work" 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#D99B00] transition-colors mt-4 md:mt-0 text-decoration-none"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Project Cards Grid - 3:2 Aspect Ratio Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="work-card-box group flex flex-col gap-4">
              
              {/* Media Preview Frame with 3:2 Aspect Ratio */}
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[2rem] bg-[#EAE6D6]/60 border border-black/10 shadow-lg cursor-pointer">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="work-parallax-img w-full h-full object-cover origin-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

                {/* Floating Metric Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-white/50">
                  ⚡ {project.result}
                </div>

                {/* Hover Action Badge */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center shadow-lg group-hover:bg-[#D99B00] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>

              {/* Meta Info Below */}
              <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#5A5A55]">
                  <span className="text-[#1E3A2B] font-mono">{project.id}</span>
                  <span>•</span>
                  <span>{project.industry}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#1A1A1A] uppercase group-hover:text-[#1E3A2B] transition-colors">
                    {project.title}
                  </h3>
                  <span className="shrink-0 w-fit text-[11px] font-semibold text-[#5A5A55] bg-[#EAE6D6]/50 px-3.5 py-1.5 rounded-full border border-[#E0DDD2]">
                    {project.services}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
