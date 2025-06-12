import React from 'react';
import { Container, Card } from 'react-bootstrap';
import 'chart.js/auto';
import '../pages/CSS/Dashboard.css';
import CustomTable from '../components/CustomTable';
import DonutChart from '../pages/DonutChart';
 
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
            headers={['Name', 'Sent Messages', 'Read Messages', 'Not Delivered']}
            columns={['Name', 'SentMesseages', 'ReadMessages', 'NotDelivered']}
            data={[
              { Name: 'Alice', SentMesseages: 3, ReadMessages: 6, NotDelivered: 2 },
              { Name: 'Bob', SentMesseages: 8, ReadMessages: 7, NotDelivered: 1 },
              { Name: 'Charlie', SentMesseages: 10, ReadMessages: 9, NotDelivered: 0 },
              { Name: 'Daisy', SentMesseages: 5, ReadMessages: 3, NotDelivered: 2 },
              { Name: 'Ethan', SentMesseages: 7, ReadMessages: 5, NotDelivered: 2 },
              { Name: 'Fiona', SentMesseages: 4, ReadMessages: 2, NotDelivered: 2 },
              { Name: 'George', SentMesseages: 12, ReadMessages: 10, NotDelivered: 2 },
              { Name: 'Hannah', SentMesseages: 6, ReadMessages: 4, NotDelivered: 2 }
            ]}
          />
          <CustomTable
            headers={['Name', 'Sent Messages', 'Read Messages', 'Not Delivered']}
            columns={['Name', 'SentMesseages', 'ReadMessages', 'NotDelivered']}
            data={[
              { Name: 'Alice', SentMesseages: 3, ReadMessages: 6, NotDelivered: 2 },
              { Name: 'Bob', SentMesseages: 8, ReadMessages: 7, NotDelivered: 1 },
              { Name: 'Charlie', SentMesseages: 10, ReadMessages: 9, NotDelivered: 0 },
              { Name: 'Daisy', SentMesseages: 5, ReadMessages: 3, NotDelivered: 2 },
              { Name: 'Ethan', SentMesseages: 7, ReadMessages: 5, NotDelivered: 2 },
              { Name: 'Fiona', SentMesseages: 4, ReadMessages: 2, NotDelivered: 2 },
              { Name: 'George', SentMesseages: 12, ReadMessages: 10, NotDelivered: 2 },
              { Name: 'Hannah', SentMesseages: 6, ReadMessages: 4, NotDelivered: 2 }
            ]}
          />
        </div>
 
 
 
        <Card className="p-3">
          <DonutChart />
 
        </Card>
      </div>
 
    </Container>
  );
};
 
export default MessageAnalysis;