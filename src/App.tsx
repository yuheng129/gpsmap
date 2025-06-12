import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import RobotPage from './pages/RobotPage';
import './App.css';

function App() {
  const dummyPins = [
    { lat: 3.139, lng: 101.6869 },
    { lat: 3.1395, lng: 101.6873 },
  ];
  const robotPos = { lat: 3.1388, lng: 101.6867 };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage survivorPins={dummyPins} robotPosition={robotPos} />} />
          <Route path="/robot" element={<RobotPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
