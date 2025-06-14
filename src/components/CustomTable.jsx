import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
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
    <div className="custom-table-wrapper">
      <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-thead">
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
          <tbody className="custom-tbody">
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
                  <button className="custom-kebab-menu">
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
 
 