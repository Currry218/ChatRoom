import React, { useState, useEffect } from "react";
import { chatRoomAvatarOptions } from "../../constants/ChatRoomAvatar.ts";
import axios from "axios";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatRoom {
  _id: string;
  name: string;
  avatar: string;
  isPublic: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
  isDirect: boolean;
}
interface Member {
  _id: string;
  roomId: string; 
  username: string; 
  role: "member" | "admin" | "owner";
  joinedAt: string;
  isNotHere: boolean;
  lastSeenMsgId?: string;
  lastSeenAt?: string;
}
const ChatRoomModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");

  // Create form
  const [avatar, setAvatar] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // Join form
  const [roomId, setRoomId] = useState("");
  const [publicRooms, setPublicRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const username = localStorage.getItem("userId");
  const [userMembers, setUserMembers] = useState<Member[]>([]);
  const joinedRoomIds = new Set(userMembers.map((m) => m.roomId));

  // Fetch public rooms when opening "Join" tab
  useEffect(() => {
    if (activeTab === "join") {
      const fetchPublicRooms = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const res = await axios.get<ChatRoom[]>(
            `${import.meta.env.VITE_API_URL}/chatroom`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setPublicRooms(res.data.filter((r) => r.isPublic));
        } catch (err) {
          console.error("Failed to fetch public rooms:", err);
          setPublicRooms([]);
        }
      };
      const fetchUserMember = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const username = localStorage.getItem("userId");
          const res = await axios.get<Member[]>(
            `${import.meta.env.VITE_API_URL}/member/${username}/all`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserMembers(res.data);
          console.log("MEMBER?ALL", res.data);
        } catch (err) {
          console.error("Failed to fetch user memberships:", err);
          setUserMembers([]);
        }
      };

      fetchPublicRooms();
      fetchUserMember();
    }
  }, [activeTab]);

  if (!isOpen) return null;

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/chatroom`,
        {
          name: roomName,
          avatar: avatar,
          isPublic: !isPrivate,
          owner: username,
          isDirect: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Room created successfully");
      onClose();
    } catch (err) {
      console.error("Failed to create room:", err);
      toast.error("Failed to create room:");
    }
  };

  const handleJoin = async () => {
    const targetRoomId = roomId || selectedRoomId;
    if (!targetRoomId) return;

    try {
      const token = localStorage.getItem("access_token");
      const username = localStorage.getItem("userId");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/member`,
        { roomId: targetRoomId, username: username, role: "member" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onClose();
      setActiveTab("create");
    } catch (err) {
      console.error("Failed to join room:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[var(--color-surface)] rounded-lg shadow-lg min-w-1/4 h-3/5 w-full max-w-md">
        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border)]">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-2 text-center ${
              activeTab === "create"
                ? "border-b-2 border-[var(--color-primary)] font-medium"
                : "text-[var(--color-muted)]"
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`flex-1 py-2 text-center ${
              activeTab === "join"
                ? "border-b-2 border-[var(--color-primary)] font-medium"
                : "text-[var(--color-muted)]"
            }`}
          >
            Join Room
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "create" ? (
            <div className="space-y-4">
              {/* Room name */}
              <div>
                <label className="block mb-1 text-sm">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Avatar */}
              <label className="block mb-1 text-sm">Room Avatar</label>
              <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto">
                {chatRoomAvatarOptions.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="avatar"
                    className={`w-16 h-16 rounded-full cursor-pointer border-4 transition-all ${
                      avatar === src ? "border-red-500" : "border-transparent"
                    }`}
                    onClick={() => setAvatar(src)}
                  />
                ))}
              </div>

              {/* Privacy switch */}
              <div className="flex items-center gap-3">
                <span className="text-sm">Private</span>
                <button
                  type="button"
                  onClick={() => setIsPrivate((prev) => !prev)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    isPrivate
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-border)]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition ${
                      isPrivate ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Join by ID */}
              <div className="space-y-3">
                <div>
                  <label className="block mb-1 text-sm">
                    Join with Room ID
                  </label>
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              {/* Public rooms */}
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Available Public Rooms
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {publicRooms.length === 0 ? (
                    <p className="text-sm text-[var(--color-muted)]">
                      No public rooms available
                    </p>
                  ) : (
                    publicRooms
                      .filter((room) => !joinedRoomIds.has(room._id))
                      .map((room) => (
                        <div
                          key={room._id}
                          onClick={() => {
                            setRoomId(room._id);
                            setSelectedRoomId(room._id);
                          }}
                          className={`w-full flex gap-2 items-center px-3 py-2 border-b border-gray-200 rounded transition ${
                            selectedRoomId === room._id
                              ? "border-black"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <img src={room.avatar} className="w-10" />
                          <span>{room.name}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] p-3 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-[var(--color-border)] hover:bg-[var(--color-surface)]"
          >
            Close
          </button>
          <button
            onClick={activeTab === "create" ? handleCreate : handleJoin}
            className="px-4 py-2 rounded bg-[var(--color-primary)] text-[var(--color-on-primary)]"
          >
            {activeTab === "create" ? "Create" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomModal;
