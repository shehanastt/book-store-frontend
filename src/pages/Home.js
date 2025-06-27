import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container d-flex align-items-center justify-content-center text-center">
      <div className="welcome-card p-5 shadow-lg rounded-4">
        <h1 className="display-4 fw-bold mb-3 text-white">Welcome to BookNest</h1>
        <p className="lead text-white-50">
          Discover, Buy & Sell Books with Ease.
          <br />
          Where Every Story Begins With a Click.
        </p>
        <div className="mt-4">
          <a href="/register" className="btn btn-light me-3 px-4">
            Get Started
          </a>
          <a href="/login" className="btn btn-outline-light px-4">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
