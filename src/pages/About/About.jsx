import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* =========================================
           HERO
      ========================================= */}
      <section className="about-hero">
        <div className="hero-content-wrap">
          <div className="hero-subtitle">We Use</div>
          <h1 className="hero-title">Only Reliable Methods</h1>
          <p className="hero-description">
            Empowering agricultural communities with proven organic practices,
            smart soil conservation techniques, and verified support mechanisms.
          </p>
        </div>

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
           FEATURES SECTION
      ========================================= */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-left">
            <h2>The Best Quality Seeds &amp; Traits</h2>
            <div className="subtext">
              Ecological farming techniques for sustainable yield.
            </div>
            <p>
              Providing long-term soil protection, crop rotation guidance,
              and water management solutions tailored to local microclimates.
            </p>
          </div>

          <div className="features-right">
            <div className="feature-item">
              <div className="feature-text">
                <h3>Development</h3>
                <p>Advanced eco-friendly practices maintaining soil vitality.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-text">
                <h3>Equipment</h3>
                <p>Low-impact precision machinery reducing topsoil erosion.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-text">
                <h3>Our Profile</h3>
                <p>Dedicated to water retention and chemical reduction.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-text">
                <h3>Researches</h3>
                <p>Field analytics testing biological pest management.</p>
              </div>
            </div>

            <Link to="/problem-solver" className="more-info-link">
              Explore Problem Solutions →
            </Link>
          </div>
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
        <Link to="/schemes" className="btn btn-primary">
          Explore Government &amp; Organic Subsidies →
        </Link>
      </section>

      {/* =========================================
           BOTTOM CARDS
      ========================================= */}
      <section className="grid-section">
        <div className="about-cards-container page-container">
          {/* CARD 1 */}
          <div className="grid-card common-card">
            <div className="card-top-accent"></div>
            <h3>Advice From Breeders</h3>
            <div className="tagline">Ecological Soil Health</div>
            <p>
              Discover indigenous seed selection and multi-cropping
              strategies tailored to regional climate shifts and seasonal variability.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="grid-card common-card">
            <div className="card-top-accent"></div>
            <h3>Premium Quality Control</h3>
            <div className="tagline">Harvest Yield Analytics</div>
            <p>
              Streamlined quality checks ensuring every grain batch
              meets international organic certification guidelines and high nutritional standards.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="grid-card common-card">
            <div className="card-top-accent"></div>
            <h3>Our Community &amp; HQ</h3>
            <div className="tagline">Global Agricultural Network</div>
            <p>
              <strong>AgroGuide HQ Center</strong><br />
              28 Jackson Blvd Ste 1020<br />
              Chicago, IL &amp; Global Farmer Hubs<br />
              <span className="email-highlight">
                info@agroguide.org
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;