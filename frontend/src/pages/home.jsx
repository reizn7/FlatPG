import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useListings } from '../context/ListingsContext';

function Home() {
  const { user } = useUser();
  const { listings } = useListings();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const goAdd = () => {
    const sellerToken = localStorage.getItem('sellerToken');
    if (sellerToken) {
      navigate('/add');
    } else {
      navigate('/seller-login');
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      alert('Enter a location or keyword to search.');
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>

        <div className="hero-inner">
          <h1 className="headline">
            Find your next <span>Flat</span> or <span>PG</span>
          </h1>
          <p className="tagline">
            India’s most student-friendly marketplace to discover, list and book accommodation in seconds.
          </p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search by city, area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="cta-group">
            <button className="btn-primary" onClick={() => navigate('/explore')}>
              Explore Listings
            </button>

            <button className="btn-ghost" onClick={goAdd}>
              List Your Property
            </button>
          </div>

          <ul className="stats">
            <li><strong>{listings.length}</strong> Verified Rooms</li>
            <li><strong>50+</strong> Owners Onboard</li>
            <li><strong>24×7</strong> Support</li>
          </ul>
        </div>

        <svg className="wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,180 1080,0 1440,90 L1440,120 L0,120 Z"></path>
        </svg>
      </section>

      <section className="why-us">
        <h2>Why Flat&PG Hub?</h2>
        <div className="features-grid">
          <div className="feature-box">
            🧠
            <h3>Built for Students</h3>
            <p>Find affordable PGs and flats near top colleges & coaching hubs.</p>
          </div>
          <div className="feature-box">
            ⚡
            <h3>Quick Listing</h3>
            <p>Post your property in seconds and reach thousands of renters.</p>
          </div>
          <div className="feature-box">
            🛡️
            <h3>Secure & Verified</h3>
            <p>All listings go through basic verification and user feedback.</p>
          </div>
        </div>
      </section>

    
      <section className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"Found a clean PG within 2km of my campus in just 10 minutes. Best site for students."</p>
            <h4>– Priya (BHU Student)</h4>
          </div>
          <div className="testimonial">
            <p>"I listed my Noida flat and got 3 leads the same day. Love the process."</p>
            <h4>– Mr. Sharma (Owner)</h4>
          </div>
        </div>
      </section>

    
      <footer className="home-footer">
        <p>
          <strong>{listings.length}</strong> total properties currently listed on Flat&PG Hub.
        </p>
      </footer>
    </div>
  );
}

export default Home;
