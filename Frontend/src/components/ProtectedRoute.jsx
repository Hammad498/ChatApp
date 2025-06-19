import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const storedUser = JSON.parse(localStorage.getItem('chat-app-user'));
  const isAuthenticated = user || storedUser;

  if (!isAuthenticated) return <Navigate to="/login" />;

  const currentUser = user || storedUser;

  if (!currentUser.isAvatarImageSet && window.location.pathname !== "/set-avatar") {
  return <Navigate to="/set-avatar" />;
}


  return children;
};

export default ProtectedRoute;
