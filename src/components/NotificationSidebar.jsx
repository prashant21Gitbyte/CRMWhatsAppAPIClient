import React from 'react';
 
const NotificationSidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className="position-fixed top-0 end-0 bg-white shadow-sm border-start"
      style={{
        width: '380px',
        height: '100vh',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1050,
        overflowY: 'auto',
        padding: '1.25rem',
        borderRadius : 8
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-semibold">Notifications</h5>
        <button
          onClick={onClose}
          className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '30px', height: '30px' }}
        >
          &times;
        </button>
      </div>
 
      {/* Notification List */}
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-start gap-3 border-bottom pb-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="rounded-circle"
            width="40"
            height="40"
          />
          <div>
            <div className="fw-semibold">Uploaded audio recordings</div>
            <div className="text-muted small">Recorded podcast episodes</div>
            <div className="text-muted small">17 May 2021</div>
          </div>
        </div>
 
        {/* Add more notifications here as needed */}
      </div>
    </div>
  );
};
 
export default NotificationSidebar;