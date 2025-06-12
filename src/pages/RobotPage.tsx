import React, { useState } from 'react';
    import Sidebar from '../components/Sidebar';
    import { Package, MapPin, BatteryCharging, Video, AlertTriangle } from 'lucide-react';
    import './RobotPage.css';

    const MapPage: React.FC = () => {
      const [selectedAmphibot, setSelectedAmphibot] = useState<string>('Amphibot 001');

      const handleAmphibotSelect = (id: string) => {
        setSelectedAmphibot(id);
      };

      const getAmphibotDetails = () => {
        // Placeholder for fetching/displaying details based on selectedAmphibot
        if (selectedAmphibot === 'Amphibot 001') {
          return {
            name: 'Amphibot 001',
            status: 'Online',
            battery: 85,
            supplies: ['Emergency Kit', 'Water (5L)', 'Rations (3 days)'],
            location: 'Sector Alpha-7',
            cameraFeed: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop', // Placeholder image
          };
        }
        if (selectedAmphibot === 'Amphibot 002') {
          return {
            name: 'Amphibot 002',
            status: 'Standby',
            battery: 60,
            supplies: ['First Aid Kit', 'Tools'],
            location: 'Base Camp',
            cameraFeed: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=800&auto=format&fit=crop',
          };
        }
         // Add more details for other amphibots as needed
        return {
            name: selectedAmphibot,
            status: 'Unknown',
            battery: 0,
            supplies: ['N/A'],
            location: 'N/A',
            cameraFeed: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=800&auto=format&fit=crop',
        };
      };

      const details = getAmphibotDetails();

      return (
        <div className="map-page-layout">
          <Sidebar selectedAmphibot={selectedAmphibot} onAmphibotSelect={handleAmphibotSelect} />
          <main className="map-main-content">
            <div className="status-header">
              <h2>{details.name} - Status: {details.status}</h2>
            </div>
            <div className="content-grid">
              <div className="content-card supplies-card">
                <div className="card-header">
                  <Package size={24} />
                  <h3>Supplies</h3>
                </div>
                <ul className="supplies-list">
                  {details.supplies.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="content-card location-card">
                <div className="card-header">
                  <MapPin size={24} />
                  <h3>Location</h3>
                </div>
                <p>{details.location}</p>
                {/* Placeholder for map display */}
                <div className="map-placeholder">
                  <img src="https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop" alt="Map placeholder" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}/>
                </div>
              </div>

              <div className="content-card battery-card">
                <div className="card-header">
                  <BatteryCharging size={24} />
                  <h3>Battery</h3>
                </div>
                <div className="battery-status">
                  <div className="battery-bar-container">
                    <div className="battery-bar" style={{ width: `${details.battery}%` }}></div>
                  </div>
                  <span>{details.battery}%</span>
                </div>
              </div>
              
              <div className="content-card camera-card">
                <div className="card-header">
                  <Video size={24} />
                  <h3>Camera Feed</h3>
                </div>
                {/* Placeholder for camera feed */}
                <div className="camera-placeholder">
                  {details.cameraFeed ? (
                    <img src={details.cameraFeed} alt={`${details.name} camera feed`} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <p>No camera feed available.</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    };

    export default MapPage;