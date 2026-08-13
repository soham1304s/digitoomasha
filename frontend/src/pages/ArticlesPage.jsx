import React, { useState } from 'react';
import { Search, X, Calendar, Clock, User } from 'lucide-react';
import bluePodiumImg from '../assets/article_blue_podium.png';
import pinkPodiumImg from '../assets/article_pink_podium.png';
import greenPodiumImg from '../assets/article_green_podium.png';
import whitePodiumImg from '../assets/article_white_podium.png';

const ALL_ARTICLES = [
  {
    id: 1,
    category: 'Digital PR',
    title: 'What Is Digital PR and How Can It Impact My Business?',
    image: bluePodiumImg,
    readTime: '6 min read',
    date: 'August 2, 2024',
    author: 'Sarah Jenkins',
    excerpt: 'Discover how combining traditional public relations with modern link acquisition and digital media coverage can exponentially boost your organic search rankings.',
    content: `
      Digital PR is an online marketing strategy used by businesses to increase their online presence. Digital PR agencies network with journalists, bloggers and influencers and send online press releases to gain high-quality backlinks, social media mentions and improve Search Engine Optimization (SEO).

      Key benefits of Digital PR:
      1. Improved Search Engine Rankings: Backlinks from authoritative news sites signal trust to search engine algorithms.
      2. Increased Website Traffic: High-exposure press releases drive targeted referral traffic directly to landing pages.
      3. Brand Trust & Authority: Featuring on major industry publications instantly boosts brand credibility.
    `,
  },
  {
    id: 2,
    category: 'Advertising Trends',
    title: '20 Key Advertising Trends To Watch in 2024',
    image: pinkPodiumImg,
    readTime: '8 min read',
    date: 'July 28, 2024',
    author: 'Marcus Vance',
    excerpt: 'From AI-generated ad creatives to short-form video dominate algorithms, explore the top media buying trends transforming digital advertising.',
    content: `
      As digital advertising matures, consumer behavior is shifting towards authenticity and instant value. In 2024, performance marketing requires rapid creative iteration and multi-channel attribution.

      Top Trends:
      1. Generative AI Creative Testing: Testing 50+ ad variations per week using automated dynamic creative optimization.
      2. First-Party Data Acquisition: Building zero-party data funnels in response to browser cookie deprecation.
      3. Short-Form Video Mastery: Vertical 9:16 videos on Reels and TikTok outperforming traditional static banners by 3x.
    `,
  },
  {
    id: 3,
    category: 'Programmatic SEO',
    title: 'Programmatic SEO: What Is It and Why Your Business Needs It',
    image: greenPodiumImg,
    readTime: '10 min read',
    date: 'July 15, 2024',
    author: 'Elena Rostova',
    excerpt: 'Learn how to publish thousands of high-converting, database-driven landing pages targeting long-tail search intent systematically.',
    content: `
      Programmatic SEO (pSEO) is the practice of creating large scale, high-quality landing pages using structured databases and automated code templates.

      Why pSEO works:
      - Low Competition: Long-tail search phrases have lower keyword difficulty and higher conversion intent.
      - Scalability: Instead of writing 1,000 pages manually, a well-engineered database generates 1,000 pages in minutes.
      - User Relevance: Visitors land on pages exact-matched to their specific geographic location or product specifications.
    `,
  },
  {
    id: 4,
    category: 'Google Local SEO',
    title: 'Google Business Profile: A Local SEO Essential Guide',
    image: whitePodiumImg,
    readTime: '5 min read',
    date: 'June 30, 2024',
    author: 'David Chen',
    excerpt: 'Master local map pack rankings, customer review generation, and local citation building to capture high-converting local customer queries.',
    content: `
      For multi-location businesses and service providers, local map pack rankings generate up to 70% of inbound phone calls and directions requests.

      Step-by-Step Optimization:
      1. Claim & Verify Profile: Ensure NAP (Name, Address, Phone) consistency across all web directories.
      2. Review Acquisition System: Implement automated SMS/Email review requests post-service.
      3. Weekly GBP Posts & Photos: Publish weekly updates, photo uploads, and Q&A entries to keep profiles active.
    `,
  },
];

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Digital PR', 'Advertising Trends', 'Programmatic SEO', 'Google Local SEO'];

  const filteredArticles = ALL_ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      {/* Hero Header */}
      <section className="page-hero-section">
        <span className="section-category-tag">INSIGHTS & RESOURCES</span>
        <h1 className="page-main-title">Latest Digital Marketing Insights</h1>
        <p className="page-hero-subtitle">
          Expert guides, industry analyses, and growth strategies written by our senior media buyers and SEO strategists.
        </p>

        {/* Search Input Bar */}
        <div className="article-search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search articles by topic, keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              <X />
            </button>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="services-filter-section">
        <div className="filter-tabs-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'tab-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="page-content-section">
        <div className="articles-grid">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="article-card"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="article-image-card">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-img"
                />
              </div>

              <div className="article-meta-row">
                <span className="article-tag">{article.category}</span>
                <span className="article-readtime">{article.readTime}</span>
              </div>

              <h2 className="article-card-title">{article.title}</h2>
              <p className="article-excerpt-text">{article.excerpt}</p>

              <button className="article-learn-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
                Read Full Article →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Article Modal Reader */}
      {selectedArticle && (
        <div className="video-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div
            className="video-modal-content article-modal-body"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => setSelectedArticle(null)}
            >
              <X />
            </button>

            <div className="article-modal-scroll">
              <span className="section-category-tag">{selectedArticle.category}</span>
              <h1 className="article-modal-title">{selectedArticle.title}</h1>

              <div className="article-author-bar">
                <span><User className="meta-icon" /> {selectedArticle.author}</span>
                <span><Calendar className="meta-icon" /> {selectedArticle.date}</span>
                <span><Clock className="meta-icon" /> {selectedArticle.readTime}</span>
              </div>

              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="article-modal-banner-img"
              />

              <div className="article-full-content">
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
