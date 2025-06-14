import React, { useState, useEffect } from "react";
import { users as initialUsers } from "../data/users";
import UserCard from "../components/UserCard";
import EditUser from "../components/EditUser";
import "../App.css";
 
function App() {
  const [userList, setUserList] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
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
 
  const handleDeleteUser = (userToDelete) => {
    setUserList((prev) => prev.filter((user) => user.id !== userToDelete.id));
  };
 
  const handleSaveUser = (formData) => {
    if (editUser) {
      setUserList((prev) =>
        prev.map((user) =>
          user.id === editUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        profileCompletion: 0,
        joinedDate: new Date().toLocaleDateString(),
        status: "Active",
        avatar:
          formData.avatar ||
          `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`,
      };
      setUserList((prev) => [...prev, newUser]);
    }
    setShowModal(false);
  };
 
  const isAllSelected =
    filteredData.length > 0 && selectedUsers.length === filteredData.length;
 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);
 
  return (
    <div className="table-wrapper">
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
              setEditUser(null);
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
                  checked={isAllSelected}
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
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUsers.includes(user.id)}
                onSelect={() => handleSelectUser(user.id)}
                onDelete={handleDeleteUser}
                onEdit={(user) => {
                  setEditUser(user);
                  setShowModal(true);
                }}
              />
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
 
      {showModal && (
        <EditUser
          user={editUser}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
 
export default App;