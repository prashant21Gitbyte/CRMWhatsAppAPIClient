import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Topbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='container' style={{ padding: '20px', display: 'flex', justifyContent: 'center', marginTop : '-230px', flexGrow: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
