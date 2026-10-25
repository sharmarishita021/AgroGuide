import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AuthCard from '../components/AuthCard';
import { IMAGES } from '../data/imagesData';

function RoleBadge({ role }) {
  const labels = { kisan: 'Kisan', seller: 'Seller', consultant: 'Consultant' };
  return <span className="pf-role-badge">{labels[role] || 'Kisan'}</span>;
}

function ConsultTicketCard({ ticket, viewAs }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="pf-ticket-card">
      <div className="pf-ticket-card-head">
        <span className="pf-ticket-card-crop">{ticket.crop}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        <p className="pf-ticket-card-desc" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ticket.description}</p>
      )}
    </div>
  );
}

function AddRoleModal({ roleType, onClose, onAdd }) {
  const [form, setForm] = useState(roleType === 'seller' 
    ? { businessName: '', category: 'Seeds', pickupAddress: '', licenseGstId: '' }
    : { designation: '', institution: '', icarExtensionId: '', qualifications: '', experience: '', specializations: '', bio: '' }
  );

  return (
    <div className="simple-overlay" onClick={onClose}>
      <div className="edit-modal simple-panel" onClick={e => e.stopPropagation()}>
        <div className="edit-modal-head">
          <h2>Register as {roleType === 'seller' ? 'Farm Seller' : 'Consultant / Expert'}</h2>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="edit-modal-body">
          <form className="simple-form" onSubmit={e => { e.preventDefault(); onAdd(roleType, form); }}>
            {roleType === 'seller' ? (
              <>
                <label>Business / Store Name *<input className="form-control" value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} required /></label>
                <label>Category *<select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Seeds</option><option>Fertilizers</option><option>Equipment</option></select></label>
                <label>Pickup Address *<input className="form-control" value={form.pickupAddress} onChange={e => setForm({ ...form, pickupAddress: e.target.value })} required /></label>
                <label>License / GST ID *<input className="form-control" value={form.licenseGstId} onChange={e => setForm({ ...form, licenseGstId: e.target.value })} required /></label>
              </>
            ) : (
              <>
                <div className="simple-grid">
                  <label>Designation / Title *<input className="form-control" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Principal Soil Scientist" required /></label>
                  <label>Highest Qualification *<input className="form-control" value={form.qualifications} onChange={e => setForm({ ...form, qualifications: e.target.value })} placeholder="e.g. Ph.D. in Agronomy" required /></label>
                </div>
                <div className="simple-grid">
                  <label>Affiliated University / Institution *<input className="form-control" value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} placeholder="e.g. PAU Ludhiana" required /></label>
                  <label>Years of Experience *<input className="form-control" type="number" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 15" required /></label>
                </div>
                <div className="simple-grid">
                  <label>ICAR / Extension ID *<input className="form-control" value={form.icarExtensionId} onChange={e => setForm({ ...form, icarExtensionId: e.target.value })} placeholder="e.g. ICAR-PAU-2012-99" required /></label>
                  <label>Agronomic Specialties (comma separated) *<input className="form-control" value={form.specializations} onChange={e => setForm({ ...form, specializations: e.target.value })} placeholder="Soil Health, Pest Control" required /></label>
                </div>
                <label>Professional Bio &amp; Research Focus *<textarea className="form-control" rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Briefly describe your field extension work..." required /></label>
              </>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button type="submit" className="simple-primary">Submit &amp; Activate Role</button>
              <button type="button" className="simple-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function KisanSection({ user, updateUserProfile, showToast, consultations }) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [form, setForm] = useState({ landArea: user?.landArea || '', primaryCrops: user?.primaryCrops || '' });
  const myTickets = consultations.filter(t => t.farmerId === user.id || t.farmerName === user.name);

  return (
    <div className="simple-panel">
      <div className="pf-section-row">
        <h3>Farmland Details (Kisan)</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="simple-secondary btn-sm" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          <button className="pf-expand-arrow-btn" onClick={() => setExpanded(!expanded)}>{expanded ? '▲ Less' : '▼ More'}</button>
        </div>
      </div>
      {expanded && (
        <>
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
              <p className="pf-sub-label">My Consultation Requests</p>
              {myTickets.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="client" />)}
            </>
          )}
        </>
      )}
    </div>
  );
}

function SellerSection({ user, orders }) {
  const [expanded, setExpanded] = useState(true);
  const myOrders = orders.filter(o => o.farmerName === user.name || o.sellerId === user.id);
  return (
    <div className="simple-panel">
      <div className="pf-section-row">
        <h3>Seller Store Details</h3>
        <button className="pf-expand-arrow-btn" onClick={() => setExpanded(!expanded)}>{expanded ? '▲ Less' : '▼ More'}</button>
      </div>
      {expanded && (
        <>
          <dl className="pf-details-grid">
            {user.businessName && <div><dt>Business</dt><dd>{user.businessName}</dd></div>}
            {user.category && <div><dt>Category</dt><dd>{user.category}</dd></div>}
            {user.pickupAddress && <div><dt>Pickup Address</dt><dd>{user.pickupAddress}</dd></div>}
          </dl>
          {myOrders.slice(0, 3).map(o => (
            <div key={o.id} className="pf-list-row"><div><strong>{o.productTitle}</strong></div><p className="simple-muted">{o.quantity} · {o.status}</p></div>
          ))}
        </>
      )}
    </div>
  );
}

