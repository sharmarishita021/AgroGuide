import React, { useState, useEffect, useRef } from 'react';
import { INDIAN_STATES, DISTRICTS_DATA, searchStates, searchDistricts } from '../../data/localitiesData';

export default function LocalitySelector({ selectedDistrict, onSelectDistrict }) {
  const [stateQuery, setStateQuery] = useState(selectedDistrict ? selectedDistrict.stateName : 'Punjab');
  const [districtQuery, setDistrictQuery] = useState(selectedDistrict ? selectedDistrict.name : 'Ludhiana');

  const [selectedState, setSelectedState] = useState(
    selectedDistrict ? INDIAN_STATES.find(s => s.id === selectedDistrict.stateId) : INDIAN_STATES[0]
  );

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const stateDropdownRef = useRef(null);
  const districtDropdownRef = useRef(null);

  // Filtered lists based on current user typed queries
  const matchingStates = searchStates(stateQuery);
  const matchingDistricts = searchDistricts(selectedState ? selectedState.id : null, districtQuery);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setShowStateDropdown(false);
      }
      if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
        setShowDistrictDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStateChange = (e) => {
    const val = e.target.value;
    setStateQuery(val);
    setShowStateDropdown(true);

    // If query matches a state exactly
    const exact = INDIAN_STATES.find(s => s.name.toLowerCase() === val.toLowerCase());
    if (exact) {
      setSelectedState(exact);
    }
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setStateQuery(state.name);
    setShowStateDropdown(false);

    // Reset or auto-select first district of that state
    const firstDistrict = DISTRICTS_DATA.find(d => d.stateId === state.id);
    if (firstDistrict) {
      setDistrictQuery(firstDistrict.name);
      onSelectDistrict(firstDistrict);
    } else {
      setDistrictQuery('');
    }
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setDistrictQuery(val);
    setShowDistrictDropdown(true);
  };

  const handleSelectDistrict = (district) => {
    setDistrictQuery(district.name);
    setShowDistrictDropdown(false);
    onSelectDistrict(district);
  };

  // Quick preset pills
  const presets = [
    { stateId: 'PB', districtId: 'pb-ludhiana', label: 'Punjab - Ludhiana' },
    { stateId: 'MH', districtId: 'mh-pune', label: 'Maharashtra - Pune' },
    { stateId: 'HR', districtId: 'hr-karnal', label: 'Haryana - Karnal' },
    { stateId: 'RJ', districtId: 'rj-jaipur', label: 'Rajasthan - Jaipur' },
    { stateId: 'KA', districtId: 'ka-bengaluru', label: 'Karnataka - Bengaluru' }
  ];

  const handleSelectPreset = (preset) => {
    const dist = DISTRICTS_DATA.find(d => d.id === preset.districtId);
    if (dist) {
      const st = INDIAN_STATES.find(s => s.id === dist.stateId);
      setSelectedState(st);
      setStateQuery(dist.stateName);
      setDistrictQuery(dist.name);
      onSelectDistrict(dist);
    }
  };

  return (
    <div className="locality-selector-card">
      <div className="selector-header">
        <span className="selector-badge-tag">GEOGRAPHIC TELEMETRY</span>
        <div>
          <h3 className="selector-title">Select Your Farm Locality</h3>
          <p className="selector-desc">
            Type or search across Indian states and districts to synchronize live meteorological models
          </p>
        </div>
      </div>

      <div className="selector-grid">
        {/* State Autocomplete Input */}
        <div className="selector-field" ref={stateDropdownRef}>
          <label className="field-label" htmlFor="state-input">
            State / Union Territory:
          </label>
          <div className="input-affix-wrapper">
            <span className="input-prefix-label">STATE:</span>
            <input
              id="state-input"
              type="text"
              className="form-control autocomplete-input"
              placeholder="Type State (e.g. Punjab, Maharashtra)..."
              value={stateQuery}
              onChange={handleStateChange}
              onFocus={() => setShowStateDropdown(true)}
              autoComplete="off"
            />
          </div>

          {showStateDropdown && matchingStates.length > 0 && (
            <div className="autocomplete-dropdown-list">
              {matchingStates.map((st) => (
                <div
                  key={st.id}
                  className={`dropdown-item ${selectedState?.id === st.id ? 'active' : ''}`}
                  onClick={() => handleSelectState(st)}
                >
                  <span className="item-name">{st.name}</span>
                  <span className="item-badge">{st.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* District Autocomplete Input */}
        <div className="selector-field" ref={districtDropdownRef}>
          <label className="field-label" htmlFor="district-input">
            District:
          </label>
          <div className="input-affix-wrapper">
            <span className="input-prefix-label">DISTRICT:</span>
            <input
              id="district-input"
              type="text"
              className="form-control autocomplete-input"
              placeholder="Type District (e.g. Ludhiana, Pune)..."
              value={districtQuery}
              onChange={handleDistrictChange}
              onFocus={() => setShowDistrictDropdown(true)}
              autoComplete="off"
            />
          </div>

          {showDistrictDropdown && matchingDistricts.length > 0 && (
            <div className="autocomplete-dropdown-list">
              {matchingDistricts.map((d) => (
                <div
                  key={d.id}
                  className={`dropdown-item ${selectedDistrict?.id === d.id ? 'active' : ''}`}
                  onClick={() => handleSelectDistrict(d)}
                >
                  <div>
                    <strong className="item-name">{d.name}</strong>
                    <span className="item-meta">({d.climateZone} • {d.soilType})</span>
                  </div>
                  <span className="item-badge">Select</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preset Quick Selectors */}
      <div className="selector-presets-row">
        <span className="presets-label">Popular Agricultural Districts:</span>
        <div className="presets-group">
          {presets.map((p) => (
            <button
              key={p.districtId}
              type="button"
              className={`preset-btn ${selectedDistrict?.id === p.districtId ? 'active' : ''}`}
              onClick={() => handleSelectPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Selected Summary Strip */}
      {selectedDistrict && (
        <div className="locality-active-strip">
          <span className="strip-tag">ACTIVE TELEMETRY TARGET</span>
          <span className="strip-text">
            <strong>{selectedDistrict.name}</strong>, {selectedDistrict.stateName}
          </span>
          <span className="strip-details">
            Soil: <em>{selectedDistrict.soilType}</em> | Aquifer: <em>{selectedDistrict.groundwaterStatus}</em>
          </span>
        </div>
      )}
    </div>
  );
}
