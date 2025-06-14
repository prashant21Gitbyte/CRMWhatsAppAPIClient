import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, Send } from 'lucide-react';
import ChatAttachmentMenu from './uploadFile';
import ChatRecorder from './AudioR';

const ChatWindow = ({
    isMobile,
    showChat,
    setShowChat,
    activeUser,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleAttach,
    handleAudioRecorded,
    styles
}) => {
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const [previewImage, setPreviewImage] = useState(null); // image preview state
    const profileRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfileInfo(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        (!isMobile || showChat) && activeUser && (
            <div style={styles.chatWindow}>
                {/* Chat Header */}
                <div style={styles.chatHeader}>
                    {isMobile && (
                        <button onClick={() => setShowChat(false)} style={{ background: 'transparent', border: 'none' }}>
                            <ArrowLeft size={24} />
                        </button>
                    )}

                    {/* Profile avatar click toggle */}
                    <div style={{ position: 'relative' }} ref={profileRef}>
                        <img
                            src={activeUser.avatar}
                            alt={activeUser.name}
                            style={{ ...styles.avatar, cursor: 'pointer' }}
                            onClick={() => setShowProfileInfo((prev) => !prev)}
                        />

                        {/* Info Modal Positioned Below Avatar */}
                        {showProfileInfo && (
                            <>
                                <style>
                                    {`
                                    @media (max-width: 768px) {
                                    .responsive-chat {
                                    width: 100% !important;
                                    height: calc(100vh - 98px) !important;
                                    top: 98px !important;
                                    right: 0 !important;
                                    }
                                     }
                                `}
                                </style>

                                <div
                                    className="responsive-chat"
                                    style={{
                                        ...styles.chatWindow,
                                        position: 'fixed',
                                        top: 98,
                                        right: 0,
                                        height: '80%',
                                        width: 360,
                                        backgroundColor: '#ffffff',
                                        boxShadow: '-2px 0 12px rgba(0,0,0,0.15)',
                                        zIndex: 999,
                                        overflowY: 'auto',
                                        padding: '1rem 1.5rem',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                    }}
                                >
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 16 }}>
                                        <button
                                            onClick={() => setShowProfileInfo(false)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                fontSize: 20,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            ✖
                                        </button>
                                        <h2 style={{ fontSize: 18, fontWeight: '500', margin: 0 }}>Contact info</h2>
                                    </div>

                                    {/* Avatar */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                                        <img
                                            src={activeUser.avatar}
                                            alt={activeUser.name}
                                            style={{
                                                width: 140,
                                                height: 140,
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>

                                    {/* Name + Number */}
                                    <div style={{ textAlign: 'center', marginBottom: 4, fontSize: 18, fontWeight: 500 }}>
                                        +91 92747592850 (You)
                                    </div>
                                    <div style={{ textAlign: 'center', fontSize: 14, color: '#64748b', marginBottom: 20 }}>
                                        ~{activeUser.name} 😁
                                    </div>

                                    {/* About Section */}
                                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                        <div style={{ fontSize: 14, fontWeight: 500, color: '#334155', marginBottom: 4 }}>About</div>
                                        <div style={{ fontSize: 14, color: '#475569' }}>Hey there! I am using WhatsApp.</div>
                                    </div>

                                    {/* Media Section */}
                                    <div style={{ marginTop: 20, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 8
                                        }}>
                                            <div style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>Media, links and docs</div>
                                            <div style={{ fontSize: 14, color: '#2563eb', cursor: 'pointer' }}>14 {'>'}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {[1, 2, 3].map((n) => (
                                                <img
                                                    key={n}
                                                    src="/assets/chess.jpg" // Replace with real media preview URL
                                                    alt="media"
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 8,
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Starred messages / optional extra sections can be added here */}
                                </div>
                            </>
                        )}

                    </div>

                    {/* Name + Icons */}
                    <div style={styles.headerNameSection}>
                        <div style={styles.headerName}>{activeUser.name}</div>
                        <div style={styles.headerRole}>Data Analyst</div>
                    </div>

                    {/* Icons */}
                    <div style={styles.headerIconsWrapper}>
                        <a href={`tel:${activeUser.phone}`} style={styles.headerIconCircle} title="Call">
                            <Phone size={16} />
                        </a>
                        <a href={`mailto:${activeUser.email}`} style={styles.headerIconCircle} title="Email">
                            <Mail size={16} />
                        </a>
                    </div>
                </div>

                {/* Messages */}
                <div style={styles.messagesContainer} className="hide-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} style={styles.messageRow(msg.sender)}>
                            {msg.sender === 'them' && (
                                <img
                                    src={activeUser.avatar || '/assets/pic.jpg'}
                                    alt="user"
                                    style={styles.messageAvatar}
                                />
                            )}

                            {/* Message bubble */}
                            <div>
                                <div style={styles.messageBubble(msg.sender)}>

                                    {msg.text && <div>{msg.text}</div>}

                                    {msg.img && (
                                        <img
                                            src={msg.imgUrl || '/assets/cat.jpg'}
                                            alt="chat"
                                            style={{ ...styles.chatImage, cursor: 'pointer' }}
                                            onClick={() => setPreviewImage(msg.imgUrl || '/assets/cat.jpg')}
                                        />
                                    )}

                                    {msg.audio && msg.audioUrl && (
                                        <audio controls style={{ width: 220, marginTop: 6 }}>
                                            <source src={msg.audioUrl} type="audio/webm" />
                                            Your browser does not support audio playback.
                                        </audio>
                                    )}

                                    {msg.document && (
                                        <a
                                            href={msg.document}
                                            download={msg.text}
                                            style={{
                                                color: '#2563eb',
                                                textDecoration: 'underline',
                                                marginTop: 8,
                                                display: 'block'
                                            }}
                                        >
                                            {msg.text}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {msg.sender === 'me' && (
                                <img
                                    src="/assets/chess.jpg"
                                    alt="user"
                                    style={styles.messageAvatar}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div style={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={styles.messageInputContainer}>
                        <ChatAttachmentMenu onAttach={handleAttach} />
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={styles.messageInput}
                        />
                        <ChatRecorder onRecordComplete={handleAudioRecorded} />
                        <button onClick={handleSendMessage} style={styles.sendButton}>
                            <Send />
                        </button>
                    </div>
                </div>

                {/* Image Preview Modal */}
                {previewImage && (
                    <div
                        onClick={() => setPreviewImage(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0, 0, 0, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            cursor: 'zoom-out',
                        }}
                    >
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 12 }}
                        />
                    </div>
                )}
            </div>
        )
    );
};

export default ChatWindow;
