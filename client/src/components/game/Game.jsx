import { useEffect, useState } from "react";
import styles from "./game.module.css";
import io from "socket.io-client";
import Hand from "./Hand/Hand";

const socket = io.connect("http://localhost:4000");

const Game = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // ask the server, give the players each two cards
        socket.emit("give each player starting cards");
        socket.on("starting cards", (newPlayers) => {
            setPlayers(newPlayers);
        });
        socket.on("starting players", (player) => {
            console.log("this is working")
            console.log(player);
        })
        return () => {
            socket.off("starting cards");
            socket.off("starting players");
        };
    }, []);


    return (
        <div className={styles.gameContainer}>
            <h1>Welcome to the game</h1>
            <div>
                {players.map((player) => {
                    return <Hand key={player.id} player={player}></Hand>;
                })}
            </div>
        </div>
    );
};

export default Game;
