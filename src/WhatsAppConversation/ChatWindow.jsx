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
    const [previewImage, setPreviewImage] = useState(null);
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
 
    if (!(!isMobile || showChat) || !activeUser) return null;
 
    return (
        (!isMobile || showChat) && activeUser && (
            <>
                <div style={{width:'100%'}}>
                <style>{`
                    @media (max-width: 768px) {
                        .responsive-chat-window {
                            width: 100% !important;
                            height: calc(100vh - 145px) !important;
                            top: 130px !important;
                            position: fixed !important;
                            z-index: 999 !important;
                            background-color: white;
                            margin-left: -17px;
                        }
                    }
                `}</style>
 
                <div
                    className="responsive-chat-window"
                    style={{
                        ...styles.chatWindow,
                        width: showProfileInfo ? '75%' : '100%',
                        transition: 'width 0.3s ease',
                        overflowY: 'auto',
                        backgroundColor: '#fff',
                    }}
                >
                    {/* Header */}
                    <div style={styles.chatHeader}>
                        {isMobile && (
                            <button onClick={() => setShowChat(false)} style={{ background: 'transparent', border: 'none' }}>
                                <ArrowLeft size={24} />
                            </button>
                        )}
                        <div style={{ position: 'relative' }} ref={profileRef}>
                            <img
                                src={activeUser.avatar}
                                alt={activeUser.name}
                                style={{ ...styles.avatar, cursor: 'pointer' }}
                                onClick={() => setShowProfileInfo((prev) => !prev)}
                            />
                        </div>
 
                        <div style={styles.headerNameSection}>
                            <div style={styles.headerName}>{activeUser.name}</div>
                            <div style={styles.headerRole}>Data Analyst</div>
                        </div>
 
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
                                                    display: 'block',
                                                }}
                                            >
                                                {msg.text}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {msg.sender === 'me' && (
                                    <img src="/assets/chess.jpg" alt="user" style={styles.messageAvatar} />
                                )}
                            </div>
                        ))}
                    </div>
 
                    {/* Input */}
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
                </div>
 
                {/* Profile Modal */}
 
 
                {showProfileInfo && (
                    <div>
                        <style>
  {`
    .responsive-profile-modal {
      display: flex;
      position: fixed;
      top: 120px;
      right: 0;
      height: 84%;
      z-index: 999;
      width: 20%; /* Default for large screens */
      background-color: white;
    }
      
    .responsive-profile-modal > div {
      width: 100%;
      border-radius: 10px;
      padding: 1rem 1.5rem;
      overflow-y: auto;
    }
 
    @media (max-width: 1200px) {
      .responsive-profile-modal {
        width: 40% !important;
      }
    }
 
    @media (max-width: 992px) {
      .responsive-profile-modal {
        width: 60% !important;
      }
    }
 
    @media (max-width: 768px) {
      .responsive-profile-modal {
        width: 100% !important;
        height: calc(100vh - 98px) !important;
        top: 120px !important;
        background-color: white;
      }
 
      .responsive-profile-modal > div {
        width: 90% !important;
        margin: 0 auto;
        border-radius: 0 !important;
        height: 100%;
        padding: 1rem;
      }
    }
  `}
</style>
 
                        <div
                            className="responsive-profile-modal"
                            style={{
                                width:'20%',
                                display: 'flex',
                                position: 'fixed',
                                top: 120,
                                right: 0,
                                height: '84%',
                                zIndex: 999,
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    boxShadow: '-2px 0 12px rgba(0,0,0,0.07)',
                                    padding: '1rem 1.5rem',
                                    overflowY: 'auto',
                                    transition: 'transform 0.3s ease',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                {/*profile content */}
                                <div style={{ display: 'flex', alignItems: 'center', }}>
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
                                    <h2 style={{ fontSize: 16, fontWeight: '500', marginLeft: 8, marginTop: 8 }}>Contact Info</h2>
                                </div>
 
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                                    <img
                                        src={activeUser.avatar}
                                        alt={activeUser.name}
                                        style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }}>
                                    +91 92747592850 (You)
                                </div>
                                <div style={{ textAlign: 'center', fontSize: 14, color: '#64748b', marginBottom: 20 }}>
                                    ~{activeUser.name} 😁
                                </div>
 
                                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: '#334155', marginBottom: 4 }}>About</div>
                                    <div style={{ fontSize: 14, color: '#475569' }}>Hey there! I am using WhatsApp.</div>
                                </div>
 
                                <div style={{ marginTop: 20, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 8,
                                        }}
                                    >
                                        <div style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>Media, links and docs</div>
                                        <div style={{ fontSize: 14, color: '#2563eb', cursor: 'pointer' }}>14 {'>'}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {[1, 2].map((n) => (
                                            <img
                                                key={n}
                                                src="/assets/chess.jpg"
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
                            </div>
                        </div>
                    </div>
                )}
 
 
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
            </div >
            </>
        )
    );
};
 
export default ChatWindow;
 
 