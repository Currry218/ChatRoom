import { toast } from 'react-toastify';
interface Member {
  username: string;
  avatar: string;
}

interface ChatRoom {
  _id: string;
  name: string;
  avatar: string;
  createdAt?: string;
  description?: string;
}

interface ChatRoomInfoProps {
  room: ChatRoom | null;
  members: Member[];
}

const ChatRoomInfo: React.FC<ChatRoomInfoProps> = ({ room, members }) => {
  const handleInvite = () => {
    navigator.clipboard.writeText(room._id);
    toast.success("Room Id copied to clipboard!");
  }
  return (
    <div className="flex flex-col min-h-full min-w-full overflow-x-auto p-4">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={
            room?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/2885/2885648.png"
          }
          alt={room?.name}
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{room?.name}</h3>
        <p className="text-sm">
          Created:{" "}
          {room?.createdAt
            ? new Date(room.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
      </div>

      {/* Description */}
      {room?.description && (
        <div className="mb-4 text-center text-sm">{room.description}</div>
      )}

      {/* Members */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Members</h4>
        <div className="flex gap-2 flex-wrap items-center">
          <ul className="mt-2 max-h-64 overflow-y-auto border p-2 rounded w-full">
            {members.map((m, i) => (
              <li key={i} className="flex items-center gap-2 mb-2">
                <img
                  src={m.avatar}
                  alt={m.username}
                  className="w-10 h-10 rounded-full"
                />
                <span>{m.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row justify-between">
        <button
          className="text-indigo-600 font-semibold px-3 py-2 rounded border cursor-pointer"
          onClick={handleInvite}
        >
          Invite Member
        </button>
        <button
          className="text-indigo-900 font-semibold px-3 py-2 rounded border cursor-pointer"
          // onClick={}
        >
          Leave Room
        </button>{" "}
      </div>
    </div>
  );
};

export default ChatRoomInfo;
