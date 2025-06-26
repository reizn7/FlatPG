import React, { useEffect, useState } from 'react';
import './Explore.css';
import { Link, useLocation } from 'react-router-dom';

function Explore() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceRange: '',
  });

  const location = useLocation();


  const searchQuery = new URLSearchParams(location.search).get('search')?.toLowerCase();


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('http://flatpg-production.up.railway.app/listings/all');
        const data = await res.json();
        setListings(data);

       
        if (searchQuery) {
          setFilters((prev) => ({
            ...prev,
            location: searchQuery
          }));
        }
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };

    fetchListings();
  }, [searchQuery]);


  const filteredListings = listings.filter((l) => {
    const priceValue =
      typeof l.price === 'string'
        ? parseInt(l.price.replace(/[^\d]/g, ''))
        : l.price;

    return (
      (!filters.location || l.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.type || l.title.toLowerCase().includes(filters.type.toLowerCase())) &&
      (!filters.priceRange || priceValue <= parseInt(filters.priceRange))
    );
  });

  return (
    <div className="explore-wrapper">
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search by location"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        />

        <select onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}>
          <option value="">All Types</option>
          <option value="Flat">Flat</option>
          <option value="PG">PG</option>
        </select>

        <select onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}>
          <option value="">Any Price</option>
          <option value="10000">Under ₹10,000</option>
          <option value="20000">Under ₹20,000</option>
          <option value="30000">Under ₹30,000</option>
        </select>
      </div>

      <div className="explore-page">
        <h2>Explore Flats & PGs</h2>
        <div className="listing-grid">
          {filteredListings.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No listings match your filters.</p>
          ) : (
            filteredListings.map((listing) => (
              <div className="listing-card" key={listing._id}>
                <img src={listing.image} alt={listing.title} />
                <div className="listing-info">
                  <h3>{listing.title}</h3>
                  <p>{listing.location}</p>
                  <div className="listing-bottom">
                    <span className="price">{listing.price}</span>
                    <Link to={`/listing/${listing._id}`} className="details-btn">View Details</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="site-footer">
        <p>&copy; 2025 | Built by Sarthak</p>
        <p>Contact: tempmail@gmail.com</p>
      </footer>
    </div>
  );
}

export default Explore;
