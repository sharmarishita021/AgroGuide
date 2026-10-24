import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { IMAGES } from '../data/imagesData';

export default function About({ onOpenConsultation, onOpenValidationTopic }) {
  const { showToast } = useToast();

  // Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Form state & validation
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    queryType: 'Technical Question',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How is the live climatic weather data retrieved?',
      a: 'We consume the Open-Meteo REST API using native browser fetch and async/await. It queries real-time satellite and meteorological models for exact latitude and longitude coordinates of each district without requiring paid API keys.'
    },
    {
      q: 'How does the Closest-to-Farthest marketplace distance sorting work?',
      a: 'Each product listed by a farmer stores the geographical coordinates of their district. When a buyer selects their delivery district, our Haversine algorithm calculates the exact spherical distance in kilometers between the buyer and seller, and sorts the cards in ascending distance order.'
    },
    {
      q: 'How does real-time product uploading and rating reflection work?',
      a: 'Products and ratings are managed globally using the React Context API and synchronized with localStorage and cross-tab storage event listeners. When a seller publishes an item or a buyer rates a crop, state triggers immediate re-renders across all active components.'
    },
    {
      q: 'How is scheme relevance calculated?',
      a: 'Our relevance ranking algorithm checks keyword matches, state applicability (state-specific vs central), scheme category, and farmer land holding size. Each factor contributes weighted points, and schemes are sorted in descending order of their composite score.'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Mobile phone number is required.';
    } else {
      const cleanPhone = formData.phone.replace(/\s+|-/g, '').replace(/^\+91/, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        errs.phone = 'Enter a valid 10-digit Indian mobile number.';
      }
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details of your inquiry.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Inquiry message must be at least 15 characters long.';
    }

    return errs;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, message: true });
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast('Please fix the highlighted form validation errors.', 'warning');
      return;
    }

    setFormSubmitted(true);
    showToast('Your inquiry has been received! Our agronomy advisory team will respond shortly.', 'success');
  };

  return (
    <div className="about-page container">
      {/* Header with Hero Banner */}
      <div className="page-header-with-hero">
        <div className="header-image-container">
          <img
            src={IMAGES.heroes.about}
            alt="Agricultural science research center and smart farming technologies"
            className="header-hero-img"
          />
          <div className="header-overlay-gradient"></div>
        </div>

        <div className="header-text-content">
          <span className="page-eyebrow">AGROGUIDE PORTAL OVERVIEW</span>
          <h1 className="page-title">About AgroGuide &amp; Technical Architecture</h1>
          <p className="page-lead">
            A web application bridging agricultural science, government support programs,
            and direct-to-consumer farm marketplace trade.
          </p>

          <div className="about-header-buttons">
            {onOpenValidationTopic && (
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenValidationTopic}
              >
                Review Form Validation &amp; Modal Architecture
              </button>
            )}
            {onOpenConsultation && (
              <button
                type="button"
                className="btn-secondary"
                onClick={onOpenConsultation}
              >
                Launch Agronomy Consultation Form
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mission & Vision with Relevant Photography */}
      <section className="about-mission-section">
        <div className="mission-grid">
          <div className="mission-card">
            <div className="mission-media-wrap">
              <img
                src={IMAGES.about.mission}
                alt="Empowered Indian rural agricultural community"
                className="mission-card-img"
                loading="lazy"
              />
              <span className="mission-tag">CORE PURPOSE</span>
            </div>
            <div className="mission-card-body">
              <h3>Our Mission</h3>
              <p>
                To democratize agricultural intelligence for every Indian farmer. By combining satellite telemetry,
                soil profile matching, and open government databases, we empower growers to make scientific crop choices
                and eliminate predatory middleman commissions.
              </p>
            </div>
          </div>

          <div className="mission-card">
            <div className="mission-media-wrap">
              <img
                src={IMAGES.about.vision}
                alt="Sustainable regenerative farmland ecosystem"
                className="mission-card-img"
                loading="lazy"
              />
              <span className="mission-tag">FUTURE HORIZON</span>
            </div>
            <div className="mission-card-body">
              <h3>Our Vision</h3>
              <p>
                A sustainable, water-secure, and prosperous rural agrarian ecosystem where regenerative practices
                like stubble mulching, micro-irrigation, and chemical-free bio-inputs restore topsoil fertility and
                deliver premium profits directly to the cultivators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Validation & Modals Showcase Banner */}
      <section className="validation-spotlight-section">
        <div className="validation-spotlight-card">
          <div className="spotlight-left">
            <span className="spotlight-pill">CURRICULUM TOPIC HIGHLIGHT</span>
            <h3>Form Validation Strategies &amp; Accessible Modal Architecture</h3>
            <p>
              Explore how controlled inputs, regular expressions, dirty/touched state tracking, focus traps,
              and non-blocking dialogs are structured across every user interface in AgroGuide.
            </p>
          </div>
          <div className="spotlight-right">
            {onOpenValidationTopic && (
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenValidationTopic}
              >
                Open Form Validation Topic Modal
              </button>
            )}
          </div>
        </div>
      </section>

     

      {/* Interactive FAQ Accordion */}
      <section className="faq-section">
        <div className="section-title-wrap">
          <span className="section-category-badge">KNOWLEDGE BASE</span>
          <div>
            <h3 className="section-heading">Frequently Asked Questions</h3>
            <p className="section-sub">Interactive answers regarding platform data and calculations</p>
          </div>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? 'expanded' : ''}`}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <span>{faq.q}</span>
                <span className="faq-toggle-state">{openFaq === idx ? 'Collapse' : 'Expand'}</span>
              </button>
              {openFaq === idx && (
                <div className="faq-answer-body">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Kisan Query Form with Validation */}
      <section className="contact-section">
        <div className="contact-card">
          <div className="contact-info-col">
            <span className="contact-pill">AGRONOMY HELP DESK</span>
            <h3>Have an Agricultural Question or Platform Feedback?</h3>
            <p>
              Our agronomists, soil scientists, and support coordinators are available to help you navigate schemes
              or verify your organic farm certificate.
            </p>
            <div className="contact-details">
              <div className="c-item">
                <span className="c-label">Toll-Free Helpline:</span>
                <strong>1800-180-1551</strong>
              </div>
              <div className="c-item">
                <span className="c-label">Support Email:</span>
                <strong>support@agroguide.in</strong>
              </div>
              <div className="c-item">
                <span className="c-label">Central Hub:</span>
                <strong>National Krishi Bhavan, New Delhi</strong>
              </div>
            </div>
          </div>

          <div className="contact-form-col">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Full Name: *</label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`form-control ${touched.name && errors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    required
                  />
                  {touched.name && errors.name && (
                    <span className="field-error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">10-Digit Phone Number: *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className={`form-control ${touched.phone && errors.phone ? 'input-error' : ''}`}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <span className="field-error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-query-type">Inquiry Subject:</label>
                  <select
                    id="contact-query-type"
                    className="form-control"
                    value={formData.queryType}
                    onChange={(e) => handleInputChange('queryType', e.target.value)}
                  >
                    <option value="Technical Question">Technical / Platform Question</option>
                    <option value="Scheme Application">Scheme / Subsidy Guidance</option>
                    <option value="Organic Certification">Organic Certification &amp; Pledge</option>
                    <option value="Marketplace Dispute">Marketplace / Delivery Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Your Message (Min 15 Characters): *</label>
                  <textarea
                    id="contact-message"
                    rows="3"
                    className={`form-control ${touched.message && errors.message ? 'input-error' : ''}`}
                    placeholder="Describe your farmland query or suggestion..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                    required
                  />
                  {touched.message && errors.message && (
                    <span className="field-error-message">{errors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn-primary btn-submit-contact">
                  Send Message to Advisory Team
                </button>
              </form>
            ) : (
              <div className="contact-success-state">
                <span className="success-tag-badge">INQUIRY DISPATCHED</span>
                <h4>Thank You, {formData.name}!</h4>
                <p>Your message regarding <strong>{formData.queryType}</strong> has been forwarded to our agronomy team.</p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', phone: '', queryType: 'Technical Question', message: '' });
                    setErrors({});
                    setTouched({});
                  }}
                >
                  Submit Another Question
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
