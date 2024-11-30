import './App.css';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import ErrorPage  from './pages/ErrorPage';
import Login  from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileVerification from './pages/MobileVerification';
import AccountCreated from './pages/AccountCreated';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/mobile-verification" element={<MobileVerification />} />
          <Route path="/account-created" element={<AccountCreated />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
