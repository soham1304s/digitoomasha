import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from '../components/landing/Loader';
import { CustomCursor } from '../components/landing/CustomCursor';
import Navbar from '../components/Navbar';
import { ScrollIndicator } from '../components/landing/ScrollIndicator';
import { Hero } from '../components/landing/Hero';
import { Statement } from '../components/landing/Statement';
import { ServicesLanding } from '../components/landing/ServicesLanding';
import { WorkSection } from '../components/landing/WorkSection';
import { ImpactSection } from '../components/landing/ImpactSection';
import { ProcessSection } from '../components/landing/ProcessSection';
import { TechnologySection } from '../components/landing/TechnologySection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FinalCTASection } from '../components/landing/FinalCTASection';
import { LandingFooter } from '../components/landing/LandingFooter';
import { ChatWidget } from '../components/landing/ChatWidget';

// Register GSAP ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden selection:bg-[#1E3A2B] selection:text-white bg-[#FAF8F2] text-[#1A1A1A]">
      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}
      <CustomCursor />
      
      {/* Fixed Sticky Glassmorphic Navbar */}
      <Navbar />
      
      <main>
        <Hero />
        <ScrollIndicator />
        <Statement />
        <ServicesLanding />
        <WorkSection />
        <ImpactSection />
        <ProcessSection />
        <TechnologySection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>

      <LandingFooter />
      <ChatWidget />
    </div>
  );
}
