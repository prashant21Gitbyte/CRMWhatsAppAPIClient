import React, { useState, useRef, useEffect } from "react";
import EditUser from "./EditUser";
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, onDelete, isSelected, onSelect }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef(null);
 const navigate = useNavigate();
    const computedStatus = user.profileCompletion > 80 ? "Active" : "Inactive";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        email: {
            color: "#94a3b8",
            fontSize: "0.875rem",
        },
        position: {
            fontSize: "0.875rem",
        },
        department: {
            fontSize: "0.875rem",
            color: "#94a3b8",
        },
        progressContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
        },
        progressBar: {
            background: "#e2e8f0",
            height: "6px",
            borderRadius: "4px",
            width: "100px",
            marginBottom: "4px",
        },
        filled: {
            background: "#6366f1",
            height: "100%",
            borderRadius: "4px",
            width: `${user.profileCompletion}%`,
        },
        percent: {
            fontSize: "0.75rem",
            color: "#475569",
        },
        status: {
            color: computedStatus === "Active" ? "#10b981" : "#ef4444",
        },
        dots: {
            cursor: "pointer",
            padding: "4px 8px",
        },
        dropdownMenu: {
            position: "absolute",
            top: "30px",
            right: 0,
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            minWidth: "120px",
            padding: "4px 0",
        },
        dropdownItem: {
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#334155",
        },
        dropdownItemHover: {
            backgroundColor: "#f1f5f9",
        },
    };

    return (
        <>
            <tr  onClick={() => navigate(`/user/${user.id}`)} style={styles.userRow}>
                <td>
                    <input type="checkbox" checked={isSelected} onChange={onSelect} />
                </td>
                <td>
                    <div style={styles.userInfo}>
                        <img src={user.avatar} alt={user.name} style={styles.avatar} />
                        <div>
                            <div style={styles.name}>{user.name}</div>
                            <div style={styles.email}>{user.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div style={styles.position}>{user.position}</div>
                    <div style={styles.department}>{user.department}</div>
                </td>
                <td>
                    <div style={styles.progressContainer}>
                        <div style={styles.progressBar}>
                            <div style={styles.filled}></div>
                        </div>
                        <div style={styles.percent}>{user.profileCompletion}%</div>
                    </div>
                </td>
                <td style={styles.status}>{computedStatus}</td>
                <td>{user.joinedDate}</td>
                <td style={{ position: "relative" }} ref={menuRef}>
                    <span style={styles.dots} onClick={() => setMenuOpen(!menuOpen)}>
                        ...
                    </span>
                    {menuOpen && (
                        <div style={styles.dropdownMenu}>
                            <div
                                style={styles.dropdownItem}
                                onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
                                onMouseLeave={(e) => (e.target.style.background = "white")}
                                onClick={() => setShowModal(true)}
                            >
                                Edit
                            </div>
                            <div
                                style={styles.dropdownItem}
                                onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
                                onMouseLeave={(e) => (e.target.style.background = "white")}
                                onClick={() => onDelete(user)}
                            >
                                Delete
                            </div>
                        </div>
                    )}
                </td>
            </tr>

            {showModal && (
                <EditUser
                    user={user}
                    onClose={() => setShowModal(false)}
                    onSave={(updatedUser) => {
                        console.log("Updated user:", updatedUser);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default UserCard;