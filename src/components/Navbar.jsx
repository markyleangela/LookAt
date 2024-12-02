import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Navbar = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Profile', path: '/profile' },
    { name: 'Help', path: '/help' },
    { name: 'Notifications', path: '/notifications' },
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
          <Link to="/home" aria-label="Home" className="flex-1">
            <img src={Logo} alt="Website Logo" className="h-10 md:h-12 lg:h-16 w-auto p-1" />
          </Link>

          <div className="hidden md:flex lg:flex justify-end">
            <ul className="flex text-gray-800 font-bold text-lg lg:text-xl space-x-4 md:space-x-10 lg:space-x-16">
              {renderLinks()}
            </ul>
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
            </ul>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
