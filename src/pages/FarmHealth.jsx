import React, { useState } from 'react';
import { DISTRICTS_DATA } from '../data/localitiesData';
import { IMAGES } from '../data/imagesData';
import LocalitySelector from '../components/farmhealth/LocalitySelector';
import WeatherCard from '../components/farmhealth/WeatherCard';
import CropsAdvice from '../components/farmhealth/CropsAdvice';
import VulnerabilitiesCard from '../components/farmhealth/VulnerabilitiesCard';
import SoilCalculator from '../components/farmhealth/SoilCalculator';
import SymptomChecker from '../components/farmhealth/SymptomChecker';
import BioFertilizerGuide from '../components/gogreen/BioFertilizerGuide';
import GreenPledgeModal from '../components/gogreen/GreenPledgeModal';

export default function FarmHealth({ onOpenConsultation }) {
  // Default to Ludhiana, Punjab
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS_DATA[0]);
  const [activeTab, setActiveTab] = useState('climate-crops'); // 'climate-crops', 'diagnostics', 'sustainable'
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);

  return (
    <div className="farm-health-page container">
      {/* Page Header with Hero Banner */}
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
          <h1 className="page-title">Farm Health &amp; Sustainable Agriculture</h1>
          <p className="page-lead">
            A comprehensive, simplified portal combining regional climate intelligence, high-yielding crop cultivars,
            plant disease diagnostics, and chemical-free organic farming practices.
          </p>

          <div className="header-quick-actions">
            {onOpenConsultation && (
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenConsultation}
              >
                Request Agronomy Consultation
              </button>
            )}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsPledgeModalOpen(true)}
            >
              Sign Sustainable Farmer Pledge
            </button>
          </div>
        </div>
      </div>

      {/* Simplified Navigation Switcher */}
      <div className="farm-health-tabs-nav">
        <button
          type="button"
          className={`fh-tab-btn ${activeTab === 'climate-crops' ? 'active' : ''}`}
          onClick={() => setActiveTab('climate-crops')}
        >
          1. Climate &amp; Recommended Crops
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
          3. Sustainable Organic Practices
        </button>
      </div>

      {/* Tab 1: Regional Climate & Crops */}
      {activeTab === 'climate-crops' && (
        <div className="tab-pane-content">
          <section className="locality-section">
            <LocalitySelector
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(dist) => setSelectedDistrict(dist)}
            />
          </section>

          <section className="weather-section">
            <WeatherCard district={selectedDistrict} />
          </section>

          <section className="crops-section">
            <CropsAdvice district={selectedDistrict} />
          </section>

          <section className="vulnerabilities-section">
            <VulnerabilitiesCard district={selectedDistrict} />
          </section>
        </div>
      )}

      {/* Tab 2: Diagnostics & Soil Health */}
      {activeTab === 'diagnostics' && (
        <div className="tab-pane-content">
          <div className="section-title-wrap">
            <div className="title-left">
              <span className="section-category-badge">PRECISION FIELD TOOLS</span>
              <div>
                <h3 className="section-heading">Crop Diagnostics &amp; Soil Nutrition</h3>
                <p className="section-sub">
                  Identify observable plant distress symptoms and formulate balanced N-P-K nutrient dosages for your land.
                </p>
              </div>
            </div>
          </div>

          <div className="extra-tools-grid">
            <SymptomChecker />
            <SoilCalculator defaultSoilType={selectedDistrict?.soilType} />
          </div>
        </div>
      )}

      {/* Tab 3: Sustainable Organic Practices (formerly GoGreen) */}
      {activeTab === 'sustainable' && (
        <div className="tab-pane-content">
          <div className="section-title-wrap">
            <div className="title-left">
              <span className="section-category-badge">REGENERATIVE FARMING</span>
              <div>
                <h3 className="section-heading">Sustainable Agronomy &amp; Natural Inputs</h3>
                <p className="section-sub">
                  Scientifically backed, low-cost organic practices to restore topsoil fertility, eliminate chemical residues, and conserve groundwater.
                </p>
              </div>
            </div>
          </div>

          {/* Core Principles with Clean Images - No 'Pillar' or 'Module' labels */}
          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-media-wrap">
                <img
                  src={IMAGES.practices.seedTreatment}
                  alt="Seed bio-priming and treatment"
                  className="principle-card-img"
                  loading="lazy"
                />
              </div>
              <div className="principle-card-body">
                <h4>Seed Bio-Treatment (Bijamrit)</h4>
                <p>
                  Coating seeds with beneficial biological inoculants and indigenous cow milk/urine provides a natural defense against soil-borne wilt and fungal damping-off.
                </p>
              </div>
            </div>

            <div className="principle-card">
              <div className="principle-media-wrap">
                <img
                  src={IMAGES.practices.mulching}
                  alt="Straw residue mulch on organic soil"
                  className="principle-card-img"
                  loading="lazy"
                />
              </div>
              <div className="principle-card-body">
                <h4>Soil Mulching (Acchadana)</h4>
                <p>
                  Retaining crop straw or live cover crops lowers topsoil temperature by 6-8°C, locks in condensation moisture, and feeds native earthworm populations.
                </p>
              </div>
            </div>

            <div className="principle-card">
              <div className="principle-media-wrap">
                <img
                  src={IMAGES.practices.aeration}
                  alt="Micro-drip irrigation maintaining soil moisture aeration"
                  className="principle-card-img"
                  loading="lazy"
                />
              </div>
              <div className="principle-card-body">
                <h4>Root Moisture &amp; Aeration (Whapasa)</h4>
                <p>
                  Maintaining a 50:50 air-to-water balance in the rhizosphere prevents stagnant waterlogging and accelerates root uptake of biological nutrients.
                </p>
              </div>
            </div>

            <div className="principle-card">
              <div className="principle-media-wrap">
                <img
                  src={IMAGES.practices.biologicalBuffer}
                  alt="Companion flowers buffering crops"
                  className="principle-card-img"
                  loading="lazy"
                />
              </div>
              <div className="principle-card-body">
                <h4>Natural Pest Buffer Zones</h4>
                <p>
                  Border crops of marigold, mustard, and sunflower attract beneficial predatory insects like ladybirds and hoverflies, minimizing pest damage naturally.
                </p>
              </div>
            </div>
          </div>

          {/* DIY Bio-Inputs & Organic Formulations Guide */}
          <section className="gogreen-recipes-section" style={{ marginTop: '36px' }}>
            <BioFertilizerGuide />
          </section>

          {/* Pledge Action Strip */}
          <section className="pledge-banner-section">
            <div className="pledge-banner-card">
              <div className="pledge-banner-text">
                <span className="pledge-badge">VERIFIED CREDENTIAL</span>
                <h3>Join the Sustainable Farmer Community</h3>
                <p>
                  Commit to eliminating toxic chemicals, conserving groundwater, and regenerating living soil. Receive a verifiable digital certificate.
                </p>
              </div>
              <button
                type="button"
                className="btn-primary btn-pledge-launch"
                onClick={() => setIsPledgeModalOpen(true)}
              >
                Sign Green Pledge
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Sustainable Farmer Pledge Modal */}
      <GreenPledgeModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
      />
    </div>
  );
}
