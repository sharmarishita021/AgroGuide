import React from 'react';

/**
 * VulnerabilitiesCard Component
 * Displays district vulnerabilities and risk defense:
 * - Risk level: High / Moderate / Low
 * - Vulnerability/problem
 * - Description
 * - Recommended Action / Prevention
 */
export default function VulnerabilitiesCard({ district }) {
  const vulnerabilities = district?.vulnerabilities || [];

  return (
    <div className="vulnerabilities-container">
      <div className="section-title-wrap">
        <div className="title-left">
          <span className="section-category-badge">DEFENSIVE AGRONOMY</span>
          <div>
            <h3 className="section-heading">Agro-Vulnerabilities &amp; Risk Defense</h3>
            <p className="section-sub">
              Regional climatic stress patterns, pest vectors, and soil degradation risks identified in {district?.name}
            </p>
          </div>
        </div>
        <div className="groundwater-status-pill">
          <span>Aquifer Status: </span>
          <strong>{district?.groundwaterStatus}</strong>
        </div>
      </div>

      <div className="vulnerabilities-grid">
        {vulnerabilities.map((vuln, idx) => (
          <div key={idx} className={`vuln-card severity-${(vuln.severity || '').toLowerCase()}`}>
            <div className="vuln-header">
              {/* Risk Level */}
              <span className={`severity-tag ${(vuln.severity || '').toLowerCase()}`}>
                Risk Level: {vuln.severity}
              </span>
              {/* Vulnerability / Problem */}
              <h4 className="vuln-title">{vuln.title}</h4>
            </div>

            {/* Description */}
            <p className="vuln-desc">{vuln.description}</p>

            {/* Recommended Action / Prevention */}
            <div className="vuln-prevention-box">
              <div className="prevention-label">
                <span>Recommended Action / Prevention:</span>
              </div>
              <p className="prevention-text">{vuln.prevention}</p>
            </div>
          </div>
        ))}
      </div>

      {district?.seasonalAdvisory && (
        <div className="seasonal-advisory-banner">
          <span className="advisory-pill-badge">SEASONAL NOTICE</span>
          <div>
            <strong>Current Season Krishi Advisory for {district?.name}: </strong>
            <span>{district?.seasonalAdvisory}</span>
          </div>
        </div>
      )}
    </div>
  );
}
