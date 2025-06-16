import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Image, Send } from 'lucide-react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sumeet', time: 'June 13, 2025 at 5:02 PM', type: 'text', content: 'Hi' },
    { id: 2, sender: 'Sumeet', time: 'June 13, 2025 at 5:06 PM', type: 'text', content: 'Hi' },
    { id: 3, sender: 'Sumeet', time: 'June 13, 2025 at 5:10 PM', type: 'text', content: 'Hi' },
    { id: 4, sender: 'Sumeet', time: 'June 13, 2025 at 6:03 PM', type: 'text', content: 'Hi' }
  ]);

  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        time: new Date().toLocaleString(),
        type: 'text',
        content: input
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        time: new Date().toLocaleString(),
        type: 'file',
        content: `📎 Uploaded: ${file.name}`
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        time: new Date().toLocaleString(),
        type: 'image',
        content: imageUrl
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          @media (max-width: 768px) {
            .chat-container {
              width: 90vw !important;
              height: 90vh !important;
              border-radius: 0 !important;
            }

            .chat-box {
              padding: 10px !important;
              max-height: calc(100vh - 130px) !important;
            }

            .input-area {
              padding: 10px !important;
            }

            .message-bubble {
              max-width: 85vw !important;
            }
          }

          @media (min-width: 1200px) {
            .chat-container {
              width: 75vw !important;
              height: 85vh !important;
            }
          }

          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="chat-container" style={styles.container}>
        <div style={styles.header}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}></div>
            <div>
              <div style={styles.name}>Sumeet</div>
              <div style={styles.phone}>919970015420</div>
            </div>
          </div>
          <select style={styles.dropdown}>
            <option>CRM Landing</option>
          </select>
        </div>

        <div className="chat-box" style={styles.chatBox}>
          {messages.map((msg) => {
            const isYou = msg.sender === 'You';
            return (
              <div key={msg.id} style={{ ...styles.messageRow, justifyContent: isYou ? 'flex-end' : 'flex-start' }}>
                <div style={{ textAlign: isYou ? 'right' : 'left' }}>
                  <div
                    className="message-bubble"
                    style={{
                      ...styles.messageBubble,
                      backgroundColor: isYou ? '#d1f2eb' : '#e5e5ea',
                      borderTopRightRadius: isYou ? 0 : 20,
                      borderTopLeftRadius: isYou ? 20 : 0
                    }}
                  >
                    {msg.type === 'image' ? (
                      <img src={msg.content} alt="uploaded" style={{ maxWidth: 200, borderRadius: 8 }} />
                    ) : (
                      msg.content
                    )}
                  </div>
                  <div style={styles.timeStamp}>{msg.time}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="input-area" style={styles.inputArea}>
          <div style={styles.attachIcon} onClick={() => fileInputRef.current.click()}>
            <Paperclip size={20} />
          </div>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />

          <div style={styles.attachIcon} onClick={() => imageInputRef.current.click()}>
            <Image size={20} />
          </div>
          <input type="file" accept="image/*" ref={imageInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />

          <input
            type="text"
            placeholder="Type message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.inputBox}
          />
          <button onClick={sendMessage} style={styles.sendButton}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid #ccc',
    borderRadius: 8,
    width: '75vw',
    height: '80vh',
    backgroundColor: '#fff',
  },
  header: {
    padding: '8px 15px',
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#ddd'
  },
  name: {
    fontWeight: 'bold'
  },
  phone: {
    fontSize: '0.85rem',
    color: '#666'
  },
  dropdown: {
    padding: 6,
    borderRadius: 6
  },
  chatBox: {
    flex: 1,
    padding: 16,
    overflowY: 'auto',
    backgroundColor: '#fafafa'
  },
  messageRow: {
    display: 'flex',
    marginBottom: 16
  },
  messageBubble: {
    display: 'inline-block',
    padding: '8px 10px',
    borderRadius: 20,
    maxWidth: '100%',
    wordWrap: 'break-word',
    marginRight: '10px'
  },
  timeStamp: {
    fontSize: '0.75rem',
    color: '#999',
    marginTop: 4
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 15px',
    borderTop: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    gap: '10px'
  },
  attachIcon: {
    cursor: 'pointer',
    color: '#888'
  },
  inputBox: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    border: '1px solid #ccc',
    outline: 'none'
  },
  sendButton: {
    backgroundColor: '#009688',
    border: 'none',
    borderRadius: '50%',
    padding: 10,
    cursor: 'pointer',
    color: 'white'
  }
};

export default ChatWindow;
