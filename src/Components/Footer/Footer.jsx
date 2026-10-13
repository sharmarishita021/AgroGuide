import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* FOOTER COLUMN 1 */}
        <div className="footer-column">
          <div className="footer-logo">
            Agro<span>Guide</span>
          </div>
          <div className="footer-description">
            <strong>Guiding agriculture towards a sustainable future.</strong>
            <p>
              An educational and diagnostic platform helping farmers, researchers,
              and agriculture enthusiasts understand farming challenges and adopt
              practical, long-term sustainable alternatives.
            </p>
          </div>
        </div>

        {/* FOOTER COLUMN 2 */}
        <div className="footer-column">
          <h4>Explore Tools</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/farm-check">Farm Check Assessment</Link></li>
            <li><Link to="/crop-doctor">Crop Doctor (Disease Diagnostics)</Link></li>
            <li><Link to="/problem-solver">Agricultural Problem Solver</Link></li>
            <li><Link to="/schemes">Government & Support Schemes</Link></li>
            <li><Link to="/about">About AgroGuide</Link></li>
          </ul>
        </div>

        {/* FOOTER COLUMN 3 */}
        <div className="footer-column">
          <h4>Information</h4>
          <div className="footer-info">
            <p className="footer-address">
              <strong>AgroGuide HQ</strong><br />
              Agricultural Innovation Center<br />
              Chicago, IL &amp; Global Networks
            </p>
            <a href="mailto:info@agroguide.org" className="footer-contact">info@agroguide.org</a>
            <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="back-to-top">
              Back to Top
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© {new Date().getFullYear()} AgroGuide. Guiding agriculture towards a more sustainable future.</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
