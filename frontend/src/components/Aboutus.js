// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <div className="cards-container">
        <div className="card">
        
          <div className="card-content">
            <h3>EL gahrbi abdelah</h3>
            <p>full-stack developer and UI/UX designer</p>
          </div>
        </div>
        <div className="card">
          
          <div className="card-content">
            <h3>Soufiane BENLAHCEN</h3>
            <p>Big Data Engineering Student @UEMF | Data Consultant @EJE | Co-Lead & Data Head @GDSC-UEMF | GCP Certified</p>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;
