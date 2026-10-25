import React, { useState } from 'react';
import '../css_pages/AuthCard.css';

const kisanRegistrationFields = [
  ['districtBlock', 'District / Block'],
  ['primaryCrops', 'Primary Crops'],
  ['landSize', 'Land Size (Acres)', 'number']
];


export default function AuthCard({ onLogin, onRegister }) {
  const [authMode, setAuthMode] = useState('signin');
  const [form, setForm] = useState({});
  const [errorModalMsg, setErrorModalMsg] = useState(null);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (authMode === 'signin') {
        onLogin(null, form);
      } else {
        onRegister('kisan', form);
      }
    } catch (err) {
      setErrorModalMsg(err.message || 'Authentication failed. Please check your details.');
    }
  };

  return (
    <>
      <section className="simple-panel auth-panel">
        <h2>{authMode === 'signin' ? 'Profile Access' : 'Kisan Registration'}</h2>
        <p className="simple-muted">
          {authMode === 'signin' 
            ? 'Sign in with your registered contact and password.' 
            : 'Register a Kisan (Farmer) profile. You can add Seller or Consultant roles later from your profile dashboard.'}
        </p>
        
        <div className="simple-tabs" role="tablist" aria-label="Account access">
          {['signin', 'register'].map((mode) => (
            <button key={mode} type="button" className={authMode === mode ? 'active' : ''} onClick={() => { setAuthMode(mode); setErrorModalMsg(null); }}>
              {mode === 'signin' ? 'Sign In' : 'Register (Kisan)'}
            </button>
          ))}
        </div>

        <form className="simple-form" onSubmit={handleSubmit}>
          {authMode === 'register' && (
            <>
              <label>Full Name *<input className="form-control" value={form.name || ''} onChange={(event) => update('name', event.target.value)} required /></label>
              <label>Profile Image URL (optional)<input className="form-control" type="url" value={form.avatarUrl || ''} onChange={(event) => update('avatarUrl', event.target.value)} /></label>
              {kisanRegistrationFields.map(([key, label, type]) => (
                <label key={key}>{label}<input className="form-control" type={type || 'text'} value={form[key] || ''} onChange={(event) => update(key, event.target.value)} required /></label>
              ))}
            </>
          )}

          <label>Email or Phone *<input className="form-control" value={form.emailOrPhone || ''} onChange={(event) => update('emailOrPhone', event.target.value)} required /></label>
          <label>Password *<input className="form-control" type="password" value={form.password || ''} onChange={(event) => update('password', event.target.value)} required /></label>
          
          <button className="simple-primary" type="submit">{authMode === 'signin' ? 'Sign In' : 'Create Kisan Account'}</button>
        </form>
      </section>

      {errorModalMsg && (
        <div className="simple-overlay" onClick={() => setErrorModalMsg(null)}>
          <div className="simple-panel auth-error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-head">
              <h2>Authentication Notice</h2>
              <button className="dialog-close" onClick={() => setErrorModalMsg(null)}>×</button>
            </div>
            <div className="edit-modal-body" style={{ padding: '16px 0', textAlign: 'center' }}>
              <p style={{ color: '#b91c1c', fontWeight: 500, marginBottom: '20px', fontSize: '1rem' }}>{errorModalMsg}</p>
              <button className="simple-primary" style={{ width: '100%' }} onClick={() => setErrorModalMsg(null)}>Okay, Try Again</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}