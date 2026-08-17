import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Search Engine Optimization (SEO)',
    description: 'Through careful keyword research and white hat SEO practices..',
    bg: '#ecf3f6',
    gridArea: '1 / 1 / 2 / 2',
    category: 'Search & Visibility',
    tagline: 'Dominate organic search engine rankings and attract high-intent buyer traffic.',
    impactStats: [
      { val: '+250%', label: 'Organic Search Growth' },
      { val: '4.2x', label: 'Inbound Lead Lift' },
      { val: 'Top 3', label: 'Map Pack Placement' }
    ],
    features: [
      {
        title: 'Keyword Research & Intent Mapping',
        desc: 'In-depth analysis targeting high-value commercial search queries.'
      },
      {
        title: 'On-Page & Technical Optimization',
        desc: 'Page speed enhancements, schema markup, and mobile UX refinement.'
      },
      {
        title: 'High-Authority Backlink Outreach',
        desc: 'White-hat digital PR press releases and context-rich backlink acquisition.'
      },
      {
        title: 'Google Local Map Pack Dominance',
        desc: 'Google Business Profile optimization and automated local citation syncing.'
      }
    ]
  },
  {
    id: 2,
    title: 'Custom Website Design',
    description: "Capture your target audiences' attention with a professional custom web design...",
    bg: '#edf5f1',
    gridArea: '1 / 2 / 2 / 3',
    category: 'UI/UX & Branding',
    tagline: 'Bespoke, high-converting website design tailored to elevate your brand identity.',
    impactStats: [
      { val: '+65%', label: 'User Engagement' },
      { val: '+40%', label: 'Conversion Velocity' },
      { val: '100%', label: 'Custom Figma Design' }
    ],
    features: [
      {
        title: 'Conversion-Focused UX Wireframes',
        desc: 'Strategic layout architecture designed to guide visitors directly to CTAs.'
      },
      {
        title: 'Responsive & Mobile-First Interface',
        desc: 'Pixel-perfect rendering across desktop, tablet, and smartphone screens.'
      },
      {
        title: 'Brand Identity & Visual Storytelling',
        desc: 'Tailored typography, curated color palettes, and micro-animations.'
      },
      {
        title: 'Frictionless Interactive Funnels',
        desc: 'Custom lead capture forms and interactive user onboarding pathways.'
      }
    ]
  },
  {
    id: 3,
    title: 'Web Design & Development',
    description: 'Thrive builds custom, mobile-ready and search engine optimized websites...',
    bg: '#f8fafc',
    gridArea: '1 / 4 / 2 / 5',
    category: 'Full-Stack Development',
    tagline: 'Fast, secure, and search-engine optimized full-stack web application development.',
    impactStats: [
      { val: '< 1.2s', label: 'Avg Page Load Time' },
      { val: '99.9%', label: 'Server Uptime SLA' },
      { val: '100/100', label: 'Core Web Vitals Score' }
    ],
    features: [
      {
        title: 'Modern React & Vite Framework',
        desc: 'Built with modular component architecture for lightning-fast speeds.'
      },
      {
        title: 'E-Commerce & Client Portals',
        desc: 'Seamless payment gateway integrations and secure user management.'
      },
      {
        title: 'SEO & Meta Schema Built-In',
        desc: 'Automated meta tags, dynamic sitemaps, and social share previews.'
      },
      {
        title: 'Enterprise Cloud Security',
        desc: 'SSL encryption, automated daily backups, and DDoS protection.'
      }
    ]
  },
  {
    id: 4,
    title: 'Social Media Marketing',
    description: 'Ready to expand and market to your audiences on social media?',
    bg: '#f8fafc',
    gridArea: '2 / 1 / 3 / 2',
    category: 'Social & Brand Amplification',
    tagline: 'Build brand affinity and engage your ideal audience across social channels.',
    impactStats: [
      { val: '+180%', label: 'Social Engagement' },
      { val: '3.5x', label: 'Impression Velocity' },
      { val: '24/7', label: 'Community Nurturing' }
    ],
    features: [
      {
        title: 'Creative Content Production',
        desc: 'High-performing video reels, static graphics, and copy for Instagram & LinkedIn.'
      },
      {
        title: 'Audience Targeting & Nurturing',
        desc: 'Direct interaction with potential clients to convert followers into leads.'
      },
      {
        title: 'Influencer & Creator PR',
        desc: 'Strategic partnerships with industry creators for authentic brand endorsement.'
      },
      {
        title: 'Performance Analytics Dashboard',
        desc: 'Transparent weekly metrics tracking reach, engagement, and follower growth.'
      }
    ]
  },
  {
    id: 5,
    title: 'Pay Per Click (PPC) Management',
    description: 'Reach your customers quickly and with precision with a data-driven PPC campaign.',
    bg: '#f7ece5',
    gridArea: '2 / 3 / 3 / 4',
    category: 'Paid Acquisition & PPC',
    tagline: 'Drive instant targeted traffic and predictable customer acquisition with max ROAS.',
    impactStats: [
      { val: '4.8x', label: 'Average Campaign ROAS' },
      { val: '-35%', label: 'CPA Reduction' },
      { val: 'Instant', label: 'Targeted Traffic' }
    ],
    features: [
      {
        title: 'Google Search & Shopping Ads',
        desc: 'Capture high-intent buyers searching directly for your products or services.'
      },
      {
        title: 'Meta & Retargeting Campaigns',
        desc: 'Engage prospective buyers across Facebook and Instagram with high-converting ads.'
      },
      {
        title: 'A/B Ad Creative Testing',
        desc: 'Continuous AI testing of ad hooks, visuals, and copy variations.'
      },
      {
        title: 'Strict CPA Ceiling Control',
        desc: 'Algorithmic bid adjustments ensuring optimal spend efficiency.'
      }
    ]
  },
  {
    id: 6,
    title: 'Online Reputation Management',
    description: 'Your reviews and online reputation can make or break your success online.',
    bg: '#fbf5e2',
    gridArea: '2 / 4 / 3 / 5',
    category: 'Brand Trust & ORM',
    tagline: 'Protect, monitor, and build an untouchable 5-star online customer reputation.',
    impactStats: [
      { val: '4.8+', label: 'Average Rating Lift' },
      { val: '+85%', label: 'Trust Conversion Lift' },
      { val: 'Real-Time', label: 'Mention Monitoring' }
    ],
    features: [
      {
        title: 'Automated 5-Star Review Engine',
        desc: 'Smart SMS and email workflows requesting feedback from happy clients.'
      },
      {
        title: 'Negative Feedback Mitigation',
        desc: 'Professional resolution protocols to manage customer grievances smoothly.'
      },
      {
        title: 'Multi-Platform Brand Monitoring',
        desc: 'Instant alerts for company mentions on Google, Trustpilot, and social media.'
      },
      {
        title: 'Crisis Management Protocols',
        desc: 'Rapid PR strategies to safeguard your business brand standing.'
      }
    ]
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev < 1 ? prev + 1 : 1));
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedService) {
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

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
                cursor: 'pointer',
              }}
              onClick={() => setSelectedService(service)}
            >
              <div className="service-card-body">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </div>

              <div className="service-card-footer">
                <button 
                  className="service-learn-link"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                  }}
                >
                  Learn More
                </button>
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

        <button 
          className="cta-get-started-btn"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SERVICE DETAIL POPUP MODAL */}
      {/* ========================================================================= */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="service-modal-header">
              <div>
                <div className="service-modal-badge">
                  <Sparkles style={{ width: 14, height: 14 }} />
                  <span>{selectedService.category}</span>
                </div>
                <h3 className="service-modal-title">{selectedService.title}</h3>
                <p className="service-modal-subtitle">{selectedService.tagline}</p>
              </div>

              <button 
                className="growth-modal-close-btn"
                onClick={() => setSelectedService(null)}
                title="Close (Esc)"
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="service-modal-body">
              
              {/* Impact Metrics Row */}
              <div className="service-impact-box">
                {selectedService.impactStats.map((stat, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <div className="sm-divider" />}
                    <div className="sm-impact-item">
                      <span className="sm-impact-val">{stat.val}</span>
                      <span className="sm-impact-label">{stat.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Deliverables Section */}
              <h4 className="service-section-heading">
                <Layers style={{ width: 16, height: 16 }} />
                <span>Key Deliverables & Scope</span>
              </h4>

              <div className="service-features-list">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="service-feature-card">
                    <h5 className="sm-feature-title">
                      <CheckCircle2 />
                      <span>{feat.title}</span>
                    </h5>
                    <p className="sm-feature-desc">{feat.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="service-modal-footer">
              <button 
                className="gm-footer-btn-secondary"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>

              <button 
                className="gm-footer-btn-primary"
                onClick={() => {
                  setSelectedService(null);
                  navigate('/login');
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
