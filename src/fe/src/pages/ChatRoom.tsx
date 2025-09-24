
import ChatContent from "../components/chat_room/ChatContent";
import ChatRoomList from "../components/chat_room/ChatRoomList";
import { useState } from 'react';
const ChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  return (
    <div className="flex flex-row h-[90vh] w-full">
      {/* <h1>{selectedRoom}</h1> */}
      <div className="flex flex-row h-full w-[25vw]">
       <ChatRoomList setSelectedRoom={setSelectedRoom} />
      </div>
      <div className="flex flex-col h-full flex-1">
        <ChatContent roomId={selectedRoom} />
      </div>

    </div>
  );
};
export default ChatRoom;
