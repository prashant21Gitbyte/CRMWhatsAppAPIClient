import React, { useState, useEffect } from 'react';
import { Search, CheckCheck, Pin, Eye, Phone, Mail, MoveRight, Play, MoreVertical, Send, ArrowLeft, Users, User } from 'lucide-react';
import ContactTabs from './ConversationTabs.jsx';
import ChatAttachmentMenu from './uploadFile.jsx';
import ChatRecorder from './AudioR.jsx';
import ChatWindow from './ChatWindow.jsx';
 
const data = [
  { name: 'Kumar Pulkesin', phone: '919910181368' },
  { name: 'Abhishek Chauhan', phone: '917233032410' },
  { name: 'Arpit Salecha', phone: '919717701927' },
  { name: 'Aditya Kumawat', phone: '918764427565' },
  { name: 'Akanshi sarsar', phone: '918854058778' },
  { name: 'Someone Else', phone: '919812345678' },
  { name: 'Another Person', phone: '919898989898' },
  { name: 'Extra Name', phone: '917777777777' },
  { name: 'Long List', phone: '916666666666' },
  { name: 'Scrollable', phone: '915555555555' },
  { name: 'Scroll More', phone: '914444444444' },
  { name: 'Keep Going', phone: '913333333333' },
];
 
const ChatUser = ({ avatar, name, message, time, unread, pinned, seen, online, onClick, isActive }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={styles.chatUserContainer(isActive, isHover)}
    >
      <div style={styles.avatarWrapper}>
        <img src={avatar} alt={name} style={{ height: '100%', width: '100%' }} />
      </div>
      <div style={styles.chatUserInfo}>
        <div style={styles.userTopRow}>
          <div style={styles.userName}>{name}</div>
          <div style={styles.userTimeRow}>
            {seen && <CheckCheck size={14} />}
            <span>{time}</span>
          </div>
        </div>
        <div style={styles.userBottomRow}>
          <div style={styles.userMessage}>{message}</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {unread > 0 && <div style={styles.unreadBadge}>{unread}</div>}
            {pinned && <Pin size={14} />}
          </div>
        </div>
      </div>
    </div>
  );
};
 
 
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('chats');
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(true);
  const [search, setSearch] = useState('');
 
  const filteredUsers = users.filter(user =>
    (user.name || '').toLowerCase().includes(search.trim().toLowerCase())
  );
 
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phone.includes(searchTerm)
  );
 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('CRM Landing');
 
  const onSave = ({ source, name, phone }) => {
    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }
 
    const newUser = {
      id: users.length + 1,
      name,
      phone,
      message: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '/assets/default.jpg',
      source,
    };
 
    setUsers(prev => [...prev, newUser]);
    setName('');
    setPhone('');
    setSource('CRM Landing');
    setShowNewForm(false);
  };
 
 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  useEffect(() => {
    const initialUsers = [
      { id: 1, name: 'Leonardo DiCaprio', message: 'Hello, everyone!', time: '08:00 PM', avatar: '/assets/cat.jpg', online: true },
      { id: 2, name: 'Meryl Streep', message: "What's up?", time: '11:15 AM', avatar: '/assets/chess.jpg', online: true },
      { id: 3, name: 'Cate Blanchett', message: 'Hi James!', time: '03:00 PM', unread: 4, pinned: true, avatar: '/assets/pic.jpg' },
      { id: 4, name: 'Brad Pitt', message: "Not yet, but I'm thinking of going hiking.", time: '07:30 PM', seen: true, avatar: '/assets/rocket.png' },
      { id: 5, name: 'Angelina Jolie', message: 'Hello there!', time: '09:00 AM', seen: true, pinned: true, avatar: '/assets/images.jpg' },
      { id: 6, name: 'Divya Sharma', message: 'Hi James!', time: '03:00 PM', unread: 4, pinned: true, avatar: '/assets/pic.jpg' },
      { id: 7, name: 'Harshita ', message: "Not yet, but I'm thinking of going hiking.", time: '07:30 PM', seen: true, avatar: '/assets/rocket.png' },
      { id: 8, name: 'Abhilasha Battu', message: 'Hello there!', time: '09:00 AM', seen: true, pinned: true, avatar: '/assets/images.jpg' },
    ];
 
    const initialMessages = [
      { id: 1, sender: 'them', text: 'That sounds fun!', time: '10:30 AM', views: 4, img: true },
      { id: 2, sender: 'me', text: 'Any plans for the weekend?', time: '03:00 PM', views: 6, audio: true },
      { id: 3, sender: 'them', text: 'Good morning!', time: '10:00 AM', views: 3, img: true },
    ];
 
    setUsers(initialUsers);
    setMessages(initialMessages);
    setActiveUser(initialUsers[0]);
  }, []);
 
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time,
      views: 0,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
 
  const handleAttach = (type, file) => {
    if (!file || !type) return;
 
    if (type === 'image') {
      const imageUrl = URL.createObjectURL(file);
      const newMsg = {
        id: Date.now(),
        sender: 'me',
        img: true,
        imgUrl: imageUrl,
        text: '',
        views: 0,
        time: 'Now'
      };
      setMessages(prev => [...prev, newMsg]);
    }
 
    if (type === 'document') {
      const docUrl = URL.createObjectURL(file);
      const newMsg = {
        id: Date.now(),
        sender: 'me',
        document: docUrl,
        text: file.name,
        views: 0,
        time: 'Now'
      };
      setMessages(prev => [...prev, newMsg]);
    }
 
    if (type === 'audio') {
      const audioUrl = URL.createObjectURL(file);
      const newMsg = {
        id: Date.now(),
        sender: 'me',
        audio: true,
        audioUrl: audioUrl,
        text: '',
        views: 0,
        time: 'Now'
      };
      setMessages(prev => [...prev, newMsg]);
    }
  };
 
 
  const handleAudioRecorded = (file, audioUrl) => {
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      views: 0,
      text: '',
      audio: true,
      audioUrl: audioUrl,
    };
    setMessages((prev) => [...prev, newMsg]);
  };
 
  if (!visible) return null;
  return (
    <>
      {/* <UserDetail/> */}
      <div>
    <div
  style={{
    ...(styles.container?.(isMobile, showChat) || {}),
    height: '86vh',
    flex:1,
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    width:'100%',
  
  }}
  className="mt-5 pt-5 pt-lg-0"
>
  {(!isMobile || !showChat) && (
    <div
      style={{
        ...styles.sidebar?.(isMobile),
        //width: isMobile ? '100%' : '30%',
        maxWidth: 450,
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid #e5e7eb',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {/* Fixed Header */}
      <div
        style={{
          flexShrink: 0,
          padding: '8px 0',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#fff',
        }}
      >
        <ContactTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
 
      {/* Scrollable Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 10,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {activeTab === 'chats' && (
          <>
            <div style={styles.searchWrapper}>
              <Search style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search contact"
                style={styles.searchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {filteredUsers.map((user) => (
              <ChatUser
                key={user.id}
                {...user}
                isActive={activeUser?.id === user.id}
                onClick={() => {
                  setActiveUser(user);
                  if (isMobile) setShowChat(true);
                }}
              />
            ))}
          </>
        )}
 
        {activeTab === 'contacts' && (
          <div style={styles.contactListWrapper}>
            {data.map((contact, index) => (
              <div key={index} style={styles.contactRow}>
                <div style={styles.contactAvatar}>
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={styles.contactName}>{contact.name}</div>
                  <div style={styles.contactPhone}>+{contact.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* Footer */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-around',
          padding: 5,
          borderTop: '1px solid #ddd',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          onClick={() => setShowBulkForm(true)}
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={fabStyle}><Users color="#fff" /></div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Bulk Chat</div>
        </div>
        <div
          onClick={() => setShowNewForm(true)}
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={fabStyle}><User color="#fff" /></div>
          <div style={{ fontSize: 12, marginTop: 4 }}>New Chat</div>
        </div>
      </div>
    </div>
  )}
 
  {/* Chat Window */}
  <ChatWindow
    isMobile={isMobile}
    showChat={showChat}
    setShowChat={setShowChat}
    activeUser={activeUser}
    messages={messages}
    newMessage={newMessage}
    setNewMessage={setNewMessage}
    handleSendMessage={handleSendMessage}
    handleAttach={handleAttach}
    handleAudioRecorded={handleAudioRecorded}
    styles={styles}
  />
</div>
 
      </div>
      {/* Bulk Chat Form */}
      {showBulkForm && (
 
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.title}>Select Object</h2>
 
 
            <div style={styles.row}>
              {/* <label htmlFor="objectSelect" style={{ marginBottom: 4 }}>Select Object</label> */}
              <select id="objectSelect" style={styles.select}>
                <option value="Lead">Lead</option>
                <option value="Contact">Contact</option>
              </select>
              <button style={styles.queryButton}>Write Query</button>
            </div>
 
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by Name or Phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.search}
            />
 
            {/* Table Section */}
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}></th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" /></td>
                      <td style={{ fontSize: 12 }}>{item.name}</td>
                      <td style={{ fontSize: 12 }}>{item.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
 
            {/* Footer Buttons */}
            <div style={styles.footer}>
              {/* <button style={styles.cancelBtn} onClick={() => onclose}>Cancel</button> */}
              <button onClick={() => setShowBulkForm(false)} style={styles.cancelBtn}>Cancel</button>
              <button style={styles.nextBtn}>Next</button>
            </div>
          </div>
        </div>
      )}
 
 
      {/* New Chat Form */}
      {showNewForm && (
        <div style={styles.overlay2}>
          <div style={styles.modal2}>
            <h2 style={styles.title2}>Add New Contact</h2>
            <div style={styles.body2}>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={styles.select2}
              >
                <option value="CRM Landing">CRM Landing</option>
                <option value="Website">Website</option>
                <option value="Social Media">Social Media</option>
              </select>
 
              <label style={styles.label2}>Customer Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input2}
              />
 
              <label style={styles.label2}>Phone Number</label>
              <input
                type="text"
                placeholder="Enter number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input2}
              />
            </div>
 
            <div style={styles.footer}>
              <button onClick={() => setShowNewForm(false)} style={styles.cancelButton2}>Cancel</button>
              <button
                onClick={() => onSave({ source, name, phone })}
                style={styles.saveButton2}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
 
export default ChatPage;
 
const fabStyle = {
  backgroundColor: '#6366f1',
  borderRadius: '50%',
  width: 25,
  height: 25,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
 
const styles = {
 
   container: (isMobile, showChat) => ({
    display: 'flex',
    height: '90vh',
    fontFamily: 'Arial, sans-serif',
    flexDirection: isMobile && showChat ? 'column' : 'row',
    padding: 16,
    gap: 16,
    width:'100%',
  }),
 
  sidebar: (isMobile) => ({
    width: isMobile ? '100%' : 380,
    borderRadius: 16,
    background: '#ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    border: '1px solid #e2e8f0',
    height: '100%',
    //flex:1,
    display: 'flex',
     maxHeight: '90vh',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 16,
    flexShrink: 0,
  }),
 
   chatWindow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    background: '#fff',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
 
  chatHeader: {
    height: 60,
    padding: '0 16px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    background: '#f9fafb',
    flexShrink: 0,
  },
 
 
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
    scrollbarWidth: 'none',
          msOverflowStyle: 'none',
  },
 
  messageInputContainer: {
    height: 80,
    padding: 16,
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    background: '#f9fafb',
    flexShrink: 0,
  },
 
  messageInput: {
    flex: 1,
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: 9999,
    fontSize: 14,
    outline: 'none',
  },
 
  sendButton: {
    background: '#6366f1',
    color: 'white',
    padding: 10,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  chatUserContainer: (isActive, isHover) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    background: isActive ? '#dfefff' : isHover ? '#f1f5f9' : 'transparent',
    transition: 'background 0.2s, transform 0.2s',
    boxShadow: isHover ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
  }),
 
  messagesScrollFix: {
    '&::-webkit-scrollbar': { display: 'none' },
    scrollbarWidth: 'none',
  },
 
  responsiveChatWindow: () => {
    const isMobile = window.innerWidth < 768;
    return {
      ...styles.chatWindow,
      height: isMobile ? 'calc(100vh - 60px)' : '100vh',
    };
  },
 
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Faded background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    width: '80%',
    maxWidth: 600,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    fontFamily: 'sans-serif',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: 0,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  select: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  queryButton: {
    backgroundColor: '#6366f1',
    color: '#fff',
    padding: '5px 16px',
    fontSize: 12,
    borderRadius: 20,
    border: 'none',
    cursor: 'pointer',
  },
  search: {
    padding: 5,
    borderRadius: 8,
    fontSize: 12,
    border: '1px solid #ccc',
    marginBottom: 12,
    width: '100%',
  },
  tableWrapper: {
    overflowY: 'auto',
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    background: '#f9f9f9',
    fontSize: 14,
    padding: 8,
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  footer: {
    fontSize: 12,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ccc',
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  nextBtn: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ccc',
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
  },
  overlay2: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal2: {
    backgroundColor: 'white',
    borderRadius: '15px',
    width: '120%',
    maxWidth: '400px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  title2: {
    margin: 0,
    padding: '15px',
    borderBottom: '1px solid #ccc',
    textAlign: 'center',
    fontSize: 20,
  },
  body2: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label2: {
    fontSize: '14px',
    fontWeight: '500',

    color: '#333',
    marginLeft: 5
  },
  select2: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #999',
    width: '100%',
  },
  input2: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #999',
    width: '100%',
  },
  footer2: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    padding: '15px 20px',
    borderTop: '1px solid #ccc',
  },
  cancelButton2: {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: '#ccc',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 10,
  },
  saveButton2: {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: '#6366f1',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 10,
    marginRight: 20,
  },
 
 
  body: {
    background: 'white',
    borderRadius: 20,
    margin: 10,
  },
  avatarWrapper: {
    position: 'relative',
    height: 40,
    width: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #cbd5e1',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
  },
 
  chatUserInfo: {
    flex: 1,
  },
  userTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: 15,
  },
  userName: {
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#111827',
    fontWeight: 500,
  },
  userTimeRow: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    color: '#64748b',
    fontSize: 12,
    fontWeight: '400'
  },
  userBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 4,
    fontSize: 13,
    color: '#4b5563',
    alignItems: 'center',
  },
  userMessage: {
    maxWidth: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  unreadBadge: {
    background: '#6366f1',
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    borderRadius: '20px',
    padding: '2px 8px',
  },
  searchWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 16,
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    width: 20,
    height: 20,
  },
  searchInput: {
    width: '99%',
    padding: '10px 16px 10px 44px',
    borderRadius: 9999,
    border: '1px solid #e2e8f0',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  searchInputFocus: {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)',
  },
 
  avatar: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    border: '2px solid #cbd5e1',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
  },
  headerNameSection: {
    flex: 1,
    marginLeft:10
  },
  headerName: {
    fontSize: 16,
    fontWeight: 500,
    color: '#111827',
    // marginLeft:6
  },
  headerRole: {
    fontSize: 13,
    color: '#64748b',
    marginTop: -2,
  },
  headerIconsWrapper: {
    display: 'flex',
    gap: 12,
  },
  headerIconCircle: {
    background: '#eef2ff',
    border: '1px solid #c7d2fe',
    borderRadius: '50%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': {
      background: '#dbeafe',
    },
  },
 
  messageRow: (sender) => ({
    display: 'flex',
    justifyContent: sender === 'me' ? 'flex-end' : 'flex-start',
    alignItems: 'flex-start',
    gap: 12,
  }),
  messageAvatar: {
    height: 35,
    width: 35,
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  messageBubble: (sender) => ({
    background: sender === 'me' ? '#f8fafc' : '#f8fafc',
    color: sender === 'me' ? 'black' : '#111827',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    padding: 12,
    maxWidth: 280,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxShadow: sender === 'me' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    wordBreak: 'break-word',
    transition: 'background 0.2s, transform 0.2s',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  }),
  messageMoreIcon: (sender) => ({
    position: 'absolute',
    right: sender === 'me' ? -24 : 8,
    top: 8,
    cursor: 'pointer',
    padding: 4,
    borderRadius: '50%',
    transition: 'background 0.2s',
    '&:hover': {
      background: '#e2e8f0',
    },
  }),
  chatImage: {
    marginTop: 2,
    borderRadius: 10,
    width: '180px',
    height: '90px',
    objectFit: 'cover',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  audioWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  audioPlayButton: {
    background: '#6366f1',
    color: 'white',
    padding: 8,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': {
      background: '#4f46e5',
    },
  },
  audioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: '#4f46e5',
    border: '1px solid #c7d2fe',
    padding: '4px 10px',
    borderRadius: 6,
  },
  viewersWrapper: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  viewerAvatar: {
    height: 24,
    width: 24,
    borderRadius: '50%',
    border: '1px solid #fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  messageMeta: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  messageInputFocus: {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)',
  },
 
  contactListWrapper: {
  scrollbarWidth: 'none',
  // msOverflowStyle: 'none',
   flex: 1,
  overflowY: 'auto',
  height: '100%',
  padding: '1rem',
},
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
    gap: '1rem',
    transition: 'background 0.2s',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    fontWeight: 'bold',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: {
    fontWeight: '500',
    fontSize: 15,
    color: '#111827',
  },
  contactPhone: {
    fontSize: 13,
    color: '#6b7280',
  },
};