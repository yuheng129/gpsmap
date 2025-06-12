import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './MapPage.css';
import 'mapbox-gl/dist/mapbox-gl.css'; // Required for correct rendering

mapboxgl.accessToken = "pk.eyJ1Ijoic2t5ZTEyOSIsImEiOiJjbWJrdHZ3OXYwdTZxMmxwdjFqNjBqc2psIn0.ScnyAu71F8xdxE7Z9N49iA";

const firebaseConfig = {
  apiKey: "AIzaSyDsOrjAd-h_d2N5gIKr7LD1yu_V9_K63r4",
  authDomain: "gpstest-3bed5.firebaseapp.com",
  databaseURL: "https://gpstest-3bed5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "gpstest-3bed5",
  storageBucket: "gpstest-3bed5.appspot.com",
  messagingSenderId: "14670212530",
  appId: "1:14670212530:web:c4a346837779980d0fc8ab",
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(firebaseApp);

const MapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const robotMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [101.6869, 3.139],
      zoom: 16,
      pitch: 60,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl());

    return () => map.remove();
  }, []);

  useEffect(() => {
    const pinsRef = ref(database, 'pins');
    const unsubscribe = onValue(pinsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('📍 Fetched pins from Firebase:', data);
      if (!data || !mapRef.current) return;

      Object.entries(data).forEach(([id, pin]: any) => {
        const { lat, lng, name, survivorCount, bearing } = pin;
        if (lat && lng) {
          // Add survivor marker
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            `${name} (Survivors: ${survivorCount})`
          );

          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(mapRef.current!);

          // Place robot marker if it's "Survivor #1" or any identifier
          // Place robot marker if it's "Survivor #1" or any identifier
if (name === 'Survivor #1') {
  // Remove old robot marker
  if (robotMarkerRef.current) robotMarkerRef.current.remove();

  // Create arrow element
  const el = document.createElement('div');
  el.className = 'arrow-marker';
  el.style.width = '30px';
  el.style.height = '30px';
  el.style.backgroundImage = `url('https://docs.mapbox.com/mapbox-gl-js/assets/position.png')`;
  el.style.backgroundSize = 'contain';
  el.style.transform = `rotate(${bearing || 0}deg)`;

  const marker = new mapboxgl.Marker({ element: el })
    .setLngLat([lng, lat])
    .addTo(mapRef.current!);

  robotMarkerRef.current = marker;
}

        }
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="map-page">
      <div className="map-sidebar">
        <h3>Survivor Pins</h3>
        <ul id="pinList"></ul>
      </div>

      <div className="map-view" ref={mapContainer} />

      <button id="centerBtn">Center Robot</button>
      <button id="pinToggleBtn">Pin Mode</button>
      <button id="findRouteBtn">Find Route</button>
      <button id="returnToStartBtn">Return to Start</button>
    </div>
  );
};

export default MapPage;
