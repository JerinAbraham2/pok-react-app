import "./App.css";
import TitleScreen from "./components/titleScreen/TitleScreen";
import { useEffect, useState } from "react";
import WaitingRoom from "./components/waitingRoom/WaitingRoom";
import Name from "./components/name/Name";
import io from "socket.io-client";
import Game from "./components/game/Game";

const socket = io.connect("http://localhost:4000");


function App() {
    const [jumpIn, setJumpIn] = useState(true); // dev || revert to false
    const [userName, setUserName] = useState();
    const [players, setPlayers] = useState([]);
    const [gameStart, setGameStart] = useState(false);


    const handleEnteredName = (name) => {
        if (!players.some((el) => el.name === name)) {
            setUserName(name);
        } else {
            alert("that name is already being used");
        }
    };
    useEffect(() => {
        socket.on("connect", () => { // dev
            console.log(socket.id)
            setUserName(socket.id)
        })
    
        socket.on("players", (players) => {
            setPlayers(players);
        });
        socket.on("game started", () => {
            setGameStart(true);
        });
        return () => {
            socket.off("players");
            socket.off("game started");
            socket.off("connect"); // dev 
        };
    }, []);

    return (
        <div className="App">
            {jumpIn ? (
                userName ? (
                    gameStart ? (
                        <Game />
                    ) : (
                        <WaitingRoom name={userName} />
                    )
                ) : (
                    <Name btnClick={handleEnteredName} />
                )
            ) : (
                <TitleScreen btnClick={() => setJumpIn(true)} />
            )}
        </div>
    );
}

export default App;
