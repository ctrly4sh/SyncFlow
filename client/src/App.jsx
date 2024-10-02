import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Whiteboard from "./components/Whiteboard";
import io from "socket.io-client";

const server = "http://localhost:5000"

const connectionConfigurations = {
  "force new connection" : true,
  reconnectionAttempts : "Infinity",
  timeout : 10000,
  transports : ["websocket"]
}

const socket = io(server , connectionConfigurations)


function App() {

  const [user , setUser] = useState(null)

  useEffect(()=>{
    socket.on("userIsJoined" , (data)=>{
      if(data.success){
        console.log("user joined");
      }
      else{
        console.log("error ");
        
      }
    });
  });

  const uniqueUserId = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      //calling the functions multilpe times to make the unique user id 
      S4() + S4() +"-" +S4() +"-" +S4()
    );
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form uniqueUserId = {uniqueUserId} socket={socket} setUser={setUser}/>} />
        <Route path="/:roomId" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
}

export default App;
