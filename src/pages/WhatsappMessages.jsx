import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
 
 
const initialUsers = [
  {
    id: 1,
    owner: "Sumeet Kendre",
    lead: "John Doe",
    account: "Tech Corp",
    contact: "johndoe@example.com",
    phoneNoId: "+1 234-567-8901",
    chatStatus: "Active",
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    id: 2,
    owner: "Sumeet Kendre",
    lead: "Jane Smith",
    account: "Innovate Ltd",
    contact: "janesmith@example.com",
    phoneNoId: "+1 345-678-9012",
    chatStatus: "Inactive",
    avatar: "https://i.pravatar.cc/100?img=2"
  },
  {
    id: 3,
    owner: "Sumeet Kendre",
    lead: "Michael Brown",
    account: "BuildIt Inc.",
    contact: "michaelbrown@example.com",
    phoneNoId: "+1 456-789-0123",
    chatStatus: "Active",
    avatar: "https://i.pravatar.cc/100?img=3"
  },
  {
    id: 4,
    owner: "Sumeet Kendre",
    lead: "Emily White",
    account: "GrowMore",
    contact: "emilywhite@example.com",
    phoneNoId: "+1 567-890-1234",
    chatStatus: "Pending",
    avatar: "https://i.pravatar.cc/100?img=4"
  },
  {
    id: 5,
    owner: "Sumeet Kendre",
    lead: "David Johnson",
    account: "EcoWorld",
    contact: "davidjohnson@example.com",
    phoneNoId: "+1 678-901-2345",
    chatStatus: "Active",
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    id: 6,
    owner: "Sumeet Kendre",
    lead: "Olivia Martinez",
    account: "SmartHome",
    contact: "oliviam@example.com",
    phoneNoId: "+1 789-012-3456",
    chatStatus: "Inactive",
    avatar: "https://i.pravatar.cc/100?img=6"
  },
  {
    id: 7,
    owner: "Sumeet Kendre",
    lead: "William Taylor",
    account: "GreenTech",
    contact: "williamt@example.com",
    phoneNoId: "+1 890-123-4567",
    chatStatus: "Pending",
    avatar: "https://i.pravatar.cc/100?img=7"
  },
  {
    id: 8,
    owner: "Sumeet Kendre",
    lead: "Ava Lee",
    account: "SoftSolutions",
    contact: "aval@example.com",
    phoneNoId: "+1 901-234-5678",
    chatStatus: "Active",
    avatar: "https://i.pravatar.cc/100?img=8"
  }
];
 
 
 
 
function Message() {
  const [userList, setUserList] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
 
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
      const result = userList.filter((user) =>
        user.customerName.toLowerCase().includes(keyword)
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
 
  const handleDeleteUser = (userToDelete) => {
    setUserList((prev) => prev.filter((user) => user.id !== userToDelete.id));
  };
 
  const handleSaveUser = (formData) => {
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      avatar: `https://i.pravatar.cc/100?img=${Math.floor(
        Math.random() * 70
      ) + 1}`,
    };
    setUserList((prev) => [...prev, newUser]);
    setShowModal(false);
  };
 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);
 
 
  const UserForm = ({ show, setShowForm }) => {
   const [formData, setFormData] = useState({
  owner: "",
  lead: "",
  account: "",
  contact: "",
  phoneNoId: "",
  chatStatus: "Active", // default value like before
});
 
    const handleClose = () => setShowForm(false);
 
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
 
    const handleSaveUser = () => {
      console.log("Saved Data:", formData);
      handleClose();
    };
     const handleChangeCheckbox = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.checked,
  });
};
 
 
    return (
     <Modal show={show} onHide={handleClose} size="lg" centered>
  <Modal.Header closeButton>
    <Modal.Title className="w-100 text-center">New WhatsApp User</Modal.Title>
  </Modal.Header>
 
  <Modal.Body style={{height:'70vh',overflow:'scroll',scrollbarWidth:'none'}}>
    {/* User Info */}
   {/* User Information */}
<p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Information</p>
<Form>
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>WhatsApp Message Name</Form.Label>
      <Form.Control size="sm" type="text" name="whatsappMessageName" />
    </Col>
    <Col sm={6}>
      <Form.Label>Owner</Form.Label>
      <Form.Control size="sm" type="text" readOnly defaultValue="Sumeet Kendre" />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>BusinessPhoneNumber</Form.Label>
      <Form.Control size="sm" type="text" name="businessPhoneNumber" />
    </Col>
    <Col sm={6}>
      <Form.Label>Lead</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Search Leads..." />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>Phone number Id</Form.Label>
      <Form.Control size="sm" type="text" name="phoneNumberId" />
    </Col>
    <Col sm={6}>
      <Form.Label>Account</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Search Accounts..." />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>CustomerName</Form.Label>
      <Form.Control size="sm" type="text" name="customerName" />
    </Col>
    <Col sm={6}>
      <Form.Label>Contact</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Search Contacts..." />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>CustomerPhone</Form.Label>
      <Form.Control size="sm" type="text" name="customerPhone" />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Check label="Chat Status" name="chatStatus" />
    </Col>
    <Col sm={6}>
      <Form.Check label="Viewed By Agent" name="viewedByAgent" />
    </Col>
  </Row>
 
 
      {/* Message Content */}
      <p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Message Content</p>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>WhatsApp User</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Search WhatsApp Users..." />
        </Col>
        <Col sm={6}>
          <Form.Label>Messaging Session</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Search Messaging Sessions..." />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>WhatsApp Messaging Session</Form.Label>
          <Form.Control size="sm" type="text" placeholder="Search WhatsApp Messaging Sessions..." />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Message ID</Form.Label>
          <Form.Control size="sm" type="text" name="messageId" />
        </Col>
        <Col sm={6}>
          <Form.Label>Message Content</Form.Label>
          <Form.Control as="textarea" rows={2} size="sm" name="messageContent" />
        </Col>
      </Row>
 
      {/* Message Info */}
      <p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Message Info</p>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Parent Message ID</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Message Type</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Message Send Type</Form.Label>
          <Form.Select size="sm">
            <option>--None--</option>
          </Form.Select>
        </Col>
        <Col sm={3}>
          <Form.Label>Sent Date</Form.Label>
          <Form.Control size="sm" type="date" />
        </Col>
        <Col sm={3}>
          <Form.Label>Sent Time</Form.Label>
          <Form.Control size="sm" type="time" />
        </Col>
      </Row>
 
      {/* Media Section */}
      <p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Media</p>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Media ID</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Media SHA256</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Media Type</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Media Animated</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Reaction</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Media Link</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
      <p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Template</p>
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>Template Name</Form.Label>
      <Form.Control size="sm" type="text" name="templateName" />
    </Col>
    <Col sm={6}>
      <Form.Label>Order Number</Form.Label>
      <Form.Control size="sm" type="text" name="orderNumber" />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>Template Language</Form.Label>
      <Form.Control size="sm" type="text" name="templateLanguage" />
    </Col>
    <Col sm={6}>
      <Form.Label>Template Header URL</Form.Label>
      <Form.Control size="sm" type="text" name="templateHeaderUrl" />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>Template Header Type</Form.Label>
      <Form.Control size="sm" type="text" name="templateHeaderType" />
    </Col>
    <Col sm={6}>
      <Form.Label>Template Button Payload</Form.Label>
      <Form.Control size="sm" type="text" name="templateButtonPayload" />
    </Col>
  </Row>
 
  <Row className="mb-3">
    <Col sm={6}>
      <Form.Label>Template Button Text</Form.Label>
      <Form.Control size="sm" type="text" name="templateButtonText" />
    </Col>
  </Row>
 
      {/* Order / Interactive */}
      <p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Order / Interactive</p>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Order Detail</Form.Label>
          <Form.Control as="textarea" rows={2} size="sm" />
        </Col>
        <Col sm={6}>
          <Form.Label>Interactive Detail</Form.Label>
          <Form.Control as="textarea" rows={2} size="sm" />
        </Col>
      </Row>
 
      {/* Status Details */}
      <p className="fw-semibold fs-6 mb-2 text-center bg-light p-1">Status Details</p>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Message Status</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Timestamp</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Conversation ID</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Pricing Billable</Form.Label>
          <Form.Check type="checkbox" className="mt-2" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Conversation Expiration</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Pricing Model</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Conversation Origin</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
        <Col sm={6}>
          <Form.Label>Pricing Category</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>
    </Form>
  </Modal.Body>
 
  <Modal.Footer>
    <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" size="sm" className="rounded-pill" onClick={handleSaveUser}>
      Save
    </Button>
  </Modal.Footer>
</Modal>
 
 
    );
  };
 
 
 
 
  return (
    <>
      <div className="table-wrapper mt-5 pt-5 pt-lg-0">
        <h5 className="text-center text-dark"> Messages</h5>
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
 
          /* ---------- RESPONSIVE ---------- */
          @media screen and (max-width: 768px) {
            .table-wrapper {
              padding: 1rem;
            }
 
            .table-header {
            }
 
            .search {
              width: 170px;
            }
 
            .actions {
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
 
        <div className="table-container">
          <div className="table-scroll-wrapper">
            <table>
             <thead>
  <tr>
    <th>
      <input
        type="checkbox"
        checked={
          filteredData.length > 0 &&
          selectedUsers.length === filteredData.length
        }
        onChange={handleSelectAll}
      />
    </th>
    <th>Owner</th>
    <th>Lead</th>
    <th>Account</th>
    <th>Contact</th>
    <th>Phone No ID</th>
    <th>Chat Status</th>
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
          {user.owner}
        </div>
      </td>
      <td>{user.lead}</td>
      <td>{user.account}</td>
      <td>{user.contact}</td>
      <td>{user.phoneNoId}</td>
      <td>
        <span
          className={
            user.chatStatus === "Active"
              ? "status-active"
              : user.chatStatus === "Inactive"
              ? "status-inactive"
              : "status-pending"
          }
        >
          {user.chatStatus}
        </span>
      </td>
      <td>
        <button onClick={() => handleDeleteUser(user)}>...</button>
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
 
        <UserForm show={showModal} setShowForm={setShowModal} />
      </div>
    </>
  );
 
 
}
 
export default Message;