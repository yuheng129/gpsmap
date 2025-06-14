import React from 'react';
import { useNavigate } from 'react-router-dom';
import floodBg from '../assets/Flood_bg.jpg';
import amphibotPhoto from '../assets/AmphiBot_photo.png';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/map');
  };

  return (
    <div className="homepage-container" style={{ backgroundImage: `url(${floodBg})` }}>
      <div className="homepage-overlay">
        <div className="homepage-content">
          <h1 className="homepage-title">
            "Bringing aid to those who need it."
          </h1>
          <button className="homepage-button" onClick={handleGetStarted}>
            Get Started
          </button>
          <div className="homepage-image-wrapper">
            <img src={amphibotPhoto} alt="Amphibot" className="homepage-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
