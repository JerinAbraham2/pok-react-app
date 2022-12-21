import "./App.css";
import TitleScreen from "./components/titleScreen/TitleScreen";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import WaitingRoom from "./components/waitingRoom/WaitingRoom";
import Name from "./components/name/Name";

const socket = io.connect("http://localhost:5000");

function App() {
  const [jumpIn, setJumpIn] = useState(false);
  const [enteredName, setEnteredName] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const handleJumpIn = () => {
    setJumpIn(true);
    socket.emit("client", { msg: "someone has connected" });
  };

  const handleEnteredName = (name) => {
    setEnteredName(true);
    setUserName(name);
  };

  useEffect(() => {
    socket.on("connect", () => {
      setUserId(socket.id);
    });
  }, [socket]);

  return (
    <div className="App">
      {/* {jumpIn ? ready ? <WaitingRoom /> : <Game /> : <TitleScreen btnClick={handleJumpIn}/>} */}
      {/* {jumpIn ? enteredName ? ready ?  <Game /> : <WaitingRoom /> : <Name /> : <TitleScreen btnClick={handleJumpIn}/>} */}

      {jumpIn ? (
        enteredName ? (
          <WaitingRoom name={userName} id={userId} />
        ) : (
          <Name btnClick={handleEnteredName} />
        )
      ) : (
        <TitleScreen btnClick={handleJumpIn} />
      )}
    </div>
  );
}

export default App;
