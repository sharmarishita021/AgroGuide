import React, { useState } from 'react';
import { IMAGES } from '../../data/imagesData';

const COMMON_SYMPTOMS = [
  {
    id: 'yellow-veins',
    label: 'Yellowing leaves with green veins (Chlorosis)',
    diagnosis: 'Iron / Zinc Micronutrient Deficiency',
    confidence: 'High (88%)',
    remedy: 'Foliar spray of Chelated Zinc (0.5%) + Ferrous Sulphate (0.5%) with 1% citric acid early morning.'
  },
  {
    id: 'white-powder',
    label: 'White powdery coating on upper leaf surface',
    diagnosis: 'Powdery Mildew (Fungal Infection)',
    confidence: 'High (95%)',
    remedy: 'Spray Wettable Sulphur (2g/L) or organic Sour Buttermilk solution (50ml/L fermented buttermilk).'
  },
  {
    id: 'dead-heart',
    label: 'Central shoot wilts and dies easily pulled out (Dead heart)',
    diagnosis: 'Stem Borer / Shoot Fly Larvae Attack',
    confidence: 'High (92%)',
    remedy: 'Install 5 light/pheromone traps per acre; release Trichogramma chilonis egg parasitoids or apply Cartap Hydrochloride 4G.'
  },
  {
    id: 'curled-leaves',
    label: 'Leaves curling upward with sticky honeydew drops',
    diagnosis: 'Sucking Pests (Aphids / Whitefly)',
    confidence: 'Moderate (85%)',
    remedy: 'Install yellow sticky traps (15 traps/acre); spray 1500 ppm Neem Oil (5ml/L) or Verticillium lecanii bio-fungicide.'
  },
  {
    id: 'water-soaked',
    label: 'Water-soaked brownish lesions on fruits or pods',
    diagnosis: 'Anthracnose / Fruit Rot',
    confidence: 'High (90%)',
    remedy: 'Improve drainage and avoid overhead sprinkler wetting; spray Copper Oxychloride 50 WP (2.5g/L) or Trichoderma.'
  }
];

export default function SymptomChecker() {
  const [selectedSymptomId, setSelectedSymptomId] = useState(COMMON_SYMPTOMS[0].id);

  const activeDiagnosis = COMMON_SYMPTOMS.find(s => s.id === selectedSymptomId) || COMMON_SYMPTOMS[0];

  return (
    <div className="extra-feature-card symptom-checker-card">
      <div className="card-media-banner">
        <img
          src={IMAGES.tools.symptomChecker}
          alt="Agronomist field diagnostic inspection"
          className="card-banner-img"
        />
        <div className="card-media-overlay">
          <span className="card-tag">PATHOLOGY &amp; PESTS</span>
          <h4 className="feature-title">Crop Disease &amp; Pest Symptom Diagnostic</h4>
        </div>
      </div>

      <div className="card-body-content">
        <p className="feature-sub">
          Observe plant leaf, stem, or fruit distress symptoms to retrieve instant non-toxic bio-remedies
        </p>

        <div className="symptom-selector-wrap">
          <label className="field-label" htmlFor="symptom-select">Select Observable Distress Symptom:</label>
          <select
            id="symptom-select"
            className="form-control"
            value={selectedSymptomId}
            onChange={(e) => setSelectedSymptomId(e.target.value)}
          >
            {COMMON_SYMPTOMS.map((sym) => (
              <option key={sym.id} value={sym.id}>
                {sym.label}
              </option>
            ))}
          </select>
        </div>

        <div className="diagnosis-output-box">
          <div className="diagnosis-badge-row">
            <span className="diag-tag">Identified Diagnosis</span>
            <span className="diag-confidence">Confidence: {activeDiagnosis.confidence}</span>
          </div>
          <h5 className="diag-title">{activeDiagnosis.diagnosis}</h5>

          <div className="diag-remedy-wrap">
            <div className="remedy-label-box">
              <span className="remedy-tag">RECOMMENDED DEFENSE</span>
            </div>
            <div>
              <strong>Eco-Friendly Agronomic Remedy:</strong>
              <p className="remedy-text">{activeDiagnosis.remedy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
