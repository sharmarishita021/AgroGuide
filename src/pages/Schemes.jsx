import React, { useState, useEffect } from 'react';
import './Schemes.css';

// List of states for the dropdown
const states = [
  'All',
  'Punjab',
  'West Bengal',
  'Maharashtra',
  'Karnataka',
  'Telangana',
  'Andhra Pradesh',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Rajasthan'
];

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  // User inputs (Step 1)
  const [selectedState, setSelectedState] = useState('All');
  const [income, setIncome] = useState('');

  // Live search input (Step 2)
  const [search, setSearch] = useState('');

  // Fetch the schemes.json file directly using fetch()
  useEffect(() => {
    fetch('./Schemes.json')
      .then((response) => response.json())
      .then((data) => {
        setSchemes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching schemes:', error);
        setLoading(false);
      });
  }, []);

  // Filter schemes based on state, income, and search
  const filteredSchemes = schemes.filter((scheme) => {
    // 1. Filter by State
    const matchState =
      selectedState === 'All' ||
      scheme.state === 'All India' ||
      scheme.state.toLowerCase() === selectedState.toLowerCase();

    // 2. Filter by Annual Income
    let matchIncome = true;
    if (income !== '') {
      const userIncome = Number(income);
      if (scheme.maxIncome !== null && userIncome > scheme.maxIncome) {
        matchIncome = false;
      }
    }

    // 3. Filter by Live Search Keyword
    const searchLower = search.toLowerCase();
    const nameMatch = scheme.name.toLowerCase().includes(searchLower);
    const categoryMatch = scheme.category.toLowerCase().includes(searchLower);
    const benefitMatch = scheme.benefit.toLowerCase().includes(searchLower);
    const descMatch = scheme.description.toLowerCase().includes(searchLower);

    const matchSearch =
      search === '' || nameMatch || categoryMatch || benefitMatch || descMatch;

    return matchState && matchIncome && matchSearch;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <span className="portal-badge">🌾 Kisan Agriculture Portal</span>
        <h1>Find Government Schemes</h1>
        <p>Check your eligibility by entering your state and household income.</p>
      </div>

      {/* Step 1: State and Income Inputs */}
      <div className="filter-box">
        <h3>Step 1: Enter Your Details</h3>
        <div className="input-row">
     
          <div className="form-group">
            <label>Select State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All States (National)' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Income Input */}
          <div className="form-group">
            <label>Annual Family Income (₹)</label>
            <input
              type="number"
              placeholder="e.g. 200000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Income Buttons */}
        <div className="preset-buttons">
          <span>Quick Select:</span>
          <button type="button" onClick={() => setIncome('150000')}>₹1.5 Lakh</button>
          <button type="button" onClick={() => setIncome('200000')}>₹2.0 Lakh</button>
          <button type="button" onClick={() => setIncome('250000')}>₹2.5 Lakh</button>
          <button type="button" onClick={() => setIncome('300000')}>₹3.0 Lakh</button>
          <button type="button" onClick={() => setIncome('')}>Clear</button>
        </div>
      </div>

      {/* Step 2: Live Search Input */}
      <div className="search-box">
        <label>Search Schemes Directly</label>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Type scheme name, keyword (e.g. Kisan, Tractor, Solar, Bima)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Counter */}
      <div className="results-info">
        <p>
          Found <strong>{filteredSchemes.length}</strong> matching scheme
          {filteredSchemes.length !== 1 ? 's' : ''}
          {selectedState !== 'All' ? ` in ${selectedState}` : ''}
          {income !== '' ? ` (Income ≤ ₹${Number(income).toLocaleString('en-IN')})` : ''}
        </p>

        {(selectedState !== 'All' || income !== '' || search !== '') && (
          <button
            className="reset-btn"
            onClick={() => {
              setSelectedState('All');
              setIncome('');
              setSearch('');
            }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* Schemes Cards Grid */}
      {loading ? (
        <div className="loading-state">
          <p>Loading schemes from API...</p>
        </div>
      ) : filteredSchemes.length > 0 ? (
        <div className="cards-grid">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card">
              {/* Badges */}
              <div className="tags-row">
                <span className="state-tag">{scheme.state}</span>
                <span className="category-tag">{scheme.category}</span>
                <span className="income-tag">
                  {scheme.maxIncome
                    ? `Income limit: ₹${(scheme.maxIncome / 100000).toFixed(1)}L`
                    : 'No Income Limit'}
                </span>
              </div>

              {/* Title */}
              <h2>{scheme.name}</h2>

              {/* Benefit */}
              <div className="benefit-box">
                <strong>🎁 Benefit:</strong> {scheme.benefit}
              </div>

              {/* Description */}
              <p className="description">{scheme.description}</p>

              {/* Eligibility */}
              <div className="eligibility-box">
                <span className="eligibility-title">Who is Eligible:</span>
                <p>{scheme.eligibility}</p>
              </div>

              {/* Link */}
              <div className="card-bottom">
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-button"
                >
                  View Details & Apply →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-box">
          <h3>No schemes found</h3>
          <p>Try searching for a different keyword or resetting your filters.</p>
        </div>
      )}
    </div>
  );
}

export default Schemes;