import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // same theme file as Login, slight variation

const Register = () => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      const res = await api.post('/auth/register', formData);
      alert(res.data.message);

      const token = res.data.token;
      const user = res.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if(user.role === "seller"){
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/dashboard')
      }
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center">
      <div className="register-card p-4 shadow-lg rounded-4">
        <h3 className="text-white text-center mb-3">Create an Account</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              className="form-control bg-light"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="form-control bg-light"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              className="form-control bg-light"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Role</label>
            <select
              name="role"
              value={form.role}
              className="form-select bg-light"
              onChange={handleChange}
              required
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Profile Image</label>
            <input
              type="file"
              name="image"
              className="form-control bg-light"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>

          <button type="submit" className="btn btn-light me-3 px-4 w-100 fw-bold">
            Register
          </button>
        </form>
        <p className="text-white-50 mt-3 text-center">
          Already have an account? <a href="/login" className="text-light text-decoration-underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
