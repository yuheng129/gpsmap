// src/pages/MapPage.tsx
import React, { useState } from 'react';
import './MapPage.css';

const MapPage: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === '001') {
      setStatusMessage('✅ Successfully Logged In. Redirecting...');
      setIsLoggedIn(true);

      setTimeout(() => {
        // Replace this with actual path to your mapbox.html
        window.location.href = '/mapbox.html';
      }, 2000);
    } else {
      setStatusMessage('❌ Invalid Code. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="map-background" />
      <div className="login-overlay">
        <h1 className="map-title">Map view</h1>
        <form onSubmit={handleSubmit} className="code-form">
          <input
            type="text"
            placeholder="Enter the code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="code-input"
          />
          <button type="submit" className="submit-btn">Enter</button>
        </form>
        {statusMessage && <p className="status-msg">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default MapPage;
