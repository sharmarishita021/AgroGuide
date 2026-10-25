import React, { useState } from 'react';
import Modal from './Modal';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { INDIAN_STATES, DISTRICTS_DATA } from '../../data/localitiesData';
import { IMAGES } from '../../data/imagesData';
import { CONSULTANTS } from '../../data/consultantsData';

export default function ExpertConsultationModal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const { currentUser, registeredConsultants, recordConsultation } = useAuth();

  const [formData, setFormData] = useState({
    farmerName: '',
    phone: '',
    stateId: 'PB',
    district: 'Ludhiana',
    crop: 'Wheat',
    acres: '4.5',
    soilType: 'Alluvial Loamy Soil',
    urgency: 'Medium Priority (24-48 hrs)',
    consultationType: 'Remote',
    consultantCount: '1',
    description: '',
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  // Strict Validation Rules
  const validateField = (field, value) => {
    switch (field) {
      case 'farmerName':
        if (!value.trim()) return 'Farmer name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        if (!/^[a-zA-Z\s.'-]+$/.test(value)) return 'Name should only contain letters and spaces.';
        return '';

      case 'phone':
        if (!value.trim()) return 'Mobile number is required.';
        const cleanPhone = value.replace(/\s+|-/g, '').replace(/^\+91/, '');
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          return 'Enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).';
        }
        return '';

      case 'acres':
        if (!value) return 'Land area is required.';
        const num = parseFloat(value);
        if (isNaN(num) || num <= 0) return 'Land area must be greater than 0.';
        if (num > 500) return 'Land area cannot exceed 500 acres for individual advisory.';
        return '';

      case 'description':
        if (!value.trim()) return 'Please describe your crop distress or agronomic inquiry.';
        if (value.trim().length < 15) return 'Description must be at least 15 characters long.';
        if (value.trim().length > 600) return 'Description cannot exceed 600 characters.';
        return '';

      case 'agreeTerms':
        if (!value) return 'You must agree to receive agronomy advisory notifications.';
        return '';

      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched({
      farmerName: true,
      phone: true,
      acres: true,
      description: true,
      agreeTerms: true
    });

    if (Object.keys(newErrors).length > 0) {
      showToast('Please correct the highlighted form errors before submitting.', 'warning');
      return;
    }

    const stateObj = INDIAN_STATES.find((s) => s.id === formData.stateId);
    const ticketId = 'KRISHI-ADV-' + Math.floor(100000 + Math.random() * 900000);

    const ticket = {
      id: ticketId,
      ...formData,
      stateName: stateObj?.name || 'Punjab',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      farmerId: currentUser?.id,
      assignedConsultant: 'Open Pool',
      consultationType: formData.consultationType,
      consultantCount: formData.consultationType === 'On-site'
        ? Number(formData.consultantCount)
        : 1
    };

    recordConsultation(ticket);

    setTicketDetails(ticket);
    setIsSubmitted(true);
    showToast(`Consultation Ticket #${ticketId} created! An agronomist will review your request.`, 'success');
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setTicketDetails(null);
    setFormData({
      farmerName: '',
      phone: '',
      stateId: 'PB',
      district: 'Ludhiana',
      crop: 'Wheat',
      acres: '4.5',
      soilType: 'Alluvial Loamy Soil',
      urgency: 'Medium Priority (24-48 hrs)',
      consultationType: 'Remote',
      consultantCount: '1',
      description: '',
      agreeTerms: true
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  const availableDistricts = DISTRICTS_DATA.filter((d) => d.stateId === formData.stateId);
  const availableConsultantCount = registeredConsultants.length + CONSULTANTS.filter(
    (consultant) => !registeredConsultants.some(
      (profile) => profile.name.toLowerCase() === consultant.name.toLowerCase()
    )
  ).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? 'Agronomy Consultation Ticket Confirmed' : 'Request Agronomy Expert Consultation'}
      maxWidth="750px"
    >
      {!isSubmitted ? (
        <div className="expert-consultation-body">
          {/* Header Banner with Clean Agriculture Image */}
          <div className="modal-banner-image-wrap">
            <img
              src={"https://imgs.search.brave.com/43QXPoCGZ5OS4DD6avSfJa6cP9CZwYstD_-p0m0HgKI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjQ5/NzMwMzIwL3Bob3Rv/L2JlYXV0aWZ1bC12/aWV3LW9mLWNvcm4t/ZmFybS1kdXJpbmct/c3Vuc2V0LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1icHZ3/S09aV2Zuc1J1Smsz/YXpyTGdiOUdjV2xj/STE4b3Y1M3JSekh6/eWFZPQ"}
              alt="Agronomy scientist examining crop health in field"
              className="modal-banner-image"
            />
            <div className="modal-banner-overlay">
              <span className="modal-pill-tag">OFFICIAL ICAR / KVK LINKED SUPPORT</span>
              <h4 className="modal-banner-headline">Direct Guidance from Certified Soil Scientists &amp; Pathologists</h4>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="consultation-form" noValidate>
            <div className="form-note-banner">
              <strong>Form Validation Standards:</strong> All fields marked with * undergo client-side validation for pattern integrity, length boundaries, and mobile number verification.
            </div>

            {/* Farmer Name & Mobile */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="consult-name">
                  Farmer Full Name: *
                </label>
                <input
                  id="consult-name"
                  type="text"
                  className={`form-control ${touched.farmerName && errors.farmerName ? 'input-error' : ''} ${touched.farmerName && !errors.farmerName ? 'input-valid' : ''}`}
                  placeholder="e.g. Ramesh Chandra Verma"
                  value={formData.farmerName}
                  onChange={(e) => handleChange('farmerName', e.target.value)}
                  onBlur={() => handleBlur('farmerName')}
                  required
                />
                {touched.farmerName && errors.farmerName && (
                  <span className="field-error-message">{errors.farmerName}</span>
                )}
                {touched.farmerName && !errors.farmerName && (
                  <span className="field-success-message">Name verified</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="consult-phone">
                  10-Digit Mobile Number: *
                </label>
                <input
                  id="consult-phone"
                  type="tel"
                  className={`form-control ${touched.phone && errors.phone ? 'input-error' : ''} ${touched.phone && !errors.phone ? 'input-valid' : ''}`}
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  required
                />
                {touched.phone && errors.phone && (
                  <span className="field-error-message">{errors.phone}</span>
                )}
                {touched.phone && !errors.phone && (
                  <span className="field-success-message">Valid 10-digit number</span>
                )}
              </div>
            </div>

            {/* State & District */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="consult-state">
                  Farmland State: *
                </label>
                <select
                  id="consult-state"
                  className="form-control"
                  value={formData.stateId}
                  onChange={(e) => {
                    const st = e.target.value;
                    const firstDist = DISTRICTS_DATA.find((d) => d.stateId === st);
                    setFormData((prev) => ({
                      ...prev,
                      stateId: st,
                      district: firstDist ? firstDist.name : ''
                    }));
                  }}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="consult-district">
                  District: *
                </label>
                <select
                  id="consult-district"
                  className="form-control"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                >
                  {availableDistricts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Standing Crop, Land Area, Soil Type */}
            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="consult-crop">
                  Primary Crop: *
                </label>
                <select
                  id="consult-crop"
                  className="form-control"
                  value={formData.crop}
                  onChange={(e) => handleChange('crop', e.target.value)}
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Paddy / Basmati Rice">Paddy / Rice</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Maize">Maize</option>
                  <option value="Gram / Pulses">Pulses / Chickpea</option>
                  <option value="Tomato / Vegetables">Vegetables</option>
                  <option value="Orchard Fruits">Fruit Orchard</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="consult-acres">
                  Land Holding (Acres): *
                </label>
                <input
                  id="consult-acres"
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="500"
                  className={`form-control ${touched.acres && errors.acres ? 'input-error' : ''} ${touched.acres && !errors.acres ? 'input-valid' : ''}`}
                  value={formData.acres}
                  onChange={(e) => handleChange('acres', e.target.value)}
                  onBlur={() => handleBlur('acres')}
                  required
                />
                {touched.acres && errors.acres && (
                  <span className="field-error-message">{errors.acres}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="consult-urgency">
                  Advisory Urgency:
                </label>
                <select
                  id="consult-urgency"
                  className="form-control"
                  value={formData.urgency}
                  onChange={(e) => handleChange('urgency', e.target.value)}
                >
                  <option value="Routine Advisory (3-5 days)">Routine Advisory (3-5 days)</option>
                  <option value="Medium Priority (24-48 hrs)">Medium Priority (24-48 hrs)</option>
                  <option value="High / Pest Outbreak (Under 12 hrs)">High / Pest Outbreak (&lt; 12 hrs)</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="consult-type">Consultation type:</label>
                <select
                  id="consult-type"
                  className="form-control"
                  value={formData.consultationType}
                  onChange={(e) => handleChange('consultationType', e.target.value)}
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              {formData.consultationType === 'On-site' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="consultant-count">Number of consultants:</label>
                  <select
                    id="consultant-count"
                    className="form-control"
                    value={formData.consultantCount}
                    onChange={(e) => handleChange('consultantCount', e.target.value)}
                  >
                    {Array.from({
                      length: Math.max(1, availableConsultantCount)
                    }, (_, index) => (
                      <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div className="form-group">
              <div className="label-with-counter">
                <label className="form-label" htmlFor="consult-desc">
                  Detailed Symptoms &amp; Farmland Problem: *
                </label>
                <span className="char-counter">
                  {formData.description.length} / 600 characters
                </span>
              </div>
              <textarea
                id="consult-desc"
                rows="4"
                className={`form-control ${touched.description && errors.description ? 'input-error' : ''} ${touched.description && !errors.description ? 'input-valid' : ''}`}
                placeholder="Mention leaf discoloration, pest activity, soil moisture conditions, or previous chemical/organic sprays applied..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={() => handleBlur('description')}
                required
              />
              {touched.description && errors.description && (
                <span className="field-error-message">{errors.description}</span>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="form-group checkbox-group">
              <label className="styled-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                />
                <span>
                  I confirm the farmland details are accurate and agree to receive telephone/SMS advisory from Krishi Vigyan Kendra agronomists.
                </span>
              </label>
              {touched.agreeTerms && errors.agreeTerms && (
                <span className="field-error-message">{errors.agreeTerms}</span>
              )}
            </div>

            {/* Submit Actions */}
            <div className="form-actions-row">
              <button type="submit" className="btn-primary btn-submit-consult">
                Submit Consultation Request
              </button>
              <button type="button" className="btn-secondary" onClick={handleResetAndClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Confirmed Ticket Receipt View */
        <div className="consultation-success-view">
          <div className="ticket-receipt-card">
            <div className="ticket-top-header">
              <span className="ticket-badge">OFFICIAL CONSULTATION TICKET</span>
              <span className="ticket-number">Ticket Reference: {ticketDetails?.id}</span>
            </div>

            <div className="ticket-grid">
              <div className="ticket-item">
                <span className="ticket-label">Farmer Name</span>
                <strong className="ticket-value">{ticketDetails?.farmerName}</strong>
              </div>
              <div className="ticket-item">
                <span className="ticket-label">Registered Contact</span>
                <strong className="ticket-value">{ticketDetails?.phone}</strong>
              </div>
              <div className="ticket-item">
                <span className="ticket-label">Location</span>
                <strong className="ticket-value">{ticketDetails?.district}, {ticketDetails?.stateName}</strong>
              </div>
              <div className="ticket-item">
                <span className="ticket-label">Crop &amp; Land Area</span>
                <strong className="ticket-value">{ticketDetails?.crop} ({ticketDetails?.acres} Acres)</strong>
              </div>
              <div className="ticket-item">
                <span className="ticket-label">Assigned Urgency</span>
                <strong className="ticket-value">{ticketDetails?.urgency}</strong>
              </div>
              <div className="ticket-item">
                <span className="ticket-label">Logged At</span>
                <strong className="ticket-value">Today at {ticketDetails?.createdAt}</strong>
              </div>
            </div>

            <div className="ticket-query-summary">
              <span className="ticket-label">Reported Symptoms / Query:</span>
              <p className="ticket-desc">{ticketDetails?.description}</p>
            </div>

            <div className="ticket-footer-instructions">
              <p>
                A district agronomy specialist will review this ticket and contact you via phone. In case of emergency crop disease, call the National Kisan Helpline at <strong>1800-180-1551</strong> with ticket number <strong>{ticketDetails?.id}</strong>.
              </p>
            </div>
          </div>

          <div className="ticket-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleResetAndClose}
            >
              Done &amp; Return to Dashboard
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                window.print();
              }}
            >
              Print Consultation Receipt
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
