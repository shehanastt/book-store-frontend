import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/register.css'; 

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().required("Role is required"),
  image: yup
    .mixed()
    .test("fileSize", "File too large", (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value || value.length === 0) return true;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
    }
  )
});

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('role', data.role);
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

      const res = await api.post('/auth/register', formData);
      alert(res.data.message);

      const { token, data: user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center">
      <div className="register-card p-4 shadow-lg rounded-4">
        <h3 className="text-white text-center mb-3">Create an Account</h3>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input type="text" className="form-control bg-light" {...register('name')} />
            <p className="text-danger">{errors.name?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input type="email" className="form-control bg-light" {...register('email')} />
            <p className="text-danger">{errors.email?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input type="password" className="form-control bg-light" {...register('password')} />
            <p className="text-danger">{errors.password?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Role</label>
            <select className="form-select bg-light" {...register('role')}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            <p className="text-danger">{errors.role?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Profile Image</label>
            <input type="file" className="form-control bg-light" accept="image/*" {...register('image')} />
            <p className="text-danger">{errors.image?.message}</p>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-light me-3 px-4 w-100 fw-bold">
            {isSubmitting ? "Registering..." : "Register"}
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
