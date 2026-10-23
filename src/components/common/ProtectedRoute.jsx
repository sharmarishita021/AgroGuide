import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role, redirectTo = '/profile' }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
