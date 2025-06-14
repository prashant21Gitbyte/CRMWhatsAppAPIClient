import React, { useState, useEffect } from "react";
 
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.4)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  content: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    width: "680px",
    maxHeight: "92vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "5px",
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#555",
    cursor: "pointer",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "12px",
    width: "95%",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "4px",
  },
  labelText: {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: 1.2,
  },
  helperText: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "-2px",
  },
  photoWrapper: {
    position: "relative",
    width: "50px",
    height: "50px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "#fff",
    border: "1px solid #d1d5db",
  },
  editIcon: {
    position: "absolute",
    bottom: "8px",
    right: "-4px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "white",
    border: "1px solid #ccc",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  removeBtn: {
    padding: "3px 6px",
    border: "1px solid #ccc",
    background: "white",
    borderRadius: "4px",
    fontSize: "11px",
    cursor: "pointer",
    color: "#333",
    marginTop: "-6px",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  formLabel: {
    fontWeight: 500,
    color: "#374151",
    fontSize: "14px",
  },
  required: {
    color: "red",
    marginLeft: "4px",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "white",
    width: "100%",
    boxSizing: "border-box",
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
    boxSizing: "border-box",
  },
  formInline: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  cancelBtn: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
  },
  saveBtn: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
};
 
const EditUser = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    whatsappName: "",
    customerPhone: "",
    businessNumber: "",
    latestDate: "",
    latestTime: "",
    address: "",
    avatar: "",
  });
 
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    } else {
      setFormData({
        customerName: "",
        whatsappName: "",
        customerPhone: "",
        businessNumber: "",
        latestDate: "",
        latestTime: "",
        address: "",
        avatar: "",
      });
    }
    setErrors({});
  }, [user]);
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
 
  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Customer phone is required";
    if (!formData.businessNumber.trim()) newErrors.businessNumber = "Business number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.latestDate.trim()) newErrors.latestDate = "Date is required";
    if (!formData.latestTime.trim()) newErrors.latestTime = "Time is required";
    return newErrors;
  };
 
  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSave(formData);
    }
  };
 
  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        <div style={styles.body}>
          <div style={{ ...styles.card, ...styles.profileSection }}>
            <div style={styles.labelText}>Profile Photo</div>
            <div style={styles.helperText}>Upload a clear and recent profile photo.</div>
            <div style={styles.photoWrapper}>
              <img
                src={formData.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt="avatar"
                style={styles.avatar}
              />
              <label style={styles.editIcon}>
                <input type="file" accept="image/*" onChange={handleChange} name="avatar" style={{ display: "none" }} />
                ✏️
              </label>
            </div>
            <button
              style={styles.removeBtn}
              onClick={() => setFormData((prev) => ({ ...prev, avatar: "" }))}
            >
              Remove
            </button>
          </div>
 
          <div style={{ ...styles.card, ...styles.formSection }}>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>
                Customer Name <span style={styles.required}>*</span>
              </label>
              <input
                style={styles.input}
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
              />
              {errors.customerName && <div style={styles.errorText}>{errors.customerName}</div>}
            </div>
 
            <div style={styles.formInline}>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>
                  Customer Phone <span style={styles.required}>*</span>
                </label>
                <input
                  style={styles.input}
                  type="text"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
                {errors.customerPhone && <div style={styles.errorText}>{errors.customerPhone}</div>}
              </div>
 
              <div style={styles.formRow}>
                <label style={styles.formLabel}>
                  Business Number <span style={styles.required}>*</span>
                </label>
                <input
                  style={styles.input}
                  type="text"
                  name="businessNumber"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  placeholder="Enter business number"
                />
                {errors.businessNumber && <div style={styles.errorText}>{errors.businessNumber}</div>}
              </div>
            </div>
 
            <div style={styles.formInline}>
              <div style={styles.formRow}>
                <label style={styles.formLabel}>Latest Date</label>
                <input
                  style={styles.input}
                  type="date"
                  name="latestDate"
                  value={formData.latestDate || ""}
                  onChange={handleChange}
                />
              </div>
 
              <div style={styles.formRow}>
                <label style={styles.formLabel}>Latest Time</label>
                <input
                  style={styles.input}
                  type="time"
                  name="latestTime"
                  value={formData.latestTime || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
 
            <div style={styles.formRow}>
              <label style={styles.formLabel}>
                Address <span style={styles.required}>*</span>
              </label>
              <textarea
                style={styles.textarea}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
              />
              {errors.address && <div style={styles.errorText}>{errors.address}</div>}
            </div>
          </div>
        </div>
 
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.saveBtn} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};
 
export default EditUser;
 
 