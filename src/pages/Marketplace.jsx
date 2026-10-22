import React, { useState, useMemo } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { calculateDistanceKm } from '../utils/distance';
import { PRODUCT_CATEGORIES } from '../data/marketplaceSeedData';
import { useDebounce } from '../hooks/useDebounce';
import { IMAGES } from '../data/imagesData';
import BuyerLocationPicker from '../components/marketplace/BuyerLocationPicker';
import ProductCard from '../components/marketplace/ProductCard';
import RateProductModal from '../components/marketplace/RateProductModal';
import AddProductModal from '../components/marketplace/AddProductModal';
import OrderModal from '../components/marketplace/OrderModal';

export default function Marketplace({ onOpenSellerAuth }) {
  const { products, buyerLocation } = useMarketplace();
  const { currentUser, isSellerAuthenticated, activeRole, setActiveRole } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'price-low', 'price-high', 'rating'

  // Modals state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [ratingProduct, setRatingProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 200);

  // Compute products with geographic distances and apply search / filters
  const processedProducts = useMemo(() => {
    // 1. Calculate distance for every product relative to buyerLocation
    const listWithDistance = products.map((prod) => {
      const distance = calculateDistanceKm(
        buyerLocation?.lat,
        buyerLocation?.lon,
        prod.lat,
        prod.lon
      );
      return { ...prod, distanceKm: distance };
    });

    // 2. Filter by search query, category, and organic status
    const filtered = listWithDistance.filter((prod) => {
      // Keyword search match
      if (debouncedSearch && debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase().trim();
        const matchTitle = prod.title.toLowerCase().includes(q);
        const matchDesc = prod.description.toLowerCase().includes(q);
        const matchFarmer = prod.farmerName.toLowerCase().includes(q);
        const matchDistrict = prod.district.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchFarmer && !matchDistrict) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'All Products' && prod.category !== selectedCategory) {
        return false;
      }

      // Organic match
      if (organicOnly && !prod.organicCertified) {
        return false;
      }

      return true;
    });

    // 3. Sort results: Default is CLOSEST TO FARTHEST
    filtered.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [products, buyerLocation, debouncedSearch, selectedCategory, organicOnly, sortBy]);

  const handleUploadClick = () => {
    if (!isSellerAuthenticated) {
      onOpenSellerAuth();
    } else {
      setIsAddProductModalOpen(true);
    }
  };

  return (
    <div className="marketplace-page container">
      {/* Page Header with Hero Banner */}
      <div className="page-header-with-hero">
        <div className="header-image-container">
          <img
            src={IMAGES.heroes.marketplace}
            alt="Direct agricultural produce marketplace exchange"
            className="header-hero-img"
          />
          <div className="header-overlay-gradient"></div>
        </div>

        <div className="header-text-content">
          <span className="page-eyebrow">DIRECT KISAN-TO-BUYER EXCHANGE</span>
          <h1 className="page-title">Agricultural Produce &amp; Equipment Marketplace</h1>
          <p className="page-lead">
            Buy directly from verified local growers with <strong>closest-to-farthest</strong> geographical distance sorting,
            real-time produce listings, and verified buyer quality ratings.
          </p>

          {/* Mode Switcher Banner */}
          <div className="marketplace-mode-bar">
            <div className="mode-toggle-group">
              <button
                type="button"
                className={`mode-btn ${activeRole === 'buyer' ? 'active' : ''}`}
                onClick={() => setActiveRole('buyer')}
              >
                Buyer Mode
              </button>
              <button
                type="button"
                className={`mode-btn ${activeRole === 'seller' ? 'active' : ''}`}
                onClick={() => {
                  if (!isSellerAuthenticated) {
                    onOpenSellerAuth();
                  } else {
                    setActiveRole('seller');
                  }
                }}
              >
                Seller Portal
              </button>
            </div>

            <div className="seller-quick-actions">
              {isSellerAuthenticated ? (
                <button
                  type="button"
                  className="btn-primary btn-upload-produce"
                  onClick={handleUploadClick}
                >
                  + Upload New Farm Produce (Real-Time)
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-outline-seller"
                  onClick={onOpenSellerAuth}
                >
                  Seller Login Required to Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Seller Active Notification Bar */}
      {isSellerAuthenticated && activeRole === 'seller' && (
        <div className="seller-status-banner">
          <div className="status-banner-left">
            <span>Logged in as Seller: <strong>{currentUser.name}</strong> ({currentUser.farmName || 'Farm'})</span>
            <span className="location-pill">{currentUser.district}, {currentUser.state}</span>
          </div>
          <button
            type="button"
            className="btn-primary btn-sm"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            Post Produce Now
          </button>
        </div>
      )}

      {/* Dynamic Proximity Target Picker */}
      <section className="marketplace-location-section">
        <BuyerLocationPicker />
      </section>

      {/* Search, Filter & Sorter Toolbar */}
      <section className="marketplace-controls-bar">
        <div className="search-field-wrap">
          <label className="field-prefix-tag" htmlFor="mkt-search-input">SEARCH:</label>
          <input
            id="mkt-search-input"
            type="text"
            className="form-control search-input"
            placeholder="Search wheat, rice, oranges, vermicompost, farmer name, district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="category-scroll-bar">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting and Organic Checkbox */}
        <div className="sort-and-filter-row">
          <div className="sort-dropdown-wrap">
            <label className="sort-label" htmlFor="mkt-sort-select">Sort Listings:</label>
            <select
              id="mkt-sort-select"
              className="form-control sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="distance">Closest to Farthest (Default Proximity)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Buyer Rating</option>
            </select>
          </div>

          <label className="organic-toggle-checkbox">
            <input
              type="checkbox"
              checked={organicOnly}
              onChange={(e) => setOrganicOnly(e.target.checked)}
            />
            <span>Certified Organic Only</span>
          </label>

          <span className="results-count-badge">
            Showing {processedProducts.length} Listings
          </span>
        </div>
      </section>

      {/* Products Grid */}
      <main className="products-grid-section">
        {processedProducts.length > 0 ? (
          <div className="products-grid">
            {processedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                distanceKm={prod.distanceKm}
                onRateClick={(p) => setRatingProduct(p)}
                onBuyClick={(p) => setOrderProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-marketplace-view">
            <span className="empty-notice-tag">NO PRODUCE FOUND</span>
            <h3>No Produce Matches Your Current Filters</h3>
            <p>
              Try clearing your search query or selecting "All Products" to browse available listings.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Products');
                setOrganicOnly(false);
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Rate Product Modal */}
      <RateProductModal
        product={ratingProduct}
        isOpen={Boolean(ratingProduct)}
        onClose={() => setRatingProduct(null)}
      />

      {/* Order Direct Purchase Modal */}
      <OrderModal
        product={orderProduct}
        isOpen={Boolean(orderProduct)}
        onClose={() => setOrderProduct(null)}
      />

      {/* Add Produce Modal for Authenticated Sellers */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
}
