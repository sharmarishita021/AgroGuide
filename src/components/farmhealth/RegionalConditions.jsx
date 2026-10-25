import React from 'react';

/**
 * RegionalConditions Component
 * Displays agriculture-focused regional conditions for the selected State and District.
 * All metrics are derived from static district data (DISTRICTS_DATA) without external weather APIs.
 */
export default function RegionalConditions({ district }) {
  if (!district) return null;

  return (
    <div className="regional-conditions-dashboard">
      <div className="regional-conditions-header">
        <div className="regional-header-info">
          <span className="regional-badge">REGIONAL AGRICULTURAL DASHBOARD</span>
          {/* Location */}
          <h2 className="regional-location-title">
            {district.name}, {district.stateName}
          </h2>
          <p className="regional-sub-text">
            Agro-Climatic Zone: <strong>{district.climateZone}</strong>
          </p>
        </div>

        <div className="regional-header-status">
          <span className="regional-status-pill">Static Regional Agro-Data</span>
        </div>
      </div>

      {/* Regional Conditions Grid */}
      <div className="regional-conditions-grid">
        {/* 1. Humidity */}
        <div className="condition-card">
          <span className="condition-label">Humidity</span>
          <strong className="condition-value">{district.humidity || '55%'}</strong>
          <span className="condition-note">Atmospheric moisture level</span>
        </div>

        {/* 2. Wind Speed */}
        <div className="condition-card">
          <span className="condition-label">Wind Speed</span>
          <strong className="condition-value">{district.windSpeed || '10 km/h'}</strong>
          <span className="condition-note">Average surface velocity</span>
        </div>

        {/* 3. Annual Rainfall */}
        <div className="condition-card">
          <span className="condition-label">Annual Rainfall</span>
          <strong className="condition-value">
            {district.annualRainfall || district.avgAnnualRainfall || '650 mm'}
          </strong>
          <span className="condition-note">Typical yearly precipitation</span>
        </div>

        {/* 4. Soil Type */}
        <div className="condition-card">
          <span className="condition-label">Soil Type</span>
          <strong className="condition-value">{district.soilType}</strong>
          <span className="condition-note">Predominant district soil</span>
        </div>

        {/* 5. Soil Condition */}
        <div className="condition-card">
          <span className="condition-label">Soil Condition</span>
          <strong className="condition-value">
            {district.soilCondition || 'Well-drained agricultural soil'}
          </strong>
          <span className="condition-note">Texture &amp; moisture behavior</span>
        </div>

        {/* 6. Rain Condition */}
        <div className="condition-card">
          <span className="condition-label">Rain Condition</span>
          <strong className="condition-value">
            {district.rainCondition || 'Seasonal monsoon showers'}
          </strong>
          <span className="condition-note">Regional precipitation pattern</span>
        </div>

        {/* 7. Groundwater Status */}
        <div className="condition-card condition-card-highlight">
          <span className="condition-label">Groundwater Status</span>
          <strong className="condition-value">{district.groundwaterStatus}</strong>
          <span className="condition-note">Aquifer exploitation category</span>
        </div>
      </div>
    </div>
  );
}
