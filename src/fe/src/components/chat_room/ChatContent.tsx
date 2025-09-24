import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa6";
import { BsCameraVideoFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import axios from "axios";
import ChatRoomInfo from "./ChatRoomInfo";
import { IoChatbubblesSharp } from "react-icons/io5";
import ChatInput from "./ChatInput";

interface Message {
  _id: string;
  content: string;
  messenger: string;
  createdAt: string;
}
interface Member {
  username: string;
  avatar: string;
}
interface ChatRoom {
  _id: string;
  name: string;
  avatar: string;
  currentMember: string[];
}

interface ChatContentProps {
  roomId: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [start, setStart] = useState(0);
  const [end] = useState(25); // page size

  const token = localStorage.getItem("access_token");
  const currentUser = localStorage.getItem("userId") || "";
  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const roomRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/chatroom/${roomId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoom(roomRes.data);

        const msgRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/chatroom/${roomId}/messages?start=${start}&end=${end}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(msgRes.data);

        const memRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/member/room/${roomId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMembers(memRes.data);
      } catch (err) {
        console.error("Failed to fetch chat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId, start, end]);

  const messagesWithMember = messages.map((msg) => {
    const member = members.find((m) => m.username === msg.messenger);
    return {
      ...msg,
      avatar: member?.avatar,
      username: member?.username || msg.messenger,
    };
  });
  const handleNewMessage = (msg: any) => {
    setMessages((prev) => [...prev, msg]); // append new message
  };

  if (!roomId)
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <IoChatbubblesSharp className="w-2xl h-2xl" />
        Select a chat room {roomId}
      </div>
    );

  return (
    <>
      <div className="flex flex-row h-[90vh] w-full">
        <div
          className={`flex flex-col border-r transition-all duration-300 ${showRoomInfo ? "w-3/4" : "w-full"}`}
        >
          {/* Header */}
          <div className="chat-room-header flex items-center gap-3 p-2 border-b">
            <img
              src={room?.avatar}
              alt={room?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="flex-1 font-semibold text-xl truncate">
              {room?.name}
            </span>
            <FaPhone className="w-6 h-6 cursor-pointer" />
            <BsCameraVideoFill className="w-6 h-6 cursor-pointer" />
            <AiFillInfoCircle
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowRoomInfo(!showRoomInfo)}
            />
          </div>

          {/* Messages */}

          <div className="flex-1 p-4 overflow-y-auto flex flex-col">
            {/* Load older messages */}
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setStart((prev) => prev + end)}
                className="text-blue-500 hover:underline text-sm"
              >
                Load older messages
              </button>
            </div>
            {loading && (
              <p className="text-center text-gray-500">Loading messages...</p>
            )}

            {messagesWithMember.map((msg) => {
              const isMe = msg.messenger === currentUser;
              return (
                <div
                  key={msg._id}
                  className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {/* Left side: other users */}
                  {!isMe && (
                    <div className="flex items-start gap-2">
                      <img
                        className="w-10 h-10 rounded-full object-cover mt-1"
                        src={msg.avatar}
                        alt={msg.username}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-700">
                          {msg.username}
                        </span>
                        <div className="bg-gray-200 px-3 py-2 rounded-lg max-w-xs break-words">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  )}

                  {isMe && (
                    <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs break-words self-end rounded-br-none">
                      {msg.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <ChatInput
            roomId={roomId}
            username={currentUser}
            onMessageSent={handleNewMessage}
          />
        </div>

        {/* Right: Room Info */}
        {showRoomInfo && (
          <aside className="w-1/4 border-l bg-white h-full overflow-y-auto transition-all duration-300">
            <ChatRoomInfo room={room} members={members} />
          </aside>
        )}
      </div>
    </>
  );
};

export default ChatContent;
