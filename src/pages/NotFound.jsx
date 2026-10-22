import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page container">
      <div className="not-found-card">
        <span className="not-found-tag">PAGE NOT FOUND</span>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Lost in the Fields?</h2>
        <p className="not-found-text">
          The agricultural page or crop route you are looking for does not exist or has been relocated to another plot.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
          <Link to="/farm-health" className="btn-secondary">
            Check Farm Health
          </Link>
          <Link to="/marketplace" className="btn-secondary">
            Browse Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
