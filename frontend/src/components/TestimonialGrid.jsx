import React from 'react';
import { Star, CheckCircle, Quote, TrendingUp } from 'lucide-react';

const REVIEWS = [
  {
    quote: "DigiToomasha scaled our D2C brand from ₹12L to ₹48L monthly revenue in just 90 days. Their AI attribution dashboard gives us total clarity on ad spend.",
    name: "Vikram Malhotra",
    title: "Founder & CEO",
    company: "Aura Skincare Labs",
    gain: "+300% Revenue Scaling",
    roas: "6.2x ROAS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The team's algorithmic keyword strategy brought down our Google Search CPA by 42% while doubling our qualified enterprise lead volume.",
    name: "Ananya Sharma",
    title: "Head of Marketing",
    company: "Luminere Tech Solutions",
    gain: "-42% CPA Reduction",
    roas: "5.4x ROAS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Outstanding performance agency! Their real-time dashboard telemetry and rapid video ad creative testing helped us dominate our market segment.",
    name: "Rajesh Kulkarni",
    title: "Chief Commercial Officer",
    company: "HeartLeaf Organics",
    gain: "₹1.8Cr ARR Pipeline",
    roas: "4.9x ROAS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

export default function TestimonialGrid() {
  return (
    <section className="testimonials-section">
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div className="landing-pill-badge" style={{ marginBottom: '1rem' }}>
          <Quote style={{ width: 15, height: 15, color: '#a855f7' }} />
          <span>Verified Client Outcomes</span>
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Trusted by <span className="gradient-text-purple-blue">High-Growth Brands</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Here is what agency partners and marketing leaders say about scaling revenue with DigiToomasha.
        </p>
      </div>

      <div className="testimonials-grid">
        {REVIEWS.map((r, idx) => (
          <div key={idx} className="testimonial-card">
            <div>
              <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', marginBottom: '1.25rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 18, height: 18, fill: '#f59e0b' }} />
                ))}
              </div>
              <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "{r.quote}"
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.5rem 0.8rem', borderRadius: '10px', width: 'fit-content', marginBottom: '1.25rem' }}>
                <TrendingUp style={{ width: 15, height: 15, color: '#16a34a' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803d' }}>{r.gain} ({r.roas})</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <img src={r.avatar} alt={r.name} style={{ width: 46, height: 46, borderRadius: '9999px', objectFit: 'cover', border: '2px solid #a855f7' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{r.name}</span>
                    <CheckCircle style={{ width: 14, height: 14, color: '#2563eb' }} />
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b' }}>{r.title}, {r.company}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
