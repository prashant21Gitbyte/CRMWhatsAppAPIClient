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
    if (selectedCategory === "Marketing") return ["Custom", "Catalogue", "Calling permissions request"];
    if (selectedCategory === "Utility") return ["Order Update", "Payment Update"];
    if (selectedCategory === "Authentication") return ["OTP"];
    return [];
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
 
      <Modal.Body style={{ padding: "2rem", background: "#fff" }}>
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
            <label key={opt} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={!!selectedOptions[opt]}
                onChange={() => handleCheckboxChange(opt)}
                disabled={selectedCategory === "Marketing" && opt !== "Custom"}
                style={{ marginRight: "10px" }}
              />
              <strong>{opt}</strong>
              {opt === "Custom" && selectedCategory === "Marketing" && (
                <span style={styles.descriptionText}>
                  Send promotions or announcements to increase awareness and engagement.
                </span>
              )}
              {opt === "Catalogue" && selectedCategory === "Marketing" && (
                <span style={styles.descriptionText}>
                  Send messages about your entire catalogue or multiple products from it.
                </span>
              )}
              {opt === "Calling permissions request" && selectedCategory === "Marketing" && (
                <span style={styles.descriptionText}>
                  Ask customers if you can call them on WhatsApp.
                </span>
              )}
            </label>
          ))}
        </div>
      </Modal.Body>
 
      <Modal.Footer className="d-flex flex-column flex-md-row justify-content-end gap-2" style={{ background: "#f8f9fa", borderTop: "none" }}>
        <Button variant="outline-primary" style={styles.secondaryBtn} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline-primary" style={styles.secondaryBtn} onClick={handleSaveAndNew}>
          Save & New
        </Button>
        <Button variant="primary" style={styles.primaryBtn} onClick={handleSave}   style={{
              borderRadius: "20px",
              padding: "6px 20px",
              fontSize: "14px",
              fontWeight: 600,
              background: "linear-gradient(90deg, #1e2a5a 0%, #1852a1 100%)",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
 
 
 
export default App;
 