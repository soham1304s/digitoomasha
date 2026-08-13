import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import CaseStudies from '../components/CaseStudies';

const ALL_SERVICES = [
  {
    id: 'seo',
    category: 'SEO & CRO',
    title: 'Search Engine Optimization (SEO)',
    desc: 'Through rigorous keyword research, technical site audits, and white-hat link building, we elevate your organic search rankings to dominate competitive search queries.',
    features: ['Technical SEO Audits', 'On-Page & Keyword Optimization', 'White-Hat Backlink Acquisition', 'Local SEO & Google Business'],
    bg: '#ecf3f6',
  },
  {
    id: 'web-design',
    category: 'Web Design',
    title: 'Custom Website Design & UI/UX',
    desc: "Capture your audience's attention with high-converting, mobile-first custom web designs crafted specifically for modern brands and performance-driven enterprises.",
    features: ['Custom Figma Mockups', 'Responsive React & Vite Apps', 'Conversion Rate Optimization', 'Speed & Performance Tuning'],
    bg: '#edf5f1',
  },
  {
    id: 'ppc',
    category: 'PPC & Paid Ads',
    title: 'Pay Per Click (PPC) Management',
    desc: 'Acquire high-intent customers rapidly through precision-targeted Google Search, Shopping, and Display campaigns designed to maximize ROI.',
    features: ['Google Search & Display Ads', 'Remarketing Campaigns', 'A/B Ad Creative Testing', 'ROAS & CPA Optimization'],
    bg: '#f7ece5',
  },
  {
    id: 'social',
    category: 'Social Media',
    title: 'Social Media Marketing & Meta Ads',
    desc: 'Expand your brand reach across Meta, Instagram, LinkedIn, and TikTok with thumb-stopping creative ad campaigns and organic community building.',
    features: ['Meta (FB & IG) Paid Ads', 'TikTok & Reel Video Ads', 'Influencer Collaboration', 'Community Engagement'],
    bg: '#f8fafc',
  },
  {
    id: 'reputation',
    category: 'Reputation Management',
    title: 'Online Reputation & Brand Monitoring',
    desc: 'Protect and elevate your brand image across search engines, review platforms, and media outlets with proactive sentiment analysis and press release distribution.',
    features: ['Review Generation Systems', 'Brand Sentiment Monitoring', 'Crisis PR Management', 'Google Knowledge Panel SEO'],
    bg: '#fbf5e2',
  },
  {
    id: 'cro',
    category: 'SEO & CRO',
    title: 'Conversion Rate Optimization (CRO)',
    desc: 'Turn existing site traffic into qualified leads and sales through scientific user behavior testing, heatmaps, and landing page funnel optimization.',
    features: ['User Heatmap & Session Recording', 'A/B & Multivariate Testing', 'Checkout Funnel Streamlining', 'Copywriting & CTA Tuning'],
    bg: '#f3f0ff',
  },
];

