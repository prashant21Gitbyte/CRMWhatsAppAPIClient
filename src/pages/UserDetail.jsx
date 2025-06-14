import React, { useState } from 'react';

const DetailsTab = () => (
  <>
    <div style={styles.columnsWrapper}>
      {/* Column 1 */}
      <div style={styles.column}>
        <div style={styles.fieldBlock}>
          <div style={styles.label}>Whatsapp User Name</div>
          <div style={styles.value}>W-1086</div>
        </div>

        <div style={styles.fieldBlock}>
          <div style={styles.label}>Customer Name</div>
          <div style={styles.value}>Hello Teaz</div>
        </div>

        <div style={styles.fieldBlock}>
          <div style={styles.label}>Customer Phone</div>
          <div style={styles.value}>0987623456</div>
        </div>
      </div>
      <div style={styles.column}>
        <div style={styles.fieldBlock}>
          <div style={styles.label}>Business Number</div>
          <div style={styles.value}>918233354537</div>
        </div>

        <div style={styles.fieldBlock}>
          <div style={styles.label}>latestDateTime</div>
          <div style={styles.value}>-</div>
        </div>

        <div style={styles.fieldBlock}>
          <div style={styles.label}>UniqueKey</div>
          <div style={styles.value}>0987623456-918233354537</div>
        </div>
      </div>


      {/* Column 2 */}
      <div style={styles.column}>
        <div style={styles.fieldBlock}>
          <div style={styles.label}>Created By</div>
          <div style={styles.value}>Sumeet Kendre, 08/06/2025, 4:13 pm</div>
        </div>
        <div style={styles.fieldBlock}>
          <div style={styles.label}>Last Modified</div>
          <div style={styles.value}>Sumeet Kendre, 08/06/2025, 4:44 pm</div>
        </div>
      </div>
    </div>

  </>
);

const RelatedTab = () => (
  <div style={styles.value}>
    <p>No related records found.</p>
  </div>
);

const ConversationTab = () => (
  <div style={styles.value}>
    <p>No conversation available.</p>
  </div>
);

export default function WhatsappUserPage() {
  const [activeTab, setActiveTab] = useState('Details');

  const tabs = ['Related', 'Details', 'Conversation'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Related':
        return <RelatedTab />;
      case 'Details':
        return <DetailsTab />;
      case 'Conversation':
        return <ConversationTab />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <img src="/assets/chess.jpg" alt="logo" width="30" height="30" style={{ borderRadius: '50%' }} />
        <span>Whatsapp User</span>
        <span style={{ fontWeight: 'normal', color: '#004de5' }}>W-1086</span>
      </div>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        {tabs.map(tab => (
          <div key={tab} style={tabStyle(activeTab === tab)} onClick={() => setActiveTab(tab)}>
            {tab}
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Left Section */}
        <div style={styles.leftSection}>{renderTabContent()}</div>


      </div>
    </div>
  );
}
const tabStyle = (active) => ({
  paddingBottom: '6px',
  borderBottom: active ? '3px solid #004de5' : 'none',
  fontWeight: active ? 'bold' : 'normal',
  color: active ? '#004de5' : '#000',
  cursor: 'pointer',
});
const styles = {
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '25px',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  container: {
    width: '90%',
    height:'100vh',
    borderRadius: '16px',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },

  tabContainer: {
    display: 'flex',
    gap: '25px',
    marginTop: '15px',
    borderBottom: '2px solid #ccc',
    flexWrap: 'wrap',
  },


  columnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    flexWrap: 'wrap',
  },

  column: {
    flex: '1 1 250px',
    minWidth: '250px',
  },

  header2: {
    flex: '1 1 60%',
    minWidth: '300px',
  },
  rightSection: {
    marginLeft: 20,
    flex: '1 1 35%',
    minWidth: '280px',
    borderLeft: '1px solid #ccc',
    paddingLeft: '20px',
    marginTop: '20px',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '3px',
    color: 'black',

  },

  fieldBlock: {
    marginBottom: '15px',
  },

  value: {
    fontSize: 14,
    color: '#333',

  },

  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px',
  },

  activityTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#004de5',
    marginBottom: '15px',
  },

  filters: {
    color: 'black',
    fontSize: '14px',
    marginBottom: '10px',
  },

  activityBox: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    fontSize: '14px',
    color: 'black'
  },


};