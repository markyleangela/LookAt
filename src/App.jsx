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
import MobileVerification from './pages/MobileVerification';
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

// Import BarangayProvider
import { BarangayProvider } from './contexts/BarangayContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route index element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/mobile-verification" element={<MobileVerification />} />
        <Route path="/account-created" element={<AccountCreated />} />
        <Route path="*" element={<ErrorPage />} />

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
              </Routes>
            </BarangayProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;