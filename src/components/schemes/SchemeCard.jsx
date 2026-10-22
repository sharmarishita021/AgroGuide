import React from 'react';
import { getSchemeImage } from '../../data/imagesData';

export default function SchemeCard({ scheme, onSelectScheme, isSaved, onToggleSave }) {
  const schemeImg = getSchemeImage(scheme.id);

  return (
    <div className={`scheme-card ${scheme.badgeColor}`}>
      {/* Scheme Card Header Media */}
      <div className="scheme-card-media">
        <img
          src={schemeImg}
          alt={scheme.name}
          className="scheme-card-thumbnail"
          loading="lazy"
        />
        <div className="scheme-relevance-chip">
          {scheme.badgeText} ({scheme.relevanceScore}% Match)
        </div>
      </div>

      <div className="scheme-card-topbar">
        <span className="scheme-category-tag">{scheme.category}</span>
        <button
          type="button"
          className={`save-bookmark-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(scheme.id);
          }}
          title={isSaved ? 'Remove from Bookmarks' : 'Bookmark this Scheme'}
        >
          {isSaved ? 'Bookmarked' : 'Save Scheme'}
        </button>
      </div>

      <div className="scheme-body">
        <h4 className="scheme-title">{scheme.name}</h4>
        
        <div className="subsidy-highlight-banner">
          <span className="subsidy-tag">SUBSIDY BENEFIT</span>
          <div className="subsidy-details">
            <strong className="subsidy-value">{scheme.subsidyAmount}</strong>
          </div>
        </div>

        <p className="scheme-summary-text">{scheme.summary}</p>

        <div className="scheme-meta-tags">
          <span className="meta-tag">
            <strong>Beneficiary:</strong> {scheme.targetBeneficiary}
          </span>
          <span className="meta-tag">
            <strong>Coverage:</strong> {scheme.applicableStates.includes('ALL') ? 'Pan-India' : scheme.applicableStates.join(', ')}
          </span>
        </div>
      </div>

      <div className="scheme-card-footer">
        <button
          type="button"
          className="btn-view-scheme"
          onClick={() => onSelectScheme(scheme)}
        >
          View Eligibility &amp; Application Steps
        </button>
      </div>
    </div>
  );
}
