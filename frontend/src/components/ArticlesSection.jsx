import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import bluePodiumImg from '../assets/article_blue_podium.png';
import pinkPodiumImg from '../assets/article_pink_podium.png';
import greenPodiumImg from '../assets/article_green_podium.png';
import whitePodiumImg from '../assets/article_white_podium.png';

const ARTICLES = [
  {
    id: 1,
    title: 'What Is Digital PR and How Can It Impact My Business?',
    image: bluePodiumImg,
    category: 'Digital PR & Branding',
    readTime: '5 min read',
    summary: 'Digital PR is the strategic practice of securing editorial coverage, online brand mentions, and high-quality backlinks on tier-1 digital publications and news outlets to build authority, boost search engine rankings, and drive target customer acquisition.',
    impactStats: [
      { val: '+310%', label: 'Media Exposure' },
      { val: '+45', label: 'Domain Authority' },
      { val: '12.5x', label: 'Referral Traffic' }
    ],
    keyTakeaways: [
      {
        title: 'High-Quality Backlink Acquisition',
        desc: 'Earning organic do-follow links from authoritative media websites (Forbes, TechCrunch, Business Insider).'
      },
      {
        title: 'Executive Thought Leadership',
        desc: 'Positioning your business leaders as trusted industry experts for press commentary.'
      },
      {
        title: 'Search Engine Rank Elevation',
        desc: 'Boosting domain rating (DR) and overall organic keyword positions on search engines.'
      },
      {
        title: 'Direct Journalist & PR Outreach',
        desc: 'Building direct relationships with journalists, top bloggers, and podcast hosts.'
      }
    ]
  },
  {
    id: 2,
    title: '20 Key Advertising Trends To Watch in 2024',
    image: pinkPodiumImg,
    category: 'Paid Acquisition & Trends',
    readTime: '7 min read',
    summary: 'An in-depth intelligence report on emerging digital advertising tactics, AI dynamic creative optimization, zero-party data collection, and server-side tracking strategies to maximize campaign ROAS.',
    impactStats: [
      { val: '+220%', label: 'Ad Creative CTR' },
      { val: '-40%', label: 'CPA Reduction' },
      { val: '5.2x', label: 'Average ROAS' }
    ],
    keyTakeaways: [
      {
        title: 'AI Dynamic Creative Optimization (DCO)',
        desc: 'Automated visual and copy variations matched to micro-audience purchase intent.'
      },
      {
        title: 'Server-Side Conversions API (CAPI)',
        desc: 'Bypassing browser tracking blockers for 100% accurate conversion attribution.'
      },
      {
        title: 'Short-Form Video Ad Dominance',
        desc: 'High-converting TikTok, Instagram Reels, and YouTube Shorts ad creative templates.'
      },
      {
        title: 'Zero-Party Data Collection Funnels',
        desc: 'Utilizing interactive quizzes to gather privacy-compliant customer preferences.'
      }
    ]
  },
  {
    id: 3,
    title: 'Programmatic SEO: What Is It and Why Your Business',
    image: greenPodiumImg,
    category: 'Search Engine Optimization',
    readTime: '6 min read',
    summary: 'Programmatic SEO enables businesses to build hundreds or thousands of high-quality, database-driven landing pages targeting long-tail search keywords at scale without sacrificing page quality or UX.',
    impactStats: [
      { val: '10,000+', label: 'Keywords Ranked' },
      { val: '+450%', label: 'Organic Scale' },
      { val: '3.8x', label: 'Lead Velocity' }
    ],
    keyTakeaways: [
      {
        title: 'Scalable Page Generation',
        desc: 'Using structured data & dynamic templates to automatically publish targeted landing pages.'
      },
      {
        title: 'Long-Tail Keyword Capture',
        desc: 'Ranking for thousands of niche low-competition, high-intent search queries.'
      },
      {
        title: 'Sub-Second Page Performance',
        desc: 'Ensuring Core Web Vitals excellence across thousands of generated URLs.'
      },
      {
        title: 'Internal Link Mesh Architecture',
        desc: 'Automated contextual linking between related programmatic content pages.'
      }
    ]
  },
  {
    id: 4,
    title: 'Google Business Profile: A Local SEO Essential',
    image: whitePodiumImg,
    category: 'Local SEO & Map Dominance',
    readTime: '4 min read',
    summary: 'How optimizing your Google Business Profile (GBP) and local citations drives local customer calls, map directions, and high-converting foot traffic for multi-location and service businesses.',
    impactStats: [
      { val: '+280%', label: 'Map Views Lift' },
      { val: '+190%', label: 'Direct Calls' },
      { val: 'Top 3', label: 'Local Grid Rank' }
    ],
    keyTakeaways: [
      {
        title: 'Local Map Pack Top 3 Dominance',
        desc: 'Optimizing primary categories, attributes, and geo-targeted local keywords.'
      },
      {
        title: 'Automated 5-Star Review Engine',
        desc: 'Systematizing positive customer feedback requests via automated SMS and email hooks.'
      },
      {
        title: 'Google Post & Photo Updates',
        desc: 'Regular posting of business highlights, limited-time offers, and high-res imagery.'
      },
      {
        title: 'Local Citation Synchronization',
        desc: 'Syncing Name, Address, Phone (NAP) consistency across 50+ business directories.'
      }
    ]
  },
];

