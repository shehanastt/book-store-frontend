import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/add-book.css'; 

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (let key in book) {
      formData.append(key, book[key]);
    }

    try {
      await api.post('/books/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        //   Authorization: `Bearer ${token}`
        }
      });

      alert("Book added successfully!");
      navigate('/seller/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  };

  return (
    <div className="add-book-page">
      <div className="overlay"></div>
      <div className="form-container container">
        <h2 className="text-center mb-4 text-white">Add a New Book</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="glass-form p-4 rounded shadow-lg">
          <div className="mb-3">
            <label className="form-label text-white">Title</label>
            <input type="text" name="title" className="form-control" value={book.title} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Author</label>
            <input type="text" name="author" className="form-control" value={book.author} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Price (₹)</label>
            <input type="number" name="price" className="form-control" value={book.price} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label text-white">Upload Cover Image</label>
            <input type="file" name="image" accept="image/*" className="form-control" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-glass w-100"> Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
