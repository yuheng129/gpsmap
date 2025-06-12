import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';     // 👈 Make sure this file exists
import RobotPage from './pages/RobotPage'; // 👈 Make sure this file exists
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />       {/* 👈 Add Map page */}
          <Route path="/robot" element={<RobotPage />} />   {/* 👈 Add Robot page */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
