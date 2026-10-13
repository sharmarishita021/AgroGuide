import React, { useState, useRef } from "react";
import "./farmCheck.css";
import input from "./farmCheck_input.json";
import analyser from "./farmCheck_analyser.json";

function Header() {
  return (
    <div className="page-hero-banner farm-hero-banner">
      <div className="page-capsule">Diagnostic Assessment</div>
      <h1 className="page-hero-title">{input.title}</h1>
      <p className="page-hero-subtitle">
        Complete the sections below to assess your farm's ecological efficiency,
        detect future sustainability risks, and receive personalized recommendations.
      </p>
    </div>
  );
}

function renderFields(fields, form, change) {
  return fields.map((field) => {
    if (field.type === "select") {
      return (
        <div className="form-field-group" key={field.id}>
          <label className="field-label" htmlFor={field.id}>
            {field.label} {field.required && <span className="req-star">*</span>}
          </label>
          <div className="select-wrapper">
            <select
              id={field.id}
              className="field-select"
              value={form[field.id] || ""}
              onChange={(e) => change(field.id, e.target.value)}
            >
              <option value="">-- Select an option --</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    if (field.type === "radio") {
      return (
        <div className="form-field-group full-width" key={field.id}>
          <label className="field-label">
            {field.label} {field.required && <span className="req-star">*</span>}
          </label>
          <div className="radio-pill-group">
            {field.options.map((option) => {
              const isChecked = form[field.id] === option;
              return (
                <label
                  className={`radio-pill ${isChecked ? "active" : ""}`}
                  key={option}
                >
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    checked={isChecked}
                    onChange={(e) => change(field.id, e.target.value)}
                  />
                  <span>{option.replace(/_/g, " ")}</span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    if (field.type === "number") {
      return (
        <div className="form-field-group" key={field.id}>
          <label className="field-label" htmlFor={field.id}>
            {field.label} {field.unit ? `(${field.unit})` : ""} {field.required && <span className="req-star">*</span>}
          </label>
          <input
            id={field.id}
            className="field-input"
            type="number"
            placeholder={field.unit ? `e.g. 5 ${field.unit}` : "Enter value"}
            value={form[field.id] || ""}
            onChange={(e) => change(field.id, e.target.value)}
          />
        </div>
      );
    }

    if (field.type === "text") {
      return (
        <div className="form-field-group" key={field.id}>
          <label className="field-label" htmlFor={field.id}>
            {field.label} {field.required && <span className="req-star">*</span>}
          </label>
          <input
            id={field.id}
            className="field-input"
            type="text"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={form[field.id] || ""}
            onChange={(e) => change(field.id, e.target.value)}
          />
        </div>
      );
    }

    return null;
  });
}

function getFutureRisks(form) {
  const risks = [];
  analyser.futureRisks.forEach((risk) => {
    const matches = risk.conditions.every((condition) => {
      const answer = form[condition.field];
      return condition.values.includes(answer);
    });

    if (matches) {
      risks.push(risk);
    }
  });
  return risks;
}

export default function FarmCheck() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  const change = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const analyse = (e) => {
    e.preventDefault();

    let total = 0;
    let weight = 0;
    const outputs = {};
    const futureRisks = getFutureRisks(form);

    Object.entries(analyser.outputs).forEach(([id, output]) => {
      let score = 0;
      let answered = 0;
      Object.entries(output.fields).forEach(([field, rules]) => {
        const answer = form[field];
        if (answer && rules[answer] !== undefined) {
          score += rules[answer];
          answered++;
        }
      });

      const totalScore = answered > 0 ? Math.round((score / answered) * 10) : 0;

      outputs[id] = {
        name: output.label,
        score: totalScore,
        recommendation: output.recommendations,
        messages: output.messages
      };

      total += totalScore * output.weight;
      weight += output.weight;
    });

    const totalScore = weight > 0 ? Math.round(total / weight) : 0;
    const rating = analyser.rating.find((item) => totalScore >= item.min);

    setResult({
      score: totalScore,
      rating: rating,
      outputs: outputs,
      futureRisks: futureRisks
    });

    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const getScoreBadgeClass = (score) => {
    if (score >= 75) return "badge-high";
    if (score >= 50) return "badge-medium";
    return "badge-low";
  };

  const getRecLevel = (score) => {
    if (score > 70) return "high";
    if (score > 45) return "medium";
    return "low";
  };

  return (
    <div className="farm-check-page">
      <Header />

      <div className="farm-check-container">
        <form onSubmit={analyse} className="farm-check-form">
          <div className="sections-container">
            {input.sections.map((section, idx) => (
              <div className="section-card" key={section.id}>
                <div className="section-card-header">
                  <div className="section-card-titles">
                    <span className="section-step-label">
                      Part {idx + 1} of {input.sections.length}
                    </span>
                    <h2 className="section-main-title">{section.title}</h2>
                  </div>
                </div>

                <div className="section-card-body">
                  {renderFields(section.fields, form, change)}
                </div>
              </div>
            ))}
          </div>

          <div className="submit-action-bar">
            <button type="submit" className="btn btn-primary submit-analyse-btn">
              <span>Analyse Farm Sustainability</span>
            </button>
            <p className="submit-hint">
              Click to calculate your overall score and view diagnostic feedback.
            </p>
          </div>
        </form>

        {result && (
          <div className="analysis-results-section" ref={resultsRef}>
            {/* Top Score Banner */}
            <div className="score-summary-card">
              <div className="score-gauge-box">
                <span className="score-number">{result.score}</span>
                <span className="score-denom">/ 100</span>
                <span className="score-label">Overall Score</span>
              </div>

              <div className="score-evaluation-box">
                {result.rating && (
                  <>
                    <div className="rating-badge-pill">
                      Status: {result.rating.label}
                    </div>
                    <h3 className="rating-heading">
                      {result.score >= 70 ? "Healthy Ecological Balance" : "Optimization Required"}
                    </h3>
                    <p className="rating-description">
                      {result.rating.description}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="category-analysis-wrap">
              <div className="results-subheading">
                <h2>Category Diagnostic Breakdown</h2>
                <p>Specific sustainability ratings and recommendations across your farm's operations.</p>
              </div>

              <div className="outputs-grid">
                {Object.values(result.outputs).map((output) => (
                  <div className="output-card" key={output.name}>
                    <div className="output-card-top">
                      <h3 className="output-title">{output.name}</h3>
                      <span className={`output-score-tag ${getScoreBadgeClass(output.score)}`}>
                        {output.score} / 100
                      </span>
                    </div>

                    <div className="output-message-box">
                      <p>{output.messages[getRecLevel(output.score)]}</p>
                    </div>

                    {output.recommendation && (
                      <div className="output-rec-box">
                        <strong>Actionable Guidance:</strong>
                        {Array.isArray(output.recommendation) ? (
                          <ul>
                            {output.recommendation.map((recItem, rIdx) => (
                              <li key={rIdx}>{recItem}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{output.recommendation}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Future Risks */}
            {result.futureRisks && result.futureRisks.length > 0 && (
              <div className="risks-section">
                <div className="risks-header">
                  <h2>Potential Future Sustainability Risks</h2>
                  <p>
                    Based on your responses, here are specific environmental and production
                    vulnerabilities identified:
                  </p>
                </div>

                <div className="risks-grid">
                  {result.futureRisks.map((risk) => (
                    <div className={`risk-card severity-${risk.severity}`} key={risk.id}>
                      <div className="risk-card-top">
                        <span className={`risk-severity-badge badge-${risk.severity}`}>
                          {risk.severity.toUpperCase()} RISK
                        </span>
                        <h3 className="risk-title">{risk.title}</h3>
                      </div>
                      <p className="risk-message">{risk.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}