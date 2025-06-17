import React, { useState, lazy, Suspense } from "react";
import FileUploadBox from "./RelatedD";
import ChatWindow from "./DetailsConvo";
import "./ChatWindow.css";

// Lazy-load for split bundle
const DetailsAnalytics = lazy(() => import("./DetailsAnalytics"));

const DetailsTab = () => (
  <div style={styles.columnsWrapper}>
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
);

const RelatedTab = () => (
  <div style={styles.value2}>
    <FileUploadBox />
  </div>
);

const ConversationTab = () => (
  <div style={styles.value}>
    <ChatWindow />
  </div>
);

export default function WhatsappUserPage() {
  const [activeTab, setActiveTab] = useState("Details");
  const tabs = ["Related", "Details", "Conversation", "Analysis"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Related":
        return <RelatedTab />;
      case "Details":
        return <DetailsTab />;
      case "Conversation":
        return <ConversationTab />;
      case "Analysis":
        return (
          <Suspense fallback={<div style={styles.loader}>Loading analytics…</div>}>
            <DetailsAnalytics />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container} class="mt-5 pt-5 pt-lg-0 mt-lg-3 maincontainer">
      {/* Header */}
      <div style={styles.header}>
        <img
          src="/assets/cat.jpg"
          alt="avatar"
          width="50"
          height="50"
          style={{ borderRadius: "50%" }}
        />
        <span>Whatsapp User</span>
        <span style={{ fontWeight: "normal", color: "#004de5" }}>W-1086</span>
      </div>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <div
            key={tab}
            style={tabStyle(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.body}>
        <div style={styles.contentArea}>{renderTabContent()}</div>
      </div>
    </div>
  );
}

// Tab styles
const tabStyle = (active) => ({
  paddingBottom: "6px",
  borderBottom: active ? "3px solid #004de5" : "none",
  fontWeight: active ? "bold" : "normal",
  color: active ? "#004de5" : "#000",
  cursor: "pointer",
});

// Custom styles
const styles = {
  container: {
    height: "100%",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  tabContainer: {
    display: "flex",
    gap: "25px",
    marginTop: "15px",
    borderBottom: "2px solid #ccc",
    flexWrap: "wrap",
  },
  body: {
    marginTop: "25px",
  },
  contentArea: {
    minHeight: "200px",
  },
  columnsWrapper: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  column: {
    flex: "1 1 250px",
    minWidth: "250px",
  },
  fieldBlock: {
    marginBottom: "15px",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: "3px",
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
  value2: {
    fontSize: 14,
    color: "#333",
  },
  loader: {
    padding: "20px",
    textAlign: "center",
    color: "#004de5",
    fontStyle: "italic",
  },
};
