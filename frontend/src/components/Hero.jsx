import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Play, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="landing-hero-section">
      <div className="ambient-orb-purple" aria-hidden="true" />
      <div className="grid-bg-overlay" aria-hidden="true" />

      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
        {/* Glowing Pill Badge */}
        <div className="landing-pill-badge" onClick={() => navigate('/signup')}>
          <Sparkles style={{ width: 15, height: 15, color: '#a855f7' }} />
          <span>Special Agency Offer: 30% Off Q3 Retainers</span>
          <ArrowRight style={{ width: 14, height: 14 }} />
        </div>

        {/* Dynamic Display Title */}
        <h1 className="landing-hero-headline">
          Scale Revenue with AI-Powered <br />
          <span className="gradient-text-purple-blue">Performance Marketing</span>
        </h1>

        {/* Subtitle Description */}
        <p className="landing-hero-subhead">
          We combine algorithmic multi-channel ad management, white-hat intent SEO,
          and real-time ROAS analytics to deliver predictable growth for ambitious brands.
        </p>

        {/* Dual Action Buttons */}
        <div className="landing-hero-ctas">
          <button className="btn-hero-primary" onClick={() => navigate('/signup')}>
            <Zap style={{ width: 18, height: 18, color: '#a855f7' }} />
            <span>Start Your Growth Sprint</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
          <button className="btn-hero-secondary" onClick={() => navigate('/services')}>
            <Play style={{ width: 16, height: 16, color: '#2563eb' }} />
            <span>Explore Services & ROAS</span>
          </button>
        </div>

        {/* Live Metrics Trust Counter Grid */}
        <div className="landing-stats-grid">
          <div className="landing-stat-card">
            <div className="landing-stat-num text-purple-600">₹140M+</div>
            <div className="landing-stat-label">Revenue Generated</div>
          </div>
          <div className="landing-stat-card">
            <div className="landing-stat-num text-blue-600">5.2x</div>
            <div className="landing-stat-label">Average ROAS</div>
          </div>
          <div className="landing-stat-card">
            <div className="landing-stat-num text-indigo-600">98.4%</div>
            <div className="landing-stat-label">Client Retention</div>
          </div>
          <div className="landing-stat-card">
            <div className="landing-stat-num text-pink-600">1.2M+</div>
            <div className="landing-stat-label">Conversions Delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
