import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const KISAN_DEMO = {
  id: 'user-basic-101', role: 'kisan', roles: ['kisan'], name: 'Ramesh Kumar', emailOrPhone: '9876501234', password: 'password123',
  location: 'Samrala, Ludhiana, Punjab', state: 'Punjab', district: 'Ludhiana', tehsil: 'Samrala Block',
  block: 'Samrala Block', districtBlock: 'Ludhiana / Samrala Block', pinCode: '141114',
  landSize: '4.5', landArea: '4.5', soilType: 'Alluvial Sandy Loam (pH 7.4)',
  irrigationSource: 'Solar Tubewell & Minor Canal Distributary', soilHealthCardNo: 'SHC-PB-LDH-2025-8812',
  primaryCrops: 'Wheat (PBW-826) & Mustard (Giriraj)', avatarInitials: 'RK'
};

const SELLER_DEMO = {
  id: 'seller-gurpreet-201', role: 'seller', roles: ['kisan', 'seller'], name: 'Sardar Gurpreet Singh', emailOrPhone: '9876543210', password: 'password123',
  businessName: 'GreenFields Organic Farm & Agro Supplies', farmName: 'GreenFields Organic Farm & Agro Supplies',
  category: 'Seeds, Fertilizers, Equipment', pickupAddress: 'GT Road Mandi Complex, Samrala Chowk, Ludhiana - 141114',
  licenseGstId: 'PB-AGRI-GST-03AABCG1234F1Z5', location: 'Ludhiana, Punjab', state: 'Punjab', district: 'Ludhiana',
  landArea: '25 Acres', certification: 'APEDA Certified Organic (Reg: NPOP/IN/2024/098)',
  farmBio: 'Specializing in chemical-free Sharbati wheat, basmati paddy, and certified organic seed varieties.', avatarInitials: 'GS'
};

const CONSULTANT_DEMO = {
  id: 'consultant-ramesh-302', role: 'consultant', roles: ['kisan', 'consultant'], name: 'Dr. Ramesh Verma', emailOrPhone: 'r.verma@pau.edu', password: 'password123',
  designation: 'Principal Soil Scientist & Micronutrient Extension Head', title: 'Principal Soil Scientist & Micronutrient Extension Head',
  institution: 'Punjab Agricultural University (PAU), Ludhiana', affiliatedUniversity: 'Punjab Agricultural University (PAU), Ludhiana',
  icarExtensionId: 'ICAR-PAU-PB-2008-4109', registrationNumber: 'ICAR-PAU-PB-2008-4109',
  agronomicSpecialties: 'Soil Health & Split Nitrogen Dosage, Precision Irrigation, Organic Bio-Pesticides, Yellow Rust Control',
  location: 'PAU Campus, Ferozepur Road, Ludhiana', state: 'Punjab', district: 'Ludhiana',
  qualifications: 'Ph.D. Soil Science & Agricultural Chemistry (IARI New Delhi)', experience: '18+ Years Field Extension',
  specializations: ['Soil Health & Split Nitrogen Dosage', 'Precision Irrigation & Water Management', 'Organic Bio-Pesticides & Neemastra', 'Fungal Disease Control (Yellow Rust)'],
  avatarInitials: 'RV'
};

const INITIAL_DEMO_USERS = [KISAN_DEMO, SELLER_DEMO, CONSULTANT_DEMO];