function ConsultantSection({ user, consultations }) {
  const [tab, setTab] = useState('profile');
  const [expanded, setExpanded] = useState(true);
  const mine = consultations.filter(t => t.assignedConsultantId === user.id || t.assignedConsultant === user.name);
  const pending = mine.filter(t => !['Advisory Dispatched', 'Declined / Re-routed'].includes(t.status));
  const resolved = mine.filter(t => ['Advisory Dispatched', 'Declined / Re-routed'].includes(t.status));
  const specs = Array.isArray(user.specializations) ? user.specializations : (user.agronomicSpecialties || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="simple-panel">
      <div className="pf-section-row">
        <h3>Consultant Workbench &amp; Profile</h3>
        <button className="pf-expand-arrow-btn" onClick={() => setExpanded(!expanded)}>{expanded ? '▲ Less' : '▼ More'}</button>
      </div>
      {expanded && (
        <>
          <div className="simple-tabs">
            <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>Consultant Profile</button>
            <button className={tab === 'pending' ? 'active' : ''} onClick={() => setTab('pending')}>Received {pending.length > 0 && <span className="pf-tab-pill">{pending.length}</span>}</button>
            <button className={tab === 'resolved' ? 'active' : ''} onClick={() => setTab('resolved')}>Resolved {resolved.length > 0 && <span className="pf-tab-pill pf-tab-pill--done">{resolved.length}</span>}</button>
          </div>

          {tab === 'profile' && (
            <>
              <h3 style={{ marginTop: '12px' }}>Expert Credentials</h3>
              <dl className="pf-details-grid">
                {(user.designation || user.title) && <div><dt>Designation</dt><dd>{user.designation || user.title}</dd></div>}
                {user.institution && <div><dt>Institution</dt><dd>{user.institution}</dd></div>}
                {user.icarExtensionId && <div><dt>ICAR ID</dt><dd>{user.icarExtensionId}</dd></div>}
                {user.qualifications && <div><dt>Qualification</dt><dd>{user.qualifications}</dd></div>}
                {user.experience && <div><dt>Experience</dt><dd>{user.experience} Years</dd></div>}
                {specs.length > 0 && <div style={{ gridColumn: '1/-1' }}><dt>Specialties</dt><dd className="cc-tags">{specs.map(s => <span key={s} className="cc-tag">{s}</span>)}</dd></div>}
                {user.bio && <div style={{ gridColumn: '1/-1' }}><dt>Professional Bio</dt><dd>{user.bio}</dd></div>}
              </dl>
            </>
          )}

          {tab === 'pending' && (pending.length === 0 ? <p className="simple-muted" style={{ marginTop: '12px' }}>No pending requests.</p> : pending.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="consultant" />))}
          {tab === 'resolved' && (resolved.length === 0 ? <p className="simple-muted" style={{ marginTop: '12px' }}>No resolved cases.</p> : resolved.map(t => <ConsultTicketCard key={t.id} ticket={t} viewAs="consultant" />))}
        </>
      )}
    </div>
  );
}

export default function Profile() {
  const { currentUser, login, register, addRoleToUser, logout, consultations = [], orders = [] } = useAuth();
  const { showToast } = useToast();
  
  const [addingRole, setAddingRole] = useState(null);

  if (!currentUser) {
    return (
      <div className="profile-page container">
        <AuthCard onLogin={(r, c) => login(r, c)} onRegister={(r, c) => register(r, c)} />
      </div>
    );
  }

  const roles = currentUser.roles || ['kisan'];

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
            {!roles.includes('seller') && <button className="simple-secondary" onClick={() => setAddingRole('seller')}>+ Register as Seller</button>}
            {!roles.includes('consultant') && <button className="simple-secondary" onClick={() => setAddingRole('consultant')}>+ Register as Consultant</button>}
            <button className="pf-signout-btn" onClick={logout}>Sign Out</button>
          </div>
        </div>
      </div>

      <div className="container pf-body">
        {roles.map(role => (
          <div key={role} className="pf-role-block">
            {role === 'kisan' && <KisanSection user={currentUser} updateUserProfile={useAuth().updateUserProfile} showToast={showToast} consultations={consultations} />}
            {role === 'seller' && <SellerSection user={currentUser} orders={orders} />}
            {role === 'consultant' && <ConsultantSection user={currentUser} consultations={consultations} />}
          </div>
        ))}
      </div>

      {addingRole && (
        <AddRoleModal 
          roleType={addingRole} 
          onClose={() => setAddingRole(null)} 
          onAdd={(type, details) => {
            try {
              addRoleToUser(type, details);
              setAddingRole(null);
              showToast(`Successfully registered as ${type}!`, 'success');
            } catch (err) {
              showToast(err.message, 'error');
            }
          }} 
        />
      )}
    </div>
  );
}