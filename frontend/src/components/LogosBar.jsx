import React from 'react';

const LOGOS = [
  {
    id: 'logo-1',
    name: 'Brand 1',
    svg: (
      <svg className="logo-svg" viewBox="0 0 100 30" height="28">
        <path fill="currentColor" d="M4 4h8v22H4V4zm12 12h4v10h-4V16zm8-6h4v16h-4V10zm8 4h4v12h-4V14zm12-8h8v22h-8V6zm12 10h4v10h-4V16zm8-6h4v16h-4V10z" />
      </svg>
    ),
  },
  {
    id: 'logo-2',
    name: 'Brand 2',
    svg: (
      <svg className="logo-svg" viewBox="0 0 32 32" height="28">
        <path fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M16 3C16 3 8 13 8 20a8 8 0 0 0 16 0c0-7-8-17-8-17z" />
        <circle cx="16" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'logo-3',
    name: 'logo-ipsum',
    svg: (
      <svg className="logo-svg" viewBox="0 0 140 32" height="28">
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="16" cy="16" r="11" />
          <ellipse cx="16" cy="16" rx="5" ry="11" />
          <line x1="5" y1="16" x2="27" y2="16" />
        </g>
        <text x="36" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">
          logo-ipsum
        </text>
      </svg>
    ),
  },
  {
    id: 'logo-4',
    name: 'Logoipsum',
    svg: (
      <svg className="logo-svg" viewBox="0 0 150 32" height="28">
        <path fill="currentColor" d="M6 4h18v16l-9 8-9-8V4zm9 4l-4 4h3v6h2v-6h3l-4-4z" />
        <text x="32" y="22" fill="currentColor" fontSize="18" fontWeight="800" fontFamily="sans-serif">
          Logoipsum
        </text>
      </svg>
    ),
  },
  {
    id: 'logo-5',
    name: 'Brand 5',
    svg: (
      <svg className="logo-svg" viewBox="0 0 32 32" height="28">
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="11" cy="11" r="6" />
          <circle cx="21" cy="11" r="6" />
          <circle cx="11" cy="21" r="6" />
          <circle cx="21" cy="21" r="6" />
        </g>
      </svg>
    ),
  },
  {
    id: 'logo-6',
    name: 'Brand 6',
    svg: (
      <svg className="logo-svg" viewBox="0 0 36 32" height="28">
        <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M6 16c0-6 5-10 12-10s12 4 12 10-5 10-12 10-8-3-8-8 3-5 8-5 5 2 5 5" />
      </svg>
    ),
  },
  {
    id: 'logo-7',
    name: 'Brand 7',
    svg: (
      <svg className="logo-svg" viewBox="0 0 44 32" height="28">
        <path fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8c4.8 0 8.4 6 10 8 1.6-2 5.2-8 10-8 4.4 0 8 3.6 8 8s-3.6 8-8 8c-4.8 0-8.4-6-10-8-1.6 2-5.2 8-10 8z" />
      </svg>
    ),
  },
];

export default function LogosBar() {
  return (
    <div className="logos-bar">
      <div className="logos-marquee-wrapper">
        {/* Track 1 */}
        <div className="logos-marquee-track">
          {LOGOS.map((logo) => (
            <div key={`t1-${logo.id}`} className="logo-item" title={logo.name}>
              {logo.svg}
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless infinite marquee loop) */}
        <div className="logos-marquee-track" aria-hidden="true">
          {LOGOS.map((logo) => (
            <div key={`t2-${logo.id}`} className="logo-item" title={logo.name}>
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
