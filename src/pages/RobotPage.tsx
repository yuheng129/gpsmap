// src/pages/RobotPage.tsx
import React, { useState } from 'react';
import { Package, MapPin, BatteryCharging, Video } from 'lucide-react';
import './RobotPage.css';

const RobotPage: React.FC = () => {
  const [selectedAmphibot, setSelectedAmphibot] = useState<string>('Amphibot 001');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const amphibotIds = [
    'Amphibot 001',
    'Amphibot 002',
    'Amphibot 003',
    'Amphibot 004',
    'Amphibot 005',
    'Amphibot 006',
  ];

  const filteredAmphibots = amphibotIds.filter((id) =>
    id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAmphibotSelect = (id: string) => {
    setSelectedAmphibot(id);
  };

  const getAmphibotDetails = () => {
    switch (selectedAmphibot) {
      case 'Amphibot 001':
        return {
          name: 'Amphibot 001',
          status: 'Online',
          battery: 85,
          supplies: ['Emergency Kit', 'Water (5L)', 'Rations (3 days)'],
          location: 'Sector Alpha-7',
          cameraFeed:
            'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop',
        };
      case 'Amphibot 002':
        return {
          name: 'Amphibot 002',
          status: 'Standby',
          battery: 60,
          supplies: ['First Aid Kit', 'Tools'],
          location: 'Base Camp',
          cameraFeed:
            'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=800&auto=format&fit=crop',
        };
      default:
        return {
          name: selectedAmphibot,
          status: 'Unknown',
          battery: 0,
          supplies: ['N/A'],
          location: 'N/A',
          cameraFeed:
            'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=800&auto=format&fit=crop',
        };
    }
  };

  const details = getAmphibotDetails();

  return (
    <div className="map-page-layout">
      {/* Sidebar */}
      <div className="amphibot-sidebar">
        {/* Search */}
        <input
          type="text"
          placeholder="Search Amphibot..."
          className="amphibot-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Amphibot Selector List */}
        <div className="amphibot-selector-scrollable">
          {filteredAmphibots.map((id) => (
            <div
              key={id}
              className={`amphibot-card ${selectedAmphibot === id ? 'selected' : ''}`}
              onClick={() => handleAmphibotSelect(id)}
            >
              <span className="amphibot-icon">🤖</span>
              <span>{id}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="amphibot-stats">
          <div className="stat-block">
            <div className="stat-label">Bright</div>
            <div className="stat-sub">BRIGHTNESS</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">190m</div>
            <div className="stat-sub">DISTANCE</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Clear</div>
            <div className="stat-sub">OBSTACLE</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">237.6</div>
            <div className="stat-sub">HEADING</div>
          </div>
        </div>
      </div> {/* ✅ Properly closed .amphibot-sidebar here */}

      {/* Main Content */}
      <main className="map-main-content">
        <div className="status-header">
          {details.name} - Status: {details.status}
        </div>

        {/* Top: Supplies + Battery (left), Location (right) */}
        <div className="top-section">
          <div className="left-column">
            {/* Supplies */}
            <div className="content-card">
              <div className="card-header">
                <Package size={20} className="card-icon" style={{ color: '#4ADE80' }} />
                <h3>Supplies</h3>
              </div>
              <ul>
                {details.supplies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Battery */}
            <div className="content-card">
              <div className="card-header">
                <BatteryCharging size={20} className="card-icon" style={{ color: '#FACC15' }} />
                <h3>Battery</h3>
              </div>
              <div className="battery-status">
                <div className="battery-bar-container">
                  <div className="battery-bar" style={{ width: `${details.battery}%` }}></div>
                </div>
                <span>{details.battery}%</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="right-column">
            <div className="content-card">
              <div className="card-header">
                <MapPin size={20} className="card-icon" style={{ color: '#3B82F6' }} />
                <h3>Location</h3>
              </div>
              <p>{details.location}</p>
              <img
                src="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop"
                alt="Map Location"
                className="map-image"
              />
            </div>
          </div>
        </div>

        {/* Bottom: Camera Feed */}
        <div className="bottom-section">
          <div className="content-card full-width">
            <div className="card-header">
              <Video size={20} className="card-icon" style={{ color: '#C084FC' }} />
              <h3>Camera Feed</h3>
            </div>
            <img
              src={details.cameraFeed}
              alt={`${details.name} Camera Feed`}
              className="camera-image"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RobotPage;
