import React, { useState } from 'react';
import './Profile.css';
import profileData from './profileData.json';

const {
  heroBg,
  initialDemoUsers,
  initialOrders,
  initialConsultations
} = profileData;

function RoleBadge({ role }) {
  return <span className="pf-role-badge">{role}</span>;
}

function ConsultTicketCard({ ticket, viewAs }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="pf-ticket-card">
      <div className="pf-ticket-card-head">
        <span className="pf-ticket-card-crop">{ticket.crop}</span>
        <div className="pf-ticket-card-actions">
          <span className="pf-ticket-status-pill">{ticket.status}</span>
          <button className="pf-expand-arrow-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? '▲ Less' : '▼ More'}
          </button>
        </div>
      </div>
      <div className="pf-ticket-card-meta">
        {viewAs === 'client' && ticket.assignedConsultant && <span>Consultant: <strong>{ticket.assignedConsultant}</strong></span>}
        {viewAs === 'consultant' && <span>Farmer: <strong>{ticket.farmerName}</strong></span>}
        {ticket.district && <span>{ticket.district}</span>}
      </div>
      {expanded ? (
        <div className="pf-ticket-expanded">
          <p className="pf-ticket-card-desc"><strong>Details:</strong> {ticket.description}</p>
          {ticket.recommendation && <div className="pf-ticket-advisory"><strong>Advisory:</strong> {ticket.recommendation}</div>}
        </div>
      ) : (
        <p className="pf-ticket-card-desc pf-ticket-card-desc--truncated">{ticket.description}</p>
      )}
    </div>
  );
}

function AddRoleModal({ roleType, onClose, onAdd }) {
  const isSeller = roleType === 'seller';
  const [form, setForm] = useState(isSeller 
    ? { businessName: '', category: 'Seeds', pickupAddress: '', licenseGstId: '' }
    : { designation: '', institution: '', icarExtensionId: '', qualifications: '', experience: '', specializations: '', bio: '' }
  );

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="simple-overlay" onClick={onClose}>
      <div className="edit-modal simple-panel" onClick={e => e.stopPropagation()}>
        <div className="edit-modal-head">
          <h2>Register as {isSeller ? 'Farm Seller' : 'Consultant / Expert'}</h2>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <form className="simple-form" onSubmit={(e) => { e.preventDefault(); onAdd(roleType, form); }}>
          {isSeller ? (
            <>
              <label>Store Name *<input className="form-control" value={form.businessName} onChange={e => update('businessName', e.target.value)} required /></label>
              <label>Category *
                <select className="form-control" value={form.category} onChange={e => update('category', e.target.value)}>
                  <option>Seeds</option><option>Fertilizers</option><option>Equipment</option>
                </select>
              </label>
              <label>Pickup Address *<input className="form-control" value={form.pickupAddress} onChange={e => update('pickupAddress', e.target.value)} required /></label>
              <label>License / GST ID *<input className="form-control" value={form.licenseGstId} onChange={e => update('licenseGstId', e.target.value)} required /></label>
            </>
          ) : (
            <>
              <div className="simple-grid">
                <label>Designation *<input className="form-control" value={form.designation} onChange={e => update('designation', e.target.value)} placeholder="e.g. Agronomist" required /></label>
                <label>Qualification *<input className="form-control" value={form.qualifications} onChange={e => update('qualifications', e.target.value)} placeholder="e.g. Ph.D." required /></label>
              </div>
              <div className="simple-grid">
                <label>Institution *<input className="form-control" value={form.institution} onChange={e => update('institution', e.target.value)} placeholder="e.g. PAU" required /></label>
                <label>Experience (Years) *<input className="form-control" type="number" value={form.experience} onChange={e => update('experience', e.target.value)} required /></label>
              </div>
              <label>ICAR / Reg ID *<input className="form-control" value={form.icarExtensionId} onChange={e => update('icarExtensionId', e.target.value)} required /></label>
              <label>Specialties *<input className="form-control" value={form.specializations} onChange={e => update('specializations', e.target.value)} placeholder="Soil Health, Pest Control" required /></label>
              <label>Bio *<textarea className="form-control" rows={3} value={form.bio} onChange={e => update('bio', e.target.value)} required /></label>
            </>
          )}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button type="submit" className="simple-primary">Submit Role</button>
            <button type="button" className="simple-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function KisanSection({ user, onUpdate, showToast, consultations }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ landArea: user?.landArea || '', primaryCrops: user?.primaryCrops || '' });
  const myTickets = consultations.filter(t => t.farmerId === user.id || t.farmerName === user.name);

  return (
    <div className="simple-panel">
      <div className="pf-section-row">
        <h3>Farmland Details (Kisan)</h3>
        <button className="simple-secondary btn-sm" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
      </div>
      {editing ? (
        <form className="simple-form" onSubmit={(e) => { e.preventDefault(); onUpdate(form); setEditing(false); showToast('Profile updated.', 'success'); }}>
          <div className="simple-grid">
            <label>Land Area (Acres)<input type="number" className="form-control" value={form.landArea} onChange={e => setForm({ ...form, landArea: e.target.value })} /></label>
            <label>Primary Crops<input className="form-control" value={form.primaryCrops} onChange={e => setForm({ ...form, primaryCrops: e.target.value })} /></label>
          </div>
          <button type="submit" className="simple-primary" style={{ marginTop: '10px' }}>Save Changes</button>
        </form>
      ) : (
        <dl className="pf-details-grid">
          <div><dt>Land Area</dt><dd>{user.landArea || '—'} Acres</dd></div>
          <div><dt>Primary Crops</dt><dd>{user.primaryCrops || '—'}</dd></div>
        </dl>
      )}
      {myTickets.length > 0 && (
        <>
          <p className="pf-sub-label">My Consultation Requests</p>
          {myTickets.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="client" />)}
        </>
      )}
    </div>
  );
}

