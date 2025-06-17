import React, { useState, useRef } from 'react';
import { Mic } from 'lucide-react';

const ChatRecorder = ({ onRecordComplete }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const file = new File([audioBlob], 'voice_message.webm', { type: 'audio/webm' });

        // ✅ Only call after audio is ready
        onRecordComplete(file, audioUrl);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };
  return (
    <button
      style={{
        background: recording ? '#f87171' : '#e2e8f0',
        border: 'none',
        borderRadius: '50%',
        padding: 8,
        marginLeft: 6,
        cursor: 'pointer',
      }}
      onMouseDown={handleStartRecording}
      onMouseUp={handleStopRecording}
      onTouchStart={handleStartRecording}
      onTouchEnd={handleStopRecording}
      title="Hold to Record"
    >
      <Mic size={20} color={recording ? '#fff' : '#334155'} />
    </button>
  );
};

export default ChatRecorder;
