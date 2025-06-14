import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/Logo_amphibot.png';
import mapIcon from '../assets/map.png';
import robotIcon from '../assets/robot.png';
import './Sidebar.css';

interface SidebarProps {
  selectedAmphibot?: string;
  onAmphibotSelect?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedAmphibot, onAmphibotSelect }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </NavLink>

      <ul className="sidebar-nav">
        <li>
          <NavLink
            to="/map"
            onClick={() => onAmphibotSelect?.('Amphibot 001')}
            className={`nav-item active-yellow ${path === '/map' ? 'filled' : ''}`}
          >
            <img src={mapIcon} alt="Map Icon" className="icon-img" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/robot"
            onClick={() => onAmphibotSelect?.('Amphibot 002')}
            className={`nav-item active-orange ${path === '/robot' ? 'filled' : ''}`}
          >
            <img src={robotIcon} alt="Robot Icon" className="icon-img" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
