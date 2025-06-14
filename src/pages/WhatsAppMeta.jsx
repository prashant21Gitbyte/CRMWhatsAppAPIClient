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
    sectionTitle: { fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' },
    categoryTabs: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '20px',
      marginBottom: '12px'
    },
    tab: (active) => ({
      paddingBottom: '6px',
      fontWeight: 'bold',
      fontSize: '13px',
      borderBottom: !isMobile && active ? '2px solid #0070f3' : 'none',
      color: active ? '#0070f3' : '#555',
      cursor: 'pointer'
    }),
    checkboxRow: { display: 'flex', flexDirection: 'column', gap: '12px' },
    primaryBtn: {
      backgroundColor: '#0070f3',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 16px',
      fontSize: '12px',
      cursor: 'pointer'
    },
    secondaryBtn: {
      backgroundColor: 'white',
      color: '#0070f3',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '8px 16px',
      fontSize: '12px',
      cursor: 'pointer'
    }
  };
 
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>WhatsApp Template</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1.5rem" }}>
        <h4 style={styles.sectionTitle}>Set up your template</h4>
        <p style={{ fontSize: '12px' }}>
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
        <div style={styles.checkboxRow}>
          {getOptions().map((opt) => (
            <label key={opt} style={{ fontSize: '12px' }}>
              <input
                type="checkbox"
                checked={!!selectedOptions[opt]}
                onChange={() => handleCheckboxChange(opt)}
                disabled={selectedCategory === "Marketing" && opt !== "Custom"}
              />{" "}
              <strong>{opt}</strong><br />
              {opt === "Custom" && selectedCategory === "Marketing" && (
                <span style={{ fontSize: '11px', color: '#555' }}>
                  Send promotions or announcements to increase awareness and engagement.
                </span>
              )}
              {opt === "Catalogue" && selectedCategory === "Marketing" && (
                <span style={{ fontSize: '11px', color: '#999' }}>
                  Send messages about your entire catalogue or multiple products from it.
                </span>
              )}
              {opt === "Calling permissions request" && selectedCategory === "Marketing" && (
                <span style={{ fontSize: '11px', color: '#999' }}>
                  Ask customers if you can call them on WhatsApp.
                </span>
              )}
            </label>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column flex-md-row justify-content-end gap-2">
        <Button variant="outline-primary" style={styles.secondaryBtn} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline-primary" style={styles.secondaryBtn} onClick={handleSaveAndNew}>
          Save & New
        </Button>
        <Button variant="primary" style={styles.primaryBtn} onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
 
 
 
export default App;