import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api'; 
import '../styles/view-book.css'; 

const ViewBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => setBook(res.data.data)) 
      .catch(err => {
        console.error(err);
        setError('Unable to load book details.');
      });
  }, [id]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this book?');
    if (!confirm) {
      return;
    } else {
        await api.patch(`/books/${id}`)
          .then(() => {
            // setBook((prevBooks) => prevBooks.filter((book) => book._id !== id));
            alert('Book deleted successfully!');
            navigate('/seller/dashboard')
          }).catch((err) => {
            console.error(err);
            alert('Failed to delete the book.');
          })
    }
  };

  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  if (!book) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5 view-book-page">
      <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
        <div className="row g-4 align-items-center">
          <div className="col-md-5">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`}
              alt={book.title}
              className="img-fluid rounded-4"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">{book.title}</h2>
            <p className="mb-2"><strong>Author:</strong> {book.author}</p>
            <p className="mb-2"><strong>Price:</strong> ₹{book.price}</p>
            {role === 'seller' && (
            <div>
              <Link to={`/books/edit/${book._id}`} className="btn btn-outline-secondary btn-sm me-2">
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </div>
            )}
            <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
