import React from "react";

const ChatRoomInfo = () => {
  return (
    <div className="flex flex-col min-h-full min-w-full overflow-x-auto p-4">
      {/* Title */}
      {/* <h2 className="text-xl font-bold mb-4">Chat Info</h2> */}

      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2885/2885648.png"
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">Room Name</h3>
        <p className="text-sm">Created: Jan 2025</p>
      </div>

      {/* Description */}
      <div className="mb-4 text-center text-sm ">
        This is the official chat room for our project team. Share updates, ask
        questions, and collaborate here!
      </div>

      {/* Members */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Members</h4>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/4775/4775517.png"}
                alt="member"
                className="w-10 h-10 rounded-full"
              />
              {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span> */}
            </div>
          ))}
          <h4 className="text-md font-semibold mb-2 flex justify-center items-center">
            +50
          </h4>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row gap-2">
        <button className="px-4 py-2 rounded border">Invite Member</button>
        <button className="px-4 py-2 rounded border ">Leave Room</button>
      </div>
    </div>
  );
};
export default ChatRoomInfo;
