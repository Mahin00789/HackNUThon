import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // Fixed import
import {
  FaHome,
  FaCalendarCheck,
  FaUser,
  FaBell,
  FaCloudSunRain,
  FaSignInAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import '../css/sidebar.css';

const Sidebar = ({ expanded, setExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  // Check if user is logged in when component mounts and when location changes
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
     
      // Make the logout request
      const response = await fetch('http://localhost:7000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
     
      // Clear local storage regardless of server response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
     
      // Update state
      setIsLoggedIn(false);
     
      // Navigate to home page
      navigate('/');
     
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if API call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const menuItems = [
    { id: '/', title: 'Home', icon: <FaHome className="icon" /> },
    { id: '/booking', title: 'Booking', icon: <FaCalendarCheck className="icon" /> },
    { id: '/dashboard', title: 'User Dashboard', icon: <FaUser className="icon" /> },
    { id: '/notifications', title: 'Notifications', icon: <FaBell className="icon" /> },
    { id: '/weather', title: 'Weather', icon: <FaCloudSunRain className="icon" /> },
  ];

  return (
    <div 
      className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="logo-container">
        {expanded ? (
          <h2>FarmSense</h2>
        ) : (
          <h2>FS</h2>
        )}
      </div>
     
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id} className={location.pathname === item.id ? 'active' : ''}>
            <Link to={item.id}>
              {item.icon}
              {expanded && <span className="title">{item.title}</span>}
            </Link>
          </li>
        ))}
       
        {/* Login/Logout Item */}
        <li>
          {isLoggedIn ? (
            <button className="auth-button" onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              {expanded && <span className="title">Logout</span>}
            </button>
          ) : (
            <Link to="/login" className="auth-button">
              <FaSignInAlt className="icon" />
              {expanded && <span className="title">Login</span>}
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;