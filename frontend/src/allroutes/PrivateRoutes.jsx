import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

const PrivateRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return isLoggedIn ? children : <Login />;
};

export default PrivateRoutes;
