import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  // const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowHeader(currentScroll < lastScroll || currentScroll < 10);
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };


  return (
    <header className={`glass-header shadow ${showHeader ? 'visible' : 'invisible'}`}>
      <div className="container d-flex align-items-center justify-content-between py-2">
        {/* Logo and App Name */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none text-dark">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
            alt="Book Logo"
            width="40"
            height="40"
            className="rounded-circle"
          /> */}
          <span className="fw-bold fs-4 ">BookNest</span>
        </Link>

        {/* Search Bar */}
        <div className="d-none d-md-block flex-grow-1 px-4">
          <input
            type="text"
            className="form-control rounded-pill px-4"
            placeholder="Search for books..."
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* Nav Actions */}
        {/* <div className="d-flex align-items-center gap-3">
          <Link to="/profile" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-danger btn-sm rounded-pill px-3">
            Logout
          </button>
        </div> */}

        <div className="d-flex align-items-center gap-3 nav-glass-actions">
          <Link to={`/user/profile`} className="btn glass-btn text-white px-4 py-2">
            <i className="bi bi-person-circle me-2"></i>Profile
          </Link>

          <button onClick={handleLogout} className="btn glass-btn-danger text-white px-4 py-2">
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
