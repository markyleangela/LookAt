import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { useUser } from '../context/UserContext';

const Navbar = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  // If user is not logged in, fallback to empty string or "guest" or handle accordingly
  const userNumber = user?.userId || ''; 

  const navLinks = [
    { name: 'Profile', path: `/${userNumber}/profile` },
    { name: 'Help', path: `/${userNumber}/help` },
    { name: 'Notifications', path: `/${userNumber}/notifications` },
    { name: 'Request', path: `/${userNumber}/request` },
  ];

  const renderLinks = (className = '') =>
    navLinks.map((link) => (
      <li 
        key={link.name} 
        className={`hover:text-blue-600 ${className} text-end text-accent1`}
      >
        <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
          {link.name}
        </Link>
      </li>
    ));

  // Logout function
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="relative flex items-center bg-white px-6 md:px-12 lg:px-24 py-4 border-b border-accent2">
      {/* Conditional Rendering */}
      {title ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.history.back()}
            aria-label="Go Back"
            className="text-accent1 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 lg:h-6 lg:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="py-2 md:py-3 lg:py-4 text-lg lg:text-2xl font-bold text-accent1">
            {title}
          </span>
        </div>
      ) : (
        <>
          <Link to={`/${user.userId}/home`} aria-label="Home" className="flex-1">
            <img src={Logo} alt="Website Logo" className="h-10 md:h-12 lg:h-16 w-auto p-1" />
          </Link>

          <div className="hidden md:flex lg:flex items-center justify-end space-x-4">
            <ul className="flex text-gray-800 font-bold text-lg lg:text-xl space-x-4 md:space-x-10 lg:space-x-16">
              {renderLinks()}
            </ul>
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden lg:hidden flex justify-end">
            {user ? (
              <button
                className="text-gray-800 font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-800 font-bold">
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden lg:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col p-4 space-y-4 text-gray-800 font-bold text-lg md:hidden">
              {renderLinks('border-b pb-2 last:border-b-0')}
              {user && (
                <li className="border-b pb-2">
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;