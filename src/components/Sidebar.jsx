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
  faMessage,
  faUsers,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

// Map each label (or route) to its corresponding icon
const iconMap = {
  "WhatsApp Analysis": faHouse,
  "WhatsApp Conversation": faEnvelope,
  "WhatsApp Users": faUsers,
  "Meta Template": faChartColumn,
  "Template Analytics": faChartColumn,
  "WhatsApp Messages": faMessage,
  "Message Logs": faFileLines,
  Logout: faRightFromBracket,
};

const menuItems = [
  { to: "/", label: "WhatsApp Analysis" },
  { to: "/conversation", label: "WhatsApp Conversation" },
  { to: "/whatsappusers", label: "WhatsApp Users" },
  { to: "/whatsappmeta", label: "Meta Template" },
  { to: "/whatsappanalytics", label: "Template Analytics" },
  { to: "/whatsappmsg", label: "WhatsApp Messages" },
  { to: "/messagelogs", label: "Message Logs" },
  { to: "/logout", label: "Logout" },
];

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const indicatorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const indicator = indicatorRef.current;
    const items = sidebar.querySelectorAll("ul li");
 
    const onHover = (item) => {
      indicator.style.top = `${item.offsetTop}px`;
      indicator.style.height = `${item.offsetHeight}px`;
    };

    items.forEach((item) =>
      item.addEventListener("mouseover", () => onHover(item))
    );
    return () => {
      items.forEach((item) =>
        item.removeEventListener("mouseover", () => onHover(item))
      );
    };
  }, []);

  return (
    <div className="sidebar-wrapper">
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="indicator" ref={indicatorRef} />
        <ul>
          {menuItems.map((item) => {
            const icon = iconMap[item.label] || faGem; // fallback icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <li
                    className="list-item"
                    style={{
                      background: isActive
                        ? "linear-gradient(to right, #1e2a5a , #1852a1)"
                        : "transparent",
                      color: isActive ? "#fff" : "#031F7E",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="faicon"
                      style={{
                        color: isActive ? "#fff" : "#031F7E",
                      }}
                    />
                    <span>{item.label}</span>
                  </li>
                )}
              </NavLink>
            );
          })}
        </ul>
      </div>
      <button
  className={`toggle-btn ${isOpen ? "active" : ""}`}
  onClick={toggleSidebar}
>
  <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
</button>

    </div>
  );
};

export default Sidebar;
