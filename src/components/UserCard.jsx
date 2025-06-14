import React, { useState, useRef, useEffect } from "react";
 
const styles = {
  userRow: {
    borderBottom: "1px solid #e5e7eb",
    height: "60px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "9999px",
  },
  name: {
    fontWeight: 600,
  },
  status: {
    active: { color: "#10b981" },
    inactive: { color: "#ef4444" },
  },
  menuTrigger: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    padding: "4px",
  },
 dropdownMenu: {
    position: "absolute",
    top: "100%",              // Appear directly below the dots
    right: 0,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    minWidth: "120px",
    zIndex: 1000,
    padding: "8px 0",
    margin: 0,                 // Remove any spacing
  },
  dropdownItem: {
    padding: "8px 16px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  dropdownItemHover: {
    backgroundColor: "#f0f0f0",
  },
  triggerDot: {
    cursor: "pointer",
    padding: "4px 8px",
  },
  dropdownContainer: {
    position: "relative",
  },
};
 
const UserCard = ({ user, onDelete, isSelected, onSelect, onEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <tr style={styles.userRow}>
      <td>
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
 
      <td>
        <div style={styles.userInfo}>
          <img src={user.avatar} alt={user.customerName} style={styles.avatar} />
          <div>
            <div style={styles.name}>{user.customerName}</div>
          </div>
        </div>
      </td>
 
      <td>{user.customerPhone}</td>
      <td>{user.businessNumber}</td>
      <td>{user.latestDate || "--"}</td>
      <td>{user.latestTime || "--"}</td>
 
      <td style={user.status?.toLowerCase() === "active" ? styles.status.active : styles.status.inactive}>
        {user.status || "Inactive"}
      </td>
 
      <td style={styles.dropdownContainer} ref={menuRef}>
  <span style={styles.triggerDot} onClick={() => setMenuOpen(!menuOpen)}>
    ...
  </span>
 
  {menuOpen && (
    <div style={styles.dropdownMenu}>
      <div
        style={styles.dropdownItem}
        onClick={() => {
          setMenuOpen(false);
          onEdit(user);
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        Edit
      </div>
      <div
        style={styles.dropdownItem}
        onClick={() => {
          setMenuOpen(false);
          onDelete(user);
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        Delete
      </div>
    </div>
  )}
</td>
 
    </tr>
  );
};
 
export default UserCard;
 
 