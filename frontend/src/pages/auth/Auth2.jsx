import React, { useState } from 'react';
import './Auth.css';            
import { useNavigate } from 'react-router-dom';

function Auth2({ mode = 'login' }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`http://flatpg-production.up.railway.app/seller/${isLogin ? 'login' : 'register'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || 'Error');

    if (isLogin) {
  localStorage.setItem('sellerToken', data.token);
  localStorage.setItem('seller', JSON.stringify(data.seller)); // assuming backend sends seller info
  navigate('/add');
}
 else {
      alert('Seller registered successfully!');
      navigate('/seller-login');
    }
  } catch (err) {
    alert('Server error');
  }
};


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Seller Login 🏠' : 'Seller Registration ✍️'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isLogin ? 'Login as Seller' : 'Register as Seller'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have a seller account?" : 'Already a seller?'}&nbsp;
          <span
            onClick={() =>
              navigate(isLogin ? '/seller-register' : '/seller-login')
            }
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth2;
