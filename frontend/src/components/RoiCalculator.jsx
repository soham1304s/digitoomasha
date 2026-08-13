import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RoiCalculator() {
  const [adSpend, setAdSpend] = useState(150000); // Default ₹1,50,000/mo
  const navigate = useNavigate();

  // Calculated estimates
  const estRoas = (adSpend > 300000 ? 5.8 : adSpend > 100000 ? 4.9 : 4.2).toFixed(1);
  const estRevenue = Math.round(adSpend * estRoas);
  const estNetProfit = Math.round(estRevenue - adSpend);
  const estLeads = Math.round(adSpend / 380);

  return (
    <section className="roi-calc-container">
      <div className="roi-calc-grid">
        <div>
          <div className="landing-pill-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#d8b4fe', borderColor: 'rgba(216,180,254,0.3)', marginBottom: '1rem' }}>
            <Calculator style={{ width: 15, height: 15 }} />
            <span>Interactive Growth Simulator</span>
          </div>

          <h2 className="roi-heading" style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem' }}>
            Calculate Your Projected <br />
            <span style={{ color: '#c084fc' }}>ROAS & Net Profit</span>
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Adjust your monthly media spend slider to estimate projected cross-channel revenue, 
            qualified customer acquisitions, and net profit driven by DigiToomasha's AI optimization.
          </p>

          <div className="roi-slider-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontWeight: 600 }}>
              <span style={{ color: '#cbd5e1' }}>Monthly Media Budget</span>
              <span style={{ color: '#c084fc', fontSize: '1.25rem', fontWeight: 800 }}>₹{adSpend.toLocaleString('en-IN')}/mo</span>
            </div>
            <input
              type="range"
              min="25000"
              max="1000000"
              step="25000"
              value={adSpend}
              onChange={(e) => setAdSpend(Number(e.target.value))}
              className="roi-range-input"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
              <span>₹25,000</span>
              <span>₹5,000,000+</span>
            </div>
          </div>
        </div>

        <div className="roi-output-box">
          <div className="roi-metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Estimated ROAS</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '0.2rem' }}>{estRoas}x</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Qualified Leads</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6', marginTop: '0.2rem' }}>~{estLeads.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div style={{ background: 'rgba(168,85,247,0.12)', padding: '1.5rem', borderRadius: '18px', border: '1px solid rgba(168,85,247,0.3)', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#e9d5ff', fontWeight: 600 }}>Projected Monthly Revenue</div>
            <div className="roi-revenue-val" style={{ fontSize: '2.5rem', fontWeight: 850, color: '#ffffff', letterSpacing: '-0.02em', margin: '0.3rem 0' }}>
              ₹{estRevenue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.88rem', color: '#4ade80', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <TrendingUp style={{ width: 16, height: 16 }} />
              <span>Net Profit: +₹{estNetProfit.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/signup')}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #2563eb 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3)'
            }}
          >
            <span>Lock In This ROAS Plan</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
