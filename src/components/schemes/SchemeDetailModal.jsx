import React from 'react';
import Modal from '../common/Modal';
import { getSchemeImage } from '../../data/imagesData';

export default function SchemeDetailModal({ scheme, isOpen, onClose }) {
  if (!scheme) return null;

  const schemeImg = getSchemeImage(scheme.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={scheme.name} maxWidth="720px">
      <div className="scheme-modal-content">
        <div className="scheme-modal-media-header">
          <img
            src={schemeImg}
            alt={scheme.name}
            className="scheme-modal-banner-img"
          />
          <div className="scheme-modal-header-overlay">
            <span className="scheme-category-badge">{scheme.category}</span>
            <span className="scheme-badge-text">{scheme.badgeText} ({scheme.relevanceScore}% Match)</span>
          </div>
        </div>

        <div className="modal-subsidy-box">
          <span className="subsidy-box-tag">FINANCIAL ASSISTANCE PAYOUT</span>
          <div className="subsidy-box-content">
            <p className="box-highlight">{scheme.subsidyAmount}</p>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="modal-section">
          <h4 className="modal-section-title">
            Eligibility Criteria
          </h4>
          <ul className="modal-bullet-list">
            {scheme.eligibility.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Key Benefits */}
        <div className="modal-section">
          <h4 className="modal-section-title">
            Key Scheme Advantages
          </h4>
          <ul className="modal-bullet-list">
            {scheme.keyBenefits.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Required Documents */}
        <div className="modal-section">
          <h4 className="modal-section-title">
            Mandatory Documents for Application
          </h4>
          <div className="documents-tags-wrap">
            {scheme.documentsNeeded.map((doc, idx) => (
              <span key={idx} className="doc-pill">
                Required: {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button to Official Portal */}
        <div className="modal-actions-bar">
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-portal-link"
          >
            Visit Official Govt Portal ({scheme.shortName})
          </a>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
