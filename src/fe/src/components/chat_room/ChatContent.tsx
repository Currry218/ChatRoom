import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { BsCameraVideoFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add new message to list
    setMessages((prev) => [...prev, { text: input, sender: "me" }]);
    setInput(""); // clear input
  };

  return (
    <div className="flex flex-col min-h-full min-w-full border-r">
      {/* Header */}
      <div className="flex items-center gap-3 p-2 border-b border-gray-500 hover:bg-gray-100 cursor-pointer transition">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4775/4775537.png"
          alt="room name"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col flex-1">
          <span className="font-semibold text-gray-800">ROOM NAME</span>
          <span className="text-sm text-gray-500 truncate">jakfjskfj</span>
        </div>
        <FaPhone className="w-6 h-6 cursor-pointer" />
        <BsCameraVideoFill className="w-6 h-6 cursor-pointer" />
        <AiFillInfoCircle className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "me"
                  ? "bg-gray-500 text-white rounded-br-none"
                  : "bg-gray-300 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-2 border-t bg-white">
        <div className="relative">
          <input
            type="text"
            id="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="block w-full p-4 pe-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
            placeholder="Type a message..."
            required
          />
          <button
            type="submit"
            className="absolute end-2.5 bottom-2.5 text-gray-700 hover:text-gray-800"
          >
            <IoMdSend className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContent;
