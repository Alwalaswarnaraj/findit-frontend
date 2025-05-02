import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Trash2 } from 'lucide-react';


// const socket = io('http://localhost:5000');

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');
  const userId = JSON.parse(atob(token.split('.')[1])).id;
  const userName = JSON.parse(atob(token.split('.')[1])).name;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
    socket.emit('join', conversationId);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('typing', () => setIsTyping(true));
    socket.on('stopTyping', () => setIsTyping(false));

    socket.on('messageDeleted', (deletedMessageId) => {
      setMessages(prevMessages =>
        prevMessages.filter(m => m._id !== deletedMessageId)
      );
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('typing');
      socket.off('stopTyping');
      socket.off('messageDeleted');
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleTyping = (e) => {
    setText(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit('typing', { conversationId, sender: userName });

      setTimeout(() => {
        setTyping(false);
        socket.emit('stopTyping', { conversationId });
      }, 2000);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      sender: { _id: userId, name: userName },
      text,
    };

    socket.emit('sendMessage', {
      conversationId,
      message: newMsg,
    });
    setMessages((prev) => [...prev, newMsg]);
    setText('');
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await api.delete(`http://localhost:5000/api/conversations/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(prevMessages => prevMessages.filter(m => m._id !== messageId));

    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border rounded p-4 h-96 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender._id === userId;
          return (
            <div
              key={index}
              className={`mb-2 ${isCurrentUser ? 'text-right' : 'text-left'}`}
            >
              <div className="flex items-center justify-between">
                {isCurrentUser ? (
                  <>
                    <span className="font-semibold">{msg.sender.name}</span>
                    <button
                      onClick={() => handleDeleteMessage(msg._id)}
                      className="ml-2 bg-transparent border-none cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="font-semibold">{msg.sender.name}</span>
                  </>
                )}
              </div>
              <p
                className={`p-2 rounded-md ${isCurrentUser ? 'bg-blue-200' : 'bg-gray-200'}`}
              >
                {msg.text}
              </p>
            </div>
          );
        })}
        {isTyping && <div className="text-gray-500 italic">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex">
        <input
          value={text}
          onChange={handleTyping}
          className="flex-1 border px-3 py-2 rounded-l"
          placeholder="Type a message"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default React.memo(ChatPage);
