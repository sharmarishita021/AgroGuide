import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-sun"></div>
        <div className="hero-rows"></div>
        <div className="hero-card">
          <div className="logo">
            Agro<span>Guide</span>
          </div>
          <h1 className="tagline">
            Guiding agriculture towards a more sustainable future.
          </h1>
          <p>
            Modern farming feeds billions of people, but intensive farming
            practices can place long-term pressure on soil, water, and
            ecosystems. AgroGuide helps you understand these challenges, find
            solutions, and access financial support schemes.
          </p>
          <div className="hero-actions">
            <a href="#solutions" className="btn btn-primary">
              Explore Problems &amp; Solutions →
            </a>
            <a href="#tools" className="btn btn-outline-white">
              Check My Farm
            </a>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="tools" id="tools">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Interactive Tools</div>
            <h2>Farmer Diagnostic &amp; Assessment Tools</h2>
            <p>
              Diagnose crop leaf diseases or type custom farming questions to
              get actionable recommendations.
            </p>
          </div>
          <div className="tools-grid">
            <div className="tool-card">
              <div className="icon-circle">🌿</div>
              <div>
                <h3>Crop Doctor (Disease Diagnostics)</h3>
                <p>
                  Upload a photo of crop leaves or choose a sample image to
                  diagnose symptoms, disease identity, prevention, and cures.
                </p>
                <a href="#" className="btn btn-outline-green btn-small">
                  Open Crop Doctor →
                </a>
              </div>
            </div>
            <div className="tool-card">
              <div className="icon-circle">💬</div>
              <div>
                <h3>Farm Problem Solver</h3>
                <p>
                  Type your farm-related questions (e.g. soil test, irrigation,
                  crop stubble management) in plain words to generate a
                  practical blueprint.
                </p>
                <a href="#" className="btn btn-outline-green btn-small">
                  Open Problem Solver →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add other sections (resources, schemes, problems, solutions, CTA, footer) here in the same JSX style */}
    </div>
  );
}