const usePersistentState = (key, initial) => {
  const [state, setState] = useState(() => {
    try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : initial; }
    catch { return initial; }
  });
  useEffect(() => {
    try { state ? localStorage.setItem(key, JSON.stringify(state)) : localStorage.removeItem(key); }
    catch {}
  }, [key, state]);
  return [state, setState];
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = usePersistentState('agri_auth_user', null);
  const [registeredUsers, setRegisteredUsers] = usePersistentState('agri_registered_users', INITIAL_DEMO_USERS);
  
  const [orders, setOrders] = usePersistentState('agri_orders_list', [
    { id: 'ORD-98214', productId: 'prod-1', productTitle: 'Certified Organic Sharbati Wheat (Grade A)', buyerName: 'Ramesh Kumar', buyerPhone: '9876501234', farmerName: 'Sardar Gurpreet Singh', quantity: 2, unit: 'Quintal', price: 2450, totalAmount: 4900, status: 'Dispatched to Mandi Hub', date: '20 Oct 2026' }
  ]);
  const [consultations, setConsultations] = usePersistentState('agri_consultation_tickets', [
    { id: 'KRISHI-ADV-81920', farmerName: 'Ramesh Kumar', phone: '9876501234', district: 'Ludhiana', state: 'Punjab', crop: 'Wheat', acres: '4.5', urgency: 'Medium Priority (24-48 hrs)', category: 'Soil Health & NPK Dosage', description: 'Noticing mild yellowing in leaf tips after second irrigation.', status: 'Advisory Dispatched', recommendation: 'Apply foliar spray of 1% urea + 0.5% zinc sulphate.', assignedConsultant: 'Dr. Ananya Sharma', acceptedBy: 'Dr. Ananya Sharma', date: '20 Oct 2026' }
  ]);
  const [cropHistory, setCropHistory] = usePersistentState('agri_crop_history', []);
  const [schemeApplications] = usePersistentState('agri_scheme_applications', []);
  const [callbackRequests, setCallbackRequests] = usePersistentState('agri_callback_requests', []);

  // Strict Login checking both email/phone and password
  const login = (_, { emailOrPhone, password }) => {
    if (!emailOrPhone || !password) {
      throw new Error('Please enter both your email/phone and password.');
    }
    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    const cleanContact = emailOrPhone.trim().toLowerCase();
    const cleanPassword = password.trim();

    const matchedUser = registeredUsers.find(
      u => u.emailOrPhone.toLowerCase() === cleanContact
    );

    if (!matchedUser) {
      throw new Error('Account does not exist with this email or phone number. Please check your credentials or register.');
    }

    if (matchedUser.password !== cleanPassword) {
      throw new Error('Incorrect password. Please verify your credentials and try again.');
    }

    setCurrentUser(matchedUser);
    return matchedUser;
  };

  // Registration is strictly for Kisan profiles initially
  const register = (_, details) => {
    const { name, emailOrPhone, password, districtBlock, primaryCrops, landSize } = details;
    if (!name || !emailOrPhone || !password) {
      throw new Error('Please fill in all mandatory fields including password.');
    }

    const cleanContact = emailOrPhone.trim().toLowerCase();
    if (registeredUsers.some(u => u.emailOrPhone.toLowerCase() === cleanContact)) {
      throw new Error('An account with this email or phone already exists. Please sign in.');
    }

    const newKisanUser = {
      id: `user-kisan-${Date.now()}`,
      role: 'kisan',
      roles: ['kisan'],
      name,
      emailOrPhone,
      password,
      districtBlock: districtBlock || 'Ludhiana Block',
      district: 'Ludhiana',
      state: 'Punjab',
      location: 'Ludhiana, Punjab',
      primaryCrops: primaryCrops || 'Wheat & Rice',
      landSize: landSize || '2.0',
      landArea: landSize || '2.0',
      avatarInitials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    };

    const updatedRegistry = [...registeredUsers, newKisanUser];
    setRegisteredUsers(updatedRegistry);
    setCurrentUser(newKisanUser);
    return newKisanUser;
  };

  // Add Seller or Consultant role to existing profile from Profile page
  const addRoleToUser = (newRole, roleDetails) => {
    if (!currentUser) throw new Error('You must be logged in to add a role.');
    const targetRole = newRole === 'basic' ? 'kisan' : newRole;
    
    const currentRoles = currentUser.roles || [currentUser.role];
    if (currentRoles.includes(targetRole)) {
      throw new Error(`You already have a ${targetRole} profile registered.`);
    }

    const updatedRoles = [...currentRoles, targetRole];
    const updatedUser = {
      ...currentUser,
      ...roleDetails,
      roles: updatedRoles,
      // If adding consultant, ensure required specialty fields sync properly
      agronomicSpecialties: Array.isArray(roleDetails.specializations) 
        ? roleDetails.specializations.join(', ') 
        : roleDetails.specializations || currentUser.agronomicSpecialties
    };

    setCurrentUser(updatedUser);
    setRegisteredUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    return updatedUser;
  };

  const updateUserProfile = (fields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...fields };
    setCurrentUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{
      currentUser, updateUserProfile, activeRole: currentUser?.role || 'kisan',
      login, register, addRoleToUser, logout,
      orders, recordOrder: (o) => setOrders(p => [{ id: 'ORD-' + Math.floor(10000 + Math.random() * 90000), date: 'Today', status: 'Placed', ...o }, ...p]),
      consultations, registeredConsultants: registeredUsers.filter(u => u.roles?.includes('consultant')),
      recordConsultation: (c) => setConsultations(p => [{ id: 'KRISHI-ADV-' + Math.floor(100000 + Math.random() * 900000), date: 'Just now', status: 'Pending Review', ...c }, ...p]),
      acceptConsultation: (id, name, consultantId) => setConsultations(p => p.map(t => t.id === id ? { ...t, status: 'Accepted', acceptedBy: name, assignedConsultant: name, assignedConsultantId: consultantId } : t)),
      declineConsultation: (id) => setConsultations(p => p.map(t => t.id === id ? { ...t, status: 'Declined', acceptedBy: null } : t)),
      respondToConsultation: (id, rec, cId, cName) => setConsultations(p => p.map(t => t.id === id ? { ...t, recommendation: rec, status: 'Advisory Dispatched', assignedConsultantId: cId, assignedConsultant: cName } : t)),
      updateOrderStatus: (id, status) => setOrders(p => p.map(o => o.id === id ? { ...o, status } : o)),
      cropHistory, addCropHistory: (c) => setCropHistory(p => [{ id: 'CYCLE-' + Date.now(), ...c }, ...p]),
      schemeApplications, callbackRequests, requestCallback: (c) => setCallbackRequests(p => [{ id: 'IVR-' + Math.floor(10000 + Math.random() * 90000), timestamp: 'Just now', ...c }, ...p])
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};