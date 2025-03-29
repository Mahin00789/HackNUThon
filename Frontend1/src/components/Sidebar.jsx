import React from 'react';
import { Link, useLocation } from 'react-router';
import { FaHome, FaCalendarCheck, FaUser, FaBell, FaCloudSunRain, FaSignInAlt } from 'react-icons/fa';
import '../css/sidebar.css';

const Sidebar = ({ expanded, setExpanded }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: '/', title: 'Home', icon: <FaHome /> },
    { id: '/booking', title: 'Booking', icon: <FaCalendarCheck /> },
    { id: '/dashboard', title: 'User Dashboard', icon: <FaUser /> },
    { id: '/notifications', title: 'Notifications', icon: <FaBell /> },
    { id: '/weather', title: 'Weather', icon: <FaCloudSunRain /> },
    { id: '/login', title: 'Login', icon: <FaSignInAlt /> },
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
          <li 
            key={item.id} 
            className={location.pathname === item.id ? 'active' : ''}
          >
            <Link to={item.id}>
              <div className="icon">{item.icon}</div>
              <span className="title">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;