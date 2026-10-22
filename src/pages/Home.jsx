import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../data/imagesData';

export default function Home({ onOpenConsultation }) {
  const services = [
    {
      id: 'farm-health',
      title: 'Farm Health & Sustainable Agriculture',
      description:
        'Access localized micro-climate forecasts, discover scientifically recommended high-yielding cultivars for your district, diagnose crop diseases, and learn chemical-free organic farming practices.',
      image: IMAGES.services.farmHealth,
      alt: 'Agronomist checking healthy green crops in field',
      route: '/farm-health',
      btnText: 'Explore Farm Health & Advisory',
      isModal: false
    },
    {
      id: 'schemes',
      title: 'Government Agricultural Subsidies',
      description:
        'Discover central and state government financial assistance programs, PM-KISAN income support, PM-KUSUM solar irrigation pumps, and crop insurance dynamically ranked for your farmland.',
      image: IMAGES.services.schemes,
      alt: 'Indian agricultural farmer in farmland with tractor',
      route: '/schemes',
      btnText: 'Browse Ranked Subsidies',
      isModal: false
    },
    {
      id: 'marketplace',
      title: 'Direct Farmer-to-Buyer Marketplace',
      description:
        'A transparent exchange where verified local growers sell fresh grains, fruits, vegetables, and bio-fertilizers directly to buyers. Listings are automatically sorted from closest to farthest.',
      image: IMAGES.services.marketplace,
      alt: 'Fresh harvest sacks and agricultural produce',
      route: '/marketplace',
      btnText: 'Visit Farmer Marketplace',
      isModal: false
    },
    {
      id: 'consultation',
      title: 'Agronomy Expert Consultation',
      description:
        'Submit real-time crop distress queries to receive personalized diagnostic reports, soil NPK dosage plans, and organic pest defense advice from certified agricultural scientists.',
      image: IMAGES.services.consultation,
      alt: 'Agronomy specialist conducting agricultural research',
      route: '/consultation',
      btnText: 'Open Consultation Portal',
      isModal: false
    }
  ];

  return (
    <main className="home-page-container">
      {/* Clean, Focused Hero Section */}
      <section className="hero-section">
        <div className="hero-background-wrap">
          <img
            src={IMAGES.heroes.home}
            alt="Sunrise over Indian agricultural field"
            className="hero-bg-img"
          />
          <div className="hero-gradient-overlay"></div>
        </div>

        <div className="hero-content container">
          <div className="hero-text-col hero-text-centered">
            <span className="hero-pill-tag">SMART KRISHI PORTAL</span>
            <h1 className="hero-headline">
              AgroGuide: Modern Agricultural Advisory &amp; Direct Farmer Marketplace
            </h1>
            <p className="hero-subtext">
              A single platform connecting Indian farming families with regional climatic intelligence,
              government support programs, sustainable organic methods, and direct-to-consumer trade.
            </p>

            <div className="hero-cta-group hero-cta-centered">
              <a href="#services-grid" className="btn-primary hero-btn">
                Explore Platform Services
              </a>
              <Link to="/profile" className="btn-secondary hero-btn">
                Access User &amp; Seller Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section - Clean & Readable */}
      <section id="services-grid" className="services-section container">
        <div className="section-header-centered">
          <span className="section-category-badge">OUR CORE SERVICES</span>
          <h2 className="section-main-title">Comprehensive Agricultural Services</h2>
          <p className="section-lead">
            Select a service below to access regional intelligence, financial support, direct market trade, or expert agronomy advisory.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-media-wrap">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="service-card-img"
                  loading="lazy"
                />
              </div>

              <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-action-wrap">
                  {service.isModal ? (
                    <button
                      type="button"
                      className="btn-primary btn-service-action"
                      onClick={onOpenConsultation}
                    >
                      {service.btnText} →
                    </button>
                  ) : (
                    <Link
                      to={service.route}
                      className="btn-primary btn-service-action"
                    >
                      {service.btnText} →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Kisan Direct Helpline Banner */}
      <section className="helpline-strip-section container">
        <div className="helpline-strip-card">
          <div className="helpline-strip-left">
            <span className="helpline-strip-tag">TOLL-FREE KISAN HELPLINE</span>
            <h4>Need Immediate Agronomy Support or Scheme Advice?</h4>
            <p>Our dedicated agrarian advisory team is available daily from 6:00 AM to 10:00 PM.</p>
          </div>
          <div className="helpline-strip-right">
            <a href="tel:18001801551" className="btn-helpline-call">
              Call 1800-180-1551
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
