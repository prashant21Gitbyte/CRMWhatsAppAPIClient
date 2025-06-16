import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [showAllMessages, setShowAllMessages] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getResponsiveWidth = () => {
        if (screenWidth < 480) return '95vw'; 
        if (screenWidth < 768) return '90vw'; 
        if (screenWidth < 1024) return '85vw'; 
        if (screenWidth < 1440) return '80vw'; 
        return '75vw'; 
    };

    const whatsappMessages = [
        'WA-1371',
        'WA-1395',
        'WA-1397',
        'WA-1396',
        'WA-1401',
        'WA-1402',
        'WA-1403',
        'WA-1404',
    ];

    const handleFileChange = (e) => {
        setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const dynamicStyles = {
        container: {
            width: getResponsiveWidth(),
            height: '100vh',
            overflowY: 'auto',
            margin: '0 auto',
            padding: 0,
        },
        wrapper: {
            width: '100%',
            padding: screenWidth < 480 ? '10px' : '10px 20px',
            boxSizing: 'border-box',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'white',
        }
    };

    return (
        <>
            <style>
                {`
                    ::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            <div style={{ ...styles.container, ...dynamicStyles.container }}>
                <div style={{ ...styles.wrapper, ...dynamicStyles.wrapper }}>
                    {/* Upload Section */}
                    <div style={styles.uploadContainer}>
                        <div style={styles.header}>
                            <div style={styles.title}>Notes & Attachments ({files.length})</div>
                            <label style={styles.uploadButton}>
                                Upload Files
                                <input type="file" multiple onChange={handleFileChange} hidden />
                            </label>
                        </div>
                        <div
                            style={styles.dropzone}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <label style={styles.centerUpload}>
                                <input type="file" multiple onChange={handleFileChange} hidden />
                                <div>⬆️ Upload Files</div>
                            </label>
                            <div style={styles.dropText}>Or drop files</div>
                            {files.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                                {files.map((f, i) => (
                                    <div key={i} style={styles.fileItem}>📎 {f.name}</div>
                                ))}
                            </div>
                        )}
                        </div>
                        
                    </div>

                    {/* WhatsApp Messages */}
                    <div style={styles.tableContainer}>
                        <div style={styles.header}>
                            <div style={styles.title}>WhatsApp Messages ({whatsappMessages.length})</div>
                            <button style={styles.uploadButton}>New</button>
                        </div>
                        <div style={styles.table}>
                            <div style={styles.tableHead}>
                                <div style={styles.cell}>WhatsApp Message Name</div>
                            </div>
                            {(showAllMessages ? whatsappMessages : whatsappMessages.slice(0, 4)).map((msg, idx) => (
                                <div key={idx} style={styles.tableRow}>
                                    <div style={styles.cell}>
                                        <a href="#" style={styles.link}>{msg}</a>
                                    </div>
                                    <div style={styles.cellRight}>▾</div>
                                </div>
                            ))}
                            <div style={styles.viewAllRow}>
                                <button
                                    style={styles.viewAllButton}
                                    onClick={() => setShowAllMessages(!showAllMessages)}
                                >
                                    {showAllMessages ? 'Show Less' : 'View All'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Sessions */}
                    <div style={styles.tableContainer}>
                        <div style={styles.header}>
                            <div style={styles.title}>WhatsApp Messaging Sessions (1)</div>
                            <button style={styles.uploadButton}>New</button>
                        </div>
                        <div style={styles.table}>
                            <div style={{ ...styles.tableHead, background: 'white' }}>
                                <div style={styles.cell}>WhatsApp Messaging Session</div>
                            </div>
                            <div style={styles.tableRow}>
                                <div style={styles.cell}>
                                    <a href="#" style={styles.link}>WMS-0801</a>
                                </div>
                                <div style={styles.cellRight}>▾</div>
                            </div>
                            <div style={styles.viewAllRow}>
                                <button style={styles.viewAllButton}>View All</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {},
    wrapper: {},
    uploadContainer: {
        border: '1px solid #ddd',
        borderRadius: 16,
        padding: 5,
        marginBottom: 10,
        width: '100%',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        flexGrow: 1,
        color: '#1a365d',
    },
    uploadButton: {
        padding: '3px 16px',
        border: '1px solid #cbd5e0',
        borderRadius: 20,
        background: '#fff',
        cursor: 'pointer',
        color: '#1a73e8',
        fontWeight: 500,
    },
    dropzone: {
        border: '1px dashed #ccc',
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
    },
    centerUpload: {
        display: 'inline-block',
        border: '1px solid #cbd5e0',
        borderRadius: 20,
        padding: '5px 20px',
        color: '#1a73e8',
        fontWeight: 500,
        cursor: 'pointer',
    },
    dropText: {
        marginTop: 10,
        color: '#666',
    },
    fileItem: {
        fontSize: 14,
        marginBottom: 6,
    },
    tableContainer: {
        border: '1px solid #ddd',
        borderRadius: 16,
        padding: 10,
        width: '100%',
        marginTop: 10,
    },
    table: {
        marginTop: 10,
    },
    tableHead: {
        display: 'flex',
        padding: '8px 0',
        borderBottom: '1px solid #e2e8f0',
        fontWeight: 'bold',
        color: '#555',
        borderBottom:'1px solid #ddd'
    },
    tableRow: {
        display: 'flex',
        padding: '8px 0',
        borderBottom: '1px solid #e2e8f0',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
    },
    cellRight: {
        width: 30,
        textAlign: 'right',
        color: '#1a73e8',
    },
    link: {
        color: '#1a73e8',
        textDecoration: 'underline dotted',
    },
    viewAllRow: {
        textAlign: 'center',
        marginTop: 10,
    },
    viewAllButton: {
        background: 'none',
        border: 'none',
        color: '#1a73e8',
        cursor: 'pointer',
        fontWeight: 500,
        textDecoration: 'underline',
    },
};

export default Dashboard;
