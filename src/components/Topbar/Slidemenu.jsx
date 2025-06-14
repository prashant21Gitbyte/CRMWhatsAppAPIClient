import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faEnvelope,
  faGem,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

const Slidemenu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null; // Hide on desktop

  const scrollMenuStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    position: 'sticky',
    top: '81px',
    zIndex: 1000,
    borderBottom: '1px solid #ccc',
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
  };

  const navItemStyle = {
    flex: '0 0 auto',
    marginRight: '12px',
    textDecoration: 'none',
    color: 'inherit',
  };

  const listItemStyle = {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    background: '#eee',
    borderRadius: '6px',
    fontSize: '14px',
    minWidth: '150px',
    transition: 'background 0.3s',
  };

  const iconStyle = {
    marginRight: '8px',
  };

  return (
    <nav style={scrollMenuStyle}>
      <NavLink to="/" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faHouse} style={iconStyle} />
          <span>WhlatsApp Anaysis</span>
        </li>
      </NavLink>
      <NavLink to="/conversation" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faEnvelope} style={iconStyle} />
          <span>WhatsApp Conversation</span>
        </li>
      </NavLink>
      <NavLink to="/whatsappusers" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faGem} style={iconStyle} />
          <span>WhatsApp Users</span>
        </li>
      </NavLink>
      <NavLink to="/whatsappmeta" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faGem} style={iconStyle} />
          <span>Meta Template</span>
        </li>
      </NavLink>
      <NavLink to="/whatsappanalytics" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faGem} style={iconStyle} />
          <span>Template Analytics</span>
        </li>
      </NavLink>
      <NavLink to="/messagelogs" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faGem} style={iconStyle} />
          <span>Message Logs</span>
        </li>
      </NavLink>
      <NavLink to="/" style={navItemStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faRightFromBracket} style={iconStyle} />
          <span>Logout</span>
        </li>
      </NavLink>
    </nav>
  );
};

export default Slidemenu;
