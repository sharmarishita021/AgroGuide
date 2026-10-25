import React, { useState } from 'react';
import { IMAGES } from '../../data/imagesData';

const SOIL_TYPES = [
  { id: 'alluvial', name: 'Alluvial Loamy Soil', organicMatter: 'Medium', ph: '7.0 - 7.5' },
  { id: 'black', name: 'Black Cotton Soil (Vertisol)', organicMatter: 'Low to Medium', ph: '7.5 - 8.5' },
  { id: 'red', name: 'Red & Laterite Soil', organicMatter: 'Low', ph: '5.5 - 6.5' },
  { id: 'sandy', name: 'Sandy Loam Soil', organicMatter: 'Very Low', ph: '7.2 - 8.2' },
  { id: 'clay', name: 'Heavy Clay Soil', organicMatter: 'Medium to High', ph: '7.8 - 8.3' }
];

const TARGET_CROPS = [
  { id: 'wheat', name: 'Wheat (Cereal)', baseN: 50, baseP: 25, baseK: 15, manureTon: 4 },
  { id: 'paddy', name: 'Paddy / Basmati Rice', baseN: 60, baseP: 30, baseK: 20, manureTon: 5 },
  { id: 'cotton', name: 'Cotton (Cash Crop)', baseN: 70, baseP: 35, baseK: 25, manureTon: 6 },
  { id: 'mustard', name: 'Mustard (Oilseed)', baseN: 40, baseP: 20, baseK: 15, manureTon: 3 },
  { id: 'sugarcane', name: 'Sugarcane', baseN: 100, baseP: 50, baseK: 40, manureTon: 8 },
  { id: 'pulses', name: 'Chickpea / Moong (Pulse)', baseN: 15, baseP: 25, baseK: 10, manureTon: 2 }
];

export default function SoilCalculator({ defaultSoilType = '' }) {
  const [selectedSoil, setSelectedSoil] = useState(() => {
    if (defaultSoilType) {
      const lower = defaultSoilType.toLowerCase();
      if (lower.includes('black')) return 'black';
      if (lower.includes('red')) return 'red';
      if (lower.includes('sandy')) return 'sandy';
      if (lower.includes('clay')) return 'clay';
    }
    return 'alluvial';
  });
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [acres, setAcres] = useState(2);
  const [acresError, setAcresError] = useState('');

  const cropData = TARGET_CROPS.find(c => c.id === selectedCrop) || TARGET_CROPS[0];
  const soilData = SOIL_TYPES.find(s => s.id === selectedSoil) || SOIL_TYPES[0];

  const handleAcresChange = (e) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) {
      setAcresError('Acreage must be greater than 0.');
    } else if (val > 100) {
      setAcresError('Maximum calculator limit is 100 acres.');
    } else {
      setAcresError('');
    }
    setAcres(e.target.value === '' ? '' : Math.max(0.1, val || 0.1));
  };

  // Calculate adjusted dosages
  let multiplier = 1.0;
  if (selectedSoil === 'sandy') multiplier = 1.15; // needs more split nitrogen
  if (selectedSoil === 'red') multiplier = 1.1; // lower native nutrient retention
  if (selectedSoil === 'black') multiplier = 0.95; // higher native cation exchange

  const safeAcres = typeof acres === 'number' && !isNaN(acres) ? acres : 1;
  const nitrogen = Math.round(cropData.baseN * multiplier * safeAcres);
  const phosphorus = Math.round(cropData.baseP * multiplier * safeAcres);
  const potassium = Math.round(cropData.baseK * multiplier * safeAcres);
  const totalManure = Math.round(cropData.manureTon * safeAcres);

  return (
    <div className="extra-feature-card soil-calc-card">
      <div className="card-media-banner">
        <img
          src={IMAGES.tools.soilCalculator}
          alt="Soil nutrient analysis in agrarian farmland"
          className="card-banner-img"
        />
        <div className="card-media-overlay">
          <span className="card-tag">NUTRIENT OPTIMIZATION</span>
          <h4 className="feature-title">Smart Soil N-P-K &amp; Fertilizer Calculator</h4>
        </div>
      </div>

      <div className="card-body-content">
        <p className="feature-sub">
          Formulate precision nutrient dosages based on district soil characteristics and planned crop acreage
        </p>

        <div className="calc-inputs-row">
          <div className="calc-field">
            <label className="field-label" htmlFor="soil-profile-select">Soil Profile:</label>
            <select
              id="soil-profile-select"
              className="form-control"
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value)}
            >
              {SOIL_TYPES.map((soil) => (
                <option key={soil.id} value={soil.id}>
                  {soil.name} (pH {soil.ph})
                </option>
              ))}
            </select>
          </div>

          <div className="calc-field">
            <label className="field-label" htmlFor="target-crop-select">Target Crop:</label>
            <select
              id="target-crop-select"
              className="form-control"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              {TARGET_CROPS.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name}
                </option>
              ))}
            </select>
          </div>

          <div className="calc-field acres-field">
            <label className="field-label" htmlFor="acres-input">Land Area (Acres):</label>
            <input
              id="acres-input"
              type="number"
              min="0.5"
              max="100"
              step="0.5"
              className={`form-control ${acresError ? 'input-error' : ''}`}
              value={acres}
              onChange={handleAcresChange}
            />
            {acresError && <span className="field-error-message">{acresError}</span>}
          </div>
        </div>

        {/* Formulated Results Grid */}
        <div className="calc-results-grid">
          <div className="result-metric-box">
            <span className="metric-name">Nitrogen (N)</span>
            <strong className="metric-qty">{nitrogen} kg</strong>
            <span className="metric-source">Equiv: {Math.round(nitrogen * 2.17)} kg Urea</span>
          </div>

          <div className="result-metric-box">
            <span className="metric-name">Phosphorus (P2O5)</span>
            <strong className="metric-qty">{phosphorus} kg</strong>
            <span className="metric-source">Equiv: {Math.round(phosphorus * 2.17)} kg DAP</span>
          </div>

          <div className="result-metric-box">
            <span className="metric-name">Potassium (K2O)</span>
            <strong className="metric-qty">{potassium} kg</strong>
            <span className="metric-source">Equiv: {Math.round(potassium * 1.67)} kg MOP</span>
          </div>

          <div className="result-metric-box organic-box">
            <span className="metric-name">Organic FYM / Compost</span>
            <strong className="metric-qty">{totalManure} Tons</strong>
            <span className="metric-source">Basal application pre-sowing</span>
          </div>
        </div>

        <div className="soil-advisory-note">
          <strong>Soil Profile Note ({soilData.name}):</strong> Optimal pH range is {soilData.ph} with native organic matter tier '{soilData.organicMatter}'. Apply 50% nitrogen as basal and the remaining 50% split at crown-root initiation and flowering.
        </div>
      </div>
    </div>
  );
}
