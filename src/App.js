import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Conversation from './pages/Conversation'
import WhatsAppUsers from './pages/WhatsAppUsers'
import Dashboard from './pages/Dashboard'
import UserDetail from './pages/UserDetail'

import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="conversation" element={<Conversation />} />
          <Route path="whatsappusers" element={<WhatsAppUsers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/user/:userId" element={<UserDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
