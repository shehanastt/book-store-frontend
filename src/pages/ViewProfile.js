import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/view-profile.css'; 
import { Link, useNavigate } from 'react-router-dom';

const ViewProfile = () => {
  const [user, setUser] = useState({});
  // const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || !userData._id) return;

    api.get('/user/viewprofile')
      .then(res => setUser(res.data.data))
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="profile-page d-flex justify-content-center align-items-center">
      <div className="glass-card p-4 rounded shadow-lg text-white text-center">
        <h2 className="mb-4">User Profile</h2>
        <div>
          <img
              src={user.image ? `${process.env.REACT_APP_BACKEND_URL}/${user.image}`: '/default-profile-pic.png'}
              alt={user.title}
              className="img-fluid rounded-4"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <div>
        <Link to={'/user/profile/edit'} className="btn btn-outline-secondary btn-sm me-2">
        Edit Profile
        </Link>
        </div>
        <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
