import React, { useEffect, useState} from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import '../styles/edit-profile.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required("Name shouldn't be empty"),
  email: yup.string().email("Invalid email format").required("email shouldn't be empty"),
  password: yup.string().min(6, 'Password must be at least 6 characters').notRequired(),
  image: yup
  .mixed()
  .test("fileSize", "File too large", (value) => {
    if (!value || value.length === 0) return true;
    return value[0].size <= 2 * 1024 * 1024;
  })
  .test("fileType", "Unsupported file format", (value) => {
    if (!value || value.length === 0) return true;
    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
  })
})

const EditProfile = () => {
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    api.get('/user/viewprofile')
      .then(res => {
        const { name, email, image } = res.data.data;
        reset({ name, email });
        setCurrentImage(image);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load profile");
      });
  }, [reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.password?.trim()) {
      formData.append('password', data.password);
    }
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      await api.patch('/user/edit/editprofile', formData);
      alert('Profile updated successfully!');
      navigate('/user/profile');
    } catch (err) {
      alert(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="edit-profile-page d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="glass-form p-4 rounded shadow-lg" encType="multipart/form-data">
        <h2 className="text-center text-white mb-4">Edit Profile</h2>

        {currentImage && (
          <div className="mb-3 text-center">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${currentImage}`}
              alt="Current Profile"
              className="rounded-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label text-white">Name</label>
          <input type="text" className="form-control" {...register('name')} />
          <p className="text-danger">{errors.name?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input type="email" className="form-control" {...register('email')} />
          <p className="text-danger">{errors.email?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Password</label>
          <input type="password" className="form-control" {...register('password')} />
          <p className="text-danger">{errors.password?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">New Image (optional)</label>
          <input type="file" className="form-control" accept="image/*" {...register('image')} />
          <p className="text-danger">{errors.image?.message}</p>
        </div>

        <button type="submit" className="btn btn-light w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile