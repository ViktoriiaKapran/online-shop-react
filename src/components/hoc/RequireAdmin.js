import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAdmin({ children }) {
  const location = useLocation();
  const isAdmin = useSelector(state => state.auth.payload.sub.acl.includes('admin'));
  if (!isAdmin) {
    return <Navigate to={'/'} state={{ from: location.pathname }} />
  }
  return children;
}

export default RequireAdmin;

