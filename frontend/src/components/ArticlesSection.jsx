import React from 'react';
import bluePodiumImg from '../assets/article_blue_podium.png';
import pinkPodiumImg from '../assets/article_pink_podium.png';
import greenPodiumImg from '../assets/article_green_podium.png';
import whitePodiumImg from '../assets/article_white_podium.png';

const ARTICLES = [
  {
    id: 1,
    title: 'What Is Digital PR and How Can It Impact My Business?',
    image: bluePodiumImg,
  },
  {
    id: 2,
    title: '20 Key Advertising Trends To Watch in 2024',
    image: pinkPodiumImg,
  },
  {
    id: 3,
    title: 'Programmatic SEO: What Is It and Why Your Business',
    image: greenPodiumImg,
  },
  {
    id: 4,
    title: 'Google Business Profile: A Local SEO Essential',
    image: whitePodiumImg,
  },
];

export default function ArticlesSection() {
  return (
    <section className="articles-section">
      {/* Hairline Divider & Top Category Tag */}
      <div className="articles-header-tag">
        <span className="section-category-tag">ARTICLE</span>
      </div>

      {/* Main Header Row */}
      <div className="articles-header-row">
        <h2 className="articles-title">Information about us</h2>
        <button className="explore-more-btn">Explore More</button>
      </div>

      {/* 4-Column Articles Grid */}
      <div className="articles-grid">
        {ARTICLES.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-image-card">
              <img
                src={article.image}
                alt={article.title}
                className="article-img"
              />
            </div>
            <h3 className="article-card-title">{article.title}</h3>
            <a href="#read-more" className="article-learn-link">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
