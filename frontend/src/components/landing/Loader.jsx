import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Animate percentage
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.innerHTML = Math.round(counter.value).toString().padStart(3, '0') + '%';
        }
      }
    })
    .to('.loader-text-wrapper', {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut'
    });
  }, { scope: loaderRef, dependencies: [onComplete] });

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-primary text-text-primary"
    >
      <div className="loader-text-wrapper flex flex-col items-center">
        <h1 className="text-sm font-bold tracking-[0.3em] uppercase mb-4">
          DIGITOOMASHA
        </h1>
        <div 
          ref={textRef} 
          className="text-8xl md:text-9xl font-bold tracking-tighter text-brand-blue"
        >
          000%
        </div>
      </div>
    </div>
  );
};
