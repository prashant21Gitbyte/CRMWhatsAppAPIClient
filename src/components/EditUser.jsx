import React, { useState } from "react";

const EditUser = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    department: "",
    address: "",
    avatar: ""
  });

  const departmentOptions = [
    "Account Management",
    "Engineering",
    "Marketing",
    "Sales",
    "Human Resources"
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.4)",
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px"
    },
    modal: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      width: "680px",
      maxHeight: "92vh",
      overflowY: "auto",
      position: "relative",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)"
    },
    closeBtn: {
      position: "absolute",
      top: 10,
      right: 5,
      background: "none",
      border: "none",
      fontSize: "20px",
      color: "#555",
      cursor: "pointer"
    },
    card: {
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "12px",
      width: "95%"
    },
    profileSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      textAlign: "center",
      padding: "4px 0",
      marginLeft: "10px"
    },
    labelText: {
      fontSize: "12px",
      fontWeight: 500
    },
    helperText: {
      fontSize: "11px",
      color: "#6b7280",
      marginTop: "-2px"
    },
    photoWrapper: {
      position: "relative",
      width: "50px",
      height: "50px"
    },
    avatarPreview: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      backgroundColor: "#fff",
      border: "1px solid #d1d5db"
    },
    editIcon: {
      position: "absolute",
      bottom: "8px",
      right: "-4px",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      background: "#fff",
      border: "1px solid #ccc",
      fontSize: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    },
    removeButton: {
      padding: "3px 6px",
      border: "1px solid #ccc",
      background: "white",
      borderRadius: "4px",
      fontSize: "11px",
      cursor: "pointer",
      color: "#333",
      marginTop: "-6px"
    },
    formSection: {
      display: "flex",
      flexDirection: "column",
      gap: "18px"
    },
    formRow: {
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    },
    formLabel: {
      fontWeight: 500,
      color: "#374151",
      fontSize: "14px"
    },
    required: {
      color: "red",
      marginLeft: "4px"
    },
    formInline: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    },
    input: {
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      background: "white",
      width: "100%",
      boxSizing: "border-box"
    },
    textarea: {
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      background: "white",
      width: "100%",
      fontFamily: "inherit",
      resize: "vertical",
      minHeight: "70px",
      boxSizing: "border-box"
    },
    genderOptions: {
      display: "flex",
      gap: "16px",
      fontSize: "14px",
      color: "#444",
      marginTop: "4px",
      flexWrap: "wrap"
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "12px",
      flexWrap: "wrap"
    },
    cancelBtn: {
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      background: "#f3f4f6",
      color: "#374151",
      border: "none"
    },
    saveBtn: {
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      cursor: "pointer",
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none"
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Profile Section */}
          <div style={{ ...styles.card, ...styles.profileSection }}>
            <div style={styles.labelText}>Profile Photo</div>
            <div style={styles.helperText}>Upload a clear and recent profile photo.</div>
            <div style={styles.photoWrapper}>
              <img
                src={formData.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt="avatar"
                style={styles.avatarPreview}
              />
              <label style={styles.editIcon}>
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                ✏️
              </label>
            </div>
            <button style={styles.removeButton} onClick={() => setFormData({ ...formData, avatar: "" })}>
              Remove
            </button>
          </div>

          {/* Form Section */}
          <div style={{ ...styles.card, ...styles.formSection }}>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>
                Full Name <span style={styles.required}>*</span>
              </label>
              <div style={styles.formInline}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  style={styles.input}
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formInline}>
              <div style={{ ...styles.formRow, flex: 1 }}>
                <label style={styles.formLabel}>
                  Date of Birth <span style={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={{ ...styles.formRow, flex: 1 }}>
                <label style={styles.formLabel}>
                  Email <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formInline}>
              <div style={{ ...styles.formRow, flex: 1 }}>
                <label style={styles.formLabel}>
                  Phone Number <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (456) 789-0123"
                  style={styles.input}
                />
              </div>

              <div style={{ ...styles.formRow, flex: 1 }}>
                <label style={styles.formLabel}>Gender</label>
                <div style={styles.genderOptions}>
                  {["Male", "Female", "Other"].map((option) => (
                    <label key={option} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.formRow}>
              <label style={styles.formLabel}>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                style={styles.textarea}
              />
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
