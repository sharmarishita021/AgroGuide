import { useState } from "react";
import problems from "./Problem.js";
import ProblemCard from "./ProblemCard.jsx";
import ProblemDetails from "./ProblemDetails.jsx";
import "./Problem.css";

function ProblemSolver() {
  const [category, setCategory] = useState("weather");
  const [selectedProblem, setSelectedProblem] = useState(null);

  if (selectedProblem) {
    return (
      <ProblemDetails
        problem={selectedProblem}
        onBack={() => setSelectedProblem(null)}
      />
    );
  }

  const categoryLabels = {
    weather: "Weather & Climate",
    soil: "Soil Health & Structure",
    crop: "Crop & Nutrient Management",
    pest: "Pests, Diseases & Chemicals"
  };

  return (
    <div className="problem-solver-page">
      <div className="page-hero-banner">
        <div className="page-capsule">Diagnostic &amp; Resolution Blueprint</div>
        <h1 className="page-hero-title">Agricultural Problem Solver</h1>
        <p className="page-hero-subtitle">
          Select a problem category below to explore symptoms, root causes, practical
          field solutions, and resilient crop varieties.
        </p>
      </div>

      <div className="problem-solver-container page-container">
        <div className="category-tabs-row">
          <button
            className={`category-tab-btn ${category === "weather" ? "active" : ""}`}
            onClick={() => setCategory("weather")}
          >
            Weather Problems
          </button>

          <button
            className={`category-tab-btn ${category === "soil" ? "active" : ""}`}
            onClick={() => setCategory("soil")}
          >
            Soil Problems
          </button>

          <button
            className={`category-tab-btn ${category === "crop" ? "active" : ""}`}
            onClick={() => setCategory("crop")}
          >
            Crop &amp; Fertility
          </button>

          <button
            className={`category-tab-btn ${category === "pest" ? "active" : ""}`}
            onClick={() => setCategory("pest")}
          >
            Pest &amp; Chemicals
          </button>
        </div>

        <div className="problem-category-header">
          <h2 className="problem-heading">{categoryLabels[category]}</h2>
          <span className="problem-count-badge">
            {problems[category].length} Issues Documented
          </span>
        </div>

        <div className="problem-grid">
          {problems[category].map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onReadMore={setSelectedProblem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProblemSolver;