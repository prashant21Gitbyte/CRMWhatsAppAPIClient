import React, { useState } from 'react';
import "../../App.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { users as initialUsers } from "../../data/users.js";

const ExportButton = () => {
  const [showMenu, setShowMenu] = useState(false);

  const exportToExcel = () => {
    const exportData = initialUsers.map(({ name, email, position, department, profileCompletion, status, joinedDate }) => ({
      Name: name,
      Email: email,
      Position: position,
      Department: department,
      "Profile Completion (%)": profileCompletion,
      Status: status,
      "Joined Date": joinedDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'initialUsers');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'user_data.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Email", "Position", "Department", "Profile %", "Status", "Joined"];
    const tableRows = initialUsers.map(({ name, email, position, department, profileCompletion, status, joinedDate }) => [
    name, email, position, department, `${profileCompletion}%`, status, joinedDate
  ]);

  autoTable(doc, { 
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 9 },
  });

  doc.save('user_data.pdf');
  };

  const handleExport = (type) => {
    setShowMenu(false);
    if (type === 'excel') exportToExcel();
    else if (type === 'pdf') exportToPDF();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setShowMenu(!showMenu)} className="filter-btn">Export</button>
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '5px',
          zIndex: 10
        }}>
          <div onClick={() => handleExport('excel')} style={{ cursor: 'pointer', marginBottom: '5px' }} className="filter-btn">
            Excel
          </div>
          <div onClick={() => handleExport('pdf')} style={{ cursor: 'pointer' }} className="filter-btn">
            PDF
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
