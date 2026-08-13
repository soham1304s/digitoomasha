import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: "How quickly can DigiToomasha launch our marketing campaigns?",
    a: "Following our initial onboarding audit and intent strategy session, full multi-channel ad campaigns on Google Search, Meta Ads, and LinkedIn launch within 48 to 72 hours."
  },
  {
    q: "What is your minimum ad spend requirement?",
    a: "We work with growing startups, mid-market businesses, and enterprise brands spending anywhere from ₹25,000/month up to ₹50,000,000+/month across digital ad platforms."
  },
  {
    q: "How does the real-time AI attribution dashboard work?",
    a: "Every agency client gains instant 24/7 access to their custom Client Intelligence Portal. Our platform aggregates live API streams from your Google, Meta, and website analytics into a unified ROAS dashboard."
  },
  {
    q: "Are there long-term lock-in contracts?",
    a: "No. We believe performance retains clients. We offer flexible monthly growth retainers as well as quarterly sprint options without punitive long-term lock-ins."
  },
  {
    q: "Do you handle creative video production and ad copywriting?",
    a: "Yes! Our in-house content studio handles end-to-end creative strategy, high-converting UGC video editing, carousel graphic design, and persuasive ad copywriting."
  }
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="faq-section-container">
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
        <div className="landing-pill-badge" style={{ marginBottom: '1rem' }}>
          <HelpCircle style={{ width: 15, height: 15, color: '#a855f7' }} />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Everything You Need to Know <br />
          <span className="gradient-text-purple-blue">Before Partnering With Us</span>
        </h2>
      </div>

      <div>
        {FAQS.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="faq-card-item">
              <button className="faq-header-btn" onClick={() => toggle(idx)}>
                <span>{f.q}</span>
                <ChevronDown
                  style={{
                    width: 20,
                    height: 20,
                    color: '#7c3aed',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease'
                  }}
                />
              </button>
              {isOpen && (
                <div className="faq-body-content">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
