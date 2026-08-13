import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function CtaBanner() {
  const navigate = useNavigate();

  return (
    <section className="cta-banner-container">
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          <Clock style={{ width: 14, height: 14, color: '#facc15' }} />
          <span>Limited Q3 Onboarding Slots Available</span>
        </div>

        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 850, lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Ready to Scale Your Brand to <br />
          The Next Revenue Tier?
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
          Schedule a 30-minute growth strategy consultation with our performance leads. 
          We will analyze your current ad spend, uncover wasted budget, and map out a 5x ROAS plan.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/signup')}
            style={{
              padding: '1rem 2.4rem',
              background: '#ffffff',
              color: '#0f172a',
              fontWeight: 800,
              fontSize: '1.05rem',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.3s ease'
            }}
          >
            <Zap style={{ width: 18, height: 18, color: '#7c3aed' }} />
            <span>Book Strategy Consultation</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', fontSize: '0.88rem', color: '#cbd5e1', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck style={{ width: 16, height: 16, color: '#4ade80' }} />
            <span>No Obligation Audit</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck style={{ width: 16, height: 16, color: '#4ade80' }} />
            <span>Instant Access to Intelligence Portal</span>
          </span>
        </div>
      </div>
    </section>
  );
}
