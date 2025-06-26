import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('sellerToken');

  if (!token) {
    alert('You must be a seller to add listings!');
    return <Navigate to="/seller-login" />;
  }

  return children;
}

export default ProtectedRoute;
