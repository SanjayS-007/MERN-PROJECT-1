import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ username = 'Sanjay' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">💰 FinPlanner</span>
        <div className="nav-links">
          <Link to="/">🏠 Home</Link>
          <Link to="/transactions">📊 Transactions</Link>
          <Link to="/add-category">➕ Add Category</Link>
          <Link to="/planner">🗓️ Planner</Link>
        </div>
      </div>

      <div className="nav-right" ref={dropdownRef}>
        <div className="user-info" onClick={toggleDropdown}>
          <div className="user-avatar">SA</div>
          <span>{username}</span>
        </div>

        {dropdownOpen && (
          <div className="user-dropdown">
            <Link to="/profile">👤 Profile</Link>
            <Link to="/settings">⚙️ Settings</Link>
            <button onClick={() => alert('Logged out!')}>🚪 Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
