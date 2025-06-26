import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function AuthPage({ mode = 'login' }) {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      alert(`${isLogin ? 'Logged in' : 'Registered'} successfully!`);
      navigate('/');
    } catch (err) {
      setError('Server error');
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back 👋' : 'Create Your Account 📝'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name</label>
              <input type="text" name="name" onChange={handleChange} required />
            </>
          )}

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />

          <button type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have one?'}&nbsp;
          <span onClick={() => navigate(isLogin ? '/register' : '/login')}>
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
