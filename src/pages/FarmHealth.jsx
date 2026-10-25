import React, { useState } from 'react';
import '../css_pages/FarmHealth.css';
import { DISTRICTS_DATA } from '../data/localitiesData';
import { IMAGES } from '../data/imagesData';
import LocalitySelector from '../components/farmhealth/LocalitySelector';
import RegionalConditions from '../components/farmhealth/RegionalConditions';
import CropsAdvice from '../components/farmhealth/CropsAdvice';
import VulnerabilitiesCard from '../components/farmhealth/VulnerabilitiesCard';
import DiagnosticSection from '../components/farmhealth/DiagnosticSection';
import GreenPledgeModal from '../components/gogreen/GreenPledgeModal';
import SustainableMethods from '../components/farmhealth/SustainableMethods';

export default function FarmHealth({ onOpenConsultation }) {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS_DATA[0]);
  const [activeTab, setActiveTab] = useState('climate-crops');
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);

  return (
    <div className="farm-health-page container">
      <div className="page-header-with-hero">
        <div className="header-image-container">
          <img
            src={IMAGES.heroes.farmHealth}
            alt="Agricultural farmland with agro-climatic monitoring"
            className="header-hero-img"
          />
          <div className="header-overlay-gradient"></div>
        </div>

        <div className="header-text-content">
          <span className="page-eyebrow">UNIFIED AGRONOMY &amp; ECO-FARMING</span>

          <h1 className="page-title">
            Farm Health &amp; Sustainable Agriculture
          </h1>

          <p className="page-lead">
            A comprehensive regional agronomy portal providing static agro-climatic intelligence, high-yielding crop cultivars,
            soil nutrition diagnostics, and chemical-free sustainable farming practices.
          </p>

          <div className="header-quick-actions">
            {onOpenConsultation && (
              <>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onOpenConsultation}
                >
                  Request Agronomy Consultation
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsPledgeModalOpen(true)}
                >
                  Sign Sustainable Farmer Pledge
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="farm-health-tabs-nav">
        <button
          type="button"
          className={`fh-tab-btn ${activeTab === 'climate-crops' ? 'active' : ''}`}
          onClick={() => setActiveTab('climate-crops')}
        >
          1. Recommendation / Climate &amp; Recommended Crops
        </button>

        <button
          type="button"
          className={`fh-tab-btn ${activeTab === 'diagnostics' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagnostics')}
        >
          2. Diagnostics &amp; Soil Nutrition
        </button>

        <button
          type="button"
          className={`fh-tab-btn ${activeTab === 'sustainable' ? 'active' : ''}`}
          onClick={() => setActiveTab('sustainable')}
        >
          3. Sustainable Methods
        </button>
      </div>

      {activeTab === 'climate-crops' && (
        <div className="tab-pane-content">
          <section className="locality-section">
            <LocalitySelector
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(dist) => setSelectedDistrict(dist)}
            />
          </section>

          <section className="regional-conditions-section">
            <RegionalConditions district={selectedDistrict} />
          </section>

          <section className="crops-section">
            <CropsAdvice district={selectedDistrict} />
          </section>

          <section className="vulnerabilities-section">
            <VulnerabilitiesCard district={selectedDistrict} />
          </section>
        </div>
      )}

      {activeTab === 'diagnostics' && (
        <div className="tab-pane-content">
          <div className="section-title-wrap">
            <div className="title-left">
              <span className="section-category-badge">
                PRECISION FIELD TOOLS
              </span>

              <div>
                <h3 className="section-heading">
                  Crop Diagnostics &amp; Soil Nutrition
                </h3>

                <p className="section-sub">
                  Identify observable plant distress symptoms and formulate balanced N-P-K nutrient dosages for your land.
                </p>
              </div>
            </div>
          </div>

          <div className="extra-tools-grid">
            <DiagnosticSection />
          </div>
        </div>
      )}

      {activeTab === 'sustainable' && (
        <div className="tab-pane-content">
          <SustainableMethods />
        </div>
      )}

      <GreenPledgeModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
      />
    </div>
  );
}