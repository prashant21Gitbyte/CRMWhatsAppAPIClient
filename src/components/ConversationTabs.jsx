import React, { useState } from 'react';
import { MessagesSquare, Users } from 'lucide-react';
 
 
 
const ContactTabs = ({ activeTab, onTabChange }) => {
  return (
    <div style={styles.wrapper}>
      {/* Chats Tab */}
      <div
        onClick={() => onTabChange('chats')}
        style={{
          ...styles.tab,
          ...(activeTab === 'chats' ? styles.tabActiveBg : {}),
        }}
      >
        <MessagesSquare
          size={16}
          style={activeTab === 'chats' ? styles.iconActive : styles.iconInactive}
        />
        <span style={activeTab === 'chats' ? styles.labelActive : styles.labelInactive}>
          Chats
        </span>
        {activeTab === 'chats' && <span style={styles.badge}>13</span>}
      </div>
 
      {/* Contacts Tab */}
      <div
        onClick={() => onTabChange('contacts')}
        style={{
          ...styles.tab,
          ...(activeTab === 'contacts' ? styles.tabActiveBg : {}),
        }}
      >
        <Users
          size={16}
          style={activeTab === 'contacts' ? styles.iconActive : styles.iconInactive}
        />
        <span style={activeTab === 'contacts' ? styles.labelActive : styles.labelInactive}>
          Contacts
        </span>
      </div>
    </div>
  );
};
 
export default ContactTabs;
 
const styles = {
  wrapper: {
    padding: '4px',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    width: 'fit-content',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 46px',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabActiveBg: {
    backgroundColor: '#f5f7fa',
  },
  iconActive: {
    color: '#000000',
  },
  iconInactive: {
    color: '#9ca3af',
  },
  labelActive: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#000000',
  },
  labelInactive: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#9ca3af',
  },
  badge: {
    fontSize: '0.75rem',
    padding: '2px 8px',
    borderRadius: '9999px',
    backgroundColor: '#3730A3',
    color: 'white',
    fontWeight: '700',
  },
};
 