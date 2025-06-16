import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faEnvelope,
  faGem,
  faRightFromBracket,
  faUsers,
  faChartColumn,
  faMessage,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  'WhatsApp Analysis': faHouse,
  'WhatsApp Conversation': faEnvelope,
  'WhatsApp Users': faUsers,
  'Meta Template': faChartColumn,
  'Template Analytics': faChartColumn,
  'WhatsApp Messages': faMessage,
  'Message Logs': faFileLines,
  Logout: faRightFromBracket,
};

const menuItems = [
  { to: '/', label: 'WhatsApp Analysis' },
  { to: '/conversation', label: 'WhatsApp Conversation' },
  { to: '/whatsappusers', label: 'WhatsApp Users' },
  { to: '/whatsappmeta', label: 'Meta Template' },
  { to: '/whatsappanalytics', label: 'Template Analytics' },
  { to: '/whatsappmsg', label: 'WhatsApp Messages' },
  { to: '/messagelogs', label: 'Message Logs' },
  { to: '/logout', label: 'Logout' },
];

const Slidemenu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  const scrollMenuStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    position: 'sticky',
    top: '73px',
    zIndex: 1000,
    borderBottom: '1px solid #ccc',
  };

  const navItemBase = { flex: '0 0 auto', marginRight: '12px', textDecoration: 'none' };
  const listItemBase = {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    background: '#eee',
    borderRadius: '6px',
    fontSize: '14px',
    minWidth: '150px',
    transition: 'background 0.3s, color 0.3s',
  };

  return (
    <nav style={scrollMenuStyle}>
      {menuItems.map((item, idx) => {
        const icon = iconMap[item.label] || faGem;
        return (
          <NavLink
            key={idx}
            to={item.to}
            end
            style={({ isActive }) => ({
              ...navItemBase,
              opacity: isActive ? 1 : 0.7,
              cursor: 'pointer'
            })}
          >
            {({ isActive }) => (
              <li
                style={{
                  ...listItemBase,
                  background: isActive ? '#1e2a5a' : listItemBase.background,
                  color: isActive ? '#fff' : '#000',
                }}
              >
                <FontAwesomeIcon
                  icon={icon}
                  color={isActive ? '#fff' : '#007bff'}
                  style={{ marginRight: '8px' }}
                />
                <span>{item.label}</span>
              </li>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Slidemenu;
