import React, { useState } from 'react';
import Modal from './Modal';

export default function FormValidationTopicModal({ isOpen, onClose }) {

  // Interactive Live Sandbox State inside the modal
  const [testFieldType, setTestFieldType] = useState('phone');
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  // Validation function for sandbox
  const getValidationResult = () => {
    if (!inputValue) {
      return { isValid: false, message: 'Field is empty (Required).' };
    }

    if (testFieldType === 'phone') {
      const clean = inputValue.replace(/\s+|-/g, '');
      const regex = /^[6-9]\d{9}$/;
      if (regex.test(clean)) {
        return { isValid: true, message: 'Valid 10-digit Indian Mobile Number' };
      }
      return { isValid: false, message: 'Invalid format. Must be exactly 10 digits starting with 6, 7, 8, or 9.' };
    }

    if (testFieldType === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(inputValue.trim())) {
        return { isValid: true, message: 'Valid Email Address syntax' };
      }
      return { isValid: false, message: 'Invalid email structure (missing @ or domain).' };
    }

    if (testFieldType === 'number') {
      const num = parseFloat(inputValue);
      if (isNaN(num)) return { isValid: false, message: 'Value must be a valid number.' };
      if (num < 1 || num > 100) return { isValid: false, message: 'Number must be between 1 and 100.' };
      return { isValid: true, message: `Valid numeric range: ${num}` };
    }

    return { isValid: true, message: 'Valid input' };
  };

  const validation = getValidationResult();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Form Validation & Modal Architecture (Syllabus Lectures 55-66)"
      maxWidth="780px"
    >
      <div className="topic-modal-content">
        <div className="topic-overview-banner">
          <span className="topic-pill">WEB CURRICULUM DEEP DIVE</span>
          <h4>Controlled Components, Dynamic Form Validation &amp; Accessible Dialogs</h4>
          <p>
            This technical reference outlines the implementation of rigorous client-side form validation
            strategies and modal dialog lifecycle in modern React applications.
          </p>
        </div>

        {/* Key Architectural Concepts */}
        <div className="topic-pillars-grid">
          <div className="topic-pillar-card">
            <span className="concept-badge-tag">FOUNDATION</span>
            <h5>Controlled Inputs</h5>
            <p>
              Form element values are bounded strictly to component state via <code>value</code> and <code>onChange</code>.
              The React component acts as the single source of truth.
            </p>
          </div>

          <div className="topic-pillar-card">
            <span className="concept-badge-tag">VALIDATION</span>
            <h5>Touched State &amp; Regex</h5>
            <p>
              Error messages only show after an input has been focused and blurred (<code>onBlur</code>).
              Regex patterns validate formats like phone <code>/^[6-9]\d{9}$/</code> and email.
            </p>
          </div>

          <div className="topic-pillar-card">
            <span className="concept-badge-tag">ACCESSIBILITY</span>
            <h5>Accessible Modal Shell</h5>
            <p>
              Modals feature backdrop blur, <code>role="dialog"</code>, ESC key dismissal (<code>useEffect</code> listener),
              and scroll-locking by updating <code>document.body.style.overflow</code>.
            </p>
          </div>
        </div>

        {/* Live Interactive Testing Sandbox */}
        <div className="topic-sandbox-box">
          <div className="sandbox-header">
            <span className="sandbox-tag">LIVE INTERACTIVE VALIDATOR</span>
            <h5>Test Real-Time Validation Patterns:</h5>
          </div>

          <div className="sandbox-type-selector">
            <button
              type="button"
              className={`sandbox-tab ${testFieldType === 'phone' ? 'active' : ''}`}
              onClick={() => {
                setTestFieldType('phone');
                setInputValue('');
                setTouched(false);
              }}
            >
              10-Digit Mobile Pattern
            </button>
            <button
              type="button"
              className={`sandbox-tab ${testFieldType === 'email' ? 'active' : ''}`}
              onClick={() => {
                setTestFieldType('email');
                setInputValue('');
                setTouched(false);
              }}
            >
              Email Address Pattern
            </button>
            <button
              type="button"
              className={`sandbox-tab ${testFieldType === 'number' ? 'active' : ''}`}
              onClick={() => {
                setTestFieldType('number');
                setInputValue('');
                setTouched(false);
              }}
            >
              Acreage / Range (1 - 100)
            </button>
          </div>

          <div className="sandbox-input-area">
            <label className="form-label">
              Test Input ({testFieldType === 'phone' ? 'Enter Indian Phone Number' : testFieldType === 'email' ? 'Enter Farmer Email' : 'Enter Acres 1 to 100'}):
            </label>
            <input
              type="text"
              className={`form-control ${touched ? (validation.isValid ? 'input-valid' : 'input-error') : ''}`}
              placeholder={testFieldType === 'phone' ? '9876543210' : testFieldType === 'email' ? 'farmer@agrismart.in' : '25'}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setTouched(true);
              }}
              onBlur={() => setTouched(true)}
            />

            {touched && (
              <div className={`sandbox-feedback ${validation.isValid ? 'success' : 'error'}`}>
                <span className="feedback-badge">{validation.isValid ? 'VALID' : 'INVALID'}</span>
                <span className="feedback-text">{validation.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Implementation Matrix Table */}
        <div className="topic-table-wrap">
          <table className="topic-spec-table">
            <thead>
              <tr>
                <th>Application Feature</th>
                <th>Validation Logic Applied</th>
                <th>Modal UX Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Seller Portal Login</strong></td>
                <td>Regex phone / email, password min length 4, state binding</td>
                <td>Full screen overlay, accessible close, demo auto-fill</td>
              </tr>
              <tr>
                <td><strong>Produce Upload</strong></td>
                <td>Title min 3 chars, positive price &gt; 0, stock quantity integer</td>
                <td>Dynamic category select, real-time broadcast</td>
              </tr>
              <tr>
                <td><strong>Direct Farmer Order</strong></td>
                <td>Strict 10-digit phone, buyer name, delivery address required</td>
                <td>Invoice receipt summary view on confirmation</td>
              </tr>
              <tr>
                <td><strong>Agronomy Consultation</strong></td>
                <td>Name regex, 10-digit mobile, acreage limits, min 15 chars text</td>
                <td>Ticket generation with printable receipt state</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="topic-actions">
          <button type="button" className="btn-primary" onClick={onClose}>
            Close Topic Review
          </button>
        </div>
      </div>
    </Modal>
  );
}
