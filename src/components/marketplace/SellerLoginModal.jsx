import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { INDIAN_STATES, DISTRICTS_DATA } from '../../data/localitiesData';

export default function SellerLoginModal({ isOpen, onClose, onSuccess }) {
  const { loginSeller, registerSeller } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('PB');
  const [selectedDistrict, setSelectedDistrict] = useState('Ludhiana');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const availableDistricts = DISTRICTS_DATA.filter((d) => d.stateId === selectedStateId);

  const validateLogin = () => {
    const errs = {};
    if (!phoneOrEmail.trim()) {
      errs.phoneOrEmail = 'Phone number or email is required.';
    } else {
      const cleanPhone = phoneOrEmail.replace(/\s+|-/g, '').replace(/^\+91/, '');
      const isPhone = /^[6-9]\d{9}$/.test(cleanPhone);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrEmail.trim());
      if (!isPhone && !isEmail) {
        errs.phoneOrEmail = 'Enter a valid 10-digit mobile number or email address.';
      }
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 4) {
      errs.password = 'Password must be at least 4 characters.';
    }
    return errs;
  };

  const validateRegister = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required.';
    } else if (name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters.';
    }

    if (!farmName.trim()) {
      errs.farmName = 'Farm or enterprise name is required.';
    } else if (farmName.trim().length < 3) {
      errs.farmName = 'Farm name must be at least 3 characters.';
    }

    if (!phoneOrEmail.trim()) {
      errs.phoneOrEmail = 'Mobile number or email is required.';
    } else {
      const cleanPhone = phoneOrEmail.replace(/\s+|-/g, '').replace(/^\+91/, '');
      const isPhone = /^[6-9]\d{9}$/.test(cleanPhone);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrEmail.trim());
      if (!isPhone && !isEmail) {
        errs.phoneOrEmail = 'Enter a valid 10-digit mobile number or email address.';
      }
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters for new registrations.';
    }

    return errs;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setTouched({ phoneOrEmail: true, password: true });
    const errs = validateLogin();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      showToast('Please fix the validation errors.', 'warning');
      return;
    }

    try {
      const user = loginSeller({
        emailOrPhone: phoneOrEmail,
        password,
        name: name || 'Kisan Farmer',
        farmName: farmName || 'Organic Farmland',
        district: selectedDistrict,
        state: INDIAN_STATES.find((s) => s.id === selectedStateId)?.name || 'Punjab'
      });
      showToast(`Welcome back, ${user.name}! Seller mode activated.`, 'success');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setTouched({ name: true, farmName: true, phoneOrEmail: true, password: true });
    const errs = validateRegister();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      showToast('Please fix the registration errors.', 'warning');
      return;
    }

    try {
      const stName = INDIAN_STATES.find((s) => s.id === selectedStateId)?.name || 'Punjab';
      const user = registerSeller({
        name: name.trim(),
        emailOrPhone: phoneOrEmail.trim(),
        password,
        farmName: farmName.trim(),
        district: selectedDistrict,
        state: stName
      });
      showToast(`Farm registered successfully! Welcome, ${user.name}.`, 'success');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const fillDemoAccount = (demoType) => {
    if (demoType === 'punjab') {
      setName('Sardar Gurpreet Singh');
      setPhoneOrEmail('9876543210');
      setPassword('kisan123');
      setFarmName('GreenFields Organic Farm');
      setSelectedStateId('PB');
      setSelectedDistrict('Ludhiana');
    } else {
      setName('Rameshwar Patil');
      setPhoneOrEmail('9822054321');
      setPassword('kisan123');
      setFarmName('Sahyadri Agri Orchards');
      setSelectedStateId('MH');
      setSelectedDistrict('Pune');
    }
    setErrors({});
    showToast('Loaded demo farmer credentials. Click "Sign In"!', 'info');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Farmer &amp; Seller Authentication" maxWidth="600px">
      <div className="seller-auth-modal">
        {/* Tab Toggle */}
        <div className="auth-tabs-row">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setErrors({});
            }}
          >
            Sign In Existing Seller
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setErrors({});
            }}
          >
            Register New Farm Account
          </button>
        </div>

        {/* Quick Demo Credentials Box */}
        <div className="demo-credentials-box">
          <span className="demo-title">Quick 1-Click Demo Profiles (For Instant Verification):</span>
          <div className="demo-btns-row">
            <button
              type="button"
              className="demo-profile-btn"
              onClick={() => fillDemoAccount('punjab')}
            >
              Punjab Demo Farmer (Ludhiana)
            </button>
            <button
              type="button"
              className="demo-profile-btn"
              onClick={() => fillDemoAccount('maharashtra')}
            >
              Maharashtra Demo Farmer (Pune)
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-contact-input">Registered 10-Digit Mobile or Email: *</label>
              <input
                id="login-contact-input"
                type="text"
                className={`form-control ${touched.phoneOrEmail && errors.phoneOrEmail ? 'input-error' : ''}`}
                placeholder="e.g. 9876543210 or farmer@agri.in"
                value={phoneOrEmail}
                onChange={(e) => {
                  setPhoneOrEmail(e.target.value);
                  if (errors.phoneOrEmail) setErrors((prev) => ({ ...prev, phoneOrEmail: '' }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, phoneOrEmail: true }))}
                required
              />
              {touched.phoneOrEmail && errors.phoneOrEmail && (
                <span className="field-error-message">{errors.phoneOrEmail}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password-input">Password: *</label>
              <input
                id="login-password-input"
                type="password"
                className={`form-control ${touched.password && errors.password ? 'input-error' : ''}`}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                required
              />
              {touched.password && errors.password && (
                <span className="field-error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-actions-row">
              <button type="submit" className="btn-primary">
                Sign In to Seller Dashboard
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form" noValidate>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name-input">Farmer Full Name: *</label>
                <input
                  id="reg-name-input"
                  type="text"
                  className={`form-control ${touched.name && errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Balwinder Singh"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  required
                />
                {touched.name && errors.name && (
                  <span className="field-error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-farm-input">Farm / Enterprise Name: *</label>
                <input
                  id="reg-farm-input"
                  type="text"
                  className={`form-control ${touched.farmName && errors.farmName ? 'input-error' : ''}`}
                  placeholder="e.g. Golden Harvest Farm"
                  value={farmName}
                  onChange={(e) => {
                    setFarmName(e.target.value);
                    if (errors.farmName) setErrors((prev) => ({ ...prev, farmName: '' }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, farmName: true }))}
                  required
                />
                {touched.farmName && errors.farmName && (
                  <span className="field-error-message">{errors.farmName}</span>
                )}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-state-select">State of Farmland: *</label>
                <select
                  id="reg-state-select"
                  className="form-control"
                  value={selectedStateId}
                  onChange={(e) => {
                    setSelectedStateId(e.target.value);
                    const firstD = DISTRICTS_DATA.find((d) => d.stateId === e.target.value);
                    if (firstD) setSelectedDistrict(firstD.name);
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
                <label className="form-label" htmlFor="reg-district-select">District: *</label>
                <select
                  id="reg-district-select"
                  className="form-control"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  {availableDistricts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-contact-input">10-Digit Mobile or Email: *</label>
                <input
                  id="reg-contact-input"
                  type="text"
                  className={`form-control ${touched.phoneOrEmail && errors.phoneOrEmail ? 'input-error' : ''}`}
                  placeholder="e.g. 9814100000"
                  value={phoneOrEmail}
                  onChange={(e) => {
                    setPhoneOrEmail(e.target.value);
                    if (errors.phoneOrEmail) setErrors((prev) => ({ ...prev, phoneOrEmail: '' }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, phoneOrEmail: true }))}
                  required
                />
                {touched.phoneOrEmail && errors.phoneOrEmail && (
                  <span className="field-error-message">{errors.phoneOrEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-password-input">Create Password (Min 6 Chars): *</label>
                <input
                  id="reg-password-input"
                  type="password"
                  className={`form-control ${touched.password && errors.password ? 'input-error' : ''}`}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  required
                />
                {touched.password && errors.password && (
                  <span className="field-error-message">{errors.password}</span>
                )}
              </div>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="btn-primary">
                Register Verified Seller Account
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
