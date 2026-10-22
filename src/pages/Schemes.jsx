import React, { useState, useMemo } from 'react';
import { SCHEMES_DATA } from '../data/schemesData';
import { rankSchemes } from '../utils/relevance';
import { useDebounce } from '../hooks/useDebounce';
import { useMarketplace } from '../context/MarketplaceContext';
import { IMAGES } from '../data/imagesData';
import SchemeFilter from '../components/schemes/SchemeFilter';
import SchemeCard from '../components/schemes/SchemeCard';
import SchemeDetailModal from '../components/schemes/SchemeDetailModal';

export default function Schemes() {
  const { savedSchemes, toggleSaveScheme } = useMarketplace();

  // Filters state
  const [filters, setFilters] = useState({
    searchTerm: '',
    stateId: '',
    category: 'All Categories',
    landSize: 'all'
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'saved'
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Debounce search term by 250ms for smooth typing
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 250);

  // Compute dynamically ranked schemes from most to least relevant
  const rankedSchemes = useMemo(() => {
    return rankSchemes(SCHEMES_DATA, {
      ...filters,
      searchTerm: debouncedSearchTerm
    });
  }, [filters, debouncedSearchTerm]);

  // Handle saved tab filter
  const displayedSchemes = useMemo(() => {
    if (activeTab === 'saved') {
      return rankedSchemes.filter((s) => savedSchemes.includes(s.id));
    }
    return rankedSchemes;
  }, [rankedSchemes, activeTab, savedSchemes]);

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      stateId: '',
      category: 'All Categories',
      landSize: 'all'
    });
  };

  return (
    <div className="schemes-page container">
      {/* Page Header with Hero Banner */}
      <div className="page-header-with-hero">
        <div className="header-image-container">
          <img
            src={IMAGES.heroes.schemes}
            alt="Indian farmer supported by government agrarian schemes"
            className="header-hero-img"
          />
          <div className="header-overlay-gradient"></div>
        </div>

        <div className="header-text-content">
          <span className="page-eyebrow">GOVERNMENT BENEFIT MATCHING</span>
          <h1 className="page-title">Ranked Agricultural Subsidies &amp; Schemes</h1>
          <p className="page-lead">
            Find central and state government schemes dynamically ordered from <strong>most to least relevant</strong> based
            on your farmland location, category, and holding size.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <section className="schemes-filter-section">
        <SchemeFilter
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />
      </section>

      {/* Tabs and Results Counter */}
      <div className="schemes-results-header">
        <div className="tabs-bar">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Subsidies ({rankedSchemes.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Bookmarked Schemes ({savedSchemes.length})
          </button>
        </div>

        <div className="ranking-indicator">
          <span>Sort Order: </span>
          <strong>Highest Match → Lowest Match</strong>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="schemes-grid">
        {displayedSchemes.length > 0 ? (
          displayedSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onSelectScheme={(s) => setSelectedScheme(s)}
              isSaved={savedSchemes.includes(scheme.id)}
              onToggleSave={toggleSaveScheme}
            />
          ))
        ) : (
          <div className="empty-schemes-box">
            <span className="empty-notice-tag">NO SCHEMES MATCHED</span>
            <h4>No Subsidies Found for Selected Filters</h4>
            <p>
              Try widening your criteria by setting State to "All India" or resetting category filters.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Scheme Detail Application Modal */}
      <SchemeDetailModal
        scheme={selectedScheme}
        isOpen={Boolean(selectedScheme)}
        onClose={() => setSelectedScheme(null)}
      />
    </div>
  );
}
