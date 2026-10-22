import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Initial Demo Accounts for each role
export const DEMO_USERS = {
  basic: {
    id: 'user-basic-101',
    role: 'basic',
    name: 'Ramesh Kumar',
    emailOrPhone: '9876501234',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    district: 'Ludhiana',
    landArea: '4.5 Acres',
    primaryCrops: 'Wheat & Mustard',
    avatarInitials: 'RK'
  },
  seller: {
    id: 'seller-gurpreet-201',
    role: 'seller',
    name: 'Sardar Gurpreet Singh',
    farmName: 'GreenFields Organic Farm',
    emailOrPhone: '9876543210',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    district: 'Ludhiana',
    landArea: '25 Acres',
    certification: 'APEDA Certified Organic (Reg: NPOP/IN/2024/098)',
    farmBio: 'Specializing in chemical-free Sharbati wheat, basmati paddy, and screened desi cow vermicompost.',
    avatarInitials: 'GS'
  },
  consultant: {
    id: 'consultant-ananya-301',
    role: 'consultant',
    name: 'Dr. Ananya Sharma',
    title: 'Senior Agronomist & Plant Pathologist',
    institution: 'Krishi Vigyan Kendra (KVK) & ICAR Associate',
    emailOrPhone: 'ananya.sharma@icar.res.in',
    location: 'Regional Krishi Research Station, New Delhi',
    state: 'Delhi',
    district: 'New Delhi',
    qualifications: 'Ph.D. Plant Pathology (PAU), M.Sc. Agronomy',
    experience: '14+ Years Field Diagnostics & Organic Agronomy',
    specializations: [
      'Soil NPK Balancing',
      'Fungal Disease Control (Rust & Mildew)',
      'Bio-Pesticides & Neemastra',
      'Precision Drip Fertigation',
      'Organic Crop Certification'
    ],
    avatarInitials: 'AS'
  }
};

export function AuthProvider({ children }) {
  // Current user state backed by localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_auth_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.basic;
    } catch {
      return DEMO_USERS.basic;
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

  // Login handler
  const login = (role, credentials) => {
    const { emailOrPhone, password, name, farmName } = credentials;

    if (!emailOrPhone || !password) {
      throw new Error('Please enter your registered contact and password.');
    }

    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    // Load template or generate custom
    const baseTemplate = DEMO_USERS[role] || DEMO_USERS.basic;
    const userObj = {
      ...baseTemplate,
      id: `${role}-${Date.now()}`,
      role,
      name: name || baseTemplate.name,
      emailOrPhone,
      farmName: farmName || (baseTemplate.farmName || `${name || 'Kisan'}'s Farm`),
      avatarInitials: (name || baseTemplate.name).split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    };

    setCurrentUser(userObj);
    return userObj;
  };

  // Switch role quickly (useful for demonstrations)
  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setCurrentUser(DEMO_USERS[newRole]);
    } else {
      setCurrentUser((prev) => ({
        ...(prev || DEMO_USERS.basic),
        role: newRole
      }));
    }
  };

  // Register new user with specific role
  const register = (role, details) => {
    const { name, emailOrPhone, password, farmName, district, state, qualifications, specializations } = details;

    if (!name || !emailOrPhone || !password) {
      throw new Error('Please fill in all mandatory registration fields.');
    }

    const newUser = {
      id: `${role}-${Date.now()}`,
      role,
      name,
      emailOrPhone,
      farmName: farmName || `${name}'s Farm`,
      district: district || 'Ludhiana',
      state: state || 'Punjab',
      location: `${district || 'Ludhiana'}, ${state || 'Punjab'}`,
      qualifications: qualifications || 'Agricultural Graduate',
      specializations: specializations || ['Soil Nutrition', 'Crop Diagnostics'],
      avatarInitials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    };

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
      assignedConsultant: 'Dr. Ananya Sharma',
      ...consultData
    };
    setConsultations((prev) => [newConsult, ...prev]);
    return newConsult;
  };

  // Consultant accepts ticket based on interest
  const acceptConsultation = (ticketId, consultantName) => {
    setConsultations((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'Accepted / In Progress',
              acceptedBy: consultantName || 'Dr. Ananya Sharma',
              assignedConsultant: consultantName || t.assignedConsultant
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
  const respondToConsultation = (ticketId, recommendation) => {
    setConsultations((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, recommendation, status: 'Advisory Dispatched' }
          : t
      )
    );
  };

  // Update order status (for seller)
  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Backward-compatible seller aliases
  const isSellerAuthenticated = Boolean(currentUser && currentUser.role === 'seller');
  const activeRole = currentUser?.role || 'basic';
  const setActiveRole = (role) => switchRole(role);
  const loginSeller = (creds) => login('seller', creds);
  const registerSeller = (dets) => register('seller', dets);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole,
        setActiveRole,
        isSellerAuthenticated,
        login,
        register,
        switchRole,
        logout,
        loginSeller,
        registerSeller,
        orders,
        recordOrder,
        consultations,
        recordConsultation,
        acceptConsultation,
        declineConsultation,
        respondToConsultation,
        updateOrderStatus
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