export default function ArticlesSection() {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  return (
    <section className="articles-section">
      {/* Hairline Divider & Top Category Tag */}
      <div className="articles-header-tag">
        <span className="section-category-tag">ARTICLE</span>
      </div>

      {/* Main Header Row */}
      <div className="articles-header-row">
        <h2 className="articles-title">Information about us</h2>
      </div>

      {/* 4-Column Articles Grid */}
      <div className="articles-grid">
        {ARTICLES.map((article) => (
          <div 
            key={article.id} 
            className="article-card"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedArticle(article)}
          >
            <div className="article-image-card">
              <img
                src={article.image}
                alt={article.title}
                className="article-img"
              />
            </div>
            <h3 className="article-card-title">{article.title}</h3>
            <button 
              className="article-learn-link"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedArticle(article);
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* ARTICLE DETAIL POPUP MODAL */}
      {/* ========================================================================= */}
      {selectedArticle && (
        <div className="service-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="service-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="service-modal-header">
              <div>
                <div className="service-modal-badge">
                  <BookOpen style={{ width: 14, height: 14 }} />
                  <span>{selectedArticle.category} • {selectedArticle.readTime}</span>
                </div>
                <h3 className="service-modal-title">{selectedArticle.title}</h3>
              </div>

              <button 
                className="growth-modal-close-btn"
                onClick={() => setSelectedArticle(null)}
                title="Close (Esc)"
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="service-modal-body">
              
              {/* Article Hero Banner Image */}
              <div className="article-hero-img-container">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="article-hero-img"
                />
              </div>

              {/* Article Summary */}
              <p className="service-modal-subtitle" style={{ marginBottom: '1.25rem', fontSize: '0.925rem', lineHeight: '1.6' }}>
                {selectedArticle.summary}
              </p>

              {/* Impact Metrics Row */}
              <div className="service-impact-box">
                {selectedArticle.impactStats.map((stat, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <div className="sm-divider" />}
                    <div className="sm-impact-item">
                      <span className="sm-impact-val">{stat.val}</span>
                      <span className="sm-impact-label">{stat.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Key Takeaways Section */}
              <h4 className="service-section-heading">
                <Layers style={{ width: 16, height: 16 }} />
                <span>Key Strategy Takeaways</span>
              </h4>

              <div className="service-features-list">
                {selectedArticle.keyTakeaways.map((item, idx) => (
                  <div key={idx} className="service-feature-card">
                    <h5 className="sm-feature-title">
                      <CheckCircle2 />
                      <span>{item.title}</span>
                    </h5>
                    <p className="sm-feature-desc">{item.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="service-modal-footer">
              <button 
                className="gm-footer-btn-secondary"
                onClick={() => setSelectedArticle(null)}
              >
                Close Article
              </button>

              <button 
                className="gm-footer-btn-primary"
                onClick={() => {
                  setSelectedArticle(null);
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
