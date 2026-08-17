import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const workSection = document.getElementById('work-showcase') || document.getElementById('case-studies');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/work');
    }
  };

  return (
    <section className="v2-hero-section">
      {/* Minimalist Top Indicator Dot */}
      <div className="v2-hero-top-dot" aria-hidden="true" />

      <div className="v2-hero-container">
        {/* Left Column: Bold Headline & Action Controls */}
        <div className="v2-hero-left">
          <h1 className="v2-hero-headline">
            <span className="v2-headline-black">WE BUILD</span>
            <br />
            <span className="v2-headline-black">DIGITAL</span>
            <br />
            <span className="v2-headline-blue">MOMENTUM.</span>
          </h1>

          <p className="v2-hero-subhead">
            Strategy, technology, creativity and AI engineered to move ambitious brands forward.
          </p>

          <div className="v2-hero-ctas">
            <button className="v2-btn-primary" onClick={() => navigate('/contact')}>
              <span>Start a Project</span>
              <ArrowRight className="v2-btn-icon" />
            </button>

            <button className="v2-btn-secondary" onClick={handleExploreClick}>
              <span>Explore Our Work</span>
              <ArrowDown className="v2-btn-icon" />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Fluid Gradient Artwork Card */}
        <div className="v2-hero-right">
          <div className="v2-fluid-card">
            <div className="v2-fluid-gradient-mesh">
              <svg className="v2-fluid-svg" viewBox="0 0 800 800" preserveAspectRatio="none">
                <defs>
                  {/* Pastel Lavender / Peach / Pink Gradient */}
                  <linearGradient id="pastelGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
                    <stop offset="35%" stopColor="#f472b6" stopOpacity="0.5" />
                    <stop offset="70%" stopColor="#c084fc" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
                  </linearGradient>

                  {/* Cyan / Sky Blue / Soft Violet Flowing Gradient */}
                  <linearGradient id="pastelGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.85" />
                    <stop offset="80%" stopColor="#818cf8" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.6" />
                  </linearGradient>

                  {/* Translucent Rose / Lilac Accent Gradient */}
                  <linearGradient id="pastelGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e879f9" stopOpacity="0.65" />
                    <stop offset="50%" stopColor="#fb7185" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#fef08a" stopOpacity="0.6" />
                  </linearGradient>

                  <filter id="fluidBlur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="18" />
                  </filter>
                </defs>

                {/* Base Soft Off-White Background */}
                <rect width="800" height="800" fill="#f8fafc" />

                {/* Fluid Ambient Glow Orbs */}
                <circle cx="620" cy="180" r="380" fill="url(#pastelGrad1)" filter="url(#fluidBlur)" className="v2-glow-orb-1" />
                <circle cx="220" cy="620" r="420" fill="url(#pastelGrad2)" filter="url(#fluidBlur)" className="v2-glow-orb-2" />

                {/* Curving Wave Layer 1 (Upper Peach/Pink to Lilac) */}
                <path
                  d="M0,0 L800,0 L800,440 C640,510 490,390 340,470 C190,550 90,410 0,490 Z"
                  fill="url(#pastelGrad1)"
                  className="v2-path-wave-1"
                />

                {/* Curving Wave Layer 2 (Cyan/Blue Lower Wave Flow) */}
                <path
                  d="M0,800 L800,800 L800,310 C610,430 460,270 290,370 C130,460 50,380 0,430 Z"
                  fill="url(#pastelGrad2)"
                  className="v2-path-wave-2"
                />

                {/* Translucent Middle Intersecting Wave Layer 3 */}
                <path
                  d="M0,230 C240,160 390,360 590,270 C710,210 770,250 800,280 L800,660 C670,600 510,680 340,580 C170,480 70,600 0,560 Z"
                  fill="url(#pastelGrad3)"
                  className="v2-path-wave-3"
                />
              </svg>

              {/* Glassmorphic Ambient Gloss Overlay */}
              <div className="v2-fluid-shine" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

