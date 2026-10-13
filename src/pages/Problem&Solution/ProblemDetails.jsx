import React from "react";

function ProblemDetails({ problem, onBack }) {
  return (
    <div className="problem-details-page">
      <div className="problem-details-container page-container">
        <button className="btn btn-outline-green btn-small back-button" onClick={onBack}>
          ← Back to Problem Solver
        </button>

        <div className="problem-details-card common-card">
          <div className="details-header">
            <span className="details-badge">Diagnostic Detail</span>
            <h1 className="details-title">{problem.title}</h1>
          </div>

          {/* About section + image */}
          <div className="details-intro">
            <div className="about-section">
              <h2>Problem Context &amp; Dynamics</h2>
              <p>{problem.details}</p>
            </div>

            <div className="problem-image">
              <img src={problem.image} alt={problem.title} />
            </div>
          </div>

          {/* Effects + Solutions */}
          <div className="details-two-column">
            <div className="details-section effects-box">
              <div className="section-title-wrap">
                <h2>Negative Farm Effects</h2>
              </div>
              <ul>
                {problem.effects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>

            <div className="details-section solutions-box">
              <div className="section-title-wrap">
                <h2>Actionable Solutions</h2>
              </div>
              <ul>
                {problem.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Crop suggestions */}
          <div className="crop-section">
            <div className="section-title-wrap">
              <h2>Resilient Crop Recommendations</h2>
            </div>
            <div className="crops-tags-row">
              {problem.crops.map((crop, index) => (
                <span className="crop-tag-pill" key={index}>
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;