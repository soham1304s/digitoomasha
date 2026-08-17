import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

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
      { threshold: 0.25 }
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
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${shouldPlay ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&enablejsapi=1&controls=1&rel=0&modestbranding=1`;

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

      {/* Embedded Auto-playing Video Container */}
      <div className="showcase-video-embed-container">
        <div className="video-status-header">
          <div className="live-autopill-group">
            <span className="pulse-red-dot" />
            <span className="live-autopill-text">
              {shouldPlay ? 'Auto-Playing Showcase' : 'Scroll to Play Showcase'}
            </span>
          </div>

          <button
            className="sound-toggle-btn"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Click to Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="sound-ic" /> : <Volume2 className="sound-ic text-green" />}
            <span>{isMuted ? "Unmute Sound" : "Muted"}</span>
          </button>
        </div>

        <div className="responsive-video-frame">
          <iframe
            src={embedUrl}
            title="Digital Marketing Success Story"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
