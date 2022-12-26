const PlayerLib = require("./modules/Player.js")

const PlayerObj = PlayerLib.Player;

const playerObj = new PlayerObj(5, "tony", false)

console.log(playerObj)

const express = require("express");
// create our app variable an instance of the express library
const app = express();
const http = require("http"); // create http server
// get a class called server
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app); // how we create a http server using express
const port = 5000;

// server is a class so you need to instantiate a new instance of the server
const io = new Server(server, {
    cors: {
        // I think this is how you link front-end to backend
        origin: "http://localhost:3000", // url for our react front-end (so vite I think is 5173)
        method: ["GET", "POST"],
    },
}); // using anything related to socket io in our backend

// players list
const players = [];

io.on("connection", (socket) => {
    // the way we listen to events
    console.log("user connected: ", socket.id);

    // hi
    socket.on("client message", (data) => {
        console.log("client message recieved");
        socket.emit("server message", "we have recieved your message");
    });

    socket.on("client joined", (data) => {
        // if it doesn't include player add it to the list
        !players.some((el) => el.name === data) && players.push({ name: data, ready: false });
        socket.emit("add client to table", players);
    });

    socket.on("send_msg", (data) => {
        // recieve that event
        console.log(data.message);
        // let's broadcast to everyone connected to the socket server
        socket.broadcast.emit("receive_msg", data); // send to everyone
    });
});

server.listen(port, () => console.log("Server listening on port", port));
