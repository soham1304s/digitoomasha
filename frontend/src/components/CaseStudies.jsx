import React from 'react';

const CASE_STUDIES = [
  {
    id: 1,
    title: 'Multiple Location Orthodontic Practice',
    category: 'Conversion Rate Optimization (CRO)',
    metrics: [
      { value: '+226', label: 'Top 5 Rankings' },
      { value: '+122', label: 'Monthly Leads' },
    ],
  },
  {
    id: 2,
    title: 'Business factors that support development',
    category: 'SEO and Pay-Per-Click (PPC) Marketing',
    metrics: [
      { value: '+546', label: 'Conversion Rate' },
      { value: '+1,110', label: 'Live Chat' },
    ],
  },
  {
    id: 3,
    title: 'Highest quality images as well as 3D images',
    category: 'Amazon Advertising',
    metrics: [
      { value: '+350', label: 'Sales Volume' },
      { value: '+451', label: 'Unit Sales' },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section className="case-studies-section">
      <div className="case-studies-grid">
        {CASE_STUDIES.map((study) => (
          <div key={study.id} className="case-study-card">
            <div className="card-header-content">
              <h3 className="card-title">{study.title}</h3>
              <p className="card-category">{study.category}</p>
            </div>

            <div className="card-metrics-row">
              {study.metrics.map((metric, idx) => (
                <div key={idx} className="metric-box">
                  <div className="metric-value-group">
                    <span className="metric-number">{metric.value}</span>
                    <span className="metric-percent">%</span>
                  </div>
                  <span className="metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
