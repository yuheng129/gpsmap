import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import navigate hook
import floodBg from '../assets/Flood_bg.jpg';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // 👈 initialize hook

  const handleGetStarted = () => {
    navigate('/map'); // 👈 navigate to /map page
  };

  return (
    <div 
      className="homepage-container" 
style={{ backgroundImage: `url(${floodBg})` }}

    >
      <div className="homepage-overlay">
        <div className="homepage-content">
          <h1 className="homepage-title">
            "Bringing aid to those who need it."
          </h1>
          <button className="homepage-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;