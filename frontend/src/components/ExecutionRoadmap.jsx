import React from 'react';
import { Target, Cpu, Sparkles, BarChart2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Target,
    title: 'Audit & Intent Strategy',
    desc: 'Deep audit of existing campaign history, audience intent signals, and unit economics to build a high-conversion media blueprint.'
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Algorithmic Bidding',
    desc: 'Deploy automated bidding rules across Google, Meta, and B2B channels to minimize cost-per-acquisition (CPA) in real-time.'
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Creative Iteration',
    desc: 'Continuous multi-variant testing of high-converting video assets, UGC hooks, and ad copy angles designed for maximum CTR.'
  },
  {
    num: '04',
    icon: BarChart2,
    title: 'Live Telemetry Dashboard',
    desc: 'Full transparency via your custom Client Intelligence Portal with real-time ROAS tracking, multi-touch attribution, and instant scaling alerts.'
  }
];

export default function ExecutionRoadmap() {
  return (
    <section className="roadmap-container">
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div className="landing-pill-badge" style={{ marginBottom: '1rem' }}>
          <Sparkles style={{ width: 15, height: 15, color: '#a855f7' }} />
          <span>Proven Growth Framework</span>
        </div>
        <h2 className="roadmap-heading" style={{ fontSize: '2.5rem', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Engineered for <span className="gradient-text-purple-blue">Maximum Scalability</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Our 4-step execution framework eliminates wasted media spend and systematically scales high-performing acquisition channels.
        </p>
      </div>

      <div className="roadmap-grid">
        {STEPS.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <div key={idx} className="roadmap-card">
              <div className="roadmap-step-num">{s.num}</div>
              <IconComp style={{ width: 28, height: 28, color: '#7c3aed', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
