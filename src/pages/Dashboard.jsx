import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../pages/CSS/Dashboard.css';
import CustomTable from '../components/CustomTable';
 
const stats = [
  {
    title: 'All Messages',
    value: 386,
    icon: 'bi-chat-dots',
    color: 'primary',
    change: '+12%',
    changeType: 'up',
  },
  {
    title: 'Media Messages',
    value: 26,
    icon: 'bi-file-earmark-image',
    color: 'info',
    change: '-5%',
    changeType: 'down',
  },
  {
    title: 'Text Messages',
    value: 17,
    icon: 'bi-chat-text',
    color: 'success',
    change: '+3%',
    changeType: 'up',
  },
  {
    title: 'Messages per day',
    value: 35.09,
    icon: 'bi-calendar3',
    color: 'warning',
    change: '+1.5%',
    changeType: 'up',
  },
  {
    title: 'No of days',
    value: 11,
    icon: 'bi-clock-history',
    color: 'danger',
    change: '0%',
    changeType: 'up',
  },
];
 
const MessageAnalysis = () => {
  const doughnutData = {
    labels: ['All Messages', 'Text Messages', 'Media Messages'],
    datasets: [
      {
        data: [90, 4, 6],
        backgroundColor: ['#004d40', '#00c853', '#03a9f4'],
        borderWidth: 0,
      },
    ],
  };
 
  return (
    <Container fluid className="p-4">
      <h4 className="mb-4 text-white">Message Analysis</h4>
 
      {/* Top Scrollable Stat Cards */}
      <div className="stat-scroll-wrapper">
        {stats.map((stat, idx) => (
          <div className="stat-card-small" key={stat.title}>
            <div className={`card h-100 shadow-sm ${idx === 0 ? 'active' : ''}`}>
              <div className="card-body d-flex flex-column align-items-start p-3">
                <div className={`stat-icon mb-2 bg-${stat.color}-subtle`}>
                  <i className={`bi ${stat.icon} text-${stat.color} fs-5`}></i>
                </div>
                <div className="d-flex align-items-center mb-1">
                  <span className="fs-6 fw-bold me-2">{stat.value}</span>
                  {stat.change && (
                    <span className={`badge bg-${stat.changeType === 'up' ? 'success' : 'danger'} ms-1`}>
                      {stat.change}
                      <i className={`bi bi-caret-${stat.changeType}-fill ms-1`}></i>
                    </span>
                  )}
                </div>
                <div className="text-muted small">{stat.title}</div>
              </div>
            </div>
          </div>
        ))}
 
        {/* Start Date */}
        <div className="stat-card-small">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column align-items-start p-3">
              <div className="text-muted small mb-1">Start Date</div>
              <input type="date" className="form-control form-control-sm" />
            </div>
          </div>
        </div>
 
        {/* End Date */}
        <div className="stat-card-small">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column align-items-start p-3">
              <div className="text-muted small mb-1">End Date</div>
              <input type="date" className="form-control form-control-sm" />
            </div>
          </div>
        </div>
      </div>
 
      {/* Table and Chart Layout */}
      <div className="analysis-layout mt-4">
        <div className="table-section">
          <CustomTable
            headers={['Name', 'Position', 'Status']}
            data={[
              { Name: 'Alice', Position: 'Developer', Status: 'Active' },
              { Name: 'Bob', Position: 'Designer', Status: 'Inactive' },
              { Name: 'Charlie', Position: 'Manager', Status: 'Active' },
              { Name: 'Daisy', Position: 'Tester', Status: 'Inactive' },
             { Name: 'Alice', Position: 'Developer', Status: 'Active' },
              { Name: 'Bob', Position: 'Designer', Status: 'Inactive' },
              { Name: 'Charlie', Position: 'Manager', Status: 'Active' },
              { Name: 'Daisy', Position: 'Tester', Status: 'Inactive' },
            ]}
          />
 
          <CustomTable
            headers={['Name', 'Position', 'Status']}
            data={[
              { Name: 'Alice', Position: 'Developer', Status: 'Active' },
              { Name: 'Bob', Position: 'Designer', Status: 'Inactive' },
              { Name: 'Charlie', Position: 'Manager', Status: 'Active' },
              { Name: 'Daisy', Position: 'Tester', Status: 'Inactive' },
             { Name: 'Alice', Position: 'Developer', Status: 'Active' },
              { Name: 'Bob', Position: 'Designer', Status: 'Inactive' },
              { Name: 'Charlie', Position: 'Manager', Status: 'Active' },
              { Name: 'Daisy', Position: 'Tester', Status: 'Inactive' },
            ]}
          />
 
        </div>
 
           
        <div className="form-section">
          <Card className="p-3">
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: 'right',
                  },
                },
              }}
            />
          </Card>
        </div>
      </div>
    </Container>
  );
};
 
export default MessageAnalysis;
 