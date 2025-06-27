import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../styles/edit-book.css';

const EditBook = () => {
  const [book, setBook] = useState({ title: '', author: '', price: '', image: null });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => {
        const { title, author, price } = res.data.data;
        setBook({ title, author, price, image: null });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load book details.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setBook(prev => ({ ...prev, image: files[0] }));
    } else {
      setBook(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('price', book.price);
    if (book.image) {
      formData.append('image', book.image);
    }

    api.patch(`/books/edit/${id}`, formData)
      .then(() => {
        alert('Book updated successfully!');
        navigate('/seller/dashboard');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update book.');
      });
  };

  return (
    <div className="edit-book-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 rounded-4 bg-white edit-book-form" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4  fw-bold">Edit Book</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              name="title"
              value={book.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Book title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              name="author"
              value={book.author}
              onChange={handleChange}
              className="form-control"
              placeholder="Author name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Upload New Image (optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form-control"
              accept="image/*"
            />
          </div>

          <button type="submit" className="btn btn-light me-3 w-100">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
