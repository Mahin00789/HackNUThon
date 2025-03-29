import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

// Import components
import Sidebar from './components/Sidebar';

// Import pages
import Home from './pages/Home';
// import Booking from './pages/Booking';
// import Dashboard from './pages/Dashboard';
// import Notifications from './pages/Notifications';
// import Weather from './pages/Weather';
// import Login from './pages/Login';

// Import CSS
import "./CSS/style.css"

const App = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
        <main className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/login" element={<Login />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Initialize the application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);