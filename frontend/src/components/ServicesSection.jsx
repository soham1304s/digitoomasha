import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Search Engine Optimization (SEO)',
    description: 'Through careful keyword research and white hat SEO practices..',
    bg: '#ecf3f6',
    gridArea: '1 / 1 / 2 / 2',
  },
  {
    id: 2,
    title: 'Custom Website Design',
    description: "Capture your target audiences' attention with a professional custom web design...",
    bg: '#edf5f1',
    gridArea: '1 / 2 / 2 / 3',
  },
  {
    id: 3,
    title: 'Web Design & Development',
    description: 'Thrive builds custom, mobile-ready and search engine optimized websites...',
    bg: '#f8fafc',
    gridArea: '1 / 4 / 2 / 5',
  },
  {
    id: 4,
    title: 'Social Media Marketing',
    description: 'Ready to expand and market to your audiences on social media?',
    bg: '#f8fafc',
    gridArea: '2 / 1 / 3 / 2',
  },
  {
    id: 5,
    title: 'Pay Per Click (PPC) Management',
    description: 'Reach your customers quickly and with precision with a data-driven PPC campaign.',
    bg: '#f7ece5',
    gridArea: '2 / 3 / 3 / 4',
  },
  {
    id: 6,
    title: 'Online Reputation Management',
    description: 'Your reviews and online reputation can make or break your success online.',
    bg: '#fbf5e2',
    gridArea: '2 / 4 / 3 / 5',
  },
];

export default function ServicesSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev < 1 ? prev + 1 : 1));
  };

  return (
    <section className="services-section">
      {/* Hairline Divider & Top Category Tag */}
      <div className="services-header-tag">
        <span className="section-category-tag">DIGITAL MARKETING SERVICES</span>
      </div>

      {/* Header Row: Title & Slider Controls */}
      <div className="services-header-row">
        <h2 className="services-title">Building brand recognition</h2>

        <div className="slider-controls">
          <button
            className={`slider-arrow-btn ${slideIndex === 0 ? 'btn-disabled' : ''}`}
            onClick={handlePrev}
            aria-label="Previous Services"
          >
            <ArrowLeft className="arrow-svg" />
          </button>
          <button
            className={`slider-arrow-btn ${slideIndex === 1 ? 'btn-disabled' : ''}`}
            onClick={handleNext}
            aria-label="Next Services"
          >
            <ArrowRight className="arrow-svg" />
          </button>
        </div>
      </div>

      {/* Staggered Services Grid */}
      <div className="services-grid-wrapper">
        <div
          className="services-staggered-grid"
          style={{
            transform: `translateX(-${slideIndex * 25}%)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="service-card"
              style={{
                backgroundColor: service.bg,
                gridArea: service.gridArea,
              }}
            >
              <div className="service-card-body">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </div>

              <div className="service-card-footer">
                <a href="#learn-more" className="service-learn-link">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Growth CTA Banner */}
      <div className="growth-cta-banner">
        <h2 className="cta-banner-title">
          <span>Grow Your Client Base With</span>
          <span>Data-Driven and Targeted</span>
          <span>Strategies</span>
        </h2>

        <button className="cta-get-started-btn">Get Started</button>
      </div>
    </section>
  );
}
