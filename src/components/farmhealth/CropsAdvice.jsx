import React, { useState } from 'react';
import { getCropImage } from '../../data/imagesData';

/**
 * CropsAdvice Component
 * Displays favourable crops for the selected district with:
 * - Crop name
 * - Water requirement
 * - Sowing season
 * - Expected yield
 * - Soil suitability
 */

export default function CropsAdvice({ district }) {
  const [filterType, setFilterType] = useState('All');

  const crops = district?.favourableCrops || [];
  const cropTypes = ['All', ...new Set(crops.map((c) => c.type))];

  const filteredCrops =
    filterType === 'All' ? crops : crops.filter((c) => c.type === filterType);

  return (
    <div className="crops-advice-container">
      <div className="section-title-wrap">
        <div className="title-left">
          <span className="section-category-badge">AGRONOMY ADVISORY</span>
          <div>
            <h3 className="section-heading">Favourable Crops for {district?.name}</h3>
            <p className="section-sub">
              Recommended cultivars matched to {district?.climateZone} and {district?.soilType}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        {cropTypes.length > 1 && (
          <div className="filter-tabs-row">
            {cropTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`filter-tab-pill ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="crops-grid">
        {filteredCrops.map((crop, idx) => {
          const cropImg = getCropImage(crop.name, crop.type);
          return (
            <div key={idx} className="crop-card">
              {/* Crop Image */}
              <div className="crop-image-wrapper">
                <img
                  src={cropImg}
                  alt={crop.name}
                  className="crop-card-image"
                  loading="lazy"
                />
                <span className="crop-type-overlay">{crop.type}</span>
              </div>

              <div className="crop-card-body">
                {/* 1. Crop Name */}
                <div className="crop-header">
                  <h4 className="crop-name">{crop.name}</h4>
                  <span className={`water-badge water-${(crop.waterNeed || '').toLowerCase()}`}>
                    {crop.waterNeed} Water
                  </span>
                </div>

                <div className="crop-details-list">
                  {/* 2. Water Requirement */}
                  <div className="detail-item">
                    <span className="detail-label">Water Requirement:</span>
                    <span className="detail-value">{crop.waterNeed}</span>
                  </div>

                  {/* 3. Sowing Season */}
                  <div className="detail-item">
                    <span className="detail-label">Sowing Season:</span>
                    <span className="detail-value">{crop.season}</span>
                  </div>

                  {/* 4. Expected Yield */}
                  <div className="detail-item">
                    <span className="detail-label">Expected Yield:</span>
                    <span className="detail-value highlight">{crop.yield}</span>
                  </div>

                  {/* 5. Soil Suitability */}
                  <div className="detail-item">
                    <span className="detail-label">Soil Suitability:</span>
                    <span className="detail-value">{crop.soilSuitability || district?.soilType}</span>
                  </div>
                </div>

                <div className="crop-card-footer">
                  <span className="crop-status-check">Favourable for {district?.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
