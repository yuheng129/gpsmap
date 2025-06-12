import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapPage.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2t5ZTEyOSIsImEiOiJjbWJrdHZ3OXYwdTZxMmxwdjFqNjBqc2psIn0.ScnyAu71F8xdxE7Z9N49iA';

const MapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firebaseScript = document.createElement('script');
    firebaseScript.src = 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js';
    firebaseScript.onload = () => {
      const databaseScript = document.createElement('script');
      databaseScript.src = 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database-compat.js';
      document.body.appendChild(databaseScript);
    };
    document.body.appendChild(firebaseScript);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [101.6869, 3.139],
      zoom: 16,
      pitch: 60,
    });

    map.addControl(new mapboxgl.NavigationControl());

    return () => map.remove(); // cleanup
  }, []);

  return (
    <div className="map-page">
      {/* Sidebar */}
      <div className="map-sidebar">
        <h3>Survivor Pins</h3>
        <ul id="pinList"></ul>
      </div>

      {/* Map container */}
      <div className="map-view" ref={mapContainer} />

      {/* Buttons */}
      <button id="centerBtn">Center Robot</button>
      <button id="pinToggleBtn">Pin Mode</button>
      <button id="findRouteBtn">Find Route</button>
      <button id="returnToStartBtn">Return to Start</button>
    </div>
  );
};

export default MapPage;
