import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Globe,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Check,
  Zap,
  ShieldCheck,
  BarChart3,
  Users,
  DollarSign,
  FastForward,
  ChevronDown
} from 'lucide-react';

const COUNTRY_DIAL_CODES = [
  { country: 'India', code: '+91', flag: '🇮🇳', label: '🇮🇳 +91' },
  { country: 'United States', code: '+1', flag: '🇺🇸', label: '🇺🇸 +1' },
  { country: 'United Kingdom', code: '+44', flag: '🇬🇧', label: '🇬🇧 +44' },
  { country: 'Canada', code: '+1', flag: '🇨🇦', label: '🇨🇦 +1' },
  { country: 'Australia', code: '+61', flag: '🇦🇺', label: '🇦🇺 +61' },
  { country: 'Germany', code: '+49', flag: '🇩🇪', label: '🇩🇪 +49' },
  { country: 'Singapore', code: '+65', flag: '🇸🇬', label: '🇸🇬 +65' },
  { country: 'UAE', code: '+971', flag: '🇦🇪', label: '🇦🇪 +971' },
  { country: 'Saudi Arabia', code: '+966', flag: '🇸🇦', label: '🇸🇦 +966' },
  { country: 'Bangladesh', code: '+880', flag: '🇧🇩', label: '🇧🇩 +880' },
];

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState('next');
  const [loading, setLoading] = useState(false);

  // Phone Country Code State
  const [selectedDialCode, setSelectedDialCode] = useState('+91');

  // Form State
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    country: 'India',
    city: '',
    // Business Info
    businessName: '',
    businessWebsite: '',
    businessCategory: 'E-commerce & Retail',
    industry: 'Consumer Goods',
    employeesCount: '11-50 employees',
    monthlyBudget: '₹5,000 - ₹10,000/mo',
    businessGoals: ['SEO Optimization', 'Lead Generation'],
    // Security
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const handleDialCodeChange = (newCode) => {
    setSelectedDialCode(newCode);
    const matchedCountry = COUNTRY_DIAL_CODES.find((c) => c.code === newCode);
    if (matchedCountry) {
      setFormData((prev) => ({ ...prev, country: matchedCountry.country }));
    }
  };

  const handleGoalToggle = (goal) => {
    setFormData((prev) => {
      const exists = prev.businessGoals.includes(goal);
      const updated = exists
        ? prev.businessGoals.filter((g) => g !== goal)
        : [...prev.businessGoals, goal];
      return { ...prev, businessGoals: updated };
    });
  };

  const getFullPhoneNumber = () => {
    const raw = (formData.phone || '').trim();
    if (!raw) return '';
    if (raw.startsWith('+')) return raw;
    return `${selectedDialCode} ${raw}`;
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setErrorMsg('Please complete all required fields (Full Name, Email, Phone).');
        return;
      }
    }

    setErrorMsg('');
    setSlideDirection('next');
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleStepperClick = (targetStep) => {
    if (targetStep === currentStep) return;
    if (targetStep > currentStep && currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setErrorMsg('Please complete all required fields (Full Name, Email, Phone).');
        return;
      }
    }
    setErrorMsg('');
    setSlideDirection(targetStep > currentStep ? 'next' : 'prev');
    setCurrentStep(targetStep);
  };

  const skipToStep3 = () => {
    setErrorMsg('');
    setSlideDirection('next');
    if (!formData.businessName) {
      setFormData((prev) => ({
        ...prev,
        businessName: prev.companyName || (prev.fullName ? `${prev.fullName}'s Business` : 'Client Business'),
      }));
    }
    setCurrentStep(3);
  };

  const goToPrevStep = () => {
    setErrorMsg('');
    setSlideDirection('prev');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.password || !formData.confirmPassword) {
      setErrorMsg('Please create and confirm your password.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('Please accept the Terms & Privacy Policy.');
      return;
    }

    setLoading(true);
    const fullPhone = getFullPhoneNumber();
    const res = await signup(
      formData.fullName,
      formData.email,
      formData.password,
      { ...formData, phone: fullPhone }
    );
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    if (res.user && res.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page-grid">
        {/* Left Form Card Column */}
        <div className="auth-card-side">
          <div className="auth-page-card multi-step-card">
            {/* Header Badge & Title */}
            <div className="auth-header-top-row">
              <div>
                <div className="auth-brand-badge">Client Onboarding Wizard</div>
                <h1 className="auth-page-title">
                  {currentStep === 1 && 'Basic Information'}
                  {currentStep === 2 && 'Business Details'}
                  {currentStep === 3 && 'Account Security'}
                </h1>
              </div>

              {currentStep === 2 && (
                <button type="button" className="top-skip-badge-btn" onClick={skipToStep3}>
                  <span>Skip step</span>
                  <FastForward className="top-skip-icon" />
                </button>
              )}
            </div>

            <p className="auth-page-subtitle">
              {currentStep === 1 && 'Step 1 of 3 — Enter your personal and contact details.'}
              {currentStep === 2 && 'Step 2 of 3 — Tell us about your company and marketing goals (Optional).'}
              {currentStep === 3 && 'Step 3 of 3 — Set your password and finalize registration.'}
            </p>

            {/* Stepper Progress Indicator */}
            <div className="stepper-bar">
              <div
                className={`stepper-item ${currentStep >= 1 ? 'step-active' : ''}`}
                onClick={() => handleStepperClick(1)}
              >
                <div className="step-circle">{currentStep > 1 ? <Check className="check-icon" /> : '1'}</div>
                <span className="step-label">Basic Info</span>
              </div>
              <div className="stepper-line-connector" />
              <div
                className={`stepper-item ${currentStep >= 2 ? 'step-active' : ''}`}
                onClick={() => handleStepperClick(2)}
              >
                <div className="step-circle">{currentStep > 2 ? <Check className="check-icon" /> : '2'}</div>
                <span className="step-label">Business</span>
              </div>
              <div className="stepper-line-connector" />
              <div
                className={`stepper-item ${currentStep >= 3 ? 'step-active' : ''}`}
                onClick={() => handleStepperClick(3)}
              >
                <div className="step-circle">3</div>
                <span className="step-label">Security</span>
              </div>
            </div>

            {errorMsg && <div className="auth-error-alert">{errorMsg}</div>}

            {/* Multi-Step Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <div className={`step-slide-container ${slideDirection === 'next' ? 'slide-in-right' : 'slide-in-left'}`}>
                  {/* Social Registration Shortcut */}
                  <div className="auth-social-row" style={{ marginBottom: '1.25rem' }}>
                    <button type="button" className="social-auth-btn">
                      Google Sign In
                    </button>
                    <button type="button" className="social-auth-btn">
                      LinkedIn Sign In
                    </button>
                  </div>

                  <div className="auth-divider" style={{ margin: '0 0 1.25rem 0' }}>
                    <span>OR FILL DETAILS MANUALLY</span>
                  </div>

                  <div className="form-row-2">
                    <div className="auth-input-group">
                      <label className="auth-label">Full Name *</label>
                      <div className="auth-input-wrapper">
                        <User className="input-icon" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Email Address (required) *</label>
                      <div className="auth-input-wrapper">
                        <Mail className="input-icon" />
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone Input with Country Code Selector */}
                  <div className="form-row-2">
                    <div className="auth-input-group">
                      <label className="auth-label">Phone Number (required) *</label>
                      
                      <div className="phone-split-input-row">
                        {/* Country Code Select Dropdown Pill */}
                        <div className="country-code-pill">
                          <select
                            value={selectedDialCode}
                            onChange={(e) => handleDialCodeChange(e.target.value)}
                            className="country-code-select-inline"
                          >
                            {COUNTRY_DIAL_CODES.map((c) => (
                              <option key={`${c.country}-${c.code}`} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="select-chevron-icon" />
                        </div>

                        {/* Phone Number Input Field */}
                        <div className="auth-input-wrapper phone-text-wrapper">
                          <Phone className="input-icon" />
                          <input
                            type="tel"
                            required
                            placeholder="98765 43210"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="auth-input phone-number-input-clean"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Company Name (optional)</label>
                      <div className="auth-input-wrapper">
                        <Building2 className="input-icon" />
                        <input
                          type="text"
                          placeholder="e.g. Lumiere Skincare"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row-2" style={{ marginTop: '0.75rem' }}>
                    <div className="auth-input-group">
                      <label className="auth-label">Job Title (optional)</label>
                      <div className="auth-input-wrapper">
                        <Briefcase className="input-icon" />
                        <input
                          type="text"
                          placeholder="e.g. Marketing Director"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Country</label>
                      <div className="auth-input-wrapper">
                        <Globe className="input-icon" />
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="auth-input"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Australia</option>
                          <option>Germany</option>
                          <option>Singapore</option>
                          <option>UAE</option>
                          <option>Saudi Arabia</option>
                          <option>Bangladesh</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">City</label>
                    <div className="auth-input-wrapper">
                      <MapPin className="input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. Mumbai / New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Business Information */}
              {currentStep === 2 && (
                <div className={`step-slide-container ${slideDirection === 'next' ? 'slide-in-right' : 'slide-in-left'}`}>
                  <div className="form-row-2">
                    <div className="auth-input-group">
                      <label className="auth-label">Business Name (Optional)</label>
                      <div className="auth-input-wrapper">
                        <Building2 className="input-icon" />
                        <input
                          type="text"
                          placeholder="Lumiere Skincare Inc."
                          value={formData.businessName || formData.companyName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Business Website</label>
                      <div className="auth-input-wrapper">
                        <Globe className="input-icon" />
                        <input
                          type="url"
                          placeholder="https://www.yourcompany.com"
                          value={formData.businessWebsite}
                          onChange={(e) => handleInputChange('businessWebsite', e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="auth-input-group">
                      <label className="auth-label">Business Category</label>
                      <select
                        value={formData.businessCategory}
                        onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                        className="auth-input"
                      >
                        <option>E-commerce & Retail</option>
                        <option>B2B SaaS & Tech</option>
                        <option>Professional Services</option>
                        <option>Healthcare & Beauty</option>
                        <option>Real Estate & Finance</option>
                      </select>
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Industry</label>
                      <input
                        type="text"
                        placeholder="e.g. Skincare & Cosmetics"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="auth-input-group">
                      <label className="auth-label">Number of Employees</label>
                      <div className="auth-input-wrapper">
                        <Users className="input-icon" />
                        <select
                          value={formData.employeesCount}
                          onChange={(e) => handleInputChange('employeesCount', e.target.value)}
                          className="auth-input"
                        >
                          <option>1-10 employees</option>
                          <option>11-50 employees</option>
                          <option>51-200 employees</option>
                          <option>200+ employees</option>
                        </select>
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label className="auth-label">Monthly Marketing Budget</label>
                      <div className="auth-input-wrapper">
                        <DollarSign className="input-icon" />
                        <select
                          value={formData.monthlyBudget}
                          onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
                          className="auth-input"
                        >
                          <option>₹2,500 - ₹5,000/mo</option>
                          <option>₹5,000 - ₹10,000/mo</option>
                          <option>₹10,000 - ₹25,000/mo</option>
                          <option>₹25,000+/mo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Business Goals Checkboxes */}
                  <div className="auth-input-group">
                    <label className="auth-label">Primary Business Goals</label>
                    <div className="services-checkbox-grid">
                      {['SEO Optimization', 'Lead Generation', 'Paid Ads Scaling', 'Conversion Rate Optimization', 'Brand Reputation'].map((goal) => (
                        <label key={goal} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={formData.businessGoals.includes(goal)}
                            onChange={() => handleGoalToggle(goal)}
                          />
                          <span>{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Security & Confirmation */}
              {currentStep === 3 && (
                <div className={`step-slide-container ${slideDirection === 'next' ? 'slide-in-right' : 'slide-in-left'}`}>
                  <div className="auth-input-group">
                    <label className="auth-label">Password *</label>
                    <div className="auth-input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        required
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Confirm Password *</label>
                    <div className="auth-input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        required
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="auth-options-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                      />
                      <span>I accept the DigiToomasha Terms of Service & Privacy Policy</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="step-actions-row">
                {currentStep > 1 && (
                  <button type="button" className="step-back-btn" onClick={goToPrevStep}>
                    <ArrowLeft className="btn-arrow" />
                    <span>Back</span>
                  </button>
                )}

                <div className="step-right-actions">
                  {currentStep === 2 && (
                    <button type="button" className="step-skip-text-btn" onClick={skipToStep3}>
                      <span>Skip this step</span>
                      <ArrowRight className="skip-arrow" />
                    </button>
                  )}

                  {currentStep < 3 ? (
                    <button type="button" className="auth-submit-btn step-next-btn" onClick={goToNextStep}>
                      <span>Continue to Step {currentStep + 1}</span>
                      <ArrowRight className="btn-arrow" />
                    </button>
                  ) : (
                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                      <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
                      <CheckCircle className="btn-arrow" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            <p className="auth-switch-footer">
              Already have an account?{' '}
              <Link to="/login" className="switch-auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Visual Feature Breakdown Column */}
        <div className="auth-visual-side signup-visual-side">
          <div className="visual-content-box">
            <h3 className="signup-visual-title">Why Top Brands Choose DigiToomasha</h3>

            <div className="signup-features-list">
              <div className="sfeature-item">
                <div className="sfeature-icon-box">
                  <BarChart3 className="sf-icon" />
                </div>
                <div>
                  <strong className="sf-title">Real-Time Growth Dashboard</strong>
                  <p className="sf-desc">Track live ad conversions, ROI metrics, and search engine ranking gains instantly.</p>
                </div>
              </div>

              <div className="sfeature-item">
                <div className="sfeature-icon-box">
                  <Zap className="sf-icon" />
                </div>
                <div>
                  <strong className="sf-title">Dedicated Senior Strategist</strong>
                  <p className="sf-desc">Direct access to experienced growth directors managing your search and paid media campaigns.</p>
                </div>
              </div>

              <div className="sfeature-item">
                <div className="sfeature-icon-box">
                  <ShieldCheck className="sf-icon" />
                </div>
                <div>
                  <strong className="sf-title">Performance-Driven Guarantee</strong>
                  <p className="sf-desc">No long-term lock-ins. Flexible agreements backed by clear monthly KPIs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
