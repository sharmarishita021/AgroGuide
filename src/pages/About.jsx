import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* =========================================
           HEADER
      ========================================= */}
      <header>
        <div className="logo">
          AgroGuide<span>.</span>
        </div>

        <nav>
          <a href="#" className="active">Home</a>
          <a href="#">Farm Check Assessment</a>
          <a href="#">Crop Doctor</a>
          <a href="#">Farm Problem Solver</a>
          <a href="#">Problems & Solutions</a>
          <a href="#">Schemes</a>
        </nav>
      </header>

      {/* =========================================
           HERO
      ========================================= */}
      <section className="hero">
        <div className="hero-subtitle">We Use</div>
        <div className="hero-title">Only Reliable Methods</div>

        <div className="hero-thumbnails">
          <img
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=200&q=80"
            alt="Hay Bales"
          />
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=200&q=80"
            alt="Grains"
          />
        </div>
      </section>

      {/* =========================================
           OLIVE FEATURES SECTION
      ========================================= */}
      <section className="features-section">
        <div className="features-left">
          <h2>The Best Quality Seeds & Traits</h2>
          <div className="subtext">
            Ecological farming techniques for sustainable yield.
          </div>
          <p>
            Providing long-term soil protection, crop rotation guidance,
            and water management solutions tailored to local conditions.
          </p>
        </div>

        <div className="features-right">
          <div className="feature-item">
            <div className="feature-icon">🌱</div>
            <div className="feature-text">
              <h3>Development</h3>
              <p>Advanced eco-friendly practices maintaining soil vitality.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">⚙️</div>
            <div className="feature-text">
              <h3>Equipment</h3>
              <p>Low-impact precision machinery reducing topsoil erosion.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🌾</div>
            <div className="feature-text">
              <h3>Our Profile</h3>
              <p>Dedicated to water retention and chemical reduction.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🔬</div>
            <div className="feature-text">
              <h3>Researches</h3>
              <p>Field analytics testing biological pest management.</p>
            </div>
          </div>

          <a href="#" className="more-info-link">View More Info</a>
        </div>
      </section>

      {/* =========================================
           CALLOUT
      ========================================= */}
      <section className="callout-section">
        <h2>Applying 100% Pure Organic Fertilizers</h2>
        <p>
          Eliminate chemical runoff, improve crop resilience,
          and boost long-term harvest quality with custom natural
          composts and organic soil enrichers.
        </p>
        <a href="#" className="callout-btn">LEARN MORE</a>
      </section>

      {/* =========================================
           BOTTOM CARDS
      ========================================= */}
      <section className="grid-section">
        {/* CARD 1 */}
        <div className="grid-card">
          <h3>Advice From Breeder</h3>
          <div className="tagline">Ecological Soil Health</div>
          <p>
            Discover indigenous seed selection and multi-cropping
            strategies tailored to regional climate shifts.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="grid-card">
          <h3>Premium Quality Control & The Best Prices</h3>
          <div className="tagline">Harvest Yield Analytics</div>
          <p>
            Streamlined quality checks ensuring every grain batch
            meets international organic certification guidelines.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="grid-card">
          <h3>Our Locations</h3>
          <p style={{ marginTop: '15px' }}>
            <strong>AgroGuide HQ</strong>
            <br />
            28 Jackson Blvd Ste 1020
            <br />
            Chicago, IL
            <br /><br />
            <span style={{ color: '#839d09' }}>
              info@agroguide.org
            </span>
          </p>
        </div>
      </section>

      {/* =========================================
           FOOTER
      ========================================= */}
      <footer>
        <div className="footer-container">
          {/* FOOTER COLUMN 1 */}
          <div className="footer-column">
            <h3>AgroGuide</h3>
            <div className="footer-description">
              <strong>Guiding agriculture towards a sustainable future.</strong>
              <p>
                An educational platform helping farmers and students
                understand agricultural challenges and explore practical,
                long-term sustainable alternatives.
              </p>
            </div>
          </div>

          {/* FOOTER COLUMN 2 */}
          <div className="footer-column">
            <h4>Main Navigation</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Farm Check Assessment</a></li>
              <li><a href="#">Crop Doctor (Disease Diagnostics)</a></li>
              <li><a href="#">Farm Problem Solver</a></li>
              <li><a href="#">Problems, Solutions & Compare</a></li>
              <li><a href="#">Government & Private Schemes</a></li>
            </ul>
          </div>

          {/* FOOTER COLUMN 3 */}
          <div className="footer-column">
            <h4>Information</h4>
            <div className="footer-info">
              <a href="#">About AgroGuide</a>
              <a href="#">Back to Top ↑</a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          © 2026 AgroGuide. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default About;
