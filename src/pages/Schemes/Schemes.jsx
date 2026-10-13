import React, { useState } from "react";
import schemes from "./Schemes.json";
import "./Schemes.css";

function Heading() {
  return (
    <div className="page-hero-banner">
      <div className="page-capsule">Financial &amp; Policy Support</div>
      <h1 className="page-hero-title">Government &amp; Institutional Support Schemes</h1>
      <p className="page-hero-subtitle">
        Explore verified government subsidies and agricultural credit schemes that assist
        farmers in adopting drip irrigation, soil testing, stubble machinery, and solar pumps.
      </p>
    </div>
  );
}

export default function Cards() {
  const [filter, setFilter] = useState("all");

  const filteredSchemes =
    filter === "all"
      ? schemes
      : schemes.filter((scheme) => scheme.type === filter);

  return (
    <div className="schemes-page">
      <Heading />

      <div className="schemes-container page-container">
        <div className="filter-tabs-row">
          <button
            className={`filter-tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Support Schemes
          </button>

          <button
            className={`filter-tab-btn ${filter === "government" ? "active" : ""}`}
            onClick={() => setFilter("government")}
          >
            Government Subsidies
          </button>

          <button
            className={`filter-tab-btn ${filter === "credit" ? "active" : ""}`}
            onClick={() => setFilter("credit")}
          >
            Private &amp; Credit Schemes
          </button>
        </div>

        <div className="schemes-grid">
          {filteredSchemes.map((scheme) => (
            <article className="scheme-card common-card" key={scheme.id}>
              <div className="scheme-card-header">
                <span className="scheme-category-badge">{scheme.category}</span>
                <span className="scheme-target-badge">{scheme.target}</span>
              </div>

              <h2 className="scheme-title">{scheme.name}</h2>
              <div className="scheme-dept">
                <strong>Department:</strong> {scheme.department}
              </div>

              <div className="benefit-highlight-box">
                <span className="benefit-eyebrow">Financial Benefit / Subsidy</span>
                <div className="benefit-value">{scheme.benefit}</div>
                <p className="benefit-desc">{scheme.description}</p>
              </div>

              <div className="scheme-details-section">
                <h3>Key Scheme Advantages</h3>
                <ul className="scheme-points-list">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="scheme-details-section">
                <h3>How to Apply</h3>
                <ol className="scheme-steps-list">
                  {scheme.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}