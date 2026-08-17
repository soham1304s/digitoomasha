import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { apiFetch } from '../config/api';

const FAQS = [
  {
    q: 'How quickly can we expect results from digital marketing campaigns?',
    a: 'PPC and Paid Social ad campaigns can generate lead activity within 24-48 hours. SEO and organic growth strategies typically build substantial organic traffic gains within 60 to 90 days.',
  },
  {
    q: 'Do you offer custom contracts or long-term lock-ins?',
    a: 'We offer flexible month-to-month service agreements as well as 6 to 12 month growth contracts with volume discounts. We earn your business every month through performance.',
  },
  {
    q: 'What is included in the Free Digital Marketing Proposal?',
    a: 'Our team performs a 360-degree audit of your existing website, SEO health, competitor ad spending, and conversion rate bottlenecks, providing an actionable roadmap with zero obligation.',
  },
  {
    q: 'How do you measure and report ROI?',
    a: 'You receive access to a real-time analytics dashboard tracking leads, Cost Per Acquisition (CPA), Return On Ad Spend (ROAS), and organic search keyword rankings, coupled with bi-weekly strategy calls.',
  },
];

const WEB3FORMS_ACCESS_KEY = '8be60e60-b0eb-47ca-8b5f-dbd39057f730';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '₹5,000 - ₹10,000/mo',
    services: ['Search Engine Optimization (SEO)', 'PPC & Paid Search Ads'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleCheckboxChange = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const updated = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Submit directly to Web3Forms API
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          company: formData.company || 'N/A',
          budget: formData.budget,
          services: formData.services.length ? formData.services.join(', ') : 'None selected',
          message: formData.message || 'No specific project message provided.',
          subject: `New Free Proposal Request from ${formData.name}`,
          from_name: 'DigiToomasha Website',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Submission failed. Please try again.');
      }

      // 2. Also log to internal backend API in parallel for admin dashboard telemetry
      try {
        await apiFetch('/inquiries', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      } catch (backendErr) {
        console.warn('Backend inquiry log fallback:', backendErr);
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      setErrorMessage('Network error occurred. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Hero Header */}
      <section className="page-hero-section">
        <span className="section-category-tag">GET IN TOUCH</span>
        <h1 className="page-main-title">Let's Talk — Claim Your Free Proposal</h1>
        <p className="page-hero-subtitle">
          Ready to scale your business? Tell us about your goals, and our senior strategists will build a custom ROI-focused growth plan.
        </p>
      </section>

      {/* Main Form & Info Grid */}
      <section className="page-content-section">
        <div className="contact-main-grid">
          {/* Left Form Column */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-box">
                <CheckCircle2 className="success-icon" />
                <h3 className="success-title">Proposal Request Received!</h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been sent to our team via Web3Forms. Our lead digital strategist will review your requirements and get back to you within 24 business hours at <strong>{formData.email}</strong>.
                </p>
                <button
                  className="cta-get-started-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      budget: '₹5,000 - ₹10,000/mo',
                      services: ['Search Engine Optimization (SEO)', 'PPC & Paid Search Ads'],
                      message: '',
                    });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {errorMessage && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#991b1b',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company / Website</label>
                    <input
                      type="text"
                      placeholder="www.yourcompany.com"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Services Selection Checkboxes */}
                <div className="form-group">
                  <label className="form-label">Services Required</label>
                  <div className="services-checkbox-grid">
                    {['Search Engine Optimization (SEO)', 'PPC & Paid Search Ads', 'Custom Web Design & React App', 'Social Media Marketing', 'Reputation Management', 'Conversion Rate Optimization'].map((svc) => (
                      <label key={svc} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(svc)}
                          onChange={() => handleCheckboxChange(svc)}
                        />
                        <span>{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Monthly Budget Selector */}
                <div className="form-group">
                  <label className="form-label">Monthly Marketing Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="form-select"
                  >
                    <option>₹2,500 - ₹5,000/mo</option>
                    <option>₹5,000 - ₹10,000/mo</option>
                    <option>₹10,000 - ₹25,000/mo</option>
                    <option>₹25,000+/mo</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">Project Details & Growth Goals</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your target revenue goals, current marketing challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-proposal-btn"
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="send-icon spinner-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      <span>Sending Proposal...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Free Proposal Request</span>
                      <Send className="send-icon" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Office & Info Column */}
          <div className="contact-info-col">
            <div className="info-card">
              <h3 className="info-card-title">Global Headquarters</h3>

              <div className="contact-item">
                <MapPin className="info-icon" />
                <div>
                  <strong>New York Studio</strong>
                  <p>350 Fifth Avenue, Floor 42, New York, NY 10118</p>
                </div>
              </div>

              <div className="contact-item">
                <Mail className="info-icon" />
                <div>
                  <strong>Direct Email</strong>
                  <p>hello@digitoomasha.com</p>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="info-icon" />
                <div>
                  <strong>Phone Support</strong>
                  <p>+1 (800) 247-9099 (Mon - Fri, 9am - 6pm EST)</p>
                </div>
              </div>
            </div>

            <div className="info-card highlight-card">
              <h4 className="info-card-title">Global Office Hubs</h4>
              <ul className="hubs-list">
                <li><MapPin className="hub-pin-icon" /> <strong>London, UK:</strong> 10 Gresham Street, EC2V 7JD</li>
                <li><MapPin className="hub-pin-icon" /> <strong>Singapore:</strong> 1 Marina Boulevard, #28-00</li>
                <li><MapPin className="hub-pin-icon" /> <strong>Sydney, AU:</strong> 100 Barangaroo Avenue, NSW 2000</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section">
        <span className="section-category-tag">FREQUENTLY ASKED QUESTIONS</span>
        <h2 className="growth-title">Everything You Need To Know</h2>

        <div className="faq-accordion">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? 'faq-open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            >
              <div className="faq-question-row">
                <h3 className="faq-question">{faq.q}</h3>
                <ChevronDown className="faq-chevron" />
              </div>
              {openFaq === idx && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
