import React, { useState, useRef, useEffect } from 'react';
import { INDIAN_STATES, DISTRICTS_DATA, searchDistricts } from '../../data/localitiesData';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function BuyerLocationPicker() {
  const { buyerLocation, setBuyerLocation } = useMarketplace();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState(buyerLocation?.stateId || 'PB');
  const [districtQuery, setDistrictQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const matchingDistricts = searchDistricts(selectedStateId, districtQuery);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDistrict = (district) => {
    setBuyerLocation({
      stateId: district.stateId,
      stateName: district.stateName,
      districtId: district.id,
      districtName: district.name,
      lat: district.lat,
      lon: district.lon
    });
    setIsEditing(false);
    setShowDropdown(false);
  };

  const presets = [
    { name: 'Ludhiana, Punjab', districtId: 'pb-ludhiana' },
    { name: 'Amritsar, Punjab', districtId: 'pb-amritsar' },
    { name: 'Pune, Maharashtra', districtId: 'mh-pune' },
    { name: 'Jaipur, Rajasthan', districtId: 'rj-jaipur' },
    { name: 'Bengaluru, Karnataka', districtId: 'ka-bengaluru' }
  ];

  const handleSelectPreset = (districtId) => {
    const d = DISTRICTS_DATA.find((item) => item.id === districtId);
    if (d) {
      handleSelectDistrict(d);
    }
  };

  return (
    <div className="buyer-location-panel">
      <div className="location-panel-inner">
        <div className="location-left">
          <span className="location-panel-tag">DELIVERY HUB</span>
          <div>
            <div className="location-title-row">
              <span className="location-label">Your Delivery / Search Area:</span>
              <strong className="location-current">
                {buyerLocation?.districtName}, {buyerLocation?.stateName}
              </strong>
              <button
                type="button"
                className="btn-change-location"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Close' : 'Change Locality'}
              </button>
            </div>
            <p className="location-hint">
              Products below are automatically computed &amp; sorted from <strong>closest to farthest</strong> relative to this location.
            </p>
          </div>
        </div>

        {/* Quick Test Location Switchers */}
        <div className="location-quick-test">
          <span className="test-label">Test Sorting From:</span>
          <div className="test-pills">
            {presets.map((preset) => (
              <button
                key={preset.districtId}
                type="button"
                className={`test-pill ${buyerLocation?.districtId === preset.districtId ? 'active' : ''}`}
                onClick={() => handleSelectPreset(preset.districtId)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="location-editor-dropdown" ref={dropdownRef}>
          <div className="editor-grid">
            <div className="editor-field">
              <label className="field-label" htmlFor="buyer-state-select">Select State:</label>
              <select
                id="buyer-state-select"
                className="form-control"
                value={selectedStateId}
                onChange={(e) => {
                  setSelectedStateId(e.target.value);
                  setDistrictQuery('');
                }}
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="editor-field">
              <label className="field-label" htmlFor="buyer-district-input">Select or Type District:</label>
              <input
                id="buyer-district-input"
                type="text"
                className="form-control"
                placeholder="Search district in selected state..."
                value={districtQuery}
                onChange={(e) => {
                  setDistrictQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />

              {showDropdown && matchingDistricts.length > 0 && (
                <div className="editor-districts-list">
                  {matchingDistricts.map((d) => (
                    <div
                      key={d.id}
                      className="editor-district-row"
                      onClick={() => handleSelectDistrict(d)}
                    >
                      <strong>{d.name}</strong>
                      <span>({d.climateZone})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
