import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Top Grid */}
      <div className="footer-top-grid">
        {/* Brand & Description Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo-brand">
            <div className="logo-pixel-grid">
              <span className="pixel dot-dark" />
              <span className="pixel dot-dark" />
              <span className="pixel dot-dark" />
              <span className="pixel dot-dark" />
              <span className="pixel dot-light" />
              <span className="pixel dot-dark" />
              <span className="pixel dot-dark" />
              <span className="pixel dot-dark" />
              <span className="pixel dot-dark" />
            </div>
            <span className="brand-name">DigiToomasha</span>
          </Link>

          <p className="footer-brand-desc">
            Through careful keyword research and white hat SEO practices, we can
            help you achieve higher organic rankings and increased visibility in
            search results.
          </p>
        </div>

        {/* 5 Nav Link Columns */}
        <div className="footer-links-grid">
          {/* Column 1: PRODUCT */}
          <div className="footer-link-group">
            <h4 className="footer-group-title">PRODUCT</h4>
            <ul className="footer-links-list">
              <li><Link to="/services">Overview</Link></li>
              <li><Link to="/services">Features</Link></li>
              <li>
                <Link to="/services" className="solutions-link-badge">
                  Solutions <span className="new-badge">New</span>
                </Link>
              </li>
              <li><Link to="/services">Tutorials</Link></li>
              <li><Link to="/services">Pricing</Link></li>
              <li><Link to="/services">Releases</Link></li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div className="footer-link-group">
            <h4 className="footer-group-title">COMPANY</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/jobs">Careers / Jobs</Link></li>
              <li><Link to="/about">Press</Link></li>
              <li><Link to="/articles">News</Link></li>
              <li><Link to="/about">Media kit</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="footer-link-group">
            <h4 className="footer-group-title">RESOURCES</h4>
            <ul className="footer-links-list">
              <li><Link to="/articles">Blog</Link></li>
              <li><Link to="/articles">Newsletter</Link></li>
              <li><Link to="/about">Events</Link></li>
              <li><Link to="/contact">Help centre</Link></li>
              <li><Link to="/services">Tutorials</Link></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </div>

          {/* Column 4: SOCIAL */}
          <div className="footer-link-group">
            <h4 className="footer-group-title">SOCIAL</h4>
            <ul className="footer-links-list">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://angellist.com" target="_blank" rel="noreferrer">AngelList</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube</a></li>
            </ul>
          </div>

          {/* Column 5: LEGAL */}
          <div className="footer-link-group">
            <h4 className="footer-group-title">LEGAL</h4>
            <ul className="footer-links-list">
              <li><Link to="/contact">Terms</Link></li>
              <li><Link to="/contact">Privacy</Link></li>
              <li><Link to="/contact">Cookies</Link></li>
              <li><Link to="/contact">Licenses</Link></li>
              <li><Link to="/contact">Settings</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Icons Bar */}
      <div className="footer-bottom-bar">
        <span className="copyright-text">© 2077 DigiToomasha. All rights reserved.</span>

        <div className="footer-social-icons">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
            <Twitter className="social-icon" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook className="social-icon" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="social-icon" />
          </a>
          <a href="https://digitoomasha.com" target="_blank" rel="noreferrer" aria-label="Global Web">
            <Globe className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
