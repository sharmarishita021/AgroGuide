import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Initial Demo Accounts for each role
const KISAN_DEMO_USER = {
  id: 'user-basic-101',
  role: 'kisan',
  name: 'Ramesh Kumar',
  emailOrPhone: '9876501234',
  location: 'Samrala, Ludhiana, Punjab',
  state: 'Punjab',
  district: 'Ludhiana',
  tehsil: 'Samrala Block',
  block: 'Samrala Block',
  districtBlock: 'Ludhiana / Samrala Block',
  pinCode: '141114',
  landSize: '4.5',
  landArea: '4.5',
  soilType: 'Alluvial Sandy Loam (pH 7.4)',
  irrigationSource: 'Solar Tubewell & Minor Canal Distributary',
  soilHealthCardNo: 'SHC-PB-LDH-2025-8812',
  primaryCrops: 'Wheat (PBW-826) & Mustard (Giriraj)',
  avatarInitials: 'RK'
};

const SELLER_DEMO_USER = {
  id: 'seller-gurpreet-201',
  role: 'seller',
  name: 'Sardar Gurpreet Singh',
  businessName: 'GreenFields Organic Farm & Agro Supplies',
  farmName: 'GreenFields Organic Farm & Agro Supplies',
  category: 'Seeds, Fertilizers, Equipment',
  pickupAddress: 'GT Road Mandi Complex, Samrala Chowk, Ludhiana, Punjab - 141114',
  licenseGstId: 'PB-AGRI-GST-03AABCG1234F1Z5',
  emailOrPhone: '9876543210',
  location: 'Ludhiana, Punjab',
  state: 'Punjab',
  district: 'Ludhiana',
  landArea: '25 Acres',
  certification: 'APEDA Certified Organic (Reg: NPOP/IN/2024/098)',
  farmBio: 'Specializing in chemical-free Sharbati wheat, basmati paddy, certified organic seed varieties, and screened desi cow vermicompost.',
  avatarInitials: 'GS'
};

const CONSULTANT_DEMO_USER = {
  id: 'consultant-ramesh-302',
  role: 'consultant',
  name: 'Dr. Ramesh Verma',
  designation: 'Principal Soil Scientist & Micronutrient Extension Head',
  title: 'Principal Soil Scientist & Micronutrient Extension Head',
  institution: 'Punjab Agricultural University (PAU), Ludhiana',
  affiliatedUniversity: 'Punjab Agricultural University (PAU), Ludhiana',
  icarExtensionId: 'ICAR-PAU-PB-2008-4109',
  registrationNumber: 'ICAR-PAU-PB-2008-4109',
  agronomicSpecialties: 'Soil Health & Split Nitrogen Dosage, Precision Irrigation & Water Management, Organic Bio-Pesticides, Yellow Rust Control',
  emailOrPhone: 'r.verma@pau.edu',
  location: 'PAU Campus, Ferozepur Road, Ludhiana',
  state: 'Punjab',
  district: 'Ludhiana',
  qualifications: 'Ph.D. Soil Science & Agricultural Chemistry (IARI New Delhi)',
  experience: '18+ Years Field Extension & Soil Health Card Calibration',
  specializations: [
    'Soil Health & Split Nitrogen Dosage',
    'Precision Irrigation & Water Management',
    'Organic Bio-Pesticides & Neemastra',
    'Fungal Disease Control (Yellow Rust)'
  ],
  avatarInitials: 'RV'
};

export const DEMO_USERS = {
  kisan: KISAN_DEMO_USER,
  basic: { ...KISAN_DEMO_USER, role: 'kisan' },
  seller: SELLER_DEMO_USER,
  consultant: CONSULTANT_DEMO_USER
};

