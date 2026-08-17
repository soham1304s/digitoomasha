import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const videoId = "QsY8fnvMn6c";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${shouldPlay ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&disablekb=1&playsinline=1`;

  return (
    <section className="video-showcase-section" ref={sectionRef}>
      {/* Light Grid Background Matrix */}
      <div className="showcase-grid-bg">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className={`grid-tile ${[4, 11, 23, 30, 39, 44].includes(i) ? 'tile-filled' : ''}`}
          />
        ))}
      </div>

      {/* Ultra-Premium Pure Cinematic Video Showcase */}
      <div className="showcase-video-embed-container pure-cinematic-frame">
        <div className="responsive-video-frame pure-video-viewport">
          <iframe
            src={embedUrl}
            title="DigiToomasha Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Floating Premium Mute / Unmute Button */}
        <button
          className="cinematic-mute-btn"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="mute-ic" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="mute-ic text-green" />
              <span>Sound On</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
