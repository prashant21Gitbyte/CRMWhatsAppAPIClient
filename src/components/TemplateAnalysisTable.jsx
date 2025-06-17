import React from "react";
import "../components/CSS/TemplateAnalysisTable.css"; // using same CSS
import { useNavigate } from "react-router-dom";
 
const TemplateAnalysisTable = ({ data = [] }) => {
  const headers = ["Sr No", "Template Name", "Sent", "Not Delivered", "Action"];
const navigate = useNavigate();
 
//   const handleViewInsight = () => {
//   navigate("/template-insight"); // Set this route in your router
// };
  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-thead">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="custom-tbody">
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.templateName}</td>
                <td>{item.sent}</td>
                <td>{item.notDelivered}</td>
               <td>
  <div className="action-button-wrapper">
    <button className="custom-insight-btn" onClick={() => navigate("/template-insight/")}>
      📊 <span>View Insights</span>
    </button>
  </div>
</td>
 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default TemplateAnalysisTable;
 
 