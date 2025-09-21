import React from "react";
import ChatContent from "../components/chat_room/ChatContent";
import ChatRoomInfo from "../components/chat_room/ChatRoomInfo";
import ChatRoomList from "../components/chat_room/ChatRoomList";
const ChatRoom = () => {
  return (
    <div className="flex flex-row h-[90vh] w-full ">
      <div className="flex flex-row h-full w-[25vw]">
        <ChatRoomList />
      </div>
      <div className="flex flex-row h-full flex-1">
        <ChatContent />
      </div>
      <div className="flex flex-row h-full w-[20vw]">
        <ChatRoomInfo />
      </div>
    </div>
  );
};
export default ChatRoom;
