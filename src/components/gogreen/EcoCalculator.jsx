import React, { useState } from 'react';

export default function EcoCalculator() {
  const [acres, setAcres] = useState(3);
  const [irrigation, setIrrigation] = useState('drip'); // 'flood', 'sprinkler', 'drip'
  const [fertilizer, setFertilizer] = useState('organic'); // 'chemical', 'mixed', 'organic'
  const [residue, setResidue] = useState('mulch'); // 'burn', 'mulch'

  // Calculations
  // Water saved: Drip saves ~2.2M liters per acre per year over flood; Sprinkler ~1.1M
  let waterSavedPerAcre = 0;
  if (irrigation === 'drip') waterSavedPerAcre = 2200000;
  else if (irrigation === 'sprinkler') waterSavedPerAcre = 1100000;

  const totalWaterSaved = Math.round(waterSavedPerAcre * acres);

  // Carbon emissions avoided:
  // Mulching/Bio-decomposer avoids 3.2 tons CO2 per acre
  // Organic fertilizer avoids ~0.45 tons CO2 per acre
  let co2AvoidedKg = 0;
  if (residue === 'mulch') co2AvoidedKg += 3200 * acres;
  if (fertilizer === 'organic') co2AvoidedKg += 450 * acres;
  else if (fertilizer === 'mixed') co2AvoidedKg += 220 * acres;

  // Cost savings in chemical inputs
  let costSavingsPerAcre = 0;
  if (fertilizer === 'organic') costSavingsPerAcre += 6500;
  else if (fertilizer === 'mixed') costSavingsPerAcre += 3200;
  if (irrigation === 'drip') costSavingsPerAcre += 2500; // power & diesel saved

  const totalCostSavings = Math.round(costSavingsPerAcre * acres);

  return (
    <div className="eco-calculator-panel">
      <div className="calc-panel-header">
        <span className="panel-badge-tag">SIMULATION MODEL</span>
        <div>
          <h3 className="calc-panel-title">Farm Eco-Savings &amp; Carbon Footprint Simulator</h3>
          <p className="calc-panel-sub">
            Test how adopting regenerative agricultural practices conserves local aquifers and cuts cultivation expenses
          </p>
        </div>
      </div>

      <div className="eco-controls-grid">
        <div className="eco-control-field">
          <label className="eco-label" htmlFor="farm-acres-slider">Farm Size (Acres):</label>
          <div className="acres-range-wrap">
            <input
              id="farm-acres-slider"
              type="range"
              min="1"
              max="25"
              step="1"
              value={acres}
              onChange={(e) => setAcres(Number(e.target.value))}
              className="range-slider"
            />
            <span className="slider-val-badge">{acres} Acres</span>
          </div>
        </div>

        <div className="eco-control-field">
          <label className="eco-label">Irrigation System Adopted:</label>
          <div className="radio-buttons-group">
            <button
              type="button"
              className={`choice-btn ${irrigation === 'flood' ? 'active' : ''}`}
              onClick={() => setIrrigation('flood')}
            >
              Conventional Flood
            </button>
            <button
              type="button"
              className={`choice-btn ${irrigation === 'sprinkler' ? 'active' : ''}`}
              onClick={() => setIrrigation('sprinkler')}
            >
              Sprinkler System
            </button>
            <button
              type="button"
              className={`choice-btn ${irrigation === 'drip' ? 'active' : ''}`}
              onClick={() => setIrrigation('drip')}
            >
              Precision Drip
            </button>
          </div>
        </div>

        <div className="eco-control-field">
          <label className="eco-label">Fertilization Strategy:</label>
          <div className="radio-buttons-group">
            <button
              type="button"
              className={`choice-btn ${fertilizer === 'chemical' ? 'active' : ''}`}
              onClick={() => setFertilizer('chemical')}
            >
              100% Synthetic Urea/DAP
            </button>
            <button
              type="button"
              className={`choice-btn ${fertilizer === 'mixed' ? 'active' : ''}`}
              onClick={() => setFertilizer('mixed')}
            >
              Hybrid (50% Bio + 50% Chem)
            </button>
            <button
              type="button"
              className={`choice-btn ${fertilizer === 'organic' ? 'active' : ''}`}
              onClick={() => setFertilizer('organic')}
            >
              100% Organic &amp; Jeevamrit
            </button>
          </div>
        </div>

        <div className="eco-control-field">
          <label className="eco-label">Crop Residue (Stubble) Management:</label>
          <div className="radio-buttons-group">
            <button
              type="button"
              className={`choice-btn ${residue === 'burn' ? 'active danger' : ''}`}
              onClick={() => setResidue('burn')}
            >
              Stubble Burning (Discontinued)
            </button>
            <button
              type="button"
              className={`choice-btn ${residue === 'mulch' ? 'active' : ''}`}
              onClick={() => setResidue('mulch')}
            >
              In-situ Mulch / Happy Seeder
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Impact Cards */}
      <div className="eco-results-grid">
        <div className="eco-metric-card">
          <span className="impact-tag">GROUNDWATER CONSERVATION</span>
          <div className="impact-val-wrap">
            <strong className="impact-number">{(totalWaterSaved / 100000).toFixed(1)} Lakh</strong>
            <span className="impact-unit">Liters Conserved/Year</span>
          </div>
          <p className="impact-desc">
            Equal to the annual drinking water requirements of approximately {Math.round(totalWaterSaved / 1500)} citizens.
          </p>
        </div>

        <div className="eco-metric-card">
          <span className="impact-tag">CARBON SEQUESTRATION</span>
          <div className="impact-val-wrap">
            <strong className="impact-number">{(co2AvoidedKg / 1000).toFixed(1)} Tons</strong>
            <span className="impact-unit">CO2 Equivalent Avoided</span>
          </div>
          <p className="impact-desc">
            Prevents hazardous air particulate emissions and preserves vital topsoil organic carbon.
          </p>
        </div>

        <div className="eco-metric-card">
          <span className="impact-tag">REDUCED INPUT EXPENSES</span>
          <div className="impact-val-wrap">
            <strong className="impact-number">₹{totalCostSavings.toLocaleString()}</strong>
            <span className="impact-unit">INR Saved Annually</span>
          </div>
          <p className="impact-desc">
            Direct farmer savings through lower fertilizer purchases and reduced tubewell diesel run-hours.
          </p>
        </div>
      </div>
    </div>
  );
}
