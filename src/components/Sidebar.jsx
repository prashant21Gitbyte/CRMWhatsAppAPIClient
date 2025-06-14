import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faHouse,
  faEnvelope,
  faChartColumn,
  faGem,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import {
  FaShoppingCart,
  FaUserTie,
  FaHospital,
  FaIndustry,
  FaUniversity,
  FaCoffee,
  FaShieldAlt,
  FaHotel,
  FaEnvelope,
  FaFileAlt,
  FaTh,
  FaCashRegister,
  FaCalendar,
} from "react-icons/fa";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const indicatorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const indicator = indicatorRef.current;
    const menuItems = sidebar.querySelectorAll("ul li");

    const handleMouseOver = (item) => {
      const itemHeight = item.offsetHeight;
      const offsetTop = item.offsetTop;
      indicator.style.top = `${offsetTop}px`;
      indicator.style.height = `${itemHeight}px`;
    };

    menuItems.forEach((item) => {
      item.addEventListener("mouseover", () => handleMouseOver(item));
    });

    // Cleanup event listeners
    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("mouseover", () => handleMouseOver(item));
      });
    };
  }, []);

  return (
    <div>
      <div className="bgcolor" style={{ height: 300 }}></div>
      <div className="sidebar-wrapper">
        <div
          className={`sidebar ${isOpen ? "open" : ""}`}
          id="sidebar"
          ref={sidebarRef}
        >
          <div style={{ marginLeft: 5 }} className="profile">
            {/* <img src={logo} alt='Profile' width={30} /> */}
          </div>
          <div className="indicator" id="indicator" ref={indicatorRef}></div>
          <ul>
            <NavLink to="/" className="list-item textd" >
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faHouse} className="faicon" />
                <span style={{ fontSize: 16 }}>WhlatsApp Anaysis</span>
              </li>
            </NavLink>
            <NavLink to="/conversation" className="list-item textd">
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faEnvelope} className="faicon" />
                <span style={{ fontSize: 16 }}>WhatsApp Conversation</span>
              </li>
            </NavLink>
            <NavLink to="/whatsappusers" className="list-item textd" >
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faGem} className="faicon" />
                <span style={{ fontSize: 16 }}>WhatsApp Users</span>
              </li>
            </NavLink>
            <NavLink to="/whatsappmeta" className="list-item textd" >
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faGem} className="faicon" />
                <span style={{ fontSize: 16 }}>Meta Template</span>
              </li>
            </NavLink>
            <NavLink to="/whatsappanalytics" className="list-item textd">
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faGem} className="faicon" />
                <span style={{ fontSize: 16 }}>Template Analytics</span>
              </li>
            </NavLink>
            <NavLink to="/MessageLogs" className="list-item textd">
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faGem} className="faicon" />
                <span style={{ fontSize: 16 }}>Message Logs</span>
              </li>
            </NavLink>
            <NavLink to="/whatsappanalytics" className="list-item textd">
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faGem} className="faicon" />
                <span style={{ fontSize: 16 }}>WhatsApp Messaegs</span>
              </li>
            </NavLink>
            <NavLink to="/" className="list-item textd">
              <li style={{ marginLeft: 8 }}>
                <FontAwesomeIcon icon={faRightFromBracket} className="faicon" />
                <span style={{ fontSize: 16 }}>Logout</span>
              </li>
            </NavLink>
          </ul>
        </div>
        <button className="toggle-btn" id="toggleBtn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
