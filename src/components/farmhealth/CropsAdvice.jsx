import React, { useState } from 'react';
import { getCropImage } from '../../data/imagesData';

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
              Scientifically proven high-yielding cultivars matched to {district?.climateZone} and {district?.soilType}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
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
      </div>

      <div className="crops-grid">
        {filteredCrops.map((crop, idx) => {
          const cropImg = getCropImage(crop.name);
          return (
            <div key={idx} className="crop-card">
              {/* Relevant Crop Image */}
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
                <div className="crop-header">
                  <h4 className="crop-name">{crop.name}</h4>
                  <span className={`water-badge water-${crop.waterNeed.toLowerCase()}`}>
                    Water: {crop.waterNeed}
                  </span>
                </div>

                <div className="crop-details-list">
                  <div className="detail-item">
                    <span className="detail-label">Sowing Season:</span>
                    <span className="detail-value">{crop.season}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estimated Yield:</span>
                    <span className="detail-value highlight">{crop.yield}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Soil Suitability:</span>
                    <span className="detail-value">{district?.soilType}</span>
                  </div>
                </div>

                <div className="crop-card-footer">
                  <span className="crop-status-check">Verified for Current Agro-Zone</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
