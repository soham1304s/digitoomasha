import React, { useRef, useState } from 'react';
import { testimonials } from '@/data/testimonials';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.testimonial-wrapper-box', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, { scope: containerRef });

  const changeTestimonial = (index) => {
    if (index === activeIndex) return;
    
    gsap.to('.testimonial-quote-box', {
      opacity: 0,
      y: -15,
      duration: 0.25,
      onComplete: () => {
        setActiveIndex(index);
        gsap.fromTo('.testimonial-quote-box', 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });
  };

  return (
    <section ref={containerRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#FAF8F2] border-t border-[#E0DDD2]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-xs font-bold uppercase tracking-widest text-[#1E3A2B] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D99B00]" />
          // CLIENT PERSPECTIVE
        </div>
        
        <div className="testimonial-wrapper-box flex flex-col lg:flex-row gap-12 items-start justify-between">
          
          <div className="w-full lg:w-3/4 bg-[#EAE6D6]/40 p-8 md:p-14 rounded-3xl border border-[#E0DDD2] relative">
            <Quote className="w-12 h-12 text-[#D99B00] opacity-50 mb-6" />
            
            <div className="testimonial-quote-box min-h-[160px] flex flex-col justify-between">
              <blockquote className="text-xl md:text-3xl font-bold tracking-tight text-[#1A1A1A] leading-relaxed mb-8">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div>
                <div className="text-lg font-extrabold text-[#1A1A1A]">{testimonials[activeIndex].author}</div>
                <div className="text-sm font-semibold text-[#5A5A55]">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4 flex lg:flex-col gap-3">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                onClick={() => changeTestimonial(idx)}
                className={cn(
                  "flex-1 p-4 rounded-2xl border text-left font-bold text-xs uppercase tracking-widest transition-all cursor-pointer",
                  activeIndex === idx 
                    ? "bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-md" 
                    : "bg-white text-[#5A5A55] border-[#E0DDD2] hover:text-[#1A1A1A]"
                )}
              >
                0{idx + 1} — {t.company}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
