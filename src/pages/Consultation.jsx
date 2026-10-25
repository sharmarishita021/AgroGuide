import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CONSULTANTS, PROBLEM_CATEGORIES, COMMODITY_CROPS } from '../data/consultantsData';
import { IMAGES } from '../data/imagesData';

import '../css_pages/Consultation.css';

const URGENCY = ['Routine (3–5 days)', 'Medium Priority (24–48 hrs)', 'High / Pest Outbreak (<12 hrs)'];
const EMPTY = { category: PROBLEM_CATEGORIES[0], crop: COMMODITY_CROPS[0], urgency: URGENCY[0], description: '' };
const isResolved = (t) => ['Advisory Dispatched', 'Declined / Re-routed'].includes(t.status);

export default function Consultation() {
  const navigate = useNavigate();
  const { currentUser, consultations = [], registeredConsultants = [], recordConsultation, acceptConsultation, declineConsultation, respondToConsultation } = useAuth();
  const { showToast } = useToast();

  const [viewMode, setViewMode] = useState('farmer');
  const [filter, setFilter] = useState(EMPTY);
  const [selected, setSelected] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [reply, setReply] = useState('');
  const [req, setReq] = useState({ farmerName: currentUser?.name || '', district: currentUser?.district || '', crop: '', acres: '', consultationType: 'remote', description: '' });
  const [errorModalMsg, setErrorModalMsg] = useState(null);

  // Outer container toggle: true = show all tickets, false = show none (collapsed)
  const [showAllSections, setShowAllSections] = useState({ pending: true, resolved: true });
  const toggleSection = (key) => setShowAllSections(prev => ({ ...prev, [key]: !prev[key] }));

  const allConsultants = useMemo(() => {
    const map = Object.fromEntries(CONSULTANTS.map(c => [c.id, c]));
    registeredConsultants.forEach(r => { map[r.id] = { ...map[r.id], ...r }; });
    return Object.values(map);
  }, [registeredConsultants]);

  const filteredConsultants = useMemo(() => {
    return allConsultants.filter(c => {
      const specs = [...(c.specialties || []), ...(c.specializations || []), c.agronomicSpecialties || ''].join(' ').toLowerCase();
      const crops = [...(c.cropsSpecialized || [])].join(' ').toLowerCase();
      return (filter.category === PROBLEM_CATEGORIES[0] || specs.includes(filter.category.toLowerCase())) &&
             (filter.crop === COMMODITY_CROPS[0] || crops.includes(filter.crop.split('(')[0].trim().toLowerCase()));
    });
  }, [allConsultants, filter]);

  const mine = consultations.filter(t => t.assignedConsultantId === currentUser?.id || t.assignedConsultant === currentUser?.name || (!t.assignedConsultantId && t.status === 'Pending Review'));
  const pendingCount = mine.filter(t => !isResolved(t)).length;

  const handleWorkbenchToggle = () => {
    if (viewMode === 'farmer') {
      if (!currentUser) {
        navigate('/profile');
        return;
      }
      const isConsultant = currentUser.roles?.includes('consultant') || currentUser.role === 'consultant';
      if (!isConsultant) {
        setErrorModalMsg('Access Denied: Your account is not registered as a Consultant. Go to your Profile dashboard to register your consultant credentials first.');
        return;
      }
      setViewMode('workbench');
    } else {
      setViewMode('farmer');
    }
  };

  const submitRequest = (e) => {
    e.preventDefault();
    recordConsultation({ ...req, acres: Number(req.acres), category: filter.category !== PROBLEM_CATEGORIES[0] ? filter.category : '', urgency: filter.urgency, farmerId: currentUser?.id, assignedConsultant: selected.name, assignedConsultantId: selected.id });
    setSelected(null);
    setReq(r => ({ ...r, crop: '', acres: '', description: '' }));
    showToast('Consultation request sent successfully.', 'success');
  };

  return (
    <main className="consultation-page">
      <div className="consult-banner">
        <img src={IMAGES.heroes.consultant} alt="Consultation" className="consult-banner-img" />
        <div className="consult-banner-overlay">
          <div className="container">
            <p className="page-eyebrow">Expert Support</p>
            <h1 className="consult-banner-title">
              {viewMode === 'workbench' ? 'Expert Consultant Workbench' : 'Crop Consultation &amp; Diagnostics'}
            </h1>
          </div>
        </div>
      </div>

      <div className="container consult-body">
        <div className="consult-mode-bar">
          <button className={viewMode === 'workbench' ? 'simple-secondary' : 'simple-primary'} onClick={handleWorkbenchToggle}>
            {viewMode === 'workbench' ? '← Return to Farmer View' : <>Consultant Workbench {pendingCount > 0 && <span className="cq-count">{pendingCount}</span>}</>}
          </button>
        </div>

        {viewMode === 'workbench' ? (
          <div className="consultant-queue">
            {[
              { key: 'pending', label: 'Pending Inquiries', items: mine.filter(t => !isResolved(t)) }, 
              { key: 'resolved', label: 'Resolved Case Archives', items: mine.filter(isResolved) }
            ].map(({ key, label, items }) => {
              const isShown = showAllSections[key];
              return (
                <section key={key} className="simple-panel">
                  <div className="cq-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <h2>{label}</h2>
                      <span className="cq-count">{items.length} Tickets</span>
                    </div>
                    <button className="pf-expand-arrow-btn" onClick={() => toggleSection(key)}>
                      {isShown ? 'See None ▲' : 'See All ▼'}
                    </button>
                  </div>

                  {isShown && (
                    <div className="cq-panel-content" style={{ marginTop: '16px' }}>
                      {items.length ? items.map(t => (
                        <article key={t.id} className="cq-ticket-card">
                          <div className="cq-ticket-top">
                            <div>
                              <span className="cq-ticket-name">{t.farmerName}</span>
                              <span className="cq-ticket-crop">{t.crop} ({t.acres} Acres)</span>
                            </div>
                            <span className="cq-status">{t.status}</span>
                          </div>
                          <p className="cq-ticket-desc">{t.description}</p>
                          {t.recommendation && <div className="cq-advisory-box"><strong>Advisory Issued:</strong> {t.recommendation}</div>}
                          {!isResolved(t) && (
                            <div className="cq-ticket-actions">
                              {t.status === 'Pending Review' && (
                                <>
                                  <button className="simple-primary btn-sm" onClick={() => acceptConsultation(t.id, currentUser.name, currentUser.id)}>Accept Case</button>
                                  <button className="simple-secondary btn-sm" onClick={() => declineConsultation(t.id)}>Decline</button>
                                </>
                              )}
                              {replyId === t.id ? (
                                <div className="cq-reply-form">
                                  <textarea className="form-control" rows={3} placeholder="Draft expert recommendation & dosage..." value={reply} onChange={e => setReply(e.target.value)} />
                                  <div className="cq-reply-actions">
                                    <button className="simple-primary btn-sm" onClick={() => { respondToConsultation(t.id, reply, currentUser.id, currentUser.name); setReplyId(null); setReply(''); showToast('Advisory dispatched.', 'success'); }}>Dispatch Advisory</button>
                                    <button className="simple-secondary btn-sm" onClick={() => setReplyId(null)}>Cancel</button>
                                  </div>
                                </div>
                              ) : <button className="simple-primary btn-sm" onClick={() => setReplyId(t.id)}>Write Advisory</button>}
                            </div>
                          )}
                        </article>
                      )) : <p className="simple-muted">No tickets available in this category.</p>}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="consult-layout">
            <aside className="consult-filter">
              <h3 className="consult-filter-title">Find Expert</h3>
              <div className="consult-filter-fields">
                <label>Problem Type
                  <select className="form-control" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>
                    {PROBLEM_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label>Target Crop
                  <select className="form-control" value={filter.crop} onChange={e => setFilter({ ...filter, crop: e.target.value })}>
                    {COMMODITY_CROPS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label>Urgency Level
                  <select className="form-control" value={filter.urgency} onChange={e => setFilter({ ...filter, urgency: e.target.value })}>
                    {URGENCY.map(u => <option key={u}>{u}</option>)}
                  </select>
                </label>
                <label>Description Filter
                  <textarea className="form-control" rows={2} value={filter.description} onChange={e => setFilter({ ...filter, description: e.target.value })} placeholder="Optional keyword..." />
                </label>
              </div>
            </aside>

            <div className="consult-results">
              <div className="consult-results-header">
                <h2>Available Consultants ({filteredConsultants.length})</h2>
              </div>
              <div className="consultant-cards-list">
                {filteredConsultants.map(c => (
                  <article key={c.id} className="cc-card">
                    <img src={c.image || IMAGES.heroes.consultant} alt={c.name} className="cc-card-img" />
                    <div className="cc-card-body">
                      <div>
                        <strong className="cc-card-name">{c.name}</strong>
                        <p className="cc-card-role">{c.designation || c.title}</p>
                      </div>
                      <button className="simple-primary cc-card-btn" onClick={() => setSelected(c)}>Request Consultation</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="simple-overlay" onClick={() => setSelected(null)}>
          <section className="request-dialog simple-panel" onClick={e => e.stopPropagation()}>
            <button className="dialog-close" onClick={() => setSelected(null)}>×</button>
            <h2>Request Advisory from {selected.name}</h2>
            <form className="simple-form" onSubmit={submitRequest}>
              <label>Your Name<input className="form-control" value={req.farmerName} onChange={e => setReq({ ...req, farmerName: e.target.value })} required /></label>
              <label>Crop Affected<input className="form-control" value={req.crop} onChange={e => setReq({ ...req, crop: e.target.value })} placeholder="e.g. Wheat (PBW-826)" required /></label>
              <label>Farm Area (Acres)<input className="form-control" type="number" value={req.acres} onChange={e => setReq({ ...req, acres: e.target.value })} placeholder="e.g. 4.5" required /></label>
              <label>Describe Symptom or Problem<textarea className="form-control" rows={3} value={req.description} onChange={e => setReq({ ...req, description: e.target.value })} placeholder="Describe leaf discoloration or pest issues..." required /></label>
              <button type="submit" className="simple-primary">Submit Consultation Ticket</button>
            </form>
          </section>
        </div>
      )}

      {errorModalMsg && (
        <div className="simple-overlay" onClick={() => setErrorModalMsg(null)}>
          <div className="request-dialog simple-panel" onClick={e => e.stopPropagation()} style={{ textAlign: 'center', maxWidth: '420px' }}>
            <button className="dialog-close" onClick={() => setErrorModalMsg(null)}>×</button>
            <h2 className="error-modal-title">Access Restricted</h2>
            <p className="simple-muted">{errorModalMsg}</p>
            <button 
              className="simple-primary" 
              style={{ width: '100%', marginTop: '16px' }} 
              onClick={() => {
                setErrorModalMsg(null);
                navigate('/profile');
              }}
            >
              Go to Profile &amp; Register Consultant Role
            </button>
          </div>
        </div>
      )}
    </main>
  );
}