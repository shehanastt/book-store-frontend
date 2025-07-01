import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';
import Pagination from './Pagination';

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const limit = 8; 

  useEffect(() => {
    api.get(`/books/list?page=${currentPage}&limit=${limit}`)
      .then(res =>{
        setBooks(res.data.data)
        setTotalBooks(res.data.total);
      }) 
      .catch(console.error);
  }, [currentPage]);

   const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    };

  return (
    <div>
      <div className="container py-4">
        <div className="row g-4">
          {books.map((b) => (
            <div key={b._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${b.image}`}
                  className="card-img-top p-2"
                  alt={b.title}
                  style={{ objectFit: 'contain', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate d-flex justify-content-center">{b.title}</h5>
                  <p className="card-text text-muted mb-3 d-flex justify-content-center">{b.author}</p>
                  <div className="mt-auto d-flex justify-content-center align-items-center">
                    <Link to={`/books/view/${b._id}`} className="btn btn-outline-secondary mt-4">
                      View
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
          {books.length === 0 && (
            <div className="text-center text-muted mt-5">
              <h5>No books available.</h5>
            </div>
          )}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          limit={limit}
          total={totalBooks}
          onPageChange={handlePageChange}
        />
        
      </div>
    </div>
  );
};

export default ListBooks;
