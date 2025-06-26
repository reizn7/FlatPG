import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ListingDetails.css';

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
  const userToken = localStorage.getItem("token");
if (!userToken) {
  alert("Please log in to view listing details");
  navigate("/login");
}
 else {
    setAuthChecked(true);
  }
}, [navigate]);


  useEffect(() => {
    if (!authChecked) return;

    const fetchListing = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/listings/${id}`);
        if (!res.ok) throw new Error('Listing not found');
        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err.message);
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, authChecked]);

  if (!authChecked) return null; // prevent premature rendering

  if (loading) {
    return (
      <div className="details-page">
        <h2>Loading listing...</h2>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="details-page">
        <h2>Listing Not Found</h2>
        <button onClick={() => navigate('/explore')}>Back to Explore</button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">
        <img src={listing.image} alt={listing.title} />
        <div className="details-info">
          <h2>{listing.title}</h2>
          <p className="location">{listing.location}</p>
          <p className="price">{listing.price}</p>
          <p className="desc">{listing.description}</p>
              <button
      className="contact-btn"
      onClick={() => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
          navigate('/login');
        } else {
          alert('Check the Contacts section to reach out to the owner.');
        }
      }}
    >
      Contact Owner
    </button>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
