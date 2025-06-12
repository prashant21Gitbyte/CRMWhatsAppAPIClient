import React, { useEffect, useRef } from 'react';
import './Topbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
 
const Header = () => {
  const headerRef = useRef(null);
  const headerContainer = useRef(null);
 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        headerContainer.current.style.backgroundColor = 'white';
        headerRef.current.style.background = 'linear-gradient(90deg, #1e2a5a 0%, #1852a1 100%)';
      } else {
        headerContainer.current.style.backgroundColor = '#1e2a5a';
        headerRef.current.style.background = 'transparent';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  return (
    <>
      <div ref={headerContainer} className="header-container" />
      <div className="container">
        <header ref={headerRef} className="header-shrink main-header">
 
          {/* Left: Logo + Breadcrumb */}
          <div className="header-section">
            {/* <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Logo"
              className="logo-img"
            /> */}
            <span className="breadcrumb">
              App &gt; <span className="text-primary">Dashboards</span> &gt; Analytics
            </span>
          </div>
 
          {/* Center: Search bar */}
          <div className="search-bar">
            <input
              type="text"
              className="form-control px-4"
              placeholder="Quick search..."
            />
            <span className="search-shortcut position-absolute end-0 top-50 translate-middle-y px-2 text-secondary">
              ⌘K
            </span>
          </div>
 
          {/* Right: Icons + Profile */}
          <div className="header-section">
            <div className="d-flex gap-4">
              <i className="bi bi-grid text-white fs-5"></i>
              <i className="bi bi-arrows-fullscreen text-white fs-5"></i>
              <i className="bi bi-bell text-white fs-5"></i>
            </div>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="rounded-circle"
              width="36"
              height="36"
            />
          </div>
 
        </header>
      </div>
    </>
  );
};
 
export default Header;