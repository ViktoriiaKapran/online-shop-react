import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const location = useLocation();
  const token = useSelector(state => state.auth.token);
  if (!token) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />
  }

  return children;
}

export default RequireAuth;