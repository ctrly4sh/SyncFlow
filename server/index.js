const express = require("express");
const app = express();

const server = require("http").createServer(app);

const {Server} = require("socket.io");

const io = new Server(server)

app.get('/' , (req , res)=>{
    res.send(
        "SyncFlow , Draw Real Time "
    );
});

io.on("connection" , (socket)=>{
    console.log("user connected");

    socket.on("userJoined" , (data)=>{
        const {name , userId , roomId, host , presenter} = data;
        socket.join(roomId);

        socket.emit("userIsJoined" , {
            success : true
        })
    })
    
});

const port = process.env.port || 5000;

server.listen(port , ()=>{
    console.log(`Server started , listening at localhost:${port}`);
})

