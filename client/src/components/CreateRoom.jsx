import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ uniqueUserId, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uniqueUserId());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    e.preventDefault();

    const roomDescription = {
      name,
      roomId,
      userId: uniqueUserId(),
      host: true,
      presenter: true,
    };

    setUser(roomDescription);
    navigate(`/${roomId}`);
    socket.emit("user joined", roomDescription);
  };

  return (
    <form className="text-left m-4">
      <h2 className="text-4xl font-bold mb-4 mt-1 text-center">Create</h2>
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
        className="border border-black rounded px-2 py-1 mb-4 w-full"
        disabled
      />
      <div className="flex justify-center">
        <button
          className="bg-black text-white px-4 py-2 rounded-3xl hover:bg-blue-600"
          onClick={handleCreateClick}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateRoom;
