import React from 'react';
 
const GridSidebar = ({ isOpen, onClose }) => {
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
        borderRadius: 8,
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-semibold">Latest Activities</h5>
        <button
          onClick={onClose}
          className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: '30px', height: '30px' }}
        >
          &times;
        </button>
      </div>
 
      {/* Activities */}
      <div className="d-flex flex-column gap-4">
 
        {/* Logged out */}
        <div>
          <div className="fw-semibold mb-1">Logged out</div>
          <div className="text-muted small d-flex align-items-center mb-2">
            Signed out from the dashboard
            <span className="badge bg-light text-dark ms-2" style={{ fontSize: '0.8em' }}>Info</span>
          </div>
          <div className="d-flex gap-2 mb-2">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=80&h=40"
              alt="activity1"
              style={{ borderRadius: 6, width: 70, height: 40, objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=80&h=40"
              alt="activity2"
              style={{ borderRadius: 6, width: 70, height: 40, objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=40"
              alt="activity3"
              style={{ borderRadius: 6, width: 70, height: 40, objectFit: 'cover' }}
            />
          </div>
          <div className="text-muted small">04 July 2020</div>
        </div>
 
        {/* Uploaded documents */}
        <div>
          <div className="fw-semibold mb-1">Uploaded documents</div>
          <div className="text-muted small d-flex align-items-center mb-2">
            Uploaded important project documents
            <span className="badge bg-info text-white ms-2" style={{ fontSize: '0.8em' }}>Completed</span>
          </div>
          <div className="d-flex flex-column gap-2 mb-2">
            <div className="d-flex align-items-center gap-2 bg-light rounded px-2 py-1">
              <span className="bi bi-folder2" style={{ fontSize: '1.5em', color: '#6c757d' }}></span>
              <span className="fw-semibold text-primary" style={{ cursor: 'pointer' }}>document1.pdf</span>
              <span className="text-muted small ms-auto">2.5MB</span>
            </div>
            <div className="d-flex align-items-center gap-2 bg-light rounded px-2 py-1">
              <span className="bi bi-folder2" style={{ fontSize: '1.5em', color: '#6c757d' }}></span>
              <span className="fw-semibold text-primary" style={{ cursor: 'pointer' }}>document2.docx</span>
              <span className="text-muted small ms-auto">1.8MB</span>
            </div>
          </div>
          <div className="text-muted small">08 July 2021</div>
        </div>
 
        {/* Updated profile picture */}
        <div>
          <div className="fw-semibold mb-1">Updated profile picture</div>
          <div className="text-muted small d-flex align-items-center mb-2">
            Changed profile photo
            <span className="badge bg-success text-white ms-2" style={{ fontSize: '0.8em' }}>Success</span>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default GridSidebar;
 
 