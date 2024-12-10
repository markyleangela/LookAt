import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  CheckCircle, 
  List, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react'; // Import the LogOut icon
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AdminNavbar = ({ barangayData }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const NavItem = ({ icon: Icon, text, to, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick} // Trigger onClick if provided
      className={({ isActive }) => `
        flex items-center 
        p-3 
        cursor-pointer 
        hover:bg-gray-100 
        ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}
        transition-colors duration-200
      `}
    >
      <Icon className="mr-3" size={20} />
      {!isCollapsed && <span className="text-sm font-medium">{text}</span>}
    </NavLink>
  );

  // Logout handler function
  const handleLogout = () => {
    // Clear any stored authentication data, like tokens or user info
    localStorage.removeItem('token'); // Assuming token is stored in localStorage
    // Redirect to login page
    navigate('/barangay/login');
  };

  return (
    <div className={`
      bg-white 
      border-r 
      h-screen 
      flex 
      flex-col 
      ${isCollapsed ? 'w-20' : 'w-64'}
      transition-all 
      duration-300 
      relative
    `}>
      {/* Collapse/Expand Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-4 z-10 bg-gray-100 p-1 rounded-full hover:bg-gray-200"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Logo or Title */}
      <div className="p-4 border-b flex items-center justify-center">
        {!isCollapsed ? (
          <h2 className="text-xl font-bold text-gray-800">Barangay {barangayData.barangayLoc}</h2>
        ) : (
          <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 pt-4">
        <NavItem icon={Home} text="Home" to={`/barangay/${barangayData.barangayId}/home`} />
        <NavItem icon={FileText} text="Documents" to={`/barangay/${barangayData.barangayId}/documents`} />
        <NavItem icon={CheckCircle} text="Verification" to={`/barangay/${barangayData.barangayId}/verification`} />
        <NavItem icon={List} text="Requests" to={`/barangay/${barangayData.barangayId}/requests`} />
        {/* Add the Logout button */}
        <NavItem 
          icon={LogOut} 
          text="Logout" 
          to="/" 
          onClick={handleLogout} // Call the logout handler when clicked
        />
      </nav>

      {/* Footer or Additional Info */}
      {!isCollapsed && (
        <div className="p-4 border-t text-center text-xs text-gray-500">
          @ Lookat Copyright.Inc
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
