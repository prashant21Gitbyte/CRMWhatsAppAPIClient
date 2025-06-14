import React, { useState, useEffect } from "react"

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
    if (!formData.latestDate.trim()) newErrors.latestDate = "date is required";
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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>✖</button>
 
        <div className="modal-body">
          {/* Profile Section */}
          <div className="card profile-section">
            <div className="label-text">Profile Photo</div>
            <div className="helper-text">Upload a clear and recent profile photo.</div>
            <div className="photo-wrapper">
              <img
                src={
                  formData.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="avatar"
                className="avatar-preview"
              />
              <label className="edit-icon">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  name="avatar"
                />
                ✏️
              </label>
            </div>
            <button
              className="remove-button outlined"
              onClick={() => setFormData((prev) => ({ ...prev, avatar: "" }))}
            >
              Remove
            </button>
          </div>
 
          {/* Form Section */}
          <div className="card form-section">
            <div className="form-row">
              <label className="form-label">
                Customer Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
              />
              {errors.customerName && <div className="error-text">{errors.customerName}</div>}
            </div>
 
            {/* <div className="form-row">
              <label className="form-label">WhatsApp Username</label>
              <input
                type="text"
                name="whatsappName"
                value={formData.whatsappName}
                onChange={handleChange}
                placeholder="Enter WhatsApp username"
              />
            </div> */}
 
            <div className="form-inline">
              <div className="form-row" style={{ flex: 1 }}>
                <label className="form-label">
                  Customer Phone <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
                {errors.customerPhone && <div className="error-text">{errors.customerPhone}</div>}
              </div>
 
              <div className="form-row" style={{ flex: 1 }}>
                <label className="form-label">
                  Business Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="businessNumber"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  placeholder="Enter business number"
                />
                {errors.businessNumber && <div className="error-text">{errors.businessNumber}</div>}
              </div>
            </div>
 
            <div className="form-inline">
              <div className="form-row" style={{ flex: 1 }}>
                <label className="form-label">Latest Date</label>
                <input
                  type="date"
                  name="latestDate"
                  value={formData.latestDate || ""}
                  onChange={handleChange}
                />
              </div>
 
              <div className="form-row" style={{ flex: 1 }}>
                <label className="form-label">Latest Time</label>
                <input
                  type="time"
                  name="latestTime"
                  value={formData.latestTime || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
 
            <div className="form-row">
              <label className="form-label">
                Address <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
              />
              {errors.address && <div className="error-text">{errors.address}</div>}
            </div>
          </div>
        </div>
 
        <div className="form-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default EditUser;
 