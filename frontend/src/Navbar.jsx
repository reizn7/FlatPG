import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const userToken = localStorage.getItem('userToken');
  const sellerToken = localStorage.getItem('sellerToken');

  const handleListProperty = () => {
    if (sellerToken) {
      navigate('/add');
    } else {
      navigate('/seller-login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('sellerToken');
    localStorage.removeItem('seller');
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <nav className="nav-glass">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">🏠 <span>Flat&PG</span> Hub</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>

          <li>
            <button className="nav-cta" onClick={handleListProperty}>
              List Property
            </button>
          </li>

          {(userToken || sellerToken) && (
            <li>
              <button className="nav-cta logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
