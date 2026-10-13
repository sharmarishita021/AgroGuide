import React, { useState } from "react";
import "./CropDoctor.css";
import diseases from "./CropDoctor.json";

function Heading() {
  return (
    <div className="page-hero-banner">
      <div className="page-capsule">Crop Diagnostics</div>
      <h1 className="page-hero-title">Crop Doctor — Leaf Disease Detector</h1>
      <p className="page-hero-subtitle">
        Upload a photo of your crop leaf or select a test sample to detect common fungal and
        bacterial diseases, review severity, and receive immediate curative actions.
      </p>
    </div>
  );
}

function Selected({ disease }) {
  if (!disease) return null;

  return (
    <div className="disease-result-card common-card">
      <div className="tags-row">
        <span
          className="severity-tag"
          style={{
            backgroundColor: disease.severityColor ? `${disease.severityColor}1a` : "#fef2f2",
            color: disease.severityColor || "#b91c1c",
            borderColor: disease.severityColor || "#fca5a5"
          }}
        >
          Severity: {disease.severity}
        </span>
        <span className="confidence-tag">Detection Confidence: {disease.confidence}</span>
      </div>

      <h2 className="disease-name">{disease.name}</h2>

      <div className="disease-meta-info">
        <span><strong>Target Crop:</strong> {disease.name.split(" ")[0]}</span>
        <span>•</span>
        <span><strong>Scientific Pathogen:</strong> {disease.scientificName}</span>
      </div>

      <div className="disease-img-wrapper">
        <img className="disease-img" src={disease.image} alt={disease.name} />
      </div>

      <div className="diagnosis-columns">
        <div className="diag-col symptoms-col">
          <div className="diag-col-header">
            <h3>Symptoms</h3>
          </div>
          <ul>
            {disease.symptoms.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="diag-col prevent-col">
          <div className="diag-col-header">
            <h3>Preventions</h3>
          </div>
          <ul>
            {disease.prevention.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="diag-col cure-col">
          <div className="diag-col-header">
            <h3>Curative Actions</h3>
          </div>
          <ul>
            {disease.cure.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ImageBox({ image, setImage, onAnalyze, onUpload }) {
  function upload(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onUpload();
    }
  }

  return (
    <div className="upload-section">
      {!image ? (
        <label className="upload-dropzone">
          <h3>Click to browse or drop a crop leaf image</h3>
          <p>Supported file formats: JPG, PNG, WebP (under 10MB)</p>
          <span className="btn btn-outline-green btn-small">Choose Image File</span>
          <input type="file" accept="image/*" onChange={upload} />
        </label>
      ) : (
        <div className="preview-card common-card">
          <div className="preview-img-box">
            <img src={image} alt="Selected crop leaf" />
          </div>

          <div className="preview-status-box">
            <div className="status-indicator">
              <span className="status-dot"></span>
              <strong>Leaf Image Loaded &amp; Ready</strong>
            </div>

            <div className="preview-actions">
              <button
                className="btn btn-outline-green btn-small"
                onClick={() => {
                  setImage(null);
                  onUpload(false);
                }}
              >
                Choose Different Image
              </button>

              <button className="btn btn-primary" onClick={onAnalyze}>
                Analyze Leaf for Disease →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CropDoctor() {
  const [filter, setFilter] = useState("rice-blast");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const disease = diseases.find((x) => x.id === filter);

  const samples = [
    ["Rice Blast", "rice-blast"],
    ["Wheat Rust", "wheat-rust"],
    ["Tomato Blight", "tomato-blight"],
    ["Potato Blight", "potato-blight"]
  ];

  return (
    <div className="crop-doctor-page">
      <Heading />

      <div className="crop-doctor-container page-container">
        <ImageBox
          image={image}
          setImage={setImage}
          onUpload={() => setIsUploaded(true)}
          onAnalyze={() => {
            if (isUploaded) {
              setFilter("rice-blast");
            }
            setShow(true);
          }}
        />

        <div className="sample-test-section">
          <div className="sample-instructions">
            <span>Or test with a pre-loaded crop specimen:</span>
          </div>

          <div className="sample-tabs-row">
            {samples.map(([name, id]) => (
              <button
                key={id}
                className={`sample-tab-btn ${filter === id && !isUploaded ? "active" : ""}`}
                onClick={() => {
                  setFilter(id);
                  const found = diseases.find((x) => x.id === id);
                  if (found) {
                    setImage(found.image);
                  }
                  setIsUploaded(false);
                  setShow(true);
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {show && <Selected disease={disease} />}
      </div>
    </div>
  );
}