const PACKAGES = [
  {
    name: 'Growth Starter',
    price: '₹1,499',
    period: '/month',
    desc: 'Ideal for growing businesses looking to establish search dominance.',
    features: [
      'Comprehensive SEO Audit & Strategy',
      'Targeting up to 25 Core Keywords',
      'PPC Campaign Setup & Monitoring',
      'Monthly Analytics & Performance Call',
    ],
    highlight: false,
  },
  {
    name: 'Scale Enterprise',
    price: '₹3,499',
    period: '/month',
    desc: 'Designed for scaling brands needing rapid multi-channel revenue expansion.',
    features: [
      'Full SEO + Paid Search & Meta Ads',
      'Custom React Web Design Refresh',
      'Dedicated Account Manager & Bi-Weekly Sync',
      'Advanced CRO & Funnel Optimization',
      'Custom KPI Dashboard & Lead Tracking',
    ],
    highlight: true,
  },
  {
    name: 'Custom Agency Tier',
    price: 'Custom',
    period: '',
    desc: 'Tailored digital solutions for enterprise & multi-location companies.',
    features: [
      'Omnichannel Execution (SEO, PPC, Social, PR)',
      'Custom Software & API Integrations',
      '24/7 Priority Support & Strategy Team',
      'Full Conversion Engineering',
    ],
    highlight: false,
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'SEO & CRO', 'Web Design', 'PPC & Paid Ads', 'Social Media', 'Reputation Management'];

  const filteredServices =
    activeTab === 'All'
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.category === activeTab);

  return (
    <div className="page-wrapper">
      {/* Page Hero Header */}
      <section className="page-hero-section">
        <span className="section-category-tag">OUR EXPERTISE</span>
        <h1 className="page-main-title">Full-Spectrum Digital Marketing Services</h1>
        <p className="page-hero-subtitle">
          We combine data-driven precision, award-winning web development, and creative advertising to scale your business predictably.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <section className="services-filter-section">
        <div className="filter-tabs-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeTab === cat ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="page-content-section">
        <div className="detailed-services-grid">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="detailed-service-card"
              style={{ backgroundColor: service.bg }}
            >
              <div className="card-top">
                <span className="service-category-badge">{service.category}</span>
                <h2 className="detailed-service-title">{service.title}</h2>
                <p className="detailed-service-desc">{service.desc}</p>
              </div>

              <div className="card-features-list">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="feature-item">
                    <CheckCircle2 className="feature-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="card-action-row">
                <a href="/contact" className="service-cta-btn">
                  <span>Get Started with {service.title.split(' ')[0]}</span>
                  <ArrowRight className="btn-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="process-section">
        <span className="section-category-tag">OUR METHODOLOGY</span>
        <h2 className="growth-title">How We Drive Measurable Results</h2>

        <div className="process-steps-grid">
          <div className="process-card">
            <span className="step-num">01</span>
            <h3 className="step-title">Discovery & Audit</h3>
            <p className="step-desc">
              We analyze your current digital presence, competitor landscape, and conversion funnels to pinpoint immediate growth opportunities.
            </p>
          </div>

          <div className="process-card">
            <span className="step-num">02</span>
            <h3 className="step-title">Strategy & Roadmap</h3>
            <p className="step-desc">
              Our specialists engineer a custom 90-day execution plan aligned directly with your revenue targets and customer lifetime value.
            </p>
          </div>

          <div className="process-card">
            <span className="step-num">03</span>
            <h3 className="step-title">Precision Execution</h3>
            <p className="step-desc">
              From high-converting ad creative to technical SEO and web development, we deploy high-impact assets seamlessly.
            </p>
          </div>

          <div className="process-card">
            <span className="step-num">04</span>
            <h3 className="step-title">Optimization & Scale</h3>
            <p className="step-desc">
              Continuous A/B testing and algorithmic tuning ensure your cost-per-acquisition decreases while lead volume accelerates.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="pricing-section">
        <span className="section-category-tag">TRANSPARENT INVESTMENT</span>
        <h2 className="growth-title">Simple, Results-Driven Pricing</h2>

        <div className="pricing-grid">
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`pricing-card ${pkg.highlight ? 'pricing-highlight' : ''}`}
            >
              {pkg.highlight && <span className="popular-badge">Most Popular</span>}
              <h3 className="pkg-name">{pkg.name}</h3>
              <div className="pkg-price-row">
                <span className="pkg-price">{pkg.price}</span>
                <span className="pkg-period">{pkg.period}</span>
              </div>
              <p className="pkg-desc">{pkg.desc}</p>

              <div className="pkg-features-list">
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} className="pkg-feature-item">
                    <CheckCircle2 className="pkg-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <a href="/contact" className={`pkg-btn ${pkg.highlight ? 'btn-dark' : 'btn-outline'}`}>
                Choose {pkg.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Component */}
      <CaseStudies />
    </div>
  );
}
