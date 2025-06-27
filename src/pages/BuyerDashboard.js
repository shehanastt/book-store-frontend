import React from 'react';
import ListBooks from '../components/ListBooks';
import '../styles/buyer-dash.css';
import Header from '../components/Header';

const BuyerDashboard = () => {
  return (
    <div className="buyer-dashboard">
      <div className="overlay"></div>
      <Header/>
      <div className="dashboard-content container py-5">
        <h1 className="text-center text-white mb-5 fw-bold">Welcome</h1>
        <ListBooks />
      </div>
    </div>
  );
};

export default BuyerDashboard;
