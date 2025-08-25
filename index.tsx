import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there! How can I help you today?', type: 'received' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat window when new messages are added
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, type: 'sent' }]);
      setInputValue('');
      // Simulate a reply after a short delay
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Thanks for your message!', type: 'received' }]);
      }, 1000);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Messaging App</h1>
      </header>
      <main className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </main>
      <footer className="message-form-container">
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            aria-label="Type a message"
          />
          <button type="submit" aria-label="Send message">Send</button>
        </form>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
