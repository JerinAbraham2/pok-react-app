import styles from "./waitingRoom.module.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:4000");

const WaitingRoom = ({ name }) => {
    const [users, setUsers] = useState([]);
    const [time, setTime] = useState(0);

    const timer = () => {
        setTime((time) => time - 1);
        if (time > 0) {
            timer();
        }
    };
    // its rendering twice because of react strict mode
    useEffect(() => {
        socket.emit("client joined", name);
        socket.on("players", (data) => {
            setUsers(data);
        });

        socket.on("timer", (value) => {
            setTime(value);
        });

        return () => {
            socket.off("players");
            socket.off("timer");
        };
    }, []);

    const handleReady = () => {
        socket.emit("player ready", name);
    };

    return (
        <div className={styles.main}>
            <h1>WaitingRoom</h1>
            <h2>hi, {name}</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ready</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.ready ? "✅" : "❌"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h3>Are you ready?</h3>
                <button onClick={handleReady}>ready</button>
                {time !== 0 && <h2>Game starts in {time}</h2>}
            </div>
        </div>
    );
};

export default WaitingRoom;
