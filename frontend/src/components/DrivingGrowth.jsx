import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  TrendingUp,
  Zap,
  Target,
  Layers,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Clock,
  Award,
  Activity
} from 'lucide-react';
import growthChartImg from '../assets/driving_growth_chart.png';

export default function DrivingGrowth() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pillars');

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section className="growth-section">
      {/* Hairline Divider & Top Label */}
      <div className="growth-header-label">
        <span className="section-category-tag">HOW DIGITAL MARKETING SERVICES</span>
      </div>

      {/* Main Title */}
      <h2 className="growth-title">Driving business growth</h2>

      {/* Two Column Grid */}
      <div className="growth-grid">
        {/* Left Text Content Column */}
        <div className="growth-text-col">
          <p className="growth-paragraph">
            Digital marketing services provide businesses of all sizes with an
            opportunity to market their brand 24/7 at a low cost. From startups to
            medium-sized enterprises to multiple-location companies, a digital
            marketing company helps you expand your niche market reach to offer goods
            and services to your target customers, irrespective of time differences or location.
          </p>

          <p className="growth-paragraph">
            Hiring an internet marketing agency is one of the best ways to reach your
            prospects while maintaining a robust relationship with your existing clients.
            As long as your business has a strong digital presence, your customers will
            always find you.
          </p>

          <div className="growth-cta-wrapper">
            <button 
              className="learn-more-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="growth-image-col">
          <div className="growth-image-card" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
            <img
              src={growthChartImg}
              alt="Driving business growth chart analysis"
              className="growth-chart-img"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIGHT MODE & SIMPLE POP-UP MODAL OVERLAY */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="growth-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="growth-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Header Section */}
            <div className="growth-modal-header">
              <div>
                <div className="growth-modal-badge">
                  <Sparkles style={{ width: 14, height: 14 }} />
                  <span>DigiToomasha Growth Engine</span>
                </div>
                <h3 className="growth-modal-title">Digital Marketing Growth Services</h3>
                <p className="growth-modal-subtitle">
                  Explore how our digital marketing solutions expand your market reach and drive customer acquisition.
                </p>
              </div>

              <button 
                className="growth-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                title="Close (Esc)"
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="growth-modal-body">
              
              {/* Key Metrics Summary Banner */}
              <div className="growth-modal-metrics-grid">
                <div className="growth-modal-metric-card">
                  <span className="gm-metric-val">+350%</span>
                  <span className="gm-metric-label">Avg Organic Reach</span>
                </div>
                <div className="growth-modal-metric-card">
                  <span className="gm-metric-val">5.4x</span>
                  <span className="gm-metric-label">Average ROAS Yield</span>
                </div>
                <div className="growth-modal-metric-card">
                  <span className="gm-metric-val">24/7</span>
                  <span className="gm-metric-label">Brand Visibility</span>
                </div>
                <div className="growth-modal-metric-card">
                  <span className="gm-metric-val">100%</span>
                  <span className="gm-metric-label">Custom Strategy</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="growth-modal-tabs-bar">
                <button
                  className={`growth-modal-tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pillars')}
                >
                  <Target style={{ width: 15, height: 15 }} />
                  <span>Core Services</span>
                </button>

                <button
                  className={`growth-modal-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
                  onClick={() => setActiveTab('roadmap')}
                >
                  <Layers style={{ width: 15, height: 15 }} />
                  <span>4-Step Process</span>
                </button>

                <button
                  className={`growth-modal-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tech')}
                >
                  <Cpu style={{ width: 15, height: 15 }} />
                  <span>Tech & Tools</span>
                </button>

                <button
                  className={`growth-modal-tab-btn ${activeTab === 'cases' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cases')}
                >
                  <Award style={{ width: 15, height: 15 }} />
                  <span>Success Stories</span>
                </button>
              </div>

              {/* TAB 1: CORE PILLARS */}
              {activeTab === 'pillars' && (
                <div className="growth-tab-content-pane">
                  <div className="growth-pillars-grid">
                    
                    <div className="growth-pillar-card">
                      <div className="pillar-icon-box">
                        <TrendingUp style={{ width: 18, height: 18 }} />
                      </div>
                      <h4 className="pillar-title">Paid Advertising (PPC & Social)</h4>
                      <p className="pillar-desc">
                        Targeted campaigns across Google, Meta, and LinkedIn designed to capture high-intent buyers and deliver instant traffic.
                      </p>
                      <ul className="pillar-bullets">
                        <li><CheckCircle2 /> Audience targeting & retargeting</li>
                        <li><CheckCircle2 /> Daily campaign & budget optimization</li>
                      </ul>
                    </div>

                    <div className="growth-pillar-card">
                      <div className="pillar-icon-box">
                        <BarChart3 style={{ width: 18, height: 18 }} />
                      </div>
                      <h4 className="pillar-title">Search Engine Optimization (SEO)</h4>
                      <p className="pillar-desc">
                        Expand your organic search rankings and attract qualified prospects searching for your goods and services.
                      </p>
                      <ul className="pillar-bullets">
                        <li><CheckCircle2 /> On-page & technical SEO audits</li>
                        <li><CheckCircle2 /> High-ranking keyword strategy</li>
                      </ul>
                    </div>

                    <div className="growth-pillar-card">
                      <div className="pillar-icon-box">
                        <Zap style={{ width: 18, height: 18 }} />
                      </div>
                      <h4 className="pillar-title">Conversion Rate Optimization</h4>
                      <p className="pillar-desc">
                        Refine website user experience and landing page design to turn website visitors into loyal paying customers.
                      </p>
                      <ul className="pillar-bullets">
                        <li><CheckCircle2 /> A/B testing & page analytics</li>
                        <li><CheckCircle2 /> Clear call-to-action pathways</li>
                      </ul>
                    </div>

                    <div className="growth-pillar-card">
                      <div className="pillar-icon-box">
                        <ShieldCheck style={{ width: 18, height: 18 }} />
                      </div>
                      <h4 className="pillar-title">Client Retention & Communication</h4>
                      <p className="pillar-desc">
                        Maintain strong ongoing relationships with existing clients through automated email campaigns and updates.
                      </p>
                      <ul className="pillar-bullets">
                        <li><CheckCircle2 /> Customer engagement workflows</li>
                        <li><CheckCircle2 /> Brand loyalty optimization</li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: ROADMAP */}
              {activeTab === 'roadmap' && (
                <div className="growth-tab-content-pane">
                  <div className="roadmap-timeline">
                    
                    <div className="roadmap-step-item">
                      <div className="roadmap-phase-badge">Step 1</div>
                      <div className="roadmap-step-content">
                        <h4 className="roadmap-step-title">Audit & Strategy Planning</h4>
                        <p className="roadmap-step-desc">
                          We analyze your current digital presence, evaluate competitors, and establish key performance goals.
                        </p>
                      </div>
                    </div>

                    <div className="roadmap-step-item">
                      <div className="roadmap-phase-badge">Step 2</div>
                      <div className="roadmap-step-content">
                        <h4 className="roadmap-step-title">Campaign & Asset Setup</h4>
                        <p className="roadmap-step-desc">
                          Creating tailored ad messaging, high-converting landing pages, and tracking infrastructure.
                        </p>
                      </div>
                    </div>

                    <div className="roadmap-step-item">
                      <div className="roadmap-phase-badge">Step 3</div>
                      <div className="roadmap-step-content">
                        <h4 className="roadmap-step-title">Launch & Optimization</h4>
                        <p className="roadmap-step-desc">
                          Activating marketing channels and continuously fine-tuning bids and creatives for maximum ROI.
                        </p>
                      </div>
                    </div>

                    <div className="roadmap-step-item">
                      <div className="roadmap-phase-badge">Step 4</div>
                      <div className="roadmap-step-content">
                        <h4 className="roadmap-step-title">Scale & Retain</h4>
                        <p className="roadmap-step-desc">
                          Expanding top-performing channels while deploying retention flows for long-term customer value.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: TECH & TOOLS */}
              {activeTab === 'tech' && (
                <div className="growth-tab-content-pane">
                  <div className="tech-stack-grid">
                    
                    <div className="tech-stack-card">
                      <div className="tech-icon-circle">
                        <Activity style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <h4 className="tech-card-title">Real-Time Analytics Tracking</h4>
                        <p className="tech-card-desc">
                          Accurate multi-channel conversion tracking and user behavior metrics.
                        </p>
                      </div>
                    </div>

                    <div className="tech-stack-card">
                      <div className="tech-icon-circle">
                        <Cpu style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <h4 className="tech-card-title">AI Performance Optimization</h4>
                        <p className="tech-card-desc">
                          Smart bid adjustment tools and automated ad copy variation testing.
                        </p>
                      </div>
                    </div>

                    <div className="tech-stack-card">
                      <div className="tech-icon-circle">
                        <Clock style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <h4 className="tech-card-title">24/7 Live Data Monitoring</h4>
                        <p className="tech-card-desc">
                          Continuous campaign oversight and automated alert reporting.
                        </p>
                      </div>
                    </div>

                    <div className="tech-stack-card">
                      <div className="tech-icon-circle">
                        <BarChart3 style={{ width: 20, height: 20 }} />
                      </div>
                      <div>
                        <h4 className="tech-card-title">Transparent Client Portal</h4>
                        <p className="tech-card-desc">
                          Easy-to-read reporting dashboard detailing clicks, leads, sales, and total ad return.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 4: SUCCESS STORIES */}
              {activeTab === 'cases' && (
                <div className="growth-tab-content-pane">
                  <div className="case-highlights-grid">
                    
                    <div className="case-highlight-card">
                      <div>
                        <h4 className="ch-client-name">Lumière Skincare</h4>
                        <span className="ch-industry">Beauty & Retail</span>
                        <div className="ch-result-box">
                          <span className="ch-result-val">+360% Sales Growth</span>
                          <span className="ch-result-sub">3x Return on Ad Spend</span>
                        </div>
                        <p className="ch-desc">
                          Expanded niche market reach with targeted Meta video ads and quiz landing pages.
                        </p>
                      </div>
                    </div>

                    <div className="case-highlight-card">
                      <div>
                        <h4 className="ch-client-name">Aura Health</h4>
                        <span className="ch-industry">SaaS & Tech</span>
                        <div className="ch-result-box">
                          <span className="ch-result-val">-62% Lower CPA</span>
                          <span className="ch-result-sub">+410% Inbound Leads</span>
                        </div>
                        <p className="ch-desc">
                          Optimized organic search presence and LinkedIn campaign conversion rates.
                        </p>
                      </div>
                    </div>

                    <div className="case-highlight-card">
                      <div>
                        <h4 className="ch-client-name">Heartleaf Botanicals</h4>
                        <span className="ch-industry">E-Commerce</span>
                        <div className="ch-result-box">
                          <span className="ch-result-val">Top 3 Organic Rank</span>
                          <span className="ch-result-sub">+280% Organic Revenue</span>
                        </div>
                        <p className="ch-desc">
                          Achieved top local map pack positions and high keyword visibility.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Footer Action Bar */}
            <div className="growth-modal-footer">
              <button 
                className="gm-footer-btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>

              <button 
                className="gm-footer-btn-primary"
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/signup');
                }}
              >
                <span>Get Started</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
