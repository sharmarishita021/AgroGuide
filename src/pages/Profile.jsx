import React, { useState, useRef } from 'react';
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AuthCard from '../components/AuthCard';
import { IMAGES } from '../data/imagesData';

const roleMeta = {
  kisan:      { label: 'Kisan',      color: '#15803d', bg: '#dcfce7', border: '#bbf7d0' },
  seller:     { label: 'Seller',     color: '#854d0e', bg: '#fef9c3', border: '#fde047' },
  consultant: { label: 'Consultant', color: '#0369a1', bg: '#e0f2fe', border: '#7dd3fc' },
};

const ROLE_FIELDS = {
  kisan:      [['districtBlock','District / Block'],['primaryCrops','Primary Crops'],['landSize','Land Size (Acres)','number']],
  seller:     [['businessName','Business Name'],['category','Category','select'],['pickupAddress','Pickup Address'],['licenseGstId','License / GST ID']],
  consultant: [['designation','Designation'],['institution','Institution'],['icarExtensionId','ICAR / Extension ID'],['specializations','Specialties']],
};

function RoleBadge({ role }) {
  const m = roleMeta[role] || roleMeta.kisan;
  return <span className="pf-role-badge" style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>{m.label}</span>;
}

/* ── Ticket Card Helper ── */
function ConsultTicketCard({ ticket, viewAs }) {
  return (
    <div className="pf-ticket-card">
      <div className="pf-ticket-card-head">
        <span className="pf-ticket-card-crop">{ticket.crop}</span>
        <span className="pf-ticket-status-pill">{ticket.status}</span>
      </div>
      <div className="pf-ticket-card-meta">
        {viewAs === 'client' && ticket.assignedConsultant && <span>Consultant: <strong>{ticket.assignedConsultant}</strong></span>}
        {viewAs === 'consultant' && <span>Farmer: <strong>{ticket.farmerName}</strong></span>}
        {ticket.district && <span>{ticket.district}</span>}
      </div>
      <p className="pf-ticket-card-desc">{ticket.description}</p>
      {ticket.recommendation && <div className="pf-ticket-advisory"><strong>Advisory:</strong> {ticket.recommendation}</div>}
    </div>
  );
}

