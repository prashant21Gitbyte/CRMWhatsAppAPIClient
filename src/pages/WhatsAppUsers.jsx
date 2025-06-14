import React, { useState, useEffect } from "react";
 
 
const initialUsers = [
  {
    id: 1,
    whatsappUserName: "john_doe_wa",
    customerName: "John Doe",
    customerPhone: "+1 234-567-8901",
    businessNumber: "+1 987-654-3210",
    latestDate: "2025-06-10",
    latestTime: "14:30",
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "Active"
  },
  {
    id: 2,
    whatsappUserName: "jane_smith_wa",
    customerName: "Jane Smith",
    customerPhone: "+1 345-678-9012",
    businessNumber: "+1 876-543-2109",
    latestDate: "2025-06-11",
    latestTime: "10:15",
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "Inactive"
  },
  {
    id: 3,
    whatsappUserName: "michael_b_wa",
    customerName: "Michael Brown",
    customerPhone: "+1 456-789-0123",
    businessNumber: "+1 765-432-1098",
    latestDate: "2025-06-12",
    latestTime: "09:45",
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "Active"
  },
  {
    id: 4,
    whatsappUserName: "emily_w_wa",
    customerName: "Emily White",
    customerPhone: "+1 567-890-1234",
    businessNumber: "+1 654-321-0987",
    latestDate: "2025-06-13",
    latestTime: "16:20",
    avatar: "https://i.pravatar.cc/100?img=4",
    status: "Pending"
  },
  {
    id: 5,
    whatsappUserName: "david_j_wa",
    customerName: "David Johnson",
    customerPhone: "+1 678-901-2345",
    businessNumber: "+1 543-210-9876",
    latestDate: "2025-06-12",
    latestTime: "11:05",
    avatar: "https://i.pravatar.cc/100?img=5",
    status: "Active"
  },
  {
    id: 6,
    whatsappUserName: "olivia_m_wa",
    customerName: "Olivia Martinez",
    customerPhone: "+1 789-012-3456",
    businessNumber: "+1 432-109-8765",
    latestDate: "2025-06-11",
    latestTime: "13:50",
    avatar: "https://i.pravatar.cc/100?img=6",
    status: "Inactive"
  },
  {
    id: 7,
    whatsappUserName: "will_t_wa",
    customerName: "William Taylor",
    customerPhone: "+1 890-123-4567",
    businessNumber: "+1 321-098-7654",
    latestDate: "2025-06-10",
    latestTime: "15:30",
    avatar: "https://i.pravatar.cc/100?img=7",
    status: "Pending"
  },
  {
    id: 8,
    whatsappUserName: "ava_l_wa",
    customerName: "Ava Lee",
    customerPhone: "+1 901-234-5678",
    businessNumber: "+1 210-987-6543",
    latestDate: "2025-06-09",
    latestTime: "12:10",
    avatar: "https://i.pravatar.cc/100?img=8",
    status: "Active"
  }
];
 
 
 
function App() {
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
 
 
  const UserForm = ({ setShowForm }) => {
    const [formData, setFormData] = useState({
  customerName: "",
  customerPhone: "",
  businessNumber: "",
  latestDate: "",
  latestTime: "",
  status: "Active", // Default value
});
 
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
 
    const styles = {
      modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      modal: {
        width: "600px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        padding: "20px",
      },
      modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        borderBottom: "1px solid #ccc",
      },
      closeBtn: {
        fontSize: "20px",
        background: "none",
        border: "none",
        cursor: "pointer",
      },
      sectionTitle: {
        fontSize: "15px",
        fontWeight: "600",
        marginBottom: "10px",
      },
      formRow: {
        display: "flex",
        alignItems: "center",
        marginBottom: "12px",
      },
      formLabel: {
        width: "160px",
        fontSize: "14px",
        fontWeight: "500",
      },
      formInput: {
        flex: 1,
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "13px",
      },
      modalFooter: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
        marginTop: "16px",
      },
      primaryBtn: {
        backgroundColor: "#0070f3",
        color: "#fff",
        padding: "6px 14px",
        border: "none",
        borderRadius: "20px",
        fontSize: "12px",
        cursor: "pointer",
      },
      secondaryBtn: {
        backgroundColor: "#fff",
        color: "#0070f3",
        border: "1px solid #ccc",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        cursor: "pointer",
      },
    };
 
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3>New WhatsApp User</h3>
            <button onClick={() => setShowForm(false)} style={styles.closeBtn}>
              ×
            </button>
          </div>
          <div>
            <p style={styles.sectionTitle}>User Information</p>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>Customer Name</label>
              <input
                style={styles.formInput}
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>Customer Phone</label>
              <input
                style={styles.formInput}
                type="text"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="Enter phone"
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>Business Number</label>
              <input
                style={styles.formInput}
                type="text"
                name="businessNumber"
                value={formData.businessNumber}
                onChange={handleChange}
                placeholder="Enter business number"
              />
            </div>
            <div style={styles.formRow}>
              <label style={styles.formLabel}>Latest DateTime</label>
              <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                <input
                  style={{ ...styles.formInput, flex: 1 }}
                  type="date"
                  name="latestDate"
                  value={formData.latestDate}
                  onChange={handleChange}
                />
                <input
                  style={{ ...styles.formInput, flex: 1 }}
                  type="time"
                  name="latestTime"
                  value={formData.latestTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={styles.formRow}>
  <label style={styles.formLabel}>Status</label>
  <select
    style={styles.formInput}
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
</div>
          </div>
          <div style={styles.modalFooter}>
            <button
              style={styles.secondaryBtn}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              style={styles.primaryBtn}
              onClick={() => handleSaveUser(formData)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  return (
    <>
      <div className="table-wrapper mt-5">
        <h5 className="text-center text-dark">Whatsapp User</h5>
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
 
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
 
/* ---------- MOBILE RESPONSIVE DESIGN ---------- */
@media screen and (max-width: 768px) {
  .table-wrapper {
    padding: 1rem;
  }
 
  .table-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
 
  .search {
    width: 100%;
    max-width: 280px;
  }
 
  .actions {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
 
  .export-btn,
  .add-btn {
    width: 100%;
    justify-content: center;
  }
 
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
 
  thead {
    display: none;
  }
 
  tr {
    margin: 1rem auto;
    padding: 1rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    width: 90%;
    max-width: 420px;
    box-sizing: border-box;
  }
 
  td {
    padding: 0.75rem 0;
    text-align: right;
    position: relative;
    padding-left: 50%;
    border: none;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.875rem;
  }
 
  td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
    color: #6b7280;
    white-space: nowrap;
    text-align: left;
  }
 
  .avatar {
    margin-left: auto;
    margin-right: auto;
    display: block;
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
            <button
              className="add-btn"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add
            </button>
          </div>
        </div>
 
        <div className="table-container">
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
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Business Number</th>
                <th>Latest Date</th>
                <th>Latest Time</th>
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
    <img src={user.avatar} alt="avatar" className="avatar" />
    {user.customerName}
  </div>
</td>
 
                  <td>{user.customerPhone}</td>
                  <td>{user.businessNumber}</td>
                  <td>{user.latestDate}</td>
                  <td>{user.latestTime}</td>
                  <td>
  <span className={user.status === "Active" ? "status-active" : "status-inactive"}>
    {user.status}
  </span>
</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)}>
                      ...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
 
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
 
       
        {showModal && <UserForm setShowForm={setShowModal} />}
      </div>
    </>
  );
}
 
export default App;