import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/login.css'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().min(6,"must be at least 6 characters").required("password is required")
}) 

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
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
    } 
  }

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card p-4 shadow-lg rounded-4">
        <h3 className="mb-4 text-white text-center">Welcome Back </h3>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control bg-light"
              {...register('email')}
            />
            <p className='text-danger'>{errors.email?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control bg-light"
              {...register('password')}
            />
            <p className='text-danger'>{errors.password?.message}</p>
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
