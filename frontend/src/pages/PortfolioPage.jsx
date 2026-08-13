import React, { useState } from 'react';
import iunikImg from '../assets/portfolio_iunik.png';
import waterbankImg from '../assets/portfolio_waterbank.png';
import onetwofreeImg from '../assets/portfolio_onetwofree.png';
import heartleafImg from '../assets/portfolio_heartleaf.png';
import luminereImg from '../assets/portfolio_luminere.png';
import auraImg from '../assets/portfolio_aura.png';

const PORTFOLIO_ALL = [
  {
    id: 'iunik',
    title: 'IUNIK',
    image: iunikImg,
    tags: ['Marketing', 'SEO'],
    impact: '+226% Organic Conversions',
    desc: 'Complete search engine optimization and influencer marketing campaign for luxury serum line.',
  },
  {
    id: 'waterbank',
    title: 'Water Bank',
    image: waterbankImg,
    tags: ['PPC', 'SEO'],
    impact: '+546% PPC ROAS Increase',
    desc: 'Targeted Google Shopping & Search campaign coupled with technical landing page speed optimization.',
  },
  {
    id: 'onetwofree',
    title: 'One Two Free',
    image: onetwofreeImg,
    tags: ['Social Media', 'Marketing'],
    impact: '+451% Monthly Unit Sales',
    desc: 'Meta ad creatives and viral Instagram reels campaign resulting in sold-out product launches.',
  },
  {
    id: 'heartleaf',
    title: 'Heartleaf 88',
    image: heartleafImg,
    tags: ['Marketing', 'PPC'],
    impact: '+350% Sales Volume Growth',
    desc: 'Amazon Advertising and Google Search acquisition strategy for botanical skincare brand.',
  },
  {
    id: 'luminere',
    title: 'Lumière D\'or',
    image: luminereImg,
    tags: ['Marketing', 'SEO'],
    impact: '+180% High Ticket Revenue',
    desc: 'Omnichannel brand positioning, premium Google Search rankings, and high-ticket customer funnel.',
  },
  {
    id: 'aura',
    title: 'Aura Skin',
    image: auraImg,
    tags: ['Social Media', 'SEO'],
    impact: '+310% Repeat Customer Retention',
    desc: 'Minimalist brand redesign and automated customer lifecycle marketing campaign.',
  },
];

export default function PortfolioPage() {
  const [selectedTag, setSelectedTag] = useState('All');

  const filterTags = ['All', 'Marketing', 'PPC', 'SEO', 'Social Media'];

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
          Explore how we partner with forward-thinking brands to build recognition, drive sales volume, and outpace market competitors.
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
