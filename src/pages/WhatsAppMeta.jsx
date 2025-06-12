import React, { useState } from "react";
import { users as initialUsers } from "../data/users";
import UserCard from "../components/UserCard";
import EditUser from "../components/EditUser";
import "../App.css";
import ExportButton from "../components/Topbar/ExportData";
 
function App() {
  const [userList, setUserList] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
 
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(userList.map((user) => user.id));
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
 
  const handleSaveUser = (newData) => {
    if (editUser) {
      setUserList((prev) =>
        prev.map((user) =>
          user.id === editUser.id ? { ...user, ...newData } : user
        )
      );
    } else {
      const newUser = {
        id: Date.now().toString(),
        ...newData,
        profileCompletion: 0,
        joinedDate: new Date().toLocaleDateString(),
      };
      setUserList((prev) => [...prev, newUser]);
    }
    setShowModal(false);
  };
 
  const isAllSelected =
    userList.length > 0 && selectedUsers.length === userList.length;
 
  return (
    <div className="table-wrapper">
      <div className="table-header">
        <input type="text" placeholder="Search users..." className="search" />
        <div className="actions">
          {/* <button className="export-btn">Export</button> */}
          <ExportButton />
          {/* <button className="filter-btn">Filter</button> */}
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
              <th>Name</th>
              <th>Position</th>
              <th>Profile Completeness</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
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