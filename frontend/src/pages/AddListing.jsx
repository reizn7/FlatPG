import React, { useState } from 'react';
import './AddListing.css';
import { useNavigate } from 'react-router-dom';

function AddListing() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    images: '', 
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, location, price, images } = formData;

    if (!title || !description || !location || !price || !images) {
      alert('Please fill all fields!');
      return;
    }

    const imageArray = images.split(',').map((img) => img.trim());

    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch('http://localhost:5000/listings/addlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          price,
          images: imageArray,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Listing added successfully!');
        navigate('/explore');
      } else {
        alert(data.message || 'Failed to add listing');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="add-page">
      <h2>Add Your Listing</h2>
      <div className="add-container">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="2BHK Flat in Noida"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Spacious flat with two bedrooms, attached bathrooms, and balcony."
            rows={4}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Sector 62, Noida"
          />

          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="₹15,000/mo"
          />

          <label>Image URLs (comma separated)</label>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://image1.jpg, https://image2.jpg"
            rows={2}
          />

          <button type="submit">Post Listing</button>
        </form>

        {/* Preview Card */}
        {formData.title && formData.images && (
          <div className="preview-card">
            <div className="image-carousel">
              {formData.images.split(',').map((url, idx) => (
                <img key={idx} src={url.trim()} alt={`preview-${idx}`} />
              ))}
            </div>
            <div className="info">
              <h3>{formData.title}</h3>
              <p>{formData.location}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{formData.description}</p>
              <div className="listing-bottom">
                <span className="price">{formData.price}</span>
                <button className="details-btn">View Details</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddListing;