function SellerSection({ user, orders }) {
  const myOrders = orders.filter(o => o.farmerName === user.name || o.sellerId === user.id);
  return (
    <div className="simple-panel">
      <div className="pf-section-row"><h3>Seller Store Details</h3></div>
      <dl className="pf-details-grid">
        <div><dt>Business</dt><dd>{user.businessName || '—'}</dd></div>
        <div><dt>Category</dt><dd>{user.category || '—'}</dd></div>
        <div><dt>Pickup Address</dt><dd>{user.pickupAddress || '—'}</dd></div>
      </dl>
      {myOrders.slice(0, 3).map(o => (
        <div key={o.id} className="pf-list-row">
          <strong>{o.productTitle}</strong>
          <span className="simple-muted">{o.quantity} · {o.status}</span>
        </div>
      ))}
    </div>
  );
}

function ConsultantSection({ user, consultations }) {
  const [tab, setTab] = useState('profile');
  const mine = consultations.filter(t => t.assignedConsultantId === user.id || t.assignedConsultant === user.name);
  const pending = mine.filter(t => !['Advisory Dispatched', 'Declined'].includes(t.status));
  const resolved = mine.filter(t => ['Advisory Dispatched', 'Declined'].includes(t.status));
  const specs = Array.isArray(user.specializations) ? user.specializations : (user.agronomicSpecialties || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="simple-panel">
      <div className="pf-section-row"><h3>Consultant Workbench &amp; Profile</h3></div>
      <div className="simple-tabs">
        <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>Credentials</button>
        <button className={tab === 'pending' ? 'active' : ''} onClick={() => setTab('pending')}>Pending ({pending.length})</button>
        <button className={tab === 'resolved' ? 'active' : ''} onClick={() => setTab('resolved')}>Resolved ({resolved.length})</button>
      </div>
      {tab === 'profile' && (
        <dl className="pf-details-grid">
          <div><dt>Designation</dt><dd>{user.designation || user.title || '—'}</dd></div>
          <div><dt>Institution</dt><dd>{user.institution || '—'}</dd></div>
          <div><dt>Experience</dt><dd>{user.experience ? `${user.experience} Years` : '—'}</dd></div>
          <div style={{ gridColumn: '1 / -1' }}><dt>Specialties</dt><dd className="cc-tags">{specs.map(s => <span key={s} className="cc-tag">{s}</span>)}</dd></div>
        </dl>
      )}
      {tab === 'pending' && (pending.length ? pending.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="consultant" />) : <p className="simple-muted">No pending cases.</p>)}
      {tab === 'resolved' && (resolved.length ? resolved.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="consultant" />) : <p className="simple-muted">No resolved cases.</p>)}
    </div>
  );
}

