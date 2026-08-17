import React, { useState } from 'react';
import fintechAppImg from '../assets/project_fintech_app.png';
import telehealthWebappImg from '../assets/project_telehealth_webapp.png';
import tradingPlatformImg from '../assets/project_trading_platform.png';
import ecommerceHeadlessImg from '../assets/project_ecommerce_headless.png';
import saasDashboardImg from '../assets/project_saas_dashboard.png';
import mobilityAppImg from '../assets/project_mobility_app.png';

const PORTFOLIO_ALL = [
  {
    id: 'nexus-pay',
    title: 'Nexus Pay - Fintech Mobile App',
    image: fintechAppImg,
    tags: ['Mobile App', 'Marketing', 'PPC'],
    impact: '1.2M+ App Downloads',
    desc: 'Full-stack iOS/Android fintech application, high-converting onboarding web funnel, and targeted user acquisition campaign.',
  },
  {
    id: 'pulse-health',
    title: 'Pulse Health - Telehealth Web Platform',
    image: telehealthWebappImg,
    tags: ['Web App', 'SEO', 'Marketing'],
    impact: '+480% Patient Consults',
    desc: 'HIPAA-compliant React web portal, programmatic search engine strategy, and automated patient booking pipeline.',
  },
  {
    id: 'apex-trading',
    title: 'Apex Trading - Crypto & Algorithmic Platform',
    image: tradingPlatformImg,
    tags: ['Web App', 'SEO', 'PPC'],
    impact: '5.8x Campaign ROAS Yield',
    desc: 'Real-time web & desktop trading interface, high-intent Google PPC search ads, and global digital PR distribution.',
  },
  {
    id: 'nova-commerce',
    title: 'NovaCommerce - Headless E-Commerce',
    image: ecommerceHeadlessImg,
    tags: ['Web App', 'Marketing', 'SEO'],
    impact: '+340% Mobile Conversion Rate',
    desc: 'Next.js headless storefront, sub-second checkout performance, and automated customer retention workflows.',
  },
  {
    id: 'omniflow-saas',
    title: 'OmniFlow - AI SaaS Analytics Dashboard',
    image: saasDashboardImg,
    tags: ['Web App', 'PPC', 'Marketing'],
    impact: '+620% Monthly Recurring Revenue',
    desc: 'High-converting B2B SaaS landing pages, Meta & LinkedIn video ad campaigns, and interactive onboarding product tour.',
  },
  {
    id: 'urbanride-app',
    title: 'UrbanRide - EV Fleet & Ride App',
    image: mobilityAppImg,
    tags: ['Mobile App', 'PPC', 'Social Media'],
    impact: '+250,000 Active Monthly Users',
    desc: 'Cross-platform rider app, geo-targeted hyper-local ads, and viral social media influencer partnership campaign.',
  },
];

export default function PortfolioPage() {
  const [selectedTag, setSelectedTag] = useState('All');

  const filterTags = ['All', 'Marketing', 'PPC', 'SEO', 'Web App', 'Mobile App'];

  const filteredItems =
    selectedTag === 'All'
      ? PORTFOLIO_ALL
      : PORTFOLIO_ALL.filter((item) => item.tags.includes(selectedTag));

  return (
    <div className="page-wrapper">
      {/* Page Hero Header */}
      <section className="page-hero-section">
        <span className="section-category-tag">CLIENT CASE STUDIES</span>
        <h1 className="page-main-title">Client Success Stories & Featured Work</h1>
        <p className="page-hero-subtitle">
          Explore how we partner with forward-thinking tech, digital marketing, web & app brands to build recognition, drive sales volume, and outpace market competitors.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="services-filter-section">
        <div className="filter-tabs-bar">
          {filterTags.map((tag) => (
            <button
              key={tag}
              className={`filter-tab-btn ${selectedTag === tag ? 'tab-active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Expanded Portfolio Grid */}
      <section className="page-content-section">
        <div className="portfolio-grid-expanded">
          {filteredItems.map((item) => (
            <div key={item.id} className="portfolio-expanded-card">
              <div className="portfolio-image-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="portfolio-img"
                />
              </div>

              <div className="portfolio-expanded-meta">
                <div className="title-tags-row">
                  <h2 className="portfolio-title">{item.title}</h2>
                  <div className="portfolio-tags">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="portfolio-pill-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="impact-highlight-badge">{item.impact}</div>
                <p className="portfolio-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
