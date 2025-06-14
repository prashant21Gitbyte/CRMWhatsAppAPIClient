import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
 
function App() {
  const initialTemplates = [
  {
    id: "1",
    templateId: "TMP-001",
    analyticsName: "Welcome Message",
    amountSpent: "₹250",
    delivered: "Yes",
    avatar: "https://i.pravatar.cc/100?img=1",
    startDate: "2024-05-01",
    endDate: "2024-05-02",
  },
  {
    id: "2",
    templateId: "TMP-002",
    analyticsName: "Order Confirmation",
    amountSpent: "₹180",
    delivered: "Yes",
    avatar: "https://i.pravatar.cc/100?img=2",
    startDate: "2024-05-03",
    endDate: "2024-05-04",
  },
  {
    id: "3",
    templateId: "TMP-003",
    analyticsName: "Cart Abandonment",
    amountSpent: "₹300",
    delivered: "No",
    avatar: "https://i.pravatar.cc/100?img=3",
    startDate: "2024-05-06",
    endDate: "2024-05-07",
  },
  {
    id: "4",
    templateId: "TMP-004",
    analyticsName: "Feedback Request",
    amountSpent: "₹210",
    delivered: "Yes",
    avatar: "https://i.pravatar.cc/100?img=4",
    startDate: "2024-05-08",
    endDate: "2024-05-09",
  },
  {
    id: "5",
    templateId: "TMP-005",
    analyticsName: "Delivery Update",
    amountSpent: "₹195",
    delivered: "Yes",
    avatar: "https://i.pravatar.cc/100?img=5",
    startDate: "2024-05-10",
    endDate: "2024-05-11",
  },
  {
    id: "6",
    templateId: "TMP-006",
    analyticsName: "Offer Notification",
    amountSpent: "₹275",
    delivered: "No",
    avatar: "https://i.pravatar.cc/100?img=6",
    startDate: "2024-05-12",
    endDate: "2024-05-13",
  },
  {
    id: "7",
    templateId: "TMP-007",
    analyticsName: "Thank You Message",
    amountSpent: "₹220",
    delivered: "Yes",
    avatar: "https://i.pravatar.cc/100?img=7",
    startDate: "2024-05-14",
    endDate: "2024-05-15",
  },
];
 
 
  const [userList, setUserList] = useState(initialTemplates);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialTemplates);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const usersPerPage = 10;
 
  const [formData, setFormData] = useState({
    name: "",
    templateId: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    sent: "",
    delivered: "",
    read: "",
    amountSpent: "",
    costPerClick: "",
  });
 
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
          user.templateId.toLowerCase().includes(keyword) ||
          user.analyticsName?.toLowerCase().includes(keyword)
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
 
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSave = () => {
    const newTemplate = {
      id: Date.now().toString(),
      templateId: formData.templateId,
      analyticsName: formData.name,
      amountSpent: formData.amountSpent,
      delivered: formData.delivered,
      avatar: "https://i.pravatar.cc/100",
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    setUserList([newTemplate, ...userList]);
    setShowModal(false);
    setFormData({
      name: "",
      templateId: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      sent: "",
      delivered: "",
      read: "",
      amountSpent: "",
      costPerClick: "",
    });
  };
 
  
 
  const TemplateAnalyticsModal = ({ show, setShowModal, formData, handleFormChange, handleSave }) => {
    const handleClose = () => setShowModal(false);
  
    const inputStyle = {
      borderRadius: "10px",
      padding: "6px 12px",
      fontSize: "14px",
      height: "36px",
      border: "1px solid #ced4da",
      boxShadow: "none",
      transition: "all 0.2s ease-in-out",
    };
  
    const labelStyle = {
      fontWeight: 500,
      color: "#333",
      fontSize: "14px",
    };
  
    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        {/* Header */}
        <Modal.Header closeButton style={{ background: "#f8f9fa", borderBottom: "none" }}>
          <Modal.Title style={{ fontWeight: 600, fontSize: "18px" }}>
            New Template Analytics
          </Modal.Title>
        </Modal.Header>
  
        {/* Body */}
        <Modal.Body
          style={{
            padding: "2rem",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
          }}
        >
          <Form>
            <Row className="mb-3">
              <Col md={4} className="mb-2 mb-md-0">
                <Form.Label style={labelStyle}>Analytics Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter analytics name"
                  value={formData.name}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col md={4} className="mb-2 mb-md-0">
                <Form.Label style={labelStyle}>Template ID</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="templateId"
                  placeholder="Enter template ID"
                  value={formData.templateId}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label style={labelStyle}>Start & End Date</Form.Label>
              </Col>
              <Col xs={6} md={4}>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </Col>
            </Row>
  
            {["sent", "delivered", "read", "amountSpent", "costPerClick"].map((field, idx) => (
              <Row className="mb-3" key={idx}>
                <Col md={4} className="mb-2 mb-md-0">
                  <Form.Label style={labelStyle}>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type="text"
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={formData[field]}
                    onChange={handleFormChange}
                    style={inputStyle}
                  />
                </Col>
              </Row>
            ))}
          </Form>
        </Modal.Body>
  
        {/* Footer */}
        <Modal.Footer
          style={{
            background: "#f8f9fa",
            borderTop: "none",
            padding: "1rem 2rem",
          }}
        >
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            style={{
              borderRadius: "20px",
              padding: "6px 20px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            style={{
              borderRadius: "20px",
              padding: "6px 20px",
              fontSize: "14px",
              fontWeight: 600,
              background: "linear-gradient(90deg, #1e2a5a 0%, #1852a1 100%)",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  
  
 
 
 
  return (
    <div className="table-wrapper mt-5  pt-5 pt-lg-0">
      <div>
 
      <h5 className="text-center text-dark">Template Analytics</h5>
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
 
        .table-scroll-wrapper {
          max-height: 400px;
          overflow-y: auto;
          overflow-x: auto;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
 
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }
 
        thead {
          background-color: #f1f5f9;
          position: sticky;
          top: 0;
          z-index: 1;
        }
 
        th {
          padding: 0.85rem 1.2rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f1f5f9;
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
          placeholder="Search templates..."
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
              <th>Template ID</th>
              <th>Analytics Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount Spent</th>
              <th>Delivered</th>
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
                    <img src={user.avatar} alt="avatar" className="avatar" />
                    {user.templateId}
                  </div>
                </td>
                <td>{user.analyticsName}</td>
                <td>{user.startDate || "-"}</td>
                <td>{user.endDate || "-"}</td>
                <td>{user.amountSpent}</td>
                <td
                  className={
                    user.delivered === "Yes"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {user.delivered}
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
 
      </div>
      
       <TemplateAnalyticsModal
        show={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleFormChange={handleFormChange}
        handleSave={handleSave}
      />
    </div>
  );
}
 
export default App;
 
 