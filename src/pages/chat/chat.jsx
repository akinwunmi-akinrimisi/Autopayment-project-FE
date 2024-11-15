import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Star, Info } from 'lucide-react';
import Avatar from "../../assets/sidebar/Ellipse.png";
import Sim from "../../assets/sidebar/sim.jpg";

const ChatInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample chat history
  const chatHistory = [
    {
      id: 1,
      title: "Discussion about API fixes",
      user: 'Jennifer Markus',
      avatar: {Avatar},
      messages: [
        {
          id: 1,
          sender: 'Jennifer Markus',
          content: 'Hey! Did you hear the m-fi will get fixes to fix its api last git?',
          timestamp: 'June 12, 2023'
        },
        {
          id: 2,
          sender: 'You',
          content: 'Yes, I heard about that. The updates should improve performance.',
          timestamp: 'June 12, 2023'
        }
      ],
      timestamp: 'June 12, 2023'
    },
    {
      id: 2,
      title: "Invoice Review",
      user: 'Ilya Rekotn',
      avatar: {Avatar},
      messages: [
        {
          id: 1,
          sender: 'Ilya Rekotn',
          content: 'I have seen your invoice',
          timestamp: 'June 13, 2023'
        },
        {
          id: 2,
          sender: 'You',
          content: 'Great, let me know if you have any questions.',
          timestamp: 'June 13, 2023'
        }
      ],
      timestamp: 'June 13, 2023'
    }
  ];

  // Filter chat history based on search query
  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // Handle sending new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        id: currentMessages.length + 1,
        sender: 'You',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setCurrentMessages([...currentMessages, newMessage]);
      setMessageInput('');
    }
  };

  // Handle viewing history
  const handleViewHistory = (historyChatSession) => {
    setIsViewingHistory(true);
    setCurrentMessages(historyChatSession.messages);
  };

  // Handle starting new chat
  const handleNewChat = () => {
    setIsViewingHistory(false);
    setCurrentMessages([]);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col">
        <div className="p-4 border-b">
          <button 
            onClick={handleNewChat}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mb-4"
          >
            New Chat
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search chat history"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredHistory.map((chat) => (
            <div
              key={chat.id}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b"
              onClick={() => handleViewHistory(chat)}
            >
              <div className="flex items-start space-x-3">
                <img src={Avatar} alt={chat.user} className="w-8 h-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{chat.title}</span>
                    <span className="text-xs text-gray-400">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {chat.messages[chat.messages.length - 1].content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-medium">
              {isViewingHistory ? 'Mum Ratson' : 'New Chat'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Star className="w-5 h-5 text-gray-400" />
            <Search className="w-5 h-5 text-gray-400" />
            <Info className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          <div className="flex flex-col space-y-4">
            {currentMessages.map((message) => (
              <div key={message.id} className={`flex space-x-3 ${message.sender === 'You' ? 'justify-end' : ''}`}>
                {message.sender !== 'You' && (
                  <img src={Avatar} alt={message.sender} className="w-8 h-8 rounded-full" />
                )}
                <div className={`flex flex-col ${message.sender === 'You' ? 'items-end' : ''}`}>
                  <p className={`p-4 rounded-lg inline-block max-w-2xl ${
                    message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}>
                    {message.content}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">{message.timestamp}</p>
                </div>
                {message.sender === 'You' && (
                  <img src={Sim} alt="You" className="w-8 h-8 rounded-full" />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-white border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 border-l">
        <div className="p-4 flex items-center justify-between border-b">
          <span className="text-sm font-medium">Comments</span>
          <span className="text-sm text-gray-500">Properties</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;