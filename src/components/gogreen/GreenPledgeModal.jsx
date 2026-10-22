import React, { useState } from 'react';
import Modal from '../common/Modal';
import { GREEN_PLEDGES } from '../../data/gogreenData';
import { useToast } from '../../context/ToastContext';

export default function GreenPledgeModal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const [farmerName, setFarmerName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [district, setDistrict] = useState('Ludhiana, Punjab');
  const [landArea, setLandArea] = useState('5.0');
  const [selectedPledges, setSelectedPledges] = useState([
    GREEN_PLEDGES[0],
    GREEN_PLEDGES[1],
    GREEN_PLEDGES[2]
  ]);
  const [certificateData, setCertificateData] = useState(null);
  const [errors, setErrors] = useState({});

  const togglePledge = (item) => {
    setSelectedPledges((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const handleSignPledge = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!farmerName.trim()) {
      newErrors.farmerName = 'Farmer name is required.';
    } else if (farmerName.trim().length < 3) {
      newErrors.farmerName = 'Name must be at least 3 characters.';
    }

    if (!landArea || parseFloat(landArea) <= 0) {
      newErrors.landArea = 'Please enter a valid land area in acres.';
    }

    if (selectedPledges.length === 0) {
      newErrors.pledges = 'Please select at least one sustainable practice pledge.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast('Please fulfill the pledge requirements.', 'warning');
      return;
    }

    const cert = {
      id: 'PLEDGE-AGRI-' + Math.floor(100000 + Math.random() * 900000),
      farmerName: farmerName.trim(),
      farmName: farmName.trim() || 'Sustainable Agriland',
      district: district.trim() || 'Punjab',
      landArea: parseFloat(landArea) || 1,
      pledges: selectedPledges,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    setCertificateData(cert);
    showToast('Sustainable Farmer Certificate successfully generated.', 'success');
  };

  const handleReset = () => {
    setCertificateData(null);
    setErrors({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCertificateData(null);
        setErrors({});
        onClose();
      }}
      title={certificateData ? 'Verified Green Farmer Certificate' : 'Sustainable Farmer Pledge & Certification'}
      maxWidth="680px"
    >
      {!certificateData ? (
        <form onSubmit={handleSignPledge} className="pledge-form" noValidate>
          <p className="pledge-intro">
            Join thousands of forward-thinking Indian farmers making a commitment to protect groundwater,
            regenerate soil biology, and eliminate smoke pollution.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="pledge-farmer-name">
              Full Name of Farmer: *
            </label>
            <input
              id="pledge-farmer-name"
              type="text"
              className={`form-control ${errors.farmerName ? 'input-error' : ''}`}
              placeholder="e.g. Sardar Harpreet Singh or Rameshwar Patil"
              value={farmerName}
              onChange={(e) => {
                setFarmerName(e.target.value);
                if (errors.farmerName) setErrors((prev) => ({ ...prev, farmerName: '' }));
              }}
              required
            />
            {errors.farmerName && <span className="field-error-message">{errors.farmerName}</span>}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="pledge-farm-name">
                Farm / Estate Name (Optional):
              </label>
              <input
                id="pledge-farm-name"
                type="text"
                className="form-control"
                placeholder="e.g. Dhillon Organic Acres"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="pledge-locality">
                Locality / District: *
              </label>
              <input
                id="pledge-locality"
                type="text"
                className="form-control"
                placeholder="e.g. Ludhiana, Punjab"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="pledge-acres">
              Pledged Land Area (Acres): *
            </label>
            <input
              id="pledge-acres"
              type="number"
              step="0.5"
              min="0.5"
              className={`form-control ${errors.landArea ? 'input-error' : ''}`}
              value={landArea}
              onChange={(e) => {
                setLandArea(e.target.value);
                if (errors.landArea) setErrors((prev) => ({ ...prev, landArea: '' }));
              }}
              required
            />
            {errors.landArea && <span className="field-error-message">{errors.landArea}</span>}
          </div>

          <div className="pledge-commitments-block">
            <label className="form-label">Select Your Sustainable Agronomy Commitments: *</label>
            <div className="pledges-checklist">
              {GREEN_PLEDGES.map((pledge, idx) => {
                const isChecked = selectedPledges.includes(pledge);
                return (
                  <label key={idx} className={`pledge-check-item ${isChecked ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePledge(pledge)}
                    />
                    <span className="pledge-check-text">{pledge}</span>
                  </label>
                );
              })}
            </div>
            {errors.pledges && <span className="field-error-message">{errors.pledges}</span>}
          </div>

          <div className="form-actions-row">
            <button type="submit" className="btn-primary">
              Sign Pledge &amp; Get Certified
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* Printable Verified Certificate View */
        <div className="certificate-modal-wrapper">
          <div className="green-farmer-certificate">
            <div className="cert-border-outer">
              <div className="cert-border-inner">
                <div className="cert-header">
                  <div className="cert-emblem-text">AGRISIGN VERIFIED</div>
                  <h2 className="cert-main-title">Certificate of Sustainable Stewardship</h2>
                  <span className="cert-subtitle">National Regenerative Agriculture Network</span>
                </div>

                <div className="cert-body">
                  <p className="cert-present-text">This verified credential is presented to</p>
                  <h3 className="cert-farmer-name">{certificateData.farmerName}</h3>
                  <p className="cert-farm-location">
                    Operating <strong>{certificateData.farmName}</strong> in <strong>{certificateData.district}</strong> ({certificateData.landArea} Acres)
                  </p>

                  <p className="cert-declaration">
                    For demonstrating leadership in sustainable agrarian cultivation, committing to eliminate synthetic residues, conserve water aquifers, and restore living topsoil biology through verified commitments:
                  </p>

                  <ul className="cert-pledges-list">
                    {certificateData.pledges.map((p, idx) => (
                      <li key={idx}>[Confirmed] {p}</li>
                    ))}
                  </ul>
                </div>

                <div className="cert-footer">
                  <div className="cert-sig-box">
                    <span className="sig-line">Dr. H. S. Randhawa</span>
                    <span className="sig-title">Agronomy Directorate</span>
                  </div>
                  <div className="cert-id-box">
                    <span className="cert-ref-number">ID: {certificateData.id}</span>
                    <span className="cert-date">Issued: {certificateData.date}</span>
                  </div>
                  <div className="cert-sig-box">
                    <span className="sig-line">Kisan Krishi Seva</span>
                    <span className="sig-title">Verification Bureau</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cert-actions-row">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.print()}
            >
              Print / Save Certificate
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
            >
              Back to Form
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
