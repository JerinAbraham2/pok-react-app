import "./App.css";
import TitleScreen from "./components/titleScreen/TitleScreen";
import { useState } from "react";
import WaitingRoom from "./components/waitingRoom/WaitingRoom";
import Name from "./components/name/Name";

function App() {
    const [jumpIn, setJumpIn] = useState(false);
    const [enteredName, setEnteredName] = useState(false);
    const [userName, setUserName] = useState("");

    const handleEnteredName = (name) => {
        setEnteredName(true);
        setUserName(name);
    };

    return (
        <div className="App">
            {jumpIn ? (
                enteredName ? (
                    <WaitingRoom name={userName} />
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
