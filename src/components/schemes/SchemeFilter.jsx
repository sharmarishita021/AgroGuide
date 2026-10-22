import React from 'react';
import { SCHEME_CATEGORIES, LAND_SIZES } from '../../data/schemesData';
import { INDIAN_STATES } from '../../data/localitiesData';

export default function SchemeFilter({ filters, onFilterChange, onReset }) {
  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="schemes-filter-panel">
      <div className="filter-panel-header">
        <div className="filter-header-left">
          <span className="filter-tag">SEARCH &amp; RANK</span>
          <div>
            <h4 className="filter-panel-title">Smart Scheme Search &amp; Relevance Filter</h4>
            <p className="filter-panel-sub">
              Subsidies are dynamically ordered from <strong>most to least relevant</strong> based on your place and category.
            </p>
          </div>
        </div>
        <button type="button" className="reset-filters-btn" onClick={onReset}>
          Reset Filters
        </button>
      </div>

      <div className="filters-grid">
        {/* Search Term */}
        <div className="filter-field">
          <label className="filter-label" htmlFor="scheme-search-input">Search Keywords / Scheme Name:</label>
          <div className="input-with-label-prefix">
            <input
              id="scheme-search-input"
              type="text"
              className="form-control"
              placeholder="e.g. Solar pump, subsidy, PM-KISAN, drip..."
              value={filters.searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e.target.value)}
            />
          </div>
        </div>

        {/* Place / State Filter */}
        <div className="filter-field">
          <label className="filter-label" htmlFor="scheme-state-select">State / Farmland Region:</label>
          <select
            id="scheme-state-select"
            className="form-control"
            value={filters.stateId}
            onChange={(e) => handleInputChange('stateId', e.target.value)}
          >
            <option value="">All India (National &amp; Central)</option>
            {INDIAN_STATES.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} ({st.id})
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-field">
          <label className="filter-label" htmlFor="scheme-category-select">Scheme Category:</label>
          <select
            id="scheme-category-select"
            className="form-control"
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            {SCHEME_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Land Holding Size */}
        <div className="filter-field">
          <label className="filter-label" htmlFor="scheme-land-size-select">Land Holding Size:</label>
          <select
            id="scheme-land-size-select"
            className="form-control"
            value={filters.landSize}
            onChange={(e) => handleInputChange('landSize', e.target.value)}
          >
            {LAND_SIZES.map((ls) => (
              <option key={ls.id} value={ls.id}>
                {ls.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
