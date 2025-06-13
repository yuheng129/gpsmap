import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import './MapPage.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2t5ZTEyOSIsImEiOiJjbWJrdHZ3OXYwdTZxMmxwdjFqNjBqc2psIn0.ScnyAu71F8xdxE7Z9N49iA';

const firebaseConfig = {
  apiKey: 'AIzaSyDsOrjAd-h_d2N5gIKr7LD1yu_V9_K63r4',
  authDomain: 'gpstest-3bed5.firebaseapp.com',
  databaseURL: 'https://gpstest-3bed5-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'gpstest-3bed5',
  storageBucket: 'gpstest-3bed5.appspot.com',
  messagingSenderId: '14670212530',
  appId: '1:14670212530:web:c4a346837779980d0fc8ab',
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(firebaseApp);

interface PinData {
  id: string;
  lat: number;
  lng: number;
  name: string;
  survivorCount: number;
  bearing: number;
  timeCreated: number;
}

const MapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const robotMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [pins, setPins] = useState<PinData[]>([]);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const pinsRef = useRef<Record<string, mapboxgl.Marker>>({});

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
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
    const pinsDBRef = ref(db, 'pins');
    return onValue(pinsDBRef, (snapshot) => {
      const data = snapshot.val();
      const newPins: PinData[] = [];
      if (!mapRef.current) return;

      Object.entries(data || {}).forEach(([key, value]: any) => {
        const { lat, lng, name, survivorCount, bearing = 0, timeCreated } = value;
        newPins.push({ id: key, lat, lng, name, survivorCount, bearing, timeCreated });

        if (!pinsRef.current[key]) {
          const markerDiv = document.createElement('div');
          markerDiv.className = 'survivor-marker';

          const marker = new mapboxgl.Marker({ element: markerDiv })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setText(`${name} (${survivorCount})`))
            .addTo(mapRef.current!);

          pinsRef.current[key] = marker;
        } else {
          pinsRef.current[key].setLngLat([lng, lat]);
        }

        if (name === 'Survivor #1') {
          if (robotMarkerRef.current) robotMarkerRef.current.remove();
          const arrow = document.createElement('div');
          arrow.className = 'arrow-marker';
          arrow.style.backgroundImage = `url('https://docs.mapbox.com/mapbox-gl-js/assets/position.png')`;
          arrow.style.width = '30px';
          arrow.style.height = '30px';
          arrow.style.backgroundSize = 'contain';
          arrow.style.transform = `rotate(${bearing}deg)`;

          robotMarkerRef.current = new mapboxgl.Marker({ element: arrow })
            .setLngLat([lng, lat])
            .addTo(mapRef.current!);
        }
      });

      setPins(newPins);
    });
  }, []);

  const drawRoute = (coords: { lng: number; lat: number }[]) => {
    if (!mapRef.current || coords.length < 2) return;
    if (mapRef.current.getLayer('routeLine')) mapRef.current.removeLayer('routeLine');
    if (mapRef.current.getSource('route')) mapRef.current.removeSource('route');

    const geojson = {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: coords.map(c => [c.lng, c.lat]) },
    };
    mapRef.current.addSource('route', { type: 'geojson', data: geojson });
    mapRef.current.addLayer({
      id: 'routeLine',
      type: 'line',
      source: 'route',
      layout: {},
      paint: { 'line-color': '#0074D9', 'line-width': 4 },
    });
    mapRef.current.flyTo({ center: coords[0], zoom: 16 });
  };

  const haversine = (a: any, b: any) => {
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371000;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const a1 = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1 - a1));
  };

  const findRoute = () => {
    if (!robotMarkerRef.current) return alert('Boat marker missing');
    const start = robotMarkerRef.current.getLngLat();
    const remaining = [...pins];
    const visited = new Set();
    let current = { lat: start.lat, lng: start.lng };
    const route = [current];

    while (visited.size < pins.length) {
      let nearest = null;
      let minDist = Infinity;
      for (const pin of remaining) {
        if (!visited.has(pin.id)) {
          const dist = haversine(current, pin);
          if (dist < minDist) {
            minDist = dist;
            nearest = pin;
          }
        }
      }
      if (nearest) {
        visited.add(nearest.id);
        route.push({ lat: nearest.lat, lng: nearest.lng });
        current = nearest;
      }
    }
    setRouteCoords(route);
    drawRoute(route);
  };

  const returnToStart = () => {
    if (routeCoords.length < 2) return alert('Route missing');
    const looped = [...routeCoords, routeCoords[0]];
    drawRoute(looped);
  };

  return (
    <div className="map-page">
      <div className="map-sidebar">
        <h3>Survivor Pins</h3>
        <ul className="pin-list">
          {pins.map(pin => (
            <li key={pin.id}>
              <a
                href={`https://www.google.com/maps?q=${pin.lat},${pin.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pin.name} ({pin.lat.toFixed(5)}, {pin.lng.toFixed(5)})
              </a>
              <br />
              <small>{new Date(pin.timeCreated).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>

      <div ref={mapContainerRef} className="map-view" />

      <button id="findRouteBtn" onClick={findRoute}>Find Route</button>
      <button id="returnToStartBtn" onClick={returnToStart}>Return to Start</button>
    </div>
  );
};

export default MapPage;
