import React, { useState } from 'react';
import { SUSTAINABLE_PRACTICES } from '../../data/gogreenData';
import { IMAGES } from '../../data/imagesData';

export default function BioFertilizerGuide() {
  const [activePracticeId, setActivePracticeId] = useState(SUSTAINABLE_PRACTICES[1].id);

  const activePractice =
    SUSTAINABLE_PRACTICES.find((p) => p.id === activePracticeId) || SUSTAINABLE_PRACTICES[0];

  const activeImage = IMAGES.practices[activePractice.id] || IMAGES.practices.jeevamrit;

  return (
    <div className="bio-guide-panel">
      <div className="guide-header-row">
        <div>
          <span className="sub-badge">REGENERATIVE AGRONOMY RECIPES</span>
          <h3 className="guide-title">DIY Chemical-Free Bio-Inputs Manual</h3>
          <p className="guide-sub">
            Prepare active bio-fertilizers and zero-residue repellents on your own farm using indigenous inputs
          </p>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="guide-tabs-bar">
        {SUSTAINABLE_PRACTICES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`guide-tab-btn ${activePracticeId === p.id ? 'active' : ''}`}
            onClick={() => setActivePracticeId(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Active Tab Recipe Content */}
      <div className="guide-content-card">
        {/* Practice Image & Recipe Hero */}
        <div className="recipe-hero-with-image">
          <div className="recipe-image-wrap">
            <img
              src={activeImage}
              alt={activePractice.title}
              className="recipe-feature-img"
            />
            <span className="recipe-cat-badge">{activePractice.category}</span>
          </div>

          <div className="recipe-hero-details">
            <div className="recipe-top-meta">
              <h4 className="recipe-title">{activePractice.title}</h4>
              <span className="savings-highlight">{activePractice.savings}</span>
            </div>
            <p className="recipe-desc">{activePractice.description}</p>
          </div>
        </div>

        <div className="recipe-steps-section">
          <h5 className="steps-heading">Step-by-Step Preparation &amp; Application Protocol:</h5>
          <ol className="steps-ordered-list">
            {activePractice.steps.map((step, idx) => (
              <li key={idx} className="step-item">
                <span className="step-num">{idx + 1}</span>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="recipe-ecological-impact">
          <span className="impact-tag">ECOLOGICAL RETURN</span>
          <div>
            <strong>Verified Impact: </strong>
            <span>{activePractice.impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
