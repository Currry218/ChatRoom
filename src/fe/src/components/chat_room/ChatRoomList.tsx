import React from "react";

import { IoMdSearch } from "react-icons/io";

const ChatRoomList = () => {
  const chatRooms = [
    {
      id: 1,
      name: "General Chat",
      lastMessage: "You have a new message",
      avatar: "https://cdn-icons-png.flaticon.com/512/4775/4775537.png",
    },
    {
      id: 2,
      name: "Gaming Squad",
      lastMessage: "Who's online tonight?",
      avatar: "https://cdn-icons-png.flaticon.com/512/4775/4775537.png",
    },
  ];

  return (
    <div className="flex flex-col h-full min-w-full border-e-2 overflow-y-auto">
      {chatRooms.length === 0 ? (
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
          {/* SEACRH BAR */}
          <form class="m-2">
            <label for="default-search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoMdSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg b focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for current chat room"
                required
              />
            </div>
          </form>

          {chatRooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center gap-3 p-4 border border-gray-50 hover:bg-gray-100 cursor-pointer transition"
            >
              <img
                src={room.avatar}
                alt={room.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex flex-col flex-1">
                <span className="font-semibold text-gray-800">{room.name}</span>
                <span className="text-sm text-gray-500 truncate">
                  {room.lastMessage}
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
