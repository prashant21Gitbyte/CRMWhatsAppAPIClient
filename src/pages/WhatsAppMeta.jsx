import React, { useState, useEffect } from "react";
// import { Megaphone, Bell, Key } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
 
const initialUsers = [
  {
    id: "1",
    customerName: "Ramesh Kumar",
    whatsappName: "Ramesh",
    customerPhone: "9876543210",
    businessNumber: "BR12345",
    designation: "Sales Executive",
    department: "Sales",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    customerName: "Suresh Gupta",
    whatsappName: "Suresh",
    customerPhone: "9123456780",
    businessNumber: "BR54321",
    designation: "Accountant",
    department: "Finance",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    customerName: "Priya Sharma",
    whatsappName: "Priya",
    customerPhone: "9988776655",
    businessNumber: "BR67890",
    designation: "Marketing Manager",
    department: "Marketing",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    customerName: "Anil Mehta",
    whatsappName: "Anil",
    customerPhone: "9871234560",
    businessNumber: "BR98765",
    designation: "HR Executive",
    department: "HR",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "5",
    customerName: "Geeta Verma",
    whatsappName: "Geeta",
    customerPhone: "9823456789",
    businessNumber: "BR45678",
    designation: "Operations Lead",
    department: "Operations",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: "6",
    customerName: "Manoj Yadav",
    whatsappName: "Manoj",
    customerPhone: "9812345678",
    businessNumber: "BR11223",
    designation: "Logistics Manager",
    department: "Logistics",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: "7",
    customerName: "Sneha Joshi",
    whatsappName: "Sneha",
    customerPhone: "9900112233",
    businessNumber: "BR33445",
    designation: "Customer Support",
    department: "Support",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
 
];
 
function App() {
  const [userList, setUserList] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [showModal, setShowModal] = useState(false);
 
 
 
  useEffect(() => {
    setFilteredData(userList);
    setCurrentPage(1);
  }, [userList]);
 
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setCurrentPage(1);
    if (keyword === "") {
      setFilteredData(userList);
    } else {
      const result = userList.filter(
        (user) =>
          user.customerName.toLowerCase().includes(keyword) ||
          user.whatsappName?.toLowerCase().includes(keyword) ||
          user.customerPhone?.toLowerCase().includes(keyword)
      );
      setFilteredData(result);
    }
  };
 
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredData.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };
 
  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };
 
  const isAllSelected =
    filteredData.length > 0 && selectedUsers.length === filteredData.length;
 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);
 
  return (
    <div className="table-wrapper mt-5 pt-5 pt-lg-0">
      <h5 className="text-center text-dark">Meta Template</h5>
 
      <style>{`
        .table-wrapper {
          padding: 2rem;
          background: #f9fafb;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: auto;
        }
 
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
 
        .search {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          width: 220px;
          font-size: 0.875rem;
          background-color: #fff;
        }
 
        .actions {
          display: flex;
          gap: 0.75rem;
        }
 
        .export-btn,
        .add-btn {
          display: flex;
          align-items: center;
          background-color: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: #475569;
          cursor: pointer;
          transition: background 0.2s ease;
        }
 
        .export-btn:hover,
        .add-btn:hover {
          background-color: #f1f5f9;
        }
 
        .table-container {
          width: 100%;
        }
 
        .table-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
        }
 
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          min-width: 900px;
        }
 
        thead {
          background-color: #f1f5f9;
        }
 
        th {
          padding: 0.85rem 1.2rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
          border-bottom: 1px solid #e5e7eb;
        }
 
        td {
          padding: 0.85rem 1.2rem;
          font-size: 0.875rem;
          color: #4b5563;
          border-bottom: 1px solid #f1f5f9;
        }
 
        tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
 
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 0.5rem;
        }
 
        .user-name-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
 
        .status-active {
          color: #16a34a;
          font-weight: 500;
        }
 
        .status-inactive {
          color: #dc2626;
          font-weight: 500;
        }
 
        .pagination {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }
 
        .pagination button {
          padding: 6px 12px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
 
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
 
        @media screen and (max-width: 768px) {
          .table-wrapper {
            padding: 1rem;
          }
 
          .search {
            width: 170px;
          }
 
          .export-btn,
          .add-btn {
            width: 100%;
            justify-content: center;
          }
 
          .table-scroll-wrapper {
            overflow-x: auto;
          }
 
          table {
            min-width: 900px;
          }
 
          .pagination {
            flex-direction: column;
            gap: 8px;
            margin-top: 2rem;
          }
        }
      `}</style>
 
      <div className="table-header">
        <input
          type="text"
          placeholder="Search users..."
          className="search"
          value={search}
          onChange={handleSearch}
        />
        <div className="actions">
          <button className="export-btn">Export</button>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Add
          </button>
        </div>
      </div>
 
      <div className="table-scroll-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Business Number</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>
                  <div className="user-name-cell">
                    <img src={user.avatar} className="avatar" alt="avatar" />
                    {user.customerName}
                  </div>
                </td>
                <td>{user.customerPhone}</td>
                <td>{user.businessNumber}</td>
                <td>{user.designation}</td>
                <td>{user.department}</td>
                <td
                  className={
                    user.status === "Inactive"
                      ? "status-inactive"
                      : "status-active"
                  }
                >
                  {user.status}
                </td>
                <td>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
 
      <Meta show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
 
}
 
 
function Meta({ show, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("Marketing");
  const [selectedOptions, setSelectedOptions] = useState({ Custom: true });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [buttons, setButtons] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
 
  const [buttonErrors, setButtonErrors] = useState({});
 
  const maxButtons = 10;
 
 const handleAddButton = (type) => {
  const countByType = buttons.reduce((acc, btn) => {
    acc[btn.type] = (acc[btn.type] || 0) + 1;
    return acc;
  }, {});
 
  const newErrors = {};
 
  if (buttons.length >= maxButtons) {
    newErrors[type] = "You can only add up to 10 buttons.";
  } else if (type === "Call Phone Number" && countByType["Call Phone Number"] >= 1) {
    newErrors[type] = "You can only add one 'Call Phone' button.";
  } else if (type === "Copy offer code" && countByType["Copy offer code"] >= 1) {
    newErrors[type] = "You can only add one 'Offer Code' button.";
  } else if (type === "Visit website" && countByType["Visit website"] >= 2) {
    newErrors[type] = "You can only add up to two 'Visit Website' buttons.";
  }
 
  if (Object.keys(newErrors).length > 0) {
    setButtonErrors(newErrors);
    return;
  }
 
  setButtonErrors({});
 
setButtonErrors((prev) => {
  const updated = { ...prev };
  delete updated[type];
  return updated;
});
 
  const newButton = {
    id: Date.now(),
    type,
    data:
      type === "Custom"
        ? { label: "" }
        : type === "Visit website"
        ? { urlType: "Dynamic", url: "" }
        : type === "Call Phone Number"
        ? { countryCode: "+91", phone: "" }
        : type === "Copy offer code"
        ? { offerCode: "" }
        : {},
  };
 
  setButtons((prev) => [...prev, newButton]);
};
 
 
  const handleFieldChange = (id, field, value) => {
    setButtons((prev) =>
      prev.map((btn) =>
        btn.id === id
          ? { ...btn, data: { ...btn.data, [field]: value } }
          : btn
      )
    );
  };
 
  const removeButton = (id) => {
    setButtons((prev) => prev.filter((btn) => btn.id !== id));
  };
 
  const [formData, setFormData] = useState({
    templateName: "",
    language: "English",
    variable: "Number",
    headerType: "None",
    body: "",
    footer: "",
  });
 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedOptions({});
  };
 
  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };
 
  const getOptions = () => {
    switch (selectedCategory) {
      case "Marketing":
        return [
          {
            key: "Custom",
            description:
              "Send promotions or announcements to increase awareness and engagement.",
            disabled: false,
          },
          {
            key: "Catalogue",
            description:
              "Send messages about your entire catalogue or multiple products from it.",
            disabled: true,
          },
          {
            key: "Calling permissions request",
            description:
              "Ask customers if you can call them on WhatsApp.",
            disabled: true,
          },
        ];
      case "Utility":
        return [
          {
            key: "Custom",
            description:
              "Send promotions or announcements to increase awareness and engagement.",
            disabled: false,
          },
          {
            key: "Calling permissions request",
            description: "Ask customers if you can call them on WhatsApp.",
            disabled: true,
          },
        ];
      case "Authentication":
        return [
          {
            key: "One-time Passcode",
            description:
              "Send a one-time passcode for authentication purposes.",
            disabled: false,
          },
        ];
      default:
        return [];
    }
  };
  const handleSave = () => {
    console.log("Saved Template:", { selectedCategory, selectedOptions });
    onClose?.();
  };
 
  const handleSaveAndNew = () => {
    console.log("Saved & New:", { selectedCategory, selectedOptions });
    setSelectedCategory("Marketing");
    setSelectedOptions({ Custom: true });
  };
  const isAnyOptionSelected = () => {
  return Object.values(selectedOptions).some((val) => val === true);
};
  const [step, setStep] = useState(1);
 
 
  const styles = {
    sectionTitle: { fontSize: "15px", fontWeight: 600, marginBottom: "10px", color: "#333" },
    categoryTabs: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "16px",
      marginBottom: "16px",
    },
    tab: (active) => ({
      padding: "6px 12px",
      borderRadius: "20px",
      background: active
        ? "linear-gradient(90deg, #1e2a5a 0%, #1852a1 100%)"
        : "#f1f1f1",
      color: active ? "#fff" : "#555",
      fontWeight: active ? 600 : 500,
      fontSize: "13px",
      cursor: "pointer",
      textAlign: "center",
      minWidth: "120px",
      transition: "all 0.2s ease",
      boxShadow: active ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
    })
    ,
    checkboxLabel: {
      fontSize: "13px",
      color: "#333",
      display: "block",
      marginBottom: "12px",
      background: "#f9f9f9",
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #eee",
    },
    descriptionText: {
      fontSize: "12px",
      color: "#777",
      marginTop: "4px",
      marginLeft: "24px",
      display: "block",
    },
    primaryBtn: {
      backgroundColor: "#0070f3",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "6px 20px",
      fontSize: "13px",
      fontWeight: 500,
    },
    secondaryBtn: {
      backgroundColor: "white",
      color: "#0070f3",
      border: "1px solid #ccc",
      borderRadius: "20px",
      padding: "6px 20px",
      fontSize: "13px",
      fontWeight: 500,
    },
  };
 
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton style={{ background: "#f8f9fa", borderBottom: "none" }}>
        <Modal.Title style={{ fontWeight: 600, fontSize: "17px" }}>
          WhatsApp Template
        </Modal.Title>
      </Modal.Header>
 
      <Modal.Body style={{
        height: "70vh",
        overflow: "scroll",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
        padding: "2rem",
        scrollbarWidth: 'none'
      }} >
        {step === 1 ? (
          <div>
  <h5 style={styles.sectionTitle}>Set up your template</h5>
  <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
    Choose the category that best describes your message template. Then, select the type of message that you want to send.
  </p>
 
  <div style={styles.categoryTabs}>
    {["Marketing", "Utility", "Authentication"].map((cat) => (
      <div
        key={cat}
        style={styles.tab(selectedCategory === cat)}
        onClick={() => handleCategoryChange(cat)}
      >
        {cat}
      </div>
    ))}
  </div>
 
  <div>
    {getOptions().map((opt) => (
      <label key={opt.key} style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={!!selectedOptions[opt.key]}
          onChange={() => handleCheckboxChange(opt.key)}
          disabled={opt.disabled}
          style={{ marginRight: "10px" }}
        />
        <strong style={{ opacity: opt.disabled ? 0.6 : 1 }}>{opt.key}</strong>
        <span style={{ ...styles.descriptionText, opacity: opt.disabled ? 0.6 : 1 }}>
          {opt.description}
        </span>
      </label>
    ))}
  </div>
 
 
</div>
        ) : (
          <>
            <h5 style={styles.sectionTitle}>Template Configuration</h5>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
              Fill in your template information.
            </p>
 
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <input
                className="form-control"
                placeholder="Template Name"
                value={formData.templateName}
                onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
              />
 
              <select
                className="form-control"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
 
            <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
              <h6 style={{ fontWeight: 600 }}>Content</h6>
              <p style={{ fontSize: "13px", color: "#666" }}>
                Fill in the header, body and footer sections of your template.
              </p>
 
 
              <div style={{ marginBottom: "16px" }}>
                <label style={{ marginBottom: "4px", display: "block", fontWeight: 500 }}>Variable</label>
                <select
                  className="form-control"
                  value={formData.variable}
                  onChange={(e) => setFormData({ ...formData, variable: e.target.value })}
                >
                  <option value="Number">Number</option>
                  <option value="Text">Text</option>
                  <option value="Name">Name</option>
                </select>
              </div>
 
 
              <div style={{ marginBottom: "16px" }}>
                <label style={{ marginBottom: "4px", display: "block", fontWeight: 500 }}>
                  Header (Optional)
                </label>
                <select
                  className="form-control"
                  value={formData.headerType}
                  onChange={(e) => setFormData({ ...formData, headerType: e.target.value })}
                >
                  <option value="None">None</option>
                  <option value="Text">Text</option>
                  <option value="Image">Image</option>
                  <option value="Video">Video</option>
                  <option value="Document">Document</option>
                  <option value="Location">Location</option>
                </select>
              </div>
 
              {/* Header Text Field */}
              {formData.headerType === "Text" && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontWeight: 500 }}>Enter Header Text</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter header text"
                    value={formData.headerText || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        headerText: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
 
 
              {["Image", "Video", "Document"].includes(formData.headerType) && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontWeight: 500 }}>Upload {formData.headerType}</label>
                  <input type="file" className="form-control" />
                </div>
              )}
 
 
 
              <div style={{ marginBottom: "16px" }}>
                <label style={{ marginBottom: "4px", display: "block", fontWeight: 500 }}>
                  Enter Body
                </label>
 
                <textarea
                  rows={4}
                  className="form-control"
                  placeholder=""
                  value={formData.body}
                  onChange={(e) => {
                    const newBody = e.target.value;
                    const matches = [...newBody.matchAll(/{{(\d+)}}/g)].map((m) => m[1]);
                    const uniqueVariables = [...new Set(matches)];
 
                    setFormData({
                      ...formData,
                      body: newBody,
                      bodyError: "", // Clear error always
                      variableSamples: uniqueVariables.reduce((acc, num) => {
                        acc[num] = formData.variableSamples?.[num] || "";
                        return acc;
                      }, {}),
                    });
                  }}
                />
 
                <div style={{ fontSize: "12px", color: "orange", marginTop: "4px" }}>
                  {formData.bodyError}
                </div>
              </div>
 
              {Object.keys(formData.variableSamples || {}).length > 0 && (
                <div style={{ marginBottom: "16px", border: "1px solid #ccc", borderRadius: "8px", padding: "16px", background: "#f8f9fa" }}>
                  <h6 style={{ fontWeight: 600, marginBottom: "8px" }}>Variable Samples</h6>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
                    Include samples of all variables in your message to help Meta review your template.
                    Remember not to include any customer information to protect your customer’s privacy.
                  </p>
 
                  {Object.entries(formData.variableSamples).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input
                          className="form-control"
                          value={`{{${key}}}`}
                          disabled
                          style={{ maxWidth: "80px", background: "#e9ecef", border: "1px solid #ccc" }}
                        />
                        <input
                          className="form-control"
                          placeholder={`Enter content for {{${key}}}`}
                          value={value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              variableSamples: {
                                ...prev.variableSamples,
                                [key]: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      {!value && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                          Add sample text
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: "24px" }}>
                <label style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Buttons (Optional)
                </label>
 
 
                {buttons.length < maxButtons && (
  <div style={{ marginBottom: "16px", display: "inline-block", width: "100%" }}>
    <select
      className="form-select form-select-sm"
      onChange={(e) => {
        if (e.target.value) {
          handleAddButton(e.target.value);
          e.target.selectedIndex = 0;
        }
      }}
      style={{
        width: "150px",
        padding: "4px 8px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ced4da",
        display: "inline-block"
      }}
    >
      <option value="">Add Buttons</option>
      <option value="Custom">Custom</option>
      <option value="Visit website">Visit website</option>
      <option value="Call Phone Number">Call Phone</option>
      <option value="Copy offer code">Offer Code</option>
    </select>
 
    {/* ✅ Show error below only if that type has error */}
    {Object.entries(buttonErrors).map(([type, message]) => (
      <div key={type} style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
        {message}
      </div>
    ))}
  </div>
)}
 
 
 
 
                {buttons.map((btn) => (
                  <div
                    key={btn.id}
                    className="row gx-2 gy-2 align-items-center mb-3 p-0 p-lg-3"
                    style={{
                      background: "#f8f9fa",
                      borderRadius: "6px"
                    }}
                  >
 
                    {btn.type === "Custom" && (
                      <>
 
                        <div className="col-10 col-md-9">
                          <input
                            placeholder="Enter custom "
                            value={btn.data.label || ""}
                            onChange={(e) => handleFieldChange(btn.id, "label", e.target.value)}
                            className="form-control"
                            style={{ height: "40px", fontSize: "14px" }}
                          />
                        </div>
                      </>
                    )}
 
 
                    {btn.type === "Visit website" && (
                      <>
                        <div className="col-4 col-md-3">
                          <select
                            value={btn.data.urlType || "Dynamic"}
                            onChange={(e) => handleFieldChange(btn.id, "urlType", e.target.value)}
                            className="form-control"
                            style={{ height: "40px", fontSize: "14px" }}
                          >
                            <option value="Dynamic">Dynamic</option>
                            <option value="Static">Static</option>
                          </select>
                        </div>
                        <div className="col-6 col-md-6">
                          <input
                            placeholder="Website URL"
                            value={btn.data.url}
                            onChange={(e) => handleFieldChange(btn.id, "url", e.target.value)}
                            className="form-control"
                            style={{ height: "40px", fontSize: "14px" }}
                          />
                        </div>
                      </>
                    )}
 
 
                    {btn.type === "Call Phone Number" && (
                      <>
                        <div className="col-4 col-md-3">
                          <select
                            value={btn.data.countryCode || "+91"}
                            onChange={(e) => handleFieldChange(btn.id, "countryCode", e.target.value)}
                            className="form-control"
                            style={{ height: "40px", fontSize: "14px" }}
                          >
                            <option value="+91">🇮🇳 India (+91)</option>
                            <option value="+1">🇺🇸 USA (+1)</option>
                            <option value="+44">🇬🇧 UK (+44)</option>
                            <option value="+61">🇦🇺 Australia (+61)</option>
                            <option value="+971">🇦🇪 UAE (+971)</option>
                          </select>
                        </div>
                        <div className="col-6 col-md-6">
                          <input
                            placeholder="Phone number"
                            value={btn.data.phone}
                            onChange={(e) => handleFieldChange(btn.id, "phone", e.target.value)}
                            className="form-control"
                            style={{ height: "40px", fontSize: "14px" }}
                          />
                        </div>
                      </>
                    )}
 
 
                    {btn.type === "Copy offer code" && (
                      <>
                        <div className="col-4 col-md-3">
                          <input
                            value="Copy Offer Code"
                            disabled
                            className="form-control"
                            style={{
                              height: "40px",
                              fontSize: "14px",
                              backgroundColor: "#e9ecef"
                            }}
                          />
                        </div>
                        <div className="col-6 col-md-6">
                          <input
                            placeholder="Offer Code"
                            value={btn.data.offerCode}
                            onChange={(e) => handleFieldChange(btn.id, "offerCode", e.target.value)}
                            className="form-control"
                            style={{ height: "40px", fontSize: "14px" }}
                          />
                        </div>
                      </>
                    )}
 
 
                    <div className="col-2 col-md-auto">
  <button
    onClick={() => removeButton(btn.id)}
    className="btn p-0 border-0 bg-transparent"
    style={{
      fontSize: "18px",
      color: "#000",
      lineHeight: "1"
    }}
    title="Remove"
  >
    ✕
  </button>
</div>
 
                   
                  </div>
                ))}
 
 
 
              </div>
            </div>
          </>
        )}
      </Modal.Body>
 
      <Modal.Footer className="d-flex  flex-md-row justify-content-end gap-2" style={{ background: "#f8f9fa", borderTop: "none" }}>
        <Button variant="outline-primary" style={styles.secondaryBtn} onClick={onClose}>
          Cancel
        </Button>
 
        {step === 2 && (
          <Button variant="outline-primary" style={styles.secondaryBtn} onClick={() => setStep(1)}>
            Previous
          </Button>
        )}
 
        <Button
  variant="primary"
  disabled={step === 1 && !isAnyOptionSelected()}
  style={{
    borderRadius: "20px",
    padding: "6px 20px",
    fontSize: "14px",
    fontWeight: 600,
    background: "linear-gradient(90deg, #1e2a5a 0%, #1852a1 100%)",
    border: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    opacity: step === 1 && !isAnyOptionSelected() ? 0.5 : 1,
    pointerEvents: step === 1 && !isAnyOptionSelected() ? "none" : "auto",
  }}
  onClick={() => {
    if (step === 1) {
      setStep(2);
    } else {
      handleSave();
    }
  }}
>
  {step === 1 ? "Next" : "Save"}
</Button>
 
      </Modal.Footer>
    </Modal>
  );
};
export default App;
 
 