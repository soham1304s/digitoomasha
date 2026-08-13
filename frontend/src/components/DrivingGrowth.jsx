import React from 'react';
import growthChartImg from '../assets/driving_growth_chart.png';

export default function DrivingGrowth() {
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
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="growth-image-col">
          <div className="growth-image-card">
            <img
              src={growthChartImg}
              alt="Driving business growth chart analysis"
              className="growth-chart-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
