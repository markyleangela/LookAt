import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages and components
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import  ForgotPasswordOTP from './pages/OTPForgotPassword';
import  ChangePassword from './pages/ChangePassword';
import AccountCreated from './pages/AccountCreated';
import Help from './pages/Help';
import Notifications from './pages/Notifications';
import BarangayLogin from './pages/barangayPage/BarangayLogin';
import BarangayHome from './pages/barangayPage/BarangayHome';
import { BarangayRegister } from './pages/barangayPage/BarangayRegister';
import BarangayVerification from './pages/barangayPage/BarangayVerification';
import BarangayRequests from './pages/barangayPage/BarangayRequests';
import BarangayDocuments from './pages/barangayPage/BarangayDocuments';
import ProtectedRoute from './components/ProtectedRoute';
import Request from './pages/requestPage/RequestPage';
import { RequestProvider } from './pages/requestPage/RequestContext';
import RequestPage_04 from './pages/requestPage/RequestPage_04';
import RequestPage_05 from './pages/requestPage/RequestPage_05';
import AcceptedRequests from './components/request/AcceptedRequest';

import FirstVerification from './pages/Verification/Verification';
 

// Import BarangayProvider
import { BarangayProvider } from './contexts/BarangayContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route index element={<LandingPage />} />

        <Route path="/verification" element={<FirstVerification />} />

        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/account-created" element={<AccountCreated />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOTP />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Request-related routes wrapped in RequestProvider */}
        <Route
          path="/request/*"
          element={
            <RequestProvider>
              <Routes>
                <Route path="" element={<Request />} />
                <Route path="04" element={<RequestPage_04 />} />
                <Route path="05" element={<RequestPage_05 />} />
              </Routes>
            </RequestProvider>
          }
        />

        {/* Barangay-specific routes */}
        <Route path="/barangay/register" element={<BarangayRegister />} />

        {/* Wrap Barangay-related routes with BarangayProvider */}
        <Route
          path="/barangay/*"
          element={
            <BarangayProvider>
              <Routes>
                {/* Public Barangay routes */}
                <Route path="/login" element={<BarangayLogin />} />

                
                {/* Protected Barangay routes */}
                <Route
                  path="/:id/home"
                  element={
                    <ProtectedRoute>
                      <BarangayHome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:id/documents"
                  element={
                    <ProtectedRoute>
                      <BarangayDocuments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:id/requests"
                  element={
                    <ProtectedRoute>
                      <BarangayRequests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/:id/verification"
                  element={
                    <ProtectedRoute>
                      <BarangayVerification />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/:id/requests/all"
                  element={
                    <ProtectedRoute>
                      <AcceptedRequests/>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BarangayProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;