import React, { useRef, useState } from 'react';
import { Plus } from 'lucide-react';

const ChatAttachmentMenu = ({ onAttach }) => {
  const fileInputRef = useRef();
  const [showOptions, setShowOptions] = useState(false);

  const handleFileSelect = (type) => {
  const acceptTypes = {
    document: '.pdf,.doc,.docx,.txt',
    image: 'image/*',
    audio: 'audio/*'
  };

  fileInputRef.current.accept = acceptTypes[type];

  fileInputRef.current.onchange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    onAttach(type, selectedFile); // Pass type + file
  };

  fileInputRef.current.click();
};


  return (
    <div style={{ position: 'relative', marginRight: 8 }}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <Plus size={24} />
      </button>

      {showOptions && (
        <div style={{
          position: 'absolute',
          top: -120,
          left: 0,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 8,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}
        >
          <button onClick={() => handleFileSelect('document')}>Document</button>
          <button onClick={() => handleFileSelect('image')}>Image</button>
          <button onClick={() => handleFileSelect('audio')}>Audio</button>
        </div>
      )}

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
};
export default ChatAttachmentMenu;