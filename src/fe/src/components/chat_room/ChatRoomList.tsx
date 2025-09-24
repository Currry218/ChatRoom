import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { BiSolidAddToQueue } from "react-icons/bi";

interface LatestMessage {
  _id: string;
  roomId: string;
  messenger: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MemberInfo {
  _id: string;
  username: string;
  avatar: string;
  role: string;
  roomId: string;
  joinedAt: string;
  lastSeenAt: string;
  isNotHere: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatRoom {
  _id: string;
  name: string;
  owner: string;
  isPublic: boolean;
  isDirect: boolean;
  currentMember: string[];
  avatar: string;
  latestMessage: LatestMessage | null;
  memberInfo: MemberInfo | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatRoomListProps {
  setSelectedRoom: (room: string) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ setSelectedRoom }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [showChatRooms, setShowChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchRoom, setSearchRoom] = useState("");

  // Fetch chat rooms from backend
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const uname = localStorage.getItem("userId");
        const res = await axios.get(
          `http://localhost:3000/chatroom/chatroom-latest/${uname}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChatRooms(res.data);
        setShowChatRooms(res.data);
      } catch (err) {
        console.error("Error fetching chat rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChatRooms();
  }, []);

  // Filter chat rooms when search changes
  useEffect(() => {
    if (chatRooms.length === 0) return;
    if (searchRoom.trim() === "") {
      setShowChatRooms(chatRooms);
    } else {
      const filtered = chatRooms.filter((room) =>
        room.name.toLowerCase().includes(searchRoom.toLowerCase())
      );
      setShowChatRooms(filtered);
    }
  }, [searchRoom, chatRooms]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading chat rooms...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-w-full border-e-2 overflow-y-auto">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-1 m-2">
        <div className="flex-1">
          <label htmlFor="chat-search" className="sr-only">
            Search for chat rooms
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoMdSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              id="chat-search"
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
              placeholder="Search for current chat room"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Add group button */}
        <button
          className="p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Add group"
        >
          <BiSolidAddToQueue className="w-6 h-6" />
        </button>
      </div>

      {showChatRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3468/3468489.png"
            alt="no rooms"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p>No chat rooms available</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {showChatRooms.map((room) => (
            <div
             onClick={() => setSelectedRoom(room._id)} 
              key={room._id}
              className="flex items-center gap-3 p-4 border border-gray-50 hover:bg-gray-100 cursor-pointer transition"
            >
              <img
                src={room.avatar}
                alt={room.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-gray-800">{room.name}</span>
                <span className="text-sm text-gray-500 line-clamp-1 pe-2">
                  {room.latestMessage?.messenger || "No messages yet"}:{" "}
                  {room.latestMessage?.content || ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatRoomList;
