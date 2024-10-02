import React from "react";
import CreateRoomForm from "./CreateRoom"
import JoinRoomForm from "./JoinRoom";

const Form = ({ uniqueUserId, socket, setUser }) => {
  return (
    <div className="font-fira text-center">
      <h1 className="text-7xl font-bold mt-12 mb-2">SyncFlow</h1>
      <p className="text-xl mb-8 mt-14">
        Design LLD/HLD, Algorithms, and flowcharts together in real-time.
      </p>
      <div className="flex justify-center items-start space-x-8">
        <CreateRoomForm uniqueUserId={uniqueUserId} socket={socket} setUser={setUser} />
        <div className="flex flex-col items-center m-4">
          <div className="border-r border-black h-full"></div>
        </div>
        <JoinRoomForm uniqueUserId={uniqueUserId} socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};

export default Form;
