import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Image, Send } from "lucide-react";
import "./ChatWindow.css";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sumeet", time: "June 13, 2025 5:02 PM", type: "text", content: "Hi" }
    // ... add more initial messages
  ]);
  const [input, setInput] = useState("");
  const fileRef = useRef();
  const imgRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(m => [
      ...m,
      {
        id: m.length + 1,
        sender: "You",
        time: new Date().toLocaleString(),
        type: "text",
        content: input
      }
    ]);
    setInput("");
  };

  const handleFile = e => {
    const f = e.target.files[0];
    if (f) {
      setMessages(m => [
        ...m,
        { id: m.length + 1, sender: "You", time: new Date().toLocaleString(), type: "file", content: `📎 ${f.name}` }
      ]);
    }
  };

  const handleImage = e => {
    const f = e.target.files[0];
    if (f) {
      setMessages(m => [
        ...m,
        {
          id: m.length + 1,
          sender: "You",
          time: new Date().toLocaleString(),
          type: "image",
          content: URL.createObjectURL(f)
        }
      ]);
    }
  };

  return (
    <div className="chat-container">
      <header className="header">
        <div className="user-info">
          <div className="avatar" />
          <div>
            <div className="name">Sumeet</div>
            <div className="phone">+91 99700 15420</div>
          </div>
        </div>
        <select className="dropdown"><option>CRM Landing</option></select>
      </header>

      <main className="chat-box">
        {messages.map(msg => {
          const isYou = msg.sender === "You";
          return (
            <div key={msg.id} className={`message-row ${isYou ? "you" : ""}`}>
              <div className={`bubble ${isYou ? "you" : "them"}`}>
                {msg.type === "image"
                  ? <img src={msg.content} alt="upload" />
                  : msg.content}
                <div className="time">{msg.time}</div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </main>

      <footer className="input-bar">
        <button onClick={() => fileRef.current.click()} className="icon-btn"><Paperclip/></button>
        <input type="file" ref={fileRef} hidden onChange={handleFile} />

        <button onClick={() => imgRef.current.click()} className="icon-btn"><Image/></button>
        <input type="file" accept="image/*" ref={imgRef} hidden onChange={handleImage} />

        <input
          className="input"
          placeholder="Type a message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="send-btn"><Send/></button>
      </footer>
    </div>
  );
}
