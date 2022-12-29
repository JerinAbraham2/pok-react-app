const Player = require("./modules/Player.js");
const GameManager = require("./modules/GameManager");

const express = require("express");
// create our app variable an instance of the express library
const app = express();
const http = require("http"); // create http server
// get a class called server
const { Server } = require("socket.io");
const cors = require("cors");
const e = require("express");
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
let timeIntervalId = 0;
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
        // dev || add this to the line below !players.some((el) => el.name === name) &&
         players.push(new Player.Player(socket.id, name, false));
        io.emit("players", players);
    });

    socket.on("player ready", (name) => {
        const player = players.findIndex((player) => player.name == name); // find player that is ready
        players[player].ready === true ? (players[player].ready = false) : (players[player].ready = true); // update property

        io.emit("players", players); // update the new players in the ui

        const playersReady = players.every((player) => player.ready === true) && players.length >= 2; // see if all the players are ready and atleast 2

        let time = 5;        
        const timer = () => {
            io.emit("timer", time);
            time--;
            if (time < 0) { // start game
                clearInterval(timeIntervalId);
                io.emit("game started")
                gameManager.startGame()
            }
        };

        if (playersReady) {
            timeIntervalId = setInterval(timer, 1000);
        } else {
            clearInterval(timeIntervalId);
            io.emit("timer", 0); // reset to zero
        }
    });

    socket.on("game started", () => {
        gameManager.startGame();
    });

    socket.on("give each player starting cards", () => {
        giveStartingCards();
        io.emit("starting cards", gameManager.players)
    })
});

server.listen(port, () => console.log("Server listening on port", port));
