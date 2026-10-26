import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Consultation.css';
import consultationData from './consultationData.json';

const {
  heroImg,
  problemCategories,
  commodityCrops,
  urgencyTiers,
  defaultConsultants,
  defaultConsultations
} = consultationData;

export default function Consultation({ consultantView = false }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('agri_auth_user') || 'null');
  const [consultations, setConsultations] = useState(() => 
    JSON.parse(localStorage.getItem('agri_consultation_tickets') || JSON.stringify(defaultConsultations))
  );

  const [viewMode, setViewMode] = useState(consultantView ? 'workbench' : 'farmer');
  const [filter, setFilter] = useState({ category: problemCategories[0], crop: commodityCrops[0], urgency: urgencyTiers[0], description: '' });
  const [selected, setSelected] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [reply, setReply] = useState('');
  const [req, setReq] = useState({ farmerName: currentUser?.name || '', crop: '', acres: '', description: '' });
  const [errorMsg, setErrorMsg] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateTickets = (updated) => {
    setConsultations(updated);
    localStorage.setItem('agri_consultation_tickets', JSON.stringify(updated));
  };

  const filteredConsultants = useMemo(() => {
    return defaultConsultants.filter(c => {
      const matchCat = filter.category === problemCategories[0] || (c.specialties || []).some(s => s.toLowerCase().includes(filter.category.toLowerCase()));
      const matchCrop = filter.crop === commodityCrops[0] || (c.cropsSpecialized || []).some(cr => cr.toLowerCase().includes(filter.crop.split('(')[0].trim().toLowerCase()));
      return matchCat && matchCrop;
    });
  }, [filter]);

  const mine = consultations.filter(t => t.assignedConsultantId === currentUser?.id || t.assignedConsultant === currentUser?.name || (!t.assignedConsultantId && t.status === 'Pending Review'));
  const pending = mine.filter(t => !['Advisory Dispatched', 'Declined'].includes(t.status));
  const resolved = mine.filter(t => ['Advisory Dispatched', 'Declined'].includes(t.status));

  const toggleWorkbench = () => {
    if (viewMode === 'farmer') {
      if (!currentUser) return navigate('/profile');
      if (!currentUser.roles?.includes('consultant')) {
        return setErrorMsg('Access Denied: Register as a Consultant in your Profile first.');
      }
      setViewMode('workbench');
    } else {
      setViewMode('farmer');
    }
  };

  const submitRequest = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `KRISHI-ADV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: 'Just now',
      status: 'Pending Review',
      ...req,
      category: filter.category !== problemCategories[0] ? filter.category : '',
      urgency: filter.urgency,
      farmerId: currentUser?.id,
      assignedConsultant: selected.name,
      assignedConsultantId: selected.id
    };
    updateTickets([newTicket, ...consultations]);
    setSelected(null);
    setReq({ farmerName: currentUser?.name || '', crop: '', acres: '', description: '' });
    showToast('Consultation request submitted.', 'success');
  };

  // --- Sub-render Functions ---

  const renderToast = () => {
    if (!toast) return null;
    return (
      <div className="cs-toast-container">
        <div className={`cs-toast ${toast.type}`}>
          <span>{toast.message}</span>
          <button className="cs-toast-close" onClick={() => setToast(null)}>x</button>
        </div>
      </div>
    );
  };

  const renderBanner = () => (
    <div className="consult-banner">
      <img src={heroImg} alt="" className="consult-banner-img" />
      <div className="consult-banner-overlay">
        <div className="container consult-banner-container">
          <div className="consult-banner-text">
            <span className="page-eyebrow">AgroGuide Expert Advisory</span>
            <h1 className="consult-banner-title">
              {viewMode === 'workbench' ? 'Consultant Workbench & Queue' : 'Crop Consultation Marketplace'}
            </h1>
            <p className="consult-banner-sub">
              {viewMode === 'workbench'
                ? 'Review pending farmer inquiries, diagnose crop symptoms, and dispatch verified scientific recommendations.'
                : 'Connect directly with ICAR-accredited agronomists, soil health experts, and crop pathologists for personalized farm advisories.'}
            </p>
            <div className="consult-banner-badges">
              <span className="cb-badge"> ICAR-Accredited Specialists</span>
              <span className="cb-badge"> Priority Advisory Turnaround</span>
              <span className="cb-badge"> Science-Backed Prescriptions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkbench = () => (
    <div className="consultant-queue">
      {[{ title: 'Pending Cases', list: pending }, { title: 'Resolved Archives', list: resolved }].map(({ title, list }) => (
        <section key={title} className="simple-panel">
          <div className="cq-panel-header"><h2>{title} ({list.length})</h2></div>
          <div className="cq-panel-content">
            {list.length ? list.map(t => (
              <article key={t.id} className="cq-ticket-card">
                <div className="cq-ticket-top">
                  <strong>{t.farmerName} — {t.crop} ({t.acres} Acres)</strong>
                  <span className="cq-status">{t.status}</span>
                </div>
                <p className="cq-ticket-desc">{t.description}</p>
                {t.recommendation && <div className="cq-advisory-box"><strong>Advisory:</strong> {t.recommendation}</div>}
                {!['Advisory Dispatched', 'Declined'].includes(t.status) && (
                  <div className="cq-ticket-actions">
                    {t.status === 'Pending Review' && (
                      <>
                        <button className="simple-primary btn-sm" onClick={() => updateTickets(consultations.map(x => x.id === t.id ? { ...x, status: 'Accepted', assignedConsultant: currentUser.name, assignedConsultantId: currentUser.id } : x))}>Accept</button>
                        <button className="simple-secondary btn-sm" onClick={() => updateTickets(consultations.map(x => x.id === t.id ? { ...x, status: 'Declined' } : x))}>Decline</button>
                      </>
                    )}
                    {replyId === t.id ? (
                      <div className="cq-reply-form">
                        <textarea className="form-control" rows={3} placeholder="Write advisory..." value={reply} onChange={e => setReply(e.target.value)} />
                        <div className="cq-reply-actions">
                          <button className="simple-primary btn-sm" onClick={() => {
                            updateTickets(consultations.map(x => x.id === t.id ? { ...x, recommendation: reply, status: 'Advisory Dispatched', assignedConsultant: currentUser.name, assignedConsultantId: currentUser.id } : x));
                            setReplyId(null);
                            setReply('');
                            showToast('Advisory dispatched.', 'success');
                          }}>Dispatch</button>
                          <button className="simple-secondary btn-sm" onClick={() => setReplyId(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : <button className="simple-primary btn-sm" onClick={() => setReplyId(t.id)}>Write Advisory</button>}
                  </div>
                )}
              </article>
            )) : <p className="simple-muted">No cases in this queue.</p>}
          </div>
        </section>
      ))}
    </div>
  );

  const renderFarmerMarketplace = () => (
    <div className="consult-layout">
      <aside className="consult-filter">
        <h3 className="consult-filter-title">Filters</h3>
        <div className="consult-filter-fields">
          <label>Specialty
            <select className="form-control" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>
              {problemCategories.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Target Crop
            <select className="form-control" value={filter.crop} onChange={e => setFilter({ ...filter, crop: e.target.value })}>
              {commodityCrops.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Urgency
            <select className="form-control" value={filter.urgency} onChange={e => setFilter({ ...filter, urgency: e.target.value })}>
              {urgencyTiers.map(u => <option key={u}>{u}</option>)}
            </select>
          </label>
        </div>
      </aside>

      <div className="consult-results">
        <div className="consult-results-header"><h2>Verified Agronomists ({filteredConsultants.length})</h2></div>
        <div className="consultant-cards-list">
          {filteredConsultants.map(c => (
            <article key={c.id} className="cc-card">
              <img src={c.image} alt={c.name} className="cc-card-img" />
              <div className="cc-card-body">
                <div>
                  <strong className="cc-card-name">{c.name}</strong>
                  <p className="cc-card-role">{c.designation}</p>
                </div>
                <button className="cc-card-btn" onClick={() => setSelected(c)}>Request Consultation</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRequestDialog = () => {
    if (!selected) return null;
    return (
      <div className="simple-overlay" onClick={() => setSelected(null)}>
        <section className="request-dialog simple-panel" onClick={e => e.stopPropagation()}>
          <button className="dialog-close" onClick={() => setSelected(null)}>x</button>
          <h2>Request Advisory from {selected.name}</h2>
          <form className="simple-form" onSubmit={submitRequest}>
            <label>Your Name<input className="form-control" value={req.farmerName} onChange={e => setReq({ ...req, farmerName: e.target.value })} required /></label>
            <label>Crop<input className="form-control" value={req.crop} onChange={e => setReq({ ...req, crop: e.target.value })} required /></label>
            <label>Area (Acres)<input className="form-control" type="number" value={req.acres} onChange={e => setReq({ ...req, acres: e.target.value })} required /></label>
            <label>Problem Description<textarea className="form-control" rows={3} value={req.description} onChange={e => setReq({ ...req, description: e.target.value })} required /></label>
            <button type="submit" className="simple-primary">Submit Ticket</button>
          </form>
        </section>
      </div>
    );
  };

  const renderErrorDialog = () => {
    if (!errorMsg) return null;
    return (
      <div className="simple-overlay" onClick={() => setErrorMsg(null)}>
        <div className="request-dialog simple-panel" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
          <button className="dialog-close" onClick={() => setErrorMsg(null)}>x</button>
          <h2 className="error-modal-title">Notice</h2>
          <p className="simple-muted">{errorMsg}</p>
          <button className="simple-primary" style={{ marginTop: '16px', width: '100%' }} onClick={() => { setErrorMsg(null); navigate('/profile'); }}>Go to Profile</button>
        </div>
      </div>
    );
  };

    // Main Render 

  return (
    <main className="consultation-page">
      {renderToast()}
      {renderBanner()}

      <div className="container consult-body">
        <div className="consult-mode-bar">
          <button className={viewMode === 'workbench' ? 'simple-secondary' : 'simple-primary'} onClick={toggleWorkbench}>
            {viewMode === 'workbench' ? 'Switch to Farmer View' : `Consultant Workbench (${pending.length})`}
          </button>
        </div>

        {viewMode === 'workbench' ? renderWorkbench() : renderFarmerMarketplace()}
      </div>

      {renderRequestDialog()}
      {renderErrorDialog()}
    </main>
  );
}