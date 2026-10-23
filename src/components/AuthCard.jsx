import React, { useState } from 'react';

const roleFields = {
  basic: [
    ['districtBlock', 'District / Block'],
    ['primaryCrops', 'Primary Crops'],
    ['landSize', 'Land Size (Acres)', 'number']
  ],
  seller: [
    ['businessName', 'Business / Store Name'],
    ['category', 'Category', 'select'],
    ['pickupAddress', 'Pickup Address'],
    ['licenseGstId', 'License / GST ID'],
    ['workHistory', 'Work History']
  ],
  consultant: [
    ['title', 'Designation'],
    ['institution', 'Affiliated University / Institution'],
    ['icarExtensionId', 'ICAR / Extension ID'],
    ['specializations', 'Agronomic Specialties'],
    ['workHistory', 'Work History']
  ]
};

export default function AuthCard({ onLogin, onRegister, initialRole = 'basic' }) {
  const [authMode, setAuthMode] = useState('signin');
  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({});
  const fields = authMode === 'register' ? roleFields[role] : [];
  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const details = role === 'consultant' && typeof form.specializations === 'string'
      ? { ...form, specializations: form.specializations.split(',').map((item) => item.trim()).filter(Boolean) }
      : form;
    (authMode === 'signin' ? onLogin : onRegister)(role, details);
  };

  return (
    <section className="simple-panel auth-panel">
      <h2>{role === 'consultant' ? 'Consultant Portal' : 'Profile Access'}</h2>
      <p className="simple-muted">Sign in or create a role-specific account.</p>
      <div className="simple-tabs" role="tablist" aria-label="Account access">
        {['signin', 'register'].map((mode) => (
          <button key={mode} type="button" className={authMode === mode ? 'active' : ''} onClick={() => setAuthMode(mode)}>
            {mode === 'signin' ? 'Sign In' : 'Register'}
          </button>
        ))}
      </div>
      <form className="simple-form" onSubmit={handleSubmit}>
        <label>Account Type
          <select className="form-control" value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="basic">Farmer / Kisan</option>
            <option value="seller">Farm Seller</option>
            <option value="consultant">Consultant / Expert</option>
          </select>
        </label>
        {authMode === 'register' && <>
          <label>Full Name<input className="form-control" value={form.name || ''} onChange={(event) => update('name', event.target.value)} required /></label>
          <label>Profile Image URL (optional)<input className="form-control" type="url" value={form.avatarUrl || ''} onChange={(event) => update('avatarUrl', event.target.value)} /></label>
          {fields.map(([key, label, type]) => (
            <label key={key}>{label}
              {type === 'select' ? (
                <select className="form-control" value={form[key] || ''} onChange={(event) => update(key, event.target.value)} required>
                  <option value="">Choose category</option><option>Seeds</option><option>Fertilizers</option><option>Equipment</option>
                </select>
              ) : <input className="form-control" type={type || 'text'} value={form[key] || ''} onChange={(event) => update(key, event.target.value)} required />}
            </label>
          ))}
        </>}
        <label>Email or Phone<input className="form-control" value={form.emailOrPhone || ''} onChange={(event) => update('emailOrPhone', event.target.value)} required /></label>
        <label>Password<input className="form-control" type="password" value={form.password || ''} onChange={(event) => update('password', event.target.value)} required /></label>
        <button className="simple-primary" type="submit">{authMode === 'signin' ? 'Sign In' : 'Create Account'}</button>
      </form>
    </section>
  );
}
