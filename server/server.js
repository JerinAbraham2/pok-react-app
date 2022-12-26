const Player = require("./modules/Player.js");
const GameManager = require ("./modules/GameManager")

const express = require("express");
// create our app variable an instance of the express library
const app = express();
const http = require("http"); // create http server
// get a class called server
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app); // how we create a http server using express
const port = 4000;

// server is a class so you need to instantiate a new instance of the server
const io = new Server(server, {
    cors: {
        // I think this is how you link front-end to backend
        origin: "http://localhost:3000", // url for our react front-end (so vite I think is 5173)
        method: ["GET", "POST"],
    },
}); // using anything related to socket io in our backend

// variables
const players = [];
let id = 1;
const gameManager = new GameManager.GameManager(players);

io.on("connection", (socket) => {
    // the way we listen to events
    console.log("user connected: ", socket.id);

    socket.on("disconnect", () => {
        const playerIndex = players.findIndex((player) => {
            return player.id === socket.id;
        });
        if (playerIndex !== -1) {
            players.splice(playerIndex, 1); // remove player based on index
            io.emit("players", players); // emit the new player list to all the clients
        }
    });

    socket.on("client joined", (name) => {
        // if it doesn't include player add it to the list
        !players.some((el) => el.name === name) && players.push(new Player.Player(socket.id, name, false));
        io.emit("players", players);
    });

    socket.on("player ready", (name) => {
        const player = players.findIndex((player) => player.name == name); // find player
        players[player].ready === true ? (players[player].ready = false) : (players[player].ready = true); // update property
        io.emit("players", players);

        let time = 5;
        const timer = () => {
            io.emit("timer", time); 
            time--;
            time >= 0 && timer();
        }

        // are all players ready
        if (players.every((player) => player.ready === true) && players.length >= 2) {
            setInterval(timer, 1000);
        } else {
            io.emit("are all players ready", false);
        }
    });

    socket.on("game started", () => {
        gameManager.startGame();
    })
});

server.listen(port, () => console.log("Server listening on port", port));
