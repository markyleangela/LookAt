import React, { createContext, useState } from 'react';
import barangayService from '../api/barangayService';

export const BarangayContext = createContext({
  barangayData: null,
  token: null,
  loginBarangay: () => {},
  logoutBarangay: () => {},
  fetchBarangay: () => {}, // Add fetchBarangay to the context
  error: null,
});

export const BarangayProvider = ({ children }) => {
  const [barangayData, setBarangayData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [error, setError] = useState(null);

  // Login function
  const loginBarangay = async (loginData) => {
    setError(null);
    try {
      const response = await barangayService.login(loginData);
      console.log('LoginBarangay - Full Response:', response);

      const newToken = response.token;
      const barangayId = response.barangayId;

      setToken(newToken);
      localStorage.setItem('token', newToken);
      localStorage.setItem('barangayId', barangayId);

      const barangayResponse = await barangayService.getBarangayById(barangayId);
      setBarangayData(barangayResponse.data);

      return { token: newToken, barangayId: barangayId };
    } catch (error) {
      console.error('LoginBarangay - Detailed Error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logoutBarangay = () => {
    setBarangayData(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('barangayId');
  };

  // Fetch Barangay data based on barangayId
  const fetchBarangay = async (barangayId) => {
    setError(null);
    try {
      const response = await barangayService.getBarangayById(barangayId);
      setBarangayData(response.data);
    } catch (error) {
      console.error('FetchBarangay - Error:', error);
      setError(error.message);
      throw error;
    }
  };

  return (
    <BarangayContext.Provider
      value={{
        barangayData,
        token,
        loginBarangay,
        logoutBarangay,
        fetchBarangay, // Provide fetchBarangay in the context
        error, // Provide the error state to the context
      }}
    >
      {children}
    </BarangayContext.Provider>
  );
};
