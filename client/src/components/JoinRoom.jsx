import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uniqueUserId, socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleJoinClick = (e) => {
    e.preventDefault();

    const roomDescription = {
      name,
      roomId,
      userId: uniqueUserId(),
      host: false,
      presenter: false,
    };

    setUser(roomDescription);
    
    navigate(`/${roomId}`);

    socket.emit("userJoined", roomDescription);
  };

  return (
    <form className="text-left m-4">
      <h2 className="text-4xl font-bold mb-4 text-center mt-1">Join</h2>
      <label className="block mb-2 text-xl">Enter your name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-black rounded px-2 py-1 mb-4 w-full"
      />
      <label className="block mb-2 text-xl">Enter Room ID</label>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border border-black rounded px-2 py-1 mb-4 w-full"
      />
      <div className="flex justify-center">
        <button
          className="bg-black text-white px-4 py-2 rounded-3xl hover:bg-blue-600"
          onClick={handleJoinClick}
        >
          Join
        </button>
      </div>
    </form>
  );
};

export default JoinRoomForm;