/* ── Edit Profile Modal ── */
function EditModal({ user, roles, onSave, onClose }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState(user?.avatarUrl || null);
  const [form, setForm] = useState({
    name: user?.name || '',
    districtBlock: user?.districtBlock || '',
    primaryCrops: user?.primaryCrops || '',
    landSize: user?.landSize || user?.landArea || '',
    businessName: user?.businessName || '',
    category: user?.category || '',
    pickupAddress: user?.pickupAddress || '',
    licenseGstId: user?.licenseGstId || '',
    designation: user?.designation || user?.title || '',
    institution: user?.institution || '',
    icarExtensionId: user?.icarExtensionId || '',
    specializations: Array.isArray(user?.specializations) ? user.specializations.join(', ') : user?.specializations || '',
    avatarUrl: user?.avatarUrl || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setPreview(ev.target.result); set('avatarUrl', ev.target.result); };
    reader.readAsDataURL(file);
  };

  const fields = [...new Set(roles)].flatMap(r => ROLE_FIELDS[r] || []);

  return (
    <div className="simple-overlay" onClick={onClose}>
      <div className="edit-modal simple-panel" onClick={e => e.stopPropagation()}>
        <div className="edit-modal-head">
          <h2>Edit Profile</h2>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="edit-modal-body">
          <div className="edit-photo-row">
            {preview ? <img src={preview} alt="" className="pf-avatar pf-avatar--img" /> : <div className="pf-avatar pf-avatar--initials">{user?.name?.slice(0, 2).toUpperCase()}</div>}
            <div>
              <p className="edit-photo-label">Profile Photo</p>
              <button type="button" className="simple-secondary btn-sm" onClick={() => fileRef.current?.click()}>Upload</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
            </div>
          </div>

          <form className="simple-form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
            <div className="simple-grid">
              <label>Full Name *<input className="form-control" value={form.name} onChange={e => set('name', e.target.value)} required /></label>
              <label>District / Block<input className="form-control" value={form.districtBlock} onChange={e => set('districtBlock', e.target.value)} /></label>
            </div>

            {fields.length > 0 && (
              <>
                <p className="edit-section-label">Role Details</p>
                <div className="simple-grid">
                  {fields.map(([key, label, type]) => (
                    <label key={key}>{label}
                      {type === 'select'
                        ? <select className="form-control" value={form[key] || ''} onChange={e => set(key, e.target.value)}><option value="">Select…</option><option>Seeds</option><option>Fertilizers</option><option>Equipment</option></select>
                        : <input className="form-control" type={type || 'text'} value={form[key] || ''} onChange={e => set(key, e.target.value)} />
                      }
                    </label>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button type="submit" className="simple-primary">Save Changes</button>
              <button type="button" className="simple-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Kisan Section ── */
function KisanSection({ user, updateUserProfile, showToast, consultations }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ landArea: user?.landArea || '', primaryCrops: user?.primaryCrops || '', soilType: user?.soilType || '' });
  const myTickets = consultations.filter(t => t.farmerId === user.id || t.farmerName === user.name);

  return (
    <div className="simple-panel">
      <div className="pf-section-row">
        <h3>Farmland Details</h3>
        <button className="simple-secondary btn-sm" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
      </div>
      {editing ? (
        <form className="simple-form" onSubmit={e => { e.preventDefault(); updateUserProfile({ ...form, landSize: form.landArea }); setEditing(false); showToast('Updated.', 'success'); }}>
          <div className="simple-grid">
            <label>Land Area (Acres)<input type="number" className="form-control" value={form.landArea} onChange={e => setForm({ ...form, landArea: e.target.value })} /></label>
            <label>Primary Crops<input className="form-control" value={form.primaryCrops} onChange={e => setForm({ ...form, primaryCrops: e.target.value })} /></label>
          </div>
          <button type="submit" className="simple-primary">Save</button>
        </form>
      ) : (
        <dl className="pf-details-grid">
          <div><dt>Land Area</dt><dd>{user.landArea || '—'} Acres</dd></div>
          <div><dt>Primary Crops</dt><dd>{user.primaryCrops || '—'}</dd></div>
        </dl>
      )}
      {myTickets.length > 0 && (
        <>
          <p className="pf-sub-label" style={{ marginTop: 16 }}>My Consultation Requests</p>
          {myTickets.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="client" />)}
        </>
      )}
    </div>
  );
}

/* ── Seller Section ── */
function SellerSection({ user, orders }) {
  const myOrders = orders.filter(o => o.farmerName === user.name || o.sellerId === user.id);
  return (
    <div className="simple-panel">
      <h3>Seller Details</h3>
      <dl className="pf-details-grid">
        {user.businessName && <div><dt>Business</dt><dd>{user.businessName}</dd></div>}
        {user.category && <div><dt>Category</dt><dd>{user.category}</dd></div>}
      </dl>
      {myOrders.length > 0 && myOrders.slice(0, 3).map(o => (
        <div key={o.id} className="pf-list-row"><div><strong>{o.productTitle}</strong></div><p className="simple-muted">{o.quantity} · {o.status}</p></div>
      ))}
    </div>
  );
}

/* ── Consultant Section ── */
function ConsultantSection({ user, consultations }) {
  const [tab, setTab] = useState('profile');
  const mine = consultations.filter(t => t.assignedConsultantId === user.id || t.assignedConsultant === user.name);
  const pending  = mine.filter(t => !['Advisory Dispatched', 'Declined / Re-routed'].includes(t.status));
  const resolved = mine.filter(t =>  ['Advisory Dispatched', 'Declined / Re-routed'].includes(t.status));
  const specs = Array.isArray(user.specializations) ? user.specializations : (user.agronomicSpecialties || '').split(',').map(s => s.trim()).filter(Boolean);

  const workHistory = user.workHistory || [
    { role: 'Senior Agronomy Consultant', institution: 'State Agricultural University', period: '2020 — Present' },
    { role: 'Field Extension Officer', institution: 'Krishi Vigyan Kendra (KVK)', period: '2015 — 2020' }
  ];

  return (
    <div className="simple-panel">
      <div className="simple-tabs">
        <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>Profile &amp; History</button>
        <button className={tab === 'pending' ? 'active' : ''} onClick={() => setTab('pending')}>
          Received {pending.length > 0 && <span className="pf-tab-pill">{pending.length}</span>}
        </button>
        <button className={tab === 'resolved' ? 'active' : ''} onClick={() => setTab('resolved')}>
          Resolved {resolved.length > 0 && <span className="pf-tab-pill pf-tab-pill--done">{resolved.length}</span>}
        </button>
      </div>

      {tab === 'profile' && (
        <>
          <h3 style={{ marginBottom: 12 }}>Consultant Profile</h3>
          <dl className="pf-details-grid">
            {(user.designation || user.title) && <div><dt>Designation</dt><dd>{user.designation || user.title}</dd></div>}
            {user.institution   && <div><dt>Institution</dt><dd>{user.institution}</dd></div>}
            {user.icarExtensionId && <div><dt>ICAR ID</dt><dd>{user.icarExtensionId}</dd></div>}
            {specs.length > 0   && <div style={{ gridColumn: '1/-1' }}><dt>Specialties</dt><dd className="cc-tags" style={{ marginTop: 6 }}>{specs.map(s => <span key={s} className="cc-tag">{s}</span>)}</dd></div>}
          </dl>

          <h3 style={{ marginTop: 24, marginBottom: 12 }}>Professional Work History</h3>
          <div className="pf-work-history-list">
            {workHistory.map((item, index) => (
              <div key={index} className="pf-list-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{item.role}</strong>
                  <p className="simple-muted" style={{ margin: '2px 0 0 0', fontSize: '0.9rem' }}>{item.institution}</p>
                </div>
                <span className="pf-status-tag" style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>{item.period}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'pending' && (
        <>
          {pending.length === 0
            ? <p className="simple-muted" style={{ marginTop: 8 }}>No pending requests right now.</p>
            : pending.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="consultant" />)
          }
        </>
      )}

      {tab === 'resolved' && (
        <>
          {resolved.length === 0
            ? <p className="simple-muted" style={{ marginTop: 8 }}>No resolved cases yet.</p>
            : resolved.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="consultant" />)
          }
        </>
      )}
    </div>
  );
}

/* ── Main Profile Component ── */
export default function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, updateUserProfile, addRoleToUser, login, register, logout, consultations = [], registeredConsultants = [], orders = [] } = useAuth();
  const { showToast } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  const requestedRole = searchParams.get('role');
  const redirectPath  = searchParams.get('redirect');
  const consultantId  = searchParams.get('consultantId');

  if (consultantId) {
    const c = registeredConsultants.find(p => p.id === consultantId);
    if (!c) return <Navigate to="/consultation" replace />;
    return <div className="profile-page container"><button className="btn-back-link" onClick={() => navigate('/consultation')}>&larr; Back</button><h1>{c.name}</h1></div>;
  }

  if (!currentUser || (requestedRole === 'consultant' && currentUser.role !== 'consultant')) {
    return (
      <div className="profile-page container">
        <AuthCard initialRole={requestedRole === 'consultant' ? 'consultant' : 'basic'} onLogin={(r, c) => { login(r, c); if (r === 'consultant' && redirectPath) navigate(redirectPath); }} onRegister={(r, c) => { register(r, c); if (r === 'consultant' && redirectPath) navigate(redirectPath); }} />
      </div>
    );
  }

  const primaryRole = currentUser.role === 'basic' ? 'kisan' : currentUser.role || 'kisan';
  const roles = [...new Set((currentUser.roles || [primaryRole]).map(r => r === 'basic' ? 'kisan' : r))];

  return (
    <div className="profile-page">
      <div className="pf-hero-banner">
        <img src={IMAGES.heroes.profile} alt="" className="pf-hero-bg" />
        <div className="pf-hero-overlay" />
        <div className="container pf-hero-content">
          <div className="pf-hero-left">
            {currentUser.avatarUrl ? <img src={currentUser.avatarUrl} alt="" className="pf-avatar pf-avatar--img" /> : <div className="pf-avatar pf-avatar--initials">{currentUser.name.slice(0, 2).toUpperCase()}</div>}
            <div>
              <div className="pf-role-badges">{roles.map(r => <RoleBadge key={r} role={r} />)}</div>
              <h1 className="pf-hero-name">{currentUser.name}</h1>
            </div>
          </div>
          <div className="pf-hero-actions">
            <button className="pf-edit-btn" onClick={() => setEditOpen(true)}>Edit Profile</button>
            <button className="pf-signout-btn" onClick={logout}>Sign Out</button>
          </div>
        </div>
      </div>

      <div className="container pf-body">
        {roles.map(role => (
          <div key={role} className="pf-role-block">
            {role === 'kisan' && <KisanSection user={currentUser} updateUserProfile={updateUserProfile} showToast={showToast} consultations={consultations} />}
            {role === 'seller' && <SellerSection user={currentUser} orders={orders} />}
            {role === 'consultant' && <ConsultantSection user={currentUser} consultations={consultations} />}
          </div>
        ))}
      </div>

      {editOpen && (
        <EditModal 
          user={currentUser} 
          roles={roles} 
          onSave={form => {
            const specs = typeof form.specializations === 'string' ? form.specializations.split(',').map(s => s.trim()).filter(Boolean) : form.specializations;
            updateUserProfile({ ...form, specializations: specs, title: form.designation, landArea: form.landSize });
            setEditOpen(false);
            showToast('Profile updated.', 'success');
          }} 
          onClose={() => setEditOpen(false)} 
        />
      )}
    </div>
  );
}