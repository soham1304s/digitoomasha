import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import portraitImg from '../assets/video_showcase_portrait.png';

export default function VideoShowcase() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="video-showcase-section">
      {/* Light Grid Background Matrix */}
      <div className="showcase-grid-bg">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className={`grid-tile ${[4, 11, 23, 30, 39, 44].includes(i) ? 'tile-filled' : ''}`}
          />
        ))}
      </div>

      {/* Center Woman Portrait */}
      <div className="showcase-portrait-wrapper">
        <img
          src={portraitImg}
          alt="Digital Marketing Specialist Showcase"
          className="showcase-portrait-img"
        />

        {/* Centered Glassmorphic Play Button */}
        <button
          className="play-btn-glass"
          onClick={() => setIsVideoOpen(true)}
          aria-label="Play Feature Video"
        >
          <Play className="play-icon" />
        </button>
      </div>

      {/* Interactive Video Modal */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close Video"
            >
              <X />
            </button>
            <div className="responsive-video-container">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Digital Marketing Success Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
