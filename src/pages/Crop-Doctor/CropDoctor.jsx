import React, { useState } from "react";
import "./CropDoctor.css";

const SAMPLES = [
  {
    id: "blight",
    name: "Leaf Blight",
    crop: "Tomato / Potato",
    symptoms: "Dark brown necrotic lesions with concentric rings on leaves.",
    cause: "Fungal infection (Alternaria solani / Phytophthora infestans)",
    prevention: "Crop rotation, avoid overhead watering, apply copper-based fungicides.",
    cure: "Apply systemic fungicide such as Mancozeb or Chlorothalonil every 7-10 days."
  },
  {
    id: "rust",
    name: "Yellow Rust",
    crop: "Wheat",
    symptoms: "Yellow pustules forming linear stripes on leaf blades.",
    cause: "Puccinia striiformis fungus spread by wind borne spores.",
    prevention: "Plant resistant cultivars, balanced nitrogen fertilization.",
    cure: "Foliar spray of Propiconazole (0.1%) or Tebuconazole upon first symptom sight."
  },
  {
    id: "mildew",
    name: "Powdery Mildew",
    crop: "Cucurbits / Peas",
    symptoms: "White powdery fungal growth on upper surfaces of leaves.",
    cause: "Erysiphe cichoracearum fungus in warm, humid shade.",
    prevention: "Ensure proper plant spacing for airflow and maximum sunlight.",
    cure: "Spray neem oil solution or sulfur-based organic fungicide."
  }
];

export default function CropDoctor() {
  const [selectedSample, setSelectedSample] = useState(SAMPLES[0]);
  const [customFile, setCustomFile] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="crop-doctor-page">
      <div className="crop-doctor-container">
        <div className="crop-doctor-header">
          <span className="eyebrow">Interactive Diagnostics</span>
          <h1>Crop Doctor — Disease Diagnostics</h1>
          <p>
            Upload a photo of your affected crop leaf or choose from sample disease cases below to diagnose symptoms, identify cause, and receive prevention & cure recommendations.
          </p>
        </div>

        <div className="crop-doctor-grid">
          <div className="diagnostic-input-card">
            <h3>1. Select or Upload Image</h3>
            <div className="upload-box">
              {customFile ? (
                <div className="uploaded-preview">
                  <img src={customFile} alt="Uploaded crop leaf" />
                  <button onClick={() => setCustomFile(null)} className="btn-secondary">Remove</button>
                </div>
              ) : (
                <label className="upload-label">
                  <span className="upload-icon">📷</span>
                  <span>Click to Upload Leaf Photo</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
                </label>
              )}
            </div>

            <div className="sample-selector">
              <h4>Or pick a sample disease case:</h4>
              <div className="sample-buttons">
                {SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    className={`sample-btn ${selectedSample.id === sample.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedSample(sample);
                      setCustomFile(null);
                    }}
                  >
                    🌿 {sample.name} ({sample.crop})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="diagnostic-result-card">
            <h3>2. Diagnostic Report</h3>
            <div className="result-field">
              <span className="field-title">Disease Identity:</span>
              <span className="disease-badge">{selectedSample.name}</span>
            </div>

            <div className="result-field">
              <span className="field-title">Affected Crop:</span>
              <p>{selectedSample.crop}</p>
            </div>

            <div className="result-field">
              <span className="field-title">Observed Symptoms:</span>
              <p>{selectedSample.symptoms}</p>
            </div>

            <div className="result-field">
              <span className="field-title">Pathogen / Cause:</span>
              <p>{selectedSample.cause}</p>
            </div>

            <div className="result-box prevention">
              <h4>🛡️ Prevention Guidance</h4>
              <p>{selectedSample.prevention}</p>
            </div>

            <div className="result-box cure">
              <h4>💊 Treatment & Cure</h4>
              <p>{selectedSample.cure}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
