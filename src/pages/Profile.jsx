import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useToast } from '../context/ToastContext';
import { getProductImage } from '../data/imagesData';
import { getConsultantById } from '../data/consultantsData';
import AddProductModal from '../components/marketplace/AddProductModal';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const consultantIdParam = searchParams.get('consultantId');

  const {
    currentUser,
    login,
    register,
    logout,
    switchRole,
    orders,
    consultations,
    respondToConsultation,
    updateOrderStatus
  } = useAuth();

  const { products, savedSchemes } = useMarketplace();
  const { showToast } = useToast();

  // Auth Form State (for unauthenticated or switching)
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [selectedRole, setSelectedRole] = useState('basic'); // 'basic', 'seller', 'consultant'
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    farmName: '',
    district: 'Ludhiana',
    state: 'Punjab',
    qualifications: '',
    specializations: ''
  });
  const [authErrors, setAuthErrors] = useState({});

  // Consultant reply state
  const [activeReplyTicketId, setActiveReplyTicketId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Seller modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Active sub-tab inside profile
  const [profileTab, setProfileTab] = useState('overview');

  // Handle Demo Login
  const handleDemoLogin = (roleKey) => {
    switchRole(roleKey);
    const demo = DEMO_USERS[roleKey];
    showToast(`Logged in as ${demo.name} (${roleKey.toUpperCase()})`, 'success');
  };

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    try {
      const user = login(selectedRole, {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        name: formData.name,
        farmName: formData.farmName
      });
      showToast(`Welcome, ${user.name}! Accessing ${selectedRole.toUpperCase()} profile.`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.emailOrPhone.trim() || !formData.password) {
      setAuthErrors({ general: 'Please fill in all mandatory fields.' });
      return;
    }
    try {
      const user = register(selectedRole, {
        name: formData.name.trim(),
        emailOrPhone: formData.emailOrPhone.trim(),
        password: formData.password,
        farmName: formData.farmName.trim(),
        district: formData.district,
        state: formData.state,
        qualifications: formData.qualifications.trim(),
        specializations: formData.specializations ? formData.specializations.split(',').map(s => s.trim()) : []
      });
      showToast(`Profile registered for ${user.name} as ${selectedRole.toUpperCase()}!`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Consultant responding to ticket
  const handleSendAdvisory = (ticketId) => {
    if (!replyText.trim()) {
      showToast('Please type an agronomic prescription before sending.', 'warning');
      return;
    }
    respondToConsultation(ticketId, replyText.trim());
    showToast('Agronomic prescription dispatched directly to the farmer.', 'success');
    setActiveReplyTicketId(null);
    setReplyText('');
  };

  // =========================================================================
  // VIEW: PUBLIC VERIFIED CONSULTANT PROFILE (when ?consultantId=... is in URL)
  // =========================================================================
  if (consultantIdParam) {
    const consultant = getConsultantById(consultantIdParam);

    return (
      <div className="profile-page container">
        {/* Navigation Bar Back */}
        <div className="public-profile-nav">
          <button
            type="button"
            className="btn-back-link"
            onClick={() => navigate('/consultation')}
          >
            &larr; Back to Consultation Portal
          </button>
          {currentUser && (
            <Link to="/profile" className="btn-dashboard-link">
              View My Personal Account ({currentUser.name})
            </Link>
          )}
        </div>

        {/* Consultant Header Card */}
        <div className="consultant-public-hero">
          <div className="public-hero-left">
            <img
              src={consultant.image}
              alt={consultant.name}
              className="public-consultant-avatar"
            />
            <div className="public-consultant-details">
              <div className="verification-pill-row">
                <span className="badge-verified">ICAR Verified Scientist</span>
                <span className="badge-reg">{consultant.registrationNumber}</span>
              </div>
              <h1 className="public-name">{consultant.name}</h1>
              <div className="public-title">{consultant.title}</div>
              <div className="public-institution">{consultant.institution}</div>
              <div className="public-experience">{consultant.qualifications} • {consultant.experience}</div>
            </div>
          </div>

          <div className="public-hero-right">
            <button
              type="button"
              className="btn-primary btn-consult-now"
              onClick={() => navigate('/consultation')}
            >
              Book Consultation with {consultant.name}
            </button>
            <div className="public-availability-note">
              Status: <strong>{consultant.availability}</strong> • Fee: <strong>{consultant.fee}</strong>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="metrics-summary-grid">
          <div className="metric-summary-card">
            <div className="metric-summary-value">{consultant.rating} / 5.0</div>
            <div className="metric-summary-label">Farmer Satisfaction</div>
            <div className="metric-summary-sub">Verified ratings</div>
          </div>
          <div className="metric-summary-card">
            <div className="metric-summary-value">{consultant.totalConsultations}</div>
            <div className="metric-summary-label">Total Consultations</div>
            <div className="metric-summary-sub">Across 6 districts</div>
          </div>
          <div className="metric-summary-card">
            <div className="metric-summary-value">{consultant.completedCases}</div>
            <div className="metric-summary-label">Cases Resolved</div>
            <div className="metric-summary-sub">98.9% resolution rate</div>
          </div>
          <div className="metric-summary-card">
            <div className="metric-summary-value">{consultant.responseTime}</div>
            <div className="metric-summary-label">Average Response</div>
            <div className="metric-summary-sub">Rapid triage turnaround</div>
          </div>
        </div>

        {/* Consultant Bio & Areas of Specialization */}
        <div className="profile-section-card">
          <h2 className="profile-section-title">Agronomic Focus &amp; Scientific Background</h2>
          <p className="public-bio-paragraph">{consultant.bio}</p>

          <div className="specialties-two-col">
            <div>
              <span className="info-spec-label">Core Technical Specialties:</span>
              <div className="tag-pills-row">
                {consultant.specialties.map((spec) => (
                  <span key={spec} className="tag-pill-item">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="info-spec-label">Specialized Cultivated Crops:</span>
              <div className="tag-pills-row">
                {consultant.cropsSpecialized.map((cr) => (
                  <span key={cr} className="tag-pill-item crop-tag">
                    {cr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Published Scientific Bulletins */}
        {consultant.publications && (
          <div className="profile-section-card">
            <h2 className="profile-section-title">Key Publications &amp; Extension Bulletins</h2>
            <ul className="publications-list">
              {consultant.publications.map((pub, idx) => (
                <li key={idx} className="pub-item">
                  <strong>{pub}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Documented Case Studies */}
        {consultant.caseStudies && (
          <div className="profile-section-card">
            <h2 className="profile-section-title">Verified Field Case Studies &amp; Farmer Outcomes</h2>
            <div className="case-studies-grid">
              {consultant.caseStudies.map((cs, idx) => (
                <div key={idx} className="case-study-card">
                  <div className="cs-header">
                    <span className="cs-farmer">{cs.farmer}</span>
                    <span className="cs-crop">Crop: {cs.crop}</span>
                  </div>
                  <div className="cs-body">
                    <div className="cs-problem">
                      <span className="cs-lbl">Distress Symptoms:</span>
                      <p>{cs.problem}</p>
                    </div>
                    <div className="cs-resolution">
                      <span className="cs-lbl">Prescribed Resolution:</span>
                      <p>{cs.resolution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="public-profile-bottom-cta">
          <div>
            <h3>Need personal advisory for your crops?</h3>
            <p>Connect directly with {consultant.name} on the AgroGuide Consultation Portal.</p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/consultation')}
          >
            Open Consultation Request
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: PROTECTED ROUTE GATEWAY (When NOT authenticated)
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="profile-page container">
        <div className="protected-gateway-card">
          <div className="gateway-header">
            <span className="gateway-badge">PROTECTED ROUTE</span>
            <h2>AgroGuide Profile Authentication</h2>
            <p>
              Sign in to access your role-specific dashboard: Farmer Purchases, Seller Produce Portfolio &amp; Sold Items,
              or Agronomy Consultant Diagnostics.
            </p>
          </div>

          {/* Quick 1-Click Demo Profiles */}
          <div className="demo-accounts-strip">
            <span className="demo-strip-label">Select Instant Demo Account:</span>
            <div className="demo-profiles-row">
              <button
                type="button"
                className="demo-card-btn"
                onClick={() => handleDemoLogin('basic')}
              >
                <div className="demo-card-role">Basic Farmer / Buyer</div>
                <strong className="demo-card-name">Ramesh Kumar</strong>
                <span className="demo-card-sub">Orders, Schemes &amp; Farmland</span>
              </button>

              <button
                type="button"
                className="demo-card-btn"
                onClick={() => handleDemoLogin('seller')}
              >
                <div className="demo-card-role">Verified Farm Seller</div>
                <strong className="demo-card-name">Sardar Gurpreet Singh</strong>
                <span className="demo-card-sub">Produce Portfolio &amp; Sold Items</span>
              </button>

              <button
                type="button"
                className="demo-card-btn"
                onClick={() => handleDemoLogin('consultant')}
              >
                <div className="demo-card-role">Agronomy Specialist</div>
                <strong className="demo-card-name">Dr. Ananya Sharma</strong>
                <span className="demo-card-sub">Credentials, Inquiries &amp; Prescriptions</span>
              </button>
            </div>
          </div>

          {/* Manual Login / Register Form */}
          <div className="gateway-form-container">
            <div className="login-register-toggle">
              <button
                type="button"
                className={authMode === 'login' ? 'active' : ''}
                onClick={() => setAuthMode('login')}
              >
                Account Sign In
              </button>
              <button
                type="button"
                className={authMode === 'register' ? 'active' : ''}
                onClick={() => setAuthMode('register')}
              >
                Register New Role
              </button>
            </div>

            {/* Role Radio Group */}
            <div className="role-selection-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Select Account Profile Type:</label>
              <div className="switch-btns-group">
                <button
                  type="button"
                  className={`switch-btn ${selectedRole === 'basic' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('basic')}
                >
                  Basic Farmer / Buyer
                </button>
                <button
                  type="button"
                  className={`switch-btn ${selectedRole === 'seller' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('seller')}
                >
                  Farm Seller / Grower
                </button>
                <button
                  type="button"
                  className={`switch-btn ${selectedRole === 'consultant' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('consultant')}
                >
                  Agronomy Consultant
                </button>
              </div>
            </div>

            {authErrors.general && (
              <div className="field-error-msg" style={{ marginBottom: '12px' }}>
                {authErrors.general}
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="auth-form-card" noValidate>
                <div className="form-group">
                  <label className="form-label">Registered Phone or Email: *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone or email..."
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password: *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password..."
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Sign In as {selectedRole.toUpperCase()}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="auth-form-card" noValidate>
                <div className="form-group">
                  <label className="form-label">Full Name: *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone / Email: *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="10-digit mobile number or email"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    required
                  />
                </div>

                {selectedRole === 'seller' && (
                  <div className="form-group">
                    <label className="form-label">Farm / Enterprise Name: *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. GreenFields Organic Acres"
                      value={formData.farmName}
                      onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                      required
                    />
                  </div>
                )}

                {selectedRole === 'consultant' && (
                  <div className="form-group">
                    <label className="form-label">Highest Academic Qualification: *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ph.D. Soil Science / M.Sc. Agronomy"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Create Password (Min 4 chars): *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password..."
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Register &amp; Activate {selectedRole.toUpperCase()} Profile
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED USER PROFILE (Role-tailored experience)
  // =========================================================================
  const role = currentUser.role || 'basic';

  return (
    <div className="profile-page container">
      {/* Top Profile Hero Card */}
      <div className="profile-hero-card">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar-circle">
            {currentUser.avatarInitials || currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className={`role-badge-tag ${role}`}>
              {role === 'seller' ? 'Verified Farm Seller' : role === 'consultant' ? 'Agronomy Specialist' : 'Farmer & Buyer'}
            </span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '2px 0 4px 0' }}>{currentUser.name}</h1>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
              {role === 'seller' && (
                <>Operating <strong>{currentUser.farmName}</strong> in <strong>{currentUser.location || 'Punjab'}</strong></>
              )}
              {role === 'consultant' && (
                <>{currentUser.title} • <strong>{currentUser.institution}</strong></>
              )}
              {role === 'basic' && (
                <>Farmer from <strong>{currentUser.location || 'Punjab'}</strong> • Land: {currentUser.landArea || '4.5 Acres'}</>
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {role === 'consultant' && (
            <Link to="/consultation" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Open Consultation Workplace
            </Link>
          )}
          <button
            type="button"
            className="btn-prescription-submit"
            style={{ backgroundColor: '#ef4444' }}
            onClick={logout}
            title="Sign out of active session"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Quick Perspective Switch Bar */}
      <div className="profile-switch-bar">
        <span className="profile-switch-label">Switch Account Perspective:</span>
        <div className="switch-btns-group">
          <button
            type="button"
            className={`switch-btn ${role === 'basic' ? 'active' : ''}`}
            onClick={() => handleDemoLogin('basic')}
          >
            Basic Farmer (Ramesh)
          </button>
          <button
            type="button"
            className={`switch-btn ${role === 'seller' ? 'active' : ''}`}
            onClick={() => handleDemoLogin('seller')}
          >
            Farm Seller (Gurpreet)
          </button>
          <button
            type="button"
            className={`switch-btn ${role === 'consultant' ? 'active' : ''}`}
            onClick={() => handleDemoLogin('consultant')}
          >
            Consultant (Dr. Ananya)
          </button>
        </div>
      </div>

      {/* =========================================================================
          ROLE VIEW 1: BASIC FARMER & BUYER
          ========================================================================= */}
      {role === 'basic' && (
        <div>
          <div className="profile-subtabs">
            <button
              type="button"
              className={`profile-subtab ${profileTab === 'overview' ? 'active' : ''}`}
              onClick={() => setProfileTab('overview')}
            >
              Farmland &amp; Purchases
            </button>
            <button
              type="button"
              className={`profile-subtab ${profileTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setProfileTab('inquiries')}
            >
              My Consultation Inquiries ({consultations.filter(c => c.farmerName === currentUser.name).length})
            </button>
            <button
              type="button"
              className={`profile-subtab ${profileTab === 'schemes' ? 'active' : ''}`}
              onClick={() => setProfileTab('schemes')}
            >
              Saved Subsidies ({savedSchemes.length})
            </button>
          </div>

          {profileTab === 'overview' && (
            <>
              {/* Farmland Overview */}
              <div className="profile-section-card">
                <h3 className="profile-section-title">Farmland Operational Portfolio</h3>
                <div className="info-spec-grid">
                  <div className="info-spec-item">
                    <div className="info-spec-label">Landholding Size</div>
                    <div className="info-spec-value">{currentUser.landArea || '4.5 Acres'}</div>
                  </div>
                  <div className="info-spec-item">
                    <div className="info-spec-label">Agro-Climatic Zone</div>
                    <div className="info-spec-value">Trans-Gangetic Plains (Zone VI)</div>
                  </div>
                  <div className="info-spec-item">
                    <div className="info-spec-label">Primary Cultivars</div>
                    <div className="info-spec-value">{currentUser.primaryCrops || 'Wheat & Mustard'}</div>
                  </div>
                  <div className="info-spec-item">
                    <div className="info-spec-label">Soil Classification</div>
                    <div className="info-spec-value">Sandy Loam (pH 7.4)</div>
                  </div>
                </div>
              </div>

              {/* Direct Marketplace Purchase Orders */}
              <div className="profile-section-card">
                <h3 className="profile-section-title">
                  Direct Farm Purchases &amp; Orders ({orders.filter(o => o.buyerName === currentUser.name).length})
                </h3>
                {orders.filter(o => o.buyerName === currentUser.name).length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="profile-data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                          <th style={{ padding: '10px' }}>Order ID</th>
                          <th style={{ padding: '10px' }}>Produce Item</th>
                          <th style={{ padding: '10px' }}>Grower / Seller</th>
                          <th style={{ padding: '10px' }}>Quantity</th>
                          <th style={{ padding: '10px' }}>Total Amount</th>
                          <th style={{ padding: '10px' }}>Tracking Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.filter(o => o.buyerName === currentUser.name).map((ord) => (
                          <tr key={ord.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px' }}><strong>{ord.id}</strong></td>
                            <td style={{ padding: '10px' }}>{ord.productTitle}</td>
                            <td style={{ padding: '10px' }}>{ord.farmerName}</td>
                            <td style={{ padding: '10px' }}>{ord.quantity} {ord.unit}</td>
                            <td style={{ padding: '10px' }}><strong>₹{ord.totalAmount.toLocaleString()}</strong></td>
                            <td style={{ padding: '10px' }}>
                              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '4px', backgroundColor: ord.status.includes('Delivered') ? '#dcfce7' : '#fef08a', color: ord.status.includes('Delivered') ? '#15803d' : '#854d0e', fontWeight: 700 }}>
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state-card">
                    <p>No marketplace purchases made yet.</p>
                    <Link to="/marketplace" className="btn-primary" style={{ marginTop: '10px', display: 'inline-block' }}>
                      Browse Fresh Produce
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {profileTab === 'inquiries' && (
            <div className="profile-section-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="profile-section-title" style={{ margin: 0 }}>My Submitted Agronomic Inquiries</h3>
                <Link to="/consultation" className="btn-primary" style={{ fontSize: '0.85rem' }}>
                  Ask an Agronomist
                </Link>
              </div>

              {consultations.filter(c => c.farmerName === currentUser.name).length > 0 ? (
                consultations.filter(c => c.farmerName === currentUser.name).map((t) => (
                  <div key={t.id} className="consultant-ticket-card">
                    <div className="consultant-ticket-header">
                      <div>
                        <strong>{t.crop}</strong> ({t.acres} Acres) • <span style={{ color: '#64748b' }}>{t.date}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: t.status.includes('Dispatched') ? '#dcfce7' : '#fef08a', color: t.status.includes('Dispatched') ? '#15803d' : '#854d0e', fontWeight: 700 }}>
                        {t.status}
                      </span>
                    </div>
                    <div className="consultant-ticket-body">
                      <strong>Problem:</strong> {t.description}
                    </div>
                    {t.recommendation && (
                      <div className="consultant-ticket-footer">
                        <strong style={{ color: '#15803d' }}>Dispatched Prescription:</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{t.recommendation}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-state-card">
                  <p>You have not submitted any crop distress inquiries yet.</p>
                  <Link to="/consultation" className="btn-primary" style={{ marginTop: '10px', display: 'inline-block' }}>
                    Request Advisory on Consultation Portal
                  </Link>
                </div>
              )}
            </div>
          )}

          {profileTab === 'schemes' && (
            <div className="profile-section-card">
              <h3 className="profile-section-title">Bookmarked Government Subsidies ({savedSchemes.length})</h3>
              {savedSchemes.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {savedSchemes.map((schemeId) => (
                    <div key={schemeId} style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>{schemeId.toUpperCase()} Scheme</strong>
                      <Link to="/schemes" className="btn-secondary" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card">
                  <p>No government subsidies saved yet.</p>
                  <Link to="/schemes" className="btn-primary" style={{ marginTop: '10px', display: 'inline-block' }}>
                    Explore Active Schemes
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          ROLE VIEW 2: VERIFIED FARM SELLER
          ========================================================================= */}
      {role === 'seller' && (
        <div>
          {/* Sales Metrics */}
          <div className="metrics-summary-grid">
            <div className="metric-summary-card">
              <div className="metric-summary-value">
                ₹{orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}
              </div>
              <div className="metric-summary-label">Total Mandi Proceeds</div>
              <div className="metric-summary-sub">Direct buyer transfers</div>
            </div>
            <div className="metric-summary-card">
              <div className="metric-summary-value">{orders.length}</div>
              <div className="metric-summary-label">Shipments Handled</div>
              <div className="metric-summary-sub">Zero commission orders</div>
            </div>
            <div className="metric-summary-card">
              <div className="metric-summary-value">{products.length}</div>
              <div className="metric-summary-label">Active Listed Lots</div>
              <div className="metric-summary-sub">Available for trading</div>
            </div>
            <div className="metric-summary-card">
              <div className="metric-summary-value">4.9 / 5.0</div>
              <div className="metric-summary-label">Buyer Trust Score</div>
              <div className="metric-summary-sub">APEDA Certified Quality</div>
            </div>
          </div>

          {/* Seller Farm Enterprise Info */}
          <div className="profile-section-card">
            <h3 className="profile-section-title">Producer Enterprise Details</h3>
            <div className="info-spec-grid">
              <div className="info-spec-item">
                <div className="info-spec-label">Enterprise Name</div>
                <div className="info-spec-value">{currentUser.farmName}</div>
              </div>
              <div className="info-spec-item">
                <div className="info-spec-label">Organic Certification</div>
                <div className="info-spec-value">{currentUser.certification || 'NPOP / APEDA Verified'}</div>
              </div>
              <div className="info-spec-item">
                <div className="info-spec-label">Farming Scale</div>
                <div className="info-spec-value">{currentUser.landArea || '25 Acres Organic'}</div>
              </div>
              <div className="info-spec-item">
                <div className="info-spec-label">Contact Phone</div>
                <div className="info-spec-value">{currentUser.emailOrPhone}</div>
              </div>
            </div>
            <p style={{ marginTop: '14px', fontSize: '0.9rem', color: '#475569' }}>
              {currentUser.farmBio}
            </p>
          </div>

          {/* Produce Listings Portfolio */}
          <div className="profile-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="profile-section-title" style={{ margin: 0 }}>
                My Harvest Produce Lots ({products.length})
              </h3>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsAddModalOpen(true)}
              >
                + List New Harvest Lot
              </button>
            </div>

            <div className="seller-products-portfolio-grid">
              {products.map((prod) => (
                <div key={prod.id} className="seller-product-portfolio-card">
                  <img
                    src={getProductImage(prod)}
                    alt={prod.title}
                    className="seller-product-portfolio-img"
                  />
                  <div className="seller-product-portfolio-body">
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
                      {prod.category}
                    </span>
                    <strong style={{ fontSize: '0.95rem', margin: '4px 0' }}>{prod.title}</strong>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                      ₹{prod.price} <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>/ {prod.unit}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                      Stock: {prod.stock} {prod.unit}s available
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incoming Orders Table */}
          <div className="profile-section-card">
            <h3 className="profile-section-title">
              Incoming Buyer Orders ({orders.length})
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '10px' }}>Order ID</th>
                    <th style={{ padding: '10px' }}>Produce</th>
                    <th style={{ padding: '10px' }}>Buyer</th>
                    <th style={{ padding: '10px' }}>Qty</th>
                    <th style={{ padding: '10px' }}>Amount</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px' }}><strong>{ord.id}</strong></td>
                      <td style={{ padding: '10px' }}>{ord.productTitle}</td>
                      <td style={{ padding: '10px' }}>{ord.buyerName}</td>
                      <td style={{ padding: '10px' }}>{ord.quantity} {ord.unit}</td>
                      <td style={{ padding: '10px' }}><strong>₹{ord.totalAmount.toLocaleString()}</strong></td>
                      <td style={{ padding: '10px' }}>
                        <span style={{ fontSize: '0.78rem', padding: '3px 8px', borderRadius: '4px', backgroundColor: ord.status.includes('Delivered') ? '#dcfce7' : '#fef08a', color: ord.status.includes('Delivered') ? '#15803d' : '#854d0e', fontWeight: 700 }}>
                          {ord.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px' }}>
                        {ord.status.includes('Dispatched') ? (
                          <button
                            type="button"
                            className="btn-prescription-submit"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => {
                              updateOrderStatus(ord.id, 'Delivered & Inspected');
                              showToast(`Order #${ord.id} marked as Delivered!`, 'success');
                            }}
                          >
                            Mark Delivered
                          </button>
                        ) : (
                          <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem' }}>Fulfilled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ROLE VIEW 3: AGRONOMY CONSULTANT PROFILE
          ========================================================================= */}
      {role === 'consultant' && (
        <div>
          {/* Consultant Academic & Institutional Portfolio */}
          <div className="profile-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 className="profile-section-title" style={{ margin: 0 }}>
                Agronomic Research &amp; Professional Portfolio
              </h3>
              <Link to="/consultation" className="btn-primary" style={{ fontSize: '0.85rem' }}>
                Open Consultation Portal
              </Link>
            </div>

            <div className="info-spec-grid">
              <div className="info-spec-item">
                <div className="info-spec-label">Current Designation</div>
                <div className="info-spec-value">{currentUser.title || 'Senior Agronomist'}</div>
              </div>
              <div className="info-spec-item">
                <div className="info-spec-label">Affiliated Institution</div>
                <div className="info-spec-value">{currentUser.institution || 'Krishi Vigyan Kendra'}</div>
              </div>
              <div className="info-spec-item">
                <div className="info-spec-label">Highest Academic Degree</div>
                <div className="info-spec-value">{currentUser.qualifications || 'Ph.D. Plant Pathology'}</div>
              </div>
              <div className="info-spec-item">
                <div className="info-spec-label">Experience</div>
                <div className="info-spec-value">{currentUser.experience || '14+ Years in Crop Science'}</div>
              </div>
            </div>

            {/* Specialization Tags */}
            <div style={{ marginTop: '16px' }}>
              <span className="info-spec-label" style={{ display: 'block', marginBottom: '8px' }}>
                Areas of Agronomic Expertise &amp; Advisory Specialization:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(currentUser.specializations || [
                  'Soil NPK Balancing',
                  'Fungal Blight & Rust Control',
                  'Bio-Pesticides & Neemastra',
                  'Precision Drip Fertigation',
                  'Organic Crop Certification'
                ]).map((spec, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Assigned Farmer Distress Tickets */}
          <div className="profile-section-card">
            <h3 className="profile-section-title">
              Farmer Inquiries &amp; Diagnostics ({consultations.length})
            </h3>

            <div>
              {consultations.map((t) => (
                <div key={t.id} className="consultant-ticket-card">
                  <div className="consultant-ticket-header">
                    <div>
                      <strong>{t.farmerName}</strong> ({t.district}, {t.state}) • <span style={{ color: '#64748b' }}>{t.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d' }}>{t.crop} ({t.acres} Acres)</span>
                      <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: t.status.includes('Dispatched') ? '#dcfce7' : '#fef08a', color: t.status.includes('Dispatched') ? '#15803d' : '#854d0e', fontWeight: 700 }}>
                        {t.status}
                      </span>
                    </div>
                  </div>

                  <div className="consultant-ticket-body">
                    <strong>Reported Distress:</strong> {t.description}
                  </div>

                  {t.recommendation ? (
                    <div className="consultant-ticket-footer">
                      <strong style={{ color: '#15803d' }}>Dispatched Advisory:</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{t.recommendation}</p>
                    </div>
                  ) : activeReplyTicketId === t.id ? (
                    <div style={{ marginTop: '10px' }}>
                      <label className="form-label">Write Scientific Prescription: *</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        placeholder="Specify spray ratio, dosage, or watering schedule..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button
                          type="button"
                          className="btn-prescription-submit"
                          onClick={() => handleSendAdvisory(t.id)}
                        >
                          Send Advisory
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            setActiveReplyTicketId(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        type="button"
                        className="btn-prescription-submit"
                        onClick={() => {
                          setActiveReplyTicketId(t.id);
                          setReplyText('');
                        }}
                      >
                        Prescribe Advisory &amp; Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Produce Modal for Sellers */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
