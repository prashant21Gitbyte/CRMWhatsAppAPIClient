import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs"; // Add this
import "../components/CSS/CustomTable.css";
 
function CustomTable({ headers = [], columns = [], data = [] }) {
  const [selectedRows, setSelectedRows] = useState([]);
 
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, idx) => idx));
    } else {
      setSelectedRows([]);
    }
  };
 
  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };
 
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
 
  return (
    <div className="table-wrapper">
      {/* <div className="table-header">
        <input type="text" placeholder="Search..." className="search" />
        <div className="actions">
          <button className="export-btn">Export</button>
          <button className="filter-btn">Filter</button>
          <button className="add-btn">Add</button>
        </div>
      </div> */}
 
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
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleSelectRow(rowIndex)}
                  />
                </td>
               {columns.map((col, colIndex) => (
  <td key={colIndex}>{row[col]}</td>
))}
                <td>
                  <button style={{    background: 'transparent',
    color: 'black'}} className="kebab-menu">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default CustomTable;