import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, ShieldCheck, TrendingUp, Star } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter your email address and password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
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
          <div className="auth-page-card">
            <div className="auth-brand-badge">DigiToomasha Portal</div>
            <h1 className="auth-page-title">Welcome Back</h1>
            <p className="auth-page-subtitle">
              Sign in to your client dashboard to view live campaign analytics & SEO reports.
            </p>

            {errorMsg && <div className="auth-error-alert">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <label className="auth-label">Work Email</label>
                <div className="auth-input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg('');
                    }}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-options-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me for 30 days</span>
                </label>
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                <ArrowRight className="btn-arrow" />
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* Social Authentication */}
            <div className="auth-social-row">
              <button type="button" className="social-auth-btn">
                Google
              </button>
              <button type="button" className="social-auth-btn">
                LinkedIn
              </button>
            </div>

            <p className="auth-switch-footer">
              Don't have an account yet?{' '}
              <Link to="/signup" className="switch-auth-link">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Visual Highlight Banner Column */}
        <div className="auth-visual-side">
          <div className="visual-content-box">
            <div className="visual-rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-icon" />
              ))}
            </div>

            <blockquote className="visual-quote">
              "DigiToomasha transformed our customer acquisition completely. We scaled organic revenues by 350% within just 4 months."
            </blockquote>

            <div className="visual-author-box">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                alt="Client Author"
                className="visual-author-avatar"
              />
              <div>
                <strong className="visual-author-name">Alex Morgan</strong>
                <span className="visual-author-title">VP of Growth at Lumière D'or</span>
              </div>
            </div>

            <div className="visual-stats-row">
              <div className="vstat-item">
                <TrendingUp className="vstat-icon" />
                <span>+350% Revenue Increase</span>
              </div>
              <div className="vstat-item">
                <ShieldCheck className="vstat-icon" />
                <span>Enterprise SLA Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
