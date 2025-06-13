// src/pages/RobotPage.tsx
import React, { useState } from 'react';
import { Package, MapPin, BatteryCharging, Video } from 'lucide-react';
import './RobotPage.css';
import mapImage from '../assets/map-image.png';
import cameraFeed from '../assets/flood.png';

interface AmphibotDetails {
  name: string;
  status: string;
  battery: number;
  supplies: string[];
  location: string;
  cameraFeed: string;
}

const amphibotData: Record<string, AmphibotDetails> = {
  'Amphibot 001': {
    name: 'Amphibot 001',
    status: 'Online',
    battery: 85,
    supplies: ['Emergency Kit', 'Water (5L)', 'Rations (3 days)', 'Bread', 'Paracetamol', 'Plaster', 'Blanket'],
    location: 'Sector Alpha-7',
    cameraFeed: cameraFeed,
  },
  'Amphibot 002': {
    name: 'Amphibot 002',
    status: 'Standby',
    battery: 60,
    supplies: ['First Aid Kit', 'Tools'],
    location: 'Base Camp',
    cameraFeed: cameraFeed,
  },
};

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

  const getAmphibotDetails = (): AmphibotDetails => {
    return (
      amphibotData[selectedAmphibot] ?? {
        name: selectedAmphibot,
        status: 'Unknown',
        battery: 0,
        supplies: ['N/A'],
        location: 'N/A',
        cameraFeed:
          'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=800&auto=format&fit=crop',
      }
    );
  };

  const details = getAmphibotDetails();

  const StatBlock = ({ label, sub }: { label: string; sub: string }) => (
    <div className="stat-block">
      <div className="stat-label">{label}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );

  return (
    <div className="map-page-layout">
      {/* Sidebar */}
      <div className="amphibot-sidebar">
        <input
          type="text"
          placeholder="Search Amphibot..."
          className="amphibot-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="amphibot-selector-scrollable">
          {filteredAmphibots.length === 0 ? (
            <div className="no-results">No Amphibots found</div>
          ) : (
            filteredAmphibots.map((id) => (
              <div
                key={id}
                className={`amphibot-card ${selectedAmphibot === id ? 'selected' : ''}`}
                onClick={() => handleAmphibotSelect(id)}
              >
                <span className="amphibot-icon">🤖</span>
                <span>{id}</span>
              </div>
            ))
          )}
        </div>

        <div className="amphibot-stats">
          <StatBlock label="Bright" sub="BRIGHTNESS" />
          <StatBlock label="190m" sub="DISTANCE" />
          <StatBlock label="Clear" sub="OBSTACLE" />
          <StatBlock label="237.6" sub="HEADING" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-scroll-container">
      <main className="map-main-content">
        <div className="status-header">
          {details.name} - Status: {details.status}
        </div>

        <div className="top-section"> 
          <div className="left-column">
            {/* Supplies */}
            <div className="content-card supplies-card">
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
            <div className="content-card" style={{ height: '100px' }}>
              <div className="card-header">
                <BatteryCharging size={20} className="card-icon" style={{ color: '#FACC15' }} />
                <h3>Battery</h3>
              </div>
              <div className="battery-status">
                <div className="battery-bar-container">
                  <div
                    className="battery-bar"
                    style={{
                      width: `${details.battery}%`,
                      backgroundColor:
                        details.battery > 70
                          ? '#4ADE80'
                          : details.battery > 30
                          ? '#FACC15'
                          : '#F87171',
                    }}
                  ></div>
                </div>
                <span>{details.battery}%</span>
              </div>
            </div>

                <div className="content-card camera-feed-card">
      <div className="card-header">
        <Video size={20} className="card-icon" style={{ color: '#C084FC' }} />
        <h3>Camera</h3>
      </div>
      <img
        src={details.cameraFeed}
        alt={`${details.name} Camera Feed`}
        className="camera-image"
      />
    </div>
          </div>

          {/* Location */}
          <div className="right-column">
            <div className="content-card location-card" style={{ height: '180px' }}>
              <div className="card-header">
                <MapPin size={20} className="card-icon" style={{ color: '#3B82F6' }} />
                <h3>Location</h3>
              </div>
              <img src={mapImage} className="map-image" alt="Map location" />
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default RobotPage;
