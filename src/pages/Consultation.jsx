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

export default function Consultation({ consultantView = false }) {
  const navigate = useNavigate();
  const { currentUser, consultations = [], registeredConsultants = [], recordConsultation, acceptConsultation, declineConsultation, respondToConsultation } = useAuth();
  const { showToast } = useToast();

  const [filter, setFilter] = useState(EMPTY);
  const [selected, setSelected] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [reply, setReply] = useState('');
  const [req, setReq] = useState({ farmerName: currentUser?.name || '', district: currentUser?.district || '', crop: '', acres: '', consultationType: 'remote', description: '' });

  // Merge static and registered consultants
  const allConsultants = useMemo(() => {
    const map = Object.fromEntries(CONSULTANTS.map(c => [c.id, c]));
    registeredConsultants.forEach(r => { map[r.id] = { ...map[r.id], ...r }; });
    return Object.values(map);
  }, [registeredConsultants]);

  // Direct filtering
  const filteredConsultants = useMemo(() => {
    return allConsultants.filter(c => {
      const specs = [...(c.specialties || []), ...(c.specializations || []), c.agronomicSpecialties || ''].join(' ').toLowerCase();
      const crops = [...(c.cropsSpecialized || [])].join(' ').toLowerCase();
      return (filter.category === PROBLEM_CATEGORIES[0] || specs.includes(filter.category.toLowerCase())) &&
             (filter.crop === COMMODITY_CROPS[0] || crops.includes(filter.crop.split('(')[0].trim().toLowerCase()));
    });
  }, [allConsultants, filter]);

  const mine = consultations.filter(t => t.assignedConsultantId === currentUser?.id || t.assignedConsultant === currentUser?.name || (!t.assignedConsultantId && t.status === 'Pending Review'));

  const submitRequest = (e) => {
    e.preventDefault();
    recordConsultation({ ...req, acres: Number(req.acres), category: filter.category !== PROBLEM_CATEGORIES[0] ? filter.category : '', urgency: filter.urgency, farmerId: currentUser?.id, assignedConsultant: selected.name, assignedConsultantId: selected.id });
    setSelected(null);
    setReq(r => ({ ...r, crop: '', acres: '', description: '' }));
    showToast('Consultation request sent.', 'success');
  };

  return (
    <main className="consultation-page">
      <div className="consult-banner">
        <img src={IMAGES.heroes.consultant} alt="Consultation" className="consult-banner-img" />
        <div className="consult-banner-overlay">
          <div className="container">
            <p className="page-eyebrow">Expert Support</p>
            <h1 className="consult-banner-title">Crop Consultation &amp; Diagnostics</h1>
          </div>
        </div>
      </div>

      <div className="container consult-body">
        <div className="consult-mode-bar">
          <button className={consultantView ? 'simple-secondary' : 'simple-primary'} onClick={() => navigate(currentUser?.role === 'consultant' ? (consultantView ? '/consultation' : '/consultation/consultant') : '/profile?role=consultant&redirect=%2Fconsultation%2Fconsultant')}>
            {consultantView ? 'Farmer View' : 'Consultant Workbench'}
          </button>
        </div>

        {consultantView ? (
          <div className="consultant-queue">
            {[{ label: 'Pending Inquiries', items: mine.filter(t => !isResolved(t)) }, { label: 'Resolved Cases', items: mine.filter(isResolved) }].map(({ label, items }) => (
              <section key={label} className="simple-panel">
                <div className="cq-panel-header"><h2>{label}</h2><span className="cq-count">{items.length}</span></div>
                {items.length ? items.map(t => (
                  <article key={t.id} className="cq-ticket-card">
                    <div className="cq-ticket-top">
                      <div><span className="cq-ticket-name">{t.farmerName}</span><span className="cq-ticket-crop">{t.crop}</span></div>
                      <span className="cq-status">{t.status}</span>
                    </div>
                    <p className="cq-ticket-desc">{t.description}</p>
                    {t.recommendation && <div className="cq-advisory-box"><strong>Advisory:</strong> {t.recommendation}</div>}
                    {!isResolved(t) && (
                      <div className="cq-ticket-actions">
                        {t.status === 'Pending Review' && <><button className="simple-primary btn-sm" onClick={() => acceptConsultation(t.id, currentUser.name, currentUser.id)}>Accept</button><button className="simple-secondary btn-sm" onClick={() => declineConsultation(t.id)}>Decline</button></>}
                        {replyId === t.id ? (
                          <div className="cq-reply-form">
                            <textarea className="form-control" rows={3} placeholder="Write advisory…" value={reply} onChange={e => setReply(e.target.value)} />
                            <button className="simple-primary btn-sm" onClick={() => { respondToConsultation(t.id, reply, currentUser.id, currentUser.name); setReplyId(null); setReply(''); showToast('Sent', 'success'); }}>Send</button>
                          </div>
                        ) : <button className="simple-primary btn-sm" onClick={() => setReplyId(t.id)}>Reply</button>}
                      </div>
                    )}
                  </article>
                )) : <p className="simple-muted">Nothing here yet.</p>}
              </section>
            ))}
          </div>
        ) : (
          <div className="consult-layout">
            <aside className="consult-filter">
              <h3 className="consult-filter-title">Find Expert</h3>
              <div className="consult-filter-fields">
                <label>Problem Type<select className="form-control" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>{PROBLEM_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label>
                <label>Crop<select className="form-control" value={filter.crop} onChange={e => setFilter({ ...filter, crop: e.target.value })}>{COMMODITY_CROPS.map(c => <option key={c}>{c}</option>)}</select></label>
                <label>Urgency<select className="form-control" value={filter.urgency} onChange={e => setFilter({ ...filter, urgency: e.target.value })}>{URGENCY.map(u => <option key={u}>{u}</option>)}</select></label>
                <label>Description<textarea className="form-control" rows={2} value={filter.description} onChange={e => setFilter({ ...filter, description: e.target.value })} /></label>
              </div>
            </aside>

            <div className="consult-results">
              <h2>Available Consultants ({filteredConsultants.length})</h2>
              <div className="consultant-cards-list">
                {filteredConsultants.map(c => (
                  <article key={c.id} className="cc-card">
                    <img src={c.image || IMAGES.heroes.consultant} alt={c.name} className="cc-card-img" />
                    <div className="cc-card-body">
                      <strong>{c.name}</strong>
                      <p className="cc-card-role">{c.designation || c.title}</p>
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
            <h2>Request from {selected.name}</h2>
            <form className="simple-form" onSubmit={submitRequest}>
              <label>Name<input className="form-control" value={req.farmerName} onChange={e => setReq({ ...req, farmerName: e.target.value })} required /></label>
              <label>Crop<input className="form-control" value={req.crop} onChange={e => setReq({ ...req, crop: e.target.value })} required /></label>
              <label>Acres<input className="form-control" type="number" value={req.acres} onChange={e => setReq({ ...req, acres: e.target.value })} required /></label>
              <label>Description<textarea className="form-control" value={req.description} onChange={e => setReq({ ...req, description: e.target.value })} required /></label>
              <button type="submit" className="simple-primary">Send Request</button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}