export function AuthProvider({ children }) {
  // Current user state backed by localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize basic role to kisan if needed, preserving fields
        if (parsed.role === 'basic') {
          return { ...KISAN_DEMO_USER, ...parsed, role: 'kisan' };
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Track customer orders across marketplace
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_orders_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ORD-98214',
        productId: 'prod-1',
        productTitle: 'Certified Organic Sharbati Wheat (Grade A)',
        buyerName: 'Ramesh Kumar',
        buyerPhone: '9876501234',
        farmerName: 'Sardar Gurpreet Singh',
        quantity: 2,
        unit: 'Quintal',
        price: 2450,
        totalAmount: 4900,
        status: 'Dispatched to Mandi Hub',
        date: '20 Oct 2026'
      },
      {
        id: 'ORD-98102',
        productId: 'prod-3',
        productTitle: 'Pure Desi Cow Vermicompost (Khad)',
        buyerName: 'Ramesh Kumar',
        buyerPhone: '9876501234',
        farmerName: 'Sardar Gurpreet Singh',
        quantity: 5,
        unit: '50kg Bag',
        price: 450,
        totalAmount: 2250,
        status: 'Delivered & Inspected',
        date: '15 Oct 2026'
      }
    ];
  });

  // Track consultation tickets
  const [consultations, setConsultations] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_consultation_tickets');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'KRISHI-ADV-81920',
        farmerName: 'Ramesh Kumar',
        phone: '9876501234',
        district: 'Ludhiana',
        state: 'Punjab',
        crop: 'Wheat',
        acres: '4.5',
        urgency: 'Medium Priority (24-48 hrs)',
        category: 'Soil Health & NPK Dosage',
        description: 'Noticing mild yellowing in leaf tips after second irrigation. Need check on nitrogen split dosage.',
        status: 'Advisory Dispatched',
        recommendation: 'Apply foliar spray of 1% urea + 0.5% zinc sulphate. Avoid water stagnation in lower corners.',
        assignedConsultant: 'Dr. Ananya Sharma',
        acceptedBy: 'Dr. Ananya Sharma',
        date: '20 Oct 2026'
      },
      {
        id: 'KRISHI-ADV-82051',
        farmerName: 'Harpreet Dhillon',
        phone: '9814109876',
        district: 'Amritsar',
        state: 'Punjab',
        crop: 'Mustard',
        acres: '8.0',
        urgency: 'High / Pest Outbreak (< 12 hrs)',
        category: 'Pest & Insect Diagnostics',
        description: 'Aphid colony buildup on top flower buds and young siliquae. Seeking organic neem bio-spray ratio to prevent seed yield drop.',
        status: 'Pending Review',
        recommendation: '',
        assignedConsultant: 'Dr. Ananya Sharma',
        acceptedBy: null,
        date: 'Today, 08:30 AM'
      },
      {
        id: 'KRISHI-ADV-82114',
        farmerName: 'Gurdas Mann',
        phone: '9872201982',
        district: 'Bathinda',
        state: 'Punjab',
        crop: 'Cotton',
        acres: '12.0',
        urgency: 'Critical / Emergency',
        category: 'Fungal & Bacterial Diseases',
        description: 'Leaf curl virus symptoms visible on boundary rows with whitefly vectors. Need immediate containment plan.',
        status: 'Pending Review',
        recommendation: '',
        assignedConsultant: 'Open Pool',
        acceptedBy: null,
        date: 'Today, 09:15 AM'
      },
      {
        id: 'KRISHI-ADV-82190',
        farmerName: 'Surinder Kaur',
        phone: '9888123450',
        district: 'Patiala',
        state: 'Punjab',
        crop: 'Paddy / Basmati Rice',
        acres: '6.0',
        urgency: 'Routine (3-5 days)',
        category: 'Soil Health & NPK Dosage',
        description: 'Post-harvest soil analysis shows pH 8.4 with low organic carbon. Advice needed on green manure incorporation.',
        status: 'Pending Review',
        recommendation: '',
        assignedConsultant: 'Dr. Ramesh Verma',
        acceptedBy: null,
        date: 'Today, 10:00 AM'
      },
      {
        id: 'KRISHI-ADV-81765',
        farmerName: 'Devinder Chahal',
        phone: '9815099881',
        district: 'Jalandhar',
        state: 'Punjab',
        crop: 'Sugarcane',
        acres: '15.0',
        urgency: 'Medium Priority (24-48 hrs)',
        category: 'Precision Irrigation & Water Management',
        description: 'Installing sub-surface drip in ratoon crop. Looking for optimal lateral spacing and fertigation scheduling.',
        status: 'Advisory Dispatched',
        recommendation: 'Use 16mm inline dripper spaced at 50cm intervals with 2.2 LPH discharge. Schedule 40% N at tillering and remaining in 3 split doses.',
        assignedConsultant: 'Er. Vikramaditya Singh',
        acceptedBy: 'Er. Vikramaditya Singh',
        date: '18 Oct 2026'
      }
    ];
  });

  const [registeredConsultants, setRegisteredConsultants] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agri_registered_consultants') || '[]');
    } catch {
      return [];
    }
  });

  // Track seasonal crop history for farmer dashboard
  const [cropHistory, setCropHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_crop_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'CYCLE-2025-RABI',
        season: 'Rabi Season 2025-26',
        isCurrent: true,
        crop: 'Wheat (PBW-826) & Yellow Mustard (Giriraj)',
        acreage: '4.5 Acres',
        sowingDate: '05 Nov 2025',
        stage: 'Flowering & Grain Filling',
        targetYield: '22 Quintals / Acre',
        irrigationStatus: '3rd Watering Complete (Solar Tubewell)',
        fertilizerProtocol: 'Split Nitrogen (120 kg N/ha in 3 splits) + 0.5% Zinc Spray',
        soilHealthCardRef: 'SHC-PB-LDH-2025-8812',
        status: 'Active Field Cycle'
      },
      {
        id: 'CYCLE-2025-KHARIF',
        season: 'Kharif Season 2025',
        isCurrent: false,
        crop: 'Pusa Basmati 1121 & PR-126 Paddy',
        acreage: '4.5 Acres',
        sowingDate: '20 Jun 2025',
        stage: 'Harvested & Mandi Dispatched',
        targetYield: '26.4 Quintals / Acre (Achieved)',
        irrigationStatus: 'Canal Distributary Alternate Wetting & Drying',
        fertilizerProtocol: 'Dhaincha Green Manuring + Neem Coated Urea',
        soilHealthCardRef: 'SHC-PB-LDH-2025-8812',
        status: 'Harvested & Sold at Mandi'
      },
      {
        id: 'CYCLE-2025-ZAID',
        season: 'Zaid Season 2025 (Summer Catch)',
        isCurrent: false,
        crop: 'Summer Moong (SML-668) & Fodder Bajra',
        acreage: '2.0 Acres',
        sowingDate: '28 Mar 2025',
        stage: 'Harvested & Nodules Incorporated',
        targetYield: '5.2 Quintals / Acre',
        irrigationStatus: 'Light Sprinkler 2 Rotations',
        fertilizerProtocol: 'Rhizobium Culture Seed Inoculation (Zero Chemical N)',
        soilHealthCardRef: 'SHC-PB-LDH-2025-8812',
        status: 'Completed Cycle'
      }
    ];
  });

  // Track government scheme subsidy application statuses
  const [schemeApplications, _setSchemeApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_scheme_applications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'APP-KUSUM-PB-9942',
        schemeName: 'PM-KUSUM Component-B (7.5 HP Solar Agri Pump)',
        applicationDate: '12 Sep 2025',
        trackingNumber: 'PB-REDA-SOL-2025-11094',
        nodalAgency: 'Punjab Energy Development Agency (PEDA) & DISCOM',
        subsidyAmount: '60% Capital Subsidy (₹1,95,000)',
        currentStage: 'Field Inspection Completed by Junior Engineer',
        status: 'Sanction Letter Issued',
        statusBadge: 'Approved'
      },
      {
        id: 'APP-CRM-PB-8810',
        schemeName: 'Crop Residue Management (CRM) Super Seeder Subsidy',
        applicationDate: '01 Oct 2025',
        trackingNumber: 'AGRI-CRM-LDH-2025-4421',
        nodalAgency: 'Punjab State Dept of Agriculture, Ludhiana Office',
        subsidyAmount: '50% Direct Machine Subsidy (₹1,25,000)',
        currentStage: 'Physical Verification of Tractor Implement at Mandi',
        status: 'DBT Payment Dispatched to Bank',
        statusBadge: 'Subsidy Dispatched'
      },
      {
        id: 'APP-SHC-PB-7703',
        schemeName: 'National Soil Health Card Cycle-III',
        applicationDate: '15 Aug 2025',
        trackingNumber: 'SHC-PB-SAM-2025-8812',
        nodalAgency: 'Block Agriculture Office, Samrala, Ludhiana',
        subsidyAmount: '100% Free Lab Soil Test & Micronutrient Card',
        currentStage: 'Lab NPK & Micronutrient Report Issued',
        status: 'Card Active & Calibrated',
        statusBadge: 'Report Ready'
      }
    ];
  });

  // Track callback requests for offline / IVR safety net
  const [callbackRequests, setCallbackRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_callback_requests');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('agri_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('agri_auth_user');
      }
    } catch (e) {
      console.warn('Failed to sync user to localStorage:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('agri_orders_list', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('agri_consultation_tickets', JSON.stringify(consultations));
    } catch {}
  }, [consultations]);

  useEffect(() => {
    try {
      localStorage.setItem('agri_registered_consultants', JSON.stringify(registeredConsultants));
    } catch (error) {
      console.warn('Failed to save consultant profiles:', error);
    }
  }, [registeredConsultants]);

  useEffect(() => {
    try {
      localStorage.setItem('agri_crop_history', JSON.stringify(cropHistory));
    } catch {}
  }, [cropHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('agri_scheme_applications', JSON.stringify(schemeApplications));
    } catch {}
  }, [schemeApplications]);

  useEffect(() => {
    try {
      localStorage.setItem('agri_callback_requests', JSON.stringify(callbackRequests));
    } catch {}
  }, [callbackRequests]);

  // Login handler
  const login = (role, credentials) => {
    const { emailOrPhone, password } = credentials;
    const accountRole = role === 'basic' ? 'kisan' : role;

    if (!emailOrPhone || !password) {
      throw new Error('Please enter your registered contact and password.');
    }

    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    const registeredConsultant = accountRole === 'consultant'
      ? registeredConsultants.find((profile) =>
          profile.emailOrPhone.toLowerCase() === emailOrPhone.toLowerCase()
        )
      : null;
    const isDemoConsultant = accountRole === 'consultant' &&
      emailOrPhone === DEMO_USERS.consultant.emailOrPhone;

    if (accountRole === 'consultant' && !registeredConsultant && !isDemoConsultant) {
      throw new Error('No consultant profile exists for this contact. Please sign up first.');
    }

    // Load template or generate custom
    const baseTemplate = DEMO_USERS[accountRole] || DEMO_USERS.kisan;
    const userObj = {
      ...baseTemplate,
      ...(registeredConsultant || {}),
      id: registeredConsultant?.id || (isDemoConsultant ? DEMO_USERS.consultant.id : `${accountRole}-${Date.now()}`),
      role: accountRole,
      roles: [accountRole],
      ...(registeredConsultant || {}),
      emailOrPhone,
      avatarInitials: (registeredConsultant?.name || baseTemplate.name)
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    };

    setCurrentUser(userObj);
    return userObj;
  };

  // Add a second role to the currently logged-in user (e.g., kisan also becomes seller)
  const addRoleToUser = (newRole, roleDetails) => {
    const accountRole = newRole === 'basic' ? 'kisan' : newRole;
    if (!currentUser) throw new Error('You must be logged in to add a role.');

    const existingRoles = currentUser.roles || [currentUser.role];
    if (existingRoles.includes(accountRole)) {
      throw new Error(`You already have a ${accountRole} profile.`);
    }

    const roleData = {
      [`${accountRole}Profile`]: { ...roleDetails, addedAt: new Date().toISOString() },
      roles: [...existingRoles, accountRole],
      // Merge role-specific fields at top level as well for compatibility
      ...roleDetails
    };

    if (accountRole === 'consultant') {
      const consultantEntry = {
        ...currentUser,
        ...roleDetails,
        id: currentUser.id,
        role: 'consultant',
        roles: [...existingRoles, accountRole],
        name: currentUser.name,
        emailOrPhone: currentUser.emailOrPhone,
        agronomicSpecialties: Array.isArray(roleDetails.specializations)
          ? roleDetails.specializations.join(', ')
          : roleDetails.specializations || ''
      };
      setRegisteredConsultants(prev => [
        ...prev.filter(p => p.id !== currentUser.id),
        consultantEntry
      ]);
    }

    const updated = { ...currentUser, ...roleData };
    setCurrentUser(updated);
    return updated;
  };

  // Switch role quickly (useful for demonstrations)
  const switchRole = (newRole) => {
    const accountRole = newRole === 'basic' ? 'kisan' : newRole;
    if (DEMO_USERS[accountRole]) {
      setCurrentUser(DEMO_USERS[accountRole]);
    } else {
      setCurrentUser((prev) => ({
        ...(prev || DEMO_USERS.kisan),
        role: accountRole
      }));
    }
  };

  // Register new user with specific role
  const register = (role, details) => {
    const {
      name,
      emailOrPhone,
      password,
      farmName,
      businessName,
      category,
      pickupAddress,
      licenseGstId,
      district,
      districtBlock,
      primaryCrops,
      landSize,
      state,
      qualifications,
      specializations,
      bio,
      workHistory,
      avatarUrl,
      title,
      institution,
      experience,
      icarExtensionId
    } = details;
    const accountRole = role === 'basic' ? 'kisan' : role;

    if (!name || !emailOrPhone || !password) {
      throw new Error('Please fill in all mandatory registration fields.');
    }
    if (
      accountRole === 'consultant' &&
      registeredConsultants.some((profile) =>
        profile.emailOrPhone.toLowerCase() === emailOrPhone.toLowerCase()
      )
    ) {
      throw new Error('A consultant profile already exists for this contact. Please sign in.');
    }

    const newUser = {
      id: `${role}-${Date.now()}`,
      role: accountRole,
      roles: [accountRole],
      name,
      emailOrPhone,
      businessName: businessName || farmName || '',
      farmName: businessName || farmName || `${name}'s Farm`,
      category: category || '',
      pickupAddress: pickupAddress || '',
      licenseGstId: licenseGstId || '',
      bio: bio || '',
      workHistory: workHistory || '',
      avatarUrl: avatarUrl || '',
      district: district || 'Ludhiana',
      districtBlock: districtBlock || district || 'Ludhiana',
      primaryCrops: primaryCrops || '',
      landSize: landSize || '',
      state: state || 'Punjab',
      location: `${district || 'Ludhiana'}, ${state || 'Punjab'}`,
      qualifications: qualifications || '',
      specializations: specializations || [],
      title: title || '',
      designation: title || '',
      institution: institution || '',
      affiliatedUniversity: institution || '',
      experience: experience || '',
      icarExtensionId: icarExtensionId || '',
      registrationNumber: icarExtensionId || '',
      agronomicSpecialties: Array.isArray(specializations)
        ? specializations.join(', ')
        : specializations || '',
      avatarInitials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    };

    if (accountRole === 'consultant') {
      setRegisteredConsultants((prev) => [
        ...prev.filter((profile) =>
          profile.emailOrPhone.toLowerCase() !== emailOrPhone.toLowerCase()
        ),
        newUser
      ]);
    }

    setCurrentUser(newUser);
    return newUser;
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Add new order
  const recordOrder = (orderData) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Order Placed (Direct to Farmer)',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Add new consultation inquiry
  const recordConsultation = (consultData) => {
    const newConsult = {
      id: 'KRISHI-ADV-' + Math.floor(100000 + Math.random() * 900000),
      date: 'Just now',
      status: 'Pending Review',
      recommendation: '',
      ...consultData
    };
    setConsultations((prev) => [newConsult, ...prev]);
    return newConsult;
  };

  // Consultant accepts ticket based on interest
  const acceptConsultation = (ticketId, consultantName, consultantId) => {
    setConsultations((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'Accepted / In Progress',
              acceptedBy: consultantName || 'Dr. Ananya Sharma',
              assignedConsultant: consultantName || t.assignedConsultant,
              assignedConsultantId: consultantId || t.assignedConsultantId,
              assignedConsultantIds: consultantId
                ? [consultantId]
                : t.assignedConsultantIds
            }
          : t
      )
    );
  };

  // Consultant declines ticket
  const declineConsultation = (ticketId, reason) => {
    setConsultations((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'Declined / Re-routed',
              declineReason: reason || 'Outside specialist domain',
              acceptedBy: null
            }
          : t
      )
    );
  };

  // Consultant replies to ticket
  const respondToConsultation = (ticketId, recommendation, consultantId, consultantName) => {
    setConsultations((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              recommendation,
              status: 'Advisory Dispatched',
              assignedConsultantId: consultantId || t.assignedConsultantId,
              assignedConsultant: consultantName || t.assignedConsultant
            }
          : t
      )
    );
  };

  // Update profile details (e.g. editable Farmland Details)
  const updateUserProfile = (updatedFields) => {
    const updated = { ...(currentUser || DEMO_USERS.basic), ...updatedFields };
    setCurrentUser(updated);
    if (updated.role === 'consultant') {
      setRegisteredConsultants((prev) => {
        const existing = prev.some((profile) => profile.id === updated.id);
        return existing
          ? prev.map((profile) => profile.id === updated.id
            ? { ...profile, ...updatedFields }
            : profile)
          : [...prev, updated];
      });
    }
    try {
      localStorage.setItem('agri_auth_user', JSON.stringify(updated));
    } catch {}
  };

  // Add seasonal crop cycle to history
  const addCropHistory = (cycleData) => {
    const newCycle = {
      id: 'CYCLE-' + Date.now(),
      ...cycleData
    };
    setCropHistory((prev) => [newCycle, ...prev]);
    return newCycle;
  };

  // Request SMS / IVR callback for low connectivity
  const requestCallback = (callbackData) => {
    const newReq = {
      id: 'IVR-' + Math.floor(10000 + Math.random() * 90000),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      status: 'Queued for KVK / PAU Kisan Call Desk',
      ...callbackData
    };
    setCallbackRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  // Update order status (for seller)
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Backward-compatible seller aliases
  const isSellerAuthenticated = Boolean(currentUser && currentUser.role === 'seller');
  const activeRole = currentUser?.role || 'kisan';
  const setActiveRole = (role) => switchRole(role);
  const loginSeller = (creds) => login('seller', creds);
  const registerSeller = (dets) => register('seller', dets);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        updateUserProfile,
        activeRole,
        setActiveRole,
        isSellerAuthenticated,
        login,
        register,
        addRoleToUser,
        switchRole,
        logout,
        loginSeller,
        registerSeller,
        orders,
        recordOrder,
        consultations,
        registeredConsultants,
        recordConsultation,
        acceptConsultation,
        declineConsultation,
        respondToConsultation,
        updateOrderStatus,
        cropHistory,
        addCropHistory,
        schemeApplications,
        callbackRequests,
        requestCallback
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
