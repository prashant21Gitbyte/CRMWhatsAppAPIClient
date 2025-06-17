// TemplateInsightPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/CSS/CustomTable.css";
import "../components/CSS/TemplateInsightPage.css"
import TemplateAnalysisChart from "./../components/TemplateAnalysisChart";
 
const TemplateInsightPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 
  // State for insights data
  const [insightData, setInsightData] = useState({
    amountSpent: 0,
    costPerDelivered: 0,
    costPerClick: 0,
    sent: 0,
    delivered: 0,
    read: 0,
    replies: 0,
  });
 
  const [chartData, setChartData] = useState([]);
 
  // Example API simulation
  useEffect(() => {
    // Simulating fetched data
    const fetchedData = {
      amountSpent: 120,
      costPerDelivered: 0.5,
      costPerClick: 0.2,
      sent: 600,
      delivered: 550,
      read: 420,
      replies: 100,
    };
 
    setInsightData(fetchedData);
 
    setChartData([
      { y: fetchedData.sent, label: "Sent" },
      { y: fetchedData.delivered, label: "Delivered" },
      { y: fetchedData.read, label: "Read" },
      { y: fetchedData.replies, label: "Replies" },
    ]);
  }, []);
 
 
const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setEndDate(""); // Reset end date on new start date
  };
 
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
 
    const start = new Date(startDate);
    const end = new Date(selectedEndDate);
 
    const diffTime = end.getTime() - start.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
 
    if (diffDays > 90) {
      alert("❌ You can only select an End Date within 90 days from the Start Date.");
      setEndDate(""); // Reset end date if invalid
    }
  };
 
 
  return (
    <div className="insight-wrapper" style={{height:'79vh'}}>
   
 
      <div className="insight-cards">
        <div className="card-box">
          <p>Amount spent</p>
          <h3>₹{insightData.amountSpent}</h3>
        </div>
        <div className="card-box">
          <p>Cost per message delivered</p>
          <h3>₹{insightData.costPerDelivered}</h3>
        </div>
        <div className="card-box">
          <p>Cost per website button click</p>
          <h3>₹{insightData.costPerClick}</h3>
        </div>
      </div>
 
      <div className="performance-box">
        <h4>Performance</h4>
        <div className="performance-stats">
          <div className="stat-item">
            <p>Messages sent</p>
            <h3>{insightData.sent}</h3>
          </div>
          <div className="stat-item">
            <p>Messages delivered</p>
            <h3>{insightData.delivered}</h3>
          </div>
          <div className="stat-item">
            <p>Messages read</p>
            <h3>{insightData.read}</h3>
          </div>
          <div className="stat-item">
            <p>Replies</p>
            <h3>{insightData.replies}</h3>
          </div>
        </div>
      </div>
 
      <div className="mt-4">
        <TemplateAnalysisChart chartData={chartData} />
      </div>
    </div>
  );
};
 
export default TemplateInsightPage;
 
 