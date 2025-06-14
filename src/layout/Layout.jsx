import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Slidemenu from '../components/Topbar/Slidemenu';
import './Layout.css'; 

const Layout = () => {
  return (
    <div>
      <Topbar />
      <Slidemenu />

      <div style={{ display: 'flex',backgroundColor:'white' }}>
        <Sidebar />
        <div className='container-fluid setcontainer'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
