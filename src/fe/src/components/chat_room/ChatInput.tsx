import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { FaFaceGrin } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

interface Message {
  _id: string;
  roomId: string;
  messenger: string;
  type: string;
  content: string;
}

interface ChatInputProps {
  roomId: string;
  username: string;
  onMessageSent?: (message: Message) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ roomId, username, onMessageSent }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      roomId,
      messenger: username,
      type: "text",
      content: input.trim(),
    };

    try {
      const res = await axios.post<Message>(
        `${import.meta.env.VITE_API_URL}/message`,
        newMessage
      );
      if (onMessageSent) onMessageSent(res.data);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <form className="p-2 border-t" onSubmit={handleSendMessage}>
      <div className="flex gap-2 items-center">
        <button type="button" className="text-gray-700 hover:text-gray-800">
          <MdAttachFile className="w-6 h-6" />
        </button>
        <button type="button" className="text-gray-700 hover:text-gray-800">
          <FaFaceGrin className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="block w-full p-4 pe-12 text-sm rounded-lg border border-gray-500"
          placeholder="Type a message..."
        />
        <button type="submit" className="text-gray-700 hover:text-gray-800">
          <IoMdSend className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
