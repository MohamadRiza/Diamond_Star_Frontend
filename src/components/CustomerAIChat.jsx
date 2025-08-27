// src/components/CustomerAIChat.jsx
import React, { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CustomerAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ai/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const aiMsg = { type: "ai", text: data.reply };
      setChat((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { type: "ai", text: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center animate-bounce hover:animate-none"
          aria-label="Open AI Assistant"
        >
          <FaRobot size={24} />
        </button>
      ) : (
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold text-sm">AI Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {chat.length === 0 ? (
              <p className="text-gray-500 italic">
                Ask me about jobs, visas, or how to apply!
              </p>
            ) : (
              chat.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.type === "user"
                      ? "ml-auto bg-blue-100 text-gray-800"
                      : "mr-auto bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            {loading && (
              <div className="mr-auto bg-gray-100 text-gray-800 p-2 rounded-lg max-w-[80%]">
                🤖 Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t">
            <div className="flex gap-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about jobs or visas..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerAIChat;