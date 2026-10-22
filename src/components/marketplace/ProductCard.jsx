import React from 'react';
import StarRating from '../common/StarRating';
import { getProximityLabel } from '../../utils/distance';
import { getProductImage } from '../../data/imagesData';

export default function ProductCard({
  product,
  distanceKm,
  onRateClick,
  onBuyClick
}) {
  // Proximity styling tier
  let distanceClass = 'distance-near';
  if (distanceKm > 350) distanceClass = 'distance-far';
  else if (distanceKm > 75) distanceClass = 'distance-medium';

  const proximityLabel = getProximityLabel(distanceKm);
  const productImg = getProductImage(product);

  return (
    <div className="product-card">
      {/* Product Image Media Header */}
      <div className="product-card-media">
        <img
          src={productImg}
          alt={product.title}
          className="product-card-img"
          loading="lazy"
        />
        <div className="media-overlay-tags">
          <span className="product-category-pill">{product.category}</span>
          {product.organicCertified && (
            <span className="organic-badge">Certified Organic</span>
          )}
        </div>
      </div>

      {/* Top Banner with Distance and Organic Badges */}
      <div className="product-card-topbar">
        <div className={`distance-badge ${distanceClass}`}>
          <span className="dist-tag">PROXIMITY:</span>
          <span className="dist-value">
            {distanceKm === 0 ? 'Local (Same Town)' : `${distanceKm} km away`}
          </span>
          <span className="dist-hint">({proximityLabel})</span>
        </div>
      </div>

      <div className="product-content">
        <div className="category-meta-row">
          <span className="harvest-badge">Harvest: {product.harvestDate}</span>
        </div>

        <h4 className="product-title">{product.title}</h4>

        {/* Farmer & Location Details */}
        <div className="farmer-origin-box">
          <div className="farmer-avatar-circle">
            {product.farmerName ? product.farmerName.charAt(0).toUpperCase() : 'K'}
          </div>
          <div className="farmer-text">
            <span className="farmer-name">{product.farmerName}</span>
            <span className="farm-locality">
              {product.farmName} • <strong>{product.district}, {product.state}</strong>
            </span>
          </div>
        </div>

        <p className="product-description">{product.description}</p>

        {/* Price & Quantity Available */}
        <div className="product-price-block">
          <div className="price-left">
            <span className="price-tag">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="price-unit">/ {product.unit}</span>
          </div>
          <div className="qty-tag">
            <span>Stock:</span>
            <strong>{product.quantityAvailable} {product.unit}s</strong>
          </div>
        </div>

        {/* Real-time Rating Summary Row */}
        <div className="rating-summary-row">
          <div className="rating-left">
            <StarRating rating={product.rating} interactive={false} size="sm" />
            <span className="reviews-count-text">
              ({product.reviewsCount || (product.reviews?.length || 0)} {product.reviewsCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <button
            type="button"
            className="btn-rate-trigger"
            onClick={() => onRateClick(product)}
            title="Rate this produce - updates in real time"
          >
            Rate Produce
          </button>
        </div>
      </div>

      {/* Footer Buy / Inquire Button */}
      <div className="product-card-footer">
        <button
          type="button"
          className="btn-primary btn-buy-product"
          onClick={() => onBuyClick(product)}
        >
          Direct Purchase / Order
        </button>
      </div>
    </div>
  );
}
