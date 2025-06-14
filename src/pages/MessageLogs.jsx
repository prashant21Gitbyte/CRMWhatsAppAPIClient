import React, { useState, useEffect } from "react";
 
function MessageLogs() {
 const initialTemplates = [
    {
      id: "1",
      avatar: "https://i.pravatar.cc/100?img=1",
      name: "Welcome Log",
      description: "Initial message  to user",
      lineNumber: "9876543210",
      owner: "Sumeet Kendre",
    },
    {
      id: "2",
      avatar: "https://i.pravatar.cc/100?img=2",
      name: "Order Log",
      description: "Confirmation order",
      lineNumber: "9988776655",
      owner: "Sumeet Kendre",
    },
    {
      id: "3",
      avatar: "https://i.pravatar.cc/100?img=3",
      name: "Abandon Cart Log",
      description: "Reminder for  cart",
      lineNumber: "9123456789",
      owner: "Aarti Joshi",
    },
    {
      id: "4",
      avatar: "https://i.pravatar.cc/100?img=4",
      name: "Feedback Log",
      description: "Request for feedback",
      lineNumber: "9012345678",
      owner: "Raj Mehta",
    },
    {
      id: "5",
      avatar: "https://i.pravatar.cc/100?img=5",
      name: "Delivery Update Log",
      description: "Notifies users of progress",
      lineNumber: "8765432109",
      owner: "Neha Bansal",
    },
    {
      id: "6",
      avatar: "https://i.pravatar.cc/100?img=6",
      name: "Offer Notification",
      description: "Promotional  alert",
      lineNumber: "8899001122",
      owner: "Vikas Sharma",
    },
    {
      id: "7",
      avatar: "https://i.pravatar.cc/100?img=7",
      name: "Thank You Log",
      description: " successful delivery",
      lineNumber: "9090909090",
      owner: "Megha Kapoor",
    },
    {
      id: "8",
      avatar: "https://i.pravatar.cc/100?img=8",
      name: "Account Update Log",
      description: "Changes  info",
      lineNumber: "9191919191",
      owner: "Amit Verma",
    },
    {
      id: "9",
      avatar: "https://i.pravatar.cc/100?img=9",
      name: "Security Alert",
      description: "Notification of  activity",
      lineNumber: "9321654987",
      owner: "Sumeet Kendre",
    },
    {
      id: "10",
      avatar: "https://i.pravatar.cc/100?img=10",
      name: "Re-engagement Log",
      description: "Win-back  inactive users",
      lineNumber: "9871236540",
      owner: "Kiran Desai",
    },
  ];
 
 
  const [userList] = useState(initialTemplates);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialTemplates);
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
      const result = userList.filter(
        (user) =>
          user.name.toLowerCase().includes(keyword) ||
          user.description.toLowerCase().includes(keyword)
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
    <div className="table-wrapper mt-5">
      <h5 className="text-center text-dark">Message Logs</h5>
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
        .export-btn {
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
        .export-btn:hover {
          background-color: #f1f5f9;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
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
        .user-name-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .pagination {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .pagination button {
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
        }
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
          th:nth-child(4),
td:nth-child(4) {
  min-width: 200px;
}
 
th:nth-child(5),
td:nth-child(5) {
  min-width: 140px;
}
      `}</style>
 
      <div className="table-header">
        <input
          type="text"
          className="search"
          placeholder="Search logs..."
          value={search}
          onChange={handleSearch}
        />
        <div className="actions">
          <button className="export-btn">Export</button>
        </div>
      </div>
 
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} /></th>
            <th>Avatar</th>
            <th>Message Log Name</th>
            <th>Description</th>
            <th>Line Number</th>
            <th>Owner</th>
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
                <img src={user.avatar} alt="avatar" className="avatar" />
              </td>
              <td>{user.name}</td>
              <td>{user.description}</td>
              <td>{user.lineNumber}</td>
              <td>{user.owner}</td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
 
      <div className="pagination">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
 
export default MessageLogs;