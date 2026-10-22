import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenConsultation, onOpenValidationTopic }) {
  return (
    <footer className="site-footer">
      <div className="footer-container container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="brand-monogram-small">AG</span>
              <span className="brand-name">AgroGuide Portal</span>
            </div>
            <p className="footer-desc">
              Agricultural intelligence and direct farm-to-consumer marketplace platform.
              Bridging satellite weather telemetry, crop analytics, government subsidies, and sustainable farming.
            </p>
            <div className="footer-badges">
              <span className="badge-pill">Made for Indian Farmers</span>
              <span className="badge-pill">Open-Meteo REST API Telemetry</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform Services</h4>
            <ul className="footer-links">
              <li><Link to="/farm-health">Farm Health &amp; Sustainable Farming</Link></li>
              <li><Link to="/schemes">Govt Schemes &amp; Subsidies</Link></li>
              <li><Link to="/marketplace">Direct Farmer Marketplace</Link></li>
              <li><Link to="/consultation">Agronomy Consultation Portal</Link></li>
              <li><Link to="/profile">User, Seller &amp; Consultant Profile</Link></li>
              <li><Link to="/about">About &amp; Tech Architecture</Link></li>
              {onOpenConsultation && (
                <li>
                  <button type="button" className="footer-action-link" onClick={onOpenConsultation}>
                    Agronomy Consultation Request
                  </button>
                </li>
              )}
              {onOpenValidationTopic && (
                <li>
                  <button type="button" className="footer-action-link" onClick={onOpenValidationTopic}>
                    Form Validations &amp; Modal Architecture
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Syllabus & Technologies */}
          <div className="footer-col">
            <h4 className="footer-heading">React Curriculum Architecture</h4>
            <ul className="footer-syllabus-tags">
              <li>SPA Routing (React Router v7)</li>
              <li>Protected Routes &amp; Multi-Role Auth</li>
              <li>Controlled Forms with Regex Validation</li>
              <li>Accessible Dialog Modals (ARIA/ESC)</li>
              <li>Context API (Auth &amp; Marketplace)</li>
              <li>REST API Fetch with Loading &amp; Error States</li>
              <li>Haversine Proximity Sorting</li>
              <li>Real-Time Multi-Party Rating System</li>
            </ul>
          </div>

          {/* Contact / Emergency Agri Helpline */}
          <div className="footer-col">
            <h4 className="footer-heading">Kisan Krishi Helpline</h4>
            <div className="kisan-helpline-card">
              <span className="helpline-number">Toll-Free: 1800-180-1551</span>
              <span className="helpline-sub">National Kisan Call Center (6:00 AM - 10:00 PM)</span>
            </div>
            <p className="footer-note">
              Supporting Indian farming families with timely scientific knowledge, market access, and zero-commission trade.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AgroGuide. Pair-programmed with React 19 &amp; Modern Web Standards.</p>
          <div className="footer-bottom-links">
            <Link to="/farm-health">Farm Health</Link>
            <span>•</span>
            <Link to="/schemes">Subsidies</Link>
            <span>•</span>
            <Link to="/marketplace">Marketplace</Link>
            <span>•</span>
            <Link to="/consultation">Consultation</Link>
            <span>•</span>
            <Link to="/profile">My Profile</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