function AuthForm({ onLogin, onRegister }) {
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (mode === 'signin') onLogin(form);
      else onRegister(form);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="simple-panel auth-panel">
      <h2>{mode === 'signin' ? 'Sign In' : 'Register Profile'}</h2>
      <div className="simple-tabs">
        <button type="button" className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setError(null); }}>Sign In</button>
        <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError(null); }}>Register</button>
      </div>
      {error && <p style={{ color: '#dc2626', fontSize: '0.88rem', margin: '0 0 14px' }}>{error}</p>}
      <form className="simple-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <label>Full Name *<input className="form-control" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
            <label>Primary Crops<input className="form-control" value={form.primaryCrops || ''} onChange={e => setForm({ ...form, primaryCrops: e.target.value })} /></label>
          </>
        )}
        <label>Email / Phone *<input className="form-control" value={form.emailOrPhone || ''} onChange={e => setForm({ ...form, emailOrPhone: e.target.value })} required /></label>
        <label>Password *<input className="form-control" type="password" value={form.password || ''} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
        <button className="simple-primary" type="submit">{mode === 'signin' ? 'Sign In' : 'Create Account'}</button>
      </form>
    </section>
  );
}

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('agri_auth_user') || 'null'));
  const [registeredUsers, setRegisteredUsers] = useState(() => JSON.parse(localStorage.getItem('agri_registered_users') || JSON.stringify(initialDemoUsers)));
  const [consultations] = useState(() => JSON.parse(localStorage.getItem('agri_consultation_tickets') || JSON.stringify(initialConsultations)));
  const [orders] = useState(() => JSON.parse(localStorage.getItem('agri_orders_list') || JSON.stringify(initialOrders)));
  const [addingRole, setAddingRole] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const syncUser = (user, users) => {
    setCurrentUser(user);
    if (user) localStorage.setItem('agri_auth_user', JSON.stringify(user));
    else localStorage.removeItem('agri_auth_user');
    if (users) {
      setRegisteredUsers(users);
      localStorage.setItem('agri_registered_users', JSON.stringify(users));
    }
    window.dispatchEvent(new Event('storage'));
  };

  const login = ({ emailOrPhone, password }) => {
    const contact = emailOrPhone?.trim().toLowerCase();
    const user = registeredUsers.find(u => u.emailOrPhone?.toLowerCase() === contact);
    if (!user || user.password !== password) throw new Error('Invalid email/phone or password.');
    syncUser(user);
  };

  const register = ({ name, emailOrPhone, password, primaryCrops }) => {
    const contact = emailOrPhone?.trim().toLowerCase();
    if (registeredUsers.some(u => u.emailOrPhone?.toLowerCase() === contact)) throw new Error('Account already exists. Please sign in.');
    const newUser = {
      id: `user-${Date.now()}`,
      role: 'kisan',
      roles: ['kisan'],
      name,
      emailOrPhone,
      password,
      primaryCrops: primaryCrops || 'Wheat & Rice',
      landArea: '2.0'
    };
    syncUser(newUser, [...registeredUsers, newUser]);
  };

  const addRole = (role, details) => {
    const roles = currentUser.roles || [currentUser.role];
    if (roles.includes(role)) return;
    const updated = { ...currentUser, ...details, roles: [...roles, role] };
    syncUser(updated, registeredUsers.map(u => u.id === updated.id ? updated : u));
    setAddingRole(null);
    showToast(`Registered as ${role}!`, 'success');
  };

  const updateProfile = (fields) => {
    const updated = { ...currentUser, ...fields };
    syncUser(updated, registeredUsers.map(u => u.id === updated.id ? updated : u));
  };

  const roles = currentUser?.roles || ['kisan'];

  return (
    <>
      {toast && (
        <div className="pf-toast-container">
          <div className={`pf-toast ${toast.type}`}>
            <span>{toast.message}</span>
            <button className="pf-toast-close" onClick={() => setToast(null)}>×</button>
          </div>
        </div>
      )}

      {!currentUser ? (
        <div className="profile-page container"><AuthForm onLogin={login} onRegister={register} /></div>
      ) : (
        <div className="profile-page">
          <div className="pf-hero-banner">
            <img src={heroBg} alt="" className="pf-hero-bg" />
            <div className="pf-hero-overlay" />
            <div className="container pf-hero-content">
              <div className="pf-hero-left">
                <div className="pf-avatar">{currentUser.name?.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="pf-role-badges">{roles.map(r => <RoleBadge key={r} role={r} />)}</div>
                  <h1 className="pf-hero-name">{currentUser.name}</h1>
                </div>
              </div>
              <div className="pf-hero-actions">
                {!roles.includes('seller') && <button className="simple-secondary" onClick={() => setAddingRole('seller')}>+ Add Seller</button>}
                {!roles.includes('consultant') && <button className="simple-secondary" onClick={() => setAddingRole('consultant')}>+ Add Consultant</button>}
                <button className="pf-signout-btn" onClick={() => syncUser(null)}>Sign Out</button>
              </div>
            </div>
          </div>

          <div className="container pf-body">
            {roles.includes('kisan') && <KisanSection user={currentUser} onUpdate={updateProfile} showToast={showToast} consultations={consultations} />}
            {roles.includes('seller') && <SellerSection user={currentUser} orders={orders} />}
            {roles.includes('consultant') && <ConsultantSection user={currentUser} consultations={consultations} />}
          </div>

          {addingRole && <AddRoleModal roleType={addingRole} onClose={() => setAddingRole(null)} onAdd={addRole} />}
        </div>
      )}
    </>
  );
}
