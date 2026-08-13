import React from 'react';
import DrivingGrowth from '../components/DrivingGrowth';
import VideoShowcase from '../components/VideoShowcase';
import { Target, Award, Users, TrendingUp } from 'lucide-react';

const STATS = [
  { value: '₹140M+', label: 'Client Revenue Generated' },
  { value: '98.4%', label: 'Client Retention Rate' },
  { value: '45+', label: 'Digital Specialists' },
  { value: '12 Years', label: 'Market Leadership' },
];

const VALUES = [
  {
    icon: Target,
    title: 'Data-Driven Precision',
    desc: 'Every marketing dollar spent is backed by algorithmic analysis, keyword intent research, and strict ROI tracking.',
  },
  {
    icon: Award,
    title: 'Uncompromised Quality',
    desc: 'We do not build generic templates. We craft high-converting, modern digital experiences customized to your brand ethos.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    desc: 'We operate as an extension of your in-house team with complete transparency, weekly reports, and direct Slack communication.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Growth',
    desc: 'Our strategies are built to scale predictably as your business grows from regional market leader to international enterprise.',
  },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Header */}
      <section className="page-hero-section">
        <span className="section-category-tag">ABOUT DIGITOOMASHA</span>
        <h1 className="page-main-title">Driving Business Growth Worldwide</h1>
        <p className="page-hero-subtitle">
          We are a full-service digital marketing agency dedicated to empowering businesses with state-of-the-art search, design, and paid media strategies.
        </p>
      </section>

      {/* Stats Counter Bar */}
      <section className="stats-bar-section">
        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-box">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Driving Growth Narrative Component */}
      <DrivingGrowth />

      {/* Video Showcase Feature */}
      <VideoShowcase />

      {/* Values Section */}
      <section className="values-section">
        <span className="section-category-tag">OUR CORE PRINCIPLES</span>
        <h2 className="growth-title">Built on Transparency & Performance</h2>

        <div className="values-grid">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="value-card">
                <div className="value-icon-box">
                  <Icon className="val-icon" />
                </div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
