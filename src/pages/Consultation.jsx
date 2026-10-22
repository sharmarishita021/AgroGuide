import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  CONSULTANTS,
  PROBLEM_CATEGORIES,
  COMMODITY_CROPS
} from '../data/consultantsData';

export default function Consultation() {
  const navigate = useNavigate();
  const {
    currentUser,
    consultations,
    recordConsultation,
    acceptConsultation,
    declineConsultation,
    respondToConsultation
  } = useAuth();
  const { showToast } = useToast();

  // Mode: 'client' (Farmer seeking advice) or 'consultant' (Specialist giving advice)
  const [activeMode, setActiveMode] = useState(() => {
    return currentUser?.role === 'consultant' ? 'consultant' : 'client';
  });

  // ---------------------------------------------------------------------------
  // CLIENT MODE: Filter Form & Validation State
  // ---------------------------------------------------------------------------
  const [filterForm, setFilterForm] = useState({
    crop: 'All Cultivated Crops',
    category: 'All Problem Specialties',
    urgency: 'Medium Priority (24-48 hrs)',
    farmerName: currentUser?.name || 'Ramesh Kumar',
    district: currentUser?.district || 'Ludhiana',
    phone: currentUser?.emailOrPhone || '9876501234',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState('All Problem Specialties');
  const [activeCropFilter, setActiveCropFilter] = useState('All Cultivated Crops');

  // Direct Booking Modal State (When clicking "Direct Consult Request" on a card)
  const [selectedConsultantForBooking, setSelectedConsultantForBooking] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    crop: 'Wheat',
    category: 'Pest & Insect Diagnostics',
    urgency: 'Medium Priority (24-48 hrs)',
    acres: '5.0',
    description: ''
  });
  const [bookingErrors, setBookingErrors] = useState({});

  // ---------------------------------------------------------------------------
  // CONSULTANT MODE: Selected Tab & Prescription State
  // ---------------------------------------------------------------------------
  const [consultantTab, setConsultantTab] = useState('incoming'); // 'incoming' | 'history'
  const [prescriptionTicketId, setPrescriptionTicketId] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [prescriptionError, setPrescriptionError] = useState('');

  // ---------------------------------------------------------------------------
  // Client Form Validation & Filtering
  // ---------------------------------------------------------------------------
  const validateFilterForm = () => {
    const errors = {};

    if (!filterForm.farmerName.trim()) {
      errors.farmerName = 'Farmer name is required.';
    }

    if (!filterForm.district.trim()) {
      errors.district = 'District or location is required.';
    }

    if (filterForm.description.trim().length > 0 && filterForm.description.trim().length < 15) {
      errors.description = 'Please describe symptoms in at least 15 characters to filter accurately.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (!validateFilterForm()) {
      showToast('Please correct form validation errors.', 'error');
      return;
    }

    setActiveSpecialtyFilter(filterForm.category);
    setActiveCropFilter(filterForm.crop);
    setHasSearched(true);
    showToast('Matching agronomists filtered by problem specialty and crop.', 'info');
  };

  const handleResetFilters = () => {
    setFilterForm({
      crop: 'All Cultivated Crops',
      category: 'All Problem Specialties',
      urgency: 'Medium Priority (24-48 hrs)',
      farmerName: currentUser?.name || 'Ramesh Kumar',
      district: currentUser?.district || 'Ludhiana',
      phone: currentUser?.emailOrPhone || '9876501234',
      description: ''
    });
    setFormErrors({});
    setActiveSpecialtyFilter('All Problem Specialties');
    setActiveCropFilter('All Cultivated Crops');
    setHasSearched(false);
  };

  // Filter Consultants based on selected criteria
  const matchingConsultants = CONSULTANTS.filter((c) => {
    const matchesCategory =
      activeSpecialtyFilter === 'All Problem Specialties' ||
      c.specialties.some((s) => s.toLowerCase().includes(activeSpecialtyFilter.toLowerCase()));

    const matchesCrop =
      activeCropFilter === 'All Cultivated Crops' ||
      c.cropsSpecialized.some((cr) => cr.toLowerCase().includes(activeCropFilter.toLowerCase()));

    return matchesCategory && matchesCrop;
  });

  // ---------------------------------------------------------------------------
  // Booking Modal Submission (Client requests consultation from specific consultant)
  // ---------------------------------------------------------------------------
  const handleOpenBooking = (consultant) => {
    setSelectedConsultantForBooking(consultant);
    setBookingFormData({
      crop: filterForm.crop !== 'All Cultivated Crops' ? filterForm.crop : 'Wheat',
      category: filterForm.category !== 'All Problem Specialties' ? filterForm.category : 'Pest & Insect Diagnostics',
      urgency: filterForm.urgency,
      acres: '5.0',
      description: filterForm.description || ''
    });
    setBookingErrors({});
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!bookingFormData.description.trim()) {
      errors.description = 'Please describe the crop symptoms in detail.';
    } else if (bookingFormData.description.trim().length < 15) {
      errors.description = 'Please enter at least 15 characters describing the distress.';
    }

    if (!bookingFormData.acres || Number(bookingFormData.acres) <= 0) {
      errors.acres = 'Please specify valid landholding acreage.';
    }

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }

    const ticket = recordConsultation({
      farmerName: filterForm.farmerName || currentUser?.name || 'Kisan User',
      phone: filterForm.phone || currentUser?.emailOrPhone || '9876501234',
      district: filterForm.district || currentUser?.district || 'Ludhiana',
      state: currentUser?.state || 'Punjab',
      crop: bookingFormData.crop,
      acres: bookingFormData.acres,
      urgency: bookingFormData.urgency,
      category: bookingFormData.category,
      description: bookingFormData.description,
      assignedConsultant: selectedConsultantForBooking.name
    });

    showToast(`Inquiry #${ticket.id} dispatched directly to ${selectedConsultantForBooking.name}!`, 'success');
    setSelectedConsultantForBooking(null);
  };

  // ---------------------------------------------------------------------------
  // Consultant Mode Handlers: Accept, Decline, Prescribe
  // ---------------------------------------------------------------------------
  const handleAcceptRequest = (ticketId, farmerName) => {
    const consultantName = currentUser?.name || 'Dr. Ananya Sharma';
    acceptConsultation(ticketId, consultantName);
    showToast(`Accepted consultation request from ${farmerName}. Ready to prescribe advice.`, 'success');
  };

  const handleDeclineRequest = (ticketId) => {
    declineConsultation(ticketId, 'Outside specialist agronomic scope');
    showToast('Inquiry declined and routed back to general advisory pool.', 'info');
  };

  const handleOpenPrescription = (ticketId) => {
    setPrescriptionTicketId(ticketId);
    setPrescriptionText('');
    setPrescriptionError('');
  };

  const handleSavePrescription = (ticketId) => {
    if (!prescriptionText.trim()) {
      setPrescriptionError('Prescription cannot be empty. Please specify dosages or remedies.');
      return;
    }
    if (prescriptionText.trim().length < 20) {
      setPrescriptionError('Please provide a scientific remedy in at least 20 characters.');
      return;
    }

    respondToConsultation(ticketId, prescriptionText.trim());
    showToast('Prescription advisory successfully dispatched to the farmer.', 'success');
    setPrescriptionTicketId(null);
    setPrescriptionText('');
    setPrescriptionError('');
  };

  // Filter requests for Consultant view
  const incomingRequests = consultations.filter(
    (t) => t.status === 'Pending Review' || t.status === 'Accepted / In Progress'
  );
  const completedHistory = consultations.filter((t) => t.status === 'Advisory Dispatched');

  return (
    <main className="consultation-page container">
      {/* Page Header */}
      <div className="consultation-header">
        <span className="section-category-badge">AGROGUIDE SCIENTIFIC EXTENSION</span>
        <h1 className="consultation-main-title">Agronomy Consultation &amp; Advisory Portal</h1>
        <p className="consultation-subtitle">
          Direct dialogue between Indian farmers and verified agricultural scientists for pest containment,
          soil nutrient balancing, and scientific crop management.
        </p>

        {/* 2-Mode Switch Bar */}
        <div className="consultation-mode-switch-bar">
          <div className="mode-switch-label">Select Active Mode:</div>
          <div className="mode-switch-buttons">
            <button
              type="button"
              className={`mode-btn ${activeMode === 'client' ? 'active' : ''}`}
              onClick={() => setActiveMode('client')}
            >
              Farmer / Client Mode (Seek Advisory)
            </button>
            <button
              type="button"
              className={`mode-btn ${activeMode === 'consultant' ? 'active' : ''}`}
              onClick={() => setActiveMode('consultant')}
            >
              Agronomist / Consultant Mode (Provide Advisory)
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: CLIENT (FARMER) MODE */}
      {/* ===================================================================== */}
      {activeMode === 'client' && (
        <section className="client-mode-section">
          {/* Form Validations Problem Filter Box */}
          <div className="problem-filter-box">
            <div className="filter-box-header">
              <span className="box-pill-tag">STEP 1: DEFINE CROP PROBLEM</span>
              <h2 className="box-title">Filter Specialized Agronomists by Crop &amp; Issue</h2>
              <p className="box-desc">
                Fill the problem parameters below with form validation to discover verified scientists
                specializing in your exact crop distress.
              </p>
            </div>

            <form onSubmit={handleFilterSubmit} className="filter-form" noValidate>
              <div className="filter-form-grid">
                {/* Crop Selection */}
                <div className="form-group">
                  <label htmlFor="cropSelect" className="form-label">
                    Cultivated Crop / Commodity:
                  </label>
                  <select
                    id="cropSelect"
                    className="form-control"
                    value={filterForm.crop}
                    onChange={(e) => setFilterForm({ ...filterForm, crop: e.target.value })}
                  >
                    {COMMODITY_CROPS.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Problem Category */}
                <div className="form-group">
                  <label htmlFor="categorySelect" className="form-label">
                    Problem Category / Specialty:
                  </label>
                  <select
                    id="categorySelect"
                    className="form-control"
                    value={filterForm.category}
                    onChange={(e) => setFilterForm({ ...filterForm, category: e.target.value })}
                  >
                    {PROBLEM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Urgency Level */}
                <div className="form-group">
                  <label htmlFor="urgencySelect" className="form-label">
                    Consultation Urgency:
                  </label>
                  <select
                    id="urgencySelect"
                    className="form-control"
                    value={filterForm.urgency}
                    onChange={(e) => setFilterForm({ ...filterForm, urgency: e.target.value })}
                  >
                    <option value="Routine (3-5 days)">Routine (3-5 days)</option>
                    <option value="Medium Priority (24-48 hrs)">Medium Priority (24-48 hrs)</option>
                    <option value="Critical / Emergency (< 12 hrs)">Critical / Emergency (&lt; 12 hrs)</option>
                  </select>
                </div>

                {/* Farmer Name */}
                <div className="form-group">
                  <label htmlFor="farmerName" className="form-label">
                    Farmer Name:
                  </label>
                  <input
                    type="text"
                    id="farmerName"
                    className={`form-control ${formErrors.farmerName ? 'input-error' : ''}`}
                    value={filterForm.farmerName}
                    onChange={(e) => {
                      setFilterForm({ ...filterForm, farmerName: e.target.value });
                      if (formErrors.farmerName) setFormErrors({ ...formErrors, farmerName: '' });
                    }}
                    placeholder="Enter your full name"
                  />
                  {formErrors.farmerName && (
                    <span className="field-error-msg">{formErrors.farmerName}</span>
                  )}
                </div>

                {/* District */}
                <div className="form-group">
                  <label htmlFor="districtInput" className="form-label">
                    Target District / State:
                  </label>
                  <input
                    type="text"
                    id="districtInput"
                    className={`form-control ${formErrors.district ? 'input-error' : ''}`}
                    value={filterForm.district}
                    onChange={(e) => {
                      setFilterForm({ ...filterForm, district: e.target.value });
                      if (formErrors.district) setFormErrors({ ...formErrors, district: '' });
                    }}
                    placeholder="e.g. Ludhiana, Punjab"
                  />
                  {formErrors.district && (
                    <span className="field-error-msg">{formErrors.district}</span>
                  )}
                </div>

                {/* Contact Phone */}
                <div className="form-group">
                  <label htmlFor="phoneInput" className="form-label">
                    Contact Mobile Number:
                  </label>
                  <input
                    type="tel"
                    id="phoneInput"
                    className="form-control"
                    value={filterForm.phone}
                    onChange={(e) => setFilterForm({ ...filterForm, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              {/* Symptoms Description */}
              <div className="form-group description-group">
                <label htmlFor="symptomsDesc" className="form-label">
                  Problem Description &amp; Visual Symptoms:
                </label>
                <textarea
                  id="symptomsDesc"
                  rows={3}
                  className={`form-control ${formErrors.description ? 'input-error' : ''}`}
                  value={filterForm.description}
                  onChange={(e) => {
                    setFilterForm({ ...filterForm, description: e.target.value });
                    if (formErrors.description) setFormErrors({ ...formErrors, description: '' });
                  }}
                  placeholder="e.g. Yellowing on upper leaves after 2nd irrigation, premature boll dropping, white powdery coating on mustard flowers..."
                />
                {formErrors.description && (
                  <span className="field-error-msg">{formErrors.description}</span>
                )}
                <span className="field-hint">
                  Detailed symptom notes help match the most qualified ICAR/University specialist. Minimum 15 characters.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="filter-form-actions">
                <button type="submit" className="btn-primary filter-submit-btn">
                  Filter Matching Agronomists
                </button>
                {hasSearched && (
                  <button
                    type="button"
                    className="btn-secondary reset-btn"
                    onClick={handleResetFilters}
                  >
                    Reset Problem Filters
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Matching Consultants Section */}
          <div className="specialists-catalog-section">
            <div className="catalog-header">
              <div>
                <span className="box-pill-tag">STEP 2: SELECT SPECIALIST</span>
                <h2 className="catalog-title">
                  Available Agronomy Consultants ({matchingConsultants.length})
                </h2>
                <p className="catalog-sub">
                  Showing certified agronomists matching: <strong>{activeSpecialtyFilter}</strong> •{' '}
                  <strong>{activeCropFilter}</strong>
                </p>
              </div>
            </div>

            {matchingConsultants.length === 0 ? (
              <div className="empty-catalog-card">
                <h3>No exact consultant match for this filter combination</h3>
                <p>Try switching to "All Problem Specialties" or "All Cultivated Crops" to see our broader network of specialists.</p>
                <button type="button" className="btn-primary" onClick={handleResetFilters}>
                  Show All Agronomists
                </button>
              </div>
            ) : (
              <div className="consultant-cards-grid">
                {matchingConsultants.map((consultant) => (
                  <div key={consultant.id} className="consultant-card">
                    {/* Media / Header Strip */}
                    <div className="consultant-card-top">
                      <img
                        src={consultant.image}
                        alt={consultant.name}
                        className="consultant-avatar-img"
                      />
                      <div className="consultant-headline">
                        <span className="consultant-status-tag">{consultant.availability}</span>
                        <h3 className="consultant-name">{consultant.name}</h3>
                        <div className="consultant-title">{consultant.title}</div>
                        <div className="consultant-institute">{consultant.institution}</div>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="consultant-card-body">
                      {/* Metric pills */}
                      <div className="consultant-metrics-strip">
                        <div className="c-metric">
                          <span className="c-metric-val">{consultant.rating} / 5.0</span>
                          <span className="c-metric-lbl">Rating ({consultant.totalConsultations} Consults)</span>
                        </div>
                        <div className="c-metric">
                          <span className="c-metric-val">{consultant.responseTime}</span>
                          <span className="c-metric-lbl">Response Time</span>
                        </div>
                        <div className="c-metric">
                          <span className="c-metric-val">{consultant.fee}</span>
                          <span className="c-metric-lbl">Advisory Fee</span>
                        </div>
                      </div>

                      <p className="consultant-bio-text">{consultant.bio}</p>

                      {/* Specialties tags */}
                      <div className="consultant-specialties-wrap">
                        <span className="tags-label">Core Specialties:</span>
                        <div className="tags-list">
                          {consultant.specialties.map((spec) => (
                            <span key={spec} className="specialty-pill">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Crops Specialized */}
                      <div className="consultant-crops-wrap">
                        <span className="tags-label">Cultivars:</span>
                        <span className="crops-text">{consultant.cropsSpecialized.join(', ')}</span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="consultant-card-actions">
                      <button
                        type="button"
                        className="btn-view-profile"
                        onClick={() => navigate(`/profile?consultantId=${consultant.id}`)}
                      >
                        View Full Profile
                      </button>
                      <button
                        type="button"
                        className="btn-book-consult"
                        onClick={() => handleOpenBooking(consultant)}
                      >
                        Direct Consult Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: CONSULTANT MODE (AGRONOMIST VIEW) */}
      {/* ===================================================================== */}
      {activeMode === 'consultant' && (
        <section className="consultant-mode-section">
          {/* Work Telemetry / Counter Strip */}
          <div className="consultant-telemetry-strip">
            <div className="telemetry-box">
              <span className="t-val">{consultations.length + 180}</span>
              <span className="t-lbl">Total Consultations Handled</span>
              <span className="t-sub">All-time farmer engagements</span>
            </div>
            <div className="telemetry-box">
              <span className="t-val active-highlight">{incomingRequests.length}</span>
              <span className="t-lbl">Active / Pending Inquiries</span>
              <span className="t-sub">Awaiting prescription</span>
            </div>
            <div className="telemetry-box">
              <span className="t-val">{completedHistory.length + 180}</span>
              <span className="t-lbl">Prescriptions Completed</span>
              <span className="t-sub">Scientific advisories sent</span>
            </div>
            <div className="telemetry-box">
              <span className="t-val">4.92 / 5.0</span>
              <span className="t-lbl">Farmer Satisfaction Score</span>
              <span className="t-sub">Verified resolution feedback</span>
            </div>
          </div>

          {/* Subtabs: Incoming Requests vs History of Work */}
          <div className="consultant-nav-tabs">
            <button
              type="button"
              className={`c-tab-btn ${consultantTab === 'incoming' ? 'active' : ''}`}
              onClick={() => setConsultantTab('incoming')}
            >
              Incoming Farmer Requests ({incomingRequests.length})
            </button>
            <button
              type="button"
              className={`c-tab-btn ${consultantTab === 'history' ? 'active' : ''}`}
              onClick={() => setConsultantTab('history')}
            >
              Consultancy History &amp; Work Log ({completedHistory.length})
            </button>
          </div>

          {/* Tab 1: Incoming Requests */}
          {consultantTab === 'incoming' && (
            <div className="incoming-requests-deck">
              <div className="deck-intro">
                <span className="box-pill-tag">INCOMING INQUIRIES QUEUE</span>
                <h3 className="deck-title">Review &amp; Select Distress Tickets by Specialty</h3>
                <p className="deck-desc">
                  Select cases matching your agronomy interest, accept the inquiry, and dispatch targeted
                  scientific prescriptions and bio-remedies.
                </p>
              </div>

              {incomingRequests.length === 0 ? (
                <div className="empty-catalog-card">
                  <h3>All incoming inquiries have been resolved!</h3>
                  <p>Check back soon for new farmer distress alerts or browse past prescriptions in your Work History.</p>
                </div>
              ) : (
                <div className="incoming-cards-list">
                  {incomingRequests.map((ticket) => (
                    <div key={ticket.id} className="request-ticket-card">
                      <div className="ticket-top-row">
                        <div className="ticket-id-tag">{ticket.id}</div>
                        <span className={`urgency-pill ${ticket.urgency.toLowerCase().includes('critical') || ticket.urgency.toLowerCase().includes('high') ? 'urgent' : ''}`}>
                          {ticket.urgency}
                        </span>
                        <span className="ticket-date">{ticket.date}</span>
                      </div>

                      <div className="ticket-details-grid">
                        <div className="t-detail-item">
                          <span className="t-detail-lbl">Farmer:</span>
                          <span className="t-detail-val">{ticket.farmerName} ({ticket.phone})</span>
                        </div>
                        <div className="t-detail-item">
                          <span className="t-detail-lbl">Location:</span>
                          <span className="t-detail-val">{ticket.district}, {ticket.state || 'Punjab'}</span>
                        </div>
                        <div className="t-detail-item">
                          <span className="t-detail-lbl">Crop &amp; Landholding:</span>
                          <span className="t-detail-val">{ticket.crop} ({ticket.acres} Acres)</span>
                        </div>
                        <div className="t-detail-item">
                          <span className="t-detail-lbl">Category:</span>
                          <span className="t-detail-val">{ticket.category || 'General Diagnostics'}</span>
                        </div>
                      </div>

                      <div className="ticket-description-box">
                        <span className="desc-heading">Farmer's Distress Query:</span>
                        <p className="desc-text">{ticket.description}</p>
                      </div>

                      {/* Status and Action Buttons */}
                      <div className="ticket-actions-bar">
                        <div className="ticket-status-pill">
                          Status: <strong>{ticket.status}</strong>
                        </div>

                        <div className="actions-right">
                          {ticket.status === 'Pending Review' ? (
                            <>
                              <button
                                type="button"
                                className="btn-accept-request"
                                onClick={() => handleAcceptRequest(ticket.id, ticket.farmerName)}
                              >
                                Accept &amp; Consult
                              </button>
                              <button
                                type="button"
                                className="btn-decline-request"
                                onClick={() => handleDeclineRequest(ticket.id)}
                              >
                                Decline / Re-route
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn-prescribe-action"
                              onClick={() => handleOpenPrescription(ticket.id)}
                            >
                              Dispatch Prescription &amp; Resolve
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Inline Prescription Drawer */}
                      {prescriptionTicketId === ticket.id && (
                        <div className="inline-prescription-form">
                          <h4 className="prescription-title">Formulate Scientific Advisory for {ticket.farmerName}</h4>
                          <p className="prescription-sub">
                            Specify chemical dosages (e.g. 1% Zinc Sulphate), organic decoctions (Neemastra),
                            or irrigation intervals.
                          </p>
                          <textarea
                            rows={4}
                            className={`form-control ${prescriptionError ? 'input-error' : ''}`}
                            value={prescriptionText}
                            onChange={(e) => {
                              setPrescriptionText(e.target.value);
                              if (prescriptionError) setPrescriptionError('');
                            }}
                            placeholder="Enter recommended treatment plan, foliar spray ratio, fertilizer split dosage, or watering frequency..."
                          />
                          {prescriptionError && (
                            <span className="field-error-msg">{prescriptionError}</span>
                          )}
                          <div className="prescription-buttons">
                            <button
                              type="button"
                              className="btn-primary"
                              onClick={() => handleSavePrescription(ticket.id)}
                            >
                              Send Advisory &amp; Mark Resolved
                            </button>
                            <button
                              type="button"
                              className="btn-secondary"
                              onClick={() => {
                                setPrescriptionTicketId(null);
                                setPrescriptionText('');
                                setPrescriptionError('');
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Consultancy History of Work */}
          {consultantTab === 'history' && (
            <div className="consultancy-history-deck">
              <div className="deck-intro">
                <span className="box-pill-tag">ADVISORY ARCHIVE</span>
                <h3 className="deck-title">Historical Log of Completed Consultancies ({completedHistory.length})</h3>
                <p className="deck-desc">
                  Record of all agronomic prescriptions dispatched by scientists to regional farmers.
                </p>
              </div>

              <div className="history-cards-list">
                {completedHistory.map((item) => (
                  <div key={item.id} className="history-item-card">
                    <div className="history-header">
                      <div>
                        <span className="history-ticket-id">{item.id}</span>
                        <span className="history-farmer">{item.farmerName}</span>
                        <span className="history-loc">• {item.district}, {item.state || 'Punjab'}</span>
                      </div>
                      <span className="history-badge-resolved">Advisory Dispatched</span>
                    </div>

                    <div className="history-crop-row">
                      <span>Crop: <strong>{item.crop}</strong></span>
                      <span>Category: <strong>{item.category || 'Agronomic Diagnostics'}</strong></span>
                      <span>Date: <strong>{item.date}</strong></span>
                      <span>Consultant: <strong>{item.assignedConsultant || item.acceptedBy || 'Dr. Ananya Sharma'}</strong></span>
                    </div>

                    <div className="history-distress">
                      <span className="history-lbl">Initial Distress:</span>
                      <p>{item.description}</p>
                    </div>

                    <div className="history-prescription">
                      <span className="history-lbl">Dispatched Scientific Prescription:</span>
                      <p className="prescription-content">{item.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ===================================================================== */}
      {/* DIRECT BOOKING MODAL (FOR CLIENT SELECTING A SPECIFIC CONSULTANT) */}
      {/* ===================================================================== */}
      {selectedConsultantForBooking && (
        <div className="modal-overlay" onClick={() => setSelectedConsultantForBooking(null)}>
          <div
            className="modal-container direct-booking-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">DIRECT AGRO-ADVISORY INQUIRY</span>
                <h3 className="modal-title">Book Consultation with {selectedConsultantForBooking.name}</h3>
                <span className="modal-sub">
                  {selectedConsultantForBooking.title} • {selectedConsultantForBooking.institution}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedConsultantForBooking(null)}
                aria-label="Close booking modal"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="modal-body" noValidate>
              <div className="booking-modal-grid">
                <div className="form-group">
                  <label className="form-label">Crop under distress:</label>
                  <select
                    className="form-control"
                    value={bookingFormData.crop}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, crop: e.target.value })}
                  >
                    {COMMODITY_CROPS.filter((c) => c !== 'All Cultivated Crops').map((cr) => (
                      <option key={cr} value={cr}>
                        {cr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Problem Category:</label>
                  <select
                    className="form-control"
                    value={bookingFormData.category}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, category: e.target.value })}
                  >
                    {PROBLEM_CATEGORIES.filter((c) => c !== 'All Problem Specialties').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Landholding Area (Acres):</label>
                  <input
                    type="number"
                    step="0.5"
                    className={`form-control ${bookingErrors.acres ? 'input-error' : ''}`}
                    value={bookingFormData.acres}
                    onChange={(e) => {
                      setBookingFormData({ ...bookingFormData, acres: e.target.value });
                      if (bookingErrors.acres) setBookingErrors({ ...bookingErrors, acres: '' });
                    }}
                  />
                  {bookingErrors.acres && (
                    <span className="field-error-msg">{bookingErrors.acres}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Urgency:</label>
                  <select
                    className="form-control"
                    value={bookingFormData.urgency}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, urgency: e.target.value })}
                  >
                    <option value="Routine (3-5 days)">Routine (3-5 days)</option>
                    <option value="Medium Priority (24-48 hrs)">Medium Priority (24-48 hrs)</option>
                    <option value="Critical / Emergency (< 12 hrs)">Critical / Emergency (&lt; 12 hrs)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Describe Crop Symptoms &amp; Field Observations:</label>
                <textarea
                  rows={4}
                  className={`form-control ${bookingErrors.description ? 'input-error' : ''}`}
                  value={bookingFormData.description}
                  onChange={(e) => {
                    setBookingFormData({ ...bookingFormData, description: e.target.value });
                    if (bookingErrors.description) setBookingErrors({ ...bookingErrors, description: '' });
                  }}
                  placeholder="Detail the symptom appearance, crop growth stage, recent irrigation or sprays, and timeline..."
                />
                {bookingErrors.description && (
                  <span className="field-error-msg">{bookingErrors.description}</span>
                )}
                <span className="field-hint">Minimum 15 characters required for diagnostic review.</span>
              </div>

              <div className="booking-modal-footer">
                <button type="submit" className="btn-primary">
                  Submit Inquiry to {selectedConsultantForBooking.name}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSelectedConsultantForBooking(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
