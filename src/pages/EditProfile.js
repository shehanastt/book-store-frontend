import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import '../styles/edit-profile.css';

const EditProfile = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "", image: "" });
    const [newImage, setNewImage] = useState(null);
    // const token = localStorage.getItem('token')
    // const userData = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    useEffect(()=>{
        api.get('/user/viewprofile')
        .then(res=> {
            const { name, email, image } = res.data.data;
            setUser({ name, email, password: "", image });
          })
        .catch(err => {
            console.error(err)
            alert("Failed to load profile");
        })
    },[]);

    const handleChange = (e) => {
        const { name, value, files} = e.target;
        if (name === 'image') {
            setNewImage(files[0]);
        } else {
            setUser(prev => ({...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        if (user.password.trim()) {
          formData.append('password', user.password);
        }
        if (newImage) {
          formData.append('image', newImage);
        }

        api.patch('/user/edit/editprofile',formData)
        .then(() => {
            alert('Profile Updated Successfully');
            navigate('/user/profile');
        })
        .catch(err => {
            console.error(err,"errrr");
            alert(err.response.data.message)
        });
    };
  return (
    <div className="edit-profile-page d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="glass-form p-4 rounded shadow-lg" encType="multipart/form-data">
        <h2 className="text-center text-white mb-4">Edit Profile</h2>

        <div className="mb-4 text-center">
          <p className="text-white"></p>
          {user.image && (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
              alt="Current Profile"
              className="rounded-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Password</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label text-white">New Image (optional)</label>
          <input type="file" name="image" onChange={handleChange} className="form-control" accept="image/*" />
        </div>

        <button type="submit" className="btn btn-light w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile