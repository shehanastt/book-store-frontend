import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/login.css'; 

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token;
      const user = res.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsSubmitting(false);//to prevent double login
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card p-4 shadow-lg rounded-4">
        <h3 className="mb-4 text-white text-center">Welcome Back </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="form-control bg-light"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control bg-light"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-light w-100 mt-2 fw-bold" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-white-50 mt-3 text-center">Don't have an account? <a href="/register" className="text-light text-decoration-underline">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
