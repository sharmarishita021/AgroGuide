import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import SellerLoginModal from './components/marketplace/SellerLoginModal';
import ExpertConsultationModal from './components/common/ExpertConsultationModal';
import FormValidationTopicModal from './components/common/FormValidationTopicModal';

import Home from './pages/Home';
import FarmHealth from './pages/FarmHealth';
import Schemes from './pages/Schemes';
import GoGreen from './pages/GoGreen';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Consultation from './pages/Consultation';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  const [isGlobalSellerAuthOpen, setIsGlobalSellerAuthOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isValidationTopicModalOpen, setIsValidationTopicModalOpen] = useState(false);

  return (
    <ToastProvider>
      <AuthProvider>
        <MarketplaceProvider>
          <BrowserRouter>
            <div className="app-layout">
              {/* Global Navigation Bar */}
              <Navbar
                onOpenSellerAuth={() => setIsGlobalSellerAuthOpen(true)}
                onOpenConsultation={() => setIsConsultationModalOpen(true)}
              />

              {/* Main Routing View */}
              <div className="main-content-area">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        onOpenConsultation={() => setIsConsultationModalOpen(true)}
                      />
                    }
                  />
                  <Route
                    path="/farm-health"
                    element={
                      <FarmHealth
                        onOpenConsultation={() => setIsConsultationModalOpen(true)}
                      />
                    }
                  />
                  {/* Backward-compatible alias for go-green */}
                  <Route
                    path="/go-green"
                    element={
                      <GoGreen
                        onOpenConsultation={() => setIsConsultationModalOpen(true)}
                      />
                    }
                  />
                  <Route path="/schemes" element={<Schemes />} />
                  <Route path="/marketplace" element={<Marketplace onOpenSellerAuth={() => setIsGlobalSellerAuthOpen(true)} />} />
                  <Route path="/consultation" element={<Consultation />} />
                  <Route
                    path="/consultation/consultant"
                    element={
                      <ProtectedRoute
                        role="consultant"
                        redirectTo="/profile?role=consultant&redirect=%2Fconsultation%2Fconsultant"
                      >
                        <Consultation consultantView />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/about"
                    element={
                      <About
                        onOpenConsultation={() => setIsConsultationModalOpen(true)}
                        onOpenValidationTopic={() => setIsValidationTopicModalOpen(true)}
                      />
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              {/* Global Footer */}
              <Footer
                onOpenConsultation={() => setIsConsultationModalOpen(true)}
                onOpenValidationTopic={() => setIsValidationTopicModalOpen(true)}
              />

              {/* Global Modals */}
              <SellerLoginModal
                isOpen={isGlobalSellerAuthOpen}
                onClose={() => setIsGlobalSellerAuthOpen(false)}
              />

              <ExpertConsultationModal
                isOpen={isConsultationModalOpen}
                onClose={() => setIsConsultationModalOpen(false)}
              />

              <FormValidationTopicModal
                isOpen={isValidationTopicModalOpen}
                onClose={() => setIsValidationTopicModalOpen(false)}
              />
            </div>
          </BrowserRouter>
        </MarketplaceProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
