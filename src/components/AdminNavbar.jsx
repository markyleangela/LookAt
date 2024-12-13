import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FileText, 
  CheckCircle, 
  List, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ barangayData }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
        setIsMobileMenuOpen(false); // Ensure the mobile menu closes on resizing
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavItem = ({ icon: Icon, text, to, onClick, className = '' }) => (
    <NavLink
      to={to}
      onClick={(e) => {
        onClick && onClick(e);
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
      }}
      className={({ isActive }) => `
        flex items-center 
        p-3 
        cursor-pointer 
        hover:bg-gray-100 
        ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}
        transition-colors duration-200
        ${className}
      `}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
        <Icon className={`${!isCollapsed ? 'mr-3' : ''}`} size={20} />
        {!isCollapsed && <span className="text-sm font-medium">{text}</span>}
      </div>
    </NavLink>
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/barangay/login');
  };

  return (
    <>
      {/* Mobile Hamburger Menu for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2 rounded-lg shadow-md focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="bg-white w-64 h-full shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Barangay {barangayData.barangayLoc}
              </h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col">
              <NavItem 
                icon={Home} 
                text="Home" 
                to={`/barangay/${barangayData.barangayId}/home`} 
              />
              <NavItem 
                icon={FileText} 
                text="Documents" 
                to={`/barangay/${barangayData.barangayId}/documents`} 
              />
              <NavItem 
                icon={CheckCircle} 
                text="Verification" 
                to={`/barangay/${barangayData.barangayId}/verification`} 
              />
              <NavItem 
                icon={List} 
                text="Requests" 
                to={`/barangay/${barangayData.barangayId}/requests`} 
              />
              <NavItem 
                icon={LogOut} 
                text="Logout" 
                to="/" 
                onClick={handleLogout} 
              />
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`
        hidden 
        md:flex 
        bg-white 
        border-r 
        h-screen 
        flex-col 
        ${isCollapsed ? 'w-20' : 'w-64'}
        transition-all 
        duration-300 
        relative
        overflow-y-auto
      `}>
        {/* Collapse/Expand Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 right-5 z-10 bg-gray-100 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>

        {/* Logo or Title */}
        <div className="p-4 border-b flex items-center justify-start">
          {!isCollapsed ? (
            <h2 className="text-xl font-bold text-gray-800">
              Barangay {barangayData.barangayLoc}
            </h2>
          ) : (
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 pt-4 p-2">
          <NavItem 
            icon={Home} 
            text="Home" 
            to={`/barangay/${barangayData.barangayId}/home`} 
          />
          <NavItem 
            icon={FileText} 
            text="Documents" 
            to={`/barangay/${barangayData.barangayId}/documents`}
          />
          <NavItem 
            icon={CheckCircle} 
            text="Verification" 
            to={`/barangay/${barangayData.barangayId}/verification`}
          />
          <NavItem 
            icon={List} 
            text="Requests" 
            to={`/barangay/${barangayData.barangayId}/requests`}
          />
          <NavItem 
            icon={LogOut} 
            text="Logout" 
            to="/" 
            onClick={handleLogout}
          />
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t text-center text-xs text-gray-500">
            @ Lookat Copyright. Inc
          </div>
        )}
      </div>
    </>
  );
};

export default AdminNavbar;
