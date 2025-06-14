import React, { useEffect, useRef, useState } from 'react';
import './Topbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../../images/Logo_crm.png';
import NotificationSidebar from '../NotificationSidebar';
import GridSidebar from '../GridSideBar';
 
const Header = () => {
  const headerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGridSidebarOpen, setIsGridSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.profile-dropdown') &&
        !event.target.closest('.rounded-circle')
      ) {
        setIsProfileMenuOpen(false);
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  const goFullscreen = () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    } else {
      const element = document.documentElement;
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
    }
  };
 
  return (
    <>
      <div className="container">
        <header ref={headerRef} className="header-shrink main-header">
 
          {/* Left: Logo */}
          <div className="logo-area">
            <img src={Logo} alt="CRM Logo" className="logo_default" style={{ height: '40px' }} />
          </div>
 
          {/* Center: Search Bar */}
          <div className="header-middle">
            <div className="search-bar">
              <input type="text" className="form-control px-4" placeholder="Quick search..." />
              <span className="search-shortcut position-absolute end-0 top-50 translate-middle-y px-2 text-secondary">
                ⌘K
              </span>
            </div>
          </div>
 
          {/* Right: Icons */}
          <div className="right-area">
            <div className="d-flex align-items-center gap-3 icon-group">
              <button className="btn btn-link p-0 text-white mobile-search-icon" aria-label="Search">
                <i className="bi bi-search fs-5"></i>
              </button>
 
              <button
                className="btn btn-link p-0 text-white d-md-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className="bi bi-list fs-3"></i>
              </button>
 
              <div className="d-none d-md-flex gap-4">
                <button onClick={() => setIsGridSidebarOpen(true)} className="btn btn-link p-0 text-white" aria-label="Grid">
                  <i className="bi bi-grid fs-5"></i>
                </button>
 
                <button onClick={goFullscreen} className="btn btn-link p-0 text-white" aria-label="Fullscreen">
                  <i className="bi bi-arrows-fullscreen fs-5"></i>
                </button>
 
                <button onClick={() => setIsSidebarOpen(true)} className="btn btn-link p-0 text-white" aria-label="Notifications">
                  <i className="bi bi-bell fs-5"></i>
                </button>
 
                <div className="position-relative">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Profile"
                    className="rounded-circle"
                    width="36"
                    height="36"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
 
      {/* Notification Sidebar */}
      <NotificationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
 
      {/* Grid Sidebar */}
      <GridSidebar isOpen={isGridSidebarOpen} onClose={() => setIsGridSidebarOpen(false)} />
 
      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsSidebarOpen(true)} className="btn btn-link text-dark w-100 text-start">
              <i className="bi bi-bell me-2"></i> Notifications
            </button>
            <button onClick={goFullscreen} className="btn btn-link text-dark w-100 text-start">
              <i className="bi bi-arrows-fullscreen me-2"></i> Fullscreen
            </button>
            <button onClick={() => console.log('Grid clicked')} className="btn btn-link text-dark w-100 text-start">
              <i className="bi bi-grid me-2"></i> Grid
            </button>
          </div>
        </div>
      )}
 
      {/* Profile Modal */}
      {isProfileMenuOpen && (
        <div className="profile-dropdown shadow-sm">
          <ul className="list-unstyled mb-0 p-2">
            <li className="dropdown-item py-2"><i className="bi bi-person-switch me-2"></i> Switch Account</li>
            <li className="dropdown-item py-2"><i className="bi bi-gear me-2"></i> Connected Services</li>
            <li className="dropdown-item py-2"><i className="bi bi-envelope me-2"></i> Email Settings</li>
            <li className="dropdown-item py-2"><i className="bi bi-lock me-2"></i> Reset Password</li>
            <li className="dropdown-item py-2"><i className="bi bi-person-circle me-2"></i> Profile Info</li>
            <li className="dropdown-item py-2 text-danger"><i className="bi bi-power me-2"></i> Logout</li>
          </ul>
        </div>
      )}
    </>
  );
};
 
export default Header;
 
 